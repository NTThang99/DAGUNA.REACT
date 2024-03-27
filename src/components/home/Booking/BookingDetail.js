import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";



export default function BookingDetail({ showDetails, setShowDetails, showDetailsBill, setShowDetailsBill, toggleForm, showAddon, showForm, cancelForm, adultQuantity, childQuantity, handleBack, handleNext, handleEdit, handleDeleteBookingDetail, loading }) {
    // const [roomCount, setRoomCount] = useState(1);
    const location = useLocation();
    const currentPath = location.pathname;
    const bookingDetails = useSelector((state) => state.booking.booking.bookingDetails);
    const bookingDetailChoosen = useSelector((state) => state.booking.booking.bookingDetailChoosen)

    // const bookingServiceId = useSelector((arg) => arg.bookingServiceId)

    // || currentPath === '/booking/edit'
    {

    }
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
                                                        <span className="cart-container_price">
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
                                                    <span>Room</span> 1 </h3>
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
                                                        <span className="cart-container_price">
                                                            <span>₫394,753</span>
                                                        </span>
                                                    </div>
                                                    <div className="display-prices_wrapper">
                                                        <button className="btn button_link" onClick={() => setShowDetailsBill(!showDetailsBill)}>
                                                            <span>{showDetailsBill ? "Details" : "Details"}</span>
                                                        </button>
                                                        {showDetailsBill && (
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
                                            {/* showAddon == item.id  */}
                                            {showAddon ? (
                                                <>
                                                    {item.bookingDetailServiceResDTOS.map((item, key) => (
                                                        <div>
                                                            <div className="cart-container_addon">
                                                                <div className="cart-container_addonNameInfo">
                                                                    <a role="button" tabindex="0">{item.bookingService.name} </a>
                                                                    <i className="cart-container_addonInfo">
                                                                        <span><span data-package-date="03-14-2024">Mar 14</span>  / Per Car: 1</span>
                                                                    </i>
                                                                </div>
                                                                <div className="cart-container_price">
                                                                    <span>₫1,105,298</span>
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
                                                                        <span>₫394,753</span>
                                                                    </span>
                                                                </div>
                                                                <div className="display-prices_wrapper">
                                                                    <button className="btn button_link" onClick={() => setShowDetailsBill(!showDetailsBill)}>
                                                                        <span>{showDetailsBill ? "Details" : "Details"}</span>
                                                                    </button>
                                                                    {showDetailsBill && (
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
                                                    ))}
                                                </>
                                            ) : (
                                                <>
                                                    {item.bookingDetailServiceResDTOS.map((item, key) => (
                                                        <div>
                                                            <div className="cart-container_addon">
                                                                <div className="cart-container_addonNameInfo">
                                                                    <a role="button" tabindex="0">{item.bookingService.name} </a>
                                                                    <i className="cart-container_addonInfo">
                                                                        <span><span data-package-date="03-14-2024">Mar 14</span>  / Per Car: 1</span>
                                                                    </i>
                                                                </div>
                                                                <div className="cart-container_price">
                                                                    <span>₫1,105,298</span>
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
                                                                        <span>₫394,753</span>
                                                                    </span>
                                                                </div>
                                                                <div className="display-prices_wrapper">
                                                                    <button className="btn button_link" onClick={() => setShowDetailsBill(!showDetailsBill)}>
                                                                        <span>{showDetailsBill ? "Details" : "Details"}</span>
                                                                    </button>
                                                                    {showDetailsBill && (
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
                                                    ))}
                                                </>
                                            )}
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
                    </div >
                    <div className="add-ons-container_rightContinue">
                        <button className="btn button_btn button_primary button_md button_block" datatest="Button" onClick={() => handleNext()}>
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
                                                    <span>Room</span> 1 </h3>
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
                                                        <span className="cart-container_price">
                                                            <span>₫394,753</span>
                                                        </span>
                                                    </div>
                                                    <div className="display-prices_wrapper">
                                                        <button className="btn button_link" onClick={() => setShowDetailsBill(!showDetailsBill)}>
                                                            <span>{showDetailsBill ? "Details" : "Details"}</span>
                                                        </button>
                                                        {showDetailsBill && (
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
                                            {showAddon == item.id && (
                                                <>
                                                    {item.bookingDetailServiceResDTOS.map((item, key) => (
                                                        <div>
                                                            <div className="cart-container_addon">
                                                                <div className="cart-container_addonNameInfo">
                                                                    <a role="button" tabindex="0">{item.bookingService.name} </a>
                                                                    <i className="cart-container_addonInfo">
                                                                        <span><span data-package-date="03-14-2024">Mar 14</span>  / Per Car: 1</span>
                                                                    </i>
                                                                </div>
                                                                <div className="cart-container_price">
                                                                    <span>₫1,105,298</span>
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
                                                                        <span>₫394,753</span>
                                                                    </span>
                                                                </div>
                                                                <div className="display-prices_wrapper">
                                                                    <button className="btn button_link" onClick={() => setShowDetailsBill(!showDetailsBill)}>
                                                                        <span>{showDetailsBill ? "Details" : "Details"}</span>
                                                                    </button>
                                                                    {showDetailsBill && (
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
                                                    ))}
                                                </>
                                            )}

                                            <div div className="cart-container_actions" >
                                                <button className="btn button_link" aria-label="Edit" datatest="Button" onClick={handleEdit}>
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
                                                    <span>Room</span> 1 </h3>
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
                                                        <span className="cart-container_price">
                                                            <span>₫394,753</span>
                                                        </span>
                                                    </div>
                                                    <div className="display-prices_wrapper">
                                                        <button className="btn button_link" onClick={() => setShowDetailsBill(!showDetailsBill)}>
                                                            <span>{showDetailsBill ? "Details" : "Details"}</span>
                                                        </button>
                                                        {showDetailsBill && (
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
                                            {item.bookingDetailServiceResDTOS.map((item, key) => (
                                                <div>
                                                    <div className="cart-container_addon">
                                                        <div className="cart-container_addonNameInfo">
                                                            <a role="button" tabindex="0">{item.bookingService.name} </a>
                                                            <i className="cart-container_addonInfo">
                                                                <span><span data-package-date="03-14-2024">Mar 14</span>  / Per Car: 1</span>
                                                            </i>
                                                        </div>
                                                        <div className="cart-container_price">
                                                            <span>₫1,105,298</span>
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
                                                                <span>₫394,753</span>
                                                            </span>
                                                        </div>
                                                        <div className="display-prices_wrapper">
                                                            <button className="btn button_link" onClick={() => setShowDetailsBill(!showDetailsBill)}>
                                                                <span>{showDetailsBill ? "Details" : "Details"}</span>
                                                            </button>
                                                            {showDetailsBill && (
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
                    </div >
                </>
            )
        );
    }
}