import React from "react";
import Navbar from "../Dashboard/components/Navbar";
import FAQHeader from "./components/FAQHeader";
import FAQSection from "./components/FAQSection";

export default function FAQPage(props) {
  return (
    <div>
      <Navbar
        onOpen={props.onOpen}
        isOpen={props.isOpen}
        onClose={props.onClose}
      />
      <FAQHeader />
      <FAQSection />
    </div>
  );
}
