"use client";

import Link from "next/link";
import { useMemo } from "react";

const BASE_REVIEWS = [
  {
    name: "Elizabeth P.",
    text:
      "Vitali assembled multiple IKEA pieces in no time and even fixed a drawer that was stuck. Clean, fast and super professional.",
    service: { label: "IKEA Furniture Assembly", slug: "ikea-furniture-assembly" },
  },
  {
    name: "Tiffany B.",
    text:
      "David did an awesome job assembling a crib and dresser. He organized the boxes for easy disposal and walked me through the setup.",
    service: { label: "Furniture Assembly", slug: "furniture-assembly" },
  },
  {
    name: "Amanda L.",
    text:
      "Hired Joe to patch holes in the wall and ceiling. Communication was great and the finish looks perfect. Highly recommend!",
    service: { label: "Home repairs", slug: "home-repairs" },
  },
  {
    name: "Sabrina K.",
    text:
      "Aleksandr came prepared with all the tools and extras I didn’t know I needed. Hung a chandelier and fixed a cabinet — 100% would hire again.",
    service: { label: "Electrical help", slug: "electrical-help" },
  },
  {
    name: "Jana T.",
    text:
      "Jose cleared my AC drain line that was clogging the master bath sink. Prompt, communicative, and efficient.",
    service: { label: "Plumbing", slug: "plumbing" },
  },
  {
    name: "Elisa R.",
    text:
      "Michael helped install frameless shower doors with a tricky hinge set. Patient, careful, and the result is stunning.",
    service: { label: "General Mounting", slug: "general-mounting" },
  },
];

// tiny helper to make 4★ or 5★ at random
const useRandomized = (arr) =>
  useMemo(
    () =>
      arr.map((r) => ({
        ...r,
        rating: Math.random() < 0.25 ? 4 : 5, // ~25% 4★, otherwise 5★
      })),
    []
  );

function Stars({ rating }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${i < rating ? "text-yellow-500" : "text-slate-300"}`}
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M10 15.3 4.1 19l1.6-6.7L0 7.3l6.9-.6L10 0l3.1 6.7 6.9.6-5.7 5 1.6 6.7z"
          />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  const reviews = useRandomized(BASE_REVIEWS);

  return (
    <section className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-12 py-12">
      <h2 className="mb-8 text-3xl font-extrabold tracking-tight text-brand">
        See what happy customers are saying about TaskerCA
      </h2>

      {/* Left-packed responsive grid (no awkward right gap) */}
      <div className="grid gap-10 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
        {reviews.map((r, idx) => (
          <article key={idx} className="text-slate-800">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="font-semibold">{r.name}</h3>
              <Stars rating={r.rating} />
            </div>

            <p className="text-slate-700">
              {r.text}
            </p>

            <Link
              href={`/category/${r.service.slug}`}
              className="mt-3 inline-block font-semibold text-brand hover:underline"
            >
              {r.service.label}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
