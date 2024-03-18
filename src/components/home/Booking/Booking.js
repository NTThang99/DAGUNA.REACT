import React, { useEffect, useState } from "react";
import "../../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchRoomsAPI } from "../BookingSlide";
import { updateSearchBar, createBookingAPI, getBookingByIdAPI, updateBooking_AddRoomAPI } from "../BookingSlide";
import BookingDetail from "./BookingDetail";

const steps = ['Rooms', 'Add-Ons', 'Guest Details', 'Confirmation'];


export default function Booking() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [bookingDetailChoosen, setBookingDetailChoosen] = useState(null);
  const [adultQuantity, setAdultQuantity] = useState(2);
  const [childQuantity, setChildQuantity] = useState(2);
  
  // const [selectedDate, setSelectedDate] = useState(dayjs());
  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const room = useSelector((state) => state.booking.room);
  const booking = useSelector((state) => state.booking.booking);

  const [value, setValue] = React.useState([
    dayjs(),
    dayjs().add(1, 'day'),
  ]);


  // const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));

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

  

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleChooseBookingDetail = (bookingDetailId) => {
    setBookingDetailChoosen(bookingDetailId);
  };

  const cancelForm = () => {
    setShowForm(false);
  };

  const handleNext = (id) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    handleNavigateBooking();
    if (booking.bookingId == null) {
      dispatch(createBookingAPI({
        searchBar: room.searchBar,
        roomId: id
      }))
    } else {
      dispatch(updateBooking_AddRoomAPI({
        bookingId: booking.bookingId,
        roomId: id,
        searchBar: room.searchBar,
      }))
    }
  };


// console.log("roomdata", room.data);

  const handleNavigateBooking = () => {
    navigate(`/booking/addons`);
  };
  const handleAdultsChange = (event) => {
    const newAdultQuantity = parseInt(event.target.value); // Lấy giá trị mới từ trường input

    dispatch(updateSearchBar({ guests: { numberAdult: newAdultQuantity } }));
  };
  const handleApplyChanges = () => {
    // Gọi hàm dispatch để cập nhật dữ liệu vào Redux Store
    dispatch(updateSearchBar({
      guests: {
        numberAdult: adultQuantity,
        numberChildren: childQuantity
      }
    }));
    toggleFlyout();
  };

  useEffect(() => {
    dispatch(searchRoomsAPI(room));
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
                                          onChange={handleAdultsChange}
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
                                          onChange={handleAdultsChange}
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
                                onClick={toggleFlyout}
                              >
                                <span>Cancel</span>
                              </button>
                              <button
                                className="btn button_btn button_primary button_sm"
                                datatest="Button"
                                onClick={handleApplyChanges}
                              >
                                <span>Apply</span>
                              </button>
                            </div>
                          </fieldset>
                        </div>
                      )}
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateRangePicker']}>
                        <DateRangePicker
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                          localeText={{ start: 'Check-in', end: 'Check-out' }} />
                      </DemoContainer>
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
                  <Stepper alternativeLabel activeStep={0}>
                    {steps.map((label) => (
                      <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Box>
              </div>
            </header>
            <div className="filter-bar_container">
              <div className="filter-bar_box">
                <div className="filter-bar_options">
                  <div className="filter-bar_left"></div>
                  <div className="filter-bar_right">
                    <div
                      className="filter-bar_layout filter-bar-select_container"
                      datatest="room_layout"
                    >
                      <div
                        className="select_container select_hasValue"
                        data-error="false"
                      >
                        <button
                          aria-expanded="false"
                          aria-controls="select-dropdown-wrapper-view-results-by-room-rate"
                          className="select_hiddenInput"
                          aria-labelledby="view-results-by-room-rate"
                          value="room"
                          data-error="false"
                          tabindex="0"
                        ></button>
                        <div className="select_input" data-selector="true">
                          <label
                            className="select_label"
                            id="view-results-by-room-rate"
                          >
                            View Results By{" "}
                          </label>
                          <span className="select_value">Rooms</span>
                          <span className="select_caret" aria-hidden="true">
                            <i className="select_caret_icon fa-solid fa-caret-down"></i>
                          </span>
                        </div>
                        <div role="alert"></div>
                      </div>
                    </div>
                    <div
                      className="filter-bar_sortBy filter-bar-select_container"
                      datatest="sort-by-select"
                    >
                      <div
                        className="select_container select_hasValue"
                        data-error="false"
                      >
                        <button
                          aria-expanded="false"
                          aria-controls="select-dropdown-wrapper-filter-bar-sort-by"
                          className="select_hiddenInput"
                          aria-labelledby="filter-bar-sort-by"
                          value="priceLowestToHighest"
                          data-error="false"
                          tabindex="0"
                        ></button>
                        <div className="select_input" data-selector="true">
                          <label className="select_label" id="filter-bar-sort-by">
                            Sort By{" "}
                          </label>
                          <span className="select_value">Lowest Price</span>
                          <span className="select_caret" aria-hidden="true">
                            <i className="select_caret_icon fa-solid fa-caret-down "></i>
                          </span>
                        </div>
                        <div role="alert"></div>
                      </div>
                    </div>
                    <div className="filter-bar_filterLink">
                      <a
                        href="#"
                        aria-expanded="false"
                        aria-controls="filter-bar-filters-wrapper"
                      >
                        <span>Show Filters</span>
                        <i className="fa-solid fa-caret-down"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="filter-bar_tagsWrapper"></div>
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
                                      <span>Guests {item.sleep}</span>
                                    </div>
                                    <div className="guests-and-roomsize_item guests-and-roomsize_bed">
                                      <span>1 King</span>
                                    </div>
                                    <div className="guests-and-roomsize_item guests-and-roomsize_size">53
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
                                      <div className="thumb-cards_rateShortDesc">Enjoy up to 30% savings on your beach family vacation!</div>
                                    </div>
                                    <div className="thumb-cards_right">
                                      <div className="thumb-cards_priceMessages">
                                        <div className="thumb-cards_priceContainer">
                                          <div className="thumb-cards_price">
                                            <span>₫{item.pricePerNight}</span>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="thumb-cards_button">
                                        <button className="btn button_btn button_primary button_sm" style={{ height: '35px' }} datatest="Button">
                                          <span onClick={() => {
                                            handleNext(item.id);
                                            handleChooseBookingDetail(item.id);
                                          }}>
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
            <BookingDetail
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              toggleForm={toggleForm}
              showForm={showForm}
              cancelForm={cancelForm}
              adultQuantity={adultQuantity}
              childQuantity={childQuantity}
              handleNext={handleNext}
              handleChooseBookingDetail={handleChooseBookingDetail}
            />
          </aside>
        </div>
      </div>
    </>
  );
}