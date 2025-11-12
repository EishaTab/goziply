"use client";
import Image from "next/image";
import {
  WrenchScrewdriverIcon,
  WrenchIcon,
  TruckIcon,
  SparklesIcon,
  PaintBrushIcon,
  FireIcon,
  SunIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { TaskContext } from "@/app/context/TaskContext.js.js";

export default function HomeBanner() {
  const { state, dispatch } = useContext(TaskContext);
  const { categories, selectedCategory, categoryIcons } = state;

  // mapping string -> actual imported icon
  const iconMapping = {
    WrenchScrewdriverIcon,
    WrenchIcon,
    TruckIcon,
    SparklesIcon,
    PaintBrushIcon,
    FireIcon,
    SunIcon,
    PuzzlePieceIcon,
  };
  return (
    <>
      {/* Top Section */}
      <section className="relative flex flex-col items-center justify-center text-center pt-20 pb-4 bg-white px-4">
        {/* Decorative shapes */}
        <div className="absolute left-0 top-10 hidden xl:block">
          <Image src="/top-left.svg" alt="left shape" width={150} height={100} />
        </div>
        <div className="absolute right-0 top-0 hidden xl:block">
          <Image src="/top-right.svg" alt="right shape" width={400} height={400} />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-6xl mt-4 font-bold max-w-2xl leading-snug">
          Book trusted help for home tasks
        </h1>

        {/* Search Box */}
        <div className="mt-12 flex h-16 w-full max-w-2xl border rounded-full overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="What do you need help with?"
            className="flex-1 px-4 py-2 outline-none text-gray-700 text-sm md:text-base"
          />
          <button className="th-bg-5 px-6 text-white font-semibold">
            Search
          </button>
        </div>
            
            
                   <div className="w-full mt-24 overflow-x-auto">
          <div className="flex gap-8 md:gap-16 justify-start px-4 md:px-10 md:justify-center min-w-max border-b border-gray-300 pb-2">
            {Object.keys(categories).map((cat) => {
              const Icon = iconMapping[categoryIcons[cat]];
              return (
                <div
                  key={cat}
                  onClick={() =>
                    dispatch({ type: "SET_CATEGORY", payload: cat })
                  }
                  className={`relative flex flex-col items-center cursor-pointer transition ${
                    selectedCategory === cat ? "th-text-5" : "text-gray-700"
                  }`}
                >
                  <Icon className="h-10 w-10 md:h-12 md:w-12" />
                  <p className="mt-2 text-xs md:text-sm">{cat}</p>
                  {selectedCategory === cat && (
                    <span className="absolute -bottom-[10px] h-[3px] w-8 rounded-full th-bg-5"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Subcategories */}
        <div className="flex flex-wrap gap-x-4 gap-y-4 md:gap-x-10 justify-center md:justify-start lg:px-20 mt-10 w-full">
          {categories[selectedCategory].items.map((item) => (
            <button
              key={item}
              className="flex justify-center items-center border rounded-full text-[12px] md:text-sm font-bold md:font-semibold hover:bg-blue-100 transition w-32 h-16 p-1 md:w-48 md:h-12"
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* Full Screen Section with Dynamic Image */}
      <section className="relative w-full h-[80vh] flex items-center justify-center px-4 md:px-12">
        <div className="relative w-full max-w-6xl h-full th-bg-5 rounded-2xl flex items-center justify-center">
          {/* Inner image box */}
          <div
            className="absolute ml-16 rounded-xl overflow-hidden"
            style={{
              width: "calc(85% - 10px)",
              height: "calc(100% - 60px)",
            }}
          >
            <Image
              src={categories[selectedCategory].img}
              alt={selectedCategory}
              fill
              className="object-cover"
            />
          </div>

          {/* Overlay Info Box */}
          <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2">
            <div className="bg-white/80 backdrop-blur-md p-4 md:p-8 rounded-2xl shadow-xl max-w-5xl">
              <h2 className="text-xl md:text-3xl font-bold th-text-5">
                {selectedCategory}
              </h2>
              <ul className="mt-3 space-y-2">
                {categories[selectedCategory].items.map((item) => (
                  <li
                    key={item}
                    className="text-gray-700 font-medium text-sm md:text-base border-b pb-2 last:border-none"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
