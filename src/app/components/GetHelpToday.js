"use client";

import Link from "next/link";

const SERVICES = [
  "General Mounting",
  "TV Mounting",
  "Furniture Assembly",
  "IKEA Furniture Assembly",
  "Help Moving",
  "House Cleaning",
  "Yardwork",
  "Furniture Removal",
  "Lawn Care",
  "Hang Pictures",
  "In Home Furniture Movers",
  "Shelf Mounting",
  "Light Installation",
  "Plumbing",
];

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function GetHelpToday({ showDecor = false }) {
  return (
    // KEY: hide any negative-positioned decor from causing horizontal scroll
    <section className="relative overflow-x-hidden py-12 md:py-16">
      {showDecor && (
        <>
          {/* left blob — only show on md+ and keep offset smaller on md */}
          <div className="pointer-events-none hidden md:block md:absolute md:-left-12 lg:-left-24 bottom-0 h-44 w-44 rounded-[56px] bg-emerald-500/25 blur-2xl" />
          {/* right grid — fix typo: use right-6, and md+ only */}
          <div
            className="pointer-events-none hidden md:block md:absolute right-6 top-6 h-64 w-64 rotate-12 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              color: "#0f172a",
            }}
          />
        </>
      )}

      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-12">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-800">
          Get help Today
        </h2>

        <nav aria-label="Popular services">
          {/* KEY: ensure container itself never grows wider than screen */}
          <ul className="flex max-w-full flex-wrap gap-3 sm:gap-4">
            {SERVICES.map((label) => (
              <li key={label}>
                <Link
                  href={`/category/${slugify(label)}`}
                  className="inline-flex items-center whitespace-nowrap rounded-full border border-slate-300
                             px-4 py-2.5 text-sm sm:px-5 sm:py-3 sm:text-[15px] font-semibold text-slate-900
                             shadow-sm hover:bg-slate-50 active:translate-y-px focus:outline-none
                             focus-visible:ring-2 focus-visible:ring-brand/60"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-8">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-semibold text-brand hover:underline"
          >
            See All Services
            <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current" aria-hidden="true">
              <path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3 1.4-1.4Z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
