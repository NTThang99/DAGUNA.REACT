import React, { useState } from "react";
import "../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Room from "./Rooms";

export default function Booking() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [adultQuantity, setAdultQuantity] = useState(2);
  const [childQuantity, setChildQuantity] = useState(2);

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
                    <div className="container_guestsWrapper">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          className="container_checkIn"
                          defaultValue={dayjs("2022-04-17")}
                        />
                        <DatePicker
                          className="container_checkOut"
                          value={value}
                          onChange={(newValue) => setValue(newValue)}
                        />
                      </LocalizationProvider>
                    </div>

                    {/* <button className="container_checkIn"
                      aria-expanded={isExpanded}
                      aria-controls="guests-selection-flyout"
                    >
                      <i className="containerIcon fa-regular fa-calendar-days"></i>
                      <span className="container_label">
                        <span>Check-in</span>
                      </span>
                      <span>Fri, Mar 1, 2024</span>
                    </button>
                    <button className="container_checkOut"
                      aria-expanded={isExpanded}
                      aria-controls="guests-selection-flyout"
                    >
                      <i className="containerIcon fa-regular fa-calendar-days"></i>
                      <span className="container_label">
                        <span>Check-out</span>
                      </span>
                      <span>Sat, Mar 2, 2024</span>
                    </button> */}
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
              <Room />
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
