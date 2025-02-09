import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNavItems = createAsyncThunk("nav/fetchNavItems", async () => {
    try {
        const response = await fetch("http://localhost:8081/nav");

        if (!response.ok) {
            throw new Error(`Error fetching nav: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched navigation items:", data);

        return data;
    } catch (error) {
        console.error("Error in fetchNavItems:", error);
        throw new Error("Failed to fetch navigation items.");
    }
});

export const saveNavItems = createAsyncThunk(
    "nav/saveNavItems",
    async (items: any) => {
        try {
            const response = await fetch("http://localhost:8081/nav", {
                method: "POST",
                body: JSON.stringify(items),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Error saving nav: ${response.status} - ${response.statusText}`);
            }

            console.log("Navigation items saved successfully!");
            return items;
        } catch (error) {
            console.error("Error in saveNavItems:", error);
            throw new Error("Failed to save navigation items.");
        }
    }
);

export const trackDragEvent = createAsyncThunk(
    "nav/trackDragEvent",
    async ({ id, from, to, parentId }: { id: number; from: number; to: number; parentId?: number }) => {
        try {
            const response = await fetch("http://localhost:8081/track", {
                method: "POST",
                body: JSON.stringify({ id, from, to, parentId }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Error tracking drag event: ${response.status} - ${response.statusText}`);
            }

            console.log(`Drag event tracked: Item ${id} moved from ${from} to ${to} under parent ${parentId || "root"}`);
        } catch (error) {
            console.error("Error in trackDragEvent:", error);
            throw new Error("Failed to track drag event.");
        }
    }
);


export const updateNavItem = createAsyncThunk(
    "nav/updateNavItem",
    async ({ id, updatedData }: { id: number; updatedData: Partial<{ title: string; visible: boolean }> }) => {
        try {
            const response = await fetch(`http://localhost:8081/nav/${id}`, {
                method: "PATCH",
                body: JSON.stringify(updatedData),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error(`Error updating item ${id}: ${response.status} - ${response.statusText}`);
            }

            console.log(`Item ${id} updated with`, updatedData);
            return { id, updatedData };
        } catch (error) {
            console.error("Error in updateNavItem:", error);
            throw new Error("Failed to update item.");
        }
    }
);
