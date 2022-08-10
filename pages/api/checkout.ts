import type { NextApiRequest, NextApiResponse } from 'next'
import stripeLib from 'stripe'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const stripe = new stripeLib(process.env.STRIPE_SECRET || '', {
    apiVersion: '2020-08-27',
  })

  const checkout = await stripe.checkout.sessions.create({
    shipping_options: [
      {
        shipping_rate: 'shr_1LV2TBINIX6jLdpDjqUwOho6',
      },
    ],
    line_items: [
      {
        price: 'price_1LV2RjINIX6jLdpDKz4KzIQK',

        quantity:
          typeof req.query.quantity === 'string'
            ? parseInt(req.query.quantity)
            : 1,
      },
    ],
    cancel_url: 'https://felix.gift/?cancel',
    mode: 'payment',
    success_url: 'https://felix.gift/thanks',
  })

  res.status(200).json({ url: checkout.url })
}
