import React, { useState } from "react";
import "../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';

export default function Booking() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [adultQuantity, setAdultQuantity] = useState(2);
  const [childQuantity, setChildQuantity] = useState(2);

  // const [value, setValue] = React.useState([
  //   dayjs('2022-04-17'),
  //   dayjs('2022-04-21'),
  // ]);

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
                              <i class="fa-solid fa-xmark"></i>
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
                                        <i class="button_subtract fa-solid fa-minus" />
                                      </span>
                                    </button>
                                    <div
                                      className="field_container"
                                      data-error="false"
                                      data-warning="false"
                                    >
                                      <label>
                                        <span class="input-field_label">
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
                                        <i class="fa-solid fa-plus"></i>
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
                                        <i class="button_subtract fa-solid fa-minus" />
                                      </span>
                                    </button>
                                    <div
                                      className="field_container"
                                      data-error="false"
                                      data-warning="false"
                                    >
                                      <label>
                                        <span class="input-field_label">
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
                                        <i class="fa-solid fa-plus"></i>
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
                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DateRangeCalendar', 'DateRangeCalendar']}>
                        <DemoItem label="Uncontrolled calendar">
                          <DateRangeCalendar
                            defaultValue={[dayjs('2022-04-17'), dayjs('2022-04-21')]}
                          />
                        </DemoItem>
                        <DemoItem label="Controlled calendar">
                          <DateRangeCalendar
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                          />
                        </DemoItem>
                      </DemoContainer>
                    </LocalizationProvider> */}

                    {/* <button className="container_checkIn"
                      aria-expanded={isExpanded}
                      aria-controls="guests-selection-flyout"
                    >
                      <i class="containerIcon fa-regular fa-calendar-days"></i>
                      <span className="container_label">
                        <span>Check-in</span>
                      </span>
                      <span>Fri, Mar 1, 2024</span>
                    </button>
                    <button className="container_checkOut"
                      aria-expanded={isExpanded}
                      aria-controls="guests-selection-flyout"
                    >
                      <i class="containerIcon fa-regular fa-calendar-days"></i>
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
            </header>
          </main>
        </div>
      </div>
    </>
  );
}
