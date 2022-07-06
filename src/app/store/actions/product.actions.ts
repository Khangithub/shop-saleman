import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/model/product.model";

export const Types = {
    GET_PRODUCTS_OF_SALEMAN: '[PRODUCT] get products of saleman',
    GET_PRODUCTS_OF_SALEMAN_SUCCESS: '[PRODUCT] get products of saleman success',
    GET_CURRENT_PRODUCT: '[PRODUCT] get current product',
    GET_CURRENT_PRODUCT_SUCCESS: '[PRODUCT] get current product success',
    FAILED_PRODUCT_ACTION: '[PRODUCT] failed product action'
};

export const getProductsOfSalemanAction = createAction(
    Types.GET_PRODUCTS_OF_SALEMAN,
    props<{ salemanId: string; pageIndex: number; limit: number }>()
);

export const getCurrentProductAction = createAction(
    Types.GET_CURRENT_PRODUCT,
    props<{ productId: string }>()
)

export const getProductsOfSalemanSuccessAction = createAction(
    Types.GET_PRODUCTS_OF_SALEMAN_SUCCESS,
    props<{ products: Product[] }>()
)

export const getCurrentProductSuccessAction = createAction(
    Types.GET_CURRENT_PRODUCT_SUCCESS,
    props<{ product: Product }>()
)

export const getFailedProductAction = createAction(
    Types.FAILED_PRODUCT_ACTION,
    props<{ errorMessage: string }>()
)