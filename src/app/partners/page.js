// pages/index.js
import Head from 'next/head';

// --- COMPONENT: Process Section ---
const ProcessSection = () => {
  const steps = [
    { 
      title: "Build Customer Loyalty", 
      description: "Your customers get fast, reliable assembly. They'll keep coming back." 
    },
    { 
      title: "Increase Sales & Reduce Returns", 
      description: "Offering assembly services can boost product sales and reduce returns." 
    },
    { 
      title: "Seamless Integration", 
      description: "Our platform integrates easily with your existing e-commerce setup." 
    },
  ];

  return (
    <section className="py-16 text-center bg-white text-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        {/* Logo/Branding Placeholder */}
        <h1 className="text-xl font-extrabold text-black mb-4">GOZIPLY</h1>
        
        <h2 className="text-3xl font-extrabold mb-2">
          Lift Sales without a lifting a finger.
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Partner with **Goziply** and offer a seamless assembly service, driving sales and customer loyalty.
        </p>
        
        {/* Main CTA Button */}
        <a href="#contact" className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300 mb-12">
          START YOUR PARTNERSHIP
        </a>

        {/* The three-step process visualization */}
        <div className="flex justify-center items-start space-x-8">
          {steps.map((step, index) => (
            <div key={index} className="w-1/3 flex flex-col items-center">
              {/* Placeholder for circular image/icon (Replace with Next/Image) */}
              <div className="w-24 h-24 rounded-full bg-gray-200 mb-4 overflow-hidden">
                 {/*  */}
              </div>
              <h3 className="text-lg font-bold mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        {/* Secondary CTA Button */}
        <a href="#contact" className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition duration-300 mt-12">
          GET STARTED TODAY
        </a>
      </div>
    </section>
  );
};

// --- COMPONENT: Contact Form ---
const ContactForm = () => {
    // Dropdown/Checkbox options from the screenshot
    const interestOptions = ['Hardware', 'Appliances', 'Furniture', 'Sporting Goods', 'BBQs', 'Fitness'];
    const hearAboutOptions = ['Google', 'Referral', 'Email', 'Press', 'Trade Show', 'Other'];

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white" id="contact">
            <h2 className="text-2xl font-bold text-center mb-2">
                Want to learn more about our work with **Goziply**?
            </h2>
            <p className="text-center text-gray-600 mb-8">
                We'd love to learn more about your interest in partnering with us. Please share a few details below and we will be in touch shortly.
            </p>

            <form className="space-y-4">
                {/* Basic Text Inputs */}
                {['Name', 'Email Address', 'Phone number', 'Company Name', 'Website URL'].map((label) => (
                    <div key={label}>
                        <label className="block text-sm font-medium text-gray-700">{label}</label>
                        <input
                            type={label.includes('Email') ? 'email' : 'text'}
                            placeholder={`Enter your ${label.toLowerCase()}`}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-black focus:border-black"
                        />
                    </div>
                ))}

                {/* Button/Radio Group - How did you hear about us? */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        How did you hear about us?
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {hearAboutOptions.map((option) => (
                            <button key={option} type="button" className="border border-gray-400 text-sm px-3 py-1 rounded-full hover:bg-gray-100 transition">
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Button/Radio Group - Which Types of Items do you sell? */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Which Types of Items do you sell?
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {interestOptions.map((option) => (
                            <button key={option} type="button" className="border border-gray-400 text-sm px-3 py-1 rounded-full hover:bg-gray-100 transition">
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Textarea */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        How can Goziply help your customers or business?
                    </label>
                    <textarea
                        rows="4"
                        placeholder="Enter any additional details about your needs..."
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-black focus:border-black"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                    <button
                        type="submit"
                        className="bg-black text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
                    >
                        Submit
                    </button>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">
                    Looking to get your **Goziply** application <a href="#" className="text-black underline">click here</a>.
                </p>
            </form>
        </div>
    );
}

// --- COMPONENT: Case Study Section ---
const CaseStudySection = () => {
  const stats = [
    { value: "4.7X increase", description: "in AOV (Average Order Value) from assembly customers" },
    { value: "30% decrease", description: "in returns of products requiring assembly" },
    { value: "Highest Happy Customer Score", description: "among all service providers" },
  ];

  return (
    <section className="py-16 text-center bg-white text-gray-800 border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        {/* Goziply (IKEA) Logo/Branding Placeholder */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-yellow-400 flex items-center justify-center rounded-lg text-black font-extrabold text-lg">
             GZ
          </div>
          <h3 className="text-xl font-bold mt-2">Case Study</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <p className="text-2xl font-extrabold text-black mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


// --- MAIN PAGE COMPONENT ---
export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Head>
        <title>Goziply Partner Program</title>
        <meta name="description" content="Partner with Goziply for seamless assembly services." />
      </Head>

      <main>
        {/* 1. Top Process Section */}
        <ProcessSection />

        {/* 2. The large image section (Use a custom style to load your image) */}
        <div 
          className="h-[500px] w-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/goziply-assembly-bg.jpg')" }} 
        >
          {/* This section holds the large background image */}
        </div>

        {/* 3. Contact Form Section */}
        <ContactForm />

        {/* 4. Case Study Section */}
        <CaseStudySection />
      </main>

      {/* Simple Footer */}
      <footer className="py-4 text-center text-xs text-gray-500 border-t mt-8">
        © {new Date().getFullYear()} Goziply. All rights reserved.
      </footer>
    </div>
  );
}