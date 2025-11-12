"use client"

import Image from "next/image"

export default function CareersPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative h-[65vh] flex items-center justify-center text-center">
        <Image
          src="/assets/mount-art-and-shelves.jpg"
          alt="Careers Banner"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="relative z-10 max-w-2xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            We&apos;re revolutionizing <br /> the future of work
          </h1>
          <button className="mt-6 bg-black hover:bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-md transition">
            See open jobs
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-lg font-semibold text-black mb-3">
          Transforming lives one task at a time
        </h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-3/5 text-sm text-gray-700 leading-relaxed">
            <p className="mb-4">
              In 2008, we created a movement that would revolutionize how work
              gets done. As a purpose-driven, two-sided marketplace company, we
              enable a better way to live. Taskers earn a meaningful income on
              their own schedule, and clients get the help they need when they
              need it. Today, we’re connecting millions globally with trusted
              Taskers in every major city.
            </p>
            <p className="mb-4">
              In 2017, GoZiply was acquired by the IKEA Group to become the
              go-to platform for anyone seeking skilled home assistance. Since
              then, we’ve continued expanding across Europe and North America,
              offering clients and Taskers opportunities to make everyday life
              easier.
            </p>
            <p className="mb-4">
              Join us at GoZiply, where your work will be as meaningful as
              your ideas, and your perspective is valued.
            </p>
            <div className="mt-6 flex gap-6">
              <div>
                <p className="text-2xl font-bold text-black">11M+</p>
                <p className="text-xs text-gray-500">tasks completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-black">450</p>
                <p className="text-xs text-gray-500">employees</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-black">9</p>
                <p className="text-xs text-gray-500">countries</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-black">2008</p>
                <p className="text-xs text-gray-500">founding year</p>
              </div>
            </div>
          </div>
          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/assets/mulching.jpg"
              alt="World Map"
              width={350}
              height={250}
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-xl font-bold mb-10 text-gray-900">
            We live by our values
          </h3>
          <div className="grid md:grid-cols-3 gap-10 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-black mb-2">Be Bold.</h4>
              <p>
                We take risks with courage and heart-driven creativity. With
                confidence and humility, we create new opportunities and lead
                with purpose.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-2">
                Own The Challenge.
              </h4>
              <p>
                We are all responsible for the success of GoZiply and know
                that with great responsibility comes great impact. We embrace
                challenges, learn from mistakes, and keep moving forward.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-2">
                Win Together With Heart.
              </h4>
              <p>
                We celebrate collaboration, shared purpose, and mutual success.
                Together, we work hard, stay kind, and lift each other up.
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10 mt-10 text-sm text-gray-700">
            <div>
              <h4 className="font-semibold text-black mb-2">
                Move Forward. Move Fast.
              </h4>
              <p>
                We value momentum and speed, prioritizing smart action over
                hesitation. We move forward together, driven by purpose.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-black mb-2">
                Obsess over Clients and Taskers.
              </h4>
              <p>
                Everything we do is for our clients and Taskers. We’re dedicated
                to making their experiences seamless, rewarding, and meaningful.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Remote Work Block */}
      <section className="bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-2/3">
            <h3 className="text-xl font-semibold mb-2">
              Remote first and highly connected
            </h3>
            <p className="text-sm leading-relaxed">
              At GoZiply, we believe in flexible work. While we enjoy
              gathering in our virtual and physical spaces for collaboration, we
              operate with a remote-first approach, empowering team members to
              work where they thrive.
            </p>
          </div>
          <div className="md:w-1/3 rounded-lg overflow-hidden border border-white/20">
            <Image
              src="/assets/mulching.jpg"
              alt="Team meeting"
              width={400}
              height={220}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-10">
            Benefits & Perks
          </h3>
          <div className="grid md:grid-cols-3 gap-10 text-sm text-gray-700">
            <div>
              <p className="font-semibold text-black mb-1">
                Health & Retirement
              </p>
              <p>Employee-covered health care and retirement match.</p>
            </div>
            <div>
              <p className="font-semibold text-black mb-1">
                Flexible Time-Off & Company Closures
              </p>
              <p>Generous PTO, sick leaves, and recharge days.</p>
            </div>
            <div>
              <p className="font-semibold text-black mb-1">Mental Wellness</p>
              <p>Wellbeing allowance and access to mindfulness programs.</p>
            </div>
            <div>
              <p className="font-semibold text-black mb-1">Family Planning</p>
              <p>Parental leaves, adoption assistance, and family support.</p>
            </div>
            <div>
              <p className="font-semibold text-black mb-1">
                Learning & Development
              </p>
              <p>Professional development stipend, learning tools access.</p>
            </div>
            <div>
              <p className="font-semibold text-black mb-1">
                Perks and Stipends
              </p>
              <p>GoZiply credit, travel support, and productivity stipend.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h3 className="text-center text-lg font-semibold text-gray-900 mb-10">
          Careers at GoZiply
        </h3>
        <div className="grid gap-4 text-sm">
          <div>
            <p className="font-semibold text-black">Business Development</p>
            <p>Business Development Lead, EU — London, UK</p>
          </div>
          <div>
            <p className="font-semibold text-black">Commercial</p>
            <p>Country Manager, France — Paris, France</p>
          </div>
          <div>
            <p className="font-semibold text-black">Data</p>
            <p>Director of Data Engineering — New York, USA</p>
            <p>Senior Data Scientist — San Francisco, USA</p>
          </div>
          <div>
            <p className="font-semibold text-black">Finance</p>
            <p>Senior Manager, Tax — USA</p>
            <p>Senior Financial Analyst, FP&A — USA</p>
          </div>
          <div>
            <p className="font-semibold text-black">Tasker Operations</p>
            <p>Senior Specialist, Supply Operations — New York, USA</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <button className="bg-black hover:bg-gray-900 text-white text-sm font-medium px-5 py-2 rounded-md transition">
            See open jobs
          </button>
        </div>
      </section>
    </main>
  )
}
