import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import { getAllRoomsAPI } from "../../home/Slide/RoomSlide";
import EditIcon from '@mui/icons-material/Edit';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { useDispatch, useSelector } from "react-redux";
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import RoomService from "../../../services/RoomService";
import RoomTypeService from "../../../services/RoomTypeService";
import StatusRoomService from "../../../services/StatusRoomService";


export default function RoomList() {
    const [roomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false)
    const [room, setRoom] = useState(null)
    const [filters, setFilters] = useState({
        direction: '',
        page: 0,
        size: 5,
        kw: "",
        statusRoom: "READY",
        roomType: "SUPERIOR",
        sortByField: "name",        // name, price
        orderBySort: "desc",        // desc, asc
    })
    const [totalPages, setTotalPages] = useState(0)
    const [roomTypeList, setRoomTypeList] = useState([]);
    const [statusRoomList, setStatusRoomList] = useState([]);

    function calculateUrl(filters) {
        let urlArray = [];
        if (filters.kw !== "") {
            urlArray.push(`kw=${filters.kw}`)
        }
        urlArray.push(`page=${filters.page}`);
        urlArray.push(`size=${filters.size}`);
        urlArray.push(`statusRoom=${filters.statusRoom}`);
        urlArray.push(`roomType=${filters.roomType}`);
        urlArray.push(`sort=${filters.sortByField},${filters.orderBySort}`);

        return urlArray.join("&");
    }

    // console.log(`http:localhost:8080/api/rooms/filters?` + calculateUrl(filters));
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.room.data);
    useEffect(() => {
        dispatch(getAllRoomsAPI("http://localhost:8080/api/rooms"));
    }, []);
    
    useEffect(() => {
        async function getFilter() {
            let dataRoomType = await RoomTypeService.getAllRoomType("http://localhost:8080/api/erooms")
            setRoomTypeList(dataRoomType)

            let dataStatusRoom = await StatusRoomService.getAllStatusRoom("http://localhost:8080/api/estatus")
            setStatusRoomList(dataStatusRoom)
        }
        getFilter()
    }, [])
    console.log("statusRoomList", statusRoomList);
    useEffect(() => {
        async function getAllRoomFilter() {
            try {
                let roomFilters = await RoomService.getAllRoomByFilter(`/rooms/filters?` + calculateUrl(filters))
                let result = roomFilters?.data?.content
                let toTalPage = Math.ceil(Number(result?.length) / Number(filters.size))
                setTotalPages(toTalPage)
                setRoomList(result)


            } catch (error) {
                console.log(error);
            }
        }
        getAllRoomFilter()
    }, [filters, totalPages])

    const handleClickNextPage = () => {
        if (filters.page < totalPages) {
            setFilters({
                ...filters,
                page: Number(filters.page) + 1,
                direction: 'next'
            })
        }
    }
    const handleClickPrevPage = () => {
        if (filters.page > 0) {
            setFilters({
                ...filters,
                page: Number(filters.page) - 1,
                direction: 'prev'
            })
        }
    }
    const handleEditRoom = (room) => {
        setShow(true)
        setRoom(room)
    }
    const handleRemoveRoom = () => { }
    return (
        <>
            <div>
                <input type="text" placeholder="Search Room By Name" />
            </div>
            <div>
                <div>
                    <label >Filter for room status</label>
                    <select defaultValue={""}>
                        <option value="">Select Filter</option>
                        {
                            statusRoomList?.map((stt) => {
                                <option key={stt?.estatusName} value={stt?.estatusName}>{stt?.estatusTitle}</option>
                            })
                        }

                        {/* statusRoom: "READY",
        roomType: "SUPERIOR", */}
                    </select>
                </div>
            </div>
            <div>
                <span></span>
            </div>
            {
                loading ? (<span className="spinner-border text-primary spinner-border-sm" role="status" aria-hidden="true"></span>) :
                    (<Table size="small" className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                        <TableHead >
                            <TableRow className="table-secondary">
                                <TableCell className="text-center">Id</TableCell>
                                <TableCell className="text-center">Name</TableCell>
                                <TableCell className="text-center">Type</TableCell>
                                <TableCell className="text-center">Status</TableCell>
                                <TableCell className="text-center">Per type</TableCell>
                                <TableCell className="text-center">Sleeper</TableCell>
                                <TableCell className="text-center">Price</TableCell>
                                <TableCell className="text-center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roomList?.map((room) => (
                                <>

                                    <TableRow key={`room_${room?.id}`}>
                                        {/* <Link to={`/dashboard/rooms/${room?.id}`}> */}
                                        <TableCell className="text-center">{room?.id}</TableCell>
                                        <TableCell className="text-center align-middle">{room?.name}</TableCell>
                                        <TableCell className="text-center align-middle">{room?.roomType}</TableCell>
                                        <TableCell className="text-center align-middle">{room?.statusRoom}</TableCell>
                                        <TableCell className="text-center align-middle">{room?.perType?.name}</TableCell>
                                        <TableCell className="text-center align-middle">{room?.sleep}</TableCell>
                                        <TableCell className="text-center align-middle">{room?.pricePerNight}</TableCell>
                                        {/* </Link> */}
                                        <TableCell className="text-center d-flex align-items-center">
                                            <Link className="mx-1" to={`/dashboard/rooms/${room?.id}`}>
                                                <BiCommentDetail style={{ color: 'orange' }} size={22} title="edit" role="button"
                                                />

                                            </Link>
                                            <div className="mx-1">
                                                <EditIcon style={{ color: 'green' }} size={22} title="edit" role="button"
                                                    onClick={() => handleEditRoom(room)} />

                                            </div>
                                            <div className="mx-1">
                                                <PlaylistRemoveIcon style={{ color: 'red' }} size={22} title="remove" role="button"
                                                    onClick={() => handleRemoveRoom(room)} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </>
                            ))}
                        </TableBody>
                    </Table >)
            }
            <div className="d-flex align-items-center justify-content-between">
                <ul className="pagination">
                    <li className="page-items"><button onClick={handleClickPrevPage}>prev</button></li>
                    <li className="page-items"><button onClick={handleClickNextPage}>next</button></li>
                </ul>
            </div>
        </>
    );
}
