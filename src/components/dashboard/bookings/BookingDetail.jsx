import React, { useEffect, useState } from "react";
import BookingService from "../../../services/BookingService";
import UtilityService from "../../../services/UtilityService";
import { useParams } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { TextField } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import RoomRealService from "../../../services/RoomRealService";

export default function BookingDetail() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState({});
  const [loading, setLoading] = useState(false);
  const [utilityList, setUtilityList] = useState([]);
  const [utilitiesCheck, setUtilitiesCheck] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [bookingDetailSelected, setBookingDetailSelected] = useState(null);
  const [selectedRoomNames, setSelectedRoomNames] = useState({});


  useEffect(() => {
    setLoading(true);
    async function getBookingDetail() {
      try {
        let dataUtility = await UtilityService.getAllUtility();
        let dataUtilityDatas = dataUtility?.data.map((u) => {
          return {
            id: u.id,
            name: u.name,
            check: false
          }
        })
        setUtilityList(dataUtilityDatas);

        const bookingDetail = await BookingService.getBookingsById(bookingId);
        const { data } = bookingDetail;
        setBooking(data);

        let dataUtilityCopy = [...dataUtilityDatas];
        data?.bookingDetails.forEach((detail) => {
          let arrUtilities = JSON.parse(detail?.room?.utilitie);
          for (let i = 0; i < dataUtilityCopy.length; i++) {
            if (arrUtilities.includes(dataUtilityCopy[i].id)) {
              dataUtilityCopy[i].check = true;
            }
          }
        });
        setUtilityList(dataUtilityCopy);
      } catch (error) {
        console.error('Error fetching booking detail:', error);
      } finally {
        setLoading(false);
      }
    }

    getBookingDetail();
  }, [bookingId]);

  useEffect(() => {
    if (bookingDetailSelected != null) {
      getAvailableRoom();
    }
  }, [bookingDetailSelected?.bookingDetailId]);


  console.log("booking", booking);
  const handleSave = () => {
    RoomRealService.getUpdateBooking_UpdateBookingDetail_UpdateRoomReal(bookingDetailSelected.bookingDetailId, value.id)
      .then(() => {
        
        // setSelectedRoomNames(prevState => ({
        //   ...prevState,
        //   [bookingDetailSelected?.bookingDetailId]: value.label 
        // }));
        setShowModal(false);

        window.location.reload(); 
      })
      .catch(error => {
        console.error('Error updating room:', error);
      });
  };
  

  let handleClickRadio = (evt, id) => {
    let newArray = [...utilitiesCheck, id];
    if (utilitiesCheck.includes(id)) {
      newArray = newArray.filter(day => day !== id);
    }
    setUtilitiesCheck(newArray);
  };

  const handleOpenModal = (bookingDetailSelected) => {
    setBookingDetailSelected(bookingDetailSelected);
    setShowModal(true);
  };

  const getAvailableRoom = async () => {
    const objSend = {
      selectFirstDay: new Date(booking?.bookingDetails?.[0]?.checkIn),
      selectLastDay: new Date(booking?.bookingDetails?.[0]?.checkOut),
    };

    const availableRooms = await RoomRealService.postFindAvailableRoomReal(objSend);
    let data = availableRooms?.data.map(r => {
      return {
        "label": r.roomCode,
        "id": r.id
      }
    });
    setAvailableRooms(data);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <div>
          <h2 style={{ textAlign: "center" }}>Booking Detail</h2>
          <hr />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <p>Id Booking: {booking?.bookingId}</p>
              <p>Code: {booking?.bookingCode}</p>
              <p>Check In: {new Date(booking?.bookingDetails?.[0]?.checkIn).toLocaleTimeString('en-GB', { hour12: false }) + ' ' + new Date(booking?.bookingDetails?.[0]?.checkIn).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })} </p>
              <p>Check Out:  {new Date(booking?.bookingDetails?.[0]?.checkOut).toLocaleTimeString('en-GB', { hour12: false }) + ' ' + new Date(booking?.bookingDetails?.[0]?.checkOut).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
              <p>Total: {booking?.bookingDetails?.[0]?.total}</p>
            </div>
            <div>
              <p>Total Amount: {booking?.bookingDetails?.[0]?.totalAmount}</p>
              <p>Vat: {booking?.bookingDetails?.[0]?.vat}</p>
              <p>Number Adult: {booking?.bookingDetails?.[0]?.numberAdult}</p>
              <p>Number Children: {booking?.bookingDetails?.[0]?.numberChildren}</p>
              <p>Discount Code: {booking?.bookingDetails?.[0]?.discountCode}</p>
            </div>
          </div>
          <h2 style={{ textAlign: "center" }}>Room Detail</h2>
          <div>
            {booking?.bookingDetails?.map((detail, index) => (
              <div className="row">
                <hr />
                <div key={index} className="col-6">
                  <p>ID Room: {detail?.room.id}</p>
                  <p>Room Name: {detail?.room.name}</p>
                  <p>Room Type: {detail?.room.roomType}</p>
                  <p>Quantity: {detail?.room.quantity}</p>
                  <p>View Type: {detail?.room.viewType}</p>
                  <p>Kind Of Room: {detail?.room.kindOfRoom.name}</p>
                  <div>
                  <p>Room: {detail?.checkInStatus == true ? detail?.roomReal?.roomCode : "---"}</p>

                    {
                      detail?.checkInStatus == false ? <button onClick={() => handleOpenModal(detail)} disabled={detail?.checkInStatus}>
                      Update Room
                      </button> : null
                    }
                    <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Please select a room</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <TextField
                              id="start-date"
                              label="Check In"
                              type="date"
                              defaultValue={booking?.bookingDetails?.length > 0 ? new Date(booking?.bookingDetails[0]?.checkIn).toISOString().substr(0, 10) : ''}
                              InputLabelProps={{ shrink: true }}
                              disabled
                            />
                            <br />
                            <br />
                            <TextField
                              id="end-date"
                              label="Check Out"
                              type="date"
                              defaultValue={booking?.bookingDetails?.length > 0 ? new Date(booking?.bookingDetails[0]?.checkOut).toISOString().substr(0, 10) : ''}
                              InputLabelProps={{ shrink: true }}
                              disabled
                            />
                          </div>
                          <div>
                            <br />
                            <Autocomplete
                              value={value}
                              onChange={(event, newValue) => {
                                setValue(newValue);
                              }}
                              inputValue={inputValue}
                              onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue);
                              }}
                              id="controllable-states-demo"
                              options={availableRooms}
                              sx={{ width: 300 }}
                              renderInput={(params) => <TextField {...params} label="Controllable" />}
                            />
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={handleSave}>
                          Save
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModal}>
                          Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <p>Per Type: {detail?.room.perType.name}</p>
                  <p>Price Per Night: {detail?.room.pricePerNight}</p>
                  <p>Acreage: {detail?.room.acreage}</p>
                  <p>Sleep: {detail?.room.sleep}</p>
                  <p>Description: {detail?.room.description}</p>
                  <div>
                    <p>Utilities:</p>
                    <div>
                      {utilityList.map((u) => (
                        <div key={u.id} className="form-check form-check-inline mb-3 justify-content-center">
                          <input
                            readOnly
                            type="checkbox"
                            value={u.id}
                            className={`form-check-input`}
                            onChange={(evt) => handleClickRadio(evt, u.id)}
                            checked={u.check}
                          />
                          <label className="form-check-label">{u.name}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  {detail?.bookingDetailServiceResDTOS?.map((bds) => (
                    <div>
                      <hr />
                      <p>Name Service: {bds.bookingService.name}</p>
                      <p>Description Service: {bds.bookingService.description}</p>
                      <p>Price Service: {bds.bookingService.price}</p>
                      {bds.bookingService.bookingServiceType === "SCAR" ? (
                        <div>
                          <p>Service Type: CAR</p>
                          <p>Number Car: {bds.numberCar}</p>
                        </div>
                      ) : (
                        <div>
                          <p>Service Type: SPA</p>
                          <p>Number Person: {bds.numberPerson}</p>
                          <p>Date: {bds.dateChooseService}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
