import Inter300 from './Fonts/Inter-Light.ttf';
import Inter400 from './Fonts/Inter-Regular.ttf';
import Inter500 from './Fonts/Inter-Medium.ttf';
import Inter600 from './Fonts/Inter-SemiBold.ttf';
import Inter700 from './Fonts/Inter-Bold.ttf';
import Inter800 from './Fonts/Inter-ExtraBold.ttf';
import Inter900 from './Fonts/Inter-Black.ttf';

const overrides = {
    MuiCssBaseline: {
        styleOverrides: `
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 300;
          src: local('Inter'), local('Inter-Light'), url(${Inter300}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Inter'), local('Inter-Regular'), url(${Inter400}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 500;
          src: local('Inter'), local('Inter-Medium'), url(${Inter500}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 600;
          src: local('Inter'), local('Inter-SemiBold'), url(${Inter600}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 700;
          src: local('Inter'), local('Inter-Bold'), url(${Inter700}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 800;
          src: local('Inter'), local('Inter-ExtraBold'), url(${Inter800}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
        @font-face {
          font-family: 'Inter';
          font-style: normal;
          font-display: swap;
          font-weight: 900;
          src: local('Inter'), local('Inter-Black'), url(${Inter900}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
    MuiInputLabel: {
        styleOverrides: {
            root: ({ theme }: any) => ({
                fontWeight: 400,
                color: theme.palette.grey[800],
                '&.Mui-focused': {
                    color: theme.palette.grey[800],
                    backgroundColor: theme.palette.common.main,
                },
                '&.Mui-disabled': {
                    color: theme.palette.grey[800],
                },
                '&.Mui-error': {
                    color: theme.palette.error.main,
                },
                '&.Mui-required .MuiInputLabel-asterisk': {
                    color: theme.palette.error.main,
                },
            }),
        },
    },
    MuiOutlinedInput: {
        styleOverrides: {
            root: ({ theme }: any) => ({
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.grey[300],
                },

                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.primary.light,
                },

                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    boxShadow: `-1px 1px 4px 4px ${theme.palette.primary[20]}`,
                    borderColor: theme.palette.primary.light,
                },

                '&.Mui-disabled': {
                    background: theme.palette.grey[200],
                    '& .MuiOutlinedInput-notchedOutline, &:hover .MuiOutlinedInput-notchedOutline':
                        {
                            borderColor: theme.palette.grey[300],
                        },
                },

                '&.Mui-disabled.Mui-error': {
                    '& input': {
                        '-webkit-text-fill-color': theme.palette.error.main,
                    },
                },

                '&.Mui-error': {
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.error.main,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.error.main,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        boxShadow: `-1px 1px 4px 4px ${theme.palette.error[10]}`,
                        borderColor: theme.palette.error.main,
                    },
                    '& input': {
                        color: theme.palette.error.main,
                    },
                    '& svg': {
                        '& path': {
                            fill: theme.palette.error.main,
                        },
                    },
                },

                '& input, & textarea': {
                    background: 'transparent',
                    '&::placeholder': {
                        color: theme.palette.grey[800],
                    },
                    '&.Mui-disabled': {
                        WebkitTextFillColor: theme.palette.grey[800],
                    },
                },

                '& svg': {
                    '& path': {
                        fill: theme.palette.grey[800],
                    },
                },
            }),
        },
    },
    MuiFormHelperText: {
        styleOverrides: {
            root: ({ theme }: any) => ({
                margin: '4px 0',
                fontSize: '13px',
                lineHeight: '16px',
                color: theme.palette.grey[800],
            }),
        },
    },
    MuiAutocomplete: {
        styleOverrides: {
            popper: ({ theme }: any) => ({
                '& .MuiPaper-root.MuiAutocomplete-paper': {
                    borderRadius: 4,
                    marginTop: 4,
                    boxShadow: '0px 7px 20px 0px #00000026',
                    '& .MuiAutocomplete-listbox': {
                        padding: 8,
                        '& .MuiAutocomplete-option': {
                            padding: '6px 8px',
                            borderRadius: 4,
                            '& .code': {
                                padding: '4px 6px',
                                background: theme.palette.grey[300],
                                borderRadius: 4,
                                marginRight: 4,
                            },
                            '& .description': {
                                fontWeight: 400,
                                fontSize: '14px',
                                color: theme.palette.inkey.main,
                            },
                        },
                    },
                },
            }),
        },
    },
    MuiPopover: {
        styleOverrides: {
            root: ({ theme }: any) => ({
                '& .MuiList-root': {
                    '& .code': {
                        padding: '4px 6px',
                        background: theme.palette.grey[300],
                        borderRadius: 4,
                        marginRight: 4,
                    },
                    '& .label': {
                        fontWeight: 400,
                        fontSize: '14px',
                        color: theme.palette.inkey.main,
                    },
                },
            }),
        },
    },
    MuiSelect: {
        styleOverrides: {
            select: ({ theme }: any) => ({
                '& .code': {
                    padding: '4px 6px',
                    background: theme.palette.grey[300],
                    borderRadius: 4,
                    marginRight: 4,
                },
                '& .label': {
                    fontWeight: 400,
                    fontSize: '14px',
                    color: theme.palette.inkey.main,
                },
            }),
        },
    },
    MuiGrid: {
        styleOverrides: {
            root: ({ theme }: any) => ({
                '& .item': {
                    padding: 0,
                },
            }),
        },
    },
    // MuiButton: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: 11,
    //             paddingRight: 35,
    //             paddingLeft: 35,
    //             height: 54,
    //         },
    //         sizeMedium: {
    //             height: 44,
    //             paddingRight: 35,
    //             paddingLeft: 35,
    //         },
    //         sizeSmall: {
    //             height: 34,
    //             paddingRight: 35,
    //             paddingLeft: 35,
    //         },
    //         outlined: {
    //             paddingRight: 33,
    //             paddingLeft: 33,
    //         },
    //         text: {
    //             paddingRight: 35,
    //             paddingLeft: 35,
    //         },
    //         endIcon: {
    //             marginInlineEnd: -4,
    //             marginInlineStart: 8,
    //         },
    //         startIcon: {
    //             marginInlineEnd: 8,
    //             marginInlineStart: -4,
    //         },
    //     },
    // },
    // MuiIconButton: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: 11,
    //             height: 54,
    //             width: 54,
    //         },
    //         sizeMedium: {
    //             height: 44,
    //             width: 44,
    //         },
    //         sizeSmall: {
    //             height: 34,
    //             width: 34,
    //         },
    //     },
    // },
    // MuiCard: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: '6px',
    //             boxShadow:
    //                 'rgba(50, 50, 93, 0.025) 0px 2px 5px -1px, rgba(0, 0, 0, 0.05) 0px 1px 3px -1px',
    //         },
    //     },
    // },
    // MuiCardHeader: {
    //     styleOverrides: {
    //         action: {
    //             marginTop: '-4px',
    //             marginInlineEnd: '-4px',
    //         },
    //     },
    // },
    // MuiInput: {
    //     styleOverrides: {
    //         root: {
    //             borderColor: '#E5E5EA',
    //         },
    //     },
    // },
    // MuiPickersDay: {
    //     styleOverrides: {
    //         day: {
    //             fontWeight: '300',
    //         },
    //     },
    // },
    // MuiPickersYear: {
    //     styleOverrides: {
    //         root: {
    //             height: '64px',
    //         },
    //     },
    // },
    // MuiPickersCalendar: {
    //     styleOverrides: {
    //         transitionContainer: {
    //             marginTop: '6px',
    //         },
    //     },
    // },
    // MuiPickersCalendarHeader: {
    //     styleOverrides: {
    //         iconButton: {
    //             backgroundColor: 'transparent',
    //             '& > *': {
    //                 backgroundColor: 'transparent',
    //             },
    //         },
    //     },
    //     switchHeader: {
    //         styleOverrides: {
    //             marginTop: '2px',
    //             marginBottom: '4px',
    //         },
    //     },
    // },
    // MuiPickersClock: {
    //     styleOverrides: {
    //         container: {
    //             margin: `32px 0 4px`,
    //         },
    //     },
    // },
    // MuiPickersClockNumber: {
    //     styleOverrides: {
    //         clockNumber: {
    //             left: `calc(50% - 16px)`,
    //             width: '32px',
    //             height: '32px',
    //         },
    //     },
    // },
    // MuiPickerDTHeader: {
    //     styleOverrides: {
    //         dateHeader: {
    //             '& h4': {
    //                 fontSize: '2.125rem',
    //                 fontWeight: 400,
    //             },
    //         },
    //         timeHeader: {
    //             '& h3': {
    //                 fontSize: '3rem',
    //                 fontWeight: 400,
    //             },
    //         },
    //     },
    // },
    // MuiPickersTimePicker: {
    //     styleOverrides: {
    //         hourMinuteLabel: {
    //             '& h2': {
    //                 fontSize: '3.75rem',
    //                 fontWeight: 300,
    //             },
    //         },
    //     },
    // },
    // MuiPickersToolbar: {
    //     styleOverrides: {
    //         toolbar: {
    //             '& h4': {
    //                 fontSize: '2.125rem',
    //                 fontWeight: 400,
    //             },
    //         },
    //     },
    // },
    // MuiDialog: {
    //     styleOverrides: {
    //         paper: {
    //             padding: 20,
    //             textAlign: 'start' as const,
    //         },
    //     },
    // },
    // MuiPaper: {
    //     styleOverrides: {
    //         root: {
    //             color: '#27314A',
    //         },
    //         rounded: {
    //             borderRadius: 20,
    //         },
    //         outlined: {
    //             borderColor: '#DCE1EA',
    //         },
    //         elevation6: {
    //             boxShadow: `0px 5px 30px -5px rgba(25, 50, 133, 0.15)`,
    //         },
    //         elevation8: {
    //             boxShadow: `0px 5px 20px -5px rgba(25, 50, 133, 0.3)`,
    //         },
    //     },
    // },
    // MuiDialogActions: {
    //     styleOverrides: {
    //         root: {
    //             padding: '0 24px 20px',
    //             '& > :not(:first-of-type)': {
    //                 marginInlineStart: 'initial',
    //                 marginInlineStart: '8px',
    //             },
    //         },
    //     },
    // },
    // MuiDialogContent: {
    //     styleOverrides: {
    //         root: {
    //             overflowX: 'hidden' as const,
    //         },
    //     },
    // },
    // MuiChip: {
    //     styleOverrides: {
    //         root: {
    //             borderRadius: 12,
    //             fontWeight: 'bold',
    //             padding: '5px 15px',
    //             '& i': {
    //                 marginInlineEnd: 10,
    //             },
    //         },
    //         deleteIcon: {
    //             marginInlineEnd: -6,
    //             marginInlineStart: 5,
    //         },
    //         label: {
    //             padding: 0,
    //         },
    //         colorDefault: {
    //             '&.MuiChip-filled': {
    //                 backgroundColor: '#A8B3C9',
    //             },
    //             color: '#FFF',
    //         },
    //         icon: {
    //             color: 'inherit',
    //             marginInlineEnd: 5,
    //             marginInlineStart: 0,
    //         },
    //     },
    // },
};

export default overrides;
