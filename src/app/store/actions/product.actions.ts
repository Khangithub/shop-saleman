import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/model/product.model";

export const Types = {
    GET_PRODUCTS_OF_SALEMAN: '[PRODUCT] get products of saleman',
    GET_PRODUCTS_OF_SALEMAN_SUCCESS: '[PRODUCT] get products of saleman success',
    FAILED_PRODUCT_ACTION: '[PRODUCT] failed product action'
};

export const getProductsOfSalemanAction = createAction(
    Types.GET_PRODUCTS_OF_SALEMAN,
    props<{ salemanId: string; pageIndex: number; limit: number }>()
);

export const getProductsOfSalemanSuccessAction = createAction(
    Types.GET_PRODUCTS_OF_SALEMAN_SUCCESS,
    props<{ products: Product[] }>()
)

export const getFailedProductAction = createAction(
    Types.FAILED_PRODUCT_ACTION,
    props<{ errorMessage: string }>()
)