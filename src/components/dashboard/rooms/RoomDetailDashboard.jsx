import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoomService from "../../../services/RoomService";
import AddHomeIcon from '@mui/icons-material/AddHome';
import ModalCreateRoomReal from "./ModalCreateRoomReal";
import RoomRealService from "../../../services/RoomRealService";
import StatusRoomService from "../../../services/StatusRoomService";
import { Button } from "react-bootstrap";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ViewTypeService from "../../../services/ViewTypeService";
import RoomTypeService from "../../../services/RoomTypeService";
import UtilityService from "../../../services/UtilityService";


export default function RoomDetailDashboard() {

    const { idRoomDetail } = useParams();
    const [room, setRoom] = useState({})
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [roomReals, setRoomReals] = useState({})
    const [viewType, setViewType] = useState();
    const [roomType, setRoomType] = useState();
    const [utilityList, setUtilityList] = useState([]);

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
    useEffect(() => {
        async function loadData() {
            let dataViewType = await ViewTypeService.getAllViewType();
            let dataRoomType = await RoomTypeService.getAllRoomType()
            let dataUtility = await UtilityService.getAllUtility()
            if (Object.keys(room).length > 0) { // Kiểm tra xem room đã được thiết lập chưa
                setLoading(true); // Bắt đầu loading mới
                for (let index = 0; index < dataViewType?.data.length; index++) {
                    if (room?.viewType === dataViewType?.data[index].eviewTypeName) {
                        setViewType(dataViewType?.data[index].eviewTypeTitle);
                        break
                    }
                }
                for (let index = 0; index < dataRoomType?.data.length; index++) {
                    if (room?.roomType === dataRoomType?.data[index].eroomName) {
                        setRoomType(dataRoomType?.data[index].eroomTitle);
                        break
                    }
                }
                let utilityNames = [];
                let arrUtilities = JSON.parse(room?.utilitie);
                for (let index = 0; index < arrUtilities.length; index++) {
                    let utilityId = arrUtilities[index];
                    let matchedUtility = dataUtility?.data.find((utility) => (utility.id === utilityId));
                    if (matchedUtility) {
                        utilityNames.push(matchedUtility.name);
                    }
                }
                setUtilityList(utilityNames); // Thêm tên của tiện ích phù hợp vào mảng
                setLoading(false); // Kết thúc loading
            }
        }

        loadData();
    }, [room])
    const handleShowModalCreateReal = (room) => {
        setShow(true)
    }
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
                loading ? <></> : (
                    <div className="d-flex ">
                        <dir className="col-4" style={{ padding: '10px', position: 'relative' }}>
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
                            {/* <label >Image</label> */}
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
                                <div className="" style={{ paddingBottom: "20px" }}>
                                    <div>

                                    </div>
                                    <div className="d-flex" >
                                        <div className="col-9">
                                            <label style={{ fontSize: '25px' }}>{room?.kindOfRoom?.name}</label>


                                        </div>
                                        <div className="col-3 justify-content-end algin-items-center d-flex">
                                            <div className="d-flex my-1 ">
                                                <button onClick={() => handleShowModalCreateReal(roomReals)}>
                                                    <AddHomeIcon className="ml-1" />
                                                    Update Room
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>

                                    </div>
                                    <div className="d-flex">
                                        <div className="col-6 row">
                                            <div className="col-6 justify-content-end d-flex"><label >{room?.name}</label></div>
                                        </div>
                                        <div className="col-3 row">
                                            <label >{roomType}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="d-flex pb-2 ">
                                        <div className="col-4 row">
                                            <label className="pb-2">View type</label>
                                            <label className="ps-4">{viewType}</label>
                                        </div>
                                        <div className="col-4 row">
                                            <label className="pb-2">Acreage</label>
                                            <label className="ps-4" >{room?.acreage} m²</label>
                                        </div>
                                        <div className="col-4 row">
                                            <label className="pb-2">Quantity room</label>
                                            <label className="ps-4">{room?.quantity}</label>
                                        </div>
                                    </div>
                                    <div className="d-flex">
                                        <div className="col-4 row">
                                            <label className="pb-2">PerType</label>
                                            <label className="ps-4">{room?.perType?.name}</label>
                                        </div>
                                        <div className="col-4 row">
                                            <label className="pb-2">Sleep </label>
                                            <label className="ps-4">{room?.sleep} (per/room)</label>
                                        </div>
                                        <div className="col-4 row">
                                            <label className="pb-2">Price</label>
                                            <label className="ps-4">{room?.pricePerNight?.toLocaleString('vi-VN')} VNĐ</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div><label >Utilities</label></div>
                                    <div className="row mb-3">
                                        {/* <div className="d-flex flex-wrap "  style={{width: "100%" , paddingLeft: "150px"}}> */}
                                        {utilityList?.map((u) => (
                                            <div key={u} className="col-md-4 col-lg-4 col-sm-12 mb-1" >
                                                <div className="mb-2 ps-4">
                                                    <label >{u}</label>
                                                </div>
                                            </div>
                                        ))}
                                        {/* </div> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="pb-2">Description</label>
                                    <label className="ps-4">{room?.description}</label>
                                </div>
                            </div>
                        </dir>
                    </div>
                )
            }
            <ModalCreateRoomReal
                show={show}
                handleClose={setShow}
                idRoomDetail={idRoomDetail}
            />
        </>
    )
}