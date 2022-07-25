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
    line_items: [
      {
        price: 'price_1LNKAqINIX6jLdpDMuKv5juA',
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
