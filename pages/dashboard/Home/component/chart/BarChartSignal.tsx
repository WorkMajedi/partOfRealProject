/** @jsxImportSource @emotion/react */
import { Refresh } from 'assets/svg';
import React, { useEffect, useState } from 'react';
import { Api } from 'api';
import { humanizeToEnglish } from 'utils/humanizeToFarsiChart';
import WrapperLoading from 'component/common/WrapperLoading';
import CustomChart from 'component/charts/CustomChart';
import { CHART_LIST } from 'component/charts/common';

import { IFakeDataChart } from 'component/charts/CustomChart.type';
import { Card, Divider, Grid, Typography } from '@mui/material';
import ErrorComponent from '../ErrorComponent';
import { RedCircle, styles } from '../style';
import useMockAPI from '../../../../../utils/mockApi/useMockAPI';
import { dataMock } from '../dataMock';

interface IProps {
    filterDate: {
        startDate: string;
        endDate: string;
    };
}
const BarChartSignal = ({ filterDate }: IProps) => {
    const { startDate, endDate } = filterDate;
    const initialState = {
        labels: [],
        chart1: [],
        chart2: [],
        total: 0,
    };
    const [dataChart, setChartData] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);

    const [colorsChart1] = ['#28C76F', '#EA5455'];
    const dataMAke: IFakeDataChart = {
        labels: dataChart.labels,
        data: [
            {
                label: 'Total Discounts and Variety',
                data: dataChart.chart1,
                fill: false,
                borderColor: colorsChart1,
                backgroundColor: colorsChart1,
                // tension: 0.1,
                borderWidth: 1,
                pointBackgroundColor: colorsChart1,
                pointBorderWidth: 10,
            },
        ],
    };

    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.total_discounts_and_variety.url,
        dataMock.total_discounts_and_variety.response,
        250,
    );
    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
    }, [filterDate]);

    const fetchData = async () => {
        setChartData(initialState);
        setLoading(true);
        setError(false);
        try {
            const res = await getDataMock();
            if (res) {
                setLoading(false);
                setChartData(res.data);
            } else {
                // throw new Error('Failed to fetch data');
            }
        } catch (error) {
            setError(true);
            setLoading(false);
            console.error('Error fetching data:', error);
        }

        // const qs = `date_range=${startDate},${endDate}`;
        //
        // Api.dashboard.getDataPC_LB(qs).then(({ status, data }) => {
        //     if (status == 200) {
        //         const initOpt = data.data;
        //         setLoading(false);
        //         setData(initOpt);
        //     } else {
        //         setError(true);
        //         setLoading(false);
        //     }
        // });
    };
    return (
        <Card css={styles.card}>
            <WrapperLoading
                isLoading={loading}
                isError={error && <ErrorComponent fetchData={fetchData} />}
            >
                <Grid item css={styles.divFlexWrapper}>
                    <Grid item css={styles.divButton} onClick={fetchData}>
                        <Refresh />
                    </Grid>
                    <RedCircle />
                </Grid>
                <Grid item sx={{ p: '10px 5px' }}>
                    <Grid item css={styles.divFlexWrapper} sx={{ mr: 3 }}>
                        <Grid item>
                            <Typography variant="h3" css={styles.titleCard}>
                                Total Discounts and Variety
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider css={styles.tableDivider} />
                    <CustomChart
                        dataChart={dataMAke}
                        title="ABEL_ACTIVITY_USER"
                        typeChart={CHART_LIST.Bar.name}
                        height={180}
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: false,
                                labels: {
                                    textAlign: 'center',
                                    usePointStyle: true,
                                    boxWidth: 2,
                                },
                            },
                            tooltips: {
                                intersect: false,
                            },
                            hover: {
                                intersect: true,
                            },
                            plugins: {
                                filler: {
                                    propagate: false,
                                },
                            },
                            scales: {
                                xAxes: [
                                    {
                                        reverse: true,
                                        gridLines: {
                                            display: false,
                                            color: 'rgba(0,0,0,0)',
                                        },
                                    },
                                ],
                                yAxes: [
                                    {
                                        ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 5,
                                            precision: 0,
                                            padding: 12,
                                            callback(value: any) {
                                                return `$${humanizeToEnglish(
                                                    value ?? 0,
                                                )}`;
                                            },
                                        },
                                        display: true,
                                        borderDash: [5, 5],
                                        gridLines: {
                                            display: false,
                                            color: '#E1E5ED',
                                            fontColor: '#fff',
                                        },
                                    },
                                ],
                            },
                        }}
                        width="500"
                    />
                </Grid>
            </WrapperLoading>
        </Card>
    );
};
export default BarChartSignal;
