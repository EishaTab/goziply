"use client"

import Image from "next/image"

export default function AboutPage() {
  const team = [
    {
      name: "Ania Smith",
      role: "Chief Executive Officer",
      img: "/team/ania-smith.jpg",
    },
    {
      name: "Ben Edelhart",
      role: "Chief Administrative Officer and General Counsel",
      img: "/team/ben-edelhart.jpg",
    },
    {
      name: "Amy Ming Zhang",
      role: "Chief Financial Officer",
      img: "/team/amy-ming-zhang.jpg",
    },
    {
      name: "Christopher Ager",
      role: "Chief Commercial Officer",
      img: "/team/christopher-ager.jpg",
    },
    {
      name: "Drew Wrangles",
      role: "Chief Product Officer",
      img: "/team/drew-wrangles.jpg",
    },
    {
      name: "Scott Porad",
      role: "Chief Technology Officer",
      img: "/team/scott-porad.jpg",
    },
    {
      name: "Tamara Rosenthal",
      role: "VP, Marketing",
      img: "/team/tamara-rosenthal.jpg",
    },
    {
      name: "Eric Haymond",
      role: "VP, Business Development",
      img: "/team/eric-haymond.jpg",
    },
    {
      name: "Jenna Costa",
      role: "VP, People",
      img: "/team/jenna-costa.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Top Section */}
      <div className="relative h-72 w-full">
        <Image
          src="/assets/mount-art-and-shelves.jpg"
          alt="About Us Banner"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      {/* Mission / Description */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
          Transforming lives, one task at a time
        </h2>
        <p className="text-gray-600 leading-relaxed">
          We bring people together. It’s at the heart of everything we do. We
          know that for every person who needs their radiator fixed before
          winter, the nursery set up for their newborn, or a TV mounted in time
          for game day, there’s someone nearby who is ready, willing, and able
          to help, without delay. When these two people come together, they help
          each other in a profound way—they offer each other a better way of
          living.
        </p>
      </section>

      {/* Leadership Team */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-10">
          Leadership Team
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
          {team.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="relative w-40 h-40 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="mt-4 text-lg font-semibold text-gray-800">
                {member.name}
              </h4>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
