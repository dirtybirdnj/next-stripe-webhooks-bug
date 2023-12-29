import { NextRequest, NextResponse } from 'next/server';
import { buffer } from 'micro';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function POST(req) {

  const request = new NextRequest(req);
  const header = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  try {
    // All these attempts to read the RAW UNMOFIFIED body fail
    //Next.js is UNHELPFULLY modifying it
    //Rendering stripe webhook validation IMPOSSIBLE
    //const rawBody = request.body; //fail
    //const rawBody = request.text() //fail
    //const rawBody = await buffer(request); //fail
    const rawBody = request.json(); //fail

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