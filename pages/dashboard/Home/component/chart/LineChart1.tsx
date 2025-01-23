/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Refresh } from 'assets/svg';
import { Api } from 'api';
import WrapperLoading from 'component/common/WrapperLoading';
import { IFakeDataChart } from 'component/charts/CustomChart.type';
import { CHART_LIST } from 'component/charts/common';
import CustomChart from 'component/charts/CustomChart';
import { Card, Divider, Grid, Typography } from '@mui/material';
import ErrorComponent from '../ErrorComponent';
import { styles } from '../style';
import useMockAPI from '../../../../../utils/mockApi/useMockAPI';
import { dataMock } from '../dataMock';

interface IProps {
    filterDate: {
        startDate: string;
        endDate: string;
    };
    setting: any;
}
const LineChart = ({ filterDate, setting }: IProps) => {
    const { startDate, endDate } = filterDate;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);
    const { weight_unit } = setting;
    const initialState = {
        labels: [],
        chart1: [],
        chart2: [],
        total: 0,
    };
    const [dataChart, setChartData] = useState(initialState);
    const [colorsChart1, colorsChart2] = ['#28C76F', '#EA5455'];

    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.total_net_out_for_am_pm.url,
        dataMock.total_net_out_for_am_pm.response,
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
    const dataMAke: IFakeDataChart = {
        labels: dataChart.labels,
        data: [
            {
                label: 'PM',
                data: dataChart.chart1,
                fill: false,
                borderColor: colorsChart1,
                backgroundColor: colorsChart1,
                // tension: 0.1,
                // borderWidth: 2,
                // pointBackgroundColor: colorsChart1,
                // pointBorderWidth: 10
            },
            {
                label: 'AM',
                data: dataChart.chart2,
                fill: false,
                borderColor: colorsChart2,
                backgroundColor: colorsChart2,
                // tension: 0.1,
                // : 1,
                // pointBackgroundColor: colorsChart2,
                // pointBorderWidth: 20
            },
        ],
    };

    return (
        <Card css={styles.card}>
            <WrapperLoading
                isLoading={loading}
                isError={error && <ErrorComponent fetchData={fetchData} />}
            >
                <Grid
                    item
                    css={styles.divButton}
                    flexDirection="row-reverse"
                    onClick={fetchData}
                >
                    <Refresh />
                </Grid>
                <Grid item sx={{ p: '5px' }}>
                    <Grid item display="flex" alignItems="center">
                        <Typography variant="h3" css={styles.titleCard}>
                            Total Net Out
                        </Typography>
                        {/* <div className={'d-flex align-items-center w-50'} role="group"> */}
                        {/*  <button className="toggleButton">AM</button> /{' '} */}
                        {/*  <button className="toggleButton">PM</button> /{' '} */}
                        {/*  <button className="toggleButton">Compare</button> */}
                        {/* </div> */}
                    </Grid>
                    <Divider css={styles.tableDivider} />
                    <Grid item display="flex">
                        <Grid
                            item
                            css={styles.divFlexWrapper}
                            flexDirection="column"
                        >
                            <Grid item css={styles.flexColumn}>
                                <Grid item display="flex">
                                    <span>
                                        <svg
                                            width="40"
                                            height="13"
                                            style={{
                                                fill: colorsChart2,
                                                marginRight: 10,
                                            }}
                                        >
                                            <rect width="40" height="13" />
                                        </svg>
                                    </span>{' '}
                                    AM
                                </Grid>
                                <Grid item display="flex">
                                    <span>
                                        <svg
                                            width="40"
                                            height="13"
                                            style={{
                                                fill: colorsChart1,
                                                marginRight: 10,
                                            }}
                                        >
                                            <rect width="40" height="13" />
                                        </svg>
                                    </span>{' '}
                                    PM
                                </Grid>
                            </Grid>
                            <Grid item css={styles.flexColumn}>
                                <Typography
                                    sx={{
                                        color: 'rgba(0, 0, 0, 0.5)',
                                        fontSize: '1rem',
                                    }}
                                >
                                    total
                                </Typography>
                                <Grid item display="flex" alignItems="center">
                                    <Typography
                                        variant="h1"
                                        sx={{
                                            fontWeight: 'bold',
                                            mr: 1,
                                            color: 'dark',
                                        }}
                                    >
                                        {dataChart.total}
                                    </Typography>{' '}
                                    {weight_unit}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            sx={{
                                w: '100%',
                                zIndex: 1,
                                overflow: 'hidden',
                            }}
                        >
                            <CustomChart
                                dataChart={dataMAke}
                                title="ABEL_ACTIVITY_USER"
                                typeChart={CHART_LIST.Line.name}
                                height={180}
                                width={500}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </WrapperLoading>
        </Card>
    );
};
export default LineChart;
