import React from "react";
import CommonHeading from "../common/CommonHeading";
import { facility, roomItems } from "../data/Data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/room.css"
import { useNavigate } from "react-router-dom";

const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='next'>
        <i className='fa fa-long-arrow-alt-right'></i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className='control-btn' onClick={onClick}>
      <button className='prev'>
        <i className='fa fa-long-arrow-alt-left'></i>
      </button>
    </div>
  )
}


export default function Rooms() {
  const navigate = useNavigate();

  const handleNavigateRoom = (roomName) => {
    navigate(`/rooms/${roomName}`);
  };

  const handleNavigateBooking = (roomName) => {
    navigate(`/booking/${roomName}`);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        },
      },
    ],
  }

  return (
    <>
      <div className="container-xxl py-5">
        <div className="container">
          <CommonHeading
            heading="Our Rooms"
            title="Rooms"
            subtitle="Explore Our"
          />
          <div className="row g-4">
            <Slider {...settings}>
              {roomItems.map((item, key) => (
                <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                  <div className="room-item shadow rounded overflow-hidden">
                    <div className="position-relative">
                      <img className="img-fluid" style={{ width: '100%', height: '300px' }} src={item.img} alt="img" />
                      <small className="position-absolute start-0 top-100 translate-middle-y bg-primary text-white rounded py-1 px-3 ms-4">
                        {item.price}
                      </small>
                    </div>
                    <div className="p-4 mt-2">
                      <div className="d-flex justify-content-between mb-3">
                        <h5 style={{ fontSize: '16px' }} className="mb-0">{item.name}</h5>
                        <div className="ps-2">{item.star}</div>
                      </div>
                      <div className="d-flex mb-3">
                        {facility.map((item, index) => (
                          <small className="border-end me-3 pe-3">
                            {item.icon}
                            {item.quantity} {item.facility}
                          </small>
                        ))}
                      </div>
                      <p className="text-body mb-3">{item.description}</p>
                      <div className="d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-primary rounded py-2 px-4"
                          onClick={() => handleNavigateRoom(item.url)}
                        >
                          {item.yellowbtn}
                        </button>
                        <button
                          className="btn btn-sm btn-dark rounded py-2 px-4"
                          onClick={() => handleNavigateBooking(item.url)}
                        >
                          {item.darkbtn}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
