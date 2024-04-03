import React from "react";
import "./css/style.css";
import "./css/bootstrap.min.css";
import "./css/animate.css";
import "./css/animate.min.css";
import "./App.css";
import Header from "./components/common/Header";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import BookingList from "./components/dashboard/bookings/BookingList";
import RoomPage from "./pages/dashboard/RoomPage";
import ReceptionistPage from "./pages/dashboard/ReceptionistPage";
import BookingPage from "./pages/dashboard/BookingPage";
import CreateRoom from "./components/dashboard/rooms/CreateRoom";
import CreateReceptionist from "./components/dashboard/receptionists/CreateReceptionist";
import RoomDetailDashboard from "./components/dashboard/rooms/RoomDetailDashboard";
import ReceptionistDetail from "./components/dashboard/receptionists/ReceptionistDetail";
import BookingDetailDashboard from "./components/dashboard/bookings/BookingDetail";
import ModalEditRoom from "./components/dashboard/rooms/ModalEditRoom";
import EditReceptionist from "./components/dashboard/receptionists/EditReceptionist";
import { ImportExportOutlined } from "@mui/icons-material"; 
import PrivateRoute from "./components/common/PrivateRoute";
import BookingDepositlDashboard from "./components/dashboard/bookings/ModalDeposit";

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
            <Route path="/receptionists/:receptionistName" element={<ReceptionistDetail />} />
            <Route path="/services" element={<Services />} />

            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<PrivateRoute Component={Dashboard} authority={["ROLE_ADMIN", "ROLE_RECEPTIONIST"]} />}  >
              <Route path="rooms" element={<RoomPage />} >
                {/* <Route index element={<RoomList />} /> */}
                <Route path="list" index element={<RoomList />} />
                <Route path="add" element={<PrivateRoute Component={CreateRoom} authority={["ROLE_ADMIN"]} previousUrl={"/dashboard/rooms/add"} />} />
                <Route path=":idRoomDetail" element={<RoomDetailDashboard />}  >
                  <Route path="room-reals"></Route>
                </Route>
                <Route path=":idRoomEdit" element={<PrivateRoute Component={ModalEditRoom} authority={["ROLE_ADMIN"]} />} />
              </Route>

              <Route path="receptionists" element={<ReceptionistPage />}>
                {/* <Route index element={<RoomList />} /> 
                http://localhost:3000/dashboard/receptionists/5
                */}
                <Route path="list" index element={<ReceptionistList />} />
                <Route path="add" element={<PrivateRoute Component={CreateReceptionist} authority={["ROLE_ADMIN"]} previousUrl={"/dashboard/receptionists/add"} />} />
                <Route path="edit/:receptionistId" element={<PrivateRoute Component={EditReceptionist} authority={["ROLE_ADMIN"]} />} />
                <Route path="detail/:receptionistId" element={<ReceptionistDetail />} />

              </Route>

              <Route path="bookings" element={<BookingPage />}>
                <Route path="list" index element={<BookingList />} />
                {/* <Route path="add" element={<CreateReceptionist />} /> */}
                <Route path="detail/:bookingId" element={<BookingDetailDashboard />} />
                <Route path="deposit/:bookingId" element={<BookingDepositlDashboard />} />
              </Route>
            </Route>
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}