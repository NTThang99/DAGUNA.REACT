import { Outlet, useParams } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { NavLink } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

export default function RoomPage() {
    const { idRoomDetail } = useParams()
    const { idRoomEdit } = useParams()
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow className="nav-item">
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/rooms/list'}>
                                <ListAltIcon />
                                List Room
                            </NavLink>
                        </TableCell>
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/rooms/add'}>
                                <AddIcon />
                                Create Room
                            </NavLink>
                        </TableCell>
                        {idRoomDetail ?
                            <TableCell className="nav-link ">
                                <NavLink to={`/dashboard/rooms/${idRoomDetail}`}>
                                    <InfoIcon />
                                    Room Detail
                                </NavLink>
                            </TableCell>
                             : '' 
                        } 
                           {idRoomEdit ?
                            <TableCell className="nav-link ">
                                <NavLink to={`/dashboard/rooms/${idRoomEdit}`}>
                                    <InfoIcon />
                                    Edit Room
                                </NavLink>
                            </TableCell>
                             : '' 
                        } 
                    </TableRow>
                </TableHead>
            </Table>
            <TableBody>
                <Outlet />
            </TableBody>
        </>
    )
}