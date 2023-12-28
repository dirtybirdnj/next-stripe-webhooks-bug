import { NextRequest, NextResponse } from 'next/server';
import { buffer } from 'micro';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {

  const request = new NextRequest(req);
  const header = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    // Use the built-in req.body to get the raw buffer
    //const rawBody = request.body;
    //const rawBody = request.text()
    const rawBody = await buffer(request);

    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      header,
      webhookSecret
    );

    return NextResponse.json(stripeEvent, {
      status: 200,
    });
  } catch (error) {
    console.log('Error handling POST request:', error);

    return NextResponse.json({ status: 'error', message: error.message }, {
      status: 500,
    });
  }
}