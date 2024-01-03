import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ReceiptLongOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Person2Icon from '@mui/icons-material/Person2';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "../../../assets/profile.jpeg";
import useAuth from "../hooks/useAuth";


const navItems = [
  {
    text: "Dashboard",
    path: "dashboard",
    icon: <DashboardIcon/>,
  },
  {
    text: "Booking",
    path: "home",
    icon: <HomeOutlined />,
  },
  {
    text: "Profile",
    path: "profile",
    icon: <Person2Icon />
  },
  {
    text: "Appointments",
    path: "appointments/list",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Manage Assistants",
    path: "assistants",
    icon: <AccountBoxIcon />,
  },
  {
    text: "Manage Patients",
    path: "patients",
    icon: <PeopleAltIcon />
  },
   {
     text: "Manage Accounts",
     icon: <AdminPanelSettingsOutlined />,
   },
];


const Sidebar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const { auth } = useAuth()

  const filteredNavItems = navItems.filter(item => {
    if (auth.roles == 'admin'){
      return true
    }

    if (auth.roles == 'doctor'){
      const allowedItems = ['Dashboard', 'Manage Assistants', 'Profile', 'Manage Patients']
      return allowedItems.includes(item.text)
    }

    if (auth.roles == 'patient') {
      const allowedItems = ['Dashboard', 'Booking', 'Profile', 'Appointments']
      return allowedItems.includes(item.text)
    }
  
    return item.text !== "Manage Accounts"
  })

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold" textAlign="center">
                    Doctor Appointment Booking System
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {filteredNavItems.map(({ text, path, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem"}}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = path;

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;