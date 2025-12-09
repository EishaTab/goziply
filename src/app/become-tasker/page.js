"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Features from "../components/Features";
import WhatIsTaskRabbit from "../components/WhatIsTaskRabbit";
import GettingStarted from "../components/GettingStarted";
import EmployeeReview from "../components/EmployeeReview";
import FAQAccordion from "../components/FAQAccordion";

export default function BecomeATasker() {
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [ShowTS, setShowTS] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);

  // Initialize on component mount
  useEffect(() => {
    if (cities.length > 0) {
      // Set default city
      const defaultCity = cities[0];
      setSelectedCity(defaultCity);
      
      // Get available services for default city
      updateAvailableServices(defaultCity);
    }
  }, []);

  // Update available services when city changes
  const updateAvailableServices = (city) => {
    const cityData = rates.find((r) => r.city === city);
    if (cityData) {
      // Get services that have rates in this city
      const servicesInCity = services.filter(
        service => cityData.services[service] !== undefined
      );
      setAvailableServices(servicesInCity);
      
      // Set first available service as selected
      if (servicesInCity.length > 0) {
        setSelectedCategory(servicesInCity[0]);
      } else {
        setSelectedCategory("");
      }
    } else {
      // If city not in rates, show all services with price 0
      setAvailableServices(services);
      if (services.length > 0) {
        setSelectedCategory(services[0]);
      }
    }
  };

  // Update price whenever city or category changes
  useEffect(() => {
    if (selectedCity && selectedCategory) {
      const cityData = rates.find((r) => r.city === selectedCity);
      if (cityData && cityData.services[selectedCategory] !== undefined) {
        setPrice(cityData.services[selectedCategory]);
      } else {
        // If service not available in this city, show 0
        setPrice(0);
      }
    } else {
      setPrice(null);
    }
  }, [selectedCity, selectedCategory]);

  // Handle city change
  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    updateAvailableServices(cityName);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
     
      <Features />
      <WhatIsTaskRabbit />
      <GettingStarted />
      <EmployeeReview />
      <FAQAccordion />
    </>
  );
}