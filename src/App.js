import React from "react";
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/animate.css";
import "./css/animate.min.css";
import "./App.css";
import Header from "./components/common/Header";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  Home,
  Booking,
  BookingService,
  BookingCheckout,
  BookingEdit,
  AboutUs,
  Contact,
  PageNotFound,
  Room,
  Receptionist,
  RoomDetail,
  Services,
  Team,
  Testimonial,
  DashBoard,
  LoginForm,
  

} from "./pages/index";
import Footer from "./components/common/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import RoomList from "./components/dashboard/rooms/RoomList";
import ReceptionistList from "./components/dashboard/receptionists/ReceptionistList";
import RoomPage from "./pages/dashboard/RoomPage";
import ReceptionistPage from "./pages/dashboard/ReceptionistPage";
import CreateRoom from "./components/dashboard/rooms/CreateRoom";
import CreateReceptionist from "./components/dashboard/receptionists/CreateReceptionist";

import RoomDetailDashboard from "./components/dashboard/rooms/RoomDetailDashboard";
import ReceptionistDetailDashboard from "./components/dashboard/receptionists/ReceptionistDetailDashboard";
import ModalEditRoom from "./components/dashboard/rooms/ModalEditRoom";
import EditReceptionist from "./components/dashboard/receptionists/EditReceptionist";

export default function App() {
  return (
    <>
      <div>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/addons" element={<BookingService />} />
            <Route path="/booking/checkout" element={<BookingCheckout />} />
            <Route path="/booking/edit" element={<BookingEdit />} />
            <Route path="/team" element={<Team />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/receptionists" element={<Receptionist />} />
            <Route path="/rooms/:roomName" element={<RoomDetail />} />
            <Route path="/receptionists/:receptionistName" element={<ReceptionistDetailDashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/dashboard" element={<Dashboard />}>

              <Route path="rooms" element={<RoomPage/>}>
                {/* <Route index element={<RoomList />} /> */}
                <Route  path="list" index element={<RoomList />} />
                <Route path="add" element={<CreateRoom />} />
                <Route path=":idRoomDetail" element={<RoomDetailDashboard />}>
                  <Route path="room-reals"></Route>
                </Route>
                <Route path=":idRoomEdit" element={<ModalEditRoom />} />
              </Route>

              <Route path="receptionists" element={<ReceptionistPage/>}>
                {/* <Route index element={<RoomList />} /> */}
                <Route  path="list" index element={<ReceptionistList />} />
                <Route path="add" element={<CreateReceptionist />} />
                <Route path=":receptionistId" element={<EditReceptionist />} />
              </Route>

            </Route>
            <Route path="/login" element={<LoginForm />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}