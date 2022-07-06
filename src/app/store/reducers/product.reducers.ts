import { createReducer, on } from "@ngrx/store";
import { getCurrentProductSuccessAction, getFailedProductAction, getProductsOfSalemanSuccessAction } from "../actions/product.actions";

const initialState = {
    products: [],
    product: {},
    productError: null
};

export const productReducer = createReducer(
    initialState,
    on(getProductsOfSalemanSuccessAction, (state, { products }) => ({
        ...state,
        products,
        productError: null
    })),

    on(getCurrentProductSuccessAction, (state, { product }) => ({
        ...state,
        product,
        productError: null
    })),

    on(getFailedProductAction, (state, { errorMessage }) => (
        { ...state, productError: errorMessage }
    ))
);