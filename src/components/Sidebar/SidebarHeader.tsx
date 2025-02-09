import { Box, IconButton, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import styles from "./Sidebar.module.scss";
import SettingsIcon from "../../assets/images/icons/setting.png";
import backArrow from "../../assets/images/icons/backArrow.png";

interface SidebarHeaderProps {
    editMode: boolean;
    toggleEditMode: () => void;
    saveChanges: () => void;
    isMobile: boolean;
    setIsOpen: (open: boolean) => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ editMode, toggleEditMode, saveChanges, isMobile, setIsOpen }) => {
    return (
        <Box className={styles.menuHeader}>
            <div className={styles.drawerHeader}>

            {isMobile && (
                <IconButton onClick={() => setIsOpen(false)}>
                    <img src={backArrow} alt="Back" className={styles.backArrow} />
                </IconButton>
            )}

            <Typography className={styles.menuTitle}>Menu</Typography>
            </div>

            <Box className={styles.editIcons}>
                {editMode ? (
                    <>
                        <IconButton onClick={saveChanges} className={styles.actionButton} sx={{ border: "2px solid green", color: "green" }}>
                            <SaveIcon fontSize="medium" />
                        </IconButton>
                        <IconButton onClick={toggleEditMode} className={styles.actionButton} sx={{ border: "2px solid red", color: "red" }}>
                            <CancelIcon fontSize="medium" />
                        </IconButton>
                    </>
                ) : (
                    <IconButton onClick={toggleEditMode}>
                        <img src={SettingsIcon} width="24px" height="24px" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default SidebarHeader;
