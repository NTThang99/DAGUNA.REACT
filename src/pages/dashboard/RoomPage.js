import { Outlet, useParams } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { NavLink } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

export default function RoomPage() {
    const { roomId } = useParams()
    return (
      
        <>
            <Table>
                <TableHead>
                    <TableRow className="nav-item">
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/rooms'}>
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
                        {roomId ?
                            <TableCell className="nav-link ">
                                <NavLink to={`//dashboard/rooms/${roomId}`}>
                                    <InfoIcon />
                                    Room Detail
                                </NavLink>
                            </TableCell>
                            : ''
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Outlet />
                </TableBody>
            </Table>
        </>
    )
}