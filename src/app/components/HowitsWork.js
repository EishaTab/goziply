"use client";

import Image from "next/image";
import Link from "next/link";

const steps = [
  { n: 1, text: "Choose a Tasker by price, skills, and reviews.", dot: "bg-indigo-100 text-indigo-700" },
  { n: 2, text: "Schedule a Tasker as early as today.",            dot: "bg-amber-100  text-amber-700"  },
  { n: 3, text: "Chat, pay, tip, and review — all in one place.",  dot: "bg-emerald-100 text-emerald-700"},
];

export default function HowItWorks({
  imgSrc = "/assets/how-it-works.jpg",
  imgAlt = "Booking a task on phone at home",
}) {
  return (
    <section className="bg-[#FFF8E6] py-14 md:py-20">
      <div className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-12">
        <div className="relative">
          {/* IMAGE CONTAINER — a little narrower than page to create equal gutters */}
          <div
            className="
              relative
              mx-0 md:mx-[6vw] lg:mx-[8vw] xl:mx-[10vw]
              overflow-hidden rounded-[28px] md:rounded-[36px]
              ring-1 ring-black/5 bg-white
              shadow-[0_10px_30px_rgba(0,0,0,0.08)]
            "
          >
            <div className="relative aspect-[21/9] sm:aspect-[16/9]">
              <Image
                src={imgSrc}
                alt={imgAlt}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, (max-width:1280px) 90vw, 1200px"
              />
            </div>
          </div>

          {/* OVERLAY CARD — centered vertically, 30% left overhang, but clamped so it never goes off-screen */}
          <div
            className="
              relative mt-4
              md:mt-0 md:absolute md:top-1/2
              md:left-[clamp(0px,6vw,120px)]
              md:-translate-y-[45%]
              md:-translate-x-[20%] lg:-translate-x-[25%] xl:-translate-x-[30%]
            "
          >
            <div
              className="
                max-w-[560px] rounded-[28px]
                bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70
                p-6 md:p-8 ring-1 ring-slate-900/10
                shadow-[0_10px_25px_rgba(2,6,23,0.12)]
              "
            >
              <h2 className="mb-5 text-3xl font-extrabold text-slate-900">How it works</h2>

              <ol className="space-y-6">
                {steps.map((s) => (
                  <li key={s.n} className="flex items-start gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-bold ${s.dot}`}>
                      {s.n}
                    </span>
                    <p className="text-[17px] leading-7 text-slate-800">{s.text}</p>
                  </li>
                ))}
              </ol>

              <Link href="/how-it-works" className="mt-6 inline-block font-semibold underline underline-offset-2">
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
