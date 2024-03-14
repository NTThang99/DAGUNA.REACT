import { Outlet, useParams } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { NavLink } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

export default function ReceptionistPage() {
    const { receptionistId } = useParams()
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow className="nav-item">
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/receptionists/add'}>
                                <AddIcon />
                                Create Receptionist
                            </NavLink>
                        </TableCell>
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/receptionists'}>
                                <ListAltIcon />
                                Search Receptionist
                            </NavLink>
                        </TableCell>
                        {receptionistId ?
                            <TableCell className="nav-link ">
                                <NavLink to={`//dashboard/receptionists/${receptionistId}`}>
                                    <InfoIcon />
                                    Receptionist Detail
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