const getRawBody = require("raw-body");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

// Disable next.js body parsing (stripe needs the raw body to validate the event)


const handleStripeWebhook = async (req, res) => {
  console.log('why')
  const headers = req.headers;
  console.log('try')
  try {
    const rawBody = await getRawBody(req);
    //const body = await req.text();
    //const body = Buffer.from(req)

    const stripeEvent = stripe.webhooks.constructEvent(
      rawBody,
      headers["stripe-signature"],
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log(`stripeEvent: ${stripeEvent.type}`);

    switch (stripeEvent.type) {
      case "checkout.session.completed":
        // Example handling for checkout session completed event
        console.log("Checkout session completed");
        break;

      case "invoice.payment_succeeded":
        // Example handling for invoice payment succeeded event
        console.log("Invoice payment succeeded");
        break;

      case "invoice.payment_failed":
        // Example handling for invoice payment failed event
        console.log("Invoice payment failed");
        break;

      case "customer.subscription.updated":
        // Example handling for customer subscription updated event
        console.log("Customer subscription updated");
        break;

      case "customer.subscription.deleted":
        // Example handling for customer subscription deleted event
        console.log("Customer subscription deleted");
        break;

      case "customer.subscription.trial_will_end":
        // Example handling for trial will end event
        console.log("Trial will end");
        break;

      // no default
    }

    // Send success response
    res.send({ status: "success" });
    return
  } catch (error) {
    console.log("stripe webhook error", error);

    // Send error response
    res.send({ status: "error", code: error.code, message: error.message });
    return
  }
};

export default handleStripeWebhook;