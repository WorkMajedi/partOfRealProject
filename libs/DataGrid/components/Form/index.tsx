import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { useKeyPress } from 'ahooks';
// import GridConfirmModal from '../ModalGeneration/GridConfirmModal';

const Form: React.FC<any> = (props: any) => {
    const ref: any = useRef(null);
    const modalRef: any = useRef(null);

    const { open } = props;

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
        }
    }, []);

    useEffect(() => {
        modalRef.current.modalHandler(open);
    }, [open]);

    const navigationHandler = (e: any) => {
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
        const isAutocompleteOpen: HTMLElement | null = document.querySelector(
            '.MuiAutocomplete-popper',
        );

        if (isAutocompleteOpen) return null;

        const formNodeList: any[] = [...ref.current.querySelectorAll('*')];
        const textFiledsList: any[] = formNodeList.filter(i => {
            return (
                (i.nodeName === 'INPUT' && !i.disabled) ||
                (i.nodeName === 'TEXTAREA' && i.name) ||
                i.role === 'grid'
            );
        });
        if (e.target.parentElement.classList.contains('Mui-error' || 'error')) {
            e.preventDefault();
            e.target.parentElement.parentElement.classList.add('shake-animate');
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
            e.target.parentElement.parentElement.classList.add('shake-animate');
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

        let inputIndex: number = textFiledsList.findIndex(i => i === e.target);
        if (inputIndex === textFiledsList.length - 1)
            return formButton?.focus?.();

        if (inputIndex > textFiledsList.length) inputIndex = -1;
        if (textFiledsList[inputIndex + 1]?.role === 'grid') {
            e.preventDefault();
            const firstCell =
                textFiledsList[inputIndex + 1]?.querySelector('[role="cell"]');
            firstCell?.click();
            firstCell?.focus();
        } else {
            if (textFiledsList[inputIndex + 1]?.nodeName === 'TEXTAREA') {
                textFiledsList[inputIndex + 2].focus();
            }
            textFiledsList[inputIndex + 1].focus();
        }

        e.preventDefault();
    };

    useKeyPress('Enter', (e: any) => navigationHandler(e), {
        target: ref,
    });

    useKeyPress(
        'Tab',
        (e: any) => {
            e.stopPropgation();
            e.preventDefault();
            navigationHandler(e);
        },
        {
            target: ref,
        },
    );

    const downAndUpKeyHandler = (e: any, arrow: string) => {
        const dropDownRef: any = document.querySelector(
            '.MuiAutocomplete-popper',
        );
        if (dropDownRef) return e;

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
        const isAutocompleteOpen: HTMLElement | null = document.querySelector(
            '.MuiAutocomplete-popper',
        );

        if (isAutocompleteOpen) return null;

        const formNodeList: any[] = [...ref.current.querySelectorAll('*')];
        const textFiledsList: any[] = formNodeList.filter(
            (i: any) =>
                (i.nodeName === 'INPUT' ||
                    i.nodeName === 'TEXTAREA' ||
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
                        ?.querySelector('.MuiDataGrid-cell')
                        ?.click();
                    textFiledsList[inputIndex + 1]
                        ?.querySelector('.MuiDataGrid-cell')
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
        'downarrow',
        (e: any) => {
            downAndUpKeyHandler(e, 'DOWN');
        },
        {
            target: ref,
        },
    );

    useKeyPress(
        'uparrow',
        (e: any) => {
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
            {/* <GridConfirmModal */}
            {/*    onAccept={() => { */}
            {/*        if (reset) { */}
            {/*            reset(); */}
            {/*        } else { */}
            {/*            ref.current.reset(); */}
            {/*        } */}
            {/*    }} */}
            {/*    ref={modalRef} */}
            {/* /> */}
            <Box component="form" ref={ref} {...props} />
        </>
    );
};

export default Form;
