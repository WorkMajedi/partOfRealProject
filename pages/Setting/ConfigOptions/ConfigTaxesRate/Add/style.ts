import { css } from '@emotion/react';

const styles = {
    parent: css`
        background-color: #fff;
        margin-inline-start: 15px;
        padding: 30px;
        border: 1px solid #f2f2f7;
        border-radius: 8px;
    `,
    parentInput: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        & .description {
            border: 1px solid #e5e5ea;
            border-radius: 4px;
            padding: 12px 16px;
        }
        & .code {
            & .MuiButtonBase-root {
                background: #f2f2f7;
                height: 53px;
                width: 50px;
                margin-inline-end: -14px;
                border-radius: 6px;
            }
        }
        & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
            border: 1px solid #e5e5ea;
            border-radius: 4px;
        }
    `,
    parentAddImage: css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 150px;
        background: #f8f8f8;
        border: 1px dashed #003b5b;
        border-radius: 4px;
        & .addBox {
            width: 100px;
            display: flex;
            flex-direction: column;
            text-align: center;
            justify-content: center;
            align-items: center;
            color: #003b5b;
        }
    `,
    parentSwitchInput: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        & .code {
            & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
                border: 1px solid #e5e5ea;
                border-radius: 4px;
            }
            & .MuiSwitch-thumb {
                background: #74c772;
            }
            & .MuiSwitch-track {
                width: 36px;
                background: #f8f8f8;
                border: 1px solid #e5e5ea;
                border-radius: 100px;
            }
        }
    `,
    parentInputsSecond: css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        & .description {
            border: 1px solid #e5e5ea;
            border-radius: 4px;
            padding: 12px 16px;
        }
        & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
            border: 1px solid #e5e5ea;
            border-radius: 4px;
        }
    `,
    parentInputsThird: css`
        display: flex;
        align-items: center;
        & .description {
            border: 1px solid #e5e5ea;
            border-radius: 4px;
            padding: 12px 16px;
        }
        & .code {
            & .MuiButtonBase-root {
                background: #f2f2f7;
                height: 53px;
                width: 50px;
                margin-inline-end: -14px;
                border-radius: 6px;
            }
        }
        & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
            border: 1px solid #e5e5ea;
            border-radius: 4px;
        }
    `,
    parentUPC: css`
        margin-right: 85px;
        & .upcInput {
            & p {
                margin-bottom: 10px;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                color: #727276;
            }
            & .MuiInputBase-root {
                border: 1px solid #e5e5ea;
                border-radius: 4px;
                padding: 7px 16px;
            }
        }
        & .parentButtonBase {
            align-items: flex-end;
            display: flex;
            justify-content: space-around;
            & .MuiButtonBase-root {
                padding: 10px 35px 10px 10px;
                border: 1px solid #003b5b;
                border-radius: 4px;
                color: #003b5b;
            }
        }
    `,
    parentTable: css`
        & .css-1m5ydco-MuiTableCell-root {
            border: none;
            padding: 0;
        }
        & .MuiTablePagination-root {
            border-top: 1px solid #e0e0e0;
            margin-top: 30px;
        }
        & .MuiSwitch-thumb {
            background: #74c772;
        }
        & .MuiSwitch-thumb:checked {
            background: #e5e5ea;
        }
        & .MuiSwitch-track {
            width: 36px;
            background: #f8f8f8;
            border: 1px solid #e5e5ea;
            border-radius: 100px;
        }
        &
            .css-1tuwgmr-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked
            + .MuiSwitch-track {
            background: #f8f8f8;
        }
    `,
    parentSellingInputs: css`
        display: flex;
        & .css-1w5588l-MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root {
            height: 45px;
        }
        & .css-1d3z3hw-MuiOutlinedInput-notchedOutline {
            border: none;
        }
        & .upcInput {
            margin-inline-end: 10px;
            & p {
                margin-bottom: 10px;
                font-weight: 600;
                font-size: 14px;
                line-height: 17px;
                color: #727276;
            }
            & .MuiInputBase-root {
                border: 1px solid #e5e5ea;
                border-radius: 4px;
                padding: 7px 16px;
            }
        }
        & .parentButtonBase {
            align-items: flex-end;
            display: flex;
            justify-content: flex-end;
            & .MuiButtonBase-root {
                padding: 10px 15px 10px 10px;
                border: 1px solid #003b5b;
                border-radius: 4px;
                color: #003b5b;
            }
        }
        & .code {
            & .MuiButtonBase-root {
                background: #f2f2f7;
                height: 44px;
                width: 50px;
                margin-inline-end: -17px;
                border-radius: 6px;
            }
        }
        & .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input {
            padding: 4px 14px;
        }
    `,
};

export default styles;
