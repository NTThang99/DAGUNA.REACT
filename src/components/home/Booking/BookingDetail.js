import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import AppUtil from '../../../services/AppUtil';
import moment from 'moment';


export default function BookingDetail({ showDetails, setShowDetails, showDetailsBill, setShowDetailsBill, showDetailsBillRoom, setShowDetailsBillRoom, showDetailsBillService, setShowDetailsBillService, toggleForm, showAddon, showForm, cancelForm, handleBack, handleNext, handleEdit, handleDeleteBookingDetail, loading, handleNavigateBooking }) {
    // const [roomCount, setRoomCount] = useState(1);
    const location = useLocation();
    const currentPath = location.pathname;
    const booking = useSelector((state) => state.booking.booking);
    const bookingDetails = useSelector((state) => state.booking.booking.bookingDetails);
    const bookingDetailChoosen = useSelector((state) => state.booking.booking.bookingDetailChoosen)

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
    const GovernmentTaxPriceService = (price) => {
        const governmentTax = 0.08;
        const vatPrice = price * governmentTax
        return vatPrice;
    }
    const ServiceChargePriceService = (price) => {
        const serviceCharge = 0.054;
        const vatPrice = price * serviceCharge;
        return vatPrice;
    }
    const TotalVatService = (price) => {
        const governmentTax = GovernmentTaxPriceService(price);
        const serviceCharge = ServiceChargePriceService(price);
        const totalTax = governmentTax + serviceCharge;
        return totalTax;
    };
    console.log("currentPath", currentPath);

    if (currentPath === '/booking') {
        return (
            loading ? <span class="loader container-inner"></span> : (
                <>
                    <div className="container-inner">
                        <div className="container_body">
                            <div className="container_header">
                                <h2 className="app_heading1">
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
                                <div className="cart-container_checkOut">
                                    <b>
                                        <span>Check-out</span>
                                    </b>
                                    <span>Before 12:00 PM</span>
                                </div>
                            </div>

                            {bookingDetails.map((item, key) => (
                                <>
                                    <div className={`cart-container_productsList ${bookingDetailChoosen == item.bookingDetailId ? 'chosen-booking-detail' : ''}`}>
                                        <div className="cart-container_product ">
                                            <div className="cart-container_productDetails">
                                                <h3 className="app_subheading1">
                                                    <span>Room</span> {key + 1} </h3>
                                                <div className="cart-container_summary">
                                                    <div className="cart-container_dates">
                                                        <span>{moment(item.checkIn).format('DD-MM-YYYY')}</span> -{" "}
                                                        <span>{moment(item.checkOut).format('DD-MM-YYYY')}</span>
                                                    </div>
                                                    <div className="cart-container_guests">
                                                        <span>{item.numberAdult} Adults</span>,
                                                        {JSON.parse(item.childrenAges).length > 0 && <span>, {JSON.parse(item.childrenAges).length} Children</span>}
                                                    </div>
                                                </div>
                                                <div className="cart-container_room">
                                                    <div className="cart-container_roomRate">
                                                        <a className="cart_name" tabIndex={0} role='button'>{item.room.name}</a>
                                                    </div>
                                                    <div className="cart-container_price">
                                                        <span>{AppUtil.formatCurrency(item.room.pricePerNight)}</span>
                                                    </div>
                                                </div>
                                                <div className="cart-container_taxesAndFees">
                                                    <div className="cart-container_headerWithPrice">
                                                        <div className="cart-container_taxesAndFeesHeader">
                                                            <span>Taxes and Fees</span>
                                                        </div>
                                                        <span className="cart-container_price">
                                                            <span>{AppUtil.formatCurrency(TotalVatRoom(item.room.pricePerNight))}</span>
                                                        </span>
                                                    </div>
                                                    <div className="display-prices_wrapper">
                                                        <button className="btn button_link" onClick={() => setShowDetails(!showDetails)}>
                                                            <span>{showDetails ? "Details" : "Details"}</span>
                                                        </button>
                                                        {showDetails && (
                                                            <div className="display-prices_breakdown">
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
                                            <div className="cart-container_actions">
                                                <button className="btn button_link" aria-label="Remove" datatest="Button">
                                                    <span className="button_remove fa-regular fa-trash-can" aria-hidden="true">
                                                    </span>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                            <div className="add-coupon-to-reservation_container">
                                                {!showForm && (
                                                    <button className="btn button_link" datatest="Button" onClick={toggleForm}>
                                                        <span>Add coupon</span>
                                                    </button>
                                                )}
                                                {showForm && (
                                                    <div className="add-coupon-to-reservation_couponField">
                                                        <form>
                                                            <div className="input-field_container" data-error="false" data-warning="false">
                                                                <label for="NmRsp8y2LWuMVYffCWATGpjh">
                                                                    <span className="input-field_labels">Coupon Code</span>
                                                                    <input id="NmRsp8y2LWuMVYffCWATGpjh" maxlength="25" type="text" placeholder="" aria-label="Coupon Code" data-error="false" value="" />
                                                                </label>
                                                                <div aria-live="assertive" aria-relevant="all" aria-atomic="true" aria-hidden="false"></div>
                                                            </div>
                                                            <button className="btn button_btn button_secondary button_md" type="submit" datatest="Button" onClick={cancelForm}>
                                                                <span>Cancel</span>
                                                            </button>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className="price-summary_container">
                            <hr className="desktopOnly" />
                            <div className="price-summary_totalPrice">
                                <div className="price-summary_total">
                                    <span>Total:</span>
                                </div>
                                <div className="price-summary_price">
                                    <span>{AppUtil.formatCurrency(booking.total)}</span>
                                </div>
                            </div>
                            <div className="price-summary_taxIncluded">
                                <span>(VND tax included )</span>
                            </div>
                        </div>
                    </div>
                    <div className="add-ons-container_rightContinue">
                        <button className="btn button_btn button_primary button_md button_block" datatest="Button" onClick={() => handleNext()}>
                            <span>Continue</span>
                        </button>
                    </div>
                </>
            )

        );
    } else if (currentPath === '/booking/addons') {
        return (
            loading ? <span class="loader"></span> : (
                <>
                    <div className="container-inner">
                        <div className="container_body">
                            <div className="container_header">
                                <h2 className="app_heading1">
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
                                <div className="cart-container_checkOut">
                                    <b>
                                        <span>Check-out</span>
                                    </b>
                                    <span>Before 12:00 PM</span>
                                </div>
                            </div>
                            {bookingDetails.map((item, key) => (
                                <>
                                    <div className={`cart-container_productsList ${bookingDetailChoosen == item.bookingDetailId ? 'chosen-booking-detail' : ''}`}>
                                        <div className="cart-container_product">
                                            <hr></hr>
                                            <div className="cart-container_productDetails">
                                                <h3 className="app_subheading1">
                                                    <span>Room</span> {key + 1} </h3>
                                                <div className="cart-container_summary">
                                                    <div className="cart-container_dates">
                                                        <span>{moment(item.checkIn).format('DD-MM-YYYY')}</span> -{" "}
                                                        <span>{moment(item.checkOut).format('DD-MM-YYYY')}</span>
                                                    </div>
                                                    <div className="cart-container_guests">
                                                        <span>{item.numberAdult} Adults</span>,
                                                        {JSON.parse(item.childrenAges).length > 0 && <span>, {JSON.parse(item.childrenAges).length} Children</span>}
                                                    </div>
                                                </div>
                                                <div className="cart-container_room">
                                                    <div className="cart-container_roomRate">
                                                        <a className="cart_name" tabIndex={0} role='button'>{item.room.name}</a>
                                                    </div>
                                                    <div className="cart-container_price">
                                                        <span>{AppUtil.formatCurrency(item.room.pricePerNight)}</span>
                                                    </div>
                                                </div>
                                                <div className="cart-container_taxesAndFees">
                                                    <div className="cart-container_headerWithPrice">
                                                        <div className="cart-container_taxesAndFeesHeader">
                                                            <span>Taxes and Fees</span>
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
                                                            <div className="display-prices_breakdown">
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
                                            {showAddon ? (
                                                <>
                                                    {item.bookingDetailServiceResDTOS.map((serviceItem, key) => (
                                                        <div key={serviceItem.id}>
                                                            <div className="cart-container_addon">
                                                                <div className="cart-container_addonNameInfo">
                                                                    <a role="button" tabindex="0">{serviceItem.bookingService.name} </a>
                                                                    <i className="cart-container_addonInfo">
                                                                        <span><span data-package-date="03-14-2024">{moment(item.checkIn).format('DD-MM-YYYY')}</span>  / Per Car: {serviceItem.numberCar} </span>
                                                                    </i>
                                                                </div>
                                                                <div className="cart-container_price">

                                                                    <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar))}</span>
                                                                </div>
                                                            </div>
                                                            <div className="cart-container_addonActions">
                                                                <button className="btn button_link" datatest="Button"  >
                                                                    <span>Remove</span>
                                                                </button>
                                                            </div>
                                                            <div className="cart-container_taxesAndFees">
                                                                <div className="cart-container_headerWithPrice">
                                                                    <div className="cart-container_taxesAndFeesHeader">
                                                                        <span>Taxes and Fees  </span>
                                                                    </div>
                                                                    <span className="cart-container_price">
                                                                        <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar) * 0.134)}</span>
                                                                    </span>
                                                                </div>
                                                                <div className="display-prices_wrapper">
                                                                    <button className="btn button_link" onClick={() => setShowDetailsBillService(!showDetailsBillService)}>
                                                                        <span>{showDetailsBillService ? "Details" : "Details"}</span>
                                                                    </button>
                                                                    {showDetailsBillService && (
                                                                        <div className="display-prices_breakdown">
                                                                            <div className="display-prices_row">
                                                                                <div className="display-prices_label">8% Government Tax</div>
                                                                                <div className="display-prices_price">
                                                                                    <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar) * 0.08)}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="display-prices_row">
                                                                                <div className="display-prices_label">5% Service Charge</div>
                                                                                <div className="display-prices_price">
                                                                                    <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar) * 0.05)}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    {item.bookingDetailServiceResDTOS.map((serviceItem, key) => (
                                                        <div>
                                                            <div className="cart-container_addon">
                                                                <div className="cart-container_addonNameInfo">
                                                                    <a role="button" tabindex="0">{serviceItem.bookingService.name} </a>
                                                                    <i className="cart-container_addonInfo">
                                                                        <span><span data-package-date="03-14-2024">{moment(item.checkIn).format('DD-MM-YYYY')}</span>  / Per Car: {serviceItem.numberCar}</span>
                                                                    </i>
                                                                </div>
                                                                <div className="cart-container_price">
                                                                    <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar))}</span>
                                                                </div>
                                                            </div>
                                                            <div className="cart-container_addonActions">
                                                                <button className="btn button_link" datatest="Button"  >
                                                                    <span>Remove</span>
                                                                </button>
                                                            </div>
                                                            <div className="cart-container_taxesAndFees">
                                                                <div className="cart-container_headerWithPrice">
                                                                    <div className="cart-container_taxesAndFeesHeader">
                                                                        <span>Taxes and Fees</span>
                                                                    </div>
                                                                    <span className="cart-container_price">
                                                                        <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar) * 0.134)}</span>
                                                                    </span>
                                                                </div>
                                                                <div className="display-prices_wrapper">
                                                                    <button className="btn button_link" onClick={() => setShowDetailsBillService(!showDetailsBillService)}>
                                                                        <span>{showDetailsBillService ? "Details" : "Details"}</span>
                                                                    </button>
                                                                    {showDetailsBillService && (
                                                                        <div className="display-prices_breakdown">
                                                                            <div className="display-prices_row">
                                                                                <div className="display-prices_label">8% Government Tax</div>
                                                                                <div className="display-prices_price">
                                                                                    <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar) * 0.08)}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="display-prices_row">
                                                                                <div className="display-prices_label">5% Service Charge</div>
                                                                                <div className="display-prices_price">
                                                                                    <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar) * 0.05)}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </>
                                            )}
                                            <div div className="cart-container_actions" >
                                                <button className="btn button_link" aria-label="Edit" datatest="Button" onClick={() => handleEdit(item.bookingDetailId)}>
                                                    <span className="fa-solid fa-pencil button_modify" aria-hidden="true"></span>
                                                    <span>Edit</span>
                                                </button>
                                                <span data-testid="separator"></span>
                                                <button className="btn button_link" aria-label="Remove" datatest="Button" onClick={() => handleDeleteBookingDetail(item.bookingDetailId)}>
                                                    <span className="button_remove fa-regular fa-trash-can" aria-hidden="true" >
                                                    </span>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                            <div className="add-coupon-to-reservation_container">
                                                {!showForm && (
                                                    <button className="btn button_link" datatest="Button" onClick={toggleForm}>
                                                        <span>Add coupon</span>
                                                    </button>
                                                )}
                                                {showForm && (
                                                    <div className="add-coupon-to-reservation_couponField">
                                                        <form>
                                                            <div className="input-field_container" data-error="false" data-warning="false">
                                                                <label for="NmRsp8y2LWuMVYffCWATGpjh">
                                                                    <span className="input-field_labels">Coupon Code</span>
                                                                    <input id="NmRsp8y2LWuMVYffCWATGpjh" maxlength="25" type="text" placeholder="" aria-label="Coupon Code" data-error="false" value="" />
                                                                </label>
                                                                <div aria-live="assertive" aria-relevant="all" aria-atomic="true" aria-hidden="false"></div>
                                                            </div>
                                                            <button className="btn button_btn button_secondary button_md" type="submit" datatest="Button" onClick={cancelForm}>
                                                                <span>Cancel</span>
                                                            </button>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div >
                                    <div className="cart-container_addAnotherRoom">
                                        <button className="btn button_circle" datatest="Button" onClick={() => { handleBack(); }}>
                                            <span className="button_add fa-solid fa-circle-plus" aria-hidden="true">
                                            </span>
                                            <span>Add a Room</span>
                                        </button>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className="price-summary_container">
                            <hr className="desktopOnly" />
                            <div className="price-summary_totalPrice">
                                <div className="price-summary_total">
                                    <span>Total:</span>
                                </div>
                                <div className="price-summary_price">
                                    <span>{AppUtil.formatCurrency(booking.total)}</span>
                                </div>
                            </div>
                            <div className="price-summary_taxIncluded">
                                <span>(VND tax included )</span>
                            </div>
                        </div>
                    </div >
                    <div className="add-ons-container_rightContinue">
                        <button className="btn button_btn button_primary button_md button_block" datatest="Button" onClick={() => handleNavigateBooking()}>
                            <span>Continue</span>
                        </button>
                    </div>
                </>
            )
        );
    } else if (currentPath === '/booking/edit') {
        return (
            loading ? <></> : (
                <>
                    <div className="container-inner">
                        <div className="container_body">
                            <div className="container_header">
                                <h2 className="app_heading1">
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
                                <div className="cart-container_checkOut">
                                    <b>
                                        <span>Check-out</span>
                                    </b>
                                    <span>Before 12:00 PM</span>
                                </div>
                            </div>
                            {bookingDetails.map((item, key) => (
                                <>
                                    <div className={`cart-container_productsList ${bookingDetailChoosen == item.bookingDetailId ? 'chosen-booking-detail' : ''}`}>
                                        <div className="cart-container_product">
                                            <hr></hr>
                                            <div className="cart-container_productDetails">
                                                <h3 className="app_subheading1">
                                                    <span>Room</span> {key + 1} </h3>
                                                <div className="cart-container_summary">
                                                    <div className="cart-container_dates">
                                                        <span>{moment(item.checkIn).format('DD-MM-YYYY')}</span> -{" "}
                                                        <span>{moment(item.checkOut).format('DD-MM-YYYY')}</span>
                                                    </div>
                                                    <div className="cart-container_guests">
                                                        <span>{item.numberAdult} Adults</span>,
                                                        {JSON.parse(item.childrenAges).length > 0 && <span>, {JSON.parse(item.childrenAges).length} Children</span>}
                                                    </div>
                                                </div>
                                                <div className="cart-container_room">
                                                    <div className="cart-container_roomRate">
                                                        <a className="cart_name" tabIndex={0} role='button'>{item.room.name}</a>
                                                    </div>
                                                    <div className="cart-container_price">
                                                        <span>{AppUtil.formatCurrency(item.room.pricePerNight)}</span>
                                                    </div>
                                                </div>
                                                <div className="cart-container_taxesAndFees">
                                                    <div className="cart-container_headerWithPrice">
                                                        <div className="cart-container_taxesAndFeesHeader">
                                                            <span>Taxes and Fees</span>
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
                                                            <div className="display-prices_breakdown">
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
                                            {showAddon == item.id && (
                                                <>
                                                    {item.bookingDetailServiceResDTOS.map((serviceItem, key) => (
                                                        <div>
                                                            <div className="cart-container_addon">
                                                                <div className="cart-container_addonNameInfo">
                                                                    <a role="button" tabindex="0">{serviceItem.bookingService.name} </a>
                                                                    <i className="cart-container_addonInfo">
                                                                        <span><span data-package-date="03-14-2024">{moment(item.checkIn).format('DD-MM-YYYY')}</span>  / Per Car: {serviceItem.numberCar}</span>
                                                                    </i>
                                                                </div>
                                                                <div className="cart-container_price">
                                                                    <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar))}</span>
                                                                </div>
                                                            </div>
                                                            <div className="cart-container_addonActions">
                                                                <button className="btn button_link" datatest="Button">
                                                                    <span>Remove</span>
                                                                </button>
                                                            </div>
                                                            <div className="cart-container_taxesAndFees">
                                                                <div className="cart-container_headerWithPrice">
                                                                    <div className="cart-container_taxesAndFeesHeader">
                                                                        <span>Taxes and Fees</span>
                                                                    </div>
                                                                    <span className="cart-container_price">
                                                                        <span>{AppUtil.formatCurrency(TotalVatService(serviceItem.bookingService.price))}</span>
                                                                    </span>
                                                                </div>
                                                                <div className="display-prices_wrapper">
                                                                    <button className="btn button_link" onClick={() => setShowDetailsBillService(!showDetailsBillService)}>
                                                                        <span>{showDetailsBillService ? "Details" : "Details"}</span>
                                                                    </button>
                                                                    {showDetailsBillService && (
                                                                        <div className="display-prices_breakdown">
                                                                            <div className="display-prices_row">
                                                                                <div className="display-prices_label">8% Government Tax</div>
                                                                                <div className="display-prices_price">
                                                                                    <span>{AppUtil.formatCurrency(GovernmentTaxPriceService(serviceItem.bookingService.price))}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="display-prices_row">
                                                                                <div className="display-prices_label">5% Service Charge</div>
                                                                                <div className="display-prices_price">
                                                                                    <span>{AppUtil.formatCurrency(ServiceChargePriceService(serviceItem.bookingService.price))}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    ))}
                                                </>
                                            )}

                                            <div div className="cart-container_actions" >
                                                <button className="btn button_link" aria-label="Remove" datatest="Button">
                                                    <span className="button_remove fa-regular fa-trash-can" aria-hidden="true">
                                                    </span>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                            <div className="add-coupon-to-reservation_container">
                                                {!showForm && (
                                                    <button className="btn button_link" datatest="Button" onClick={toggleForm}>
                                                        <span>Add coupon</span>
                                                    </button>
                                                )}
                                                {showForm && (
                                                    <div className="add-coupon-to-reservation_couponField">
                                                        <form>
                                                            <div className="input-field_container" data-error="false" data-warning="false">
                                                                <label for="NmRsp8y2LWuMVYffCWATGpjh">
                                                                    <span className="input-field_labels">Coupon Code</span>
                                                                    <input id="NmRsp8y2LWuMVYffCWATGpjh" maxlength="25" type="text" placeholder="" aria-label="Coupon Code" data-error="false" value="" />
                                                                </label>
                                                                <div aria-live="assertive" aria-relevant="all" aria-atomic="true" aria-hidden="false"></div>
                                                            </div>
                                                            <button className="btn button_btn button_secondary button_md" type="submit" datatest="Button" onClick={cancelForm}>
                                                                <span>Cancel</span>
                                                            </button>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div >
                                </>
                            ))}
                        </div>
                        <div className="price-summary_container">
                            <hr className="desktopOnly" />
                            <div className="price-summary_totalPrice">
                                <div className="price-summary_total">
                                    <span>Total:</span>
                                </div>
                                <div className="price-summary_price">
                                    <span>{AppUtil.formatCurrency(booking.total)}</span>
                                </div>
                            </div>
                            <div className="price-summary_taxIncluded">
                                <span>(VND tax included )</span>
                            </div>
                        </div>
                    </div >
                    <div className="add-ons-container_rightContinue">
                        <button className="btn button_btn button_primary button_md button_block" datatest="Button" onClick={() => handleNext()}>
                            <span>Continue</span>
                        </button>
                    </div>
                </>
            )
        );

    } else if (currentPath === '/booking/checkout') {
        return (
            loading ? <span class="loader"></span> : (
                <>
                    <div className="container-inner">
                        <div className="container_body">
                            <div className="container_header">
                                <h2 className="app_heading1">
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
                                <div className="cart-container_checkOut">
                                    <b>
                                        <span>Check-out</span>
                                    </b>
                                    <span>Before 12:00 PM</span>
                                </div>
                            </div>
                            {bookingDetails.map((item, key) => (
                                <>
                                    <div className={`cart-container_productsList ${bookingDetailChoosen == item.bookingDetailId ? 'chosen-booking-detail' : ''}`}>
                                        <div className="cart-container_product">
                                            <hr></hr>
                                            <div className="cart-container_productDetails">
                                                <h3 className="app_subheading1">
                                                    <span>Room</span> {key + 1} </h3>
                                                <div className="cart-container_summary">
                                                    <div className="cart-container_dates">
                                                        <span>{moment(item.checkIn).format('DD-MM-YYYY')}</span> -{" "}
                                                        <span>{moment(item.checkOut).format('DD-MM-YYYY')}</span>
                                                    </div>
                                                    <div className="cart-container_guests">
                                                        <span>{item.numberAdult} Adults</span>,
                                                        {JSON.parse(item.childrenAges).length > 0 && <span>, {JSON.parse(item.childrenAges).length} Children</span>}
                                                    </div>
                                                </div>
                                                <div className="cart-container_room">
                                                    <div className="cart-container_roomRate">
                                                        <a className="cart_name" tabIndex={0} role='button'>{item.room.name}</a>
                                                    </div>
                                                    <div className="cart-container_price">
                                                        <span>{AppUtil.formatCurrency(item.room.pricePerNight)}</span>
                                                    </div>
                                                </div>
                                                <div className="cart-container_taxesAndFees">
                                                    <div className="cart-container_headerWithPrice">
                                                        <div className="cart-container_taxesAndFeesHeader">
                                                            <span>Taxes and Fees</span>
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
                                                            <div className="display-prices_breakdown">
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
                                            {item.bookingDetailServiceResDTOS.map((serviceItem, key) => (
                                                <div>
                                                    <div className="cart-container_addon">
                                                        <div className="cart-container_addonNameInfo">
                                                            <a role="button" tabindex="0">{serviceItem.bookingService.name} </a>
                                                            <i className="cart-container_addonInfo">
                                                                <span><span data-package-date="03-14-2024">{moment(item.checkIn).format('DD-MM-YYYY')}</span>  / Per Car: {serviceItem.numberCar}</span>
                                                            </i>
                                                        </div>
                                                        <div className="cart-container_price">
                                                            <span>{AppUtil.formatCurrency((serviceItem.price) * (serviceItem.numberCar))}</span>
                                                        </div>
                                                    </div>
                                                    <div className="cart-container_addonActions">
                                                        <button className="btn button_link" datatest="Button"  >
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                    <div className="cart-container_taxesAndFees">
                                                        <div className="cart-container_headerWithPrice">
                                                            <div className="cart-container_taxesAndFeesHeader">
                                                                <span>Taxes and Fees</span>
                                                            </div>
                                                            <span className="cart-container_price">
                                                                <span>{AppUtil.formatCurrency(TotalVatService(serviceItem.bookingService.price))}</span>
                                                            </span>
                                                        </div>
                                                        <div className="display-prices_wrapper">
                                                            <button className="btn button_link" onClick={() => setShowDetailsBillService(!showDetailsBillService)}>
                                                                <span>{showDetailsBillService ? "Details" : "Details"}</span>
                                                            </button>
                                                            {showDetailsBillService && (
                                                                <div className="display-prices_breakdown">
                                                                    <div className="display-prices_row">
                                                                        <div className="display-prices_label">8% Government Tax</div>
                                                                        <div className="display-prices_price">
                                                                            <span>{AppUtil.formatCurrency(GovernmentTaxPriceService(serviceItem.bookingService.price))}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="display-prices_row">
                                                                        <div className="display-prices_label">5% Service Charge</div>
                                                                        <div className="display-prices_price">
                                                                            <span>{AppUtil.formatCurrency(ServiceChargePriceService(serviceItem.bookingService.price))}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            ))}
                                            <div div className="cart-container_actions" >
                                                <button className="btn button_link" aria-label="Edit" datatest="Button" onClick={handleEdit}>
                                                    <span className="fa-solid fa-pencil button_modify" aria-hidden="true"></span>
                                                    <span>Edit</span>
                                                </button>
                                                <span data-testid="separator"></span>
                                                <button className="btn button_link" aria-label="Remove" datatest="Button" onClick={() => handleDeleteBookingDetail(item.bookingDetailId)}>
                                                    <span className="button_remove fa-regular fa-trash-can" aria-hidden="true" >
                                                    </span>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                            <div className="add-coupon-to-reservation_container">
                                                {!showForm && (
                                                    <button className="btn button_link" datatest="Button" onClick={toggleForm}>
                                                        <span>Add coupon</span>
                                                    </button>
                                                )}
                                                {showForm && (
                                                    <div className="add-coupon-to-reservation_couponField">
                                                        <form>
                                                            <div className="input-field_container" data-error="false" data-warning="false">
                                                                <label for="NmRsp8y2LWuMVYffCWATGpjh">
                                                                    <span className="input-field_labels">Coupon Code</span>
                                                                    <input id="NmRsp8y2LWuMVYffCWATGpjh" maxlength="25" type="text" placeholder="" aria-label="Coupon Code" data-error="false" value="" />
                                                                </label>
                                                                <div aria-live="assertive" aria-relevant="all" aria-atomic="true" aria-hidden="false"></div>
                                                            </div>
                                                            <button className="btn button_btn button_secondary button_md" type="submit" datatest="Button" onClick={cancelForm}>
                                                                <span>Cancel</span>
                                                            </button>
                                                        </form>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div >
                                    <div className="cart-container_addAnotherRoom">
                                        <button className="btn button_circle" datatest="Button" onClick={() => { handleBack(); }}>
                                            <span className="button_add fa-solid fa-circle-plus" aria-hidden="true">
                                            </span>
                                            <span>Add a Room</span>
                                        </button>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className="price-summary_container">
                            <hr className="desktopOnly" />
                            <div className="price-summary_totalPrice">
                                <div className="price-summary_total">
                                    <span>Total:</span>
                                </div>
                                <div className="price-summary_price">
                                    <span>{AppUtil.formatCurrency(booking.total)}</span>
                                </div>
                            </div>
                            <div className="price-summary_taxIncluded">
                                <span>(VND tax included )</span>
                            </div>
                        </div>
                    </div >
                </>
            )
        );
    }
}