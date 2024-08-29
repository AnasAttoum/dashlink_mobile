import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'

import Header from './Header';
import { links, subLinks } from '../CONSTANTS/data';
import { useSelector } from 'react-redux';

export default function LeftDrawer() {
  const adminData = useSelector(state => state.Admin)
  const navigate = useNavigate()
  const {pathname} = useLocation()
  
  React.useEffect(() => {
    if (!adminData.isLogged)
      navigate('/')
  }, [adminData, navigate])

  React.useEffect(() => {
    document.title='DashLink Mobile | '+ pathname.split('/')[1].toUpperCase()
  }, [pathname])
  
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary={'DashLink Mobile'} sx={{ color: 'var(--primary)' }} />
          </ListItemButton>
        </ListItem>
        {links.map((link,index) => (
          <Link key={index} to={link.url}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {subLinks.map((link,index) => (
          <Link key={index} to={link.url}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div>

      <div>
        <Header toggleDrawer={toggleDrawer} />
      </div>

      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

      <Outlet />

    </div>
  );
}
