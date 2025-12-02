// components/Hero.jsx

const Hero = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full relative">
      {/* Background Image */}
      <img
        src={data.banner}
        alt={data.title}
        className="w-full h-96 md:h-[600px] object-cover"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 bg-black/52">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
          {data.title}
        </h1>
        <p className="text-gray-200 md:text-lg leading-relaxed mb-18">
          {data.description}
        </p>
      </div>
    </section>
  );
};

export default Hero;
