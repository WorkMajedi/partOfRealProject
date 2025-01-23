import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    createPopup,
    closePopup,
} from 'redux/slices/managePopup/managePopupSlice';
import { useFormContext } from 'react-hook-form';
import { updateGrid } from 'redux/slices/dataGrid/gridsDataSlice';
import { useKeyPress } from 'ahooks';
import { GenerationContentModalProps } from './type';
import { CustomDialog } from '../CustomDialog';

export default function GenerationContentModal({
    modals,
    name,
}: GenerationContentModalProps) {
    const selected = useSelector((state: any) => {
        const sel = state?.ManagePopup?.Popup.find((e: any) => e.name === name);
        return sel;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createPopup({ name, isOpen: false }));
    }, []);

    const handelClosePopup = () => {
        dispatch(closePopup({ name, isOpen: false }));
        const input = selected.state?.inputRef?.current;
        setTimeout(() => {
            selected?.state?.ref?.current?.querySelector('input')?.focus();
            input?.focus();
        }, 1);
    };

    const { handleSubmit, reset, setValue } = useFormContext();

    const ref: any = useRef(null);

    useKeyPress(
        'Enter',
        (e: any) => {
            let count = 0;
            function gridFinder(el: any): any {
                if (count === 15) return false;
                if (el?.role === 'grid') {
                    return el;
                }
                count++;
                return gridFinder(el?.parentElement);
            }
            const gridEl = gridFinder(e.target);
            if (gridEl) {
                return null;
            }
            const isAutocompleteOpen: HTMLElement | null =
                document.querySelector('.MuiAutocomplete-popper');
            if (isAutocompleteOpen) return null;

            const formNodeList: any[] = [...ref.current.querySelectorAll('*')];
            const textFiledsList: any[] = formNodeList.filter(i => {
                return (
                    i.nodeName === 'INPUT' ||
                    i.nodeName === 'TEXTAREA' ||
                    i.role === 'grid'
                );
            });
            if (
                e.target.parentElement.classList.contains(
                    'Mui-error' || 'error',
                )
            ) {
                e.preventDefault();
                e.target.parentElement.parentElement.classList.add(
                    'shake-animate',
                );
                setTimeout(() => {
                    e.target.parentElement.parentElement.classList.remove(
                        'shake-animate',
                    );
                }, 500);
                return e.target.focus();
            }
            if (
                e.target.parentElement.parentElement?.classList.value.includes(
                    'required',
                ) &&
                e.target.value.length <= 0
            ) {
                e.preventDefault();
                e.target.parentElement.parentElement.classList.add(
                    'shake-animate',
                );
                setTimeout(() => {
                    e.target.parentElement.parentElement.classList.remove(
                        'shake-animate',
                    );
                }, 500);
                return e.target.focus();
            }

            const formButton: any = formNodeList.filter(
                i => i.nodeName === 'BUTTON' && i.type === 'submit',
            )[0];

            let inputIndex: number = textFiledsList.findIndex(
                i => i === e.target,
            );
            if (inputIndex === textFiledsList.length - 1)
                return formButton?.focus?.();

            if (inputIndex > textFiledsList.length) inputIndex = -1;
            if (textFiledsList[inputIndex + 1]?.role === 'grid') {
                e.preventDefault();
                const firstCell =
                    textFiledsList[inputIndex + 1]?.querySelector(
                        '[role="cell"]',
                    );
                firstCell?.click();
                firstCell?.focus();
            } else {
                textFiledsList[inputIndex + 1].focus();
            }

            e.preventDefault();
        },
        {
            target: ref,
        },
    );

    const chooseComponent = useMemo(
        () => (type: string, dialog: any) => {
            setTimeout(() => {
                const dialogEl = document?.querySelector(
                    '[role="presentation"]',
                );
                const dialogElFirstInput: any = dialogEl?.querySelector(
                    'input:not(:disabled)',
                );

                dialogElFirstInput?.focus();
            }, 5);

            const dialogFieldNames = dialog?.fields?.map((f: any) => f.name);

            const onSave = handleSubmit((d: any) => {
                const details: any = {};
                Object.keys(d).map((key: any) => {
                    if (dialogFieldNames.includes(key)) {
                        details[key] = d[key];
                    }
                });

                dispatch(
                    updateGrid({
                        name: selected?.state?.grid,
                        row: {
                            ...(selected?.state?.row ?? {}),
                            details,
                            ...details,
                        },
                    }),
                );
                reset({});
            });

            switch (type) {
                case 'detail':
                    return (
                        <CustomDialog
                            maxWidth="md"
                            open={selected?.isOpen}
                            closeModal={handelClosePopup}
                            title={dialog?.label}
                            onSave={onSave}
                        >
                            <pre>{JSON.stringify(selected, null, 2)}</pre>
                        </CustomDialog>
                    );
            }
        },
        [
            handleSubmit,
            dispatch,
            selected?.state,
            selected?.isOpen,
            reset,
            handelClosePopup,
            modals,
        ],
    );
    if (!modals) {
        return null;
    }
    return <>{chooseComponent(modals[name].type, modals[name])}</>;
}
