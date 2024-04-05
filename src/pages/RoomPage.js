import React from "react";
import Heading from "../components/common/Heading";
import Rooms from "../components/home/Rooms";
import Footer from "../components/common/Footer";

export default function Room() {
  return (
    <>
      <Heading heading="Room" title="Home" subtitle="Room" />
      <Rooms />
      <Footer />
    </>
  );
}
