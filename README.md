## Next.js Javascript / Stripe Webhooks Bug

I'm about to throw my computer out of the window, but some level of self-preservation has caused me to feel that making a repo to document the behavior might be a better way to use this frustrated energy.

### There are 2 potential outcomes:

1. I am an idiot, and I'm missing something. The reason it's not working is my fault
2. There is a flaw in the way Next.js apps run (when NOT using typescript) that causes what I'm trying to do to be impossible.

## Steps to reproduce:

1. git clone https://github.com/dirtybirdnj/next-stripe-webhooks-bug.git
2. .env.default => .env (populate with stripe keys)
3. yarn
4. yarn dev
5. stripe login
6. stripe listen --forward-to localhost:3000/api/webhooks/stripe
7. stripe trigger checkout.session.completed

## What I expect to happen:

I should be able to access the raw http request / buffer to pass to the stripe webhook validation that is ~~bullshit unhelpful waste of time fucking pointless~~ important and necessary security functionality.

## What actually happens

No matter what libraries I use, I cannot get this signature stuff to work. Every example I see uses Typescript, which forces the req / res params passed to be... something else than NextApiRequest / NextApiRequest.

`StripeSignatureVerificationError: No signatures found matching the expected signature for payload. Are you passing the raw request body you received from Stripe?`

Yes, yes I am. I have been for two days. I'm so angry at this error that I made a repo just to document what's broken.

Please, please help me feel stupid. Show me what's missing. I just want it to work.
