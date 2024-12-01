import {configureStore} from '@reduxjs/toolkit';
import productsReducer from 'state/getProducts'
import cardReducer from 'state/addToCard'
import favoritesReducer from 'state/addToFavorites'
import categoriesReducer from 'state/getCategories'
import productReducer from 'state/getProduct'

export const store = configureStore({
    reducer: {
        products: productsReducer,
        card: cardReducer,
        favorites: favoritesReducer,
        categories: categoriesReducer,
        product: productReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;