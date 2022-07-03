import { createReducer, on } from "@ngrx/store";
import { getFailedProductAction, getProductsOfSalemanSuccessAction } from "../actions/product.actions";

const initialState = {
    products: [],
    productError: null
};

export const productReducer = createReducer(
    initialState,
    on(getProductsOfSalemanSuccessAction, (state, { products }) => ({
        ...state,
        products,
        productError: null
    })),

    on(getFailedProductAction, (state, { errorMessage }) => (
        { ...state, productError: errorMessage }
    ))
);