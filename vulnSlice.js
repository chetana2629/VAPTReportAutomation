import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all
export const fetchVulns = createAsyncThunk("vulns/fetchVulns", async () => {
  const res = await axios.get("/api/vulns");
  return res.data;
});

// Search
export const searchVulns = createAsyncThunk("vulns/searchVulns", async (query) => {
  const res = await axios.get(`/api/vulns/search?q=${query}`);
  return res.data;
});

export const fetchSuggestions = createAsyncThunk(
  "vulns/fetchSuggestions",
  async (query) => {
    const res = await axios.get(`/api/vulns/suggest?q=${query}`);
    return res.data;
  }
);
// Update vuln
export const updateVuln = createAsyncThunk("vulns/updateVuln", async ({ id, updates }) => {
  const res = await axios.put(`/api/vulns/${id}`, updates);
  return res.data;
});

const vulnSlice = createSlice({
  name: "vulns",
  initialState: {
    items: [],
    suggestions: [],
    loading: false,
    error: null,
    hasSearched: false,
  },
  reducers: {
    resetFilters: (state) => {
      state.items = [];
      state.suggestions = [];
      state.hasSearched = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVulns.fulfilled, (state, action) => {
        state.items = action.payload;
        state.hasSearched = true;
        state.loading = false;
      })
      .addCase(searchVulns.fulfilled, (state, action) => {
        state.items = action.payload;
        state.hasSearched = true;
        state.loading = false;
      })
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      .addCase(updateVuln.fulfilled, (state, action) => {
        const idx = state.items.findIndex(v => v._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      });
  },
});

export const { resetFilters } = vulnSlice.actions;
export default vulnSlice.reducer;
