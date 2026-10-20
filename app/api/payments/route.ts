

import { handleCheckoutSessionCompleted, handleSubscriptionDeleted } from "@/lib/payments";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    // HANDSHAKE 
    const payload = await req.text();
    const sig = req.headers.get("stripe-signature");
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !endpointSecret) {
        return NextResponse.json(
            { error: "Missing Stripe signature or webhook secret" },
            { status: 400 }
        );
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig,
            endpointSecret
        );

        switch (event.type) {
            case "checkout.session.completed": {
                const sessionId  = event.data.object.id;
                const session = await stripe.checkout.sessions.retrieve(sessionId, {
                    expand: ['line_items']
                })

                await handleCheckoutSessionCompleted({session})
                break;
            }

            case "customer.subscription.deleted": {
                const subscriptionId  = event.data.object.id;
                const subscription = event.data.object;
                //    const sessionId = event.data.object.id;
                await handleSubscriptionDeleted({subscriptionId,stripe })
                console.log("Customer subscription deleted:", subscription);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
    } catch (error) {
        console.error("Webhook signature verification failed:", error);

        return NextResponse.json(
            { error: "Invalid signature" },
            { status: 400 }
        );
    }

    return NextResponse.json({
        status: "success",
        message: "Stripe webhook received",
    });
}
