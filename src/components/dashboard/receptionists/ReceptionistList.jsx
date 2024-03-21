import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import { getAllReceptionistsAPI } from "../../home/Slide/ReceptionistSlide";
import EditIcon from '@mui/icons-material/Edit';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReceptionistSevrice from "../../../services/ReceptionistService";
import SearchIcon from '@mui/icons-material/Search';


export default function ReceptionistList() {
    const [receptionistList, setReceptionistList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false)
    const [receptionist, setReceptionist] = useState(null)
    const [filters, setFilters] = useState({
        direction: '',
        page: 0,
        size: 2,
        kw: "",
        sortByField: "id",        // name, price
        orderBySort: "asc",        // desc, asc
    })
    const [totalPages, setTotalPages] = useState(0)
    const [keyword, setKeyword] = useState(null)


    useEffect(() => {
        async function getAllReceptionistFilter() {
            try {
                let receptionistFilters = await ReceptionistSevrice.getAllReceptionists(`http://localhost:8080/api/receptionists`)
                let result = receptionistFilters?.content
                let totalPage = receptionistFilters?.totalPages
                setTotalPages(totalPage)
                setReceptionistList(result)

            } catch (error) {
                // console.log(error);
            }
        }
        getAllReceptionistFilter()
    }, [filters, totalPages])

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
   
    const handleRemoveReceptionist = () => { }

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
                                            placeholder="Search Receptionist By Name"
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
                                        <TableCell className="text-center">Name</TableCell>
                                        <TableCell className="text-center">Dob</TableCell>
                                        <TableCell className="text-center">Email</TableCell>
                                        <TableCell className="text-center">Phone</TableCell>
                                        <TableCell className="text-center">Address</TableCell>
                                        <TableCell className="text-center">Avatar</TableCell>
                                        <TableCell className="text-center">Receptionist Info</TableCell>
                                        <TableCell className="text-center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {receptionistList?.map((receptionist) => (
                                        <>

                                            <TableRow key={`receptionist_${receptionist?.id}`}>
                                                <TableCell className="text-center">{receptionist?.id}</TableCell>
                                                <TableCell className="text-center align-middle">{receptionist?.receptionistName}</TableCell>
                                                <TableCell className="text-center align-middle">{receptionist?.dob}</TableCell>
                                                <TableCell className="text-center align-middle">{receptionist?.email}</TableCell>
                                                <TableCell className="text-center align-middle">{receptionist?.phone}</TableCell>
                                                <TableCell className="text-center align-middle">{receptionist?.address}</TableCell>
                                                <TableCell className="text-center align-middle">
                                                    <img width={"80px"} height={"80px"} src={receptionist?.avatarImgResDTO} />
                                                </TableCell>
                                                <TableCell className="text-center align-middle">{receptionist?.receptionistInfo}</TableCell>
                                                {/* </Link> */}
                                                <TableCell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <div>
                                                        <Link className="mx-1" to={`/dashboard/receptionists/${receptionist?.id}`}>
                                                            <EditIcon style={{ color: 'orange', marginRight: '10px' }} size={22} title="edit" role="button"/>
                                                        </Link>
                                                        <Link className="mx-1" to={`/dashboard/receptionists/${receptionist?.id}`}>
                                                            <BiCommentDetail style={{ color: 'green', marginRight: '10px' }} size={22} title="detail" role="button"  />
                                                        </Link>
                                                        <div className="mx-1">
                                                            <PlaylistRemoveIcon style={{ color: 'red', marginRight: '10px' }} size={22} title="remove" role="button" onClick={() => handleRemoveReceptionist(receptionist)} />
                                                        </div>
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
