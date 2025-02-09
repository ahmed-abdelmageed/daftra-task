import { Box, Drawer, List, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavItems, saveNavItems, trackDragEvent } from "../../api/navApi";
import { moveItem, NavItem, updateTitle } from "../../slices/navSlice";
import { AppDispatch, RootState } from "../../store";
import styles from "./Sidebar.module.scss";
import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        items: navItems,
        loading,
        error,
    } = useSelector((state: RootState) => state.nav);
    const [editMode, setEditMode] = useState(false);
    const [updatedTitles, setUpdatedTitles] = useState<
        { id: number; title: string }[]
    >([]);
    const [movedItems, setMovedItems] = useState<NavItem[]>([]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        dispatch(fetchNavItems());
    }, [dispatch]);

    const toggleEditMode = () => setEditMode(!editMode);

    const handleMoveItem = (
        fromIndex: number,
        toIndex: number,
        parentId?: number
    ) => {
        const movedItem = navItems[fromIndex];
        dispatch(
            moveItem({
                id: movedItem.id,
                from: fromIndex,
                to: toIndex,
                parentId,
            })
        );
        dispatch(
            trackDragEvent({
                id: movedItem.id,
                from: fromIndex,
                to: toIndex,
                parentId,
            })
        );
    };

    const handleUpdateTitleLocally = (id: number, newTitle: string) => {
        setUpdatedTitles((prev) => {
            const existingIndex = prev.findIndex((item) => item.id === id);
            if (existingIndex !== -1) {
                const updatedList = [...prev];
                updatedList[existingIndex] = { id, title: newTitle };
                return updatedList;
            }
            return [...prev, { id, title: newTitle }];
        });

        dispatch(updateTitle({ id, title: newTitle }));
    };

    const saveChanges = () => {
        const updatedNavItems = (
            movedItems.length > 0 ? movedItems : navItems
        ).map((item) => {
            const updatedTitle = updatedTitles.find((u) => u.id === item.id);
            return updatedTitle ? { ...item, title: updatedTitle.title } : item;
        });

        dispatch(saveNavItems(updatedNavItems));
        setUpdatedTitles([]);
        setMovedItems([]);
        setEditMode(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            {!isMobile ? (
                <Drawer
                    variant="permanent"
                    open
                    className={styles.sidebarDesktop}
                    sx={{
                        width: 340,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: 340,
                            boxSizing: "border-box",
                            backgroundColor: "#FFFFFF",
                            position: "fixed",
                            top: 80,
                            height: "calc(100vh - 80px)",
                            padding: "10px 0",
                            borderRight: "1px solid #E0E0E0",
                        },
                    }}
                >
                    <SidebarHeader
                        editMode={editMode}
                        toggleEditMode={toggleEditMode}
                        saveChanges={saveChanges}
                        isMobile={true}
                        setIsOpen={setIsOpen}
                    />{" "}
                    <Box>
                        <List className={styles.sidebarList}>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>Error: {error}</p>
                            ) : (
                                (movedItems.length > 0
                                    ? movedItems
                                    : navItems
                                ).map((item, index) => (
                                    <SidebarItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        moveItem={handleMoveItem}
                                        updateTitleLocally={
                                            handleUpdateTitleLocally
                                        }
                                        editMode={editMode}
                                    />
                                ))
                            )}
                        </List>
                    </Box>
                </Drawer>
            ) : (
                <Drawer
                    anchor="right"
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    className={styles.sidebarMobile}
                    sx={{
                        [`& .MuiDrawer-paper`]: {
                            width: "100vw",
                            height: "100vh",
                            backgroundColor: "#FFFFFF",
                        },
                    }}
                >
                    <SidebarHeader
                        editMode={editMode}
                        toggleEditMode={toggleEditMode}
                        saveChanges={saveChanges}
                        isMobile={true}
                        setIsOpen={setIsOpen}
                    />{" "}
                    <Box>
                        <List className={styles.sidebarList}>
                            {loading ? (
                                <p>Loading...</p>
                            ) : error ? (
                                <p>Error: {error}</p>
                            ) : (
                                (movedItems.length > 0
                                    ? movedItems
                                    : navItems
                                ).map((item, index) => (
                                    <SidebarItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        moveItem={handleMoveItem}
                                        updateTitleLocally={
                                            handleUpdateTitleLocally
                                        }
                                        editMode={editMode}
                                    />
                                ))
                            )}
                        </List>
                    </Box>
                </Drawer>
            )}
        </DndProvider>
    );
};

export default Sidebar;
