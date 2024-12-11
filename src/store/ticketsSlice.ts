import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTickets } from "../api/fakeApi";
import { Ticket } from '../types/types';

interface TicketsState {
	tickets: Ticket[];
	loading: boolean;
	error: string | null;
}

const initialState: TicketsState = {
	tickets: [],
	loading: false,
	error: null,
}

export const loadTickets = createAsyncThunk("tickets/ loadTickets", async () => {
	const data = await fetchTickets();
	return data;
})

const ticketsSlice = createSlice({
	name: "tickets",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loadTickets.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loadTickets.fulfilled, (state, action) => {
				state.loading = false;
				state.tickets = action.payload;
			})
			.addCase(loadTickets.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || "Error loading tickets";
			})
	}
});

export default ticketsSlice.reducer;
