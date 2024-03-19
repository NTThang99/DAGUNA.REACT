import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomService from "../../../services/RoomService";
import AddHomeIcon from '@mui/icons-material/AddHome';
import ModalCreateRoomReal from "./ModalCreateRoomReal";
import RoomRealService from "../../../services/RoomRealService";
import StatusRoomService from "../../../services/StatusRoomService";

export default function RoomDetailDashboard() {

    const { idRoomDetail } = useParams();
    const [room, setRoom] = useState({})
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [roomReals, setRoomReals] = useState({})
    const [roomRealList, setRoomRealList] = useState([])
    const [statusRoomList, setStatusRoomList] = useState([]);

    useEffect(() => {
        setLoading(true)
        try {
            async function getRoomById() {
                let roomDetail = await RoomService.getRoomById(idRoomDetail)
                setRoom(roomDetail?.data)
                
                let dataStatusRoom = await StatusRoomService.getAllStatusRoom("http://localhost:8080/api")
                setStatusRoomList(dataStatusRoom)
                setLoading(false)
            }
            getRoomById()
        } catch (error) {
            console.log("error", error);
        }

    }, [idRoomDetail])

    const handleShowModalCreateReal = (roomReals) => {
        setShow(true)
    }
    useEffect(() => {
        async function getRoomRealById() {
            let roomRealRes = await RoomRealService.getRoomRealById(idRoomDetail)
            setRoomRealList(roomRealRes?.data)
        }
        getRoomRealById()
    }, [])
    return (
        <>

            {

                <div>
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-sm-12">
                            <div className="d-flex justify-content-center algin-items-left">{room?.id}</div>
                            <div className="d-flex justify-content-center algin-items-left">2</div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-12">
                            <div className="d-flex justify-content-center algin-items-right">3</div>
                            <div className="d-flex justify-content-center algin-items-right">4</div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        IMG
                    </div>
                    <div className="d-flex justify-content-center">
                        description
                    </div>
                    <div className="d-flex justify-content-center">
                        utilitie
                    </div>
                    {/* <p>{room?.name}</p>


                    <p>{room?.kindOfRoom?.name}</p>


                    <p>{room?.pricePerNight}</p>

                    <p>{room?.acreage}</p>


                    <p>{room?.roomType}</p>

                    {
                    // room?.images
                    }

                    <p>{room?.statusRoom}</p>

                    <p>{room?.viewType}</p>

                    <p>{room?.perType?.name}</p>

                    <p>{room?.description}</p>
                    <p>{room?.utilitie}</p> */}

                    <div>
                        <div className="d-flex flex-column justify-content-center align-items-center">

                            <AddHomeIcon className="text-success" size={22} role="button" title="add"
                                onClick={() => handleShowModalCreateReal(roomReals)}
                            />
                        </div>
                    </div>

                </div>
            }
            <ModalCreateRoomReal
                show={show}
                handleClose={setShow}
                // roomReals={roomReals}
                // setRoomReals={setRoomReals}
                roomRealList={roomRealList}
                 setRoomRealList={setRoomRealList}
                idRoom={room?.id}
            />
        </>
    )
}