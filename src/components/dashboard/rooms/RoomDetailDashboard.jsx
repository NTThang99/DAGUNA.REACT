import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomService from "../../../services/RoomService";
import AddHomeIcon from '@mui/icons-material/AddHome';
import ModalCreateRoomReal from "./ModalCreateRoomReal";
import RoomRealService from "../../../services/RoomRealService";
import StatusRoomService from "../../../services/StatusRoomService";
import { Button } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


export default function RoomDetailDashboard() {

    const { idRoomDetail } = useParams();
    const [room, setRoom] = useState({})
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [roomReals, setRoomReals] = useState({})


    useEffect(() => {
        setLoading(true)
        try {
            async function getRoomById() {
                let roomDetail = await RoomService.getRoomById(idRoomDetail)
                setRoom(roomDetail?.data)

        
                setLoading(false)
            }
            getRoomById()
        } catch (error) {
            console.log("error", error);
        }

    }, [idRoomDetail])

    const handleShowModalCreateReal = (room) => {
        setShow(true)
    }
    console.log("room img", room?.imageResDTOS?.[0].fileUrl);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        if (currentImageIndex < room?.imageResDTOS?.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const previousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };
    return (
        <>
            {/* room */}
            {
                <div className="d-flex ">
                    <dir className="col-4" style={{ padding: '10px', position: 'relative' }}>
                        {/* <div style={{ position: 'relative', width: '100%', height: '100%' }}> */}
                        <button
                            onClick={previousImage}
                            disabled={currentImageIndex === 0}
                            style={{
                                position: 'absolute',
                                top: '70%', left: '10px',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <FaAngleLeft />
                        </button>
                        <button
                            onClick={nextImage}
                            disabled={currentImageIndex === room?.imageResDTOS?.length - 1}
                            style={{
                                position: 'absolute',
                                top: '70%', right: '10px',
                                transform: 'translateY(-50%)'
                            }}
                        >
                            <FaAngleRight />
                        </button>
                        <label >Image</label>
                        {
                            room?.imageResDTOS?.length > 0 && (<img
                                src={room?.imageResDTOS[currentImageIndex]?.fileUrl}
                                alt={room?.imageResDTOS[currentImageIndex]?.id}
                                style={{ width: '100%', height: '100%', margin: '10px 0' }}
                            />)
                        }
                    </dir>
                    <dir className="row col-8">
                        <div className="">
                            <div className="">
                                <div className="d-flex">
                                    <div className="col-6">
                                        <label >Name</label>
                                        <label >{room?.name}</label>
                                    </div>
                                    <div className="col-6 justify-content-end algin-items-center d-flex">
                                        <div className="d-flex my-1 ">
                                            <button onClick={() => handleShowModalCreateReal(roomReals)}>
                                                <AddHomeIcon className="ml-1" />
                                                Update Room Real
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="col-6 row">


                                        <label >Room type</label>
                                        <label >{room?.roomType}</label>
                                    </div>
                                    <div className="col-6 row">


                                        <label >Kind of room</label>
                                        <label >{room?.kindOfRoom?.name}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div className="d-flex">
                                    <div className="col-4 row">


                                        <label >View type</label>
                                        <label >{room?.viewType}</label>
                                    </div>
                                    <div className="col-4 row">


                                        <label >Acreage</label>
                                        <label >{room?.acreage}</label>
                                    </div>
                                    <div className="col-4 row">

                                        <label >Quantity</label>
                                        <label >{room?.quantity}</label>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="col-4 row">

                                        <label >PerType</label>
                                        <label >{room?.perType?.name}</label>

                                    </div>
                                    <div className="col-4 row">


                                        <label >Sleep</label>
                                        <label >{room?.sleep}</label>
                                    </div>
                                    <div className="col-4 row">

                                        <label >Price Per Night</label>
                                        <label >{room?.pricePerNight}</label>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                Uilities
                            </div>
                            <div className="">
                                Description
                            </div>
                        </div>


                    </dir>
                </div>




                // <div>
                //     <div>
                //         <div className="d-flex flex-column justify-content-center align-items-center">

                //             <AddHomeIcon className="text-success" size={22} role="button" title="add"
                //                 onClick={() => handleShowModalCreateReal(roomReals)}
                //             />
                //         </div>
                //     </div>

                // </div>
            }
            <ModalCreateRoomReal
                show={show}
                handleClose={setShow}

                idRoomDetail={idRoomDetail}

            />
        </>
    )
}