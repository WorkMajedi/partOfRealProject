import { Controller, useFormContext } from 'react-hook-form';
import { StyledSwitch } from 'component/common/CardSwitch/styles';
import { memo } from 'react';
import { CustomSwitchProps } from './Switch';

const CustomSwitch = ({
    label,
    color,
    disabled,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    inputProps: { name, defaultValue, ...otherInputProps },
    params,
    updateRow,
    apiRef,
    ...restProps
}: CustomSwitchProps) => {
    const { control } = useFormContext();
    const handleUpdateRow = (val: any) => {
        updateRow({
            index: params.row.index,
            newRow: {
                ...params.row,
                [params.field]: val,
            },
        });
        restProps.saveGridRows({});
    };
    return (
        <Controller
            control={control}
            name={name}
            render={({ value: valueProp, ...resField }: any) => {
                return (
                    <StyledSwitch
                        name={name}
                        className={disabled ? 'disabled' : ''}
                        sx={{
                            '& .Mui-checked .MuiSwitch-thumb': {
                                backgroundColor:
                                    color === 'secondary'
                                        ? 'secondary.main'
                                        : color === 'success'
                                            ? 'success.main'
                                            : 'primary.main',
                            },
                        }}
                        {...resField}
                        value={valueProp}
                        onChange={(event, val) => {
                            handleUpdateRow(val);
                        }}
                        {...restProps}
                    />
                );
            }}
        />
    );
};

export default memo(CustomSwitch);
