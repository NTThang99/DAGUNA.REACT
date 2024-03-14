import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import { Link, NavLink } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <Link to={'/dashboard'}>
      <ListItemButton >
        
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    {/* <NavLink to={'Orders'}>
      <ListItemButton>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Orders" />
      </ListItemButton>
    </NavLink> */}

   {/* <NavLink to={'Customers'}>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Customers" />
      </ListItemButton>
    </NavLink> */}

    <NavLink to={'rooms/list'} >
      <ListItemButton>
        <ListItemIcon>
          <HolidayVillageIcon />
        </ListItemIcon>
        <ListItemText primary="Rooms" />
      </ListItemButton>
    </NavLink>

    {/* <NavLink to={'Reports'}>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </NavLink> */}

    {/* <NavLink to={'Integrations'}>
      <ListItemButton>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItemButton>
    </NavLink> */}
  </React.Fragment>
);

