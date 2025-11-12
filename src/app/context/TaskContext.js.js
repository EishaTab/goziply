"use client";
import { createContext, useReducer, useMemo } from "react";

export const TaskContext = createContext(null);

const initialState = {
  categories: {
    Assembly: {
      items: [
        "General Furniture Assembly",
        "IKEA Assembly",
        "Crib Assembly",
        "PAX Assembly",
        "Bookshelf Assembly",
        "Desk Assembly",
      ],
      img: "/assets/furnitureAssembly.jpg",
    },
    Mounting: {
      items: [
        "Hang Art,Mirror & Decor",
        "Install blinds and window treatment",
        "Mount and Anchor Furniture",
        "Install Shelves,Rods & Hooks",
        "Other Mounting",
        "TV Mounting",
      ],
      img: "/assets/mount-tv-on-wall.jpg",
    },
    Moving: {
      items: [
        "Help Moving",
        "Truck-Assisted Help Moving",
        "Trash & Furniture Removal",
        "Rearrange Furniture",
        "Junk Haul Away",
      ],
      img: "/assets/HelpMoving.jpg",
    },
    Cleaning: {
      items: [
        "General Cleaning",
        "Spring Cleaning",
        "Apartment Cleaning",
        "Deep Cleaning",
        "Garage Cleaning",
        "Move Out Clean",
      ],
      img: "/assets/Cleaning.jpg",
    },
    "Outdoor Help": {
      items: [
        "Yard Work",
        "Lawn Care",
        "Weed Removal",
        "Mulching",
        "Gardening Services",
        "Landscaping",
        "Lawn Mowing",
        "Branch & Hedge Trimming",
      ],
      img: "/assets/mulching.jpg",
    },
    "Home Repairs": {
      items: [
        "Wall Repair",
        "Sealing & Caulking",
        "Appliance Installation & Repairs",
        "Door, Cabinet, & Furniture Repair",
        "Window & Blinds Repair",
        "Flooring & Tiling Help",
        "Electrical Help",
        "Plumbing Help",
        "Light Carpentry",
      ],
      img: "/assets/HomeRepair.jpg",
    },
    Painting: {
      items: [
        "Indoor Painting",
        "Wallpapering",
        "Outdoor Painting",
        "Concrete & Brick Painting",
        "Accent Wall Painting",
        "Wallpaper Removal",
      ],
      img: "/assets/painting.jpg",
    },
    Trending: {
      items: [
        "General Furniture Assembly",
        "General Mounting",
        "TV Mounting",
        "Help Moving",
        "Cleaning",
        "Donation Drop Off",
        "Personal Assistant",
      ],
      img: "/assets/PersonalAssistance.jpg",
    },
  },

  // mapping icons
  categoryIcons: {
    Assembly: "PuzzlePieceIcon",
    Mounting: "WrenchIcon",
    Moving: "TruckIcon",
    Cleaning: "SparklesIcon",
    "Outdoor Help": "SunIcon",
    "Home Repairs": "WrenchScrewdriverIcon",
    Painting: "PaintBrushIcon",
    Trending: "FireIcon",
  },

  categoryInfo: {
    Assembly: {
      description:
        "Skip the frustration — let us assemble your furniture quickly and correctly.",
      points: [
        "Expertly assemble beds, cribs, wardrobes, desks, and more.",
        "Specialized in IKEA PAX and other modular furniture.",
        "Ensure stability and safe setup for every piece.",
        "Now trending: Smart desks, standing tables, and modular bookshelves.",
      ],
    },
    Mounting: {
    description: "Professional mounting services to keep your space secure and stylish.",
    points: [
      "Securely mount your TV, shelves, art, mirrors, dressers, and more.",
      "Install blinds, window treatments, and curtain rods with precision.",
      "Anchor furniture to keep your home child- and pet-safe.",
      "Now trending: Gallery walls, art TVs, and wraparound bookcases.",
    ],
  },
  Moving: {
    description: "Moving made simple — strong, reliable help for heavy lifting.",
    points: [
      "Assist with apartment, home, and office moves.",
      "Truck-assisted moving and hauling available.",
      "Safely rearrange furniture and handle bulky items.",
      "Now trending: Eco-friendly donation drop-offs and junk removal.",
    ],
  },
  Cleaning: {
    description: "Fresh spaces, stress-free cleaning tailored to your needs.",
    points: [
      "Deep clean kitchens, bathrooms, and living areas.",
      "Spring cleaning and seasonal refreshes.",
      "Move-in / Move-out cleaning for a spotless handover.",
      "Now trending: Green cleaning and allergen-free services.",
    ],
  },
  "Outdoor Help": {
    description: "Keep your outdoor spaces fresh, green, and welcoming.",
    points: [
      "Lawn mowing, edging, and full yard maintenance.",
      "Weed removal, mulching, and seasonal prep.",
      "Trim trees, hedges, and remove debris safely.",
      "Now trending: Urban gardening and eco-landscaping.",
    ],
  },
  "Home Repairs": {
    description: "From small fixes to essential repairs — we’ve got you covered.",
    points: [
      "Repair walls, doors, windows, and blinds.",
      "Handle electrical and plumbing essentials.",
      "Install appliances and perform light carpentry.",
      "Now trending: Smart home device installations.",
    ],
  },
  Painting: {
    description: "Bring color and life into your home with professional painting services.",
    points: [
      "Indoor and outdoor painting for any space.",
      "Accent wall designs and wallpapering.",
      "Concrete, brick, and textured finishes.",
      "Now trending: Bold accent walls and modern wallpaper removal.",
    ],
  },
  Trending: {
    description: "Our most popular services that everyone’s booking right now.",
    points: [
      "Furniture assembly and TV mounting made easy.",
      "Reliable moving and deep cleaning help.",
      "Donation drop-offs and organizing services.",
      "Now trending: Minimalist décor setups and gallery walls.",
    ],
  },
  },

  selectedCategory: "Assembly",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
}

export default function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
  );
}
