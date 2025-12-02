import Link from "next/link";

const CardsSection = ({ items }) => {
  if (!items || !items.length) return null;

  return (
    <section className="w-full py-16 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Explore Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((card, index) => (
          <Link
            key={index}
            href={card.href}
            className="block bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={card.image}  // ✅ fixed from card.img
              alt={card.href.split("/").pop()} // using last part of href as name
              className="w-full h-48 object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {card.href.split("/").pop().replace(/-/g, " ")} {/* friendly display */}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CardsSection; // ✅ only one default export
