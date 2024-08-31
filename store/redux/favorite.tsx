import {createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
    ids: any[]
  }

  const initialState: CounterState = {
    ids: [],
  }

export const favorites = createSlice({
    name : 'favorites',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<any>) =>{
            state.ids.push(action.payload.id)
        },
        removeFavorite: (state, action: PayloadAction<any>) =>{
            state.ids.splice(state.ids.indexOf(action.payload.id), 1)
        }
    }
})

export const {addFavorite, removeFavorite}:any = favorites.actions;

export default favorites.reducer;
