import React from "react";
import Heading from "../components/common/Heading";
import Services from "../components/home/Service";
import Sliders from "../components/home/Slider";
import Footer from "../components/common/Footer";

export default function Service() {
  return (
    <>
      <Heading heading="Services" title="Home" subtitle="Services" />
      <Services />
      <Sliders />
      <Footer />
    </>
  );
}
