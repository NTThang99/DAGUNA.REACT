import React, { useEffect, useState } from "react";
import "../../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import bookingReducer, { getBookingByIdAPI, getAllBookingServiceAPI, updateBooking_AddBookingService, updateBooking_DeleteRoomAPI, updateBooking_EditBookingService, updateBooking_DeleteBookingService } from "../BookingSlide";
import { useDispatch, useSelector } from "react-redux";
import BookingDetail from "./BookingDetail";
import HeaderBooking from "./HeaderBooking";
import AppUtil from "../../../services/AppUtil";

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
  const [loading, setLoading] = useState(false);
  // const [bookingDetailChoosen, setBookingDetailChoosen] = useState(null);
  const dispatch = useDispatch();
  const bookingServices = useSelector((state) => state.booking.addOns.data);
  const booking = useSelector((state) => state.booking.booking);
  const bookingServicesChoosenId = useSelector((state) => {
    let bookingDetailChoosenId = state.booking.booking.bookingDetailChoosen;
    let bookingDetailsList = state.booking.booking.bookingDetails;
    let bookingDetaiChoosen = bookingDetailsList.find(item => item.bookingDetailId == bookingDetailChoosenId);

    if (bookingDetaiChoosen) {
      let bookingServiceList = bookingDetaiChoosen.bookingDetailServiceResDTOS;

      let bookingServiceListId = bookingServiceList.map(item => item.bookingService.id);
      return bookingServiceListId;
    } else {
      return [];
    }

  });
  const bookingDetailChoosen = useSelector((state) => state.booking.booking.bookingDetailChoosen);

  const handleNext = (id, bookingServiceType, bookindDetailId) => {
    setShowAddon(bookindDetailId);
    setLoading(true);
    dispatch(updateBooking_AddBookingService({
      bookingDetailId: booking.bookingDetailChoosen,
      bookingServiceId: id,
      bookingServiceType: bookingServiceType,
      numberCar: perCarQuantity,
    })).then(() => {
      setLoading(false);
    });
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

  const handleEdit = (bookindDetailId) => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    handleNavigateBookingEdit();
    dispatch(bookingReducer.actions.handleChangeBookingDetailChoosen(bookindDetailId))

  }

  const handleNavigateBookingEdit = () => {
    navigate(`/booking/edit`);
  };



  const handleDeleteBookingDetail = (bookingDetailId) => {
    setLoading(true);
    let bookingId = localStorage.getItem("bookingId");
    dispatch(updateBooking_DeleteRoomAPI(
      { bookingId, bookingDetailId }
    ))
      .then(() => {
        setLoading(false);
      });
  };

  const handleDeleteBookingService = (bookingServiceId) => {
    setLoading(true);
    let bookingId = localStorage.getItem("bookingId");
    dispatch(updateBooking_DeleteBookingService(
      { bookingId, bookingDetailChoosen, bookingServiceId }
    ))
      .then(() => {
        setLoading(false);
      });
  };

  const handleBookingServiceEdit = (id, bookingServiceType) => {
    dispatch(updateBooking_EditBookingService(
      {
        bookingDetailId: booking.bookingDetailChoosen,
        bookingServiceId: id,
        bookingServiceType: bookingServiceType,
        numberCar: perCarQuantity,
      }
    ))
  }

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

  // const handleChooseBookingDetail = (bookingDetailId) => {
  //   setBookingDetailChoosen(bookingDetailId);
  // };

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

  const perCarPrice = (price) => {
    const totalCarPrice = price * perCarQuantity;
    return totalCarPrice;
  };
  const governmentTaxPricePerCar = (price) => {
    const governmentTax = 0.08;
    const vatPrice = price * governmentTax * perCarQuantity
    return vatPrice;
  }
  const serviceChargePricePerCar = (price) => {
    const serviceCharge = 0.054;
    const vatPrice = price * serviceCharge * perCarQuantity;
    return vatPrice;
  }
  const totalCarPerService = (price) => {
    const carPrice = perCarPrice(price);
    const governmentTaxPriceCar = governmentTaxPricePerCar(price);
    const serviceChargePriceCar = serviceChargePricePerCar(price);
    const totalCarTax = governmentTaxPriceCar + serviceChargePriceCar + carPrice;
    return totalCarTax;
  };

  return (
    <>
      <div className="app_container">
        <div className="app_row">
          <main className="app_col-sm-12 app_col-md-12 app_col-lg-8">
            <HeaderBooking
              adultQuantity={adultQuantity}
              childQuantity={childQuantity}
              steps={steps}
            />
            <div>
              <div>
                <div>
                  <div className="add-ons-container_group">
                    <div className="add-ons-container_categoryGroup">
                      <h2 className="app_heading1">Airport Transfer</h2>
                      {/* {bookingServices && bookingServices.length > 0 && bookingServices.map((item, key) => ( */}
                      {bookingServices && bookingServices.length > 0 && bookingServices.map((item, key) => (
                        <div className="add-ons-container_addOn" key={key}>
                          <div className="add-ons-container_addOnheader">
                            <div className="add-ons-container_addOnImgWrapper">
                              <img className="add-ons-container_addOnImage" src={item.fileUrl} style={{ paddingBottom: "0" }} />
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
                                      <span>{AppUtil.formatCurrency(item.price)}</span>
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
                                  <span>{AppUtil.formatCurrency(totalCarPerService(item.price))}</span>
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
                                          <span>{AppUtil.formatCurrency(item.price)}</span>
                                          <span> X </span>{perCarQuantity}<span> Per Car</span>
                                        </div>
                                        <div className="add-on-price-breakdown_value">
                                          <span>{AppUtil.formatCurrency(perCarPrice(item.price))}</span>
                                        </div>
                                      </div>
                                      <div>
                                        <div className="add-on-price-breakdown_taxesAndFees">
                                          <div>8% Government Tax</div>
                                          <div className="add-on-price-breakdown_value">
                                            <span>{AppUtil.formatCurrency(governmentTaxPricePerCar(item.price))}</span>
                                          </div>
                                        </div>
                                        <div className="add-on-price-breakdown_taxesAndFees">
                                          <div>5% Service Charge</div>
                                          <div className="add-on-price-breakdown_value">
                                            <span>{AppUtil.formatCurrency(serviceChargePricePerCar(item.price))}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="add-ons-details_messages"></div>
                              <div className="button_group">
                                {!bookingServicesChoosenId.includes(item.id) ? (
                                  <>
                                    <button className="btn button_link" datatest="Button" onClick={handleCloseDetails}>
                                      <span>Cancel</span>
                                    </button>
                                    <button className="btn button_btn button_primary button_sm" datatest="Button" onClick={() => handleNext(item.id, item.bookingServiceType)} >
                                      <span>Add to my stay</span>
                                    </button>

                                  </>
                                ) : (
                                  <>
                                    <button className="btn button_link" datatest="Button" onClick={() => handleDeleteBookingService(item.id)}>
                                      <span>Remove</span>
                                    </button>
                                    <button className="btn button_btn button_primary button_sm" datatest="Button" onClick={() => handleBookingServiceEdit(item.id, item.bookingServiceType)}>
                                      <span>Update</span>
                                    </button>
                                  </>
                                )}

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
              showAddon={showAddon}
              handleEdit={handleEdit}
              handleDeleteBookingDetail={handleDeleteBookingDetail}
              loading={loading}
              perCarQuantity={perCarQuantity}
              handleNavigateBooking={handleNavigateBooking}
            />
          </aside>
        </div>
      </div>
    </>
  );
}
