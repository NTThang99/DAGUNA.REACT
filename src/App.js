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
  AboutUs,
  Contact,
  PageNotFound,
  Room,
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
import RoomPage from "./pages/dashboard/RoomPage";
import CreateRoom from "./components/dashboard/rooms/CreateRoom";
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
            <Route path="/team" element={<Team />} />
            <Route path="/testimonial" element={<Testimonial />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/*" element={<PageNotFound />} />
            <Route path="/rooms" element={<Room />} />
            <Route path="/rooms/:roomName" element={<RoomDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/dashboard" element={<Dashboard />}>

              <Route path="rooms" element={<RoomPage/>}>
                <Route index element={<RoomList />} />
                <Route path="list" element={<RoomList />} />
                <Route path="add" element={<CreateRoom />} />
                <Route path=":roomId'" element={<RoomDetail />} />
                <Route path="remove" />
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