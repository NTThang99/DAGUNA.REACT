import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";

import EditIcon from '@mui/icons-material/Edit';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import RoomService from "../../../services/RoomService";
import RoomTypeService from "../../../services/RoomTypeService";
import SearchIcon from '@mui/icons-material/Search';
import ModalEditRoom from "./ModalEditRoom";
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import RoomRealService from "../../../services/RoomRealService";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function RoomList() {
    const [roomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false)
    const [roomInfo, setRoomInfo] = useState({})
    const [filters, setFilters] = useState({
        direction: '',
        page: 0,
        size: 5,
        kw: "",
        roomType: "",
        sortByField: "id",        // name, price
        orderBySort: "asc",        // desc, asc
        minPrice: "",
        maxPrice: "",
    })
    const [totalPages, setTotalPages] = useState(0)
    const [roomTypeList, setRoomTypeList] = useState([]);
    const [keyword, setKeyword] = useState(null)
    const [selectDate, setSelectDate] = useState([
        dayjs(),
        dayjs().add(1, 'day')
    ])
    const [loadingSelectDay, setLoadingSelectDay] = useState(false)
    const selectFirstDay = selectDate[0];
    const selectLastDay = selectDate[1];
    const [objSelectDay, setObjSelectDay] = useState({
        selectFirstDay: selectFirstDay.toDate(),
        selectLastDay: selectLastDay.toDate()
    })
    const [dataRoomFind, setDataRoomFind] = useState([])
    const [dataRoomRealFind, setDataRoomRealFind] = useState([])
    const [loadDataRoomReal, setLoadDataRoomReal] = useState(false)
    const [dataRoomRealUnAvailableFind, setDataRoomRealUnAvailableFind] = useState([])
    const [loadDataRoomRealUnAvailable, setLoadDataRoomRealUnAvailable] = useState(false)
    function calculateUrl(filters) {
        let urlArray = [];
        if (filters.kw !== "") {
            urlArray.push(`kw=${filters.kw}`)
        }
        urlArray.push(`page=${filters.page}`);
        urlArray.push(`size=${filters.size}`);
        if (filters.statusRoom !== "") {
            urlArray.push(`statusRoom=${filters.statusRoom}`);
        }
        if (filters.roomType !== "") {
            urlArray.push(`roomType=${filters.roomType}`);
        }
        urlArray.push(`sort=${filters.sortByField},${filters.orderBySort}`);

        return urlArray.join("&");
    }

    useEffect(() => {
        setLoading(true)
        async function getFilter() {
            let dataRoomType = await RoomTypeService.getAllRoomType()
            setRoomTypeList(dataRoomType?.data)
            setLoading(false)
        }
        getFilter()
    }, [])
    useEffect(() => {
        async function getAllRoomFilter() {
            try {
                let roomFilters = await RoomService.getAllRoomByFilter(`/rooms/filters?` + calculateUrl(filters))
                let result = roomFilters?.data?.content
                let totalPage = roomFilters?.data?.totalPages
                setTotalPages(totalPage)
                setRoomList(result)
            } catch (error) {
                console.log("error", error);
                toast.error('Lỗi dữ liệu/ hệ thống')
            }
        }
        getAllRoomFilter()
    }, [filters, totalPages, roomInfo])
    const handleClickSelectDay = (newDates) => {
        setSelectDate(newDates)
        const [firstDay, lastDay] = newDates;
        setObjSelectDay({
            selectFirstDay: firstDay.toDate(),
            selectLastDay: lastDay.toDate()
        });
        // handleClickFind(newDates);
    }


    const handleClickFind = async (values) => {
        values = {
            ...values
        }

        setLoadingSelectDay(true)
        try {
            // let roomrealRes = await RoomRealService.postFindAvailableRoomReal(objSelectDay)
            let roomrealRes = await RoomRealService.postFindAvailableRoom(objSelectDay)
            let result = roomrealRes?.data
            setDataRoomFind(result)
        } catch (error) {
            console.log("error", error);
        }
    }
    const handleClickBackList = () => {
        setLoadingSelectDay(false)
    }
    const handleClickNextPage = () => {
        if (Number(filters.page) < totalPages) {
            setFilters({
                ...filters,
                page: Number(filters.page) + 1,
                direction: 'next'
            })
        }
    }
    const handleClickPrevPage = () => {
        if (Number(filters.page) > 0) {
            setFilters({
                ...filters,
                page: Number(filters.page) - 1,
                direction: 'prev'
            })
        }
    }
    const handleClickPageNumber = (pageNumber) => {
        setFilters({
            ...filters,
            page: Number(pageNumber)
        })
    }
    const handleShowModalEditRoom = (roomInfo) => {
        setShow(true)
        setRoomInfo(roomInfo)
    }
    const handleRemoveRoom = () => { }

    const handleSearchText = (e) => {
        setKeyword(e.target.value)
    }
    const handleSearch = (e) => {
        e.preventDefault()
        setFilters({
            ...filters,
            kw: keyword
        })
    }
    const handleFilterRoomType = (e) => {
        setFilters({
            ...filters,
            roomType: e.target.value
        })
    }
    const handleSelectLimit = (e) => {
        setFilters({
            ...filters,
            size: e.target.value
        })
    }
    const handleClickOrder = (e) => {
        setFilters({
            ...filters,
            orderBySort: e.target.value
        })
    }
    const handleClickSort = (e) => {
        setFilters({
            ...filters,
            sortByField: e.target.value
        })
    }
    // const [roomId,setRoomId]=useState()
    const handleClickFindRoomRealAvaliable = async (roomId) => {

        // setRoomId(roomId)
        setLoadDataRoomReal(true)
        try {
            let roomrealRes = await RoomRealService.postFindAvailableRoomRealHaveRoomRealId(objSelectDay, roomId)
            let result = roomrealRes?.data
            console.log("result", result);
            setDataRoomRealFind(result)
        } catch (error) {
            console.log("error", error);
        }
    }
    const handleClickFindRoomRealUnAvaliable = async (roomId) => {

        // setRoomId(roomId)
        setLoadDataRoomRealUnAvailable(true)
        try {
            let roomrealRes = await RoomRealService.postFindUnAvailableRoomRealHaveRoomRealId(objSelectDay, roomId)
            let result = roomrealRes?.data
            console.log("result", result);
            if (result == null || result == "") {
                result = null
            }
            setDataRoomRealUnAvailableFind(result)
        } catch (error) {
            console.log("error", error);
        }
    }
    const handleClickBack = () => {
        setLoadDataRoomReal(false)

    }

    return (
        <>

            {
                loading ? (<span className="spinner-border text-primary spinner-border-sm" role="status" aria-hidden="true"></span>) :
                    (
                        <>
                            <div className="d-flex justify-content-center">
                                <div className="d-flex me-2 algin-items-center my-2 justify-content-center ">

                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DateRangePicker']}>
                                            <DateRangePicker
                                                value={selectDate}
                                                onChange={handleClickSelectDay}
                                                localeText={{ start: 'From', end: 'To' }}

                                            />

                                        </DemoContainer>
                                    </LocalizationProvider>
                                    <button type="button" onClick={handleClickFind}>Find</button>
                                </div>
                            </div>
                            {
                                loadDataRoomRealUnAvailable ? <>
                                    <div className="d-flex justify-content-between align-items-center my-2">
                                        <button type="button" onClick={() => setLoadDataRoomRealUnAvailable(false)} style={{ borderColor: 'green', display: 'flex', alignItems: 'center' }}>
                                            <ArrowBackIcon style={{ marginRight: '5px' }} />
                                            Back
                                        </button>
                                    </div>
                                    <Table size="small" className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                                        <TableHead>
                                            <TableRow className="table-secondary">
                                                <TableCell className="text-center">ID</TableCell>
                                                <TableCell className="text-center">Room Code</TableCell>
                                                <TableCell className="text-center">Status</TableCell>
                                                <TableCell className="text-center">Range</TableCell>
                                                <TableCell className="text-center">Floor</TableCell>
                                                <TableCell className="text-center">ID Room</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                dataRoomRealUnAvailableFind?.map((data) => (
                                                    <TableRow key={`room_real_${data?.id}`}>
                                                        <TableCell className="text-center" >{data?.id}</TableCell>
                                                        <TableCell className="text-center" >{data?.roomCode}</TableCell>
                                                        <TableCell className="text-center" >{data?.statusRoom}</TableCell>
                                                        <TableCell className="text-center" >{data?.rangeRoom}</TableCell>
                                                        <TableCell className="text-center" >{data?.floor}</TableCell>
                                                        <TableCell className="text-center" >{data?.roomId}</TableCell>
                                                    </TableRow>
                                                ))
                                            }
                                        </TableBody>
                                    </Table>
                                </> :
                                    (
                                        <>
                                            {
                                                loadDataRoomReal ?
                                                    <>
                                                        <div className="d-flex justify-content-between align-items-center my-2">
                                                            <button type="button" onClick={handleClickBack} style={{ borderColor: 'green', display: 'flex', alignItems: 'center' }}>
                                                                <ArrowBackIcon style={{ marginRight: '5px' }} />
                                                                Back
                                                            </button>
                                                        </div>
                                                        <Table size="small" className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                                                            <TableHead>
                                                                <TableRow className="table-secondary">
                                                                    <TableCell className="text-center">ID</TableCell>
                                                                    <TableCell className="text-center">Room Code</TableCell>
                                                                    <TableCell className="text-center">Status</TableCell>
                                                                    <TableCell className="text-center">Range</TableCell>
                                                                    <TableCell className="text-center">Floor</TableCell>
                                                                    <TableCell className="text-center">ID Room</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                    dataRoomRealFind?.map((data) => (
                                                                        <TableRow key={`room_real_${data?.id}`}>
                                                                            <TableCell className="text-center" >{data?.id}</TableCell>
                                                                            <TableCell className="text-center" >{data?.roomCode}</TableCell>
                                                                            <TableCell className="text-center" >{data?.statusRoom}</TableCell>
                                                                            <TableCell className="text-center" >{data?.rangeRoom}</TableCell>
                                                                            <TableCell className="text-center" >{data?.floor}</TableCell>
                                                                            <TableCell className="text-center" >{data?.roomId}</TableCell>
                                                                        </TableRow>
                                                                    ))
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </> : (
                                                        <>
                                                            {
                                                                loadingSelectDay ?
                                                                    <>
                                                                        {/* import ArrowBackIcon from '@mui/icons-material/ArrowBack'; */}
                                                                        <div className="d-flex justify-content-between align-items-center my-2">
                                                                            <button type="button" onClick={handleClickBackList} style={{ borderColor: 'green', display: 'flex', alignItems: 'center' }}>
                                                                                <ArrowBackIcon style={{ marginRight: '5px' }} />
                                                                                Back
                                                                            </button>
                                                                        </div>

                                                                        <Table size="small" className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                                                                            <TableHead>
                                                                                <TableRow className="table-secondary">
                                                                                    <TableCell className="text-center" style={{ width: "50px" }}>ID</TableCell>
                                                                                    <TableCell className="text-center" style={{ width: "300" }}>Room</TableCell>
                                                                                    <TableCell className="text-center" style={{ width: "120px" }}>Available/Total</TableCell>
                                                                                    <TableCell className="text-center" style={{ width: "70px" }}>Sleep</TableCell>
                                                                                    <TableCell className="text-center" style={{ width: "150px" }}>Price (VNĐ)</TableCell>
                                                                                    <TableCell className="text-center" style={{ width: "250px" }}>Action</TableCell>
                                                                                </TableRow>

                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {
                                                                                    dataRoomFind?.map((data) => (

                                                                                        <>
                                                                                            <TableRow key={`room${data?.id}`}>
                                                                                                <TableCell className="text-center">{data?.id}</TableCell>
                                                                                                <TableCell className="text-left">{data?.name}</TableCell>
                                                                                                <TableCell className="text-end">{data?.totalCount}/{data?.quantity}</TableCell>
                                                                                                <TableCell className="text-end">{data?.sleep}</TableCell>
                                                                                                <TableCell className="text-end">{data?.pricePerNight.toLocaleString('vi-VN')}</TableCell>
                                                                                                <TableCell className="text-center" style={{}}>
                                                                                                    <button onClick={() => handleClickFindRoomRealAvaliable(data?.id)} className="me-2">
                                                                                                        <VisibilityIcon />
                                                                                                        Avaliable
                                                                                                    </button>
                                                                                                    <button onClick={() => handleClickFindRoomRealUnAvaliable(data?.id)}>
                                                                                                        <VisibilityIcon />
                                                                                                        Un Avaliable
                                                                                                    </button>
                                                                                                </TableCell>

                                                                                            </TableRow>
                                                                                        </>
                                                                                    )
                                                                                    )
                                                                                }
                                                                            </TableBody>
                                                                        </Table>
                                                                    </>
                                                                    : (
                                                                        <>
                                                                            <div className="d-flex justify-content-between">

                                                                                <div className="d-flex me-2 algin-items-center my-2 justify-content-center ">
                                                                                    <form className="d-flex align-items-center " onSubmit={handleSearch}>
                                                                                        <input
                                                                                            type="text"
                                                                                            placeholder="Search Room By Name"
                                                                                            className="form-control form-control-sm "
                                                                                            onInput={handleSearchText}
                                                                                        />
                                                                                        <SearchIcon style={{ marginLeft: '-25px', marginTop: '2px', fontSize: '27px' }} />
                                                                                        <input type="button" value="search" style={{ marginLeft: '5px' }} />
                                                                                    </form>
                                                                                </div>

                                                                                <div className="d-flex me-2 algin-items-center my-2 justify-content-end">
                                                                                    <div className="d-flex me-2 algin-items-center ">
                                                                                        <div className="row me-2">
                                                                                            <div className="d-flex me-2 algin-items-center justify-content-center my-1 ">
                                                                                                <label className="form-label me-2 d-flex justify-content-center" style={{ marginTop: '5px' }} >Filter</label>

                                                                                                <select defaultValue={""}
                                                                                                    onChange={handleFilterRoomType}
                                                                                                    className="me-1"
                                                                                                >
                                                                                                    <option value="">Room type</option>
                                                                                                    {
                                                                                                        roomTypeList?.map((stt) => (
                                                                                                            <option className="d-flex justify-content-center algin-items-center" key={stt?.eroomName} value={stt?.eroomName}>{stt?.eroomTitle}</option>
                                                                                                        ))
                                                                                                    }
                                                                                                </select>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <Table size="small" className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                                                                                <TableHead >
                                                                                    <TableRow className="table-secondary">
                                                                                        <TableCell className="text-center">Id</TableCell>
                                                                                        <TableCell className="text-center">Name</TableCell>
                                                                                        <TableCell className="text-center">Type</TableCell>
                                                                                        <TableCell className="text-center">Per type</TableCell>
                                                                                        <TableCell className="text-center">Sleeper</TableCell>
                                                                                        <TableCell className="text-center">Price (VNĐ)</TableCell>
                                                                                        <TableCell className="text-center">Action</TableCell>
                                                                                    </TableRow>
                                                                                </TableHead>
                                                                                <TableBody>
                                                                                    {

                                                                                        roomList?.map((room) => (
                                                                                            <>

                                                                                                <TableRow key={`room_${room?.id}`}>
                                                                                                    <TableCell className="text-center">{room?.id}</TableCell>
                                                                                                    <TableCell className="text-center align-middle">{room?.name}</TableCell>
                                                                                                    <TableCell className="text-center align-middle">{room?.roomType}</TableCell>
                                                                                                    <TableCell className="text-center align-middle">{room?.perType?.name}</TableCell>
                                                                                                    <TableCell className="text-center align-middle">{room?.sleep}</TableCell>
                                                                                                    <TableCell className="text-center align-middle">{room?.pricePerNight.toLocaleString('vi-VN')}</TableCell>
                                                                                                    <TableCell className="text-center d-flex align-items-center">
                                                                                                        <Link className="mx-1" to={`/dashboard/rooms/${room?.id}`}>
                                                                                                            <BiCommentDetail style={{ color: 'orange' }} size={22} title={room?.id} role="button"
                                                                                                            />
                                                                                                        </Link>
                                                                                                        <div className="mx-1">
                                                                                                            <div onClick={() => handleShowModalEditRoom(room)} role="button" title="edit">
                                                                                                                <EditIcon
                                                                                                                    style={{ color: 'green' }}
                                                                                                                    size={22}
                                                                                                                />
                                                                                                            </div>
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
                                                                            </Table >
                                                                            <div className="d-flex align-items-center justify-content-between">
                                                                                <ul className="pagination">
                                                                                    {
                                                                                        filters.page < 1 ? "" :
                                                                                            (<li className="page-items">
                                                                                                <button
                                                                                                    onClick={handleClickPrevPage}
                                                                                                    className={`page-link ${filters.page >= 1 ? 'disabled' : (filters.direction !== "prev" ? ' ' : 'active')}`}
                                                                                                >prev</button>
                                                                                            </li>)
                                                                                    }
                                                                                    {[...Array(totalPages).keys()].map((pageNumber) => (
                                                                                        <li key={pageNumber} className="page-items">
                                                                                            <button
                                                                                                onClick={() => handleClickPageNumber(pageNumber)}
                                                                                                className={`page-link ${filters.page === pageNumber ? 'active' : ''}`}
                                                                                            >{pageNumber + 1}</button>
                                                                                        </li>
                                                                                    ))}
                                                                                    {
                                                                                        filters.page >= totalPages - 1 ? "" :
                                                                                            (<li className="page-items">
                                                                                                <button
                                                                                                    onClick={handleClickNextPage}
                                                                                                    className={`page-link  ${filters.page >= totalPages ? 'disabled' : (filters.direction !== "next" ? '' : 'active')}`}
                                                                                                >next</button>
                                                                                            </li>)
                                                                                    }

                                                                                </ul>
                                                                                <div className="d-flex align-items-center ">
                                                                                    <span style={{ width: '45px' }}>Limit</span>
                                                                                    <select
                                                                                        className="form-select form-select-sm" style={{ width: '70px' }}
                                                                                        defaultValue={5}
                                                                                        onChange={handleSelectLimit}
                                                                                    >
                                                                                        <option value={5} className={`${filters.limit === 5 ? 'action' : ''}`} >5</option>
                                                                                        <option value={10} className={`${filters.limit === 10 ? 'action' : ''}`} >10</option>
                                                                                        <option value={25} className={`${filters.limit === 25 ? 'action' : ''}`} >25</option>
                                                                                        <option value={50} className={`${filters.limit === 50 ? 'action' : ''}`} >50</option>
                                                                                        <option value={100} className={`${filters.limit === 100 ? 'action' : ''}`} >100</option>
                                                                                    </select>
                                                                                </div>
                                                                                <div className="d-flex algin-items-center">
                                                                                    <div className="d-flex me-2 algin-items-center ">
                                                                                        <span style={{ width: '40px', marginTop: '5px' }}>Sort</span>
                                                                                        <select defaultValue={""} className="form-select form-select-sm " style={{ width: '120px' }}
                                                                                            onChange={handleClickSort}
                                                                                        >
                                                                                            <option value="">Select Filter</option>
                                                                                            <option value="name">Name</option>
                                                                                            <option value="pricePerNight">Price</option>
                                                                                        </select>
                                                                                    </div>
                                                                                    <div className="d-flex me-2 algin-items-center ">
                                                                                        <span style={{ width: '50px', marginTop: '5px' }}>Order</span>
                                                                                        <select defaultValue={"asc"} className="form-select form-select-sm " style={{ width: '120px' }}
                                                                                            onChange={handleClickOrder}
                                                                                        >
                                                                                            <option value="asc">Ascending</option>
                                                                                            <option value="desc">Descending</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </>
                                                                    )
                                                            }
                                                        </>
                                                    )
                                            }
                                        </>
                                    )
                            }
                        </>
                    )
            }

            <ModalEditRoom show={show} handleClose={setShow} roomInfo={roomInfo} setRoomInfo={setRoomInfo} />
        </>
    );
}
