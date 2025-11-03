import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Link, Outlet, useLocation } from 'react-router';
import { menuItems } from './utils/menuItems';
import { Menu } from 'lucide-react';
import { supabase } from "../core/lib/supabaseClient";

export default function Layout() {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);

  const DrawerList = (
    <Box sx={{ width: 280, height: '100vh' }} role="presentation" onClick={toggleDrawer(false)} style={{backgroundColor: '#2f0f57'}}>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="h6" style={{color: '#c8a8f0'}}>MindWords</Typography>
      </Box>
      <Divider style={{backgroundColor: '#c8a8f0'}}/>
      <List style={{color: '#c8a8f0'}}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              style={{color: '#c8a8f0'}}
            >
              {item.icon ? (
                <ListItemIcon style={{color: '#c8a8f0'}}>{item.icon}</ListItemIcon>
              ) : null}
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" onClick={async () => {
          await supabase.auth.signOut();
          window.location.href = '/';
        }}>
          Salir
        </Button>
      </Box>

    </Box>
  );

  return (
    <Box style={{backgroundColor: '#faeef8'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, backgroundColor: '#2f0f57' }}>
            <Button variant="outlined" onClick={toggleDrawer(true)} style={{borderRadius: '25%', padding: '16px', color: '#c8a8f0', borderColor: '#9252e0'}}>
                <Menu size={20} />
            </Button>
            <Typography variant="h6" style={{color: '#c8a8f0'}}>MindWords</Typography>
        </Box>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Outlet />
    </Box>
  );
}
