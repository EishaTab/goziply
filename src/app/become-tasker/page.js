"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Features from "../components/Features";
import WhatIsTaskRabbit from "../components/WhatIsTaskRabbit";
import GettingStarted from "../components/GettingStarted";
import EmployeeReview from "../components/EmployeeReview";
import FAQAccordion from "../components/FAQAccordion";
import { rates } from "../data/rates";
import { TaskerSignup } from "../components/auth/TaskerSignup";
export default function BecomeATasker() {
  const [data, setData] = useState(rates);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [ShowTS, setShowTS] = useState(false)

  // Fetch cities.json
  useEffect(() => {
    fetch("/cities.json")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setSelectedCity(json[0].name);
        setSelectedCategory(Object.keys(json[0].prices)[0]);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  // Update price whenever city or category changes
  useEffect(() => {
    if (selectedCity && selectedCategory && data.length > 0) {
      const city = data.find((c) => c.name === selectedCity);
      if (city) {
        setPrice(city.prices[selectedCategory]);
      }
    }
  }, [selectedCity, selectedCategory, data]);

  return (
    <>
    {ShowTS && <TaskerSignup setShowTS={setShowTS}/>}
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Left Image */}
      <div className="relative hidden md:block">
        <Image src="/Assembly.webp" alt="Tasker" fill className="object-cover" />
      </div>

      {/* Right Side Form */}
      <div className="flex flex-col justify-center px-8 md:px-16">
        <h1 className="text-2xl font-bold mb-2">Earn money your way</h1>
        <p className="text-gray-600 mb-6">
          See how much you can make tasking on TaskRabbit
        </p>

        {/* City Dropdown */}
        <div className="mb-4">
          <label className="font-bold">Select your city</label>
          <select
            className="mt-2 border rounded-lg p-3 w-full bg-gray-50 font-bold "
            value={selectedCity}
            onChange={(e) => {
              const cityName = e.target.value;
              setSelectedCity(cityName);
              const city = data.find((c) => c.name === cityName);
              if (city) setSelectedCategory(Object.keys(city.prices)[0]);
            }}
          >
            {data.map((c) => (
              <option className="font-bold" key={c.name} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="font-bold">Select category</label>
          <select
            className="mt-2 border rounded-lg p-3 w-full bg-gray-50 font-bold"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {selectedCity &&
              Object.keys(data.find((c) => c.name === selectedCity).prices).map(
                (cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                )
              )}
          </select>
        </div>

        {/* Price */}
        <div className="text-3xl font-bold mb-6 mt-4 ">
          {price !== null && price !== undefined ? (
            <>
              ${price} <span className="text-lg font-normal">per hour</span>
            </>
          ) : (
            <span className="text-gray-500">Select a category</span>
          )}
        </div>

        {/* Button */}
      {/* Button changed to an <a> tag with an external link */}
<a 
  href="/auth/signup"
  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg w-full text-center"
>
  **Get started**
</a>

        {/* Sign In link */}
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-emerald-600 font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
     <Features/>
     <WhatIsTaskRabbit/>
     <GettingStarted/>
     <EmployeeReview/>
     <FAQAccordion/>
     </>
  );
}
