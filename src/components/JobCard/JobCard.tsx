import React from "react";
import { Card, CardContent, Typography, IconButton, Box, Chip } from "@mui/material";
import LocationOnIcon from "../../assets/images/icons/location.png";
import DateIcon from "../../assets/images/icons/date.png";
import styles from "./JobCard.module.scss";
import magaraLogo from "../../assets/images/magara.png";
import heartIcon from "../../assets/images/icons/heart.png";

interface JobCardProps {
    title: string;
    company: string;
    companyLogo: string;
    location: string;
    posted: string;
    experience: string;
    employmentType: string[];
    categories: string[]; 
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location, posted, experience, employmentType, categories }) => {
    return (
        <Card className={styles.jobCard}>
            <CardContent className={styles.jobContent}>
                <Box className={styles.cardHeader}>
                    <Box className={styles.jobInfo}>
                        <img src={magaraLogo} alt={company} className={styles.companyLogo} />
                        <Box>
                            <Typography variant="h6" className={styles.jobTitle}>{title}</Typography>
                            <Typography variant="subtitle2" className={styles.companyName}>{company}</Typography>
                        </Box>
                    </Box>
                    <IconButton className={styles.favoriteButton}>
                        <img src={heartIcon} className={styles.favoriteIcon} />
                    </IconButton>
                </Box>

                <Box className={styles.jobMeta}>
                    <Box className={styles.metaItemInline}>
                        <img src={LocationOnIcon} className={styles.metaIcon} />
                        <Typography className={styles.jobCardText}>{location}</Typography>
                    </Box>
                    <Box className={styles.metaItemInline}>
                        <img src={DateIcon} className={styles.metaIcon} />
                        <Typography className={styles.jobCardText}>{posted}</Typography>
                    </Box>
                </Box>

                <Box className={styles.tags}>
                    <Chip label={experience} className={styles.tag} />
                    {employmentType.map((type, index) => (
                        <Chip key={index} label={type} className={styles.tag} />
                    ))}
                </Box>

                <div className={styles.jobDivider}></div>

                <Box className={styles.categories}>
                   <Typography className={styles.jobCardText}>{categories.join(" - ")}</Typography> 
                </Box>
            </CardContent>
        </Card>
    );
};

export default JobCard;
