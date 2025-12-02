const PhotoSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-black">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src={data.image}
            alt={data.heading}
            className="w-full h-80 md:h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right: Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {data.heading}
          </h2>
          {data.text && (
            <p className="text-gray-300 leading-relaxed">{data.text}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default PhotoSection;
