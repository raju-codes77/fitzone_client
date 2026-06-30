import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '../../../lib/stripe'
import { auth } from '@/lib/auth'

export async function POST(request) {
  try {
    const headersList = await headers()
    const origin = headersList.get('origin') ?? process.env.NEXT_PUBLIC_BASE_URL

    const userSession = await auth.api.getSession({
      headers: headersList,
    })

    const user = userSession?.user

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const price = formData.get('price')
    const title = formData.get('title')
    const productId = formData.get('productId')

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 })
    }

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return NextResponse.json({ error: 'Invalid title' }, { status: 400 })
    }

    if (!productId || typeof productId !== 'string' || productId.trim() === '') {
      return NextResponse.json({ error: 'Invalid productId' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(Number(price) * 100),
            product_data: {
              name: title.trim(),
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        price,
        userId: user.id,
        userEmail: user.email,
        title: title.trim(),
        productId: productId.trim(),
        paymentDate:new Date().toISOString(),
      },
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    })

    return NextResponse.redirect(session.url, 303)
  } catch (err) {
    console.error('[Stripe Checkout Error]', err)
    return NextResponse.json(
      { error: err.message ?? 'Internal server error' },
      { status: err.statusCode ?? 500 }
    )
  }
}