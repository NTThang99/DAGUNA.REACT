import React from "react";
import Heading from "../components/common/Heading";
import { useParams } from "react-router-dom";
import RoomDetails from "../components/home/RoomDetails";
import Footer from "../components/common/Footer";

export default function RoomDetail() {
    const { roomName } = useParams();
  return (
    <>
      <Heading  heading={`${roomName}`} />
      <RoomDetails />
      <Footer />
    </>
  );
}
