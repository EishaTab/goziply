"use client";

import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Furniture Assembly",
    price: 49,
    slug: "furniture-assembly",
   img: "/assets/furniture-assembly.jpg", // ✅ correct (no trailing space)
  },
  {
    title: "Mount Art or Shelves",
    price: 65,
    slug: "mount-art-or-shelves",
    img: "/assets/mount-art-and-shelves.jpg",
  },
  {
    title: "Mount a TV",
    price: 69,
    slug: "mount-a-tv",
    img: "/assets/mount-tv-on-wall.jpg",
  },
  {
    title: "Help Moving",
    price: 67,
    slug: "moving-help",
    img: "/assets/help-moving.jpg",
  },
  {
    title: "Home & Apartment Cleaning",
    price: 49,
    slug: "home-cleaning",
    img: "/assets/home-and-apartment-cleaning.jpg",
  },
  {
    title: "Minor Plumbing Repairs",
    price: 74,
    slug: "minor-plumbing-repairs",
    img: "/assets/plumbing-repair.jpg",
  },
  {
    title: "Electrical Help",
    price: 69,
    slug: "electrical-help",
    img: "/assets/electricity-help.jpg",
  },
  {
    title: "Heavy Lifting",
    price: 61,
    slug: "heavy-lifting",
    img: "/assets/heavy-lifting.jpg",
  },
];

function ProjectCard({ p }) {
  return (
    <Link
      href={`/category/${p.slug}`}
      className="group block overflow-hidden rounded-2xl ring-1 ring-slate-900/10 bg-white shadow-sm transition
                 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={p.img}
          alt={p.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>

      <div className="bg-slate-50 p-4 text-center">
        <h3 className="text-base font-semibold text-slate-900">{p.title}</h3>
        <p className="text-sm text-slate-600">
          Projects starting at ${p.price}
        </p>
      </div>
    </Link>
  );
}

export default function PopularProjects() {
  return (
    <section className="mx-auto max-w-screen-xl px-6 md:px-10 lg:px-12 py-12">
      <div className="mb-8 flex items-baseline justify-between">
        <h2 className="text-3xl font-extrabold tracking-tight text-brand">
          Popular Projects
        </h2>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-brand font-medium hover:underline"
        >
          See All Services
          <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current" aria-hidden="true">
            <path d="M13.2 5.3 19.9 12l-6.7 6.7-1.4-1.4 4.3-4.3H4v-2h12.1l-4.3-4.3 1.4-1.4Z" />
          </svg>
        </Link>
      </div>

      {/* NOTE: auto-fit grid fixes the “right empty space” and always packs from the left */}
      <div className="grid gap-6 md:gap-7 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </section>
  );
}

