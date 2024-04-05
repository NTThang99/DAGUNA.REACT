import React from "react";
import Heading from "../components/common/Heading";
import Teams from "../components/home/Team";
import Footer from "../components/common/Footer";

export default function Team() {
  return (
    <>
      <Heading heading="Team" title="Home" subtitle="Team" />
      <Teams />
      <Footer />
    </>
  );
}
