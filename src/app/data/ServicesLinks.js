 const ServicesData = [
  {
    id: "featured-tasks",
    title: "Featured Tasks",
    href: "/services/featured-tasks",
    description: "Let Taskers help tackle your to-do list.",
    banner: "/Task-1.webp",
    subServices: [
      {
        name: "Furniture Assembly",
        href: "/services/featured-tasks/Furniture-Assemblly",
        banner: "/Task15.webp",
        description: "Need someone to put together furniture? Hire a Tasker to assemble your furniture and leave the building to them.",
        faqs: [
          {
            question: "What types of furniture can be assembled?",
            answer: "We can assemble beds, tables, chairs, cabinets, and most flat-pack furniture."
          },
          {
            question: "Do I need to provide tools?",
            answer: "Most Taskers bring their own basic tools, but it's best to confirm with your Tasker."
          },
          {
            question: "How long does it take?",
            answer: "Assembly time varies by furniture type, usually between 30 minutes to 2 hours."
          },
          {
            question: "Can I schedule assembly for a specific time?",
            answer: "Yes, you can choose a time that works best for you during booking."
          },
          {
            question: "Is there a satisfaction guarantee?",
            answer: "Yes, Taskrabbit ensures the work meets your expectations or offers a resolution."
          }
        ]
      },
      {
        name: "Home Repairs",
        href: "/services/featured-tasks/home-repairs",
         banner: "/Task12.webp",
        faqs: [
          {
            question: "What home repairs can Taskers do?",
            answer: "Taskers handle plumbing, electrical fixes, appliance repairs, and minor carpentry."
          },
          {
            question: "Do I need to supply materials?",
            answer: "Depends on the repair; you can confirm with your Tasker beforehand."
          },
          {
            question: "How quickly can a Tasker arrive?",
            answer: "Response time depends on availability, but many can arrive within 24 hours."
          },
          {
            question: "Are repairs guaranteed?",
            answer: "Yes, Taskrabbit offers satisfaction guarantees and dispute resolution."
          },
          {
            question: "Can I request recurring maintenance?",
            answer: "Yes, you can schedule regular visits for ongoing maintenance tasks."
          }
        ]
      },
      {
        name: "Help Moving",
        href: "/services/featured-tasks/help-moving",
         banner: "/Task12.webp",
        faqs: [
          {
            question: "Do Taskers help with packing?",
            answer: "Yes, many Taskers can assist with packing your items."
          },
          {
            question: "Are moving trucks provided?",
            answer: "You need to provide a vehicle; Taskers offer labor assistance."
          },
          {
            question: "How many Taskers should I book?",
            answer: "Depends on the size of your move; usually 2-4 for an average apartment."
          },
          {
            question: "Can Taskers lift heavy furniture?",
            answer: "Yes, they are experienced with heavy lifting and safety precautions."
          },
          {
            question: "Is there a cancellation policy?",
            answer: "Yes, Taskrabbit has a clear cancellation policy depending on timing."
          }
        ]
      },
      {
        name: "Heavy Lifting",
        href: "/services/heavy-lifting",
         banner: "/Task12.webp",
        faqs: [
          {
            question: "What items are considered heavy?",
            answer: "Furniture, appliances, pianos, and other bulky items."
          },
          {
            question: "Do Taskers provide moving equipment?",
            answer: "Most bring basic lifting straps and dollies; check with your Tasker."
          },
          {
            question: "Are there safety measures?",
            answer: "Yes, Taskers follow safety protocols to avoid damage and injury."
          },
          {
            question: "Can multiple Taskers be booked?",
            answer: "Yes, for very heavy items, multiple Taskers can assist."
          },
          {
            question: "Is insurance included?",
            answer: "Taskrabbit offers limited protection; confirm with the Tasker for high-value items."
          }
        ]
      },
      {
        name: "Home ",
        href: "/services/home-cleaning",
         banner: "/Task12.webp",
        faqs: [

          {
            question: "What cleaning services are offered?",
            answer: "Dusting, vacuuming, mopping, bathroom & kitchen cleaning, and more."
          },
          {
            question: "Do I need to provide cleaning supplies?",
            answer: "Taskers often bring basic supplies, but confirm if specialized products are needed."
          },
          {
            question: "How long does cleaning take?",
            answer: "Depends on home size; typically 1-3 hours."
          },
          {
            question: "Are Taskers background-checked?",
            answer: "Yes, all Taskers are verified and background-checked."
          },
          {
            question: "Can I request deep cleaning?",
            answer: "Yes, you can specify deep cleaning services during booking."
          }
        ]
      }

    ]
  },

  ///2222222222222222222222///////////
  {
    id: "handyman",
    title: "Handyman",
    href: "/services/handyman",
     banner: "/Task12.webp",
    description: "Hire a Tasker for help around the house",
    banner: "/Task11.webp",
    
    subServices: [
  {
    name: "Door, Cabinet, & Furniture Repair",
    href: "/services/handyman/door-repair",
     banner: "/Task13.webp",
    parent: "handyman",
    faqs: [
      {   question: "How long does a typical repair take?", answer: "Most repairs take between 30 minutes to 2 hours depending on the damage and complexity."
      },
      {
        question: "Do I need to provide materials?",
        answer: "It depends on the repair. Your Tasker will inform you beforehand if materials are required."
      },
      {
        question: "Can you repair antique furniture?",
        answer: "Yes, our Taskers are experienced with both modern and antique furniture."
      },
      {
        question: "Is there a warranty on the repair?",
        answer: "We provide a limited warranty for all handyman repairs. Check your service confirmation for details."
      },
      {
        question: "What if the repair can’t be completed?",
        answer: "Your Tasker will discuss alternatives or reschedule a follow-up visit if needed."
      }
    ]
  },
  {
    name: "Appliance Installation & Repairs",
    href: "/services/handyman/appliance-repair",
     banner: "/Task12.webp",
    parent: "handyman",
    faqs: [
      {
        question: "Do Taskers bring tools for installation?",
        answer: "Yes, Taskers bring all standard tools required for appliance installation."
      },
      {
        question: "Which appliances can be installed?",
        answer: "We install refrigerators, washers, dryers, ovens, and many other household appliances."
      },
      {
        question: "Is there a service guarantee?",
        answer: "Yes, all installations come with a 30-day service guarantee."
      },
      {
        question: "How long does installation usually take?",
        answer: "Most installations take 1-3 hours depending on the appliance."
      },
      {
        question: "Can you uninstall old appliances?",
        answer: "Yes, we can safely uninstall and remove your old appliances."
      }
    ]
  },
  {
    name: "Furniture Assembly",
    href: "/services/handyman/furniture-assembly",
     banner: "/Task12.webp",
    parent: "handyman",
    faqs: [
      {
        question: "Do I need to provide the instructions?",
        answer: "Yes, please provide the assembly manual or instructions with the furniture."
      },
      {
        question: "Do Taskers bring tools?",
        answer: "Taskers bring standard tools, but if special tools are needed, you may need to provide them."
      },
      {
        question: "How long does assembly take?",
        answer: "Assembly time varies depending on complexity, usually 30 minutes to 2 hours."
      },
      {
        question: "Can multiple items be assembled in one visit?",
        answer: "Yes, as long as time allows, multiple items can be assembled in a single visit."
      },
      {
        question: "Do Taskers handle large furniture?",
        answer: "Yes, Taskers are experienced with heavy and bulky furniture assembly."
      }
    ]
  },
  {
    name: "TV Mounting",
    href: "/services/handyman/tv-mounting",
     banner: "/Task12.webp",
    parent: "handyman",
    faqs: [
      {
        question: "Do you provide the TV mount?",
        answer: "No, you need to provide the TV mount unless specified otherwise in the service."
      },
      {
        question: "Can Taskers hide wires?",
        answer: "Yes, our Taskers can hide wires inside walls or use cable management solutions."
      },
      {
        question: "Is mounting compatible with all TVs?",
        answer: "Taskers can mount most flat-screen TVs, but very large or specialized models may need extra assessment."
      },
      {
        question: "How long does the mounting take?",
        answer: "Usually between 1-2 hours depending on the complexity."
      },
      {
        question: "Do Taskers provide a warranty on mounting?",
        answer: "Yes, mounting services come with a standard workmanship warranty."
      }
    ]
  },
  {
    name: "Drywall Repair Service",
    href: "/services/handyman/drywall-repair",
     banner: "/Task12.webp",
    parent: "handyman",
    faqs: [
      {
        question: "What types of drywall damage can be repaired?",
        answer: "Small holes, dents, cracks, and water-damaged areas can all be repaired."
      },
      {
        question: "How long does the repair take?",
        answer: "Small repairs take about 1-2 hours. Larger projects may require multiple visits."
      },
      {
        question: "Do I need to prepare the room?",
        answer: "Yes, clearing furniture and protecting floors helps ensure a smooth repair."
      },
      {
        question: "Is painting included?",
        answer: "Standard repairs usually include patching only. Painting can be requested separately."
      },
      {
        question: "Is there a guarantee?",
        answer: "Yes, all drywall repairs come with a workmanship guarantee for a set period."
      }
      
    ]
  },
  {
  name: "Flooring & Tiling Help",
  href: "/services/handyman/flooring-tiling",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    {
      question: "Do Taskers provide materials for flooring?",
      answer: "Taskers can work with materials you provide or source them for an additional cost."
    },
    {
      question: "What types of flooring can be installed?",
      answer: "Tile, laminate, hardwood, vinyl, and other common flooring types."
    },
    {
      question: "How long does a typical flooring job take?",
      answer: "Depending on the size of the area, 1-3 days for complete installation."
    },
    {
      question: "Do Taskers handle floor repair?",
      answer: "Yes, small repairs, tile replacement, and grout fixes are handled."
    },
    {
      question: "Is there a warranty on installation?",
      answer: "Standard workmanship warranty applies. Check service details for specifics."
    }
  ]
},
{
  name: "Electrical Help",
  href: "/services/handyman/electrical",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    {
      question: "Can Taskers handle wiring and outlets?",
      answer: "Yes, Taskers can safely install outlets, switches, and basic wiring jobs."
    },
    {
      question: "Do Taskers fix lighting issues?",
      answer: "Yes, they can replace bulbs, fix fixtures, and troubleshoot lighting problems."
    },
    {
      question: "Are electrical permits required?",
      answer: "For major electrical work, permits may be required. Taskers will advise you."
    },
    {
      question: "Do Taskers bring tools?",
      answer: "Yes, they carry standard electrical tools needed for most jobs."
    },
    {
      question: "Is the service insured?",
      answer: "Yes, our Taskers are insured for covered services."
    }
  ]
},
{
  name: "Sealing & Caulking",
  href: "/services/handyman/sealing",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    {
      question: "Do Taskers provide sealant materials?",
      answer: "They can use your provided materials or bring recommended sealants."
    },
    {
      question: "Which areas can be sealed?",
      answer: "Windows, doors, kitchen, bathrooms, gaps, and cracks around the house."
    },
    {
      question: "How long does a caulking job take?",
      answer: "Small jobs take 30-60 minutes; larger areas can take several hours."
    },
    {
      question: "Do Taskers clean up after sealing?",
      answer: "Yes, all surfaces are cleaned and smoothed after caulking."
    },
    {
      question: "Is there a guarantee on the work?",
      answer: "Workmanship guarantee applies to ensure proper sealing and durability."
    }
  ]
},
{
  name: "Plumbing",
  href: "/services/handyman/plumbing",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    {
      question: "Do Taskers handle leaks and pipe repairs?",
      answer: "Yes, minor leaks, pipe replacement, and faucet repairs are handled."
    },
    {
      question: "Can they install appliances like dishwashers?",
      answer: "Yes, plumbing installations for appliances are included."
    },
    {
      question: "Do I need to provide parts?",
      answer: "For small repairs, Taskers bring common parts; specialized parts may need to be provided."
    },
    {
      question: "Are emergency services available?",
      answer: "Yes, some Taskers offer emergency plumbing services depending on availability."
    },
    {
      question: "Is plumbing work guaranteed?",
      answer: "Yes, workmanship and minor leak fixes are guaranteed for a limited period."
    }
  ]
},
{
  name: "Window & Blinds Repair",
  href: "/services/handyman/window-blinds-repair",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    {
      question: "Can Taskers repair all types of windows?",
      answer: "Yes, they can handle standard, sliding, and double-hung windows."
    },
    {
      question: "Do they fix blinds and shades?",
      answer: "Yes, repair, adjust, or replace blinds and shades."
    },
    {
      question: "Do I need to remove the blinds before repair?",
      answer: "Taskers can handle removal and reinstallation as part of the service."
    },
    {
      question: "Are the repair tools provided?",
      answer: "Yes, Taskers bring all necessary tools for the job."
    },
    {
      question: "Is there a warranty on the repair?",
      answer: "Yes, repairs come with a limited warranty for quality assurance."
    }
  ]
},
{
  name: "Door, Cabinet, & Furniture Repair",
  href: "/services/handyman/door-repair",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers repair all types of doors?", answer: "Yes, interior, exterior, sliding, and cabinet doors can be repaired." },
    { question: "Can they fix furniture damages?", answer: "Yes, minor scratches, loose joints, and broken furniture parts can be repaired." },
    { question: "Do they replace hardware?", answer: "Yes, handles, hinges, and locks can be replaced if needed." },
    { question: "Is service available for cabinets?", answer: "Yes, kitchen, bathroom, and storage cabinets are included." },
    { question: "Do I need to remove items before repair?", answer: "Taskers will advise and help move small items if needed." }
  ]
},
{
  name: "Appliance Installation & Repairs",
  href: "/services/handyman/appliance-repair",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Which appliances can Taskers install?", answer: "Dishwashers, ovens, microwaves, washers, and dryers." },
    { question: "Do Taskers handle repairs?", answer: "Yes, minor appliance repairs are included." },
    { question: "Do they bring tools?", answer: "Yes, Taskers carry standard installation and repair tools." },
    { question: "Is wiring included?", answer: "Yes, safe wiring and connection are part of the installation." },
    { question: "Are replacement parts included?", answer: "Minor parts are included; specialized parts need to be provided." }
  ]
},
{
  name: "Furniture Assembly",
  href: "/services/handyman/furniture-assembly",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers assemble all types of furniture?", answer: "Yes, from cabinets to beds, tables, and chairs." },
    { question: "Do they bring tools?", answer: "Yes, Taskers bring all necessary tools for assembly." },
    { question: "How long does assembly take?", answer: "Depends on complexity; usually 30 min to 3 hours." },
    { question: "Do I need to prepare space?", answer: "Clear space is recommended; Taskers will help adjust furniture." },
    { question: "Are instructions needed?", answer: "Taskers can follow included manuals or assemble intuitively." }
  ]
},
{
  name: "TV Mounting",
  href: "/services/handyman/tv-mounting",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Which TV sizes are supported?", answer: "Most modern TVs, up to 85 inches." },
    { question: "Do Taskers provide wall mounts?", answer: "Yes, if you provide the mount or they can bring a standard one." },
    { question: "Is cable management included?", answer: "Yes, they will organize wires neatly." },
    { question: "Do they handle different wall types?", answer: "Yes, drywall, concrete, and brick walls are supported." },
    { question: "Is TV calibration included?", answer: "Basic positioning is done; advanced calibration may need user adjustment." }
  ]
},
{
  name: "Drywall Repair Service",
  href: "/services/handyman/drywall-repair",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers fix holes and cracks?", answer: "Yes, minor holes, dents, and cracks are repaired." },
    { question: "Do they paint after repair?", answer: "They can patch and prime; final paint may require user choice." },
    { question: "Are large repairs possible?", answer: "Yes, but major structural work may require a contractor." },
    { question: "Do they provide materials?", answer: "Standard drywall materials are brought; special requests need user provision." },
    { question: "Is cleanup included?", answer: "Yes, they clean dust and debris after repair." }
  ]
},
{
  name: "Flooring & Tiling Help",
  href: "/services/handyman/flooring-tiling",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers provide materials?", answer: "They can work with materials you provide or source them." },
    { question: "Which flooring types are handled?", answer: "Tile, laminate, hardwood, vinyl, and more." },
    { question: "How long does a job take?", answer: "1-3 days depending on area size." },
    { question: "Do they handle repairs?", answer: "Yes, minor repairs like tile replacement are included." },
    { question: "Is there a warranty?", answer: "Workmanship warranty applies." }
  ]
},
{
  name: "Electrical Help",
  href: "/services/electrical",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers handle wiring and outlets?", answer: "Yes, basic wiring and outlet installation is included." },
    { question: "Do they fix lighting issues?", answer: "Yes, fixtures, switches, and bulbs are handled." },
    { question: "Are permits needed?", answer: "Major electrical work may require permits; Taskers will advise." },
    { question: "Do they bring tools?", answer: "Yes, standard electrical tools are provided." },
    { question: "Is the service insured?", answer: "Yes, Taskers are insured for covered work." }
  ]
},
{
  name: "Sealing & Caulking",
  href: "/services/handyman/sealing",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers provide sealant?", answer: "Yes, or use materials you provide." },
    { question: "Which areas can be sealed?", answer: "Windows, doors, kitchens, bathrooms, gaps, and cracks." },
    { question: "How long does it take?", answer: "Small jobs: 30-60 min; large: several hours." },
    { question: "Do they clean up?", answer: "Yes, surfaces are cleaned after caulking." },
    { question: "Is there a guarantee?", answer: "Workmanship guarantee ensures proper sealing." }
  ]
},
{
  name: "Plumbing",
  href: "/services/handyman/plumbing",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers handle leaks?", answer: "Yes, minor leaks and pipe repairs are included." },
    { question: "Can they install appliances?", answer: "Yes, like dishwashers or washing machines." },
    { question: "Do I provide parts?", answer: "Minor parts are included; specialized parts may need user provision." },
    { question: "Are emergency services available?", answer: "Yes, depending on Tasker availability." },
    { question: "Is work guaranteed?", answer: "Yes, minor fixes and workmanship are guaranteed." }
  ]
},
{
  name: "Window & Blinds Repair",
  href: "/services/handyman/window-blinds-repair",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Can Taskers repair all windows?", answer: "Yes, standard, sliding, and double-hung windows." },
    { question: "Do they fix blinds?", answer: "Yes, repair or replace blinds and shades." },
    { question: "Do I remove blinds?", answer: "Taskers handle removal and reinstallation." },
    { question: "Do they bring tools?", answer: "Yes, all necessary tools are provided." },
    { question: "Is there a warranty?", answer: "Yes, repairs have a limited warranty." }
  ]
},
{
  name: "Ceiling Fan Installation",
  href: "/services/handyman/ceiling-fan-installation",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers install all fan types?", answer: "Yes, ceiling fans of standard sizes are supported." },
    { question: "Is wiring included?", answer: "Yes, safe wiring and mounting is included." },
    { question: "Do they bring tools?", answer: "Yes, all installation tools are provided." },
    { question: "Can they replace old fans?", answer: "Yes, removal and replacement is included." },
    { question: "Is work guaranteed?", answer: "Yes, limited workmanship warranty applies." }
  ]
},
{
  name: "Smart Home Installation",
  href: "/services/handyman/smart-home-installation",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Which devices can Taskers install?", answer: "Smart lights, thermostats, cameras, and speakers." },
    { question: "Do they configure devices?", answer: "Yes, basic setup and configuration is included." },
    { question: "Do they provide tools?", answer: "Yes, standard tools for installation are brought." },
    { question: "Is network setup included?", answer: "Yes, WiFi and network integration is included." },
    { question: "Is there a guarantee?", answer: "Yes, limited warranty on installation is provided." }
  ]
},
{
  name: "Heavy Lifting",
  href: "/services/handyman/heavy-lifting",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "What items can be lifted?", answer: "Furniture, appliances, and heavy boxes." },
    { question: "Do Taskers provide equipment?", answer: "Yes, dollies and straps are available if needed." },
    { question: "Is multiple Taskers available?", answer: "Yes, for very heavy items, additional Taskers can be arranged." },
    { question: "Do they move items indoors?", answer: "Yes, from one room to another or into/out of the house." },
    { question: "Is service insured?", answer: "Yes, for damage during lifting, insurance applies." }
  ]
},
{
  name: "Install Air Conditioner",
  href: "/services/handyman/air-conditioner-installation",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers install all AC types?", answer: "Yes, window, split, and portable AC units." },
    { question: "Is wiring included?", answer: "Yes, safe electrical connection is part of installation." },
    { question: "Do they bring tools?", answer: "Yes, all necessary installation tools are included." },
    { question: "Is mounting included?", answer: "Yes, proper mounting brackets are used for safety." },
    { question: "Is work guaranteed?", answer: "Yes, limited warranty applies for installation." }
  ]
},
{
  name: "Painting",
  href: "/services/handyman/painting",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers paint interior and exterior?", answer: "Yes, both interior walls and exterior surfaces." },
    { question: "Do they provide paint?", answer: "Taskers can use provided paint or suggest appropriate options." },
    { question: "Do they prep surfaces?", answer: "Yes, sanding, priming, and masking are done before painting." },
    { question: "How long does it take?", answer: "Depends on area; small rooms: 1 day, larger: several days." },
    { question: "Is cleanup included?", answer: "Yes, all paint and masking materials are cleaned after painting." }
  ]
},
{
  name: "Install Shelves, Rods & Hooks",
  href: "/services/handyman/install-shelves",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Can Taskers install all shelf types?", answer: "Yes, wall-mounted or freestanding shelves." },
    { question: "Are hooks and rods included?", answer: "Yes, installation is included." },
    { question: "Do they provide hardware?", answer: "Basic screws and anchors are included; specialty hardware may need user supply." },
    { question: "Do they mount heavy items?", answer: "Yes, Taskers ensure secure mounting of heavy items." },
    { question: "Is cleanup included?", answer: "Yes, all debris and packaging are removed after installation." }
  ]
},
{
  name: "Home Maintenance",
  href: "/services/handyman/home-maintenance",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Which tasks are included?", answer: "Minor repairs, inspections, and regular upkeep tasks." },
    { question: "Do Taskers bring tools?", answer: "Yes, standard maintenance tools are provided." },
    { question: "Do they handle plumbing and electrical?", answer: "Yes, minor plumbing and electrical tasks are included." },
    { question: "Is scheduling flexible?", answer: "Yes, Taskers can schedule maintenance at your convenience." },
    { question: "Is service guaranteed?", answer: "Yes, workmanship and safety checks are included." }
  ]
},
{
  name: "Install Blinds & Window Treatments",
  href: "/services/handyman/install-blinds",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers install all blind types?", answer: "Yes, roller, Venetian, and vertical blinds." },
    { question: "Do they provide tools?", answer: "Yes, all installation tools are included." },
    { question: "Can they repair existing blinds?", answer: "Yes, minor adjustments and fixes are done." },
    { question: "Is measuring included?", answer: "Yes, accurate measurements before installation." },
    { question: "Is work guaranteed?", answer: "Yes, limited warranty applies for proper installation." }
  ]
},
{
  name: "Home Repairs",
  href: "/services/handyman/home-repairs",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers fix small repairs?", answer: "Yes, minor plumbing, electrical, and carpentry tasks." },
    { question: "Do they provide materials?", answer: "Common repair materials are provided; specialty items may need user supply." },
    { question: "Do they handle emergency repairs?", answer: "Yes, depending on Tasker availability." },
    { question: "Do they clean up?", answer: "Yes, debris is removed after repairs." },
    { question: "Is work guaranteed?", answer: "Yes, minor repair work comes with a warranty." }
  ]
},
{
  name: "Baby Proofing",
  href: "/services/handyman/baby-proofing",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers install safety gates?", answer: "Yes, all standard baby-proofing equipment." },
    { question: "Do they secure cabinets?", answer: "Yes, locks and latches are installed." },
    { question: "Do they cover electrical safety?", answer: "Yes, outlet covers and cord management included." },
    { question: "Is furniture secured?", answer: "Yes, furniture anchoring and padding are provided." },
    { question: "Do they offer consultation?", answer: "Yes, safety advice and recommendations included." }
  ]
},
{
  name: "Yard Work Services",
  href: "/services/handyman/yard-work",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Which yard tasks are included?", answer: "Mowing, trimming, hedge care, and basic landscaping." },
    { question: "Do Taskers bring equipment?", answer: "Yes, mowers, trimmers, and hand tools are provided." },
    { question: "Do they dispose of yard waste?", answer: "Yes, cleanup and removal included." },
    { question: "Can they plant flowers or trees?", answer: "Yes, minor planting and garden care is included." },
    { question: "Is service insured?", answer: "Yes, for accidental damage during work." }
  ]
},
{
  name: "Light Installation",
  href: "/services/handyman/light-installation",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers install indoor and outdoor lights?", answer: "Yes, all standard fixtures are supported." },
    { question: "Do they provide tools?", answer: "Yes, tools and equipment for installation included." },
    { question: "Do they handle wiring?", answer: "Yes, safe electrical wiring is part of service." },
    { question: "Are all fixtures supported?", answer: "Ceiling, wall, and pendant lights are included." },
    { question: "Is work guaranteed?", answer: "Yes, limited workmanship warranty applies." }
  ]
},
{
  name: "Carpentry Services",
  href: "/services/handyman/carpentry",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers handle all carpentry?", answer: "Yes, furniture, cabinets, and wood repairs." },
    { question: "Do they bring tools?", answer: "Yes, standard carpentry tools are provided." },
    { question: "Do they cut wood onsite?", answer: "Yes, small adjustments and cutting are done onsite." },
    { question: "Is finishing included?", answer: "Minor sanding and finishing is included." },
    { question: "Is work guaranteed?", answer: "Yes, limited workmanship warranty applies." }
  ]
},
{
  name: "Hang Art, Mirror & Decor",
  href: "/services/handyman/hanging-art",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers hang mirrors and art?", answer: "Yes, all types of wall decorations." },
    { question: "Do they provide hardware?", answer: "Yes, screws, anchors, and hooks included." },
    { question: "Do they handle heavy items?", answer: "Yes, proper mounting techniques are used." },
    { question: "Is measuring included?", answer: "Yes, alignment and leveling is done." },
    { question: "Is cleanup included?", answer: "Yes, debris and packaging are removed." }
  ]
},
{
  name: "General Mounting",
  href: "/services/handyman/general-mounting",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "What can Taskers mount?", answer: "Shelves, TVs, lights, and small cabinets." },
    { question: "Do they provide tools?", answer: "Yes, all necessary mounting tools are included." },
    { question: "Is leveling included?", answer: "Yes, all items are properly aligned and leveled." },
    { question: "Do they handle drywall?", answer: "Yes, standard wall types are supported." },
    { question: "Is work guaranteed?", answer: "Yes, limited workmanship warranty applies." }
  ]
},
{
  name: "Cabinet Installation",
  href: "/services/handyman/cabinet-installation",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers install kitchen and bathroom cabinets?", answer: "Yes, all standard cabinets." },
    { question: "Do they provide hardware?", answer: "Yes, screws, brackets, and handles included." },
    { question: "Do they handle leveling?", answer: "Yes, cabinets are properly aligned and secured." },
    { question: "Do they bring tools?", answer: "Yes, all installation tools are included." },
    { question: "Is cleanup included?", answer: "Yes, debris and packaging are removed after installation." }
  ]
},
{
  name: "Wallpapering Service",
  href: "/services/handyman/wallpapering",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers hang wallpaper?", answer: "Yes, all types of wallpaper supported." },
    { question: "Do they prep walls?", answer: "Yes, walls are cleaned and primed before installation." },
    { question: "Do they provide materials?", answer: "They can use your wallpaper or suggest options." },
    { question: "How long does it take?", answer: "Depends on area; small walls: 1-2 hours, large walls: several hours." },
    { question: "Is cleanup included?", answer: "Yes, adhesive residue and debris are removed." }
  ]
},
{
  name: "Fence Installation & Repair Services",
  href: "/services/handyman/fence-repair",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers repair fences?", answer: "Yes, wood, chain link, and vinyl fences." },
    { question: "Do they install new fences?", answer: "Yes, installation of new fences included." },
    { question: "Do they provide materials?", answer: "Standard materials are used; custom requests need user supply." },
    { question: "Do they handle gates?", answer: "Yes, gate installation and repair included." },
    { question: "Is cleanup included?", answer: "Yes, debris and old material removed." }
  ]
},
{
  name: "Deck Restoration Services",
  href: "/services/handyman/deck-restoration",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers restore decks?", answer: "Yes, sanding, sealing, and minor repairs included." },
    { question: "Do they provide materials?", answer: "Standard sealants and coatings are included; specialty items need user supply." },
    { question: "How long does restoration take?", answer: "1-3 days depending on deck size." },
    { question: "Do they repair wood?", answer: "Yes, minor wood repair and replacement included." },
    { question: "Is cleanup included?", answer: "Yes, all debris removed after restoration." }
  ]
},
{
  name: "Doorbell Installation",
  href: "/services/handyman/doorbell-installation",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers install wired and wireless doorbells?", answer: "Yes, all standard types." },
    { question: "Do they handle wiring?", answer: "Yes, safe wiring included for wired doorbells." },
    { question: "Do they provide tools?", answer: "Yes, all necessary tools included." },
    { question: "Is mounting included?", answer: "Yes, proper placement and securing is done." },
    { question: "Is work guaranteed?", answer: "Yes, limited workmanship warranty applies." }
  ]
},
{
  name: "Home Theater Installing",
  href: "/services/home-theater-installing",
   banner: "/Task12.webp",
  parent: "handyman",
  faqs: [
    { question: "Do Taskers install home theater systems?", answer: "Yes, including speakers, projectors, and screens." },
    { question: "Do they handle wiring?", answer: "Yes, audio/video wiring is managed." },
    { question: "Do they provide mounting hardware?", answer: "Yes, standard mounting hardware included." },
    { question: "Can they configure devices?", answer: "Yes, basic setup and calibration is included." },
    { question: "Is cleanup included?", answer: "Yes, debris and packaging are removed after installation." }
  ]
}

]

  },

  ////22222222222////////// //
  
  {
    id: "moving-services",
    title: "Moving Services",
    href: "/services/moving-services",
    description: "From the heavy lifting to unpacking and organizing make your move easy.",
   banner: "/Task12.webp",
    subServices: [
  {
    name: "Help Moving",
    href: "/services/moving-services/help-moving",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers help with all types of moves?", answer: "Yes, small apartments, houses, and offices." },
      { question: "Do they bring equipment?", answer: "Yes, dollies, straps, and moving blankets are provided." },
      { question: "Can Taskers disassemble furniture?", answer: "Yes, minor disassembly and reassembly included." },
      { question: "Is scheduling flexible?", answer: "Yes, you can choose the date and time that works for you." },
      { question: "Is service insured?", answer: "Yes, protection is included for accidental damage during the move." }
    ]
  },
  {
    name: "Truck Assisted Help Moving",
    href: "/services/moving-services/truck-assisted",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers provide the truck?", answer: "Yes, suitable truck size based on your items." },
      { question: "Are helpers included?", answer: "Yes, drivers and movers are included in the service." },
      { question: "Is fuel included?", answer: "Yes, standard distance within city limits." },
      { question: "Do they handle packing?", answer: "Yes, they can assist with packing small items." },
      { question: "Is service insured?", answer: "Yes, damage coverage applies during transportation." }
    ]
  },
  {
    name: "Packing Services & Help",
    href: "/services/moving-services/packing",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers provide packing materials?", answer: "Yes, boxes, tape, and bubble wrap are available." },
      { question: "Do they pack fragile items?", answer: "Yes, extra care is taken for delicate and valuable items." },
      { question: "Is labeling included?", answer: "Yes, boxes are labeled for easy unpacking." },
      { question: "Can they pack large furniture?", answer: "Yes, minor disassembly and wrapping included." },
      { question: "Is service insured?", answer: "Yes, damage during packing is covered." }
    ]
  },
  {
    name: "Unpacking Services",
    href: "/services/moving-services/unpacking",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers unpack all boxes?", answer: "Yes, including fragile and heavy items." },
      { question: "Do they organize items?", answer: "Yes, items can be placed in designated rooms." },
      { question: "Do they dispose packing materials?", answer: "Yes, boxes and packing materials are removed." },
      { question: "Is setup included?", answer: "Yes, basic furniture assembly and placement included." },
      { question: "Is service insured?", answer: "Yes, accidental damages are covered." }
    ]
  },
  {
    name: "Heavy Lifting",
    href: "/services/moving-services/heavy-lifting",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Can Taskers lift heavy furniture?", answer: "Yes, sofas, cabinets, and appliances included." },
      { question: "Do they bring tools?", answer: "Yes, dollies, straps, and gloves are provided." },
      { question: "Is more than one Tasker available?", answer: "Yes, additional helpers arranged for very heavy items." },
      { question: "Do they move items upstairs?", answer: "Yes, careful handling of stairs included." },
      { question: "Is service insured?", answer: "Yes, coverage applies for damages during lifting." }
    ]
  },
  {
    name: "Local Movers",
    href: "/services/moving-services/local-movers",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers handle short-distance moves?", answer: "Yes, within the same city or nearby areas." },
      { question: "Do they provide vehicles?", answer: "Yes, suitable trucks or vans provided." },
      { question: "Are helpers included?", answer: "Yes, movers are included in the team." },
      { question: "Is scheduling flexible?", answer: "Yes, book based on your preferred date and time." },
      { question: "Is service insured?", answer: "Yes, items are protected during transport." }
    ]
  },
  {
    name: "Junk Pickup",
    href: "/services/moving-services/junk-pickup",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers remove large items?", answer: "Yes, furniture, appliances, and debris included." },
      { question: "Is disposal included?", answer: "Yes, junk is taken to disposal or recycling centers." },
      { question: "Do they bring tools?", answer: "Yes, dollies and straps are included." },
      { question: "Can hazardous items be removed?", answer: "No, chemical or hazardous waste not included." },
      { question: "Is service insured?", answer: "Yes, for accidental damage during pickup." }
    ]
  },
  {
    name: "Furniture Movers",
    href: "/services/moving-services/furniture-movers",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers move all types of furniture?", answer: "Yes, sofas, tables, and cabinets included." },
      { question: "Do they provide equipment?", answer: "Yes, dollies, straps, and moving blankets included." },
      { question: "Can they handle stairs?", answer: "Yes, careful lifting on stairs included." },
      { question: "Is scheduling flexible?", answer: "Yes, book at a convenient date and time." },
      { question: "Is service insured?", answer: "Yes, coverage for accidental damage included." }
    ]
  },
  {
    name: "One Item Movers",
    href: "/services/moving-services/one-item-movers",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Can Taskers move a single heavy item?", answer: "Yes, sofas, pianos, and large appliances." },
      { question: "Do they bring tools?", answer: "Yes, dollies and straps included." },
      { question: "Is pickup and drop-off included?", answer: "Yes, transport to desired location included." },
      { question: "Can multiple helpers be arranged?", answer: "Yes, for very heavy items additional Taskers can be added." },
      { question: "Is service insured?", answer: "Yes, items are protected during transport." }
    ]
  },
  {
    name: "Storage Unit Moving",
    href: "/services/moving-services/storage-unit-moving",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers move items to storage units?", answer: "Yes, loading and unloading included." },
      { question: "Do they bring equipment?", answer: "Yes, dollies and straps included." },
      { question: "Is scheduling flexible?", answer: "Yes, choose a convenient time for pickup." },
      { question: "Do they organize items?", answer: "Yes, careful stacking and placement included." },
      { question: "Is service insured?", answer: "Yes, items are protected during storage transfer." }
    ]
  },
  {
    name: "Couch Removal",
    href: "/services/moving-services/couch-removal",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers remove couches?", answer: "Yes, small and large couches included." },
      { question: "Do they provide tools?", answer: "Yes, dollies and straps included." },
      { question: "Is disassembly included?", answer: "Yes, minor disassembly included if needed." },
      { question: "Do they handle stairs?", answer: "Yes, careful lifting on stairs included." },
      { question: "Is service insured?", answer: "Yes, coverage for accidental damage included." }
    ]
  },
  {
    name: "Mattress Pick-Up & Removal",
    href: "/services/moving-services/mattress-removal",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers pick up mattresses?", answer: "Yes, all sizes included." },
      { question: "Do they provide straps and blankets?", answer: "Yes, equipment included for safe transport." },
      { question: "Can multiple mattresses be moved?", answer: "Yes, additional helpers arranged if needed." },
      { question: "Do they handle stairs?", answer: "Yes, careful lifting included." },
      { question: "Is service insured?", answer: "Yes, coverage during pickup included." }
    ]
  },
  {
    name: "Furniture Removal",
    href: "/services/moving-services/furniture-removal",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers remove all furniture types?", answer: "Yes, chairs, tables, cabinets, and beds." },
      { question: "Do they provide equipment?", answer: "Yes, dollies, straps, and blankets included." },
      { question: "Can they handle stairs?", answer: "Yes, careful handling included." },
      { question: "Is disassembly included?", answer: "Yes, minor disassembly included if needed." },
      { question: "Is service insured?", answer: "Yes, protection against damage included." }
    ]
  },
  {
    name: "Pool Table Movers",
    href: "/services/moving-services/pool-table-movers",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers move pool tables?", answer: "Yes, proper equipment used for safety." },
      { question: "Do they provide tools?", answer: "Yes, dollies, straps, and padding included." },
      { question: "Is disassembly included?", answer: "Yes, minor disassembly included if needed." },
      { question: "Can multiple helpers be arranged?", answer: "Yes, for heavy tables extra Taskers are available." },
      { question: "Is service insured?", answer: "Yes, coverage applies during the move." }
    ]
  },
  {
    name: "Appliance Removal",
    href: "/services/moving-services/appliance-removal",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers remove appliances?", answer: "Yes, all standard appliances included." },
      { question: "Do they provide equipment?", answer: "Yes, dollies and straps included." },
      { question: "Can they handle heavy appliances?", answer: "Yes, extra helpers arranged if needed." },
      { question: "Do they handle stairs?", answer: "Yes, careful lifting included." },
      { question: "Is service insured?", answer: "Yes, coverage during transport included." }
    ]
  },
  {
    name: "Heavy Furniture Moving",
    href: "/services/moving-services/heavy-furniture-moving",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers move heavy furniture?", answer: "Yes, sofas, beds, and cabinets included." },
      { question: "Do they provide equipment?", answer: "Yes, dollies, straps, and blankets included." },
      { question: "Can multiple helpers be arranged?", answer: "Yes, extra Taskers for very heavy items." },
      { question: "Do they handle stairs?", answer: "Yes, careful handling included." },
      { question: "Is service insured?", answer: "Yes, protection included during the move." }
    ]
  },
  {
    name: "Rearranging Furniture",
    href: "/services/moving-services/rearranging-furniture",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers rearrange furniture?", answer: "Yes, all rooms and items included." },
      { question: "Do they provide equipment?", answer: "Yes, dollies and straps included." },
      { question: "Is minor disassembly included?", answer: "Yes, if required for moving furniture." },
      { question: "Can multiple helpers be arranged?", answer: "Yes, if needed for large rooms." },
      { question: "Is service insured?", answer: "Yes, coverage included." }
    ]
  },
  {
    name: "Full Service Help Moving",
    href: "/services/moving-services/full-service-moving",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers provide full service moving?", answer: "Yes, packing, moving, and unpacking included." },
      { question: "Do they provide trucks and helpers?", answer: "Yes, all included for complete service." },
      { question: "Is scheduling flexible?", answer: "Yes, choose a convenient date and time." },
      { question: "Do they handle furniture assembly?", answer: "Yes, minor assembly included." },
      { question: "Is service insured?", answer: "Yes, protection included for all items." }
    ]
  },
  {
    name: "In-Home Furniture Movers",
    href: "/services/moving-services/in-home-furniture-movers",
     banner: "/Task13.webp",
    parent: "moving-services",
    faqs: [
      { question: "Do Taskers move furniture inside the home?", answer: "Yes, rearranging and relocation included." },
      { question: "Do they provide equipment?", answer: "Yes, dollies, straps, and blankets included." },
      { question: "Can multiple helpers be arranged?", answer: "Yes, for large or heavy furniture." },
      { question: "Is scheduling flexible?", answer: "Yes, choose time that works for you." },
      { question: "Is service insured?", answer: "Yes, accidental damage coverage included." }
    ]
  }
]

  },

  {
    id: "furniture--assembly",
    title: "Furniture Assembly",
    href: "/services/furniture--assembly",
    description: "Get your furniture assembled quickly and easily.",
    banner: "/Task14.webp",
    
    subServices: [
  {
    name: "Furniture Assembly",
    href: "/services/furniture--assembly/Furniture-assembly",
     banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "What types of furniture can you assemble?", answer: "We assemble all types of home and office furniture including beds, chairs, tables, and cabinets." },
      { question: "Do you bring your own tools?", answer: "Yes, our Taskers carry all necessary tools for assembly." },
      { question: "How long does assembly take?", answer: "Typically between 30 minutes to 2 hours depending on furniture complexity." },
      { question: "Can you assemble furniture purchased elsewhere?", answer: "Yes, we can assemble furniture from any store." },
      { question: "Is there a satisfaction guarantee?", answer: "Yes, our assembly service comes with a 30-day satisfaction guarantee." }
    ]
  },
  {
    name: "Patio Furniture Assembly",
    href: "/services/furniture--assembly/patio-furniture-assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you assemble all patio furniture types?", answer: "Yes, including chairs, tables, and loungers." },
      { question: "Can you assemble large patio sets?", answer: "Yes, we handle large sets efficiently." },
      { question: "Do you provide tools?", answer: "Yes, all tools are provided by the Tasker." },
      { question: "Is outdoor installation included?", answer: "Yes, we assemble furniture at the location you specify." },
      { question: "What if parts are missing?", answer: "We check all parts before starting and will advise if anything is missing." }
    ]
  },
  {
    name: "Desk Assembly",
    href: "/services/furniture--assembly/desk--assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "What types of desks can you assemble?", answer: "We assemble office, study, and computer desks of all sizes." },
      { question: "Do you assemble desks from all brands?", answer: "Yes, we assemble desks purchased from any store or online." },
      { question: "How long does it take?", answer: "Usually 30 minutes to 1 hour per desk." },
      { question: "Do you provide tools?", answer: "Yes, all necessary tools are provided." },
      { question: "Is setup guaranteed?", answer: "Yes, Taskers ensure the desk is fully assembled and functional." }
    ]
  },
  {
    name: "Dresser Assembly",
    href: "/services/furniture--assembly/dresser-assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you assemble all dresser types?", answer: "Yes, including wardrobes, cabinets, and chests." },
      { question: "Do you provide assembly tools?", answer: "Yes, all tools are included." },
      { question: "How long does it take?", answer: "1-2 hours depending on size and complexity." },
      { question: "Can you assemble pre-owned dressers?", answer: "Yes, we can assemble both new and pre-owned furniture." },
      { question: "Is there a guarantee?", answer: "Yes, our service comes with a satisfaction guarantee." }
    ]
  },
  {
    name: "Bed Assembly",
    href: "/services/furniture--assembly/bed-assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you assemble all bed types?", answer: "Yes, including single, double, queen, and king beds." },
      { question: "Do you provide tools?", answer: "Yes, Taskers bring all necessary tools." },
      { question: "How long does it take?", answer: "Typically 1-2 hours depending on the bed size." },
      { question: "Can you assemble beds from all stores?", answer: "Yes, we handle furniture from any store or online." },
      { question: "Is assembly guaranteed?", answer: "Yes, all assemblies come with a satisfaction guarantee." }
    ]
  },
  {
    name: "Bookshelf Assembly",
    href: "/services/furniture--assembly/bookshelf-assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you assemble all bookshelf types?", answer: "Yes, including small, medium, and large bookshelves." },
      { question: "Do you provide tools?", answer: "Yes, Taskers bring all necessary tools." },
      { question: "How long does it take?", answer: "30 minutes to 1 hour depending on the size." },
      { question: "Can you assemble flat-pack bookshelves?", answer: "Yes, we specialize in flat-pack furniture assembly." },
      { question: "Is there a satisfaction guarantee?", answer: "Yes, all assembly work is guaranteed." }
    ]
  },
  {
    name: "Couch Assembly",
    href: "/services/furniture--assembly/couch-assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you assemble all couch types?", answer: "Yes, including sectional, recliner, and sofa beds." },
      { question: "Do you provide tools?", answer: "Yes, all tools are included." },
      { question: "How long does it take?", answer: "1-2 hours depending on the couch complexity." },
      { question: "Can you assemble second-hand couches?", answer: "Yes, we can assemble both new and used couches." },
      { question: "Is assembly guaranteed?", answer: "Yes, all furniture assembly comes with a satisfaction guarantee." }
    ]
  },
  {
    name: "Chair Assembly",
    href: "/services/furniture--assembly/chair-assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you assemble all chair types?", answer: "Yes, including dining chairs, office chairs, and armchairs." },
      { question: "Do you provide tools?", answer: "Yes, all necessary tools are provided." },
      { question: "How long does it take?", answer: "30-60 minutes depending on chair complexity." },
      { question: "Can you assemble chairs from any store?", answer: "Yes, we assemble all flat-pack and boxed chairs." },
      { question: "Is there a satisfaction guarantee?", answer: "Yes, all assemblies are guaranteed." }
    ]
  },
  {
    name: "Wardrobe Assembly",
    href: "/services/furniture--assembly/wardrobe-assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you assemble all wardrobe types?", answer: "Yes, including sliding and hinged door wardrobes." },
      { question: "Do you provide tools?", answer: "Yes, Taskers provide all required tools." },
      { question: "How long does it take?", answer: "1-2 hours depending on size." },
      { question: "Can you assemble wardrobes from any store?", answer: "Yes, we can assemble furniture from any source." },
      { question: "Is assembly guaranteed?", answer: "Yes, all work comes with a satisfaction guarantee." }
    ]
  },
  {
    name: "Table Assembly",
    href: "/services/furniture--assembly/table-assembly",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you assemble all table types?", answer: "Yes, including dining, office, and coffee tables." },
      { question: "Do you provide tools?", answer: "Yes, Taskers bring all necessary tools." },
      { question: "How long does it take?", answer: "30-90 minutes depending on table size." },
      { question: "Can you assemble tables from any store?", answer: "Yes, all flat-pack tables are assembled." },
      { question: "Is there a satisfaction guarantee?", answer: "Yes, all assemblies are guaranteed." }
    ]
  },
  {
    name: "Disassemble Furniture",
    href: "/services/furniture--assembly/disassemble-furniture",
    banner: "/Task14.webp",
    parent: "/services/furniture--assembly",
    faqs: [
      { question: "Do you disassemble all furniture types?", answer: "Yes, beds, desks, chairs, and sofas." },
      { question: "Do you bring tools?", answer: "Yes, Taskers provide all necessary tools." },
      { question: "How long does it take?", answer: "30-120 minutes depending on furniture." },
      { question: "Can you disassemble furniture purchased elsewhere?", answer: "Yes, we can disassemble any furniture." },
      { question: "Is there a guarantee?", answer: "Yes, all disassembly services are guaranteed." }
    ]
  }
]

  },

  {
    id: "mounting-installation",
    title: "Mounting & Installation",
    href: "/services/mounting-installation",
    description: "Expert help for mounting and installations.",
    banner: "/Task15.webp",
    subServices: [
    {
      name: "Wall Mounting",
      href: "/services/mounting-installation/wall-mounting",
      banner: "/Task16.webp",
      parent: "/services/mounting-installation",
      faqs: [
        { question: "What types of walls can you mount on?", answer: "We mount on drywall, concrete, brick, and wood walls." },
        { question: "Do you provide all tools?", answer: "Yes, Taskers bring all necessary mounting tools." },
        { question: "How long does it take?", answer: "Typically 30-60 minutes depending on wall and object size." },
        { question: "Can you mount heavy objects?", answer: "Yes, we handle objects up to 100 lbs safely." },
        { question: "Is the mounting guaranteed?", answer: "Yes, all installations come with a satisfaction guarantee." }
      ]
    },
    {
      name: "TV Mounting",
      href: "/services/mounting-installation/tv-mounting",
       banner: "/Task16.webp",
      parent: "/services/mounting-installation",
      faqs: [
        { question: "Do you mount all TV sizes?", answer: "Yes, we mount TVs from 32\" to 85+\"." },
        { question: "Do you provide the mount?", answer: "We can use your mount or provide one if needed." },
        { question: "How long does installation take?", answer: "Typically 30-90 minutes depending on complexity." },
        { question: "Can you hide cables?", answer: "Yes, cable management is included in the service." },
        { question: "Is the installation safe?", answer: "Yes, all mounts are securely installed and tested." }
      ]
    },
    {
      name: "Install Shelves, Rods & Hooks",
      href: "/services/mounting-installation/install-shelves",
       banner: "/Task16.webp",
      parent: "/services/mounting-installation",
      faqs: [
        { question: "Do you install all types of shelves?", answer: "Yes, including floating shelves, rod systems, and hooks." },
        { question: "Are tools included?", answer: "Yes, Taskers bring all necessary installation tools." },
        { question: "How long does it take?", answer: "Typically 30-60 minutes per installation." },
        { question: "Can you install in all wall types?", answer: "Yes, we handle drywall, brick, and concrete." },
        { question: "Is there a guarantee?", answer: "Yes, all installations come with a satisfaction guarantee." }
      ]
    },
    {
      name: "Ceiling Fan Installation",
      href: "/services/mounting-installation/ceiling-fan-installation",
       banner: "/Task16.webp",
      parent: "/services/mounting-installation",
      faqs: [
        { question: "Do you install all fan types?", answer: "Yes, including standard and remote-controlled ceiling fans." },
        { question: "Do you provide tools?", answer: "Yes, Taskers bring all required tools." },
        { question: "How long does it take?", answer: "Typically 1-2 hours depending on fan complexity." },
        { question: "Can you install in high ceilings?", answer: "Yes, we have the necessary equipment for high ceilings." },
        { question: "Is installation safe?", answer: "Yes, all installations are safely completed and tested." }
      ]
    },
    {
      name: "Install Blinds & Window Treatments",
      href: "/services/mounting-installation/install-blinds",
        banner: "/Task16.webp",
      parent: "/services/mounting-installation",
      faqs: [
        { question: "Do you install all types of blinds?", answer: "Yes, including roller, vertical, and horizontal blinds." },
        { question: "Are tools provided?", answer: "Yes, Taskers bring all necessary tools." },
        { question: "How long does installation take?", answer: "Typically 30-60 minutes per window." },
        { question: "Can you install curtains too?", answer: "Yes, we handle curtains, shades, and blinds." },
        { question: "Is the installation guaranteed?", answer: "Yes, all window treatment installations are guaranteed." }
      ]
    },
    {
      name: "Hang Art, Mirror & Decor",
      href: "/services/mounting-installation/hanging-art",
        banner: "/Task16.webp",
      parent: "/services/mounting-installation",
      faqs: [
        { question: "Do you hang all sizes of art and mirrors?", answer: "Yes, including large and heavy pieces." },
        { question: "Do you provide tools?", answer: "Yes, Taskers bring all necessary tools." },
        { question: "How long does it take?", answer: "Typically 30-90 minutes depending on the item." },
        { question: "Do you ensure it's level?", answer: "Yes, all items are hung straight and secure." },
        { question: "Is there a guarantee?", answer: "Yes, all hanging services come with a satisfaction guarantee." }
      ]
    },
    {
      name: "General Mounting",
      href: "/services/mounting-installation/general-mounting",
        banner: "/Task16.webp",
      parent: "/services/mounting-installation",
      faqs: [
        { question: "What items can you mount?", answer: "We mount TVs, shelves, hooks, decor, and more." },
        { question: "Are tools included?", answer: "Yes, Taskers bring all necessary tools." },
        { question: "How long does it take?", answer: "Varies 30-120 minutes depending on the item." },
        { question: "Can you mount heavy items?", answer: "Yes, up to 100 lbs safely." },
        { question: "Is installation guaranteed?", answer: "Yes, all services are guaranteed." }
      ]
    },
    {
      name: "Hang Christmas Lights",
      href: "/services/mounting-installation/hang-christmas-lights",
        banner: "/Task16.webp",
      parent: "/services/mounting-installation",
      faqs: [
        { question: "Do you hang indoor and outdoor lights?", answer: "Yes, we handle both indoor and outdoor Christmas lights." },
        { question: "Are tools provided?", answer: "Yes, Taskers bring all necessary tools and ladders." },
        { question: "How long does it take?", answer: "Varies depending on the number of lights and setup." },
        { question: "Can you remove them after holidays?", answer: "Yes, removal is available as an extra service." },
        { question: "Is the service guaranteed?", answer: "Yes, all light hanging services are guaranteed." }
      ]
    }
  ]
  },

  {
    id: "cleaning",
    title: "Cleaning",
    href: "/services/cleaning",
    description: "Taskers will make your home sparkle!",
    banner: "/Task16.webp",
    subServices: [
    {
      name: "House Cleaning Services",
      href: "/services/cleaning/house-cleaning",
      banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "What areas do you clean?", answer: "We clean all rooms, kitchens, bathrooms, and common areas." },
        { question: "Do you bring your own supplies?", answer: "Yes, our Taskers bring all necessary cleaning supplies." },
        { question: "How long does it take?", answer: "Typically 2-4 hours depending on house size." },
        { question: "Can I schedule recurring cleaning?", answer: "Yes, weekly or monthly schedules are available." },
        { question: "Is cleaning guaranteed?", answer: "Yes, all services come with a satisfaction guarantee." }
      ]
    },
    {
      name: "Deep Cleaning",
      href: "/services/cleaning/deep-cleaning",
        banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "What is included in deep cleaning?", answer: "Thorough cleaning of kitchens, bathrooms, floors, and hard-to-reach areas." },
        { question: "Do I need to prepare anything?", answer: "Just ensure areas are accessible; Taskers bring supplies." },
        { question: "How long does it take?", answer: "Typically 4-6 hours depending on home size." },
        { question: "Can this be scheduled regularly?", answer: "Yes, we offer monthly deep cleaning services." },
        { question: "Is there a guarantee?", answer: "Yes, satisfaction guaranteed on all services." }
      ]
    },
    {
      name: "Disinfecting Services",
      href: "/services/cleaning/disinfecting",
        banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "What surfaces are disinfected?", answer: "All high-touch surfaces, counters, doorknobs, and bathrooms." },
        { question: "Do you use safe chemicals?", answer: "Yes, EPA-approved and safe for homes and offices." },
        { question: "How long does it take?", answer: "1-3 hours depending on space size." },
        { question: "Is it safe for pets?", answer: "Yes, we use pet-safe disinfectants." },
        { question: "Do you provide certification?", answer: "Yes, a disinfecting checklist is provided after service." }
      ]
    },
    {
      name: "Move In Cleaning",
      href: "/services/cleaning/move-in-cleaning",
        banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "What is included?", answer: "Full cleaning of all rooms, appliances, cabinets, and bathrooms." },
        { question: "Do you clean windows?", answer: "Yes, interior windows are cleaned as part of service." },
        { question: "How long does it take?", answer: "3-5 hours depending on property size." },
        { question: "Can you handle unfurnished homes?", answer: "Yes, both furnished and unfurnished homes are cleaned." },
        { question: "Is satisfaction guaranteed?", answer: "Yes, all services come with a guarantee." }
      ]
    },
    {
      name: "Move Out Cleaning",
      href: "/services/cleaning/move-out-cleaning",
        banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "What is included?", answer: "Deep cleaning of all areas including kitchen, bathrooms, and floors." },
        { question: "Do you handle appliances?", answer: "Yes, we clean ovens, fridges, and cabinets." },
        { question: "How long does it take?", answer: "3-6 hours depending on property size." },
        { question: "Do you provide a checklist?", answer: "Yes, a move-out checklist is followed for thorough cleaning." },
        { question: "Is cleaning guaranteed?", answer: "Yes, satisfaction guaranteed for landlords and tenants." }
      ]
    },
    {
      name: "Vacation Rental Cleaning",
      href: "/services/cleaning/vacation-rental-cleaning",
        banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "Do you clean between guest stays?", answer: "Yes, we provide quick turnaround cleaning for rentals." },
        { question: "Do you change linens?", answer: "Yes, linen changes and laundry can be included." },
        { question: "How long does it take?", answer: "1-3 hours depending on property size." },
        { question: "Do you handle restocking supplies?", answer: "Yes, optional restocking services are available." },
        { question: "Is service flexible?", answer: "Yes, we accommodate short notice and recurring schedules." }
      ]
    },
    {
      name: "Carpet Cleaning Service",
      href: "/services/cleaning/carpet-cleaning",
        banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "Do you clean all types of carpets?", answer: "Yes, including wool, synthetic, and area rugs." },
        { question: "Do you provide equipment?", answer: "Yes, Taskers bring professional carpet cleaning machines." },
        { question: "How long does it take?", answer: "1-2 hours depending on carpet size." },
        { question: "Can you remove tough stains?", answer: "Yes, stain removal is included." },
        { question: "Is carpet safe after cleaning?", answer: "Yes, carpets dry quickly and are safe for pets." }
      ]
    },
    {
      name: "Garage Cleaning",
      href: "/services/cleaning/garage-cleaning",
      banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "Do you remove clutter?", answer: "Yes, organizing and decluttering included." },
        { question: "Do you clean floors?", answer: "Yes, sweeping, scrubbing, and pressure washing included." },
        { question: "How long does it take?", answer: "2-4 hours depending on garage size." },
        { question: "Do you move heavy items?", answer: "Yes, heavy lifting is included." },
        { question: "Is service guaranteed?", answer: "Yes, satisfaction guaranteed." }
      ]
    },
    {
      name: "One Time Cleaning Services",
      href: "/services/cleaning/one-time-cleaning",
      banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "Do you clean entire home?", answer: "Yes, or select specific areas." },
        { question: "Do you bring cleaning supplies?", answer: "Yes, all supplies provided." },
        { question: "How long does it take?", answer: "1-4 hours depending on home size." },
        { question: "Can I schedule any day?", answer: "Yes, flexible scheduling available." },
        { question: "Is service guaranteed?", answer: "Yes, satisfaction guaranteed." }
      ]
    },
    {
      name: "Car Washing",
      href: "/services/cleaning/car-washing",
      banner: "/Task16.webp",
      parent: "/services/cleaning",
      faqs: [
        { question: "Do you wash all car types?", answer: "Yes, sedans, SUVs, trucks, and vans." },
        { question: "Do you provide equipment?", answer: "Yes, all cleaning equipment provided." },
        { question: "How long does it take?", answer: "30-60 minutes depending on vehicle size." },
        { question: "Do you provide wax and polish?", answer: "Yes, optional waxing included." },
        { question: "Is service guaranteed?", answer: "Yes, satisfaction guaranteed." }
      ]
    },
    {
      name: "Laundry Help",
      href: "/services/cleaning/laundry",
      parent: "/services/cleaning",
      faqs: [
        { question: "Do you wash and fold clothes?", answer: "Yes, washing, drying, and folding included." },
        { question: "Do you provide detergent?", answer: "Yes, detergent provided if requested." },
        { question: "How long does it take?", answer: "Varies depending on load size." },
        { question: "Can you handle delicate fabrics?", answer: "Yes, delicate handling included." },
        { question: "Is service guaranteed?", answer: "Yes, satisfaction guaranteed." }
      ]
    },
    {
      name: "Pressure Washing",
      href: "/services/cleaning/pressure-washing",
      parent: "/services/cleaning",
      faqs: [
        { question: "Do you pressure wash all surfaces?", answer: "Yes, decks, driveways, patios, and siding." },
        { question: "Do you bring equipment?", answer: "Yes, professional pressure washers provided." },
        { question: "How long does it take?", answer: "1-3 hours depending on area." },
        { question: "Is it safe for surfaces?", answer: "Yes, safe for wood, concrete, and siding." },
        { question: "Is service guaranteed?", answer: "Yes, satisfaction guaranteed." }
      ]
    },
    {
      name: "Spring Cleaning",
      href: "/services/cleaning/spring-cleaning",
      parent: "/services/cleaning",
      faqs: [
        { question: "What is included?", answer: "Thorough cleaning of all areas, windows, and surfaces." },
        { question: "Do you bring supplies?", answer: "Yes, Taskers bring all cleaning supplies." },
        { question: "How long does it take?", answer: "4-6 hours depending on home size." },
        { question: "Is service guaranteed?", answer: "Yes, satisfaction guaranteed." },
        { question: "Can this be scheduled regularly?", answer: "Yes, weekly or monthly options available." }
      ]
    }
  ]
  },

  {
    id: "shopping-delivery",
    title: "Shopping + Delivery",
    href: "/services/shopping-delivery",
    description: "Get your shopping & deliveries done fast.",
    banner: "/Task17.webp",
    subServices: [
    {
      name: "Delivery Service",
      href: "/services/shopping-delivery/delivery-service",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "What can be delivered?", answer: "We can deliver packages, groceries, food, and more." },
        { question: "How fast is the delivery?", answer: "Delivery times vary, typically within a few hours depending on location." },
        { question: "Do you offer same-day delivery?", answer: "Yes, same-day delivery is available for most items." },
        { question: "Is there a tracking option?", answer: "Yes, you can track your delivery in real-time." },
        { question: "Is contactless delivery available?", answer: "Yes, we offer contactless delivery on request." }
      ]
    },
    {
      name: "Grocery Shopping & Delivery",
      href: "/services/shopping-delivery/grocery-shopping-delivery",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "Can you shop for any grocery store?", answer: "Yes, we shop from local stores or your preferred supermarket." },
        { question: "Do you handle substitutions?", answer: "Yes, we contact you if items are unavailable for substitution." },
        { question: "How do I provide my grocery list?", answer: "You can submit it through our app or website." },
        { question: "Is delivery contactless?", answer: "Yes, contactless delivery is available." },
        { question: "What are the fees?", answer: "Fees vary based on distance and order size." }
      ]
    },
    {
      name: "Running Your Errands",
      href: "/services/shopping-delivery/running-your-errands",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "What errands can you run?", answer: "We handle shopping, post office trips, returns, and more." },
        { question: "How do I schedule errands?", answer: "Use our app or call to schedule tasks." },
        { question: "Are errands same-day?", answer: "Yes, most errands are completed the same day." },
        { question: "Is there a delivery option?", answer: "Yes, items can be delivered to your door." },
        { question: "Do you handle large items?", answer: "Yes, subject to size and weight limits." }
      ]
    },
    {
      name: "Christmas Tree Delivery",
      href: "/services/shopping-delivery/christmas-tree-delivery",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "Do you provide the tree?", answer: "No, we deliver the tree you purchase." },
        { question: "Do you set it up?", answer: "We can set it up if requested." },
        { question: "Are delivery times flexible?", answer: "Yes, you can schedule preferred delivery slots." },
        { question: "Do you handle large trees?", answer: "Yes, up to reasonable size limits." },
        { question: "Is delivery contactless?", answer: "Yes, contactless delivery is available." }
      ]
    },
    {
      name: "Wait in Line",
      href: "/services/shopping-delivery/wait-in-line",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "What kind of lines do you wait in?", answer: "We wait for ticket sales, product releases, or appointments." },
        { question: "How long can you wait?", answer: "Taskers can wait for short or long durations as agreed." },
        { question: "Do I provide payment for items?", answer: "Yes, items must be prepaid or reimbursed to the Tasker." },
        { question: "Is this available for all locations?", answer: "Yes, within service area limits." },
        { question: "Are Taskers insured?", answer: "Yes, for liability and safety during tasks." }
      ]
    },
    {
      name: "Deliver Big Piece of Furniture",
      href: "/services/shopping-delivery/deliver-big-furniture",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "What size furniture can be delivered?", answer: "We handle large items like sofas, beds, and tables." },
        { question: "Do you assemble furniture?", answer: "Assembly can be arranged separately." },
        { question: "How many people handle delivery?", answer: "Multiple Taskers can be assigned for heavy items." },
        { question: "Do you provide moving equipment?", answer: "Yes, dollies and straps are used for safety." },
        { question: "Is delivery insured?", answer: "Yes, all large-item deliveries are insured." }
      ]
    },
    {
      name: "Drop Off Donations",
      href: "/services/shopping-delivery/drop-off-donations",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "Which donation centers do you serve?", answer: "We can deliver to local charities or specified locations." },
        { question: "Do you pick up items?", answer: "Yes, we pick up donations from your location." },
        { question: "Are there weight limits?", answer: "We handle normal household donations." },
        { question: "Do you provide receipts?", answer: "Optional donation receipts can be provided if requested." },
        { question: "Is contactless drop-off available?", answer: "Yes, Taskers can drop off items safely." }
      ]
    },
    {
      name: "Contactless Delivery",
      href: "/services/shopping-delivery/contactless-delivery",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "How does contactless delivery work?", answer: "Taskers leave items at your doorstep or specified location." },
        { question: "Is there an additional fee?", answer: "No extra fee for contactless delivery." },
        { question: "Can this be scheduled?", answer: "Yes, specify your preferred time." },
        { question: "Are items secure?", answer: "Yes, items are safely placed and monitored." },
        { question: "Do I need to be home?", answer: "No, Tasker leaves items safely without interaction." }
      ]
    },
    {
      name: "Pet Food Delivery",
      href: "/services/shopping-delivery/pet-food-delivery",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "What brands do you deliver?", answer: "We deliver most popular brands available locally." },
        { question: "Can I schedule recurring deliveries?", answer: "Yes, weekly or monthly schedules available." },
        { question: "Do you handle large bags?", answer: "Yes, up to 50 lbs per item." },
        { question: "Is delivery contactless?", answer: "Yes, contactless delivery is offered." },
        { question: "Are items guaranteed?", answer: "Yes, all items are checked before delivery." }
      ]
    },
    {
      name: "Baby Food Delivery",
      href: "/services/shopping-delivery/baby-food-delivery",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "What baby food brands are delivered?", answer: "We deliver most major brands available locally." },
        { question: "Do you handle perishables?", answer: "Yes, items are delivered quickly to maintain freshness." },
        { question: "Can this be recurring?", answer: "Yes, weekly delivery schedules are possible." },
        { question: "Is contactless delivery available?", answer: "Yes, safe doorstep drop-off is provided." },
        { question: "Is there a delivery guarantee?", answer: "Yes, all deliveries are guaranteed to arrive in good condition." }
      ]
    },
    {
      name: "Return Items",
      href: "/services/shopping-delivery/return-items",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "Do you handle returns to all stores?", answer: "We cover most local stores." },
        { question: "How do I provide receipts?", answer: "Provide receipts or order confirmation to the Tasker." },
        { question: "Can large items be returned?", answer: "Yes, within Tasker capacity limits." },
        { question: "Is contactless return possible?", answer: "Yes, items can be left at store drop-off." },
        { question: "Is service guaranteed?", answer: "Yes, satisfaction guaranteed." }
      ]
    },
    {
      name: "Wait for Delivery",
      href: "/services/shopping-delivery/wait-for-delivery",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "Do Taskers wait for deliveries at my location?", answer: "Yes, Taskers can wait for scheduled deliveries." },
        { question: "Is there a time limit?", answer: "Time limits can be set based on your needs." },
        { question: "Can Taskers sign for items?", answer: "Yes, with your authorization." },
        { question: "Is service flexible?", answer: "Yes, scheduling is flexible." },
        { question: "Is service insured?", answer: "Yes, Taskers are insured during the task." }
      ]
    },
    {
      name: "Shipping",
      href: "/services/shopping-delivery/shipping",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "What types of shipments do you handle?", answer: "Packages, documents, and parcels of various sizes." },
        { question: "Do you provide tracking?", answer: "Yes, all shipments can be tracked." },
        { question: "Are fees fixed?", answer: "Fees vary based on size, distance, and service type." },
        { question: "Is there insurance?", answer: "Yes, insurance is included for valuable items." },
        { question: "Is delivery fast?", answer: "Yes, prompt and reliable delivery." }
      ]
    },
    {
      name: "Breakfast Delivery",
      href: "/services/shopping-delivery/breakfast-delivery",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "Which restaurants do you deliver from?", answer: "Local cafes and restaurants are available for selection." },
        { question: "Can I schedule time?", answer: "Yes, delivery can be scheduled." },
        { question: "Is delivery contactless?", answer: "Yes, contactless delivery is offered." },
        { question: "Do Taskers handle multiple orders?", answer: "Yes, multiple orders can be delivered at once." },
        { question: "Are fees included?", answer: "Yes, all fees shown upfront." }
      ]
    },
    {
      name: "Coffee Delivery",
      href: "/services/shopping-delivery/coffee-delivery",
      parent: "/services/shopping-delivery",
      faqs: [
        { question: "Which coffee shops do you deliver from?", answer: "Local coffee shops or specified chains." },
        { question: "Can orders be customized?", answer: "Yes, Taskers can handle special requests." },
        { question: "Is delivery fast?", answer: "Yes, prompt delivery within local area." },
        { question: "Is contactless delivery?", answer: "Yes, contactless drop-off is provided." },
        { question: "Are fees clear?", answer: "Yes, fees are transparent and upfront." }
      ]
    }
  ]
  },

  {
    id: "ikea-services",
    title: "Ikea Services",
    href: "/services/ikea-services",
    description: "Taskers help with your Ikea needs.",
    banner: "/Task18.webp",
   subServices: [
    {
      name: "Light Installation",
      href: "/services/ikea-services/light-installation",
      parent: "/services/ikea-services",
      faqs: [
        { question: "Do Taskers install all types of lights?", answer: "Yes, including ceiling, wall, and desk lights." },
        { question: "Is wiring included?", answer: "Yes, basic electrical wiring for installation is included." },
        { question: "Do I need to provide tools?", answer: "No, Taskers bring necessary tools." },
        { question: "How long does it take?", answer: "Typically 30–60 minutes depending on complexity." },
        { question: "Is service insured?", answer: "Yes, all installations are insured." }
      ]
    },
    {
      name: "Furniture Removal",
      href: "/services/ikea-services/furniture-removal",
      parent: "/services/ikea-services",
      faqs: [
        { question: "Do Taskers disassemble furniture?", answer: "Yes, furniture can be disassembled if needed." },
        { question: "Can large items be removed?", answer: "Yes, we handle items of all sizes." },
        { question: "Do you provide transportation?", answer: "Yes, transport to a disposal site or donation center is available." },
        { question: "Is service safe?", answer: "Yes, Taskers are trained and insured." },
        { question: "Can I schedule in advance?", answer: "Yes, appointments can be scheduled ahead of time." }
      ]
    },
    {
      name: "Smart Home Installation",
      href: "/services/ikea-services/smart-home-installation",
      parent: "/services/ikea-services",
      faqs: [
        { question: "Which smart devices can be installed?", answer: "Lights, thermostats, sensors, and Ikea smart products." },
        { question: "Do you configure apps?", answer: "Yes, Taskers set up apps and connectivity." },
        { question: "Is setup guaranteed?", answer: "Yes, devices will be fully functional after installation." },
        { question: "Are multiple devices supported?", answer: "Yes, multiple devices can be installed per visit." },
        { question: "Is service insured?", answer: "Yes, for any damage during installation." }
      ]
    },
    {
      name: "Organization",
      href: "/services/ikea-services/organization",
      parent: "/services/ikea-services",
      faqs: [
        { question: "What areas can be organized?", answer: "Closets, kitchens, offices, or any Ikea furniture setup." },
        { question: "Do Taskers provide supplies?", answer: "Basic organizing materials can be provided; others upon request." },
        { question: "How long does organization take?", answer: "Time depends on size and complexity of the area." },
        { question: "Can you create storage solutions?", answer: "Yes, Taskers suggest and implement space-saving ideas." },
        { question: "Is service insured?", answer: "Yes, items handled are insured for safety." }
      ]
    },
    {
      name: "Furniture Assembly",
      href: "/services/ikea-services/furniture-assembly",
      parent: "/services/ikea-services",
      faqs: [
        { question: "Do you assemble all Ikea furniture?", answer: "Yes, including beds, desks, shelves, and cabinets." },
        { question: "Do Taskers bring tools?", answer: "Yes, all necessary tools are provided." },
        { question: "How long does assembly take?", answer: "Time varies by item complexity." },
        { question: "Is assembly insured?", answer: "Yes, to cover any accidental damage." },
        { question: "Can multiple items be assembled in one visit?", answer: "Yes, Taskers can assemble multiple pieces." }
      ]
    },
    {
      name: "General Mounting",
      href: "/services/ikea-services/general-mounting",
      parent: "/services/ikea-services",
      faqs: [
        { question: "What can be mounted?", answer: "Shelves, TVs, mirrors, hooks, and other Ikea accessories." },
        { question: "Do Taskers bring tools?", answer: "Yes, all necessary tools are included." },
        { question: "Is mounting insured?", answer: "Yes, all work is insured for safety." },
        { question: "How long does mounting take?", answer: "Typically 30–90 minutes depending on items." },
        { question: "Do you handle multiple mounts?", answer: "Yes, multiple mounting tasks can be completed per visit." }
      ]
    }
  ]
  },
  {
    id: "yardwork",
    title: "Yardwork",
    href: "/services/yardwork",
    description: "Keep your outdoor space clean and fresh.",
    banner: "/Task19.webp",
    subServices: [
    {
      name: "Gardening Services",
      href: "/services/yardwork/gardening-services",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers handle all types of gardening?", answer: "Yes, including flowers, shrubs, and vegetable gardens." },
        { question: "Do they provide tools and equipment?", answer: "Yes, basic gardening tools are included." },
        { question: "Can they plant new gardens?", answer: "Yes, planting and garden design services are offered." },
        { question: "Is service insured?", answer: "Yes, all services are insured." },
        { question: "Do they provide seasonal care?", answer: "Yes, seasonal garden maintenance is available." }
      ]
    },
    {
      name: "Weed Removal",
      href: "/services/yardwork/weed-removal",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers remove all types of weeds?", answer: "Yes, from flower beds, lawns, and gardens." },
        { question: "Are chemicals used?", answer: "Organic or chemical treatments can be applied depending on your preference." },
        { question: "Is follow-up service available?", answer: "Yes, recurring weed removal services are available." },
        { question: "Is service insured?", answer: "Yes, all tasks are insured." },
        { question: "How long does it take?", answer: "Time depends on garden size and weed density." }
      ]
    },
    {
      name: "Lawn Care Services",
      href: "/services/yardwork/lawn-care-services",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers mow, fertilize, and trim lawns?", answer: "Yes, complete lawn care is provided." },
        { question: "Are fertilizers included?", answer: "Yes, basic fertilizers are included; organic options are available." },
        { question: "Can they handle large lawns?", answer: "Yes, all sizes of lawns are supported." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Do they offer recurring services?", answer: "Yes, weekly, biweekly, and monthly services are available." }
      ]
    },
    {
      name: "Lawn Mowing Services",
      href: "/services/yardwork/lawn-mowing-services",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers provide lawn mowers?", answer: "Yes, professional-grade mowers are used." },
        { question: "Can they mow large lawns?", answer: "Yes, large and uneven lawns are supported." },
        { question: "Do they trim edges?", answer: "Yes, edging and trimming are included." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "How often can mowing be scheduled?", answer: "Weekly, biweekly, or monthly schedules are available." }
      ]
    },
    {
      name: "Landscaping Services",
      href: "/services/yardwork/landscaping-services",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers design and implement landscaping?", answer: "Yes, full landscaping services are offered." },
        { question: "Can they install plants, stones, and decor?", answer: "Yes, hardscape and softscape services are available." },
        { question: "Is maintenance included?", answer: "Yes, ongoing maintenance services are offered." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Do they offer seasonal design?", answer: "Yes, seasonal planting and decorations are supported." }
      ]
    },
    {
      name: "Gutter Cleaning",
      href: "/services/yardwork/gutter-cleaning",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers clean all types of gutters?", answer: "Yes, standard and custom gutters are supported." },
        { question: "Do they remove debris safely?", answer: "Yes, safety equipment and proper techniques are used." },
        { question: "Can they inspect for damage?", answer: "Yes, inspection and minor repairs are included." },
        { question: "Is service insured?", answer: "Yes, all gutter services are insured." },
        { question: "Do they handle multi-story homes?", answer: "Yes, ladders and equipment are provided for all heights." }
      ]
    },
    {
      name: "Tree Trimming Service",
      href: "/services/yardwork/tree-trimming",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers trim all types of trees?", answer: "Yes, from small shrubs to large trees." },
        { question: "Is pruning included?", answer: "Yes, proper pruning techniques are applied." },
        { question: "Do they remove debris?", answer: "Yes, all cuttings are cleaned up after service." },
        { question: "Is service insured?", answer: "Yes, all tree services are insured." },
        { question: "Do they handle multi-story trees?", answer: "Yes, ladders and safety equipment are used." }
      ]
    },
    {
      name: "Vacation Plant Watering",
      href: "/services/yardwork/vacation-plant-watering",
      parent: "/services/yardwork",
      faqs: [
        { question: "Will my plants be watered on schedule?", answer: "Yes, Taskers follow the agreed watering schedule." },
        { question: "Can indoor and outdoor plants be included?", answer: "Yes, both indoor and outdoor plants are covered." },
        { question: "Are fertilizers applied?", answer: "Optional fertilizers can be applied if requested." },
        { question: "Is service insured?", answer: "Yes, all tasks are insured." },
        { question: "Can recurring service be scheduled?", answer: "Yes, recurring watering services are available." }
      ]
    },
    {
      name: "Patio Cleaning",
      href: "/services/yardwork/patio-cleaning",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers clean all patio surfaces?", answer: "Yes, including concrete, stone, and wooden patios." },
        { question: "Are pressure washers used?", answer: "Yes, high-pressure washing is included." },
        { question: "Do they remove stains and mold?", answer: "Yes, stain removal and mold treatment are part of service." },
        { question: "Is service insured?", answer: "Yes, all cleaning services are insured." },
        { question: "Can furniture be moved for cleaning?", answer: "Yes, lightweight furniture can be temporarily moved." }
      ]
    },
    {
      name: "Hot Tub Cleaning",
      href: "/services/yardwork/hot-tub-cleaning",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers clean the water and exterior?", answer: "Yes, complete hot tub cleaning is provided." },
        { question: "Are chemicals included?", answer: "Yes, proper sanitizers are applied." },
        { question: "Do they inspect for damage?", answer: "Yes, minor maintenance checks are included." },
        { question: "Is service insured?", answer: "Yes, all hot tub services are insured." },
        { question: "How often can cleaning be scheduled?", answer: "Weekly, monthly, or one-time cleaning is available." }
      ]
    },
    {
      name: "Fence Installation & Repair Services",
      href: "/services/yardwork/fence-installation-repair",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers install all fence types?", answer: "Yes, wood, metal, and vinyl fences are supported." },
        { question: "Are repairs included?", answer: "Yes, repair and replacement of damaged parts are included." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Do they provide materials?", answer: "Materials can be provided or client-supplied." },
        { question: "Can they handle long fences?", answer: "Yes, any fence length can be handled." }
      ]
    },
    {
      name: "Deck Restoration Services",
      href: "/services/yardwork/deck-restoration",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers restore wood and composite decks?", answer: "Yes, both types are supported." },
        { question: "Is sanding and staining included?", answer: "Yes, complete restoration services are provided." },
        { question: "Do they inspect for damage?", answer: "Yes, structural inspection is included." },
        { question: "Is service insured?", answer: "Yes, all deck work is insured." },
        { question: "Can furniture be temporarily moved?", answer: "Yes, lightweight furniture can be moved." }
      ]
    },
    {
      name: "Patio Furniture Assembly",
      href: "/services/yardwork/patio-furniture-assembly",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers assemble all types of patio furniture?", answer: "Yes, chairs, tables, and lounges are supported." },
        { question: "Are tools provided?", answer: "Yes, all assembly tools are included." },
        { question: "Do they disassemble old furniture?", answer: "Yes, disassembly services are available." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Can they assemble multiple pieces at once?", answer: "Yes, multiple furniture pieces can be handled." }
      ]
    },
    {
      name: "Fence Staining",
      href: "/services/yardwork/fence-staining",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers stain all fence types?", answer: "Yes, wood, metal, and vinyl fences are supported." },
        { question: "Are materials included?", answer: "Yes, stains and brushes are provided." },
        { question: "Do they handle prep work?", answer: "Yes, sanding and cleaning before staining is included." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Can multiple fence panels be stained?", answer: "Yes, large projects are supported." }
      ]
    },
    {
      name: "Mulching Services",
      href: "/services/yardwork/mulching",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers apply mulch to all garden areas?", answer: "Yes, flower beds, gardens, and trees are supported." },
        { question: "Are materials included?", answer: "Yes, mulch is supplied as part of service." },
        { question: "Do they remove old mulch?", answer: "Yes, old mulch removal is included." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Can recurring mulching be scheduled?", answer: "Yes, seasonal mulching services are available." }
      ]
    },
    {
      name: "Lawn Fertilizer Service",
      href: "/services/yardwork/lawn-fertilizer",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers apply fertilizers to all lawn types?", answer: "Yes, all grass types are supported." },
        { question: "Are fertilizers safe?", answer: "Yes, safe and eco-friendly fertilizers are used." },
        { question: "Do they handle large lawns?", answer: "Yes, any size lawn can be fertilized." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Can recurring fertilizer applications be scheduled?", answer: "Yes, weekly, monthly, or seasonal schedules are available." }
      ]
    },
    {
      name: "Hedge Trimming Service",
      href: "/services/yardwork/hedge-trimming",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers trim all hedge types?", answer: "Yes, all shapes and sizes are supported." },
        { question: "Is disposal of cuttings included?", answer: "Yes, all debris is removed after trimming." },
        { question: "Do they shape decorative hedges?", answer: "Yes, artistic trimming and shaping is available." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Can recurring trimming be scheduled?", answer: "Yes, seasonal trimming services are available." }
      ]
    },
    {
      name: "Outdoor Party Setup",
      href: "/services/yardwork/outdoor-party-setup",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers set up all types of outdoor parties?", answer: "Yes, decorations, tables, and chairs are included." },
        { question: "Do they provide lighting?", answer: "Yes, temporary party lighting can be set up." },
        { question: "Is cleanup included?", answer: "Yes, setup and cleanup services are provided." },
        { question: "Is service insured?", answer: "Yes, all tasks are insured." },
        { question: "Can multiple parties be handled on the same day?", answer: "Yes, depending on Tasker availability." }
      ]
    },
    {
      name: "Urban Gardening Service",
      href: "/services/yardwork/urban-gardening",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers handle small urban gardens?", answer: "Yes, balcony, rooftop, and patio gardens are supported." },
        { question: "Do they provide soil and tools?", answer: "Yes, basic soil and tools are included." },
        { question: "Can they plant vegetables and herbs?", answer: "Yes, urban vegetable and herb gardening is supported." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Do they provide recurring maintenance?", answer: "Yes, weekly or monthly maintenance is available." }
      ]
    },
    {
      name: "Leaf Raking & Removal",
      href: "/services/yardwork/leaf-raking-removal",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers remove leaves from all areas?", answer: "Yes, lawns, gardens, and patios are supported." },
        { question: "Is disposal included?", answer: "Yes, all collected leaves are removed." },
        { question: "Do they handle large piles of leaves?", answer: "Yes, even heavy leaf accumulation is handled." },
        { question: "Is service insured?", answer: "Yes, all tasks are insured." },
        { question: "Can recurring raking be scheduled?", answer: "Yes, seasonal leaf removal services are available." }
      ]
    },
    {
      name: "Produce Gardening",
      href: "/services/yardwork/produce-gardening",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers plant fruits and vegetables?", answer: "Yes, all produce types are supported." },
        { question: "Do they provide seeds and soil?", answer: "Yes, basic seeds and soil can be provided." },
        { question: "Can they maintain crops?", answer: "Yes, ongoing watering, weeding, and fertilizing is included." },
        { question: "Is service insured?", answer: "Yes, all tasks are insured." },
        { question: "Can recurring planting be scheduled?", answer: "Yes, seasonal gardening is supported." }
      ]
    },
    {
      name: "Hose Installation",
      href: "/services/yardwork/hose-installation",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers install all types of hoses?", answer: "Yes, including garden hoses and retractable hoses." },
        { question: "Are connectors and fittings included?", answer: "Yes, all necessary accessories are provided." },
        { question: "Do they check for leaks?", answer: "Yes, installation includes leak inspection." },
        { question: "Is service insured?", answer: "Yes, all hose installations are insured." },
        { question: "Can they install multiple hoses?", answer: "Yes, multiple connections are supported." }
      ]
    },
    {
      name: "Shed Maintenance",
      href: "/services/yardwork/shed-maintenance",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers clean and organize sheds?", answer: "Yes, complete shed maintenance is provided." },
        { question: "Do they repair small damages?", answer: "Yes, minor repairs are included." },
        { question: "Is service insured?", answer: "Yes, all work is insured." },
        { question: "Can items be rearranged?", answer: "Yes, organizing and rearranging is included." },
        { question: "Do they offer recurring maintenance?", answer: "Yes, weekly or monthly shed care is available." }
      ]
    },
    {
      name: "Pressure Washing",
      href: "/services/yardwork/pressure-washing",
      parent: "/services/yardwork",
      faqs: [
        { question: "Do Taskers pressure wash patios, driveways, and decks?", answer: "Yes, all outdoor surfaces are supported." },
        { question: "Are chemicals used?", answer: "Yes, safe and effective cleaning solutions are included." },
        { question: "Do they remove stains, mold, and algae?", answer: "Yes, deep cleaning is included." },
        { question: "Is service insured?", answer: "Yes, all pressure washing tasks are insured." },
        { question: "Can recurring washing be scheduled?", answer: "Yes, weekly or monthly pressure washing services are available." }
      ]
    },

    // Continue similarly for all remaining Yardwork sub-services like Tree Trimming, Patio Cleaning, Deck Restoration, etc.
  ]
  },
  {
    id: "holidays",
    title: "Holidays",
    href: "/services/holidays",
    description: "Get help with holiday preparations, decorations, and more!",
    banner: "/working-girl.jpg",
   subServices: [
    {
      name: "Holiday Help",
      href: "/services/holidays/holiday-help",
      parent: "/services/holidays",
      faqs: [
        { question: "What types of holiday help are offered?", answer: "Taskers can help with decorations, shopping, and setup." },
        { question: "Can help be scheduled in advance?", answer: "Yes, services can be booked ahead of the holiday season." },
        { question: "Is service insured?", answer: "Yes, all holiday help services are insured." },
        { question: "Do they handle indoor and outdoor tasks?", answer: "Yes, both indoor and outdoor tasks are supported." },
        { question: "Can multiple tasks be handled at once?", answer: "Yes, multiple tasks can be coordinated by the Tasker." }
      ]
    },
    {
      name: "Gift Wrapping Services",
      href: "/services/holidays/gift-wrapping",
      parent: "/services/holidays",
      faqs: [
        { question: "Do Taskers provide wrapping materials?", answer: "Yes, paper, ribbons, and other basic supplies are included." },
        { question: "Can custom wrapping requests be handled?", answer: "Yes, Taskers can follow specific wrapping instructions." },
        { question: "Is service insured?", answer: "Yes, all tasks are insured." },
        { question: "Can multiple gifts be wrapped at once?", answer: "Yes, even large batches of gifts are supported." },
        { question: "Are fragile items handled carefully?", answer: "Yes, delicate items are wrapped with extra care." }
      ]
    },
    {
      name: "Hang Christmas Lights",
      href: "/services/holidays/christmas-lights",
      parent: "/services/holidays",
      faqs: [
        { question: "Do Taskers install indoor and outdoor lights?", answer: "Yes, both indoor and outdoor setups are supported." },
        { question: "Are safety measures included?", answer: "Yes, ladders and safety equipment are used." },
        { question: "Is service insured?", answer: "Yes, all installation work is insured." },
        { question: "Can custom patterns be installed?", answer: "Yes, Taskers follow your desired layout." },
        { question: "Do they remove lights after holidays?", answer: "Optional removal service is available." }
      ]
    },
    {
      name: "Christmas Tree Delivery",
      href: "/services/holidays/christmas-tree-delivery",
      parent: "/services/holidays",
      faqs: [
        { question: "Do Taskers deliver live and artificial trees?", answer: "Yes, all types of trees are supported." },
        { question: "Is setup included?", answer: "Optional setup is available upon request." },
        { question: "Is service insured?", answer: "Yes, all deliveries are insured." },
        { question: "Do they handle large trees?", answer: "Yes, even tall trees are delivered safely." },
        { question: "Can multiple trees be delivered at once?", answer: "Yes, large orders are supported." }
      ]
    },
    {
      name: "Holiday Decorating",
      href: "/services/holidays/holiday-decorating",
      parent: "/services/holidays",
      faqs: [
        { question: "Do Taskers decorate homes and offices?", answer: "Yes, both residential and commercial spaces are supported." },
        { question: "Are materials provided?", answer: "Yes, basic decorations can be supplied by Taskers." },
        { question: "Is service insured?", answer: "Yes, all decorating services are insured." },
        { question: "Can custom themes be applied?", answer: "Yes, Taskers follow your chosen theme." },
        { question: "Is cleanup included?", answer: "Yes, optional cleanup service is available after holidays." }
      ]
    },
    {
      name: "Party Cleaning",
      href: "/services/holidays/party-cleaning",
      parent: "/services/holidays",
      faqs: [
        { question: "Do Taskers clean before and after parties?", answer: "Yes, setup and post-party cleanup is supported." },
        { question: "Are supplies provided?", answer: "Yes, cleaning supplies are included." },
        { question: "Is service insured?", answer: "Yes, all cleaning tasks are insured." },
        { question: "Can large spaces be handled?", answer: "Yes, both small and large venues are supported." },
        { question: "Are trash removal and recycling included?", answer: "Yes, proper disposal is part of the service." }
      ]
    },
    {
      name: "Toy Assembly Service",
      href: "/services/holidays/toy-assembly",
      parent: "/services/holidays",
      faqs: [
        { question: "Do Taskers assemble all types of toys?", answer: "Yes, including bikes, furniture, and electronic toys." },
        { question: "Are tools provided?", answer: "Yes, all necessary tools are included." },
        { question: "Is service insured?", answer: "Yes, all assembly tasks are insured." },
        { question: "Can multiple toys be assembled at once?", answer: "Yes, bulk assembly is supported." },
        { question: "Are instructions followed precisely?", answer: "Yes, Taskers follow manufacturer instructions carefully." }
      ]
    },
    {
      name: "Wait in Line",
      href: "/services/holidays/wait-in-line",
      parent: "/services/holidays",
      faqs: [
        { question: "Can Taskers wait for product launches or tickets?", answer: "Yes, all types of lines are supported." },
        { question: "Is service insured?", answer: "Yes, all waiting tasks are insured." },
        { question: "Can multiple locations be handled?", answer: "Yes, Taskers can manage multiple stops in one booking." },
        { question: "Are time estimates provided?", answer: "Yes, Taskers communicate expected waiting time." },
        { question: "Do they bring items home if purchased?", answer: "Yes, optional delivery service is available." }
      ]
    },
    {
      name: "Christmas Tree Removal",
      href: "/services/holidays/christmas-tree-removal",
      parent: "/services/holidays",
      faqs: [
        { question: "Do Taskers remove live and artificial trees?", answer: "Yes, both types are supported." },
        { question: "Is disposal included?", answer: "Yes, proper disposal is part of the service." },
        { question: "Is service insured?", answer: "Yes, all removal services are insured." },
        { question: "Can multiple trees be removed at once?", answer: "Yes, large removals are supported." },
        { question: "Do they clean up surrounding area?", answer: "Yes, area cleanup is included." }
      ]
    }
  ]
  },
  {
    id: "winter-tasks",
    title: "Winter Tasks",
    href: "/services/winter-tasks",
    description: "Stay warm and safe with seasonal winter task services.",
    banner: "/window.svg",
    subServices: [
    {
      name: "Snow Removal",
      href: "/services/winter-tasks/snow-removal",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Do Taskers remove snow from driveways and sidewalks?", answer: "Yes, all types of snow removal are handled." },
        { question: "Is snow removal service insured?", answer: "Yes, all winter services are insured." },
        { question: "Can multiple areas be cleared in one booking?", answer: "Yes, Taskers can handle multiple areas at once." },
        { question: "Do they provide snow shovels or equipment?", answer: "Yes, all necessary tools are included." },
        { question: "Is salt application available?", answer: "Optional salting service is available." }
      ]
    },
    {
      name: "Sidewalk Salting",
      href: "/services/winter-tasks/sidewalk-salting",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Do Taskers provide the salt?", answer: "Yes, Taskers bring and apply salt as needed." },
        { question: "Is service insured?", answer: "Yes, all salting services are insured." },
        { question: "Can multiple sidewalks be serviced at once?", answer: "Yes, large properties can be fully covered." },
        { question: "Is eco-friendly salt an option?", answer: "Yes, eco-friendly materials can be requested." },
        { question: "Do they clear snow before salting?", answer: "Yes, snow is cleared prior to salting." }
      ]
    },
    {
      name: "Window Winterization",
      href: "/services/winter-tasks/window-winterization",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "What types of windows are winterized?", answer: "All residential and commercial windows are supported." },
        { question: "Are materials included?", answer: "Yes, all insulation materials are provided." },
        { question: "Is service insured?", answer: "Yes, all winterization services are insured." },
        { question: "Can custom insulation methods be applied?", answer: "Yes, Taskers follow your instructions." },
        { question: "Is weatherproofing included?", answer: "Yes, sealing and insulation are part of the service." }
      ]
    },
    {
      name: "Residential Snow Removal",
      href: "/services/winter-tasks/residential-snow-removal",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Do Taskers handle single-family homes?", answer: "Yes, all residential properties are supported." },
        { question: "Is equipment provided?", answer: "Yes, snow shovels and plows are included." },
        { question: "Is service insured?", answer: "Yes, residential snow removal is insured." },
        { question: "Can driveways and walkways both be cleared?", answer: "Yes, all outdoor surfaces are covered." },
        { question: "Do they offer emergency snow removal?", answer: "Yes, last-minute requests can be accommodated." }
      ]
    },
    {
      name: "Christmas Tree Removal",
      href: "/services/winter-tasks/christmas-tree-removal",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Do Taskers remove live and artificial trees?", answer: "Yes, both types of trees are supported." },
        { question: "Is disposal included?", answer: "Yes, proper disposal is part of the service." },
        { question: "Is service insured?", answer: "Yes, all removal services are insured." },
        { question: "Can multiple trees be removed at once?", answer: "Yes, bulk removal is possible." },
        { question: "Do they clean up surrounding area?", answer: "Yes, area cleanup is included." }
      ]
    },
    {
      name: "AC Winterization",
      href: "/services/winter-tasks/ac-winterization",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Does service cover residential and commercial AC units?", answer: "Yes, all AC types are supported." },
        { question: "Are materials included?", answer: "Yes, insulation and covers are provided." },
        { question: "Is service insured?", answer: "Yes, all winterization services are insured." },
        { question: "Does it prevent freezing damage?", answer: "Yes, Taskers prepare ACs for winter." },
        { question: "Can multiple units be winterized at once?", answer: "Yes, large properties are supported." }
      ]
    },
    {
      name: "Winter Yardwork",
      href: "/services/winter-tasks/winter-yardwork",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "What winter yardwork is included?", answer: "Snow shoveling, leaf clearing, and yard prep are included." },
        { question: "Is service insured?", answer: "Yes, all tasks are insured." },
        { question: "Can multiple tasks be handled in one visit?", answer: "Yes, Taskers can handle multiple yard tasks." },
        { question: "Are tools provided?", answer: "Yes, all necessary equipment is included." },
        { question: "Do Taskers offer emergency services?", answer: "Yes, urgent winter tasks can be accommodated." }
      ]
    },
    {
      name: "Pipe Insulation",
      href: "/services/winter-tasks/pipe-insulation",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Does service cover all types of pipes?", answer: "Yes, residential and commercial pipes are supported." },
        { question: "Are materials included?", answer: "Yes, all insulation materials are provided." },
        { question: "Is service insured?", answer: "Yes, all winter services are insured." },
        { question: "Does it prevent freezing?", answer: "Yes, Taskers ensure pipes are protected." },
        { question: "Can multiple areas be insulated at once?", answer: "Yes, large properties are supported." }
      ]
    },
    {
      name: "Storm Door Installation",
      href: "/services/winter-tasks/storm-door-installation",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Do Taskers install all types of storm doors?", answer: "Yes, residential and commercial doors are supported." },
        { question: "Are materials included?", answer: "Yes, all installation materials are provided." },
        { question: "Is service insured?", answer: "Yes, all installation services are insured." },
        { question: "Can multiple doors be installed at once?", answer: "Yes, bulk installation is supported." },
        { question: "Do they remove old doors?", answer: "Yes, optional removal service is available." }
      ]
    },
    {
      name: "Winter Deck Maintenance",
      href: "/services/winter-tasks/winter-deck-maintenance",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "What maintenance is included?", answer: "Snow removal, sealing, and inspection are included." },
        { question: "Is service insured?", answer: "Yes, all winter maintenance services are insured." },
        { question: "Can multiple decks be serviced?", answer: "Yes, large properties are supported." },
        { question: "Are tools provided?", answer: "Yes, Taskers bring all necessary equipment." },
        { question: "Do they prepare decks for ice and snow?", answer: "Yes, decks are winter-ready after service." }
      ]
    },
    {
      name: "Water Heater Maintenance",
      href: "/services/winter-tasks/water-heater-maintenance",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Does service cover all types of water heaters?", answer: "Yes, tank and tankless systems are supported." },
        { question: "Are materials included?", answer: "Yes, all maintenance materials are provided." },
        { question: "Is service insured?", answer: "Yes, winter maintenance services are insured." },
        { question: "Does it prevent freezing?", answer: "Yes, heaters are winter-ready." },
        { question: "Can multiple heaters be serviced at once?", answer: "Yes, large properties are supported." }
      ]
    },
    {
      name: "Wait in Line",
      href: "/services/winter-tasks/wait-in-line",
      parent: "/services/winter-tasks",
      faqs: [
        { question: "Can Taskers wait for winter product launches or tickets?", answer: "Yes, all types of lines are supported." },
        { question: "Is service insured?", answer: "Yes, waiting tasks are insured." },
        { question: "Can multiple locations be handled?", answer: "Yes, Taskers can manage multiple stops." },
        { question: "Are time estimates provided?", answer: "Yes, Taskers provide expected waiting times." },
        { question: "Do they pick up items if purchased?", answer: "Yes, optional pickup service is available." }
      ]
    }
  ]
  },
  {
    id: "personal-assistant",
    title: "Personal Assistant",
    href: "/services/personal-assistant",
    description: "Hire a Tasker as your personal assistant — hourly or ongoing support!",
    banner: "/Painting-Task.webp",
    subServices: [
    {
      name: "Personal Assistant",
      href: "/services/personal-assistant/personal-assistant",
      parent: "/services/personal-assistant",
      faqs: [
        { question: "What tasks can a personal assistant handle?", answer: "Taskers can handle errands, scheduling, shopping, and daily tasks." },
        { question: "Is service insured?", answer: "Yes, all personal assistant services are insured." },
        { question: "Can they work remotely?", answer: "Yes, virtual assistance is available." },
        { question: "Are multiple tasks allowed in one booking?", answer: "Yes, Taskers can handle multiple requests at once." },
        { question: "Do they provide personal organization tips?", answer: "Yes, Taskers can suggest methods for better organization." }
      ]
    },
    {
      name: "Running Your Errands",
      href: "/services/personal-assistant/running-errands",
      parent: "/services/personal-assistant",
      faqs: [
        { question: "What type of errands can be run?", answer: "Shopping, post office, pharmacy, or any small errands." },
        { question: "Is service insured?", answer: "Yes, all errands are insured." },
        { question: "Can multiple errands be handled in one visit?", answer: "Yes, Taskers can complete several errands." },
        { question: "Do they provide transportation?", answer: "Yes, Taskers can use personal or public transport as needed." },
        { question: "Can errands be scheduled in advance?", answer: "Yes, bookings can be made ahead of time." }
      ]
    },
    {
      name: "Wait in Line",
      href: "/services/personal-assistant/wait-in-line",
      parent: "/services/personal-assistant",
      faqs: [
        { question: "Can Taskers wait for appointments or store openings?", answer: "Yes, they can wait for any line-based task." },
        { question: "Is service insured?", answer: "Yes, all waiting services are insured." },
        { question: "Can multiple locations be handled?", answer: "Yes, Taskers can cover multiple stops." },
        { question: "Are time estimates provided?", answer: "Yes, Taskers provide expected waiting times." },
        { question: "Do they pick up items if needed?", answer: "Yes, optional pickup service is available." }
      ]
    },
    {
      name: "Organization",
      href: "/services/personal-assistant/organization",
      parent: "/services/personal-assistant",
      faqs: [
        { question: "What areas can Taskers organize?", answer: "Home, office, closet, or digital spaces." },
        { question: "Is service insured?", answer: "Yes, all organization services are insured." },
        { question: "Can they provide custom solutions?", answer: "Yes, Taskers follow client preferences." },
        { question: "Do they use storage tools?", answer: "Yes, Taskers bring bins, labels, and organizers." },
        { question: "Are multiple rooms supported?", answer: "Yes, large properties can be fully organized." }
      ]
    },
    {
      name: "Organize Home",
      href: "/services/personal-assistant/organize-home",
      parent: "/services/personal-assistant",
      faqs: [
        { question: "Which parts of the home are included?", answer: "Living spaces, kitchen, bedrooms, and storage areas." },
        { question: "Is service insured?", answer: "Yes, all home organization services are insured." },
        { question: "Can they declutter unwanted items?", answer: "Yes, Taskers can sort and suggest donation or disposal." },
        { question: "Do they provide storage solutions?", answer: "Yes, Taskers bring bins and organizers if needed." },
        { question: "Are multiple rooms covered?", answer: "Yes, Taskers can organize the entire home in one visit." }
      ]
    },
    {
      name: "Closet Organization Service",
      href: "/services/personal-assistant/closet-organization",
      parent: "/services/personal-assistant",
      faqs: [
        { question: "Do they handle all closet types?", answer: "Yes, including walk-in and standard closets." },
        { question: "Is service insured?", answer: "Yes, all organization services are insured." },
        { question: "Can they recommend storage solutions?", answer: "Yes, Taskers provide custom organization solutions." },
        { question: "Do they declutter and donate items?", answer: "Yes, optional donation assistance is provided." },
        { question: "Can they organize multiple closets?", answer: "Yes, Taskers can organize several closets at once." }
      ]
    },
    {
      name: "Interior Design Service",
      href: "/services/personal-assistant/interior-design",
      parent: "/services/personal-assistant",
      faqs: [
        { question: "Do Taskers provide full interior design?", answer: "Yes, from concept to execution." },
        { question: "Is service insured?", answer: "Yes, interior design services are insured." },
        { question: "Can they work with existing furniture?", answer: "Yes, they can optimize existing spaces." },
        { question: "Do they provide mood boards or layouts?", answer: "Yes, Taskers provide visual planning tools." },
        { question: "Are multiple rooms supported?", answer: "Yes, full home design is possible." }
      ]
    },
    {
      name: "Virtual Assistant",
      href: "/services/personal-assistant/virtual-assistant",
      parent: "/services/personal-assistant",
      faqs: [
        { question: "Do they handle scheduling and emails?", answer: "Yes, virtual assistants manage digital tasks efficiently." },
        { question: "Is service insured?", answer: "Yes, virtual assistance services are insured." },
        { question: "Can they handle multiple clients?", answer: "Yes, Taskers can manage multiple assignments." },
        { question: "Do they provide reminders and alerts?", answer: "Yes, virtual assistants manage notifications." },
        { question: "Is remote document handling included?", answer: "Yes, virtual assistants can handle files and online documents." }
      ]
    }
  ]
  },
  {
    id: "baby-prep",
    title: "Baby Prep",
    href: "/services/baby-prep",
    description: "Prepare your home for your little one with baby-friendly services.",
    banner: "/Assembly.webp",
    subServices: [
    {
      name: "Baby Proofing",
      href: "/services/baby-prep/baby-proofing",
      parent: "/services/baby-prep",
      faqs: [
        { question: "What areas can be baby-proofed?", answer: "Corners, cabinets, doors, electrical outlets, and stairways." },
        { question: "Is service insured?", answer: "Yes, baby proofing services are insured." },
        { question: "Can they install safety gates?", answer: "Yes, Taskers install gates and barriers." },
        { question: "Do they provide safety tips?", answer: "Yes, Taskers suggest tips for a safer home." },
        { question: "Are multiple rooms supported?", answer: "Yes, the entire home can be baby-proofed." }
      ]
    },
    {
      name: "Baby Food Delivery",
      href: "/services/baby-prep/baby-food-delivery",
      parent: "/services/baby-prep",
      faqs: [
        { question: "Do Taskers deliver fresh baby food?", answer: "Yes, fresh and safe baby food delivery is provided." },
        { question: "Is service insured?", answer: "Yes, delivery services are insured." },
        { question: "Can they handle special dietary needs?", answer: "Yes, Taskers follow dietary instructions." },
        { question: "Are same-day deliveries available?", answer: "Yes, depending on availability." },
        { question: "Can they deliver multiple items at once?", answer: "Yes, Taskers can deliver multiple orders." }
      ]
    },
    {
      name: "Organize a Room",
      href: "/services/baby-prep/organize-room",
      parent: "/services/baby-prep",
      faqs: [
        { question: "Which rooms can be organized?", answer: "Nurseries, bedrooms, playrooms, and storage spaces." },
        { question: "Is service insured?", answer: "Yes, organization services are insured." },
        { question: "Do Taskers provide storage solutions?", answer: "Yes, they bring organizers, bins, and labels." },
        { question: "Can they declutter unwanted items?", answer: "Yes, optional donation or disposal is available." },
        { question: "Are multiple rooms supported?", answer: "Yes, Taskers can organize several rooms in one visit." }
      ]
    },
    {
      name: "Painting",
      href: "/services/baby-prep/painting",
      parent: "/services/baby-prep",
      faqs: [
        { question: "Which areas can be painted?", answer: "Nurseries, bedrooms, walls, and furniture." },
        { question: "Is service insured?", answer: "Yes, painting services are insured." },
        { question: "Do they provide paints and supplies?", answer: "Yes, Taskers bring all necessary materials if requested." },
        { question: "Are multiple rooms supported?", answer: "Yes, Taskers can paint multiple rooms." },
        { question: "Do they handle cleanup?", answer: "Yes, post-painting cleanup is included." }
      ]
    },
    {
      name: "Toy Assembly Service",
      href: "/services/baby-prep/toy-assembly",
      parent: "/services/baby-prep",
      faqs: [
        { question: "Do Taskers assemble all types of toys?", answer: "Yes, including cribs, playsets, and furniture toys." },
        { question: "Is service insured?", answer: "Yes, assembly services are insured." },
        { question: "Can multiple toys be assembled in one visit?", answer: "Yes, Taskers can assemble several items." },
        { question: "Do they follow safety instructions?", answer: "Yes, all assembly follows manufacturer safety guidelines." },
        { question: "Are tools provided?", answer: "Yes, Taskers bring all necessary tools." }
      ]
    },
    {
      name: "Smart Home Installation",
      href: "/services/baby-prep/smart-home-installation",
      parent: "/services/baby-prep",
      faqs: [
        { question: "Which devices can be installed?", answer: "Cameras, sensors, smart plugs, thermostats, and alarms." },
        { question: "Is service insured?", answer: "Yes, installation services are insured." },
        { question: "Do they configure devices?", answer: "Yes, Taskers setup and configure smart home devices." },
        { question: "Can multiple devices be installed at once?", answer: "Yes, Taskers can handle multiple devices." },
        { question: "Is follow-up support available?", answer: "Yes, Taskers provide guidance and troubleshooting support." }
      ]
    },
    {
      name: "Shopping",
      href: "/services/baby-prep/shopping",
      parent: "/services/baby-prep",
      faqs: [
        { question: "What items can Taskers purchase?", answer: "Baby supplies, groceries, and other essentials." },
        { question: "Is service insured?", answer: "Yes, shopping services are insured." },
        { question: "Can they follow a shopping list?", answer: "Yes, Taskers strictly follow provided lists." },
        { question: "Are same-day errands available?", answer: "Yes, depending on availability." },
        { question: "Can they deliver purchased items?", answer: "Yes, delivery service is included." }
      ]
    },
    {
      name: "General Cleaning",
      href: "/services/baby-prep/general-cleaning",
      parent: "/services/baby-prep",
      faqs: [
        { question: "Which areas are cleaned?", answer: "Nurseries, bedrooms, play areas, and common spaces." },
        { question: "Is service insured?", answer: "Yes, cleaning services are insured." },
        { question: "Do Taskers bring cleaning supplies?", answer: "Yes, all necessary materials are provided." },
        { question: "Are deep cleaning services available?", answer: "Yes, upon request Taskers provide deep cleaning." },
        { question: "Can multiple rooms be cleaned in one visit?", answer: "Yes, Taskers can clean several rooms at once." }
      ]
    }
  ]
  },
  {
    id: "virtual-online-tasks",
    title: "Virtual & Online Tasks",
    href: "/services/virtual-online-tasks",
    description: "Virtual assistance, organization, research, & more.",
    banner: "/HomeRepair1.webp",
    subServices: [
    {
      name: "Virtual Assistant",
      href: "/services/virtual-online-tasks/virtual-assistant",
      parent: "/services/virtual-online-tasks",
      faqs: [
        { question: "What tasks can a virtual assistant do?", answer: "Email management, scheduling, research, and general admin work." },
        { question: "Is service insured?", answer: "Yes, virtual assistant services are insured." },
        { question: "Can tasks be recurring?", answer: "Yes, recurring or one-time tasks are supported." },
        { question: "Do they provide progress updates?", answer: "Yes, Taskers update you regularly on task completion." },
        { question: "Are multiple tasks supported?", answer: "Yes, Taskers can handle multiple tasks at once." }
      ]
    },
    {
      name: "Organization",
      href: "/services/virtual-online-tasks/organization",
      parent: "/services/virtual-online-tasks",
      faqs: [
        { question: "What can be organized?", answer: "Digital files, calendars, emails, and cloud storage." },
        { question: "Is service insured?", answer: "Yes, online organization services are insured." },
        { question: "Can they set up systems?", answer: "Yes, Taskers can implement organization systems." },
        { question: "Are recurring updates available?", answer: "Yes, ongoing support can be scheduled." },
        { question: "Do they provide instructions?", answer: "Yes, Taskers guide you for easy maintenance." }
      ]
    },
    {
      name: "Data Entry",
      href: "/services/data-entry",
      parent: "/services/virtual-online-tasks/virtual-online-tasks",
      faqs: [
        { question: "What types of data can be entered?", answer: "Excel sheets, databases, CRM systems, and forms." },
        { question: "Is service insured?", answer: "Yes, data entry services are insured." },
        { question: "Can bulk data be handled?", answer: "Yes, Taskers can handle large datasets." },
        { question: "Do they ensure accuracy?", answer: "Yes, high accuracy and double-checking is part of the service." },
        { question: "Are recurring data tasks supported?", answer: "Yes, recurring data entry jobs can be scheduled." }
      ]
    },
    {
      name: "Computer Help",
      href: "/services/virtual-online-tasks/computer-help",
      parent: "/services/virtual-online-tasks",
      faqs: [
        { question: "What issues can Taskers resolve?", answer: "Software setup, troubleshooting, updates, and basic IT support." },
        { question: "Is service insured?", answer: "Yes, computer help services are insured." },
        { question: "Do they provide remote assistance?", answer: "Yes, remote support is available." },
        { question: "Are multiple devices supported?", answer: "Yes, Taskers can assist multiple devices." },
        { question: "Do they provide guidance for future issues?", answer: "Yes, Taskers give tips and instructions for maintenance." }
      ]
    }
  ]
  },
  {
    id: "office-services",
    title: "Office Services",
    href: "/services/office-services",
    description: "Hire a Tasker to help around the office!",
    banner: "Task-1.webp",
    subServices: [
    {
      name: "Office Cleaning",
      href: "/services/office-services/office-cleaning",
      parent: "/services/office-services",
      faqs: [
        { question: "What does office cleaning include?", answer: "Dusting, vacuuming, trash removal, and sanitization." },
        { question: "Is cleaning equipment provided?", answer: "Yes, Taskers bring necessary cleaning supplies." },
        { question: "Can recurring cleaning be scheduled?", answer: "Yes, daily, weekly, or monthly cleaning is supported." },
        { question: "Is service insured?", answer: "Yes, office cleaning services are insured." },
        { question: "Do they clean common areas?", answer: "Yes, reception, restrooms, and breakrooms are included." }
      ]
    },
    {
      name: "Office Tech Setup",
      href: "/services/office-services/office-tech-setup",
      parent: "/services/office-services",
      faqs: [
        { question: "What technology setups are supported?", answer: "Printers, Wi-Fi, computers, and conference room equipment." },
        { question: "Is service insured?", answer: "Yes, tech setup services are insured." },
        { question: "Can Taskers troubleshoot issues?", answer: "Yes, Taskers can resolve setup and connectivity issues." },
        { question: "Do they provide instructions?", answer: "Yes, guidance and documentation are provided." },
        { question: "Are multiple devices supported?", answer: "Yes, setup for multiple devices is available." }
      ]
    },
    {
      name: "Office Movers",
      href: "/services/office-servicesoffice-movers",
      parent: "/services/office-services",
      faqs: [
        { question: "Do they move office furniture?", answer: "Yes, desks, chairs, and cabinets are included." },
        { question: "Is service insured?", answer: "Yes, office moving services are insured." },
        { question: "Can heavy equipment be moved?", answer: "Yes, Taskers handle heavy items safely." },
        { question: "Do they provide packing?", answer: "Yes, optional packing services are available." },
        { question: "Is scheduling flexible?", answer: "Yes, Taskers work according to your schedule." }
      ]
    },
    {
      name: "Office Supply & Snack Delivery",
      href: "/services/office-services/office-supply-snack-delivery",
      parent: "/services/office-services",
      faqs: [
        { question: "What items can be delivered?", answer: "Office supplies, snacks, beverages, and essentials." },
        { question: "Is delivery insured?", answer: "Yes, all deliveries are insured." },
        { question: "Are recurring deliveries supported?", answer: "Yes, recurring office deliveries can be scheduled." },
        { question: "Do they track delivery?", answer: "Yes, Taskers provide updates and confirmations." },
        { question: "Is service available same-day?", answer: "Yes, same-day delivery is available in most areas." }
      ]
    },
    {
      name: "Office Furniture Assembly",
      href: "/services/office-services/office-furniture-assembly",
      parent: "/services/office-services",
      faqs: [
        { question: "What furniture can be assembled?", answer: "Desks, chairs, cabinets, and shelves." },
        { question: "Is service insured?", answer: "Yes, furniture assembly services are insured." },
        { question: "Can heavy furniture be handled?", answer: "Yes, Taskers can assemble heavy and complex furniture." },
        { question: "Do they provide tools?", answer: "Yes, all necessary tools are provided." },
        { question: "Is disassembly available?", answer: "Yes, furniture disassembly is also offered." }
      ]
    },
    {
      name: "Office Setup & Organization",
      href: "/services/office-services/office-setup-organization",
      parent: "/services/office-services",
      faqs: [
        { question: "What areas can be organized?", answer: "Workstations, storage, and common areas." },
        { question: "Is service insured?", answer: "Yes, office organization services are insured." },
        { question: "Can systems be implemented?", answer: "Yes, Taskers can design filing and organizational systems." },
        { question: "Do they provide guidance?", answer: "Yes, instructions for maintenance are included." },
        { question: "Is recurring organization supported?", answer: "Yes, ongoing organizational support is available." }
      ]
    },
    {
      name: "Office Administration",
      href: "/services/office-services/office-administration",
      parent: "/services/office-services",
      faqs: [
        { question: "What tasks are covered?", answer: "Scheduling, filing, correspondence, and office management support." },
        { question: "Is service insured?", answer: "Yes, administrative services are insured." },
        { question: "Can recurring tasks be scheduled?", answer: "Yes, recurring administrative tasks are supported." },
        { question: "Do they provide reports?", answer: "Yes, Taskers provide updates and summaries." },
        { question: "Are remote tasks supported?", answer: "Yes, some tasks can be handled remotely." }
      ]
    },
    {
      name: "Office Interior Design",
      href: "/services/office-services/office-interior-design",
      parent: "/services/office-services",
      faqs: [
        { question: "What design services are provided?", answer: "Workspace layout, decoration, and furniture placement." },
        { question: "Is service insured?", answer: "Yes, interior design services are insured." },
        { question: "Can they suggest furniture?", answer: "Yes, Taskers can recommend furniture and decor." },
        { question: "Do they provide CAD or sketches?", answer: "Yes, basic layout sketches or plans are provided." },
        { question: "Is ongoing design support available?", answer: "Yes, follow-up support is offered." }
      ]
    },
    {
      name: "Moving Office Furniture",
      href: "/services/office-services/moving-office-furniture",
      parent: "/services/office-services",
      faqs: [
        { question: "Do they move desks and chairs?", answer: "Yes, all office furniture can be moved." },
        { question: "Is service insured?", answer: "Yes, moving furniture services are insured." },
        { question: "Can heavy furniture be moved?", answer: "Yes, Taskers handle heavy items safely." },
        { question: "Do they provide packing?", answer: "Yes, optional packing is available." },
        { question: "Is scheduling flexible?", answer: "Yes, Taskers work according to your schedule." }
      ]
    },
    {
      name: "Office Mounting Service",
      href: "/services/office-services/office-mounting",
      parent: "/services/office-services",
      faqs: [
        { question: "What mounting services are offered?", answer: "Whiteboards, monitors, projectors, and shelving." },
        { question: "Is service insured?", answer: "Yes, mounting services are insured." },
        { question: "Do they provide tools?", answer: "Yes, all necessary tools are included." },
        { question: "Can large items be mounted?", answer: "Yes, Taskers handle heavy and large items." },
        { question: "Is guidance provided?", answer: "Yes, instructions and tips are provided for safe mounting." }
      ]
    }
  ] 
  },
  {
    id: "contactless-tasks",
    title: "Contactless Tasks",
    href: "/services/contactless-tasks",
    description: "No-contact delivery, shopping, errands",
    banner: "/task19.webp",
    subServices: [
    {
      name: "Contactless Delivery",
      href: "/services/contactless-tasks/contactless-delivery",
      parent: "/services/contactless-tasks",
      faqs: [
        { question: "What is contactless delivery?", answer: "Items are delivered without physical contact with the Tasker." },
        { question: "Is delivery insured?", answer: "Yes, all deliveries are insured." },
        { question: "Can groceries be delivered?", answer: "Yes, grocery delivery is supported." },
        { question: "Is same-day service available?", answer: "Yes, depending on location." },
        { question: "Are special instructions allowed?", answer: "Yes, you can leave specific delivery instructions." }
      ]
    },
    {
      name: "Contactless Prescription Pick-up & Delivery",
      href: "/services/contactless-tasks/contactless-prescription",
      parent: "/services/contactless-tasks",
      faqs: [
        { question: "Can Taskers pick up prescriptions?", answer: "Yes, prescription pick-up and delivery is supported." },
        { question: "Is service insured?", answer: "Yes, fully insured." },
        { question: "Do they verify prescriptions?", answer: "Yes, they follow pharmacy requirements." },
        { question: "Are sensitive items handled carefully?", answer: "Yes, all medical items are handled safely." },
        { question: "Is contactless drop-off guaranteed?", answer: "Yes, deliveries can be left without direct contact." }
      ]
    },
    {
      name: "Running Your Errands",
      href: "/services/contactless-tasks/running-errands",
      parent: "/services/contactless-tasks",
      faqs: [
        { question: "What errands can be done?", answer: "Grocery shopping, post office, bank visits, and more." },
        { question: "Is service insured?", answer: "Yes, errands are insured." },
        { question: "Can recurring errands be scheduled?", answer: "Yes, recurring tasks are supported." },
        { question: "Do Taskers shop for you?", answer: "Yes, with provided instructions and lists." },
        { question: "Is pickup and drop-off included?", answer: "Yes, Taskers handle complete errands." }
      ]
    },
    {
      name: "Grocery Shopping & Delivery",
      href: "/services/contactless-tasks/grocery-shopping-delivery",
      parent: "/services/contactless-tasks",
      faqs: [
        { question: "Can groceries be delivered safely?", answer: "Yes, contactless delivery ensures safety." },
        { question: "Is service insured?", answer: "Yes, fully insured." },
        { question: "Can you specify grocery items?", answer: "Yes, Taskers follow detailed shopping lists." },
        { question: "Is same-day delivery available?", answer: "Yes, depending on location." },
        { question: "Are substitutions allowed?", answer: "Yes, with your permission." }
      ]
    },
    {
      name: "Disinfecting Services",
      href: "/services/contactless-tasks/disinfecting-services",
      parent: "/services/contactless-tasks",
      faqs: [
        { question: "What areas are disinfected?", answer: "Homes, offices, and delivery items." },
        { question: "Is service insured?", answer: "Yes, disinfecting services are insured." },
        { question: "Are disinfectants safe?", answer: "Yes, eco-friendly and safe solutions are used." },
        { question: "Can recurring disinfection be scheduled?", answer: "Yes, daily or weekly options available." },
        { question: "Is personal protective equipment used?", answer: "Yes, Taskers follow safety protocols." }
      ]
    },
    {
      name: "Drop Off Donations",
      href: "/services/contactless-tasks/drop-off-donations",
      parent: "/services/contactless-tasks",
      faqs: [
        { question: "What donations can be delivered?", answer: "Clothes, food, furniture, and essentials." },
        { question: "Is service insured?", answer: "Yes, donations are handled safely." },
        { question: "Can multiple drop-offs be arranged?", answer: "Yes, Taskers can schedule multiple stops." },
        { question: "Is contactless delivery ensured?", answer: "Yes, items are left without direct contact." },
        { question: "Do they follow charity guidelines?", answer: "Yes, all charities’ requirements are followed." }
      ]
    },
    {
      name: "Yard Work Services",
      href: "/services/contactless-tasks/yard-work-services",
      parent: "/services/contactless-tasks",
      faqs: [
        { question: "What yard work is provided?", answer: "Lawn mowing, weed removal, gardening, and maintenance." },
        { question: "Is service insured?", answer: "Yes, fully insured." },
        { question: "Do Taskers bring equipment?", answer: "Yes, all necessary tools are provided." },
        { question: "Can recurring yard work be scheduled?", answer: "Yes, weekly or monthly services are available." },
        { question: "Is contactless service possible?", answer: "Yes, Taskers maintain distance while working." }
      ]
    },
    {
      name: "Virtual Assistant",
      href: "/services/contactless-tasks/virtual-assistant",
      parent: "/services/contactless-tasks",
      faqs: [
        { question: "What tasks can a virtual assistant handle?", answer: "Emails, scheduling, data entry, research, and more." },
        { question: "Is service insured?", answer: "Yes, virtual assistant services are insured." },
        { question: "Is remote work supported?", answer: "Yes, all tasks are handled remotely." },
        { question: "Can recurring tasks be scheduled?", answer: "Yes, recurring support is available." },
        { question: "Are confidential tasks secure?", answer: "Yes, Taskers follow strict privacy protocols." }
      ]
    }
  ]

  },
];

export default ServicesData;