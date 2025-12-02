// components/AboutSection.jsx

const AboutSection = ({ data }) => {
  if (!data) return null;

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-gray-200 ">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {data.title}
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto mb-4">
          {data.text}
        </p>
        
        <h2 className="text-3xl md:text-2xl font-bold text-gray-900 mb-4">
          {data.title2}
        </h2>

        <p className="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
          {data.text1}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
