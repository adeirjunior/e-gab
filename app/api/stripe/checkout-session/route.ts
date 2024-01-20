import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  });

  const session = await getSession();

  if (!session?.user) {
    return NextResponse.json(
      {
        error: {
          code: "no-access",
          message: "You are not signed in.",
        },
      },
      { status: 401 },
    );
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: session.user.stripeCustomerId,
    line_items: [
      {
        // temporarily hard coded price (subscription)
        price: body,
        quantity: 1,
      },
    ],
    success_url:
      process.env.NEXT_PUBLIC_WEBSITE_URL + `?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL,
    subscription_data: {
      metadata: {
        // so that we can manually check in Stripe for whether a customer has an active subscription later, or if our webhook integration breaks.
        payingUserId: session.user.id,
      },
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      {
        error: {
          code: "stripe-error",
          message: "Could not create checkout session",
        },
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ session: checkoutSession }, { status: 200 });
}
