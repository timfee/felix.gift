import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import stripeLib from 'stripe'

import Countdown from '@/components/Countdown'
import Logo from '@/components/Logo'
import Quantity from '@/components/Quantity'
import { COST_PER_UNIT, SHIPPING_COST, TOTAL_STOCK } from '@/lib/config'
import { align, formatter } from '@/lib/utils'

const Index: NextPage<{ stock: number }> = ({ stock }) => {
  const [quantity, setQuantity] = useState(1)
  const router = useRouter()
  return (
    <>
      <Head>
        <title>Felix Freshener</title>
      </Head>
      <header className="mx-auto -mt-12 w-fit animate-wobble">
        <Image
          src="/felix.png"
          alt="Felix Freshener"
          width={336}
          height={230}
        />
      </header>
      <main className="mx-6">
        <Logo className="max-w-xl mx-auto mt-2 mb-8" />
        <section className="p-6 mx-auto mt-6 prose bg-white rounded-lg shadow shadow-slate-400">
          <p className="m-2 text-xl font-medium leading-8 text-purple-800">
            Amaze your friends, terrify children and give your car the special
            musk that only a hairless cat can provide.
          </p>
          <p className="m-2 ">
            Actually, the smell is “Black Freeze” according to the manufacturer.
            We haven’t been able to figure out what that’s <em>supposed</em> to
            smell like, but whatever it ends up being, it’ll almost certainly be
            an upgrade from your car’s current aroma.
          </p>
          <p className="m-2 ">
            <strong>
              These air fresheners are {formatter.format(COST_PER_UNIT)} each,
              and shipping is a flat {formatter.format(SHIPPING_COST)}.
            </strong>{' '}
            You can buy up to 10 at a time. Save some for the rest of us,
            muchacho!
          </p>
        </section>

        <form className="mx-auto mt-8 max-w-prose">
          <div className="mx-auto md:space-x-12 md:flex md:flex-row w-fit">
            <div className="text-center">
              <h2 className="mb-3 text-lg font-medium text-gray-900">
                What’ll it be?
              </h2>

              <Quantity quantity={[quantity, setQuantity]} />
              <p className="pt-2 mb-4 text-sm text-slate-600 md:mb-0">
                {formatter.format(COST_PER_UNIT)} each
              </p>
            </div>
            <div>
              <div className="h-full font-mono text-xs font-light w-fit tear-white">
                <div className="p-4 bg-white">
                  <p className="mb-0 font-semibold">Felix Freshener</p>
                  <p>
                    {align(
                      quantity === 1
                        ? formatter.format(COST_PER_UNIT) + ' for one'
                        : formatter.format(COST_PER_UNIT) + ' × ' + quantity,
                      formatter.format(quantity * COST_PER_UNIT),
                      '.',
                      25
                    )}
                  </p>
                  <p className="mt-2 font-semibold">Shipping</p>
                  <p>
                    {align(
                      'Flat rate',
                      formatter.format(SHIPPING_COST),
                      '.',
                      25
                    )}
                  </p>
                  <p className="mt-4 font-bold text-indigo-600">
                    {align(
                      'TOTAL',
                      formatter.format(
                        SHIPPING_COST + quantity * COST_PER_UNIT
                      ),
                      '.',
                      25
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={e => {
              fetch('/api/checkout?quantity=' + quantity).then(
                async response => {
                  router.push((await response.json()).url)
                }
              )
              e.preventDefault()
              return false
            }}
            type="submit"
            className="flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Pay {formatter.format(SHIPPING_COST + quantity * COST_PER_UNIT)}
          </button>
        </form>
        <aside className="mx-auto mt-12 max-w-prose">
          <Countdown Remaining={stock} />
        </aside>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const stripe = new stripeLib(process.env.STRIPE_SECRET || '', {
    apiVersion: '2020-08-27',
  })

  let hasMore = true
  let itemsSold = 0
  while (hasMore !== false) {
    let startingAfter = ''

    const orders = await stripe.checkout.sessions.list({
      limit: 100,

      expand: ['data.line_items'],
      ...(startingAfter !== '' && { starting_after: startingAfter }),
    })

    itemsSold += orders.data
      .filter(order => order.status === 'complete')
      .reduce(
        (prev, cur) =>
          cur.line_items
            ? cur.line_items.data.reduce(
                (prevLineItem, curLineItem) =>
                  (prevLineItem += curLineItem?.quantity ?? 0),
                0
              )
            : 0,
        0
      )

    if (orders.has_more) {
      hasMore = true
      startingAfter = (orders.data.at(-1) || { id: '' }).id
    } else {
      hasMore = false
    }
  }

  return {
    props: {
      stock: TOTAL_STOCK - itemsSold,
    },
  }
}

export default Index
