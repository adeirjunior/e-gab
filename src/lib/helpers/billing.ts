import { getSession } from "../auth/get-session";
import { getCurrentDomain, isDev } from "../utils";
import { stripe } from "../configs/stripe";
import prisma from "../configs/prisma";

export async function hasSubscription() {
  const session = await getSession();

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    const subscriptions = await stripe.subscriptions.list({
      customer: String(user?.stripeCustomerId),
    });

    return subscriptions.data.length > 0;
  }

  return false;
}

export async function getActivePlan() {
  const session = await getSession();

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    if (!user) {
      return null;
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: String(user.stripeCustomerId),
      status: "active", // Filtrar apenas assinaturas ativas
      limit: 1, // Limitar a apenas uma assinatura ativa
    });

    if (subscriptions.data.length === 0) {
      return null;
    }

    const activeSubscription = subscriptions.data[0];

    // Garantir que o ID do produto seja uma string
    const productId =
      typeof activeSubscription.items.data[0].price.product === "string"
        ? activeSubscription.items.data[0].price.product
        : activeSubscription.items.data[0].price.product.id;

    // Buscar o produto associado ao plano ativo
    const product = await stripe.products.retrieve(productId);

    return {
      subscription: activeSubscription,
      product: product,
    };
  }

  return null;
}


export async function getProduct() {
  const session = await getSession();

  if (session) {
    const user = await prisma.user.findFirst({
      where: { email: session.user?.email },
    });

    const subscriptions = await stripe.subscriptions.list({
      customer: String(user?.stripeCustomerId),
    });

    return subscriptions.data[0];
  }

  return null;
}

export async function generateCustomerPortalLink(customerId: string) {
  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: getCurrentDomain("app", "/configuracoes"),
    });

    return portalSession.url;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export async function createCheckoutLink(customer: string) {
  const checkout = await stripe.checkout.sessions.create({
    success_url: getCurrentDomain("app", "/configuracoes?success=true"),
    cancel_url: getCurrentDomain("app", "/configuracoes?cancel=true"),
    locale: 'pt-BR',
    customer: customer,

    line_items: [
      {
        price: "price_1OaVzYF2B4eBI9ENg94MBCT8",
        quantity: 1,
      },
    ],
    mode: "subscription",
  });

  return checkout.url;
}

export async function createCustomerIfNull(id: string) {
  if (id) {
    const user = await prisma.user.findFirst({
      where: { id },
    });

    if (!user?.stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: String(user?.email),
      });

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          stripeCustomerId: customer.id,
        },
      });
    }
    const user2 = await prisma.user.findFirst({
      where: { id },
    });
    return user2?.stripeCustomerId;
  }
}
