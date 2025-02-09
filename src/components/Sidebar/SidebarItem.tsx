import CheckIcon from "@mui/icons-material/Check";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {
    Box,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import dragIcon from "../../assets/images/icons/drag.png";
import editIcon from "../../assets/images/icons/edit.png";
import eyeIcon from "../../assets/images/icons/eye.png";
import styles from "./Sidebar.module.scss";

interface SidebarItemProps {
    item: {
        id: number;
        title: string;
        target?: string;
        visible?: boolean;
        children?: any[];
    };
    index: number;
    parentId?: number;
    moveItem: (from: number, to: number, parentId?: number) => void;
    updateTitleLocally: (id: number, newTitle: string) => void;
    editMode: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    item,
    index,
    parentId,
    moveItem,
    updateTitleLocally,
    editMode,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);
    const navigate = useNavigate();

    const [{ isDragging }, drag] = useDrag({
        type: "NAV_ITEM",
        item: { index, parentId },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: "NAV_ITEM",
        hover: (draggedItem: { index: number; parentId?: number }) => {
            if (
                draggedItem.index !== index ||
                draggedItem.parentId !== parentId
            ) {
                moveItem(draggedItem.index, index, parentId);
                draggedItem.index = index;
            }
        },
    });

    useEffect(() => {
        if (editMode && ref.current) {
            drag(drop(ref));
        }
    }, [editMode, drag, drop]);

    const handleItemClick = () => {
        if (item.children && item.children.length > 0) {
            setOpen(!open);
        } else if (item.target) {
            navigate(item.target);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveTitle = () => {
        if (newTitle !== item.title) {
            updateTitleLocally(item.id, newTitle);
        }
        setIsEditing(false);
    };

    return (
        <div
            ref={ref}
            className={`${styles.listItem} ${
                isDragging ? styles.dragging : ""
            }`}
        >
            <ListItem
                component="div"
                disablePadding
                className={styles.parentItem}
                onClick={handleItemClick}
            >
                {editMode && <img src={dragIcon} className={styles.dragHandle} />}

                {isEditing ? (
                    <TextField
                        variant="outlined"
                        size="small"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onBlur={handleSaveTitle}
                        autoFocus
                    />
                ) : (
                    <ListItemText primary={item.title} />
                )}

                {item.children && item.children.length > 0 && (
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                )}

                {editMode && (
                    <Box className={styles.itemIcons}>
                        {isEditing ? (
                            <IconButton size="small" onClick={handleSaveTitle}>
                                <CheckIcon fontSize="small" />
                            </IconButton>
                        ) : (
                            <IconButton size="small" onClick={handleEditClick}>
                                <img src={editIcon} className={styles.itemIcon}/>
                            </IconButton>
                        )}
                        <IconButton size="small">
                            <img src={eyeIcon} className={styles.itemIcon}
                                color={
                                    item.visible === false
                                        ? "disabled"
                                        : "inherit"
                                }
                            />
                        </IconButton>
                    </Box>
                )}
            </ListItem>

            {item.children && item.children.length > 0 && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {item.children.map((child, childIndex) => (
                            <SidebarItem
                                key={child.id}
                                item={child}
                                index={childIndex}
                                parentId={item.id}
                                moveItem={moveItem}
                                updateTitleLocally={updateTitleLocally}
                                editMode={editMode}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </div>
    );
};

export default SidebarItem;
