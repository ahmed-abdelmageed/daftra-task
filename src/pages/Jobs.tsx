import { Menu } from "@mui/icons-material";
import {
    Box,
    FormControlLabel,
    IconButton,
    MenuItem,
    Pagination,
    Select,
    Switch,
    Typography,
    useMediaQuery
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard/JobCard";
import Sidebar from "../components/Sidebar/Sidebar";
import jobsDataJson from "../mock/jobsData.json";
import styles from "../styles/pages/Jobs.module.scss";

interface JobListing {
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    posted: string;
    experience: string;
    employmentType: string[];
    categories: string[];
}

const Jobs: React.FC = () => {
    const [sort, setSort] = useState("Top match");
    const [page, setPage] = useState(1);
    const jobsPerPage = 5;
    const [jobListings, setJobListings] = useState<JobListing[]>([]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        if (jobsDataJson.jobsData) {
            setJobListings(jobsDataJson.jobsData);
        }
    }, []);

    const startIndex = (page - 1) * jobsPerPage;
    const paginatedJobs = jobListings.slice(startIndex, startIndex + jobsPerPage);

    return (
        <div className={styles.jobsPage}>
            <div className={styles.headerBox}>
                <Typography className={styles.sortingTitle}>
                    Sorting by:
                </Typography>
                <Select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={styles.sortDropdown}
                    disableUnderline
                    variant="standard"
                    displayEmpty
                >
                    <MenuItem value="Top match">Top match</MenuItem>
                    <MenuItem value="Newest">Newest</MenuItem>
                    <MenuItem value="Oldest">Oldest</MenuItem>
                </Select>
            </div>

            <div className={styles.flexRow}>
                <Box className={styles.alertBox}>
                    <div>
                        <Typography className={styles.alertHead}>
                            UI Designer in Egypt
                        </Typography>
                        {
                            !isMobile &&
                            <Typography className={styles.alertText}>
                                70 job positions
                            </Typography>
                        }
                    </div>
                    <div className={styles.Gruid}>

                        {
                            isMobile &&
                            <Typography className={styles.alertText}>
                                70 job positions
                            </Typography>
                        }
                        <div className={styles.switchText}>
                            <Typography className={styles.alertText}>
                                Set alert
                            </Typography>
                            <FormControlLabel
                                control={<Switch size={isMobile ? "small" : "medium"} className={styles.alertSwitch} />}
                                label=""
                            />
                        </div>
                    </div>

                </Box>
                {isMobile && (
                    <IconButton
                        className={styles.sidebarToggle}
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu />
                    </IconButton>
                )}
            </div>


            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className={styles.jobListContainer}>
                {paginatedJobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>

            <Box className={styles.paginationContainer}>
                <Pagination
                    count={Math.ceil(jobListings.length / jobsPerPage)}
                    page={page} 
                    onChange={(_, value) => setPage(value)}

                    className={styles.pagination}
                    sx={{
                        "& .MuiPaginationItem-root": {
                            width: "40px",
                            height: "40px",
                            fontWeight: "600",
                            borderRadius: "4px",
                            border: "1px solid #c4c3c3",
                            color: "#707070",
                            transition: "background 0.3s ease-in-out",
                            "&:hover": { background: "#e8f5e9" },
                        },
                        "& .MuiPaginationItem-root.Mui-selected": {
                            background: "#48A74C !important",
                            color: "white !important",
                            borderColor: "#C4C3C3 !important",
                            fontWeight: "bold",
                            "&:hover": { background: "#388e3c !important" },
                        },
                    }}
                />
            </Box>
        </div>
    );
};

export default Jobs;
