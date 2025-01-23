import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledChip = styled(Chip)(({ theme }) => ({
    borderRadius: 8,
    marginRight: 4,
    '&.MuiChip-filled': {
        '&.default': {
            backgroundColor: `#F6F7FB`,
            color: `#0C0C0C`,
            borderColor: `#E5E5EA`,
        },
    },

    '&.primary': {
        '&.MuiChip-filled': {
            backgroundColor: `#33728D !important`,
            borderRadius: '16px !important',
        },
        '&.MuiChip-outlined': {
            borderColor: `#33728D !important`,
            color: `#33728D !important`,
        },
    },
    '& .darkPrimary': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.primary.dark} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.primary.dark} !important`,
            color: `${theme.palette.primary.dark} !important`,
        },
    },
    '& .lightPrimary': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.primary.light} !important`,
            color: `${theme.palette.primary.dark} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.primary.light} !important`,
            color: `${theme.palette.primary.light} !important`,
        },
    },
    '& .warning': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.warning.light} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.warning.main} !important`,
            color: `${theme.palette.warning.main} !important`,
        },
    },
    '& .lightWarning': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.warning.light} !important`,
            color: `${theme.palette.warning.main} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.warning.light} !important`,
            color: `${theme.palette.warning.light} !important`,
        },
    },
    '& .darkWarning': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.warning.dark} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.warning.dark} !important`,
            color: `${theme.palette.warning.dark} !important`,
        },
    },
    '& .error': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.error.light} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.error.main} !important`,
            color: `${theme.palette.error.main} !important`,
        },
    },
    '& .lightError': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.error.light} !important`,
            color: `${theme.palette.error.main} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.error.light} !important`,
            color: `${theme.palette.error.light} !important`,
        },
    },
    '& .darkError': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.error.dark} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.error.dark} !important`,
            color: `${theme.palette.error.dark} !important`,
        },
    },
    '& .success': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.success.light} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.success.main} !important`,
            color: `${theme.palette.success.main} !important`,
        },
    },
    '& .lightSuccess': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.success.light} !important`,
            color: `${theme.palette.success.main} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.success.light} !important`,
            color: `${theme.palette.success.light} !important`,
        },
    },
    '& .darkSuccess': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.success.dark} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.success.dark} !important`,
            color: `${theme.palette.success.dark} !important`,
        },
    },
    '& .secondary': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.secondary.main} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.secondary.main} !important`,
            color: `${theme.palette.secondary.main} !important`,
        },
    },
    '& .darkSecondary': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.secondary.dark} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.secondary.dark} !important`,
            color: `${theme.palette.secondary.dark} !important`,
        },
    },
    '& .lightSecondary': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.secondary.light} !important`,
            color: `${theme.palette.secondary.main} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.secondary.light} !important`,
            color: `${theme.palette.secondary.light} !important`,
        },
    },
    '& .gray': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.gray?.main} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.gray?.main} !important`,
            color: `${theme.palette.gray?.main} !important`,
        },
    },
    '& .darkGray': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.gray?.dark} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.gray?.dark} !important`,
            color: `${theme.palette.gray?.dark} !important`,
        },
    },
    '& .lightGray': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.gray?.lighter} !important`,
            color: `${theme.palette.gray?.main} !important`,
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.gray?.light} !important`,
            color: `${theme.palette.gray?.light} !important`,
        },
    },
    '&.grey': {
        '&.MuiChip-filled': {
            backgroundColor: `${theme.palette.grey[800]} !important`,
            color: `${theme.palette.grey[800]} !important`,
            borderRadius: '4px !important',
        },
        '&.MuiChip-outlined': {
            borderColor: `${theme.palette.grey[800]} !important`,
            color: `${theme.palette.grey[800]} !important`,
        },
    },
}));
