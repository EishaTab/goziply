"use client";

import Link from "next/link";

function ShieldCheck(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        d="M12 2.3 4.5 5v6.5c0 5 3.7 9 7.5 10 3.8-1 7.5-5 7.5-10V5L12 2.3zm-1.2 13.2-3.3-3.3 1.4-1.4 1.9 1.9 4.5-4.5 1.4 1.4-5.9 5.9z"
      />
    </svg>
  );
}

export default function Satisfaction() {
  return (
    <section className="relative mx-auto max-w-screen-xl px-6 md:px-10 lg:px-12 py-12 md:py-16">
      

      <h2 className="mb-8 text-3xl md:text-[38px] font-extrabold leading-tight text-slate-900">
        Your satisfaction,{" "}
        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
          guaranteed
        </span>
      </h2>

      <div className="grid gap-10 md:grid-cols-3">
        {/* 1 — Happiness Pledge */}
        <article>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">Happiness Pledge</h3>
          <p className="text-slate-700 leading-relaxed">
            If you’re not satisfied,{" "}
            <Link href="/happiness-pledge" className="underline underline-offset-2 text-slate-900 hover:text-brand">
              we’ll work to make it right.
            </Link>
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 ring-1 ring-emerald-200">
            <ShieldCheck className="h-5 w-5 text-emerald-700" />
            <span className="text-emerald-900 font-medium">Happiness pledge</span>
          </div>
        </article>

        {/* 2 — Vetted Taskers */}
        <article>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">Vetted Taskers</h3>
          <p className="text-slate-700 leading-relaxed">
            Taskers are always background checked before joining the platform.
          </p>
        </article>

        {/* 3 — Dedicated Support */}
        <article>
          <h3 className="text-2xl font-semibold text-slate-900 mb-2">Dedicated Support</h3>
          <p className="text-slate-700 leading-relaxed">
            Friendly service when you need us — every day of the week.
          </p>
        </article>
      </div>
    </section>
  );
}
