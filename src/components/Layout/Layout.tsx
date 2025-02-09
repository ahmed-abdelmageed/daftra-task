import { Box, CssBaseline } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";

const Layout: React.FC = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <Box className={styles.layoutContainer}>
            <CssBaseline />
            <Navbar />

            <Box className={styles.contentWrapper}>
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                <Box component="main" className={styles.mainContent}>
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
