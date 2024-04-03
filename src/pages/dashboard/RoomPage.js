import { Outlet, useParams } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';
import { useEffect } from "react";

export default function RoomPage() {
    const { idRoomDetail } = useParams()
    const { idRoomEdit } = useParams()

    const location  = useLocation();
    const navigate = useNavigate();

    useEffect(()=>{
        if(location.pathname === "/dashboard/rooms/" || location.pathname === "/dashboard/rooms"){
            navigate("/dashboard/rooms/list");
        }
    },[])
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow className="nav-item">
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/rooms/list'}>
                                <ListAltIcon />
                                List Room Common
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
                                    Room Common Detail
                                </NavLink>
                            </TableCell>
                             : '' 
                        } 
                           {/* {idRoomEdit ?
                            <TableCell className="nav-link ">
                                <NavLink to={`/dashboard/rooms/${idRoomEdit}`}>
                                    <InfoIcon />
                                    Edit Room 
                                </NavLink>
                            </TableCell>
                             : '' 
                        }  */}
                    </TableRow>
                </TableHead>
            </Table>
            <TableBody>
                <Outlet />
            </TableBody>
        </>
    )
}