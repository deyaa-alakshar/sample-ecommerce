import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "./getProducts";

interface FavoritesState {
    favorites: Product[]
}

const initialState : FavoritesState = {
    favorites: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")!) : [] 
} 

const cardSlice = createSlice({
    name: "favorites",
    initialState,
    reducers:{
        addToFavorites: (state, action: PayloadAction<Product>) =>{
            state.favorites.push(action.payload);
            localStorage.setItem("favorites", JSON.stringify(state.favorites))
        },
        removeFromFavorites: (state, action: PayloadAction<Product>) =>{
            const index = state.favorites.findIndex((product) => product.id === action.payload.id)
            if(index !== -1){
                state.favorites.splice(index, 1)
                localStorage.setItem("favorites", JSON.stringify(state.favorites))
            }
        }
    },  
});

export const { addToFavorites, removeFromFavorites } = cardSlice.actions;

export default cardSlice.reducer;
