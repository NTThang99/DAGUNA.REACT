import React, { useEffect, useState } from "react";
import "../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { roomItems } from "../data/Data";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchRoomsAPI } from "./BookingSlide";

const steps = ['Rooms', 'Add-Ons', 'Guest Details', 'Confirmation'];


export default function Booking() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [adultQuantity, setAdultQuantity] = useState(2);
  const [childQuantity, setChildQuantity] = useState(2);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const room = useSelector((state) => state.booking.room);



  const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));

  const toggleFlyout = () => {
    setIsExpanded(!isExpanded);
  };
  const decreaseAdultQuantity = () => {
    if (adultQuantity > 0) {
      setAdultQuantity(adultQuantity - 1);
    }
  };

  const increaseAdultQuantity = () => {
    setAdultQuantity(adultQuantity + 1);
  };

  const decreaseChildQuantity = () => {
    if (childQuantity > 0) {
      setChildQuantity(childQuantity - 1);
    }
  };

  const increaseChildQuantity = () => {
    setChildQuantity(childQuantity + 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleNavigateBooking();
  };
  const handleNavigateBooking = () => {
    navigate(`/booking/addons`);
  };

  
  useEffect(()=>{
    dispatch(searchRoomsAPI(room));
  }, [])
  return (
    <>
      <div className="app_container">
        <div className="app_row">
          <main className="app_col-sm-12 app_col-md-12 app_col-lg-8">
            <header>
              <div className="container_wrapper">
                <div className="container_inner">
                  <div className="container_top">
                    <div className="container_guestsWrapper">
                      <button
                        className="container_guests"
                        aria-expanded={isExpanded}
                        aria-controls="guests-selection-flyout"
                        onClick={toggleFlyout}
                      >
                        <i className="containerIcon fa-regular fa-user"></i>
                        <span className="container_label">
                          <span>Guests</span>
                        </span>
                        <span>{adultQuantity} Adult</span>,{" "}
                        <span>{childQuantity} Children</span>
                      </button>
                      {isExpanded && (
                        <div className="container_form_guests">
                          <fieldset>
                            <legend>
                              <div className="guestHeading">
                                <h2 className="app_subheading2">
                                  <span>Select Guests</span>
                                </h2>
                              </div>
                            </legend>
                            <button
                              className="closeButton"
                              aria-label="Close"
                              onClick={toggleFlyout}
                            >
                              <i className="fa-solid fa-xmark"></i>
                            </button>
                            <div
                              className="selection_container"
                              role="presentation"
                            >
                              <div>
                                <div className="quantity_container">
                                  <span>Adults</span>
                                  <div
                                    className="quantity_wrapper"
                                    style={{ left: "14px" }}
                                  >
                                    <button
                                      className="button_btn button_primary button_md"
                                      aria-label="Remove one Adult"
                                      onClick={decreaseAdultQuantity}
                                    >
                                      <span>
                                        <i className="button_subtract fa-solid fa-minus" />
                                      </span>
                                    </button>
                                    <div
                                      className="field_container"
                                      data-error="false"
                                      data-warning="false"
                                    >
                                      <label>
                                        <span className="input-field_label">
                                          Adults
                                        </span>
                                        <input
                                          type="text"
                                          placeholder=""
                                          aria-label="Adults"
                                          data-error="false"
                                          value={adultQuantity}
                                          readOnly
                                        />
                                      </label>
                                    </div>
                                    <button
                                      className="button_btn button_primary button_md"
                                      aria-label="Add one Adult"
                                      onClick={increaseAdultQuantity}
                                    >
                                      <span>
                                        <i className="fa-solid fa-plus"></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="quantity_container">
                                  <span>Children</span>
                                  <div className="quantity_wrapper">
                                    <button
                                      className="button_btn button_primary button_md"
                                      aria-label="Remove one Adult"
                                      onClick={decreaseChildQuantity}
                                    >
                                      <span>
                                        <i className="button_subtract fa-solid fa-minus" />
                                      </span>
                                    </button>
                                    <div
                                      className="field_container"
                                      data-error="false"
                                      data-warning="false"
                                    >
                                      <label>
                                        <span className="input-field_label">
                                          Children
                                        </span>
                                        <input
                                          type="text"
                                          placeholder=""
                                          aria-label="Children"
                                          data-error="false"
                                          value={childQuantity}
                                          readOnly
                                        />
                                      </label>
                                    </div>
                                    <button
                                      className="button_btn button_primary button_md"
                                      aria-label="Add one Adult"
                                      onClick={increaseChildQuantity}
                                    >
                                      <span>
                                        <i className="fa-solid fa-plus"></i>
                                      </span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="button_group">
                              <button
                                className="btn button_link"
                                datatest="Button"
                              >
                                <span>Cancel</span>
                              </button>
                              <button
                                className="btn button_btn button_primary button_sm"
                                datatest="Button"
                              >
                                <span>Apply</span>
                              </button>
                            </div>
                          </fieldset>
                        </div>
                      )}
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div className="container_guestsWrapper">
                        <button
                          className="container_guests"
                          aria-expanded={isExpanded}
                          aria-controls="guests-selection-flyout"
                        >
                          <span className="container_label">
                            <span>Check in</span>
                          </span>
                          <DatePicker
                            className="container_checkIn"
                            defaultValue={selectedDate}
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                          />
                        </button>
                      </div>
                      <div className="container_guestsWrapper">
                        <button
                          className="container_guests"
                          aria-expanded={isExpanded}
                          aria-controls="guests-selection-flyout"
                        >
                          <span className="container_label">
                            <span>Check out</span>
                          </span>
                          <DatePicker
                            className="container_checkOut"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                          />
                        </button>
                      </div>
                    </LocalizationProvider>

                    <div
                      className="date"
                      id="date2"
                      data-target-input="nearest"
                    ></div>
                  </div>
                  <div className="container_advancedSearch"></div>
                  <div className="container_mobileSearch"></div>
                </div>
              </div>
              <div className="breadcrumbs_wrapper">
                <div
                  className="breadcrumbs_header "
                  data-testid="breadcrumbs-header"
                >
                  <div className="breadcrumbs_headerWithArrow">
                    <h1 className="app_pageTitle">Select a Room</h1>
                  </div>
                </div>
                <Box sx={{ width: '100%' }}>
                  <Stepper  alternativeLabel activeStep={0}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
            </header>
            <div class="filter-bar_container">
              <div class="filter-bar_box">
                <div class="filter-bar_options">
                  <div class="filter-bar_left"></div>
                  <div class="filter-bar_right">
                    <div
                      class="filter-bar_layout filter-bar-select_container"
                      datatest="room_layout"
                    >
                      <div
                        class="select_container select_hasValue"
                        data-error="false"
                      >
                        <button
                          aria-expanded="false"
                          aria-controls="select-dropdown-wrapper-view-results-by-room-rate"
                          class="select_hiddenInput"
                          aria-labelledby="view-results-by-room-rate"
                          value="room"
                          data-error="false"
                          tabindex="0"
                        ></button>
                        <div class="select_input" data-selector="true">
                          <label
                            class="select_label"
                            id="view-results-by-room-rate"
                          >
                            View Results By{" "}
                          </label>
                          <span class="select_value">Rooms</span>
                          <span class="select_caret" aria-hidden="true">
                            <i class="select_caret_icon fa-solid fa-caret-down"></i>
                          </span>
                        </div>
                        <div role="alert"></div>
                      </div>
                    </div>
                    <div
                      class="filter-bar_sortBy filter-bar-select_container"
                      datatest="sort-by-select"
                    >
                      <div
                        class="select_container select_hasValue"
                        data-error="false"
                      >
                        <button
                          aria-expanded="false"
                          aria-controls="select-dropdown-wrapper-filter-bar-sort-by"
                          class="select_hiddenInput"
                          aria-labelledby="filter-bar-sort-by"
                          value="priceLowestToHighest"
                          data-error="false"
                          tabindex="0"
                        ></button>
                        <div class="select_input" data-selector="true">
                          <label class="select_label" id="filter-bar-sort-by">
                            Sort By{" "}
                          </label>
                          <span class="select_value">Lowest Price</span>
                          <span class="select_caret" aria-hidden="true">
                            <i class="select_caret_icon fa-solid fa-caret-down "></i>
                          </span>
                        </div>
                        <div role="alert"></div>
                      </div>
                    </div>
                    <div class="filter-bar_filterLink">
                      <a
                        href="#"
                        aria-expanded="false"
                        aria-controls="filter-bar-filters-wrapper"
                      >
                        <span>Show Filters</span>
                        <i class="fa-solid fa-caret-down"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div class="filter-bar_tagsWrapper"></div>
              </div>
            </div>
            <div>
              <div className="thumb-cards_products">
                <div className="app_row">
                  {room.data.map((item, key) => (
                    <div className="thumb-cards_condensedCategory app_col-sm-12 app_col-md-12 app_col-lg-12">
                      <div className="thumb-cards_groupedCards">
                        <div className="thumb-cards_cardSplit thumb-cards_byRoom">
                          <div className="thumb-cards_container">
                            <div className="thumb-cards_extraDetails app_col-sm-12 app_col-md-4 app_col-lg-4">
                              <div className="thumb-cards_imgWrapper thumb-cards_hasMultipleImages">
                                <button className="thumb-cards_openImage" />
                                <img className="thumb-cards_image" src={item.imageResDTOS.length == 0 ? "" : item.imageResDTOS[0].fileUrl} />
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
                                          <span onClick={handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Book Now'}
                                          </span>
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
