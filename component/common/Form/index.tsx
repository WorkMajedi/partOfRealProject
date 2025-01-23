/* eslint-disable no-plusplus */
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useKeyPress } from 'ahooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { FindStepFristPath, focusNextInput } from 'utils/utils';
import ConfirmModal from '../ConfirmModal';

const Form: React.FC<any> = (props: any) => {
    const ref: any = useRef(null);
    const modalRef: any = useRef(null);
    const {
        clearErrors,
        setError,
        formState: { errors, isSubmitting, isValid },
    } = useFormContext();
    const { reset, openModal, closeModal } = props;
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const listErrors = { ...errors };
    useEffect(() => {
        const errorFields: any = Object.keys(listErrors);
        // clearErrors();
        errorFields.forEach((fieldName: any) => {
            const typeComponent: any = document.querySelector(
                `[name=${fieldName}]`,
            );
            const errorField: any = document.querySelector(
                `[name=${fieldName}]`,
            );

            if (errorField) {
                const errorMessage: any =
                    errors[fieldName]?.message || 'This field is required';
                setError(`root.${fieldName}`, {
                    type: 'custom',
                    message: errorMessage,
                });
            }
        });

        if (errorFields.length > 0) {
            const firstErrorField = errorFields[0];
            const firstErrorFieldInput: any =
                document.querySelector(`[name=${firstErrorField}] input`) ||
                document.querySelector(`[name=${firstErrorField}]`);

            if (firstErrorFieldInput) {
                setTimeout(() => {
                    firstErrorFieldInput.focus();
                }, 100);
                firstErrorFieldInput.focus();
            }
        }
    }, [isSubmitting, isValid]);

    useLayoutEffect(() => {
        const formNodeList: any = document
            ?.querySelector('form')
            ?.querySelectorAll('*');

        const textFiledsList: any[] = [...formNodeList].filter(
            (i: any) =>
                (i.nodeName === 'INPUT' ||
                    i?.classList.contains('MuiSelect-select')) &&
                !i?.classList.contains('MuiSelect-nativeInput'),
        );
        if (textFiledsList.length > 0) {
            textFiledsList?.[0]?.focus();
            setTimeout(() => {
                const firstInputinForm: any = document?.querySelector(
                    'form input:not(:disabled):not([readonly])',
                );
                firstInputinForm?.focus();
            }, 0);
        }
    }, []);

    const interval = useRef<any>(null);
    useEffect(() => {
        modalRef.current.modalHandler(openModal);
    }, [openModal]);

    const handelReset = () => {
        const path = FindStepFristPath(pathname);
        if (reset) {
            navigate(path);

            interval.current = setTimeout(() => {
                if (pathname.includes('production')) {
                    navigate(`${path}/define`);
                } else if (pathname.includes('report')) {
                    navigate(`${pathname}`);
                } else {
                    navigate(`${path}/add`);
                }
                reset();
            });
        } else {
            interval.current = setTimeout(() => {
                if (pathname) {
                    navigate(`${path}/add`);
                }
            });
            navigate(path);
            ref.current.reset();
        }
    };

    useKeyPress(
        'Enter',
        (e: any) => {
            // set custom error animation
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
            //= ========

            if (
                document.querySelectorAll('li.MuiAutocomplete-option')?.length >
                0
            ) {
                if (
                    document.querySelectorAll(
                        `li[aria-details="grid-autocomplete"]`,
                    )
                ) {
                    return e;
                }
                return focusNextInput(e.target as HTMLElement);
            }

            if (document.querySelectorAll('li.MuiMenuItem-root')?.length > 0) {
                if (
                    document.querySelectorAll(
                        `li[aria-details="grid-autocomplete"]`,
                    )
                ) {
                    return e;
                }
                return focusNextInput(e.target as HTMLElement);
            }

            // ==========================================
            let count = 0;
            // @ts-ignore
            function gridFinder(el: any) {
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

            const inputNodeList = [
                ...ref.current.querySelectorAll(
                    'input:not([disabled]):not([readonly]), textarea:not([readonly]), [role="grid"]',
                ),
            ].filter(el => {
                const skipInNavigation = el.getAttribute(
                    'data-skip-in-navigation',
                );
                const parentSkipInNavigation = el?.parentElement.getAttribute(
                    'data-skip-in-navigation',
                );
                const parentParentSkipInNavigation =
                    el?.parentElement?.parentElement.getAttribute(
                        'data-skip-in-navigation',
                    );

                return (
                    skipInNavigation !== 'true' &&
                    parentSkipInNavigation !== 'true' &&
                    parentParentSkipInNavigation !== 'true'
                );
            });
            let inputIndex = inputNodeList.findIndex(i => i === e.target);
            if (inputIndex >= inputNodeList.length) inputIndex = -1;

            if (inputNodeList[inputIndex]?.role === 'grid') {
                e.preventDefault();
                const firstCell = inputNodeList[inputIndex + 1]?.querySelector(
                    '[role="cell"] input:not([disabled])',
                );
                firstCell?.click();
                firstCell?.focus();
            }

            // when we in textarea enter not focus on next input
            if (inputNodeList[inputIndex]?.nodeName !== 'TEXTAREA') {
                if (inputNodeList[inputIndex + 1]?.role === 'grid') {
                    const firstCell = inputNodeList[
                        inputIndex + 1
                    ]?.querySelector('[role="cell"] input:not([disabled])');
                    firstCell?.click();
                    return firstCell?.focus();
                }
                inputNodeList[inputIndex + 1].focus();
                e.preventDefault();
            }
            //= ========
        },
        {
            target: ref,
        },
    );
    useKeyPress(
        'Tab',
        (e: any) => {
            e.preventDefault();
            // set custom error animation
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
            //= ========

            downAndUpKeyHandler(e, 'DOWN');
        },
        {
            target: ref,
        },
    );
    useKeyPress(
        ['shift.tab'],
        (e: any) => {
            e.preventDefault();
            downAndUpKeyHandler(e, 'UP');
        },
        {
            target: ref,
        },
    );

    const downAndUpKeyHandler = (e: any, arrow: string) => {
        const dropDownRef: any = document.querySelector(
            '.MuiAutocomplete-popper',
        );

        if (
            dropDownRef &&
            document.querySelectorAll('li.MuiAutocomplete-option')?.length > 0
        ) {
            return e;
        }

        let count = 0;
        function cellFinder(el: any): any {
            if (count === 10) return false;
            if (el?.role === 'cell' || el?.role === 'columnheader') {
                return true;
            }
            count++;
            return cellFinder(el?.parentElement);
        }
        const isGridActive = cellFinder(e.target);
        if (isGridActive) return null;

        const formNodeList: any[] = [...ref.current.querySelectorAll('*')];
        const textFiledsList: any[] = formNodeList.filter(
            (i: any) =>
                (i.nodeName === 'INPUT' ||
                    (i.nodeName === 'TEXTAREA' && i.id) ||
                    i.role === 'grid' ||
                    i?.classList.contains('MuiSelect-select')) &&
                !i.classList.contains('MuiTablePagination-select') &&
                !i?.classList.contains('MuiSelect-nativeInput'),
        );
        let inputIndex: number = textFiledsList.findIndex(i => i === e.target);
        if (inputIndex > textFiledsList.length) inputIndex = -1;

        switch (arrow) {
            case 'DOWN':
                textFiledsList[inputIndex + 1].focus();
                if (textFiledsList[inputIndex + 1]?.childNodes.length > 0) {
                    textFiledsList[inputIndex + 1]
                        ?.querySelector('[role="cell"] input:not([disabled])')
                        ?.click();
                    textFiledsList[inputIndex + 1]
                        ?.querySelector('[role="cell"] input:not([disabled])')
                        ?.focus();
                }
                break;
            case 'UP':
                if (inputIndex === 0) return null;
                textFiledsList[inputIndex - 1]?.focus();
                break;
            default:
        }

        e.preventDefault();
    };

    useKeyPress(
        'rightarrow',
        (e: any) => {
            e.preventDefault();
            downAndUpKeyHandler(e, 'DOWN');
        },
        {
            target: ref,
        },
    );

    useKeyPress(
        'leftarrow',
        (e: any) => {
            e.preventDefault();
            downAndUpKeyHandler(e, 'UP');
        },
        {
            target: ref,
        },
    );

    useKeyPress(
        'esc',
        () => {
            modalRef.current.modalHandler(true);
        },
        {
            target: ref,
        },
    );

    return (
        <>
            <ConfirmModal
                onAccept={handelReset}
                onCancel={closeModal}
                ref={modalRef}
            />
            <Box component="form" ref={ref} {...props} />
        </>
    );
};

export default Form;
