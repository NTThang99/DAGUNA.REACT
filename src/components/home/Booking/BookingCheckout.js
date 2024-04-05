import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HeaderBooking from "./HeaderBooking";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import {
  getBookingByIdAPI,
  getAllBookingServiceAPI,
  updateBooking_DeleteRoomAPI,
  updateBooking_Complete,
} from "../BookingSlide";

import BookingDetail from "./BookingDetail";
import AppUtil from "../../../services/AppUtil";
import moment from 'moment';
import { toast } from "react-toastify";
const steps = ["Rooms", "Add-Ons", "Guest Details", "Confirmation"];

const countries = [
  { label: "Vietnam" },
  { label: "Afghanistan" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bhutan" },
  { label: "Bolivia" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Brazil" },
  { label: "Brunei" },
  { label: "Bulgaria" },
  { label: "Burkina Faso" },
  { label: "Burundi" },
  { label: "Cabo Verde" },
  { label: "Cambodia" },
  { label: "Cameroon" },
  { label: "Canada" },
];
const prefixs = [
  { label: "Dr." },
  { label: "Miss." },
  { label: "Mr." },
  { label: "Mrs." },
  { label: "Ms." },
  { label: "Pr." },
  { label: "Prof." },
  { label: "Rev." },
];


export default function BookingCheckout() {
  const navigate = useNavigate();
  const [adultQuantity, setAdultQuantity] = useState(2);
  const [childQuantity, setChildQuantity] = useState(2);
  const [activeStep, setActiveStep] = React.useState(0);
  const [showAddon, setShowAddon] = useState(-1);
  const [showDetailsBillRoom, setShowDetailsBillRoom] = useState(false);
  const [showDetailsBillService, setShowDetailsBillService] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingDetailChoosen, setBookingDetailChoosen] = useState(null);
  const dispatch = useDispatch();
  // const bookingServices = useSelector((state) => state.booking.addOns.data);
  const booking = useSelector((state) => state.booking.booking);
  const bookingDetails = useSelector((state) => state.booking.booking.bookingDetails);
  const [showCouponField, setShowCouponField] = useState(false);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleAddCouponClick = () => {
    setShowCouponField(true);
  };

  const handleCancelClick = () => {
    setShowCouponField(false);
  };
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleNext = () => {
    handleBookingHome()
    dispatch(
      updateBooking_Complete({
        bookingId: booking.bookingId,
      })

    )
    toast.success('Bạn đã đặt phòng thành công vui lòng kiểm tra email để xác nhận thông tin', { theme: "light" })
  };

  const handleBookingHome = () => {
    navigate(`/`);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleNavigateBookingBack();
  };

  const handleNavigateBookingBack = () => {
    navigate(`/booking`);
  };
  const handleEdit = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleNavigateBookingEdit();
  };

  const handleNavigateBookingEdit = () => {
    navigate(`/booking/edit`);
  };

  const handleDeleteBookingDetail = (bookingDetailId) => {
    setLoading(true);
    let bookingId = localStorage.getItem("bookingId");
    dispatch(updateBooking_DeleteRoomAPI({ bookingId, bookingDetailId })).then(
      () => {
        setLoading(true);
      }
    );
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChooseBookingDetail = (bookingDetailId) => {
    setBookingDetailChoosen(bookingDetailId);
  };

  const cancelForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    dispatch(getAllBookingServiceAPI());
    let bookingId = localStorage.getItem("bookingId");
    if (bookingId != null) {
      dispatch(getBookingByIdAPI(bookingId));
    }
  }, []);


  const GovernmentTaxPriceRoom = (pricePerNight) => {
    const governmentTax = 0.08;
    const vatPrice = pricePerNight * governmentTax;
    return vatPrice;
  };
  const ServiceChargePriceRoom = (pricePerNight) => {
    const serviceCharge = 0.054;
    const vatPrice = pricePerNight * serviceCharge;
    return vatPrice;
  }
  const TotalVatRoom = (pricePerNight) => {
    const governmentTax = GovernmentTaxPriceRoom(pricePerNight);
    const serviceCharge = ServiceChargePriceRoom(pricePerNight);
    const totalTax = governmentTax + serviceCharge;
    return totalTax;
  };
  return (
    <>
      <div className="app_container">
        <div className="app_row">
          <main className="app_col-sm-12 app_col-md-12 app_col-lg-8">
            <HeaderBooking steps={steps} />
            <form>
              <div>
                <section className="room-accordion_container">
                  <div className="room-accordion_body">
                    <div className="guest-info_container">
                      <div className="guest-info_contactInfo">
                        <fieldset className="fieldset">
                          <legend className="guest-info_legend">
                            <div className="guest-info_legendContent">
                              <h2 className="app_heading1">
                                <span>Contact Info</span>
                              </h2>
                              <span className="required-field-indicator-message_container">
                                <span>
                                  <span className="required-field-indicator-message_required">
                                    *
                                  </span>{" "}
                                  Required
                                </span>
                              </span>
                            </div>
                          </legend>
                          <div className="guest-info_prefixNameGroup">
                            <div className="guest-info_prefixField">
                              <div className="select_container">
                                <Box
                                  component="form"
                                  className="select_hiddenInputt"
                                  noValidate
                                  autoComplete="off"
                                >
                                  <div className="select_input">
                                    <TextField
                                      id="outlined-select-currency"
                                      select
                                      label="Prefix"
                                    >
                                      {prefixs.map((option) => (
                                        <MenuItem
                                          key={option.value}
                                          value={option.label}
                                        >
                                          {option.label}
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </div>
                                </Box>
                              </div>
                            </div>
                            <Box
                              sx={{
                                height: "56px",
                              }}
                              className="guest-info_firstNameField "
                              component="form"
                              noValidate
                              autoComplete="off"
                            >
                              <TextField
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  top: "auto",
                                  bottom: "auto",
                                  background: "#fff",
                                  border: "1px solid #000",
                                }}
                                id="standard-textarea"
                                label="First Name"
                                placeholder=""
                                multiline
                                variant="standard"
                              />
                            </Box>
                          </div>
                          <Box
                            sx={{
                              height: "56px",
                            }}
                            className="guest-info_lastNameField input-field_container "
                            component="form"
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              sx={{
                                width: "100%",
                                height: "100%",
                                top: "auto",
                                bottom: "auto",
                                background: "#fff",
                                border: "1px solid #000",
                              }}
                              id="standard-textarea"
                              label="Last Name"
                              placeholder=" "
                              multiline
                              variant="standard"
                            />
                          </Box>
                          <Box
                            sx={{
                              height: "56px",
                            }}
                            className="guest-info_phoneNumberField input-field_container "
                            component="form"
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              sx={{
                                width: "100%",
                                height: "100%",
                                top: "auto",
                                bottom: "auto",
                                background: "#fff",
                                border: "1px solid #000",
                              }}
                              id="standard-textarea"
                              label="Phone"
                              placeholder=""
                              multiline
                              variant="standard"
                            />
                          </Box>
                          <Box
                            sx={{
                              height: "56px",
                            }}
                            className="guest-info_emailAddressFieldGroup "
                            component="form"
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              sx={{
                                width: "100%",
                                height: "100%",
                                top: "auto",
                                bottom: "auto",
                                background: "#fff",
                                border: "1px solid #000",
                              }}
                              id="standard-textarea"
                              label="Email Address"
                              placeholder="alex@example.com"
                              multiline
                              variant="standard"
                            />
                          </Box>
                        </fieldset>
                      </div>
                      <div className="address-details_addressInfo">
                        <fieldset className="fieldset">
                          <legend>
                            <h3 className="app_heading1">
                              <span>Address</span>
                            </h3>
                          </legend>
                          <div className="address-details_countryField input-autocomplete_container">
                            <span className="sr-only">
                              <span>
                                Please begin typing or use the arrow keys to
                                navigate suggested options
                              </span>
                            </span>
                            <div className="input-field_container input-field_withIconRight">
                              <Box
                                className="select_country"
                                component="form"
                                noValidate
                                autoComplete="off"
                              >
                                <div className="select_input">
                                  <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Country/Region"
                                  >
                                    {countries.map((option) => (
                                      <MenuItem
                                        key={option.value}
                                        value={option.label}
                                      >
                                        {option.label}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </div>
                              </Box>
                            </div>
                          </div>
                          <div className="address-details_addressFields"></div>
                          <Box
                            sx={{
                              height: "56px",
                            }}
                            className="address-details_zipPostalCodeField input-field_container "
                            component="form"
                            noValidate
                            autoComplete="off"
                          >
                            <TextField
                              sx={{
                                width: "100%",
                                height: "100%",
                                top: "auto",
                                bottom: "auto",
                                background: "#fff",
                                border: "1px solid #000",
                              }}
                              id="standard-textarea"
                              label="Zip / Postal Code"
                              placeholder=""
                              multiline
                              variant="standard"
                            />
                          </Box>
                        </fieldset>
                      </div>
                      <div className="guest-info_additionalDetails">
                        <hr />
                        <h2 class="app_heading1">
                          <span>Special requests:</span>
                        </h2>
                        <Box
                          sx={{
                            height: "56px",
                          }}
                          className="guest-profile-preferences_container "
                          component="form"
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            sx={{
                              className:
                                "guest-profile-preferences_commentArea input-field_container",
                              width: "100%",
                              height: "100%",
                              top: "auto",
                              bottom: "auto",
                              background: "#fff",
                              border: "1px solid #000",
                            }}
                            id="standard-textarea"
                            label="Special requests/ Accor Live Limitless Card Number to be entered here"
                            placeholder=""
                            multiline
                            variant="standard"
                          />
                        </Box>
                      </div>
                      <div className="guest-payment_containers">
                        <hr />
                        <fieldset className="fieldset">
                          <legend>
                            <h2 class="app_heading1">
                              <span>Payment Information</span>
                            </h2>
                          </legend>
                          <p>
                            <span class="guest-payment_payNowAmount">
                              <span>
                                <span>
                                  <span>₫4,913,380</span>
                                </span>{" "}
                                due <span>March 21, 2024</span> (Hotel Local
                                Time).
                              </span>
                            </span>
                            <span>Please provide a valid payment method.</span>
                          </p>
                          <div className="payment-select-fop_paymentRadioButtonsWrapper">
                            <div className="payment-radio-button_container">
                              <div className="payment-radio-button_header">
                                <FormControl className="filter-bar_filterBox radio_button" >
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                  >
                                    <div className="payment-radio-button_container">
                                      <div className="payment-radio-button_header">
                                        <FormControlLabel value="Credit/Debit Card" control={<Radio />} label="Credit/Debit Card" />
                                      </div>
                                    </div>
                                    <div className="payment-radio-button_content">
                                      <div className="guest-payment-create_paymentSelection">
                                        <div className="guest-payment-create_ccimageContainer">
                                          <img
                                            src="/assets/img/Visa.png"
                                            alt="Visa"
                                            style={{ opacity: "0.5" }}
                                          />
                                          <img
                                            src="/assets/img/MasterCard.png"
                                            alt="MasterCard"
                                            style={{ opacity: "0.5" }}
                                          />
                                          <img
                                            src="/assets/img/Amex.png"
                                            alt="American Express"
                                            style={{ opacity: "0.5" }}
                                          />
                                          <img
                                            src="/assets/img/DinersClub.png"
                                            alt="Diners Club"
                                            style={{ opacity: "0.5" }}
                                          />
                                          <img
                                            src="/assets/img/JCB.png"
                                            alt="JCB"
                                            style={{ opacity: "0.5" }}
                                          />
                                        </div>
                                        <Box
                                          sx={{
                                            height: "56px",
                                          }}
                                          className="guest-info_emailAddressFieldGroup "
                                          component="form"
                                          noValidate
                                          autoComplete="off"
                                        >
                                          <Box className="input_card">
                                            <span className="guest-payment-create_ccard input-field_leftIcon "></span>
                                            <TextField
                                              sx={{
                                                width: "100%",
                                                height: "100%",
                                                top: "auto",
                                                bottom: "auto",
                                              }}
                                              id="standard-textarea"
                                              label="Card Number"
                                              placeholder=""
                                              multiline
                                              variant="standard"
                                            />
                                          </Box>
                                        </Box>
                                        <div
                                          style={{ margin: "0 1rem 1rem 0" }}
                                        ></div>
                                        <Box
                                          sx={{
                                            height: "56px",
                                          }}
                                          className="guest-payment-create_expDateField input-field_container "
                                          component="form"
                                          noValidate
                                          autoComplete="off"
                                        >
                                          <TextField
                                            sx={{
                                              width: "100%",
                                              height: "100%",
                                              top: "auto",
                                              bottom: "auto",
                                              background: "#fff",
                                              border: "1px solid #000",
                                            }}
                                            id="standard-textarea"
                                            label="Expiration Date (MM/YY)"
                                            placeholder="MM/YY"
                                            multiline
                                            variant="standard"
                                          />
                                        </Box>

                                        <Box
                                          sx={{
                                            height: "56px",
                                          }}
                                          className="payment-cvv-field_cvvField input-field_container input-field_withIconRight "
                                          component="form"
                                          noValidate
                                          autoComplete="off"
                                        >
                                          <TextField
                                            sx={{
                                              width: "157px",
                                              height: "100%",
                                              top: "auto",
                                              bottom: "auto",
                                              background: "#fff",
                                              border: "1px solid #000",
                                            }}
                                            id="standard-textarea"
                                            label="CVV"
                                            placeholder=""
                                            multiline
                                            variant="standard"
                                          />
                                        </Box>

                                        <Box
                                          sx={{
                                            height: "56px",
                                          }}
                                          className="guest-payment-create_nameField input-field_container "
                                          component="form"
                                          noValidate
                                          autoComplete="off"
                                        >
                                          <TextField
                                            sx={{
                                              width: "393px",
                                              height: "100%",
                                              top: "auto",
                                              bottom: "auto",
                                              background: "#fff",
                                              border: "1px solid #000",
                                            }}
                                            id="standard-textarea"
                                            label="Name on Card"
                                            placeholder=""
                                            multiline
                                            variant="standard"
                                          />
                                        </Box>
                                      </div>
                                    </div>
                                    <div className="payment-radio-button_container">
                                      <div className="payment-radio-button_header">
                                        <FormControlLabel value="UnionPay" control={<Radio />} label="UnionPay" />
                                      </div>
                                    </div>
                                    <div className="payment-radio-button_header">
                                      <FormControlLabel value="AliPay" control={<Radio />} label="AliPay" />
                                    </div>
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </div>

                          </div>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="add-coupon-to-reservations_container">
                {!showCouponField && (
                  <button
                    className="btn button_link"
                    datatest="button"
                    onClick={handleAddCouponClick}
                  >
                    <span>Add coupon</span>
                  </button>
                )}
                {showCouponField && (
                  <>
                    <h2 className="app_heading1">
                      <span>Add coupon</span>
                    </h2>
                    <div>
                      <div className="add-coupon-to-reservations_couponField">
                        <Box
                          sx={{
                            height: "56px",
                          }}
                          component="form"
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            sx={{
                              width: "268px",
                              height: "100%",
                              top: "auto",
                              bottom: "auto",
                              background: "#fff",
                              border: "1px solid #000",
                            }}
                            id="standard-textarea"
                            label="First Name"
                            placeholder=""
                            multiline
                            variant="standard"
                          />
                          <button
                            className="btn button_btn button_secondary button_md"
                            type="submit"
                            datatest="Button"
                            onClick={handleCancelClick}
                          >
                            <span>Cancel</span>
                          </button>
                        </Box>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <section className="guest-policies_container">
                <h2 className="app_heading1">
                  <span>Policies:</span>
                </h2>
                <div className="guest-policies_hotelDetails">
                  <div className="guest-policies_checkIn">
                    <b>
                      <span>Check-in</span>
                    </b>
                    <span>After 3:00 PM</span>
                  </div>
                  <div className="guest-policies_checkOut">
                    <b>
                      <span>Check-out</span>
                    </b>
                    <span>Before 12:00 PM</span>
                  </div>
                </div>
                <div className="guest-policies_perRoom">
                  <h3 className="app_subheading1">
                    <span>
                      Room 1 <span>GARDEN BALCONY GRAND</span>,{" "}
                      <span>Garden Balcony King Grand</span>
                    </span>
                  </h3>
                  <div className="guest-policies_guaranteePolicy">
                    <h4 className="app_subheading2">
                      <span>Guarantee Policy</span>
                    </h4>
                    <span>
                      <strong>
                        Original credit card used during booking must be
                        presented at the time of check-in. Note: All add-on
                        services selected during the booking process is not
                        included in the "Payment Details" and will be chargeable
                        upon check-in at the Resort
                      </strong>
                    </span>
                    &nbsp;
                  </div>
                  <div className="guest-policies_cancelPolicy">
                    <h4 className="app_subheading2">
                      <span>Cancel Policy</span>
                    </h4>
                    <span>
                      <strong>
                        Reservation requires full prepayment. It is
                        non-cancellable, non-refundable and no changes allowed.
                        Your credit card will be charge 100% of the total
                        reservations cost upon making reservations.{" "}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="guest-policies_fullPolicyLink">
                  <button
                    type="button"
                    className="btn button_link"
                    onClick={handleOpen}
                  >
                    <span>View Full Policy</span>
                  </button>
                </div>
              </section>


              <section className="policy-acknowledgement_container">
                <h2 className="app_heading1">
                  <span>Acknowledgement</span>
                </h2>
                <FormGroup>
                  <FormControlLabel className="Acknowledgement" control={<Checkbox defaultChecked />} label="Yes, I would like to receive newsletters and special offers by email." />
                  <FormControlLabel className="Acknowledgement" required control={<Checkbox />} label="* I have read and agree with the terms specified in the Privacy Policy.  " />
                  <FormControlLabel className="Acknowledgement" required control={<Checkbox />} label="* I have read and agree with the Terms & Conditions." />
                </FormGroup>
              </section>
            </form>
            <div className="guest-info-container_bottomContinue button_group">
              <button
                className="btn button_btn button_primary button_md"
                datatest="Button"
                onClick={() => { handleOpenModal(); }}
              >
                <span>
                  <span>Complete Booking</span>
                  <span class="fa-solid fa-lock"></span>
                </span>
              </button>
            </div>
          </main>
          <aside className="app_col-sm-12 app_col-md-12 app_col-lg-4">
            <BookingDetail
              showDetailsBillRoom={showDetailsBillRoom}
              setShowDetailsBillRoom={setShowDetailsBillRoom}
              showDetailsBillService={showDetailsBillService}
              setShowDetailsBillService={setShowDetailsBillService}
              toggleForm={toggleForm}
              showForm={showForm}
              cancelForm={cancelForm}
              adultQuantity={adultQuantity}
              childQuantity={childQuantity}
              handleBack={handleBack}
              // handleNext={handleNext}
              handleChooseBookingDetail={handleChooseBookingDetail}
              showAddon={showAddon}
              handleEdit={handleEdit}
              handleDeleteBookingDetail={handleDeleteBookingDetail}
              loading={loading}
            // perCarQuantity={perCarQuantity}
            />
          </aside>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="modal-message_modalMessage ">
              <div className="modal-message_closeButtonWrapper">
                <div
                  className="fa-solid fa-xmark modal-message_closeButton "
                  onClick={handleClose}
                ></div>
              </div>
              <div className="modal-message_contentWrapper">
                <h2 className="app_modalTitle guest-policies_policiesModalHeading">
                  <span>Policies</span>
                </h2>
                <div className="guest-policies_hotelDetails">
                  <div className="guest-policies_checkIn">
                    <b>
                      <span>Check-in</span>
                    </b>
                    <span>After 3:00 PM</span>
                  </div>
                  <div className="guest-policies_checkOut">
                    <b>
                      <span>Check-out</span>
                    </b>
                    <span>Before 12:00 PM</span>
                  </div>
                </div>
                <div className="guest-policies_perRoom">
                  <h3 className="app_subheading1">
                    <span>Room 1: <span>GARDEN BALCONY GRAND</span>{" "} </span>
                  </h3>
                  <div className="guest-policies_guaranteePolicy">
                    <h4 className="app_subheading2">
                      <span>Guarantee Policy</span>
                    </h4>
                    <span>
                      <strong>
                        Original credit card used during booking must be
                        presented at the time of check-in. Note: All add-on
                        services selected during the booking process is not
                        included in the "Payment Details" and will be chargeable
                        upon check-in at the Resort
                      </strong>
                    </span>
                    &nbsp;
                  </div>
                  <div className="guest-policies_cancelPolicy">
                    <h4 className="app_subheading2">
                      <span>Cancel Policy</span>
                    </h4>
                    <span>
                      <strong>
                        Reservation requires full prepayment. It is
                        non-cancellable, non-refundable and no changes allowed.
                        Your credit card will be charge 100% of the total
                        reservations cost upon making reservations.{" "}
                      </strong>
                    </span>
                  </div>
                </div>
                <div className="guest-policies_childrenPolicy">
                  <h4 class="app_subheading2">
                    <span>Children Policy</span>
                  </h4>
                  <span>
                    <strong>
                      * Infants and toddlers, who are below 6 years,
                      accompanying adults, dine and stay in existing bedding. A
                      baby cot with our compliments (applicable to infant below
                      4 years old). Baby cot is subject to availability
                    </strong>
                    <br />
                    <strong>
                      * Children 6 to 11 years, can share the existing bedding
                      with their parents, Maximum 1 child per room, with an
                      additional charge of US$ 15++ per night including
                      breakfast
                    </strong>
                  </span>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="modal-message_modalMessage ">
              <div className="modal-message_closeButtonWrapper">
                <div className="fa-solid fa-xmark modal-message_closeButton " onClick={handleCloseModal}></div>
              </div>
              <div className="modal-message_contentWrapper">
                <h2 className="app_modalTitle guest-policies_policiesModalHeading">
                  <span>Booking Detail</span>
                </h2>
                <div className="guest-policies_hotelDetails" style={{ display: "flex", justifyContent: "space-between" }} >
                  <div className="guest-policies_checkIn">
                    <b>
                      <span>Check-in</span>
                    </b>
                    <span>After 3:00 PM</span>
                  </div>
                  <div className="guest-policies_checkOut">
                    <b>
                      <span>Check-out</span>
                    </b>
                    <span>Before 12:00 PM</span>
                  </div>
                  {bookingDetails.map((item, key) => (
                    <>
                      <div className="guest-policies_Adult">
                        <b>
                          <span>Number Adult</span>
                        </b>
                        <span>{item.numberAdult}</span>
                      </div>
                      <div className="guest-policies_Children">
                        <b>
                          <span>Number Children</span>
                        </b>
                        <span>{JSON.parse(item.childrenAges).length}</span>
                      </div>
                    </>
                  ))}
                </div>
                {bookingDetails.map((item, key) => (
                  <div>
                    <h2 className="app_modalTitle guest-policies_policiesModalHeading">
                      <span>Room 1:</span>
                    </h2>
                    <div className="app_roww">
                      <h2 className="detail-view-room_roomName app_modalTitle" style={{ paddingLeft: "8px", fontSize: "20px" }}>{item.room.name}</h2>
                      <div style={{ display: 'flex' }}>
                        <div className="app_col-sm-12 app_col-md-6 app_col-lg-6 app_pull-md-6 app_pull-6" style={{ height: "150px" }}>
                          <div style={{ display: "flex" }}>
                            <div className="guests-and-roomsize_roomProperties app_pull_room-6">
                              <div className="guest-policies_hotelDetails" style={{ paddingLeft: "25px" }}>
                                <div className="guest-policies_View">
                                  <b>
                                    <span>View </span>
                                  </b>
                                  <span>GARDEN_VIEW</span>
                                </div>
                                <div className="guest-policies_Type">
                                  <b>
                                    <span>Type </span>
                                  </b>
                                  <span>SUPERIOR</span>
                                </div>
                                <div className="guest-policies_Guests">
                                  <b>
                                    <span>Guests</span>
                                  </b>
                                  <span>{(item.numberAdult) + (JSON.parse(item.childrenAges).length)}</span>
                                </div>
                                <div className="guest-policies_King">
                                  <b>
                                    <span>King</span>
                                  </b>
                                  <span>1</span>
                                </div>
                                <div className="guest-policies_Size">
                                  <b>
                                    <span>Size</span>
                                  </b>
                                  <span>53 m²</span>
                                </div>
                              </div>
                            </div>
                            <div className="thumb-cards_imgWrapper thumb-cards_hasMultipleImages app_push_room-6">
                              <img style={{ height: "104px" }} className="thumb-cards_image" src={item.room.imageResDTOS.length == 0 ? "" : item.room.imageResDTOS[0].fileUrl} />
                            </div>
                          </div>
                          <div className="guest-policies_hotelDetails">
                            <div className="guest-policies_View" style={{ paddingLeft: "0", marginRight: "0" }}>
                              <span style={{ fontSize: "1rem" }}>Its area is 53sqm. Every room in this category has a private balcony</span>
                            </div>
                          </div>
                        </div>
                        <div className="app_col-sm-12 app_col-md-6 app_col-lg-6 app_push-md-6 app_push-6">
                          <div className="cart-container_room" style={{ paddingBottom: "5px" }}>
                            <div className="cart-container_roomRate">
                              <a className="cart_name" >Price:</a>
                            </div>
                            <div className="cart-container_price">
                              <span>{AppUtil.formatCurrency(item.room.pricePerNight)}</span>
                            </div>
                          </div>
                          <div className="cart-container_taxesAndFees" style={{ marginBottom: "0" }}>
                            <div className="cart-container_headerWithPrice">
                              <div className="cart-container_taxesAndFeesHeader">
                                <span>Taxes and Fees:</span>
                              </div>
                              <span className="cart-container_price">
                                <span>{AppUtil.formatCurrency(TotalVatRoom(item.room.pricePerNight))}</span>
                              </span>
                            </div>
                            <div className="display-prices_wrapper">
                              <button className="btn button_link" onClick={() => setShowDetailsBillRoom(!showDetailsBillRoom)}>
                                <span>{showDetailsBillRoom ? "Details" : "Details"}</span>
                              </button>
                              {showDetailsBillRoom && (
                                <div className="display-prices_breakdown" style={{ paddingLeft: "0" }}>
                                  <div className="display-prices_row">
                                    <div className="display-prices_label">8% Government Tax</div>
                                    <div className="display-prices_price">
                                      <span>{AppUtil.formatCurrency(GovernmentTaxPriceRoom(item.room.pricePerNight))}</span>
                                    </div>
                                  </div>
                                  <div className="display-prices_row">
                                    <div className="display-prices_label">5% Service Charge</div>
                                    <div className="display-prices_price">
                                      <span>{AppUtil.formatCurrency(ServiceChargePriceRoom(item.room.pricePerNight))}</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div style={{ paddingLeft: "519px", marginBottom: "-12px" }}>
                        <hr className="detail-view-room_line" />
                        <div className="cart-container_addon" style={{ paddingBottom: "0", alignItems: "center" }}>
                          <div className="cart-container_addonNameInfo" style={{ paddingRight: "81px" }}>
                            <h2 className="app_modalTitle guest-policies_policiesModalHeading" style={{ fontSize: "20px" }}>
                              <span>Total:</span>
                            </h2>
                          </div>
                          <div className="cart-container_price" style={{ fontSize: "15px" }}>
                            <span>{AppUtil.formatCurrency(TotalVatRoom(item.room.pricePerNight) + (item.room.pricePerNight))}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {item.bookingDetailServiceResDTOS.map((bsItem, key) => (
                      <div>
                        <div className="app_roww">
                          <h2 className="detail-view-room_roomName app_modalTitle" style={{ paddingLeft: "8px", fontSize: "22px" }}>{bsItem.bookingService.name}</h2>
                          <div style={{ display: 'flex' }}>
                            <div className="app_col-sm-12 app_col-md-6 app_col-lg-6 app_pull-md-6 app_pull-6" style={{ height: "150px" }}>
                              <div style={{ display: "flex" }}>
                                <div className="guests-and-roomsize_roomProperties app_pull_room-6">
                                  <div className="guest-policies_hotelDetails">
                                    <div className="guest-policies_View">
                                      <b>
                                        <span> <span>{moment(item.checkIn).format('DD-MM-YYYY')} </span>/ Per Car: {bsItem.numberCar}</span>
                                      </b>
                                    </div>
                                  </div>
                                </div>
                                <div className="thumb-cards_imgWrapper thumb-cards_hasMultipleImages app_push_room-6">
                                  <img style={{ height: "104px" }} className="thumb-cards_image" src={bsItem.bookingService.fileUrl} />
                                </div>
                              </div>
                              <div className="guest-policies_hotelDetails" style={{ paddingTop: "15px" }}>
                                <div className="guest-policies_View" style={{ paddingLeft: "0", marginRight: "0" }}>
                                  <span style={{ fontSize: "1rem" }}>Arrive in style via one-way car transfer (SUV max 3 persons)</span>
                                </div>
                              </div>
                            </div>
                            <div className="app_col-sm-12 app_col-md-6 app_col-lg-6 app_push-md-6 app_push-6">
                              <div className="cart-container_room" style={{ paddingBottom: "5px" }}>
                                <div className="cart-container_roomRate">
                                  <a className="cart_name" >Price:</a>
                                </div>
                                <div className="cart-container_price">
                                  <span>{AppUtil.formatCurrency(bsItem.price)}</span>
                                </div>
                              </div>
                              <div className="cart-container_taxesAndFees" style={{ marginBottom: "0" }}>
                                <div className="cart-container_headerWithPrice">
                                  <div className="cart-container_taxesAndFeesHeader">
                                    <span>Taxes and Fees:</span>
                                  </div>
                                  <span className="cart-container_price">
                                    <span>{AppUtil.formatCurrency((bsItem.price) * (bsItem.numberCar) * 0.134)}</span>
                                  </span>
                                </div>
                                <div className="display-prices_wrapper">
                                  <button className="btn button_link" onClick={() => setShowDetailsBillService(!showDetailsBillService)}>
                                    <span>{showDetailsBillService ? "Details" : "Details"}</span>
                                  </button>
                                  {showDetailsBillService && (
                                    <div className="display-prices_breakdown" style={{ paddingLeft: "0" }}>
                                      <div className="display-prices_row">
                                        <div className="display-prices_label">8% Government Tax</div>
                                        <div className="display-prices_price">
                                          <span>{AppUtil.formatCurrency(+(bsItem.price) * (bsItem.numberCar) * 0.08)}</span>
                                        </div>
                                      </div>
                                      <div className="display-prices_row">
                                        <div className="display-prices_label">5% Service Charge</div>
                                        <div className="display-prices_price">
                                          <span>{AppUtil.formatCurrency((bsItem.price) * (bsItem.numberCar) * 0.05)}</span>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div style={{ paddingLeft: "519px", marginBottom: "-12px" }}>
                            <hr className="detail-view-room_line" />
                            <div className="cart-container_addon" style={{ paddingBottom: "0", alignItems: "center" }}>
                              <div className="cart-container_addonNameInfo" style={{ paddingRight: "81px" }}>
                                <h2 className="app_modalTitle guest-policies_policiesModalHeading" style={{ fontSize: "20px" }}>
                                  <span>Total:</span>
                                </h2>
                              </div>
                              <div className="cart-container_price" style={{ fontSize: "15px" }}>
                                <span>{AppUtil.formatCurrency((bsItem.price) + (bsItem.price) * (bsItem.numberCar) * 0.134)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div>
                      <hr className="detail-view-room_line" />
                      <div className="cart-container_addon">
                        <div className="cart-container_addonNameInfo">
                          <h2 className="app_modalTitle guest-policies_policiesModalHeading" style={{ fontSize: "2rem" }}>
                            <span>Total:</span>
                          </h2>
                        </div>
                        <div className="cart-container_price" style={{ fontSize: "1.5rem" }}>
                          <span>{AppUtil.formatCurrency(booking.total)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="guest-info-container_bottomContinue button_group">
                  <button
                    className="btn button_btn button_primary button_md"
                    datatest="Button"
                    onClick={handleNext}
                  >
                    <span>
                      <span>Complete</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div >
      </div >
    </>
  );
}