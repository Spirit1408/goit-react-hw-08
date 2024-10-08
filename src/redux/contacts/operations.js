import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
	"contacts/fetchAll",
	async (_, thunkAPI) => {
		try {
			const response = await axios.get("/contacts");
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	},
);

export const addContact = createAsyncThunk(
	"contacts/addContact",
	async (contact, thunkAPI) => {
		try {
			const response = await axios.post("/contacts", {
				name: contact.name,
				number: contact.number,
			});
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	},
);

export const deleteContact = createAsyncThunk(
	"contacts/deleteContact",
	async (contactId, thunkAPI) => {
		try {
			const response = await axios.delete(`/contacts/${contactId}`);
			return response.data;
		} catch (e) {
			return thunkAPI.rejectWithValue(e.message);
		}
	},
);

export const updateContact = createAsyncThunk(
	"contacts/updateContact",
	async (contact, thunkAPI) => {
		try {
			const response = await axios.patch(`/contacts/${contact.id}`, {
				name: contact.name,
				number: contact.number,
			});
			return response.data;
		} catch (e) {
			thunkAPI.rejectWithValue(e.message);
		}
	},
);
