import React, { useEffect, useState } from "react";
import "../../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { roomItems } from "../../data/Data";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from "react-router-dom";
import { getBookingByIdAPI, getAllBookingServiceAPI, updateBooking_AddBookingService } from "../BookingSlide";
import { useDispatch, useSelector } from "react-redux";
import BookingDetail from "./BookingDetail";

const steps = ['Rooms', 'Add-Ons', 'Guest Details', 'Confirmation'];


export default function BookingService() {
  const navigate = useNavigate();
  const [adultQuantity, setAdultQuantity] = useState(2);
  const [childQuantity, setChildQuantity] = useState(2);
  const [perCarQuantity, setPerCarQuantity] = useState(1);
  const [activeStep, setActiveStep] = React.useState(0);

  const [showDetails, setShowDetails] = useState(-1);
  const [showAddon, setShowAddon] = useState(-1);
  const [showDetailsBill, setShowDetailsBill] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [bookingDetailChoosen, setBookingDetailChoosen] = useState(null);
  const dispatch = useDispatch();
  const bookingServices = useSelector((state) => state.booking.addOns.data);
  const booking = useSelector((state) => state.booking.booking);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = (id, bookingServiceType, bookindDetailId) => {
    setShowAddon(bookindDetailId);
    dispatch(updateBooking_AddBookingService({
      bookingDetailId: booking.bookingDetailChoosen,
      bookingServiceId: id,
      bookingServiceType: bookingServiceType,

    }))
  };

  const decreasePerCardQuantity = () => {
    if (perCarQuantity > 1) {
      setPerCarQuantity(perCarQuantity - 1);
    }
  };

  const increasePerCardQuantity = () => {
    setPerCarQuantity(perCarQuantity + 1);
  };

  const handleNavigateBooking = () => {
    navigate(`/booking/checkout`);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleNavigateBookingBack();
  };

  const handleNavigateBookingBack = () => {
    navigate(`/booking`);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const toggleDetails = () => {
    setExpanded(!expanded);
  };


  const toggleDetailAdd = (bookindDetailId) => {
    setShowDetails(bookindDetailId);
  }
  const handleCloseDetails = () => {
    setShowDetails(-1);
  };

  const handleChooseBookingDetail = (bookingDetailId) => {
    setBookingDetailChoosen(bookingDetailId);
  };

  const cancelForm = () => {
    setShowForm(false);
  };

  useEffect(() => {
    dispatch(getAllBookingServiceAPI())
    let bookingId = localStorage.getItem("bookingId");
    if (bookingId != null) {
      dispatch(getBookingByIdAPI(bookingId))
    }
  }, [])

  return (
    <>
      <div className="app_container">
        <div className="app_row">
          <main className="app_col-sm-12 app_col-md-12 app_col-lg-8">
            <header>
              <div className="breadcrumbs_wrapper">
                <div
                  className="breadcrumbs_header "
                  data-testid="breadcrumbs-header"
                >
                  <div className="breadcrumbs_headerWithArrow">
                    <h1 className="app_pageTitle">Enhance Your Stay</h1>
                  </div>
                </div>
                <Box sx={{ width: '100%' }}>
                  <Stepper alternativeLabel activeStep={1}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
            </header>
            <div>
              <div>
                <div>

                  <div className="add-ons-container_group">
                    <div className="add-ons-container_categoryGroup">
                      <h2 className="app_heading1">Airport Transfer</h2>
                      {bookingServices.map((item, key) => (
                        <div className="add-ons-container_addOn">
                          <div className="add-ons-container_addOnheader">
                            <div className="add-ons-container_addOnImgWrapper">
                              <img className="add-ons-container_addOnImage" src={item.img} />
                            </div>
                            <div className="add-ons-container_addOnInfo">
                              <div className="add-ons-container_addOnInfoTop">
                                <div className="add-ons-container_addOnDetails">
                                  <h3 className="app_heading1">{item.name}</h3>
                                  <div>
                                    <div className="add-ons-container_addOnDescription">
                                      {item.description}
                                      {expanded ? (
                                        <>
                                          <ul className="add-ons-ul">
                                            <li className="add-ons-li">
                                              Please advise your flight number and arrival time in the 'Transportation' section of the booking page which you will be directed to next
                                            </li>
                                          </ul>
                                        </>
                                      ) : (
                                        <>
                                          <ul className="add-ons-ul">
                                            <li className="add-ons-li">
                                              Please advise your flight number and arrival time in the...
                                            </li>
                                          </ul>
                                        </>
                                      )}
                                    </div>
                                    <div className="add-ons-container_viewMoreButton">
                                      <button className="btn button_link" datatest="Button" onClick={toggleDescription}>
                                        <span>{expanded ? 'View Less' : 'View More'}</span>
                                        <span className="fa-solid fa-chevron-down"></span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div className="add-ons-thumb-card-price_container">
                                  <div className="add-ons-thumb-card-price_priceWrapper">
                                    <div className="add-ons-thumb-card-price_price">
                                      <span>₫{item.price}</span>
                                    </div>
                                  </div>
                                  <div className="add-ons-thumb-card-price_priceType">
                                    <span>Each</span> / <span> </span>
                                  </div>
                                  <div className="add-ons-thumb-card-price_taxesFees">
                                    <span>Excluding Taxes and Fees</span>v
                                  </div>
                                </div>
                              </div>
                              {!(showDetails == item.id) && (
                                <div className="add-ons-container_addOnInfoBottom">
                                  <button className="btn button_btn button_primary button_sm" style={{ height: '35px' }} datatest="Button" onClick={() => toggleDetailAdd(item.id)}>
                                    <span >ADD Details</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          {(showDetails == item.id) && (
                            <div className="add-ons-details_container">
                              <div className="add-ons-details_left">
                                <div className="add-ons-quantity-selection_wrapper  ">
                                  <div className="quantity-selection_container">
                                    <span>Per Car:</span>
                                    <div className="quantity-selection_wrapper">
                                      <button className="button_btn button_primary button_md" aria-label="Decrease Per Car:" onClick={decreasePerCardQuantity}>
                                        <span className="fa-solid fa-minus button_subtract"></span>
                                      </button>
                                      <div className="input-field_container input-field_active" >
                                        <label for="rjLsp9arnp5AL353I-_K1BRw">
                                          <span className="input-field_label">Per Car:</span>
                                          <input id="rjLsp9arnp5AL353I-_K1BRw" type="text" placeholder="" aria-label="Per Car:" value={perCarQuantity} />
                                        </label>
                                        <div aria-live="assertive">
                                        </div>
                                      </div>
                                      <button className="button_btn button_primary button_md" aria-label="Increase Per Car:" onClick={increasePerCardQuantity}>
                                        <span className="fa-solid fa-plus"></span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="add-ons-details_right"></div>
                              <div className="add-on-price-breakdown_wrapper">
                                <span className="add-on-price-breakdown_total">
                                  <span>Total:</span>
                                </span>
                                <span className="add-on-price-breakdown_price">
                                  <span>₫1,253,408</span>
                                </span>
                                <div className="add-on-price-breakdown_taxIncluded">
                                  <span>Including Taxes and Fees</span>
                                </div>
                                <div>
                                  <div className="add-on-price-breakdown_detailsLink">
                                    <button className="btn button_link" datatest="Button" onClick={toggleDetails}>
                                      <span>Details</span>
                                      <span className={expanded ? "fa-solid fa-chevron-up" : "fa-solid fa-chevron-down"}></span>
                                    </button>
                                  </div>
                                  {expanded && (
                                    <div className="add-on-price-breakdown_breakdown add-on-price-breakdown_expanded">
                                      <div className="add-on-price-breakdown_detailedPrice">
                                        <div>
                                          <span>₫1,105,298</span>
                                          <span> X </span>1<span> Per Car</span>
                                        </div>
                                        <div className="add-on-price-breakdown_value">
                                          <span>₫1,105,298</span>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="add-on-price-breakdown_taxesAndFees">
                                          <div>8% Government Tax</div>
                                          <div className="add-on-price-breakdown_value">
                                            <span>₫88,424</span>
                                          </div>
                                        </div>
                                        <div className="add-on-price-breakdown_taxesAndFees">
                                          <div>5% Service Charge</div>
                                          <div className="add-on-price-breakdown_value">
                                            <span>₫59,686</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="add-ons-details_messages"></div>
                              <div className="button_group">
                                <button className="btn button_link" datatest="Button" onClick={handleCloseDetails}>
                                  <span>Cancel</span>
                                </button>
                                <button className="btn button_btn button_primary button_sm" datatest="Button" onClick={() => handleNext(item.id, item.bookingServiceType)}>
                                  <span>Add to my stay</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </main>
          <aside className="app_col-sm-12 app_col-md-12 app_col-lg-4">
            <BookingDetail
              showDetailsBill={showDetailsBill}
              setShowDetailsBill={setShowDetailsBill}
              toggleForm={toggleForm}
              showForm={showForm}
              cancelForm={cancelForm}
              adultQuantity={adultQuantity}
              childQuantity={childQuantity}
              handleBack={handleBack}
              handleNext={handleNext}
              handleChooseBookingDetail={handleChooseBookingDetail}
              showAddon={showAddon}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
