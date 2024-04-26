import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as RadioActions from "./radio.actions";
import { Router } from "@angular/router";
import { RadioService } from "@app/services/radios/radio.service";
import { ToastService } from "@app/services/toast/toast.service";
import { of, from } from "rxjs";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";

@Injectable()
export class RadioEffects {
    constructor(
        private actions$: Actions,
        private radioService: RadioService,
        private toastService: ToastService,
        private router: Router
    ) { }

    loadSerialRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadSerialRadio),
            switchMap(({ serialNumber }) =>
                from(this.radioService.querySerialRadio(serialNumber).valueChanges).pipe(
                    map(({ data }) => RadioActions.loadSerialRadioSuccess({ radio: data.radio })),

                    catchError((error) => of(RadioActions.loadSerialRadioFailure({ error })))
                )
            )
        )
    );

    loadOneRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadOneRadio),
            mergeMap(({ radioID }) => {
                return this.radioService.querySingleRadio(radioID).valueChanges.pipe(
                    map(({ data }) => {
                        return RadioActions.loadOneRadioSuccess({ radio: data.radio });
                    }),
                    catchError((error) => {
                        console.error('Error loading oneRadio: ', error);
                        return of(RadioActions.loadOneRadioFailure({ error }));
                    })
                );
            })
        )
    );


    loadAllRadios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadAllRadios),
            switchMap(() =>
                from(this.radioService.allRadios().valueChanges).pipe(
                    map(({ data }) => RadioActions.loadAllRadiosSuccess({ radios: data.radios })),

                    catchError((error) => of(RadioActions.loadAllRadiosFailure({ error })))

                )
            )
        )
    );

    loadOrgRadios$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.loadOrgRadios),
            switchMap(({ orgName }) =>
                from(this.radioService.orgRadios(orgName).valueChanges).pipe(
                    map(({ data }) => RadioActions.loadOrgRadiosSuccess({ radios: data.orgRadios })),

                    catchError((error) => of(RadioActions.loadOrgRadiosFailure({ error })))
                )
            )
        )
    );



    addRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.addRadio),
            switchMap(({
                orgName,
                locationName,
                datePurchased,
                dateEntered,
                inventoryNumber,
                make,
                model,
                progChannels,
                notes,
                serialNumber,
                warranty,
                refurb,
                radioType
            }) =>
                from(this.radioService.addRadio(
                    orgName,
                    locationName,
                    datePurchased,
                    dateEntered,
                    inventoryNumber,
                    make,
                    model,
                    progChannels,
                    notes,
                    serialNumber,
                    warranty,
                    refurb,
                    radioType
                )).pipe(
                    map(({ data }) => RadioActions.addRadioSuccess({ radio: data?.addRadio })),

                    catchError((error) => of(RadioActions.addRadioFailure({ error })))
                )
            )
        )
    );

    addRadioSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.addRadioSuccess),
            map(({ radio }) => {
                this.toastService.show('Radio added successfully!', {
                    delay: 3000
                }),
                    this.router.navigate(['one-radio', radio?._id])
            })
        ),
        { dispatch: false }
    );

    addRadioFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.addRadioFailure),
            map(({ error }) => {
                this.toastService.show('Failed to submit radio. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );

    editRadio$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.editRadio),
            switchMap(({ id, updates }) =>
                from(this.radioService.editRadio(id, updates)).pipe(
                    map(({ data }) =>
                        RadioActions.editRadioSuccess({ radio: data?.editRadio })),

                    catchError((error) => of(RadioActions.editRadioFailure({ error })))
                )

            )
        )
    );

    editRadioSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.editRadioSuccess),
            map(({ radio }) => {
                this.toastService.show('Radio edited successfully!', {
                    delay: 3000
                }),
                    this.router.navigate(['one-radio', radio?._id])
            })
        ),
        { dispatch: false }
    );

    editRadioFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(RadioActions.editRadioFailure),
            map(({ error }) => {
                this.toastService.show('Failed to edit radio. Please try again', {
                    classname: 'bg-danger light-text',
                    delay: 3000
                }),
                    console.error(error)
            })
        ),
        { dispatch: false }
    );
} 
