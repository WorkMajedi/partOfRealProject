// @ts-nocheck
import styled from '@emotion/styled/macro';
import { Box } from '@mui/material';

export const UploaderContainer = styled.div`
    display: flex;
    gap: 16px;
    .dropContainer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 148px;
        height: 148px;
        border-radius: 4px;
        margin-top: 8px;
        margin-bottom: 8px;
        background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='hsl(198, 100%, 22%)' stroke-width='2' stroke-dasharray='10%2c 14%2c 16%2c 8' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e");
        background-color: #f8f8f8;
        color: ${({ theme }) => theme.palette.primary.light};
        &.disabled {
            opacity: 0.5;
        }
        p {
            display: flex;
            flex-direction: column;
            text-align: center;
            font-size: 12px;
            font-style: normal;
            font-weight: 500;
            line-height: 16px; /* 133.333% */
            text-transform: capitalize;
            padding: 16px;
            i {
                margin-bottom: 8px;
                svg {
                    font-size: 25px;
                }
            }
        }
    }
    .MuiButton-containedPrimary.dropContainerBtn {
        margin-top: 8px;
        margin-bottom: 8px;
        padding: 14px 16px;
    }

    //.fileUploadWrapper {
    //
    //}
`;

export const UploadWrapper = styled(Box)`
    ul {
        display: flex;
        gap: 8px;
    }
    .thumb {
        position: relative;
        display: inline-flex;
        justify-content: center;
        border-radius: 4px;
        border: 1px solid #e5e5ea;
        width: 148px;
        height: 148px;
        padding: 2px;
        box-sizing: border-box;
        .image {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            object-fit: cover;
        }
    }

    .fileItemWrapper {
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
        width: auto;
        .fileItem {
            position: relative;
            color: #018cc9;
            font-size: 14px;
            font-weight: 400;
            line-height: normal;
            text-transform: capitalize;
            height: 48px;
            padding: 14px 16px;
            border-radius: 4px;
            border: 1px solid #018cc9;
            background: #fff;
            flex-shrink: 0;
            width: auto;
            .fileName {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 15px;
            }
        }

        &.error {
            .fileItem {
                color: #e52200;
                border: 1px solid #e52200;
                & hr {
                    border-color: #e52200;
                }
            }
            .errorMsg {
                color: #e52200;
            }
        }
    }

    .actionWrapper {
        opacity: 0;
        visibility: hidden;
        position: absolute;
        right: 2px;
        top: 2px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 4px;
        cursor: pointer;
        button {
            display: inline-flex;
            padding: 4px;
        }
        svg {
            font-size: 16px;
            path {
                fill: #fff;
            }
        }
    }
    .thumb:hover {
        .actionWrapper {
            opacity: 1;
            visibility: visible;
        }
        .image {
            filter: brightness(0.5);
        }
    }
`;
