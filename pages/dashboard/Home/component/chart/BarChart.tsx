/** @jsxImportSource @emotion/react */
import { CHART_LIST } from 'component/charts/common';
import CustomChart from 'component/charts/CustomChart';
import { IFakeDataChart } from 'component/charts/CustomChart.type';
import { Refresh } from 'assets/svg';
import React, { useEffect, useState } from 'react';
import {
    Card,
    Button,
    CircularProgress,
    Typography,
    Grid,
} from '@mui/material';
// import { Card } from 'reactstrap';
import { Api } from 'api';
import WrapperLoading from 'component/common/WrapperLoading';
import useMockAPI from 'utils/mockApi/useMockAPI';
import ErrorComponent from '../ErrorComponent';
import { RedCircle, styles } from '../style';
import { dataMock } from '../dataMock';

export interface IDataTypesProps {
    filterDate: {
        startDate: string;
        endDate: string;
    };
    setting: any;
}
const BarChart = ({ filterDate, setting }: IDataTypesProps) => {
    const { startDate, endDate } = filterDate;
    const initialState = {
        labels: [],
        chart1: [],
        chart2: [],
        Total_net_in: 0,
        Total_Net_Out: 0,
    };
    const [dataChart, setChartData] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);
    const { weight_unit } = setting;
    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.total_net_out_in.url,
        dataMock.total_net_out_in.response,
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
    const [colorsChart1, colorsChart2] = ['#28C76F', '#EA5455'];
    const dataMAke: IFakeDataChart = {
        labels: dataChart.labels,
        data: [
            {
                label: 'Total Net in',
                data: dataChart.chart1,
                fill: false,
                borderColor: colorsChart1,
                backgroundColor: colorsChart1,
                // tension: 0.1,
                borderWidth: 2,
                pointBackgroundColor: colorsChart1,
                pointBorderWidth: 10,
            },
            {
                label: 'Total Net Out',
                data: dataChart.chart2,
                fill: false,
                borderColor: colorsChart2,
                backgroundColor: colorsChart2,
                // tension: 0.1,
                borderWidth: 1,
                pointBackgroundColor: colorsChart2,
                pointBorderWidth: 20,
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
                    sx={{ flexDirection: 'row-reverse' }}
                    onClick={fetchData}
                >
                    <Refresh />
                </Grid>
                <Grid item sx={{ p: '10px 5px' }}>
                    <Grid
                        item
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mr: 3,
                        }}
                    >
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography
                                variant="h3"
                                fontWeight="bold"
                                color="dark"
                            >
                                Total Net Out / In
                            </Typography>
                            <div className="d-flex ">
                                <span className="pr-2 d-flex align-items-center ">
                                    <span>
                                        <svg
                                            width="13"
                                            height="13"
                                            style={{
                                                fill: colorsChart1,
                                                marginRight: 10,
                                            }}
                                        >
                                            <rect width="13" height="13" />
                                        </svg>
                                    </span>
                                    Total Net in
                                </span>
                                <span className="pr-2 d-flex align-items-center ">
                                    <span>
                                        <svg
                                            width="13"
                                            height="13"
                                            style={{
                                                fill: colorsChart2,
                                                marginRight: 10,
                                            }}
                                        >
                                            <rect width="13" height="13" />
                                        </svg>
                                    </span>{' '}
                                    Total Net Out
                                </span>
                            </div>
                        </Grid>
                        <div className="d-flex flex-column">
                            <span>Total Net in</span>
                            <span>
                                <span className="h4  font-weight-bold">
                                    {dataChart?.Total_net_in}
                                </span>{' '}
                                {weight_unit}
                            </span>
                        </div>
                        <div className="d-flex flex-column">
                            <span>Total Net Out</span>
                            <div>
                                <span className="h4  font-weight-bold">
                                    {dataChart?.Total_Net_Out}
                                </span>{' '}
                                {weight_unit}
                            </div>
                        </div>
                    </Grid>
                    <hr className="mt-2 mb-3" />

                    <CustomChart
                        dataChart={dataMAke}
                        title="ABEL_ACTIVITY_USER"
                        typeChart={CHART_LIST.Bar.name}
                        height={180}
                        width={300}
                    />
                </Grid>
            </WrapperLoading>
        </Card>
    );
};
export default BarChart;
