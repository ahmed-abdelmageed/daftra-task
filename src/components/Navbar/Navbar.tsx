import { useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    Menu,
    MenuItem,
    Avatar,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material";
import styles from "./Navbar.module.scss";
import logo from "../../assets/images/izam-logo.png";

import homeIcon from "../../assets/images/icons/Work.png";
import jobsIcon from "../../assets/images/icons/jobs.png";
import employersIcon from "../../assets/images/icons/employers.png";
import notificationsIcon from "../../assets/images/icons/notifications.png";
import messagingIcon from "../../assets/images/icons/messages.png";
import userProfilePic from "../../assets/images/icons/profile.png";
import arrowDownIcon from "../../assets/images/icons/arrowdown.png";

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleDrawer = (open: boolean) => () => {
        setMobileMenuOpen(open);
    };

    return (
        <AppBar position="fixed" className={styles.navbar}>
            <Toolbar className={styles.toolbar}>
                <Box className={styles.leftSection}>
                    <img src={logo} alt="iZAM Logo" className={styles.logo} />
                </Box>

                <Box className={styles.rightSection}>
                    <Box className={styles.navLinks}>
                        <Box className={styles.navItem}>
                            <img
                                src={homeIcon}
                                alt="Home"
                                className={styles.icon}
                            />
                            <Typography
                                className={styles.iconText}
                                variant="caption"
                            >
                                Home
                            </Typography>
                        </Box>
                        <Box className={styles.navItem}>
                            <img
                                src={jobsIcon}
                                alt="Jobs"
                                className={styles.icon}
                            />
                            <Typography
                                className={styles.iconText}
                                variant="caption"
                            >
                                Jobs
                            </Typography>
                        </Box>
                        <Box className={styles.navItem}>
                            <img
                                src={employersIcon}
                                alt="Employers"
                                className={styles.icon}
                            />
                            <Typography
                                className={styles.iconText}
                                variant="caption"
                            >
                                Employers
                            </Typography>
                        </Box>

                        <div className={styles.divider}></div>

                        <Box className={styles.navItem}>
                            <img
                                src={notificationsIcon}
                                alt="Notifications"
                                className={styles.icon}
                            />
                            <Typography
                                className={styles.iconText}
                                variant="caption"
                            >
                                Notifications
                            </Typography>
                        </Box>
                        <Box className={styles.navItem}>
                            <img
                                src={messagingIcon}
                                alt="Messaging"
                                className={styles.icon}
                            />
                            <Typography
                                className={styles.iconText}
                                variant="caption"
                            >
                                Messaging
                            </Typography>
                        </Box>

                        <Box
                            className={styles.navItem}
                            onClick={handleMenuOpen}
                        >
                            <img
                                src={userProfilePic}
                                alt="Profile"
                                className={styles.icon}
                            />
                            <Box className={styles.profileContainer}>
                                <Typography
                                    className={styles.iconText}
                                    variant="caption"
                                >
                                    Profile
                                </Typography>
                                <img src={arrowDownIcon} alt="Dropdown" />
                            </Box>
                        </Box>

                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            className={styles.profileMenu}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    width: 250,
                                    borderRadius: "12px",
                                    boxShadow:
                                        "0px 2px 10px rgba(0, 0, 0, 0.1)",
                                    padding: "0px",
                                    overflow: "hidden",
                                },
                            }}
                        >
                            <MenuItem className={styles.profileHeader}>
                                <Avatar
                                    src={userProfilePic}
                                    className={styles.profilePic}
                                />
                                <Box>
                                    <Typography className={styles.profileName}>
                                        Ahmed Amaar
                                    </Typography>
                                    <Typography className={styles.profileRole}>
                                        UX UI Designer
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <div className={styles.menuDivider}></div>
                            <MenuItem className={styles.menuItem}>
                                Setting and Privacy
                            </MenuItem>
                            <MenuItem className={styles.menuItem}>
                                Language
                            </MenuItem>
                            <MenuItem className={styles.menuItem}>
                                Help
                            </MenuItem>
                            <div className={styles.menuDivider}></div>

                            <MenuItem className={styles.logoutItem}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>

                    <Box className={styles.mobileMenuIcon}>
                        <IconButton onClick={toggleDrawer(true)}>
                            <Avatar
                                src={userProfilePic}
                                className={styles.profileAvatar}
                            />
                        </IconButton>
                    </Box>

                    <Drawer
                        anchor="left"
                        open={mobileMenuOpen}
                        onClose={toggleDrawer(false)}
                    >
                        <Box className={styles.mobileDrawer}>
                            <List>
                                <ListItem>
                                    <Avatar
                                        src={userProfilePic}
                                        className={styles.profilePic}
                                    />
                                    <Box>
                                        <Typography
                                            className={styles.profileName}
                                        >
                                            Ahmed Amaar
                                        </Typography>
                                        <Typography
                                            className={styles.profileRole}
                                        >
                                            UX UI Designer
                                        </Typography>
                                    </Box>
                                </ListItem>
                                <div className={styles.drawerDevider}></div>

                                <ListItem
                                    className={styles.drawerItem}
                                    component="button"
                                >
                                    <ListItemIcon>
                                        <img src={homeIcon} alt="Home" />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                                <ListItem
                                    className={styles.drawerItem}
                                    component="button"
                                >
                                    <ListItemIcon>
                                        <img
                                            src={jobsIcon}
                                            alt="Jobs"
                                            className={styles.icon}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Jobs" />
                                </ListItem>
                                <ListItem
                                    className={styles.drawerItem}
                                    component="button"
                                >
                                    <ListItemIcon>
                                        <img
                                            src={employersIcon}
                                            alt="Employers"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Employers" />
                                </ListItem>
                                <ListItem
                                    className={styles.drawerItem}
                                    component="button"
                                >
                                    <ListItemIcon>
                                        <img
                                            src={notificationsIcon}
                                            alt="Notifications"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Notifications" />
                                </ListItem>
                                <ListItem
                                    className={styles.drawerItem}
                                    component="button"
                                >
                                    <ListItemIcon>
                                        <img
                                            src={messagingIcon}
                                            alt="Messaging"
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary="Messaging" />
                                </ListItem>
                                <div className={styles.drawerDevider}></div>

                                <ListItem
                                    className={styles.drawerItem}
                                    component="button"
                                >
                                    <ListItemText primary="Setting and Privacy" />
                                </ListItem>
                                <ListItem
                                    className={styles.drawerItem}
                                    component="button"
                                >
                                    <ListItemText primary="Language" />
                                </ListItem>
                                <ListItem
                                    className={styles.drawerItem}
                                    component="button"
                                >
                                    <ListItemText primary="Help" />
                                </ListItem>
                                <div className={styles.drawerDevider}></div>
                                <ListItem
                                    component="button"
                                    className={styles.logoutItem}
                                >
                                    <ListItemText primary="Logout" />
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
