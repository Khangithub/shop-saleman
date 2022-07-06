import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { from, of } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { getCurrentProductAction, getCurrentProductSuccessAction, getFailedProductAction, getProductsOfSalemanAction, getProductsOfSalemanSuccessAction } from "../actions/product.actions";

@Injectable()
export class ProductEffect {
    constructor(
        private action: Actions,
        private product_service: ProductService,
    ) { }

    // get products of saleman action
    getProductsOfSaleman$ = createEffect(() =>
        this.action.pipe(
            ofType(getProductsOfSalemanAction),
            switchMap(({ salemanId, pageIndex, limit }) =>
                from(this.product_service.getProductsOfSaleman(salemanId, pageIndex, limit)).pipe(
                    map(
                        (result => {
                            if (result.hasOwnProperty('docs')) {
                                return getProductsOfSalemanSuccessAction({ products: result.docs });
                            } else {
                                throw result;
                            }
                        }),
                    ),
                    catchError(({ error }) => of(getFailedProductAction({ errorMessage: error.err.message })))
                )
            ),
        )
    )

    // get current product action
    getCurrentProduct$ = createEffect(() =>
        this.action.pipe(
            ofType(getCurrentProductAction),
            switchMap(({ productId }) =>
                from(this.product_service.getCurrentProduct(productId)).pipe(
                    map(
                        (result => {
                            if (result.hasOwnProperty('name')) {
                                return getCurrentProductSuccessAction({ product: result })
                            } else {
                                throw result;
                            }
                        }),
                    ),
                    catchError(({ error }) => of(getFailedProductAction({ errorMessage: error.err.message })))
                )
            ),
        )
    )
}
