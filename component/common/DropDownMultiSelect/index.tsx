import { useEffect, useRef, useState } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { instance } from 'api/config';
import { Controller, useFormContext } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import { useKeyPress } from 'ahooks';
import { FormControlStyled } from './DropDownMultiSelect.styles';
import { CustomSelectProps } from './DropDownMultiSelect';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        },
    },
};

export const generateDynamicOptions = async (url: string | undefined = '') => {
    const res = await instance.get(url);
    return res.data.results;
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function DropDownMultiSelect({
    name,
    label,
    options,
    optionsUrl,
    disabled,
    defaultValue,
    required,
    helperText,
    error,
    ...otherProps
}: any) {
    const theme = useTheme();
    const { control, setValue, clearErrors } = useFormContext();
    const [selectedItems, setSelectedItems] = useState<string[]>(defaultValue);

    const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
        const {
            target: { value },
        } = event;
        // On autofill, we get a stringifies value.
        const formattedValue =
            typeof value === 'string' ? value.split(',') : value;
        setSelectedItems(formattedValue);
        setValue(name, formattedValue);
    };

    const [selectOptions, setSelectOptions] = useState<any>([]);
    useEffect(() => {
        if (!!options.length) {
            setSelectOptions(options);
        } else {
            generateDynamicOptions(optionsUrl).then(res => {
                setSelectOptions(
                    res.map((i: any) => ({
                        ...i,
                        value: i.id,
                        label: i.description,
                        code: i.code,
                    })),
                );
            });
        }
    }, [options, optionsUrl]);

    const ref: any = useRef();
    const [open, setOpen] = useState<boolean>(false);
    useKeyPress(
        'space',
        () => {
            setOpen(!open);
        },
        {
            target: ref,
        },
    );
    useEffect(() => {
        if (selectedItems) clearErrors(`root.${name}`);
    }, [selectedItems]);
    return (
        <Controller
            name={name}
            control={control}
            render={() => {
                return (
                    <FormControlStyled
                        fullWidth
                        ref={ref}
                        onClick={() => !disabled && setOpen(prev => !prev)}
                        disabled={disabled}
                        required={required}
                        error={error}
                    >
                        <InputLabel id={`${name}_label_select`}>
                            {label}
                        </InputLabel>
                        <Select
                            onKeyDownCapture={event => {
                                if (event.key === 'Enter') {
                                    setOpen(false);
                                    const nextInput =
                                        ref?.current?.parentElement?.closest(
                                            '.MuiGrid-item',
                                        )?.nextElementSibling;
                                    setTimeout(() => {
                                        nextInput
                                            .querySelector('input')
                                            ?.focus();
                                    }, 0);
                                }
                            }}
                            labelId={`${name}_label_select`}
                            sx={{
                                '&:focus-within': {
                                    boxShadow: theme =>
                                        `0 0 0 2px ${theme.palette.primary.main}`,
                                    borderColor: theme =>
                                        `${theme.palette.primary.main}!important`,
                                    borderWidth: `1px!important`,
                                },
                                '&.Mui-focused': {
                                    boxShadow: theme =>
                                        `0 0 0 2px ${theme.palette.primary.main}`,
                                    borderColor: theme =>
                                        `${theme.palette.primary.main}!important`,
                                    borderWidth: `1px!important`,
                                },
                            }}
                            className={
                                !!selectedItems.length ? 'haveValue' : ''
                            }
                            id={`${name}_select`}
                            multiple
                            value={selectedItems}
                            onChange={handleChange}
                            input={
                                <OutlinedInput
                                    id="select-multiple-chip"
                                    label="Chip"
                                    name={name}
                                />
                            }
                            renderValue={selected => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: 0.5,
                                    }}
                                >
                                    {selected.map(value => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            open={open}
                            required={required}
                        >
                            {!!selectOptions.length ? (
                                selectOptions.map((item: any) => (
                                    <MenuItem
                                        key={item.value}
                                        value={item.value}
                                        style={getStyles(
                                            item.value,
                                            selectedItems,
                                            theme,
                                        )}
                                        sx={{ mt: 1 }}
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>
                                    There is no options
                                </MenuItem>
                            )}
                        </Select>
                        {helperText && (
                            <FormHelperText>{helperText}</FormHelperText>
                        )}
                    </FormControlStyled>
                );
            }}
        />
    );
}
