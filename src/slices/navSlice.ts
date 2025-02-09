import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchNavItems } from "../api/navApi";

export interface NavItem {
    id: number;
    title: string;
    target?: string;
    children?: NavItem[];
    visible?: boolean;
}

interface MoveItemPayload {
    id: number;
    from: number;
    to: number;
    parentId?: number;
}

interface NavState {
    items: NavItem[];
    loading: boolean;
    error: string | null;
}

const initialState: NavState = {
    items: [],
    loading: false,
    error: null,
};

const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        moveItem(state, action: PayloadAction<MoveItemPayload>) {
            const { from, to, parentId } = action.payload;

            if (parentId !== undefined) {
                const parent = state.items.find((item) => item.id === parentId);
                if (parent && parent.children) {
                    const movedItem = parent.children.splice(from, 1)[0];
                    parent.children.splice(to, 0, movedItem);
                }
            } else {
                const movedItem = state.items.splice(from, 1)[0];
                state.items.splice(to, 0, movedItem);
            }
        },
        updateTitle(state, action: PayloadAction<{ id: number; title: string }>) {
            const { id, title } = action.payload;

            const findAndUpdateTitle = (items: NavItem[]) => {
                for (const item of items) {
                    if (item.id === id) {
                        item.title = title;
                        return;
                    }
                    if (item.children) {
                        findAndUpdateTitle(item.children);
                    }
                }
            };

            findAndUpdateTitle(state.items);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchNavItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNavItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchNavItems.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.error.message || "Failed to fetch navigation.";
            });
    },
});

export const { moveItem, updateTitle } = navSlice.actions;
export default navSlice.reducer;
