import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const gridStyles = ({ theme }: any) => ({
    '& .MuiDataGrid-root': {
        background: theme.palette.common.main,
        margin: '20px 0',

        '& .MuiDataGrid-cell': {
            padding: 0,
            '& .MuiFormControl-root': {
                // padding: '0 10px',
                height: '100%',
            },
        },
        '&.MuiDataGrid-withBorderColor, & .MuiDataGrid-withBorderColor': {
            borderColor: theme.palette.grey[300],
        },
        '& .MuiDataGrid-columnHeadersInner': {
            background: theme.palette.grey[200],
        },
        '& .MuiDataGrid-columnHeader': {
            '&:hover, &:focus': {
                background: theme.palette.grey[400],
            },
        },
        '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 600,
            fontSize: 14,
            textTransform: 'capitalize',
        },
        '& .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--sorted': {
            backgroundColor: theme.palette.grey[400],
        },
        '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-columnHeader:focus-within':
            {
                outline: `unset`,
                outlineOffset: '-1px',
                backgroundColor: theme.palette.grey[400],
            },

        '& .MuiDataGrid-cell:focus-within, .MuiDataGrid-cell:focus': {
            outline: `solid ${theme.palette.primary.main} 2px`,
            outlineOffset: '-1px',
        },

        '& .MuiDataGrid-iconSeparator': {
            display: 'block',
        },
        '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
            borderRight: `1px solid ${theme.palette.grey[300]}`,
        },
        '& .MuiDataGrid-columnHeaderDraggableContainer, & .MuiDataGrid-columnHeaderTitleContainer':
            {
                gap: 8,
            },
        '& .MuiDataGrid-menuIconButton': {
            marginRight: 6,
        },

        '& .MuiDataGrid-row': {
            '&:hover': {
                backgroundColor: theme.palette.grey[100],
            },
        },

        '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: theme.palette.grey[100],
            '&:hover': {
                backgroundColor: theme.palette.grey[100],
            },
        },

        // inputs
        '& .MuiOutlinedInput-root': {
            height: '100%',
            '& .MuiOutlinedInput-input:not([inputmode])': {
                padding: '10px 14px',
                '&.MuiSelect-select': {
                    padding: '16px 16px',
                },
            },
            '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
                boxShadow: 'none',
            },
        },
        '& .MuiInputLabel-root[data-shrink="true"]': {
            transform: 'translate(14px, -9px) scale(0)',
        },
        '& .MuiFormHelperText-root': {
            display: 'none',
        },

        '& .MuiOutlinedInput-root.Mui-disabled': {
            background: 'transparent',
        },
        '& .AutoCompleteWrapper': {
            padding: 0,
            '& .MuiBox-root': {
                width: '100%',
                height: '100',
                '& .MuiAutocomplete-root .MuiOutlinedInput-root': {
                    padding: '0 0 0 10px',
                },
            },
        },
    },

    // status
    '& .cellStatus': {
        '& .MuiOutlinedInput-input': {
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '16px',
            textAlign: 'center',
            textTransform: 'capitalize',
            color: '#000',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        '& input.Mui-disabled': {
            WebkitTextFillColor: '#000',
        },
    },
    // image
    '& .image_grid.MuiDataGrid-cell': {
        justifyContent: 'center',
    },
    // link
    '& .gridLink.MuiDataGrid-cell': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        button: {
            border: 'none',
            background: 'transparent',
            textDecoration: 'underline',
            color: theme.palette.primary.main,
            fontWeight: 500,
            fontSize: 14,
            ':hover': {
                cursor: 'pointer',
            },
        },
    },
});
export const StyledDataGrid = styled(Box)<any>(({ theme }) =>
    gridStyles({ theme }),
);
