import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import { getAllRoomsAPI } from "../../home/Slide/RoomSlide";

import { useDispatch, useSelector } from "react-redux";
export default function RoomList() {
    const [RoomList, setRoomList] = useState([]);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.room.data);
    useEffect(() => {
        dispatch(getAllRoomsAPI("http://localhost:8080/api/rooms"));
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
                            <TableCell className="text-center">Type</TableCell>
                            <TableCell className="text-center">Status</TableCell>
                            <TableCell className="text-center">Per type</TableCell>
                            <TableCell className="text-center">Sleeper</TableCell>
                            <TableCell className="text-center">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rooms?.map((room) => (
                            <>

                                <TableRow key={`room_${room?.id}`}>
                                    <TableCell className="text-center">{room?.id}</TableCell>
                                    <TableCell className="text-center align-middle">{room?.name}</TableCell>
                                    <TableCell className="text-center align-middle">{room?.roomType}</TableCell>
                                    <TableCell className="text-center align-middle">{room?.statusRoom}</TableCell>
                                    <TableCell className="text-center align-middle">{room?.perType?.name}</TableCell>
                                    <TableCell className="text-center align-middle">{room?.sleep}</TableCell>
                                    <TableCell className="text-center align-middle">{room?.pricePerNight}</TableCell>
                                </TableRow>


                            </>
                        ))}
                    </TableBody>
                </Table >)
            }
        </>
    );
}
