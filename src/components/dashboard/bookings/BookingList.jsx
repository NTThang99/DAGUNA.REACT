import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import { getAllBookingServiceAPI } from "../../home/BookingSlide";

import EditIcon from '@mui/icons-material/Edit';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import BookingSevrice from "../../../services/BookingService";
import SearchIcon from '@mui/icons-material/Search';

export default function BookingList() {
    const [bookingList, setBookingList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false)
    const [booking, setBooking] = useState(null)
    const [filters, setFilters] = useState({
        direction: '',
        page: 0,
        size: 2,
        kw: "",
        sortByField: "id",        
        orderBySort: "asc",        
    })
    const [totalPages, setTotalPages] = useState(0)
    const [keyword, setKeyword] = useState(null)


    useEffect(() => {
        async function getAllBookingFilter() {
            try {
                let bookingFilters = await BookingSevrice.getAllBookingService(`http://localhost:8080/api/bookings`)
                let result = bookingFilters
                // let totalPage = bookingFilters.
                // setTotalPages(totalPage)
                setBookingList(result)

            } catch (error) {
                // console.log(error);
            }
        }
        getAllBookingFilter()
    }, [filters, totalPages])

    

    const handleRemoveBooking = () => { }

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

    return (
        <>
            {
                loading ? (<span className="spinner-border text-primary spinner-border-sm" role="status" aria-hidden="true"></span>) :
                    (
                        <>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex me-2 algin-items-center my-2 justify-content-center ">
                                    <form className="d-flex align-items-center " onSubmit={handleSearch}>
                                        <input
                                            type="text"
                                            placeholder="Search Booking By Name"
                                            className="form-control form-control-sm"
                                            style={{ width: '230px' }}
                                            onInput={handleSearchText}
                                        />
                                        <SearchIcon style={{ marginLeft: '-25px', marginTop: '2px', fontSize: '27px' }} />
                                        <input type="button" value="search" style={{ marginLeft: '5px' }} />
                                    </form>
                                </div>
                            </div>
                            <Table size="small" className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                                <TableHead >
                                    <TableRow className="table-secondary">
                                        <TableCell className="text-center">Id</TableCell>
                                        <TableCell className="text-center">Code</TableCell>
                                        <TableCell className="text-center">Check In</TableCell>
                                        <TableCell className="text-center">Check Out</TableCell>
                                        <TableCell className="text-center">Total</TableCell>
                                        <TableCell className="text-center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookingList?.map((booking) => (
                                        <>
                                            <TableRow key={`booking_${booking?.bookingId}`}>
                                                <TableCell className="text-center">{booking?.bookingId}</TableCell> 
                                                <TableCell className="text-center">{booking?.bookingCode}</TableCell> 
                                                <TableCell className="text-center">{new Date(booking?.bookingDetails[0]?.checkIn).toLocaleTimeString('en-GB', {hour12: false}) + ' ' + new Date(booking?.bookingDetails[0]?.checkIn).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</TableCell> 
                                                <TableCell className="text-center">{new Date(booking?.bookingDetails[0]?.checkOut).toLocaleTimeString('en-GB', {hour12: false}) + ' ' + new Date(booking?.bookingDetails[0]?.checkOut).toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'})}</TableCell> 
                                                <TableCell className="text-center">{booking?.bookingDetails[0]?.total}</TableCell> 
                                                <TableCell className="text-center d-flex align-items-center">
                                                   
                                                        <BiCommentDetail style={{ color: 'orange' }} size={22} title="edit" role="button"
                                                        />
                                                    <div className="mx-1">
                                                        <EditIcon style={{ color: 'green' }} size={22} title="edit" role="button"
                                                           />

                                                    </div>
                                                    <div className="mx-1">
                                                        <PlaylistRemoveIcon style={{ color: 'red' }} size={22} title="remove" role="button"
                                                            />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                            
                                        </>
                                    ))}
                                </TableBody>
                            </Table >
                        </>
                    )
            }
        </>
    );
}

