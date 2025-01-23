/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { IFakeDataChart } from 'component/charts/CustomChart.type';
import { CHART_LIST } from 'component/charts/common';
import CustomChart from 'component/charts/CustomChart';
import { Refresh } from 'assets/svg';
import { Api } from 'api';
import { getRandomColorEachEmployee } from 'utils/utils';
import WrapperLoading from 'component/common/WrapperLoading';
import { Card, Grid, Typography, Divider } from '@mui/material';
import ErrorComponent from '../ErrorComponent';
import { styles } from '../style';

interface IDataTypesProps {
    filterDate: {
        startDate: string;
        endDate: string;
    };
}
interface IautoGetData {
    label: string;
    value?: string | number;
    color: string;
}
const PieChart = ({ filterDate }: IDataTypesProps) => {
    const { startDate, endDate } = filterDate;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);
    const [autoGetData, setAutoGetData] = useState<IautoGetData[]>([]);
    const initialState = {
        labels: [],
        data: [],
        total: 0,
    };
    const [dataChart, setChartData] = useState(initialState);
    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
    }, [filterDate]);

    const fetchData = async () => {
        setLoading(true);
        setError(false);
        const qs = `date_range=${startDate},${endDate}`;
        setChartData(initialState);
        Api.dashboard.getChartSystematicControl(qs).then(({ status, data }) => {
            if (status == 200) {
                const initOpt = data.data;
                setLoading(false);
                setChartData({
                    ...initOpt,
                });
                const array: any[] = GenerateArray(
                    initOpt.data,
                    initOpt.labels,
                );
                setAutoGetData(array);
            } else {
                setError(true);
                setLoading(false);
            }
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const func: (data: any[], labels: any[]) => any[] = (
        obj: any,
        arr: any[],
    ) => {
        const array: number[] = [];
        if (obj) {
            arr.map(e => {
                if (obj[e]) {
                    array.push(obj[e]);
                }
            });
        }
        return array;
    };
    const GenerateArray: (data: any[], labels: any[]) => any[] = (
        obj: any,
        arr: any[],
    ) => {
        const array: any[] = [];
        if (obj) {
            arr.map((e, i) => {
                const colors =
                    arr.length === 5
                        ? [
                              '#28C76F',
                              '#FF9F43',
                              '#22A7F0',
                              '#D63384',
                              '#00CFE8',
                          ]
                        : getRandomColorEachEmployee(arr.length);
                if (obj[e]) {
                    const newDate = {
                        label: e,
                        value: obj[e],
                        color: colors[i],
                    };
                    array.push(newDate);
                }
            });
        }
        return array;
    };
    const dataMAke: IFakeDataChart = {
        labels: dataChart.labels, // 'OK', 'Damaged', 'So,So', 'Maybe', 'Repaired'
        data: [
            {
                label: 'HEADER-STUDENT',
                data: func(dataChart.data, dataChart.labels),
                fill: false,
                backgroundColor: autoGetData.map(e => e.color),
                hoverOffset: 4,
                // tension: 0.1,
                // borderWidth: 2,
                // pointBackgroundColor: colorsChart1, //
                // pointBorderWidth: 10
            },
        ],
    };

    return (
        <Card css={styles.card}>
            <WrapperLoading
                isLoading={loading}
                isError={error && <ErrorComponent fetchData={fetchData} />}
            >
                <Grid item css={styles.divButton} onClick={fetchData}>
                    <Refresh />
                </Grid>
                <Grid item sx={{ p: '1rem' }}>
                    <Grid item display="flex" alignItems="center">
                        <Typography
                            variant="h3"
                            sx={{ color: 'dark', mr: '3rem', mb: 0 }}
                        >
                            Variety of Special Handlings
                        </Typography>
                    </Grid>
                    <Divider sx={{ mt: '2rem', mb: '3rem' }} />
                    <Grid item display="flex">
                        <Grid item css={styles.divWrapperStart}>
                            <Grid
                                item
                                css={styles.flexColumn}
                                sx={{
                                    justifyContent: 'space-between',
                                    h: '50%',
                                    mb: '2rem',
                                }}
                            >
                                {autoGetData.map((e, i) => (
                                    <Grid item display="flex" key={i}>
                                        <span>
                                            <svg
                                                width="40"
                                                height="13"
                                                style={{
                                                    fill: e.color,
                                                    marginRight: 10,
                                                }}
                                            >
                                                <rect width="40" height="13" />
                                            </svg>
                                        </span>{' '}
                                        {e.label}
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item css={styles.flexColumn}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'rgba(0, 0, 0, 0.5)',
                                    }}
                                >
                                    total
                                </Typography>
                                <Grid item display="flex" alignItems="center">
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            color: 'dark',
                                            fontWeight: 'bold',
                                            mr: '1rem',
                                        }}
                                    >
                                        {dataChart.total}
                                    </Typography>{' '}
                                    lbs
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                width: '100%',
                                zIndex: 1,
                                overflow: 'hidden',
                            }}
                        >
                            <CustomChart
                                dataChart={dataMAke}
                                title="ABEL_ACTIVITY_USER"
                                typeChart={CHART_LIST.Pie.name}
                                height={200}
                                width={300}
                            />
                        </Grid>
                        <Grid
                            item
                            css={styles.divWrapperStart}
                            justifyContent="space-between"
                        >
                            {autoGetData.map((e, i) => (
                                <Grid
                                    item
                                    css={styles.divWrapperStart}
                                    key={i}
                                    sx={{ mb: '1rem' }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ mb: 0 }}
                                        style={{ color: e.color }}
                                    >
                                        {e.label}
                                    </Typography>
                                    <Grid
                                        item
                                        display="flex"
                                        alignItems="center"
                                    >
                                        <Typography
                                            variant="h4"
                                            sx={{ color: 'dark', mb: 0 }}
                                        >
                                            {e.value}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                color: 'rgba(0, 0, 0, 0.5)',
                                                marginLeft: 2,
                                                marginTop: 3,
                                            }}
                                        >
                                            num
                                        </Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </WrapperLoading>
        </Card>
    );
};
export default PieChart;
