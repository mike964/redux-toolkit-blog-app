import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from "axios";

// const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [
	{ id: '0', name: 'Tianna Jenkins' },
	{ id: '1', name: 'Kevin Grant' },
	{ id: '2', name: 'Madison Price' },
]

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     const response = await axios.get(USERS_URL);
//     return response.data
// })

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	// extraReducers(builder) {
	//     builder.addCase(fetchUsers.fulfilled, (state, action) => {
	//         return action.payload;
	//     })
	// }
})

// export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer
