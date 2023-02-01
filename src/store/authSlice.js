import {createSlice} from '@reduxjs/toolkit';


let initState = {
    data: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        authenticate: (state, action) =>{
            state.data = action.payload.data
        },
    }
})

export default authSlice