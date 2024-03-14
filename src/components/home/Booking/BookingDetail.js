import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

function BookingDetail({ item, showDetails, setShowDetails, toggleForm, showForm, cancelForm, adultQuantity, childQuantity, handleBack }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const bookingDetails = useSelector((state) => state.booking.booking.bookingDetails);


    console.log("bookingDetails", bookingDetails);
    if (currentPath === '/booking') {
        return (
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
                        <div className="cart-container_productsList">
                            <div className="cart-container_product">
                                <div className="cart-container_productDetails">
                                    <div className="cart-container_summary">
                                        <div className="cart-container_dates">
                                            <span>{item.checkIn}</span> -{" "}
                                            <span>{item.checkOut}</span>
                                        </div>
                                        <div className="cart-container_guests">
                                            <span>{adultQuantity} Adults</span>,
                                            {childQuantity > 0 && <span>, {childQuantity} Children</span>}
                                        </div>
                                    </div>
                                    <div className="cart-container_room">
                                        <div className="cart-container_roomRate">
                                            <a className="cart_name" tabIndex={0} role='button'>{item.room.name}</a>
                                        </div>
                                        <div className="cart-container_price">
                                            <span>{item.total}</span>
                                        </div>
                                    </div>
                                    <div className="cart-container_taxesAndFees">
                                        <div className="cart-container_headerWithPrice">
                                            <div className="cart-container_taxesAndFeesHeader">
                                                <span>Taxes and Fees</span>
                                            </div>
                                            <span class="cart-container_price">
                                                <span>₫394,753</span>
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
                                                            <span>₫235,673</span>
                                                        </div>
                                                    </div>
                                                    <div className="display-prices_row">
                                                        <div className="display-prices_label">5% Service Charge</div>
                                                        <div className="display-prices_price">
                                                            <span>₫159,080</span>
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
                    </div>
                    <div className="price-summary_container">
                        <hr className="desktopOnly" />
                        <div className="price-summary_totalPrice">
                            <div className="price-summary_total">
                                <span>Total:</span>
                            </div>
                            <div className="price-summary_price">
                                <span>₫{item.total}</span>
                            </div>
                        </div>
                        <div className="price-summary_taxIncluded">
                            <span>(VND tax included )</span>
                        </div>
                    </div>
                </div>
                <div className="add-ons-container_rightContinue">
                    <button className="btn button_btn button_primary button_md button_block" datatest="Button">
                        <span>Continue</span>
                    </button>
                </div>


            </>
        );
    } else if (currentPath === '/booking/addons') {
        return (
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
                                <div className="cart-container_productsList">
                                    <div className="cart-container_product">
                                        <div className="cart-container_productDetails">
                                            <div className="cart-container_summary">
                                                <div className="cart-container_dates">
                                                    <span>{item.checkIn}</span> -{" "}
                                                    <span>{item.checkOut}</span>
                                                </div>
                                                <div className="cart-container_guests">
                                                    <span>{adultQuantity} Adults</span>,
                                                    {childQuantity > 0 && <span>, {childQuantity} Children</span>}
                                                </div>
                                            </div>
                                            <div className="cart-container_room">
                                                <div className="cart-container_roomRate">
                                                    <a className="cart_name" tabIndex={0} role='button'>{item.room.name}</a>
                                                </div>
                                                <div className="cart-container_price">
                                                    <span>{item.total}</span>
                                                </div>
                                            </div>
                                            <div className="cart-container_taxesAndFees">
                                                <div className="cart-container_headerWithPrice">
                                                    <div className="cart-container_taxesAndFeesHeader">
                                                        <span>Taxes and Fees</span>
                                                    </div>
                                                    <span class="cart-container_price">
                                                        <span>₫394,753</span>
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
                                                                    <span>₫235,673</span>
                                                                </div>
                                                            </div>
                                                            <div className="display-prices_row">
                                                                <div className="display-prices_label">5% Service Charge</div>
                                                                <div className="display-prices_price">
                                                                    <span>₫159,080</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cart-container_actions">
                                            <button className="btn button_link" aria-label="Edit" datatest="Button">
                                                <span className="fa-solid fa-pencil button_modify" aria-hidden="true"></span>
                                                <span>Edit</span>
                                            </button>
                                            <span data-testid="separator"></span>
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
                    {bookingDetails.map((item, key) => (
                        <div className="price-summary_container">
                            <hr className="desktopOnly" />
                            <div className="price-summary_totalPrice">
                                <div className="price-summary_total">
                                    <span>Total:</span>
                                </div>
                                <div className="price-summary_price">
                                    <span>₫{item.total}</span>
                                </div>
                            </div>
                            <div className="price-summary_taxIncluded">
                                <span>(VND tax included )</span>
                            </div>
                        </div>
                    ))} 
                </div>
                <div className="add-ons-container_rightContinue">
                    <button className="btn button_btn button_primary button_md button_block" datatest="Button">
                        <span>Continue</span>
                    </button>
                </div>
            </>
        );
    } else {
        // Handle unknown paths or fallback
        return <div>Unknown path</div>;
    }
}

export default BookingDetail;