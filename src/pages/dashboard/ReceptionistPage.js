import { Outlet, useParams } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { NavLink } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddIcon from '@mui/icons-material/Add';
import InfoIcon from '@mui/icons-material/Info';

export default function ReceptionistPage() {
    const { idReceptionistDetail } = useParams()
    const { idReceptionistEdit } = useParams()
    return (
        <>
            <Table>
                <TableHead>
                    <TableRow className="nav-item">
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/receptionists/list'}>
                                <ListAltIcon />
                                List Receptionists
                            </NavLink>
                        </TableCell>
                        <TableCell className="nav-link ">
                            <NavLink to={'/dashboard/receptionists/add'}>
                                <AddIcon />
                                Create Receptionists
                            </NavLink>
                        </TableCell>
                        {idReceptionistDetail ?
                            <TableCell className="nav-link ">
                                <NavLink to={`/dashboard/receptionists/${idReceptionistDetail}`}>
                                    <InfoIcon />
                                    Receptionists Detail
                                </NavLink>
                            </TableCell>
                             : '' 
                        } 
                           {idReceptionistEdit ?
                            <TableCell className="nav-link ">
                                <NavLink to={`/dashboard/receptionists/${idReceptionistEdit}`}>
                                    <InfoIcon />
                                    Edit Receptionists
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