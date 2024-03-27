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
import { BiCommentDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import ReceptionistService from "../../../services/ReceptionistService";
import SearchIcon from '@mui/icons-material/Search';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { toast } from "react-toastify";



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

    const getAllReceptionistFilter = async () => {
        try {
            let receptionistFilters = await ReceptionistService.getAllReceptionists(`http://localhost:8080/api/receptionists`);
            let result = receptionistFilters?.content;
            let totalPage = receptionistFilters?.totalPages;
            setTotalPages(totalPage);
            setReceptionistList(result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllReceptionistFilter();
    }, [filters, totalPages]);


    const handleLockReceptionist = async (receptionistId) => {
        try {
            await ReceptionistService.lockReceptionist(receptionistId);
            toast.error('Locking receptionist success!', { theme: "light" });
            // alert('Receptionist locked successfully!');
            getAllReceptionistFilter();
        } catch (error) {
            console.error('Error locking receptionist:', error);
            toast.error('Locking receptionist success!', { theme: "light" });
        }
    };
    
    const handleOpenReceptionist = async (receptionistId) => {
        try {
            await ReceptionistService.openReceptionist(receptionistId);
            toast.success('Opening receptionist success!', { theme: "light" });
            // alert('Receptionist opened successfully!');
            getAllReceptionistFilter();
        } catch (error) {
            console.error('Error opening receptionist:', error);
            // alert('Error opening receptionist');
            toast.error('Opening receptionist success!', { theme: "light" });
        }
    };
    
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
                                        <TableCell className="text-center">Status</TableCell>
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
                                                <TableCell className="text-center align-middle">{receptionist?.elockStatus}</TableCell>

                                                <TableCell className="text-center align-middle">{receptionist?.receptionistInfo}</TableCell>
                                                {/* </Link> */}
                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                        <Link className="mx-1" to={`/dashboard/receptionists/edit/${receptionist?.id}`}>
                                                            <EditIcon style={{ color: 'orange', marginRight: '10px' }} size={22} title="edit" role="button" />
                                                        </Link>
                                                        <Link className="mx-1" to={`/dashboard/receptionists/detail/${receptionist?.id}`}>
                                                            <BiCommentDetail style={{ color: 'green', marginRight: '10px' }} size={22} title="detail" role="button" />
                                                        </Link>
                                                        <div className="mx-1">
                                                            <LockOpenIcon style={{ color: 'red', marginRight: '10px' }} size={22} title="block" role="button" onClick={() =>  handleOpenReceptionist(receptionist.id)} />
                                                        </div>
                                                        <div className="mx-1">
                                                            <BlockIcon style={{ color: 'red', marginRight: '10px' }} size={22} title="open" role="button" onClick={() => handleLockReceptionist(receptionist.id)} />
                                                        </div>
                                                    </div>
                                                </div>
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
