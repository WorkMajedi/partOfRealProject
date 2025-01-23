import { css } from '@emotion/react';
import { styled } from '@mui/system';

export const styles = {
    dark: css`
        color: #4b4b4b;
    `,
    card: css`
        width: 100%;
        &.MuiPaper-root {
            padding: 10px 12px 20px;
            border-radius: 6px;
            box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
            margin-bottom: 32px;
        }
    `,
    titleCard: css`
        color: #4b4b4b;
        font-size: 21px;
        font-weight: 500;
    `,
    tableDivider: css`
        backgroundcolor: lightgray;
        width: 100%;
        height: 0.5;
        margin: 13px 0 19px;
    `,
    dataTypesCard: css`
        width: 100%;
        &.MuiPaper-root {
            padding: 10px 12px 20px;
            border-radius: 6px;
            box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
        }
    `,
    totalDataCard: css`
        width: 100%;
        &.MuiPaper-root {
            padding: 10px 12px 25px;
            border-radius: 6px;
            margin-left: 24px;
            box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
        }
    `,
    divFlex: css`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `,
    divButton: css`
        display: flex;
        align-items: center;
        text-align: right;
        cursor: pointer;
    `,
    divFlexWrapper: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    flexColumn: css`
        display: flex;
        flex-direction: column;
        flex: 1;
        align-items: center;
    `,
    divWrapperStart: css`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    `,
    divider: css`
        transform: rotate(270deg);
        height: 0.5px;
        width: 25px;
    `,
    cardDivider: css`
        transform: rotate(270deg);
        height: 0.5px;
        width: 69px;
    `,
    textNav: css`
        color: #4b4b4b;
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
    `,
    textTitleTable: css`
        color: #babfc7;
        font-size: 16px;
        font-weight: 400;
    `,
    contentTable: css`
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
        & p {
            color: #6e6b7b;
            font-size: 16px;
            font-weight: 500;
        }
        & .amountText {
            color: #82868b;
            font-size: 14px;
            font-weight: 400;
        }
        & .dateText {
            color: #4b4b4b;
            font-size: 16px;
            font-weight: 400;
        }
        & .codeText {
            border-radius: 17px;
            background: rgba(186, 191, 199, 0.5);
            padding: 0 9px;
            margin: 0 10px;
        }
    `,
};

export const GreenCircle = styled('div')({
    backgroundColor: '#28C76F',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
});

export const RedCircle = styled('div')({
    backgroundColor: '#EA5455',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
});
