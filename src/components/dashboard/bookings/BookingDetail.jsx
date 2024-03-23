import React, { useEffect, useState } from "react";
import BookingService from "../../../services/BookingService";
import { useParams } from "react-router-dom";

export default function BookingDetail() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getBookingDetail() {
      try {
        const bookingDetail = await BookingService.getBookingsById(bookingId);
        const { data } = bookingDetail;
        setBooking(data);
      } catch (error) {
        console.error('Error fetching booking detail:', error);
      } finally {
        setLoading(false);
      }
    }
    getBookingDetail();
  }, [bookingId]);

  return (
    <div style={{ textAlign: "center" }}>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h2>Booking Detail</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <p><strong>Id Booking:</strong> {booking?.bookingId}</p>
              <p><strong>Code:</strong> {booking?.bookingCode}</p>
              <p><strong>Check In:</strong> {new Date(booking?.bookingDetails?.[0]?.checkIn).toLocaleTimeString('en-GB', {hour12: false}) + ' ' + new Date(booking?.bookingDetails?.[0]?.checkIn).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})} </p>
              <p><strong>Check Out:</strong>  {new Date(booking?.bookingDetails?.[0]?.checkOut).toLocaleTimeString('en-GB', {hour12: false}) + ' ' + new Date(booking?.bookingDetails?.[0]?.checkOut).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</p>
              <p><strong>Total:</strong> {booking?.bookingDetails?.[0]?.total}</p>
              <p><strong>Total Amount:</strong> {booking?.bookingDetails?.[0]?.totalAmount}</p>
              <p><strong>Vat:</strong> {booking?.bookingDetails?.[0]?.vat}</p>
              <p><strong>Number Adult:</strong> {booking?.bookingDetails?.[0]?.numberAdult}</p>
              <p><strong>Number Children:</strong> {booking?.bookingDetails?.[0]?.numberChildren}</p>
              <p><strong>Discount Code:</strong> {booking?.bookingDetails?.[0]?.discountCode}</p>
              <p><strong>ID Room:</strong> {booking?.bookingDetails?.[0]?.room.id}</p>
            </div>
            <div>
              
              <p><strong>Room Name:</strong> {booking?.bookingDetails?.[0]?.room.name}</p>
              <p><strong>Room Type:</strong> {booking?.bookingDetails?.[0]?.room.roomType}</p>
              <p><strong>Quantity:</strong> {booking?.bookingDetails?.[0]?.room.quantity}</p>
              <p><strong>View Type:</strong> {booking?.bookingDetails?.[0]?.room.viewType}</p>
              <p><strong>Kind Of Room:</strong> {booking?.bookingDetails?.[0]?.room.kindOfRoom.name}</p>
              <p><strong>Per Type:</strong> {booking?.bookingDetails?.[0]?.room.perType.name}</p>
              <p><strong>Price Per Night:</strong> {booking?.bookingDetails?.[0]?.room.pricePerNight}</p>
              <p><strong>Acreage:</strong> {booking?.bookingDetails?.[0]?.room.acreage}</p>
              <p><strong>Sleep:</strong> {booking?.bookingDetails?.[0]?.room.sleep}</p>
              <p><strong>Description:</strong> {booking?.bookingDetails?.[0]?.room.description}</p>
              <p><strong>Utilitie:</strong> {booking?.bookingDetails?.[0]?.room.utilitie}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
