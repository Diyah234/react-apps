import React, { createContext, useState } from "react";

export const Context = createContext();

export function ContextProvider({ children }) {
  const [activeLink, setActiveLink] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("Arcade");
  const [billingPeriod, setBillingPeriod] = useState(false);
  const [activeStep, setActiveStep] = useState("1");

  const addOnsDetails = {
    Online: { title: "Online service", price: "+$10/yr", priceMonthly: "+$1/mo" },
    storage: { title: "Larger storage", price: "+$20/yr", priceMonthly: "+$2/mo" },
    profile: { title: "Customizable profile", price: "+$20/yr", priceMonthly: "+$2/mo" }
  };
  const plansDetails = {
    Arcade: { price: { yearly: "$90/yr", monthly: "$9/mo" } },
    Advanced: { price: { yearly: "$120/yr", monthly: "$12/mo" } },
    Pro: { price: { yearly: "$150/yr", monthly: "$15/mo" } }
  };

  return (
    <Context.Provider value={{ activeLink, setActiveLink,activeStep, setActiveStep, addOnsDetails, selectedPlan, setSelectedPlan, billingPeriod, setBillingPeriod, plansDetails }}>
      {children}
    </Context.Provider>
  );
}
