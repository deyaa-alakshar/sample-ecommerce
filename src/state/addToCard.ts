import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "./getProducts";

interface cardState {
    card: Product[]
}

const initialState : cardState = {
    card: localStorage.getItem("card") ? JSON.parse(localStorage.getItem("card")!) : [] 
} 

const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers:{
        addToCard: (state, action: PayloadAction<Product>) =>{
            state.card.push(action.payload);
            localStorage.setItem("card", JSON.stringify(state.card))
        },
        removeFromCard: (state, action: PayloadAction<Product>) =>{
            const index = state.card.findIndex((product) => product.id === action.payload.id)
            if(index !== -1){
                state.card.splice(index, 1);
                localStorage.setItem("card", JSON.stringify(state.card))
            }
        },
        resetCard: (state) =>{
                state.card = [];
                localStorage.setItem("card", JSON.stringify([]))   
        }
    },  
});

export const { addToCard, removeFromCard, resetCard } = cardSlice.actions;

export default cardSlice.reducer;
