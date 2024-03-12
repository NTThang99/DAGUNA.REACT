import React, { useState } from "react";
import "../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { roomItems } from "../data/Data";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from "react-router-dom";

const steps = ['Rooms', 'Add-Ons', 'Guest Details', 'Confirmation'];


export default function BookingService() {
  const navigate = useNavigate();
  const [adultQuantity, setAdultQuantity] = useState(2);
  const [activeStep, setActiveStep] = React.useState(0);

  const isStepOptional = (step) => {
    return step === 1;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleNavigateBooking();
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
                {/* <Box className="breadcrumbs_list">
                  <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                       
                      </Button>

                    </Box>
                  </React.Fragment>

                </Box> */}


              </div>
            </header>
            <div>
              <div className="thumb-cards_products">
                <div className="app_row">
                  {roomItems.map((item, key) => (
                    <div className="thumb-cards_condensedCategory app_col-sm-12 app_col-md-12 app_col-lg-12">
                      <div className="thumb-cards_groupedCards">
                        <div className="thumb-cards_cardSplit thumb-cards_byRoom">
                          <div className="thumb-cards_container">
                            <div className="thumb-cards_extraDetails app_col-sm-12 app_col-md-4 app_col-lg-4">
                              <div className="thumb-cards_imgWrapper thumb-cards_hasMultipleImages">
                                <button className="thumb-cards_openImage" />
                                <img className="thumb-cards_image" src={item.img} />
                              </div>
                            </div>
                            <div className="app_col-sm-12 app_col-md-8 app_col-lg-8">
                              <div className="thumb-cards_cardHeader">
                                <h2 class="app_heading1">{item.name}</h2>
                                <div className="thumb-cards_urgencyTriggerAndRoomInfo">
                                  <div className="thumb-cards_urgencyTrigger">
                                    <span>9 people booked in last 24 hours</span>
                                  </div>
                                  <div className="guests-and-roomsize_roomProperties">
                                    <div className="guests-and-roomsize_item guests-and-roomsize_guests">
                                      <span>Guests 2</span>
                                    </div>
                                    <div className="guests-and-roomsize_item guests-and-roomsize_bed">
                                      <span>1 King</span>
                                    </div>
                                    <div class="guests-and-roomsize_item guests-and-roomsize_size">53
                                      <span aria-hidden="true" >
                                        <span>m²</span>
                                      </span>
                                    </div>
                                  </div>

                                </div>
                                <div className="thumb-cards_roomShortDesc">{item.description}</div>
                              </div>
                              <div className="thumb-cards_rate thumb-cards_show">
                                <div className="thumb-cards_cardItem">
                                  <div className="thumb-cards_details">
                                    <div className="thumb-cards_left">
                                      <ul className="product-icons_iconList">
                                        <li className="product-icons_creditCard product-icons_bold">
                                          <span aria-hidden="true"></span>
                                          <span>Deposit Required</span>
                                        </li>
                                      </ul>
                                      <div class="thumb-cards_rateShortDesc">Enjoy up to 30% savings on your beach family vacation!</div>
                                    </div>
                                    <div className="thumb-cards_right">
                                      <div className="thumb-cards_priceMessages">
                                        <div className="thumb-cards_priceContainer">
                                          <div class="thumb-cards_price">
                                            <span>₫2,975,168</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="thumb-cards_button">
                                        <button class="btn button_btn button_primary button_sm" style={{ height: '35px' }} datatest="Button">
                                          <span onClick={handleNext}>Booking</span>
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
          <aside className="app_col-sm-12 app_col-md-12 app_col-lg-4">
            <div className="container-inner">
              <div className="container_body">
                <div className="container_header">
                  <h2 class="app_heading1">
                    <span>Your Stay</span>
                  </h2>
                </div>
                <div className="container_hotelDetails">
                  <div className="cart-container_checkIn">
                    <b>
                      <span>Check-in</span>
                    </b>
                    <span>After 3:00 PM</span>
                  </div>
                  <div class="cart-container_checkOut">
                    <b>
                      <span>Check-out</span>
                    </b>
                    <span>Before 12:00 PM</span>
                  </div>
                </div>
                <div className="cart-container_summary">
                  <div className="cart-container_dates">
                    <span>Mon, Mar 4, 2024</span> -{" "}
                    <span>Tue, Mar 5, 2024</span>
                  </div>
                  <div className="cart-container_guests">
                    <span>{adultQuantity} Adults</span>
                  </div>
                </div>
                <div class="reservation-cart-container_addAnotherRoom">
                  <button class="btn button_circle" datatest="Button">
                    <span class="button_add" aria-hidden="true"></span>
                    <span onClick={handleBack}>Add a Room</span>
                  </button>
                </div>
              </div>
              <div class="price-summary_container">
                <hr class="desktopOnly" />
                <div class="price-summary_totalPrice">
                  <div class="price-summary_total">
                    <span>Total:</span>
                  </div>
                  <div class="price-summary_price">
                    <span>₫0</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
