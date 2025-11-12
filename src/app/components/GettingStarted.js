"use client";
import {
  PlusIcon,
  DocumentTextIcon,
  CheckBadgeIcon,
  CreditCardIcon,
  CalendarDaysIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

export default function GettingStarted() {
  const steps = [
    {
      icon: <PlusIcon className="h-10 w-10 text-yellow-400" />,
      title: "Sign up",
      description:
        "Create your account. Then download the Tasker app to continue registration.",
    },
    {
      icon: <DocumentTextIcon className="h-10 w-10 text-yellow-400" />,
      title: "Build your profile",
      description: "Select what services you want to offer and where.",
    },
    {
      icon: <CheckBadgeIcon className="h-10 w-10 text-yellow-400" />,
      title: "Verify your eligibility to task",
      description:
        "Confirm your identity and submit business verifications, as required.",
    },
    {
      icon: <CreditCardIcon className="h-10 w-10 text-yellow-400" />,
      title: "Pay registration fee",
      description:
        "In applicable cities, we charge a $25 registration fee that helps us provide the best service to you.",
    },
    {
      icon: <CalendarDaysIcon className="h-10 w-10 text-yellow-400" />,
      title: "Set your schedule and work area",
      description:
        "Set your weekly availability and opt in to receive same-day jobs.",
    },
    {
      icon: <CurrencyDollarIcon className="h-10 w-10 text-yellow-400" />,
      title: "Start getting jobs",
      description: "Grow your business on your own terms.",
    },
  ];

  return (
    <div className="py-16 px-8 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Getting Started
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:scale-105 cursor-pointer"
          >
            <div className="mb-4">{step.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{step.title}</h2>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
