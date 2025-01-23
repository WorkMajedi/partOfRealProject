/* eslint-disable react/jsx-no-useless-fragment */
import {
    Box,
    ButtonBase,
    Grid,
    GridProps,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDispatch, useSelector } from 'react-redux';
import { openScreenPopup } from 'redux/slices/screenPopup/screenPopupSlice';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import { useParams } from 'react-router-dom';
import { StyledGrid } from './style';
import CustomChip from '../CustomChip';

dayjs.extend(customParseFormat);

const SimpleSubDetails = ({ value }: any) => {
    const dateOnlyFormat = 'YYYY-MM-DD';
    const dateTimeFormats = ['YYYY-MM-DD H:mm:ss', 'MM-DD-YY H:mm:ss A Z', 'MM-DD-YY H:mm:ss Z'];
    const isDateOnlyFormat = /^\d{4}-\d{2}-\d{2}$/;  
    const isISODateTime = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[\+\-]\d{2}:\d{2})?$/;
    let formattedDate = null;

    if (isDateOnlyFormat.test(value) && dayjs(value, dateOnlyFormat, true).isValid()) {
        formattedDate = dayjs(value).format('MM-DD-YYYY');
    } else if (isISODateTime.test(value) && dayjs(value).isValid()) {
        // Handles ISO date strings like "2024-10-30T00:00:00Z"
        formattedDate = dayjs(value).format('MM-DD-YYYY - h:mm A');
    } else {
        const parsedDateTime = dayjs(value, dateTimeFormats, true);
        if (parsedDateTime.isValid()) {
            formattedDate = parsedDateTime.format('MM-DD-YYYY - h:mm A');
        }
    }

    return (
        <Typography variant="body1">
            {formattedDate ? (
                formattedDate
            ) : (
                <TextField
                    className="textArea"
                    defaultValue={value || '_'}
                    variant="standard"
                    InputProps={{
                        readOnly: true,
                    }}
                    multiline
                />
            )}
        </Typography>
    );
    // return (
    //     <Typography variant="body1">
    //         {value &&
    //             (dayjs(value, 'MM-DD-YY H:mm:ss A Z').isValid() ||
    //                 dayjs(value, 'MM-DD-YY H:mm:ss Z').isValid())
    //             ? dayjs(value).format('MM-DD-YYYY - h:mm A')
    //             : (
    //                 <TextField
    //                     className="textArea"
    //                     defaultValue={value}
    //                     variant="standard"
    //                     InputProps={{
    //                         readOnly: true,
    //                     }}
    //                     multiline
    //                 />
    //             ) ?? '_'}
    //     </Typography>
    // );
};

const LabelCurrency = ({ value }: any) => {
    const defaultOption = useSelector(
        (state: any) => state?.ConfigOptions?.defaults,
    );
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:
            defaultOption?.default_monetary_unit === 'Euro'
                ? 'EUR'
                : defaultOption?.default_monetary_unit === 'Pound'
                    ? 'GBP'
                    : 'USD',
    });

    return <Typography variant="body1">{formatter.format(value)}</Typography>;
};

const SwitchSimpleDetails = ({ value }: any) => {
    return <Typography variant="body1">{value ? 'Yes' : 'No'}</Typography>;
};
const BadgeSimpleDetails = ({ value, displayKeys, target }: any) => {
    return (
        <Typography variant="body1">
            {!!value ? (
                <>
                    {(value[displayKeys[0]] || value?.code) && (
                        <Typography
                            variant="body1"
                            component="span"
                            className="badge"
                        >
                            {value[displayKeys[0]] || value?.code}
                        </Typography>
                    )}
                    {(value[displayKeys[1]] || value?.description) && (
                        <Typography
                            variant="body1"
                            component="span"
                            className="badgePlaceholder"
                        >
                            {value[displayKeys[1]] || value?.description}
                        </Typography>
                    )}
                </>
            ) : (
                <span className="badgePlaceholder">_</span>
            )}
        </Typography>
    );
};

const BadgeLinkDetails = ({ value, displayKeys, target }: any) => {
    const dispatch = useDispatch();
    const params = useParams();

    return (
        <>
            {!!value ? (
                <ButtonBase
                    className="badgeLink"
                    disableRipple
                    onClick={() => {
                        if (target?.type === 'screen') {
                            dispatch(
                                openScreenPopup({
                                    name: target.related_modal,
                                    isOpen: true,
                                    target: {
                                        ...target,
                                        ...value,
                                    },
                                }),
                            );
                        }
                        if (target?.type === 'modal') {
                            dispatch(
                                openPopup({
                                    name: target?.related_modal,
                                    isOpen: true,
                                    inModal: true,
                                    state: {
                                        row: {
                                            id: params.id,
                                        },
                                        filter: target?.filter,
                                    },
                                }),
                            );
                        }
                    }}
                >
                    {(value[displayKeys[0]] || value?.code) && (
                        <Typography
                            variant="body1"
                            component="span"
                            className="badge"
                        >
                            {value[displayKeys[0]] || value?.code}
                        </Typography>
                    )}
                    {(value[displayKeys[1]] || value?.description) && (
                        <Typography
                            variant="body1"
                            component="span"
                            className="badgePlaceholder"
                        >
                            {value[displayKeys[1]] || value?.description}{' '}
                        </Typography>
                    )}
                </ButtonBase>
            ) : (
                <span className="badgePlaceholder">_</span>
            )}
        </>
    );
};

const TagSimpleDetails = ({ value }: any) => {
    return (
        <Grid item display="flex" spacing={1}>
            {!!value && Array.isArray(value) ? (
                value.map((item: any) => <CustomChip label={item} />)
            ) : value ? (
                <CustomChip label={value} />
            ) : (
                '_'
            )}
        </Grid>
    );
};

// @ts-ignore
interface labelBoxProps extends GridProps {
    border?: boolean;
    label?: string;
    name?: string;
    value?: any;
    target?: any;
    displayKeys?: [];
    errors?: any;
    helperText?: string | null;
    labelType: 'badge' | 'simple' | 'tag' | 'switch' | 'price' | 'link';
}

const LabelBox: React.FC<labelBoxProps> = ({
    border,
    label,
    value,
    labelType,
    name,
    displayKeys,
    children,
    errors,
    helperText,
    ...restProps
}) => {

    return (
        <Box style={{ position: 'relative' }}>
            <StyledGrid colors={(restProps as any)?.colors}>
                <Box
                    className={[
                        restProps.className,
                        border ? 'border' : '',
                        'detailsWrapper',
                        helperText ? 'error' : '', // Apply error class if there's an error
                    ].join(' ')}
                    height={100}
                >
                    <Grid item>
                        <Typography className="label" variant="body1">
                            {label || 'Empty'}
                        </Typography>
                    </Grid>
                    <Grid item>
                        {labelType === 'simple' ? (
                            <SimpleSubDetails value={value} />
                        ) : labelType === 'tag' ? (
                            <TagSimpleDetails value={value} />
                        ) : labelType === 'switch' ? (
                            <SwitchSimpleDetails value={value} />
                        ) : labelType === 'badge' ? (
                            <BadgeSimpleDetails
                                value={value}
                                displayKeys={displayKeys}
                            />
                        ) : labelType === 'link' &&
                            !!value &&
                            Object.prototype.toString.call(value) ===
                            '[object Object]' ? (
                            <BadgeLinkDetails
                                value={value}
                                displayKeys={displayKeys}
                                target={restProps.target}
                            />
                        ) : labelType === 'link' ? (
                            <BadgeLinkDetails
                                value={{
                                    code: value,
                                }}
                                displayKeys={displayKeys}
                                target={restProps.target}
                            />
                        ) : labelType === 'price' ? (
                            <LabelCurrency value={value ?? 0} />
                        ) : null}
                        {children}
                    </Grid>
                </Box>
            </StyledGrid>
            {helperText && ( // Display error message if there's an error
                <Typography
                    className="errorText"
                    variant="body1"
                    color="red"
                    style={{
                        fontSize: 12,
                        position: 'absolute',
                        width: '100%',
                    }}
                >
                    {`${helperText}`}
                </Typography>
            )}
        </Box>
    );
};

export default LabelBox;
