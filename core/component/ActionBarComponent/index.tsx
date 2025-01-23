import React, { useMemo } from 'react';
import { Grid } from '@mui/material';
import { CustomButton } from 'component/common';
import PageTitle from '../../../component/PagesComponents/PageTitle';

const ActionBarComponent = ({ field }: any) => {
    const chooseComponent = useMemo(
        () =>
            ({
                component_type,
                width,
                label,
                pageTitle,
                args,
                onClick,
                asyncOnClick,
                name,
                ...otherFields
            }: any) => {
                switch (component_type) {
                    case 'LabelSimple':
                        return (
                            <Grid
                                item
                                flexGrow={Number(width)}
                                padding={0}
                                display="flex"
                                alignItems="center"
                                justifyContent="flex-start"
                            >
                                <PageTitle>{pageTitle}</PageTitle>
                            </Grid>
                        );
                    case 'ButtonPrimary':
                        return (
                            <Grid item flexGrow={Number(width)}>
                                <CustomButton
                                    variant="contained"
                                    size={args?.size || 'large'}
                                    id={args?.action || ''}
                                    icon={args?.icon || ''}
                                    className={args?.className || ''}
                                    keyboard={args?.short_key || null}
                                    onClick={onClick}
                                    is_show={otherFields?.is_show}
                                    name={name}
                                    disabled={otherFields?.disable}
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    {label}
                                </CustomButton>
                            </Grid>
                        );
                    case 'ButtonSecondary':
                        return (
                            <Grid item flexGrow={Number(width)}>
                                <CustomButton
                                    variant="outlined"
                                    size={args?.size || 'large'}
                                    id={args?.action || ''}
                                    icon={args?.icon || ''}
                                    className={args?.className || ''}
                                    keyboard={args?.short_key || null}
                                    onClick={onClick}
                                    is_show={otherFields?.is_show}
                                    name={name}
                                    disabled={otherFields?.disable}
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    {label}
                                </CustomButton>
                            </Grid>
                        );
                    case 'ButtonTertiary':
                        return (
                            <Grid item flexGrow={Number(width)}>
                                <CustomButton
                                    variant="contained"
                                    size={args?.size || 'large'}
                                    id={args?.action || ''}
                                    icon={args?.icon || ''}
                                    className={args?.className || 'tertiary'}
                                    keyboard={args?.short_key || null}
                                    onClick={onClick}
                                    is_show={otherFields?.is_show}
                                    name={name}
                                    disabled={otherFields?.disable}
                                    sx={{
                                        width: '100%',
                                    }}
                                >
                                    {label}
                                </CustomButton>
                            </Grid>
                        );
                    default:
                        return null;
                }
            },
        [],
    );
    return <>{chooseComponent(field)}</>;
};
export default ActionBarComponent;
