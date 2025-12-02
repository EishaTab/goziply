import Hero from "../main-components/hero";
import About from "../main-components/about";
import CardsSection from "../main-components/cards";
import PhotoSection from "../main-components/photo";

const MainCategoryLayout = ({ service }) => {
  if (!service) return null;

  return (
    <>
      {/* Hero Section */}
      <Hero data={service.pageContent?.hero} />

      {/* About Section */}
      <About data={service.pageContent?.about} />

      {/* Cards Section */}
      <CardsSection items={service.pageContent?.cardsSection} />

      {/* Photo Section */}
      <PhotoSection data={service.pageContent?.photoSection} />

      {/* Optional Extra Section (like Customer Reviews) */}
      <section className="flex flex-col md:flex-row px-4 md:px-8 py-12 gap-8">
        {/* ...extra content */}
      </section>
    </>
  );
};

export default MainCategoryLayout;
