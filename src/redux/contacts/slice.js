import { createSlice } from "@reduxjs/toolkit";
import {
	fetchContacts,
	addContact,
	deleteContact,
	updateContact,
} from "./operations";

const handlePending = (state) => {
	state.loading = true;
};

const handleRejected = (state, action) => {
	state.loading = false;
	state.error = action.payload;
};

const contactsSlice = createSlice({
	name: "contacts",
	initialState: {
		items: [],
		loading: false,
		error: null,
		isModalOpen: false,
	},
	reducers: {
		openModal: (state) => {
			state.isModalOpen = true;
		},
		closeModal: (state) => {
			state.isModalOpen = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchContacts.pending, handlePending)
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.items = action.payload;
			})
			.addCase(fetchContacts.rejected, handleRejected)

			.addCase(addContact.pending, handlePending)
			.addCase(addContact.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				state.items.push(action.payload);
			})
			.addCase(addContact.rejected, handleRejected)

			.addCase(deleteContact.pending, handlePending)
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				const index = state.items.findIndex(
					(contact) => contact.id === action.payload.id,
				);
				state.items.splice(index, 1);
			})
			.addCase(updateContact.pending, handlePending)
			.addCase(updateContact.fulfilled, (state, action) => {
				state.loading = false;
				state.error = null;
				const index = state.items.findIndex(
					(contact) => contact.id === action.payload.id,
				);
				state.items[index] = action.payload;
			})
			.addCase(updateContact.rejected, handleRejected);
	},
});

export const { openModal, closeModal } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
