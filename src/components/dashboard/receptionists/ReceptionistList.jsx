import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import { getAllReceptionistsAPI } from "../../home/Slide/ReceptionistSlide";

import { useDispatch, useSelector } from "react-redux";
export default function ReceptionistList() {
    const [receptionistList, setReceptionistList] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const receptionists = useSelector((state) => state.receptionist.data);
    console.log(receptionists);
    useEffect(() => {
        dispatch(getAllReceptionistsAPI("http://localhost:8080/api/receptionists"));
    }, []);

    return (
        <>
            {
                // loading ?( <span className="spinner-border text-primary spinner-border-sm" role="status" aria-hidden="true"></span>) :
                (<Table size="small" className="table table-bordered table-striped table-hover rounded-3 overflow-hidden">
                    <TableHead >
                        <TableRow className="table-secondary">
                            <TableCell className="text-center">Id</TableCell>
                            <TableCell className="text-center">Name</TableCell>
                            <TableCell className="text-center">Day Of Birth</TableCell>
                            <TableCell className="text-center">Email</TableCell>
                            <TableCell className="text-center">Phone</TableCell>
                            <TableCell className="text-center">Address</TableCell>
                            <TableCell className="text-center">Avatar</TableCell>
                            <TableCell className="text-center">Receptionist Info</TableCell>
                            <TableCell className="text-center"></TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receptionists?.map((receptionist) => (
                            <>

                                <TableRow key={`receptionist${receptionist?.id}`}>
                                    <TableCell className="text-center">{receptionist?.id}</TableCell>
                                    <TableCell className="text-center align-middle">{receptionist?.receptionistName}</TableCell>
                                    <TableCell className="text-center align-middle">{receptionist?.dob}</TableCell>
                                    <TableCell className="text-center align-middle">{receptionist?.email}</TableCell>
                                    <TableCell className="text-center align-middle">{receptionist?.phone}</TableCell>
                                    <TableCell className="text-center align-middle">{receptionist?.address}</TableCell>
                                    <TableCell className="text-center align-middle">
                                        <img width={"100px"} height={"100px"}  src={receptionist?.avatarImg}/>
                                    </TableCell>
                                    <TableCell className="text-center align-middle">{receptionist?.receptionistInfo}</TableCell>
                                    <TableCell className="text-center align-middle"><EditIcon/> <BlockIcon/></TableCell>


                                </TableRow>

                            </>
                        ))}
                    </TableBody>
                </Table >)
            }
        </>
    );
}
