import React from "react";
import Heading from "../../components/common/Heading";
import Bookings from "../../components/home/Booking/Booking";
import Footer from "../../components/common/Footer";

export default function Booking() {
  return (
    <>
      <Heading heading={"Booking"}/>
      <Bookings/>
      <Footer />
    </>
  );
}
