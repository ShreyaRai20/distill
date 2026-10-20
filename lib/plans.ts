import { PLAN_LIMIT } from "@/lib/summaries";
import { ReactNode } from "react";
import { Url } from "url";

export type Plan = {
  id: "basic" | "pro";
  name: string;
  price: string;
  period: string;
  blurb: string;
  features: string[];
  recommended?: boolean;
  paymentLink?: string;
  priceId?: string | null
};

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$0",
    period: "free",
    blurb: "For trying Distill on a few documents.",
    features: [
      `${PLAN_LIMIT} PDF uploads`,
      "In-short line, key points and details",
      "Copy or download as Markdown",
      "Open the original PDF anytime",
    ],
    priceId?: null
  },
  {
    id: "pro",
    name: "Pro",
    price: "$9", // placeholder: replace with your real price
    period: "/ month", // placeholder: replace with your real billing period
    blurb: "For anyone who reads a lot of PDFs.",
    features: ["Unlimited PDF uploads", "Everything in Basic"],
    recommended: true,
    paymentLink: process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK,
    priceId:"price_1USLCjRoXEJXt2YJdaLutHBE"
  },
];