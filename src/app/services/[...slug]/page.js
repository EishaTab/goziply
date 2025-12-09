import SubServiceLayout from "@/app/layouts/SubServicesLayout";
import MainCategoryLayout from "@/app/layouts/MainServicesLayout"; // ✅ uncommented
import servicesLinks from "../../data/ServicesLinks";
import BookNow from "../book/page";

// Helper function to find service based on slug
function findServiceBySlug(links, slugParam) {
  const slugArray = Array.isArray(slugParam) ? slugParam : slugParam ? [slugParam] : [];

  if (!slugArray.length) return { type: "mainPage" };

  const mainSlug = slugArray[0];
  const main = links.find(
    (item) => item.href.replace(/\/$/, "") === `/services/${mainSlug}`
  );
  if (!main) return null;

  // If only /services/[main]
  if (slugArray.length === 1) return { type: "main", data: main };

  // If exactly 2 segments: /services/main/sub
  const fullPath = `/services/${slugArray.join("/")}`;
  const sub = main.subServices?.find(
    (s) => s.href.replace(/\/$/, "") === fullPath.replace(/\/$/, "")
  );

  if (sub) return { type: "sub", data: sub, parent: main };

  // Handle book path: /services/main/sub/book
  if (slugArray.length === 3 && slugArray[2] === "book") {
    const main2 = links.find(
      (item) => item.href.replace(/\/$/, "") === `/services/${slugArray[0]}`
    );
    const sub2 = main2?.subServices?.find(
      (s) => s.href.replace(/\/$/, "") === `/services/${slugArray[0]}/${slugArray[1]}`
    );
    if (sub2) return { type: "book", data: sub2, parent: main2 };
  }

  // Handle direct service booking: /services/moving-book or /services/cleaning-book
  if (slugArray.length === 2 && slugArray[1].endsWith("-book")) {
    const main3 = links.find(
      (item) => item.href.replace(/\/$/, "") === `/services/${slugArray[0]}`
    );
    const serviceName = slugArray[1].replace("-book", "");

    if (main3) {
      const sub3 = main3.subServices?.find(
        (s) => s.name.toLowerCase().replace(/\s+/g, "-") === serviceName.toLowerCase()
      );
      if (sub3) return { type: "book", data: sub3, parent: main3 };

      // If no exact sub-service match, use main service
      return { type: "book", data: main3, parent: null };
    }
  }

  return null;
}

export default function ServicePage({ params }) {
  const { slug } = params;
  const service = findServiceBySlug(servicesLinks, slug);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <p className="text-gray-600">The service you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* All services page */}
      {service.type === "mainPage" && (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Services</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesLinks.map((serviceItem) => (
              <div key={serviceItem.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">{serviceItem.name}</h2>
                <p className="text-gray-600 mb-4">{serviceItem.description}</p>
                <div className="flex flex-wrap gap-2">
                  {serviceItem.subServices?.slice(0, 3).map((sub) => (
                    <span key={sub.name} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">{sub.name}</span>
                  ))}
                  {serviceItem.subServices && serviceItem.subServices.length > 3 && (
                    <span className="text-gray-500 text-xs">+{serviceItem.subServices.length - 3} more</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main service page */}
      {service.type === "main" && (
        <MainCategoryLayout service={service.data} />
      )}

      {/* Sub-service page */}
      {service.type === "sub" && (
        <SubServiceLayout subService={service.data} parent={service.parent} />
      )}
      {console.log('service.type',service.type)}

      {/* Book page */}
      {service.type === "book" && (
        <div>
          <div className="bg-white border-b">
            <div className="container mx-auto px-4 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Book {service.data.name}</h1>
                  {service.parent && <p className="text-gray-600 mt-1">Category: {service.parent.name}</p>}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Quick Booking</p>
                  <p className="text-lg font-semibold text-green-600">Available Taskers Ready</p>
                </div>
              </div>
            </div>
          </div>
          <BookNow serviceData={service.data} />
        </div>
      )}
    </div>
  );
}
