import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import RoomService from "../../../services/RoomService";
import axios from "axios";

import { getAllRoomsAPI } from "../../home/RoomSlide";

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
        // loading ? <span className="spinner-border text-primary spinner-border-sm" role="status" aria-hidden="true"></span> :
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Per</TableCell>
              <TableCell>Price11</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rooms?.map((room) => (
              <>
                <TableRow>{room?.id}</TableRow>
                <TableRow>{room?.name}</TableRow>
                <TableRow>{room?.roomType}</TableRow>
                <TableRow>{room?.roomStatus}</TableRow>
                <TableRow>{room?.pricePerNight}</TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      }
    </>
  );
}
