import { Outlet, useParams } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { NavLink } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

export default function BookingPage() {
    const { idBookingDetail } = useParams()
    const { idBookingEdit } = useParams()
    const { idBookingDeposit} = useParams()
    
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow className="nav-item">
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/bookings/list'}>
                                <ListAltIcon />
                                List Bookings
                            </NavLink>
                        </TableCell>
                        {/* <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/bookings/add'}>
                                <AddIcon />
                                Create Bookings
                            </NavLink>
                        </TableCell> */}
                        {idBookingDetail ?
                            <TableCell className="nav-link ">
                                <NavLink to={`/dashboard/bookings/${idBookingDetail}`}>
                                    <InfoIcon />
                                    Bookings Detail
                                </NavLink>
                            </TableCell>
                             : '' 
                        } 
                           {idBookingDeposit ?
                            <TableCell className="nav-link ">
                                <NavLink to={`/dashboard/bookings/${idBookingDeposit}`}>
                                    <InfoIcon />
                                    Deposit Bookings
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