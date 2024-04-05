import React, { useEffect, useState } from "react";
import "../../../css/booking.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from "react-slick";
import SliderPrice from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bookingReducer from "../BookingSlide";
import {
  updateSearchBar,
  createBookingAPI,
  getBookingByIdAPI,
  updateBooking_AddRoomAPI,
  findAvailableRoomHavePerAPI,
  findSortRoomHavePerAPI,
  updateBooking_DeleteBookingService
} from "../BookingSlide";
import BookingDetail from "./BookingDetail";
import HeaderBooking from "./HeaderBooking";
import RoomService from "../../../services/RoomService";

const steps = ['Rooms', 'Add-Ons', 'Guest Details', 'Confirmation'];
let mapAge = new Map();
export default function Booking() {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFocusedView, setIsFocusedView] = useState(false);
  const [isFocusedSort, setIsFocusedSort] = useState(false);
  const [isFocusedFilter, setIsFocusedFilter] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showDetailsBillService, setShowDetailsBillService] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openView, setOpenView] = React.useState(null);
  const [openSort, setOpenSort] = React.useState(null);
  const [openFilter, setOpenFilter] = useState(false);
  const [bookingDetailChoosen, setBookingDetailChoosen] = useState(null);
  const [adultQuantity, setAdultQuantity] = useState(2);
  const [childQuantity, setChildQuantity] = useState(0);
  const [childAges, setChildAges] = useState([]);

  const [activeStep, setActiveStep] = React.useState(0);
  const dispatch = useDispatch();
  const room = useSelector((state) => state.booking.room);
  const booking = useSelector((state) => state.booking.booking);
  const loading = useSelector((state) => state.loading);
  // const imageResDTOS = useSelector((room) => room.imageResDTOS);

  const [roomModal, setRoomModal] = useState(null);
  const [value, setValue] = React.useState([
    dayjs(),
    dayjs().add(1, 'day'),
  ]);
  const [valuePrice, setValuePrice] = React.useState([1000000, 20000000]);

  // const [value, setValue] = React.useState(dayjs("2022-04-17T15:30"));

  const toggleFlyout = () => {
    setIsExpanded(!isExpanded);
  };
  const decreaseAdultQuantity = () => {
    if (adultQuantity > 1) {
      setAdultQuantity(adultQuantity - 1);
    }
  };
  const openViews = Boolean(openView);
  const openSorts = Boolean(openSort);
  const openFilters = Boolean(openFilter);

  const handleClickView = (event) => {
    setIsFocusedView(true);
    setOpenView(event.currentTarget);
  };
  const handleCloseView = () => {
    setIsFocusedView(false);
    setOpenView(null);
  };
  const handleClickSort = (event) => {
    setIsFocusedSort(true);
    setOpenSort(event.currentTarget);
  };
  const handleCloseSort = () => {
    setIsFocusedSort(false);
    setOpenSort(null);
  };
  const handleClickFilter = () => {
    setIsFocusedFilter(!isFocusedFilter);
    // setOpenFilter(event.currentTarget);
    setOpenFilter(!openFilter);
  };
  const handleCloseFilter = () => {
    setIsFocusedFilter(false);
    setOpenFilter(false);
  };
  const increaseAdultQuantity = () => {
    setAdultQuantity(adultQuantity + 1);
  };
  const decreaseChildQuantity = () => {
    if (childQuantity > 0) {
      setChildQuantity(childQuantity - 1);
      setChildAges(prevAges => prevAges.slice(0, -1));
    }
  };
  const increaseChildQuantity = () => {
    setChildQuantity(childQuantity + 1);
    setChildAges(prevAges => [...prevAges, ""]);
  };
  const handleOpen = async (id) => {
    // lay room theo id => room
    let room = await RoomService.getRoomById(id);
    setRoomModal(room.data)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleOpenImage = async (id) => {
    let room = await RoomService.getRoomById(id);
    setRoomModal(room.data)
    setOpenImage(true);
  }
  const handleCloseImage = () => setOpenImage(false);
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
        roomId: id,
        numberAdult: room.searchBar.guests.numberAdult,
        childrenAges: room.searchBar.guests.childrenAges,
      }));
    } else {
      dispatch(updateBooking_AddRoomAPI({
        bookingId: booking.bookingId,
        roomId: id,
        searchBar: room.searchBar,
        numberAdult: room.searchBar.guests.numberAdult,
        childrenAges: room.searchBar.guests.childrenAges,
      }));
    }
  };
  const handleNavigateBooking = () => {
    navigate(`/booking/addons`);
  };
  const handleAdultsChange = (event) => {
    const newAdultQuantity = parseInt(event.target.value); // Lấy giá trị mới từ trường input

    dispatch(updateSearchBar({ guests: { numberAdult: newAdultQuantity } }));
  };
  const handleCurrent = () => {
    mapAge.set("lessthan4", 0);
    mapAge.set("greatthan4", 0);
    for (let i = 0; i < childAges.length; i++) {
      if (childAges[i] < 4) {
        mapAge.set("lessthan4", mapAge.get("lessthan4") + 1)
      } else {
        mapAge.set("greatthan4", mapAge.get("greatthan4") + 1)
      }
    }
    if (mapAge.get("lessthan4") == 1) {
      mapAge.set("lessthan4", 0)
    }
  }
  const handleApplyChanges = () => {
    // Gọi hàm dispatch để cập nhật dữ liệu vào Redux Store
    handleCurrent();
    let current = adultQuantity + mapAge.get("greatthan4") + Math.ceil(mapAge.get("lessthan4") / 2);

    dispatch(findAvailableRoomHavePerAPI({
      current: current,
      checkIn: room.searchBar.checkIn,
      checkOut: room.searchBar.checkOut,
      numberAdult: adultQuantity,
      childrenAges: childAges
    }));
    toggleFlyout();
  };
  const handleCheckChange = (newValue) => {
    let checkIn = newValue[0];
    let checkOut = newValue[1];

    if (checkOut.isBefore(checkIn, 'day')) {
      checkOut = checkIn.add(1, 'day');
    }
    checkIn = checkIn.format('DD-MM-YYYY');
    checkOut = checkOut.format('DD-MM-YYYY');

    dispatch(findAvailableRoomHavePerAPI({
      checkIn: room.searchBar.checkIn,
      checkOut: room.searchBar.checkOut,

    }));
  };
  const handleChange = (index, event) => {
    const newAges = [...childAges];
    newAges[index] = event.target.value;
    setChildAges(newAges);
  };

  const handlePrice = (event, newValue) => {
    setValuePrice(newValue);
  };
  const handleSortByChange = (evt) => {
    dispatch(bookingReducer.actions.handleSortByChange(evt.target.value))
  }
  const handleViewTypeChange = (evt) => {
    dispatch(bookingReducer.actions.handleViewTypeChange(evt.target.value))
  }
  const handleBedTypeChange = (evt) => {
    dispatch(bookingReducer.actions.handleBedTypeChange(evt.target.value))
  }
  const handleApplyFilter = () => {

    handleCurrent();
    let current = adultQuantity + mapAge.get("greatthan4") + Math.ceil(mapAge.get("lessthan4") / 2);
    dispatch(findSortRoomHavePerAPI({
      current: current,
      viewType: room.searchBar.viewType,
      sortBy: room.searchBar.sortBy,
      bedType: room.searchBar.bedType,
      minMaxPrice: valuePrice,
      checkIn: room.searchBar.checkIn,
      checkOut: room.searchBar.checkOut
    }));
  };

  const handleDeleteBookingService = (bookingServiceId, bookingDetailId) => {
    let bookingId = localStorage.getItem("bookingId");

    dispatch(updateBooking_DeleteBookingService(
      { bookingId, bookingDetailChoosen: bookingDetailId, bookingServiceId }
    ))
  };


  useEffect(() => {
    dispatch(findAvailableRoomHavePerAPI({
      checkIn: room.searchBar.checkIn,
      checkOut: room.searchBar.checkOut,
      current: 0,
      numberAdult: room.searchBar.guests.numberAdult,
      childrenAges: room.searchBar.guests.childrenAges,
    }));
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

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
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
              childAges={childAges}
              handleChange={handleChange}
              handleCheckChange={handleCheckChange}
              dayjs={dayjs}
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
                        className={`select_container select_hasValue ${isFocusedView ? 'focused' : ''}`}
                        data-error="false"
                      >
                        <button
                          aria-controls={openViews ? 'select-dropdown-wrapper-view-results-by-room-rate' : undefined}
                          aria-expanded={openViews ? 'true' : undefined}
                          className="select_hiddenInput"
                          aria-labelledby="view-results-by-room-rate"
                          value="room"
                          tabIndex="0"
                          onClick={handleClickView}
                        // onClick={handleSearchRooms}
                        ></button>
                        <div className="select_input" data-selector={openView ? 'false' : undefined}>
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
                        <Menu
                          anchorEl={openView}
                          showView={openViews}
                          open={openView}
                          onClose={handleCloseView}
                        >
                          <MenuItem onClick={handleClose}>Rooms</MenuItem>
                          <MenuItem onClick={handleClose}>Rates</MenuItem>
                        </Menu>
                        <div role="alert"></div>
                      </div>
                    </div>
                    <div
                      className="filter-bar_sortBy filter-bar-select_container"
                      datatest="sort-by-select"
                    >
                      <div
                        className={`select_container select_hasValue ${isFocusedSort ? 'focused' : ''}`}
                        data-error="false"
                      >
                        <button
                          aria-controls={openSorts ? 'select-dropdown-wrapper-s' : undefined}
                          aria-expanded={openSorts ? 'true' : undefined}
                          className="select_hiddenInput"
                          aria-labelledby="Sort By"
                          value="sort"
                          tabIndex="0"
                          onClick={handleClickSort}
                        ></button>
                        <div className="select_input" data-selector={openSort ? 'false' : undefined}>
                          <label
                            className="select_label"
                          >
                            Sort By{" "}
                          </label>
                          <span className="select_value">Lowest Price</span>
                          <span className="select_caret" aria-hidden="true">
                            <i className="select_caret_icon fa-solid fa-caret-down"></i>
                          </span>
                        </div>
                        <Menu
                          anchorEl={openSort}
                          showView={openSorts}
                          open={openSort}
                          onClose={handleCloseSort}
                        >
                          <MenuItem onClick={handleClose}>Lowest Price</MenuItem>
                          <MenuItem onClick={handleClose}>Highest Price</MenuItem>
                        </Menu>
                        <div role="alert"></div>
                      </div>
                    </div>
                    <div
                      className="filter-bar_filterLink"
                      datatest="sort-by-select"
                    >
                      <div
                        className={`select_container select_hasValue ${isFocusedFilter ? 'focused' : ''}`}
                        data-error="false"
                      >
                        <button
                          aria-controls={openFilters ? 'select-dropdown-wrapper-s' : undefined}
                          aria-expanded={openFilters ? 'true' : undefined}
                          className="select_hiddenInput"
                          aria-labelledby="Show Filters"
                          value="filter"
                          tabIndex="0"
                          onClick={handleClickFilter}
                        ></button>
                        <div className="select_input" data-selector={openFilter ? 'false' : undefined}>
                          <span className="select_value">Show Filters</span>
                          <span className="select_caret" aria-hidden="true">
                            <i className="select_caret_icon fa-solid fa-caret-down"></i>
                          </span>
                        </div>
                        <div role="alert"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {openFilter && (
                <Box
                  className="filter-bar_flyoutBox"
                  anchorEl={openFilter}
                  showView={openFilters}
                  open={openFilter}
                  onClose={handleCloseFilter}
                >
                  <span className="filter-bar_caret"></span>
                  <div className="filter-bar_flyoutHeader" >
                    <h3 className="app_heading1" >
                      <span>Filters</span>
                    </h3>
                  </div>
                  <div className="filter-bar_flyoutBodyWrapper">
                    <div className="filter-bar_flyoutBody">
                      <FormControl className="filter-bar_filterBox">
                        <FormLabel className="filter-bar_header">
                          <h4 className="app_heading2">
                            <span>Sort By</span>
                          </h4>
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel value="ASC"
                            checked={room.searchBar.sortBy === 'ASC'}
                            onChange={handleSortByChange} control={<Radio />} label="Lowest Price" />
                          <FormControlLabel value="DESC"
                            checked={room.searchBar.sortBy === 'DESC'} onChange={handleSortByChange} control={<Radio />} label="Highest Price" />
                        </RadioGroup>
                      </FormControl>
                      <FormControl className="filter-bar_filterBox">
                        <FormLabel className="filter-bar_header">
                          <h4 className="app_heading2">
                            <span>View</span>
                          </h4>
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel value="OTHER"
                            checked={room.searchBar.viewType === 'OTHER'}
                            onChange={handleViewTypeChange} control={<Radio />} label="Other" />
                          <FormControlLabel value="GARDEN_VIEW"
                            checked={room.searchBar.viewType === 'GARDEN_VIEW'} onChange={handleViewTypeChange} control={<Radio />} label="Garden view" />
                          <FormControlLabel value="SEA_VIEW"
                            checked={room.searchBar.viewType === 'SEA_VIEW'} onChange={handleViewTypeChange} control={<Radio />} label="Sea view" />
                        </RadioGroup>
                      </FormControl>
                      <FormControl className="filter-bar_filterBox">
                        <FormLabel className="filter-bar_header">
                          <h4 className="app_heading2">
                            <span>Bed Type</span>
                          </h4>
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel value="DOUBLE"
                            checked={room.searchBar.bedType === 'DOUBLE'}
                            onChange={handleBedTypeChange} control={<Radio />} label="Double" />
                          <FormControlLabel value="KING"
                            checked={room.searchBar.bedType === 'KING'} onChange={handleBedTypeChange} control={<Radio />} label="King" />
                          <FormControlLabel value="TWIN"
                            checked={room.searchBar.bedType === 'TWIN'} onChange={handleBedTypeChange} control={<Radio />} label="Twin" />
                          <FormControlLabel value="VARIOUS"
                            checked={room.searchBar.bedType === 'VARIOUS'} onChange={handleBedTypeChange} control={<Radio />} label="Various Bed Types" />
                        </RadioGroup>
                      </FormControl>

                      <div className="filter-bar_filterBox">
                        <div className="filter-bar_header">
                          <h4 className="app_heading2">Price (avg./night)</h4>
                        </div>
                        <Box sx={{ width: 300 }}>
                          <SliderPrice className="slider_price"
                            getAriaLabel={() => 'Temperature range'}
                            value={valuePrice}
                            onChange={handlePrice}
                            valueLabelDisplay="auto"
                            valueLabelFormat={value => formatCurrency(value)}
                            min={1000000}
                            max={30000000}
                          />
                        </Box>
                        <Box className="slider_leftNumberEditor"
                          component="form"
                          noValidate
                          autoComplete="off"
                        >
                          <TextField style={{
                            border: "1px solid black"
                          }}
                            id="standard-helperText"
                            label="Price range from"
                            defaultValue={formatCurrency(valuePrice[0])}
                            variant="standard"
                            value={formatCurrency(valuePrice[0])}
                          />
                        </Box>
                        <div class="slider_separator">-</div>
                        <Box className="slider_rightNumberEditor"
                          component="form"
                          noValidate
                          autoComplete="off"
                        >
                          <TextField style={{
                            border: "1px solid black"
                          }}
                            id="standard-helperText"
                            label="Price range to"
                            defaultValue={formatCurrency(valuePrice[1])}
                            variant="standard"
                            value={formatCurrency(valuePrice[1])}
                          />
                        </Box>
                        <div className="filter-bar_optionsFooter">
                          <div className="filter-bar_clear app_small">
                            <a aria-label="Reset Price (avg./night) Filter" tabindex="0">
                              <span>Reset</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="filter-bar_flyoutFooter">
                    <div>
                      <button className="button_btn button_primary button_sm" style={{ height: "40px" }} onClick={handleCloseFilter}>
                        <span>Cancel</span>
                      </button>
                    </div>
                    <div style={{ paddingLeft: "20px" }}>
                      <button className="button_btn button_primary button_sm" style={{ height: "40px" }} onClick={handleApplyFilter}>
                        <span>Apply</span>
                      </button>
                    </div>
                  </div>
                </Box>
              )}
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
                                <h2 className="app_heading1">{item.name}</h2>
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
                              <div className="thumb-cards_detailsLink">
                                <Button className="roomdetails" onClick={() => handleOpen(item.id)}>Room details</Button>
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
                                            <span>{formatCurrency(item.pricePerNight)}</span>
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
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <div className="modal-message_modalMessage ">
                          <div className="modal-message_closeButtonWrapper">
                            <div className="fa-solid fa-xmark modal-message_closeButton " onClick={handleClose}></div>
                          </div>
                          <div className="modal-message_contentWrapper">
                            <div className="app_container">
                              <div className="app_row">
                                <div className="app_col-sm-12 app_col-md-6 app_col-lg-6 app_push-md-6 app_push-lg-6">
                                  <div className="thumb-cards_imgWrapper thumb-cards_hasMultipleImages">
                                    <button className="thumb-cards_openImage" onClick={() => handleOpenImage(item.id)}></button>
                                    <img className="thumb-cards_image" src={roomModal?.imageResDTOS.length == 0 ? "" : roomModal?.imageResDTOS[0].fileUrl} />
                                  </div>
                                </div>
                                <div className="app_col-sm-12 app_col-md-6 app_col-lg-6 app_pull-md-6 app_pull-lg-6">
                                  <h2 className="detail-view-room_roomName app_modalTitle">{roomModal?.name}</h2>
                                  <div className="guests-and-roomsize_roomProperties guests-and-roomsize_bold">
                                    <div className="guests-and-roomsize_item guests-and-roomsize_guests">
                                      <span>Guests {roomModal?.sleep}</span>
                                    </div>
                                    <div className="guests-and-roomsize_item guests-and-roomsize_bed">
                                      <span>1 King</span>
                                    </div>
                                    <div className="guests-and-roomsize_item guests-and-roomsize_size">53 <span aria-hidden="true" for="room-size-meters-sreader-undefined">
                                      <span>m²</span>
                                    </span>
                                      <span className="sr-only" id="room-size-meters-sreader-undefined">square meters</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="app_col-sm-12 app_col-md-12 app_col-lg-12">
                                  <hr className="detail-view-room_line" />
                                  <div className="detail-view-room_shortDescription">{roomModal?.description}</div>
                                  <div className="detail-view-room_longDescription">
                                    <p>Wake up refreshed to breathtaking views of the Truong Son mountain range from the comfort of your king-size bed, and step out onto your private balcony to enjoy the fresh air. Our Garden Balcony King Grand rooms feature a mix of traditional Vietnamese accents with the convenience of modern amenities, such as satellite TV channels, rain showers and complimentary Wi-Fi</p>
                                    <br />
                                    <strong>Amenities</strong>
                                    <br />
                                    <em>Connectivity &amp; Entertainment</em>
                                    <ul>
                                      <li>Wi-Fi </li>
                                      <li>Television</li>
                                      <li>IDD telephone</li>
                                      <li>Audio system </li>
                                    </ul>
                                    <br />
                                    <em>Bathroom</em>
                                    <ul>
                                      <li>Toiletries</li>
                                      <li>Dressing robes</li>
                                      <li>Hairdryer</li>
                                    </ul>
                                    <br />
                                    <em>Other Services, features &amp; Amenities</em>
                                    <ul>
                                      <li>Air-conditioning</li>
                                      <li>Coffee/ tea making facilities replenished daily</li>
                                      <li>In-room safe</li>
                                    </ul>
                                  </div>
                                  <div className="thumb-cards_button">
                                    <div style={{ textAlign: 'end' }}>
                                      <button className="btn button_btn button_primary button_sm" style={{ height: '35px' }} datatest="Button">
                                        <span onClick={() => {
                                          handleNext(roomModal.id);
                                          handleChooseBookingDetail(roomModal.id);
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
                      </Modal>
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
              showDetails={showDetails}
              setShowDetails={setShowDetails}
              showDetailsBillService={showDetailsBillService}
              setShowDetailsBillService={setShowDetailsBillService}
              toggleForm={toggleForm}
              showForm={showForm}
              cancelForm={cancelForm}
              adultQuantity={adultQuantity}
              childQuantity={childQuantity}
              handleNext={handleNext}
              handleChooseBookingDetail={handleChooseBookingDetail}
              loading={loading}
              handleDeleteBookingService={handleDeleteBookingService}
            />
          </aside>
        </div>
      </div>
    </>
  );
}

