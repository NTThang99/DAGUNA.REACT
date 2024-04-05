import React, { useEffect, useState } from "react";
import "../../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchRoomsAPI } from "../BookingSlide";
import { updateSearchBar, getBookingByIdAPI, updateBooking_EditRoom } from "../BookingSlide";
import BookingDetail from "./BookingDetail";
import HeaderBooking from "./HeaderBooking";
import AppUtil from "../../../services/AppUtil";
import RoomService from "../../../services/RoomService";
import Modal from '@mui/material/Modal';
import Slider from "react-slick";

const steps = ['Rooms', 'Add-Ons', 'Guest Details', 'Confirmation'];


export default function BookingEdit() {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showDetailsBillRoom, setShowDetailsBillRoom] = useState(false);
    const [showDetailsBillService, setShowDetailsBillService] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [bookingDetailChoosen, setBookingDetailChoosen] = useState(null);
    const [adultQuantity, setAdultQuantity] = useState(2);
    const [childQuantity, setChildQuantity] = useState(2);
    const [openImage, setOpenImage] = useState(false);
    const [roomModal, setRoomModal] = useState(null);
    // const [selectedDate, setSelectedDate] = useState(dayjs());
    const [activeStep, setActiveStep] = React.useState(0);
    const dispatch = useDispatch();
    const room = useSelector((state) => state.booking.room);
    const booking = useSelector((state) => state.booking.booking);

    const [value, setValue] = React.useState([
        dayjs(),
        dayjs().add(1, 'day'),
    ]);




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

    const handleOpenImage = async (id) => {
        let room = await RoomService.getRoomById(id);
        setRoomModal(room.data)
        setOpenImage(true);
    }
    const handleCloseImage = () => setOpenImage(false);

    const handleNext = (id) => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        handleNavigateBooking();
        // let bookingId = localStorage.getItem("bookingId");
        dispatch(updateBooking_EditRoom({
            bookingId: booking.bookingId,
            searchBar: room.searchBar,
            roomId: id,
        }))
    };
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
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className="app_container">
                <div className="app_row">
                    <main className="app_col-sm-12 app_col-md-12 app_col-lg-8">
                        <HeaderBooking
                            isExpanded={isExpanded}
                            toggleFlyout={toggleFlyout}
                            decreaseAdultQuantity={decreaseAdultQuantity}
                            adultQuantity={adultQuantity}
                            childQuantity={childQuantity}
                            decreaseChildQuantity={decreaseChildQuantity}
                            handleAdultsChange={handleAdultsChange}
                            increaseAdultQuantity={increaseAdultQuantity}
                            handleApplyChanges={handleApplyChanges}
                            increaseChildQuantity={increaseChildQuantity}
                            value={value}
                            setValue={setValue}
                            steps={steps}
                        />
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
                                                                <button className="thumb-cards_openImage" onClick={() => handleOpenImage(item.id)} />
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
                                                                                        <span>{AppUtil.formatCurrency(item.pricePerNight)}</span>
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
                                            <Modal
                                                open={openImage}
                                                onClose={handleCloseImage}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description">
                                                <div className="gallery_overlay">
                                                    <div className="gallery_popupMainDiv">
                                                        <div className="gallery_header">
                                                            <h2 className="app_modalTitle gallery_imgTitle" id="gallery-header">Garden Balcony King Grand</h2>
                                                            <button className="fa-regular fa-xmark gallery_closeButton" aria-label="close" onClick={handleCloseImage}></button>
                                                        </div>
                                                        <div className="gallery_galleryWrapper">
                                                            <div class="sr-only">Garden Balcony King Grand image 4</div>
                                                            {
                                                                roomModal != null ? <Slider className="fullPageGallery " {...settings}>
                                                                    {roomModal?.imageResDTOS.map((itemImg, key) => (
                                                                        <div className="gallery_imgWrapper">
                                                                            <img src={itemImg.fileUrl} class="" alt="Garden Balcony King Grand image 1" tabindex="-1" />
                                                                        </div>
                                                                    ))}
                                                                </Slider> : null
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </Modal>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </main>
                    <aside className="app_col-sm-12 app_col-md-12 app_col-lg-4">
                        <BookingDetail
                            showDetailsBillRoom={showDetailsBillRoom}
                            setShowDetailsBillRoom={setShowDetailsBillRoom}
                            showDetailsBillService={showDetailsBillService}
                            setShowDetailsBillService={setShowDetailsBillService}
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
