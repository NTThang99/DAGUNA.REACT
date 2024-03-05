import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import RoomService from '../../../services/roomService'
import axios from "axios";
export default function RoomList() {
    const [RoomList, setRoomList] = useState([])
    const [loading, setLoading] = useState(false);
    // const cors = require('cors');
    // const corsOptions = {
    //     origin: 'http://localhost:3000',
    //     credentials: true,            //access-control-allow-credentials:true
    //     optionSuccessStatus: 200
    // }
    // app.use(cors(corsOptions));
    useEffect(() => {
        // setLoading(true)
        async function getRoomList() {
            try {
                // let rooms = await RoomService.getRoomList();
                let rooms = await axios.get('http://localhost:9001/api/rooms');
                // let rooms = await fetch('http://localhost:9001/api/',{mode:'rooms'});
                console.log("rooms:", rooms?.data);
                let result = rooms?.data;
                console.log("result:", result);
                setRoomList(result);
                // setLoading(false)
            } catch (error) {
                console.log("error:", error);
            }
        }
        getRoomList()
    }, [])

    return (
        <>
            {
                // loading ? <span className="spinner-border text-primary spinner-border-sm" role="status" aria-hidden="true"></span> :
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Per</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {RoomList?.map(room => {
                            <>
                                <TableRow>{room?.id}</TableRow>
                                <TableRow>{room?.name}</TableRow>
                                <TableRow>{room?.roomType}</TableRow>
                                <TableRow>{room?.statusRoom}</TableRow>
                                <TableRow>{room?.perType}</TableRow>
                            </>
                        })}
                    </TableBody>
                </Table>
            }
        </>
    )
}