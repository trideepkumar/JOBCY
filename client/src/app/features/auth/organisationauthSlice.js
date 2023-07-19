import { createSlice } from '@reduxjs/toolkit';
 
const initialState = {
    authState: JSON.parse(localStorage.getItem('organisation')) ? JSON.parse(localStorage.getItem('organisation')) : null
}

const organisationauthSlice = createSlice({
  name: 'organisation',
  initialState,
  reducers: {
     setorganisationAuth : (state) => {
         state.authState = JSON.parse(localStorage.getItem('organisation'))
     },
     clearorganisationAuth: (state) => {
        state.authState = null
     }
   }
})

export default organisationauthSlice.reducer
export const { setorganisationAuth , clearorganisationAuth } = organisationauthSlice.actions