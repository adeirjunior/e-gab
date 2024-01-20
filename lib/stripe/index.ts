import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY_LIVE ?? process.env.STRIPE_SECRET_KEY ?? '',
  {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: '2023-10-16',
    
    appInfo: {
      name: 'E-Gab',
      version: '0.1.0'
    }
  }
);