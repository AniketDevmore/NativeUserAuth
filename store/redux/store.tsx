import {configureStore} from '@reduxjs/toolkit';
import  favorites  from './favorite';

export const store = configureStore({
    reducer : {
        favoriteMeals: favorites
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch