import React, { useMemo } from 'react';
import { Grid, LinearProgress, Typography } from '@mui/material';
import { Field } from 'types/type';
import { generatorOptions } from 'utils/utils';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { DataGrid } from 'libs/DataGrid';
import { GridEditableDynamic, StaticDataGrid, DynamicDataGrid } from 'libs';
import { openPopup } from 'redux/slices/managePopup/managePopupSlice';
import AutoCompleteInitializer from 'component/common/AutoComplete/AutoCompleteInitializer';
import AutoComplete from 'component/common/AutoComplete/AutoComplete';
import {
    TextFieldCurrency,
    DropDownMultiSelect,
    BoxImage,
    BoxAttachment,
    Uploader,
    DatePicker,
    LabelBox,
    CustomTextField,
    CustomButton,
    DropDown,
    CardSwitch,
    CustomSelected,
    CustomAlert,
} from 'component/common';

interface OwnProps {
    field: any;
    inModal?: boolean;
    isReset?: boolean;
    inDialog?: boolean;
}

const SelectedComponent = ({ field, inModal, isReset, inDialog }: OwnProps) => {
    const dispatch = useDispatch();
    const {
        register,
        formState: {
            errors: { root: errors },
        },
        getValues,
        control,
        watch,
    } = useFormContext(); // retrieve all hook methods
    const navigate = useNavigate();
    const chooseComponent = useMemo(
        () =>
            ({
                rows,
                name,
                type,
                width,
                label,
                is_show,
                component_type,
                disable,
                error_possibles,
                editable,
                on_change_functions,
                on_exit_functions,
                on_focus_functions,
                required,
                special_validation,
                args,
                queryParams,
                initialFetch,
                onClick,
                onFocus,
                onChange,
                onBlur,
                initialValue,
                related_modal,
                isAutoCompleteInitializer,
                choseDataIdForRequestGrid,
                skip_in_navigation,
                extraDataForModal = {},
                addParamsToQuery,
                isLoadingButton,
                ...items
            }: Field | any) => {
                const urlId: any =
                    choseDataIdForRequestGrid &&
                    getValues(choseDataIdForRequestGrid);
                switch (component_type) {
                    case 'Loading':
                        return (
                            <Grid item md={width}>
                                <LinearProgress />
                            </Grid>
                        );
                    case 'Gap':
                        return <Grid item md={width} />;
                    case 'Separator':
                        return (
                            <Grid
                                item
                                md={width}
                                display="flex"
                                alignItems="center"
                            >
                                <Typography variant="h2" marginY={5}>
                                    {label}
                                </Typography>
                            </Grid>
                        );
                    case 'Alert':
                        if (!!items.default_value || !!args?.message) {
                            return (
                                <Grid
                                    item
                                    md={width}
                                    display="flex"
                                    alignItems="center"
                                >
                                    <CustomAlert
                                        type={args?.type || ''}
                                        color={args?.color || ''}
                                        customColor={args?.customColor || null}
                                        label={label}
                                        value={
                                            items.default_value || args?.message
                                        }
                                    />
                                </Grid>
                            );
                        }
                        return undefined;
                    case 'DropDownStatic':
                        return (
                            <Grid item md={width}>
                                <DropDown
                                    name={name}
                                    label={label || name}
                                    typeDropDown={'static'}
                                    control={control}
                                    disabled={!!disable}
                                    defaultValue={
                                        getValues(name) ||
                                        items.default_value ||
                                        ''
                                    }
                                    options={generatorOptions(args?.choices)}
                                    isReset={isReset}
                                    inputProps={{
                                        ...register(name, { required }),
                                        readOnly: !!disable,
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    required={!!required}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    error={Boolean(errors?.[name])}
                                    args={args}
                                />
                            </Grid>
                        );
                    case 'DropDownDynamic':
                        return (
                            <Grid item md={width}>
                                <DropDown
                                    name={name}
                                    label={label || name}
                                    control={control}
                                    disabled={!editable}
                                    defaultValue={
                                        items.default_value ||
                                        getValues(name) ||
                                        ''
                                    }
                                    typeDropDown={'dynamic'}
                                    options={args?.choices_url}
                                    inputProps={{
                                        ...register(name, { required }),
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    isReset={isReset}
                                    onBlur={onBlur}
                                    getVal={(selected: any) => {
                                        if (onBlur) {
                                            onBlur?.(selected?.code, selected);
                                        }
                                    }}
                                    required={!!required}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    args={args}
                                    error={Boolean(errors?.[name])}
                                />
                            </Grid>
                        );
                    case 'DropDownMultiSelect':
                        return (
                            <Grid item md={width}>
                                <DropDownMultiSelect
                                    name={name}
                                    label={label}
                                    options={
                                        !!generatorOptions(args?.choices).length
                                            ? generatorOptions(args?.choices)
                                            : []
                                    }
                                    inputProps={{
                                        ...register(name, { required }),
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    defaultValue={
                                        !!getValues(name)?.length
                                            ? getValues(name)
                                            : []
                                    }
                                    optionsUrl={args?.choices_url || ''}
                                    required={required}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    error={Boolean(errors?.[name])}
                                    disabled={!editable}
                                />
                            </Grid>
                        );
                    case 'DatePicker':
                        return (
                            <Grid item md={width}>
                                <DatePicker
                                    name={name}
                                    label={label || name}
                                    defaultValue={getValues(name)}
                                    newDate={Boolean(items.default_value)}
                                    inputProps={{
                                        ...register(name, { required }),
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    required={required}
                                    disabled={!editable}
                                    error={Boolean(errors?.[name])}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                />
                            </Grid>
                        );
                    case 'DateTimePicker':
                        return (
                            <Grid item md={width}>
                                <DatePicker
                                    time
                                    name={name}
                                    label={label || name}
                                    defaultValue={getValues(name)}
                                    newDate={Boolean(items.default_value)}
                                    inputProps={{
                                        ...register(name, { required }),
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    required={required}
                                    disabled={!editable}
                                    error={Boolean(errors?.[name])}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                />
                            </Grid>
                        );
                    case 'FieldText':
                        return (
                            <Grid item md={width}>
                                <CustomTextField
                                    id={name}
                                    nameQuery={name}
                                    inputProps={{
                                        ...register(name, {
                                            onBlur: (e: any) =>
                                                onBlur && onBlur?.(e),
                                            required,
                                            shouldUnregister: true,
                                        }),
                                        required: !!required,
                                        maxLength: args?.max_length
                                            ? args?.max_length
                                            : null,
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    InputLabelProps={{ shrink: true }}
                                    helperText={
                                        String(errors?.[name]?.message ?? '') ||
                                        items?.customError?.message
                                    }
                                    defaultValue={
                                        items.default_value ||
                                        getValues(name) ||
                                        ''
                                    }
                                    label={label}
                                    onBlur={onBlur}
                                    placeholder={`Enter ${label}`}
                                    error={Boolean(
                                        errors?.[name] ||
                                            items?.customError?.error,
                                    )}
                                    type={
                                        args?.type ||
                                        (type === 'Text' || type === 'FieldText'
                                            ? 'text'
                                            : 'number')
                                    }
                                    disabled={!editable}
                                    required={required}
                                    fullWidth
                                />
                            </Grid>
                        );
                    case 'TextArea':
                        return (
                            <Grid item md={width}>
                                <CustomTextField
                                    nameQuery={name}
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{
                                        ...register(name, {
                                            onBlur: (e: any) =>
                                                onBlur && onBlur?.(e),
                                            shouldUnregister: true,
                                            required: !!required,
                                        }),
                                        defaultValue: getValues(name),
                                        maxLength: args?.max_length
                                            ? args?.max_length
                                            : null,
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    multiline
                                    rows={3}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    defaultValue={getValues(name) || null}
                                    label={label}
                                    onBlur={onBlur}
                                    placeholder={`Enter ${label}`}
                                    error={Boolean(errors?.[name])}
                                    type={
                                        type === 'Text' || type === 'FieldText'
                                            ? 'text'
                                            : 'number'
                                    }
                                    disabled={!editable}
                                    required={required}
                                />
                            </Grid>
                        );
                    case 'FieldCurrency':
                        return (
                            <Grid item md={width}>
                                <TextFieldCurrency
                                    inputProps={{
                                        ...register(name),
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    nameQuery={name}
                                    id={name}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    defaultValue={
                                        items.default_value ||
                                        getValues(name) ||
                                        ''
                                    }
                                    label={label}
                                    placeholder={`Enter ${label}`}
                                    error={Boolean(errors?.[name])}
                                    disabled={!editable}
                                    required={required}
                                    fullWidth
                                />
                            </Grid>
                        );
                    case 'ForeignKey':
                        return (
                            <Grid item md={width}>
                                <CustomTextField
                                    nameQuery={name}
                                    inputProps={{
                                        ...register(name, {
                                            required: !!required,
                                        }),
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    label={label || name}
                                    placeholder={`Enter ${label}`}
                                    error={Boolean(errors?.[name])}
                                    type="number"
                                    disabled={!editable}
                                    required={required}
                                    fullWidth
                                />
                            </Grid>
                        );
                    case 'CardSwitch':
                        return (
                            <Grid item md={width}>
                                <CardSwitch
                                    inputProps={{
                                        ...register(name),
                                        'data-skip-in-navigation':
                                            skip_in_navigation,
                                    }}
                                    label={label}
                                    defaultValue={getValues(name)}
                                    color="success"
                                    required={required}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    error={Boolean(errors?.[name])}
                                    // onChange={register(name).onChange}
                                    // ref={register(name).ref}
                                    // disabled
                                />
                            </Grid>
                        );
                    case 'AutoCompleteInitializer':
                        return (
                            <Grid item md={width}>
                                <AutoCompleteInitializer
                                    isAutoCompleteInitializer={
                                        isAutoCompleteInitializer
                                    }
                                    skip_in_navigation={skip_in_navigation}
                                    control={control}
                                    nameQuery={name}
                                    redirectToAdd={initialFetch === name}
                                    inputProps={{
                                        ...register(name, { required }),
                                        disable: !editable,
                                    }}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    initialValue={
                                        getValues(name) || initialValue
                                    }
                                    args={args}
                                    endPoint={args?.search_url || ''}
                                    nameModals={related_modal}
                                    label={label || name}
                                    placeholder={`Enter ${label}`}
                                    error={Boolean(errors?.[name])}
                                    type="number"
                                    required={required}
                                    readOnly={!editable}
                                    navigateToEdit={items?.navigateToEdit}
                                    displayKeys={args?.keys || []}
                                    creatable={items?.creatable}
                                />
                            </Grid>
                        );
                    case 'AutoCompleteSimple':
                        return (
                            <Grid item md={width}>
                                <AutoComplete
                                    args={args}
                                    nameQuery={name}
                                    control={control}
                                    nameModals={related_modal}
                                    redirectToAdd={initialFetch === name}
                                    inputProps={{
                                        ...register(name, { required }),
                                    }}
                                    skip_in_navigation={skip_in_navigation}
                                    defaultValue={getValues(name)}
                                    endPoint={args?.search_url || ''}
                                    label={label || name}
                                    placeholder={`Enter ${label}`}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    error={Boolean(errors?.[name])}
                                    type="number"
                                    required={required}
                                    readOnly={!editable}
                                    onFocus={onFocus}
                                    onBlur={onBlur}
                                    displayKeys={args?.keys || []}
                                    creatable={items?.creatable}
                                />
                            </Grid>
                        );
                    case '#GridEditableStatic':
                        if (is_show) {
                            return (
                                <Grid item md={width} mt={5}>
                                    <DataGrid
                                        title={label}
                                        name={name}
                                        inModal={inModal || inDialog}
                                        columns={args?.grid_data?.gridcolumns}
                                        rows={
                                            field.defaultRows ||
                                            getValues(name) ||
                                            []
                                        }
                                        args={args}
                                        height={args.height}
                                        addable={args?.addable ?? true}
                                        error={errors?.[name]}
                                        helperText={String(
                                            errors?.[name]?.message ?? '',
                                        )}
                                    />
                                </Grid>
                            );
                        }
                        return null;
                    case '#GridSimpleStatic':
                        if (is_show) {
                            return (
                                <Grid item md={width} mt={5}>
                                    <DynamicDataGrid
                                        title={label}
                                        queryParams={
                                            args?.query_params_modal
                                                ? args?.query_params_modal
                                                : queryParams || {}
                                        }
                                        addParamsToQuery={
                                            addParamsToQuery || []
                                        }
                                        args={args}
                                        name={name}
                                        inModal={inModal || inDialog}
                                        columns={
                                            args?.grid_data?.gridcolumns || []
                                        }
                                        rows={getValues(name) ?? rows ?? []}
                                    />
                                </Grid>
                            );
                        }
                        return null;
                    case '#GridSimpleDynamic':
                        return (
                            <Grid item md={width}>
                                <StaticDataGrid
                                    queryParams={
                                        args?.query_params_modal
                                            ? args?.query_params_modal
                                            : queryParams || {}
                                    }
                                    addParamsToQuery={
                                        args?.addParamsToQuery
                                            ? args?.addParamsToQuery
                                            : addParamsToQuery || []
                                    }
                                    title={label}
                                    name={name}
                                    args={args}
                                    inModal={inModal || inDialog}
                                    columns={args?.grid_data?.gridcolumns || []}
                                    rowsUrl={args?.base_url}
                                    asyncDelete={items?.asyncDelete}
                                />
                            </Grid>
                        );
                    case '#GridEditableDynamic':
                        return (
                            <Grid item md={width}>
                                <GridEditableDynamic
                                    queryParams={
                                        args?.query_params_modal
                                            ? args?.query_params_modal
                                            : queryParams || {}
                                    }
                                    addParamsToQuery={addParamsToQuery || []}
                                    title={label}
                                    name={name}
                                    args={args}
                                    inModal={inModal}
                                    columns={args?.grid_data?.gridcolumns || []}
                                    rowsUrl={args?.base_url}
                                    asyncDelete={items?.asyncDelete}
                                />
                            </Grid>
                        );
                    case 'ButtonPrimary':
                        return (
                            <Grid item md={width}>
                                <CustomButton
                                    isLoadingButton={isLoadingButton}
                                    variant="contained"
                                    size={args?.size || 'large'}
                                    id={args?.action || ''}
                                    className={args?.className || ''}
                                    keyboard={args?.short_key || null}
                                    icon={args?.icon || ''}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    disabled={disable}
                                    onClick={() => {
                                        if (onClick) onClick();
                                        if (related_modal) {
                                            const nameModal =
                                                related_modal &&
                                                related_modal.split('.');
                                            dispatch(
                                                openPopup({
                                                    name: nameModal[
                                                        nameModal.length - 1
                                                    ],
                                                    isOpen: true,
                                                    inModal: true,
                                                    urlId,
                                                    query: items?.passDataToQuery,
                                                    extraDataForModal,
                                                    state: watch()[
                                                        nameModal[
                                                            nameModal.length - 1
                                                        ]
                                                    ],
                                                }),
                                            );
                                        }
                                    }}
                                >
                                    {label}
                                </CustomButton>
                            </Grid>
                        );
                    case 'ButtonSecondary':
                        return (
                            <Grid item md={width}>
                                <CustomButton
                                    isLoadingButton={isLoadingButton}
                                    variant="outlined"
                                    size={args?.size || 'large'}
                                    id={args?.action || ''}
                                    className={args?.className || ''}
                                    keyboard={args?.short_key || null}
                                    icon={args?.icon || ''}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    disabled={disable}
                                    onClick={() => {
                                        if (onClick) {
                                            onClick();
                                        }
                                        if (related_modal) {
                                            const nameModal =
                                                related_modal &&
                                                related_modal.split('.');

                                            dispatch(
                                                openPopup({
                                                    name: nameModal[
                                                        nameModal.length - 1
                                                    ],
                                                    isOpen: true,
                                                    inModal: true,
                                                    urlId,
                                                    query: items?.passDataToQuery,
                                                    extraDataForModal,
                                                    state: watch()[
                                                        nameModal[
                                                            nameModal.length - 1
                                                        ]
                                                    ],
                                                }),
                                            );
                                        }
                                    }}
                                    {...(args.props ?? {})}
                                >
                                    {label}
                                </CustomButton>
                            </Grid>
                        );
                    case 'ButtonTertiary':
                        return (
                            <Grid item md={width}>
                                <CustomButton
                                    isLoadingButton={isLoadingButton}
                                    variant="contained"
                                    size={args?.size || 'large'}
                                    id={args?.action || ''}
                                    className={args?.className || 'tertiary'}
                                    keyboard={args?.short_key || null}
                                    icon={args?.icon || ''}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    disabled={disable}
                                    onClick={() => {
                                        if (onClick) onClick();
                                        if (related_modal) {
                                            const nameModal =
                                                related_modal &&
                                                related_modal.split('.');
                                            dispatch(
                                                openPopup({
                                                    name: nameModal[
                                                        nameModal.length - 1
                                                    ],
                                                    isOpen: true,
                                                    urlId,
                                                    extraDataForModal,
                                                    state: watch()[
                                                        nameModal[
                                                            nameModal.length - 1
                                                        ]
                                                    ],
                                                }),
                                            );
                                        }
                                    }}
                                >
                                    {label}
                                </CustomButton>
                            </Grid>
                        );
                    case 'LabelSimple':
                        const valueType = Object.prototype.toString.call(
                            getValues(name),
                        );
                        return (
                            <Grid item md={width} padding={0}>
                                <LabelBox
                                    label={label}
                                    value={getValues(name)}
                                    labelType={
                                        args?.labelType ||
                                        (valueType === '[object Object]'
                                            ? 'badge'
                                            : 'simple')
                                    }
                                    displayKeys={args?.keys || []}
                                    name={name}
                                    border
                                    {...args}
                                />
                            </Grid>
                        );
                    case 'LabelCurrency':
                        return (
                            <Grid item md={width} padding={0}>
                                <LabelBox
                                    label={label}
                                    value={getValues(name)}
                                    labelType="price"
                                    name={name}
                                    errors={errors?.[name]}
                                    helperText={String(
                                        errors?.[name]?.message ?? '',
                                    )}
                                    border
                                />
                            </Grid>
                        );
                    case 'LabelTag':
                        return (
                            <Grid item md={width}>
                                <LabelBox
                                    border
                                    label={label}
                                    labelType={items.labelType || 'simple'}
                                />
                            </Grid>
                        );
                    case 'BoxAttachment':
                        return (
                            <Grid item md={width}>
                                <BoxAttachment
                                    label={label}
                                    value={getValues(name)}
                                />
                            </Grid>
                        );
                    case 'UploadImage':
                        return (
                            <Grid item md={width}>
                                <Uploader
                                    inputType="image"
                                    uploadApi={args.url}
                                    setFilesId={field?.setFilesId || null}
                                    defaultFile={getValues(name) || []}
                                    accept={args?.accept || 'image'}
                                    multy={args?.multiple || true}
                                />
                            </Grid>
                        );
                    case 'UploadFile':
                        return (
                            <Grid item md={width}>
                                <Uploader
                                    inputTtype="file"
                                    uploadApi={args.url}
                                    setFilesId={field?.setFilesId || null}
                                    defaultFile={getValues(name) || []}
                                    accept={args?.accept || 'file'}
                                    multi={args?.multiple || true}
                                />
                            </Grid>
                        );
                    case 'BoxGallery':
                        return (
                            <Grid item md={width}>
                                <BoxImage file={getValues(name)[0]} />
                            </Grid>
                        );
                    default:
                        return null;
                }
            },
        [navigate, isReset, errors],
    );
    return <>{chooseComponent(field)}</>;
};
// @ts-ignore
export default SelectedComponent;
