import Stripe from "stripe";
import { dbConnect } from "./db";
import { stripe } from "./stripe";

export async function handleCheckoutSessionCompleted({
  session,
}: {
  session: Stripe.Checkout.Session;
}) {
  console.log("Checkout session completed:", session.id);

  const sql = await dbConnect();

  const customerId = session.customer as string;

  if (!customerId) {
    throw new Error("Stripe customer ID is missing");
  }

  // Retrieve customer details
  const customer = await stripe.customers.retrieve(customerId);

  if (customer.deleted) {
    throw new Error("Stripe customer has been deleted");
  }

  const email = customer.email;

  if (!email) {
    throw new Error("Customer email is missing");
  }

  // Retrieve line items separately
  const lineItems = await stripe.checkout.sessions.listLineItems(
    session.id,
    { limit: 1 }
  );

  const priceId = lineItems.data[0]?.price?.id;

  if (!priceId) {
    throw new Error("Stripe price ID is missing");
  }

  await createOrUpdateUser({
    email,
    full_name: customer.name ?? "",
    customer_id: customerId,
    price_id: priceId,
    status: "active",
    sql,
  });

  await createPayment({
    session,
    priceId,
    userEmail: email,
    sql,
  });
}

async function createOrUpdateUser({
  email,
  full_name,
  customer_id,
  price_id,
  status,
  sql,
}: {
  email: string;
  full_name: string;
  customer_id: string;
  price_id: string;
  status: string;
  sql: any;
}) {
  await sql`
    INSERT INTO users (
      email,
      full_name,
      customer_id,
      price_id,
      status
    )
    VALUES (
      ${email},
      ${full_name},
      ${customer_id},
      ${price_id},
      ${status}
    )
    ON CONFLICT (email)
    DO UPDATE SET
      full_name = EXCLUDED.full_name,
      customer_id = EXCLUDED.customer_id,
      price_id = EXCLUDED.price_id,
      status = EXCLUDED.status
  `;
}

async function createPayment({
  session,
  priceId,
  userEmail,
  sql,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
  sql: any;
}) {
  const { amount_total, id, payment_status } = session;

  await sql`
    INSERT INTO payments (
      amount,
      status,
      stripe_payment_id,
      price_id,
      user_email
    )
    VALUES (
      ${amount_total},
      ${payment_status},
      ${id},
      ${priceId},
      ${userEmail}
    )
    ON CONFLICT (stripe_payment_id) DO NOTHING
  `;
}

export async function  handleSubscriptionDeleted(
  {
    subscriptionId,
    stripe
  }
  : 
  {
    subscriptionId: string;
    stripe: Stripe
  }
) {

  console.log(`subscriptionId: ${subscriptionId}`)

  try {
    const sql = await dbConnect()
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)

    await sql`UPDATE users SET status = 'canceled' WHERE customer_id = ${subscription.customer}`
  } catch (error) {
    throw error
  }
}