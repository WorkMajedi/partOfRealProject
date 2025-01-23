/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Refresh } from 'assets/svg';
import { Api } from 'api';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import WrapperLoading from 'component/common/WrapperLoading';
import useMockAPI from 'utils/mockApi/useMockAPI';
import ErrorComponent from './ErrorComponent';
import { styles, GreenCircle } from './style';
import { dataMock } from './dataMock';

export interface IDataTypesProps {
    filterDate: {
        startDate: string;
        endDate: string;
    };
    setting?: any;
}

const DataTypes = ({ filterDate, setting }: IDataTypesProps) => {
    const { startDate, endDate } = filterDate;
    const { weight_unit } = setting;
    const initialState = {
        pc: 0,
        lb: 0,
    };
    const [data, setData] = React.useState(initialState);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.pc_lb_counter.url,
        dataMock.pc_lb_counter.response,
        250,
    );
    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
    }, [filterDate]);

    const fetchData = async () => {
        setData(initialState);
        setLoading(true);
        setError(false);
        try {
            const res = await getDataMock();
            if (res) {
                setLoading(false);
                setData(res.data);
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
        <Card css={styles.dataTypesCard}>
            <WrapperLoading
                isLoading={loading}
                isError={error && <ErrorComponent fetchData={fetchData} />}
            >
                <Grid item css={styles.divFlexWrapper}>
                    <Grid item css={styles.divButton} onClick={fetchData}>
                        <Refresh />
                    </Grid>
                    <GreenCircle />
                </Grid>
                <Grid item css={styles.divFlexWrapper}>
                    <Grid item css={styles.flexColumn}>
                        <div>
                            <Typography
                                css={styles.dark}
                                variant="h6"
                                fontSize="18px"
                                mb="28px"
                            >
                                LB
                            </Typography>
                            <Typography sx={{ fontSize: '24px' }}>
                                <strong>{data.lb}</strong>
                                <span
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '400px',
                                        color: '#5E5873',
                                    }}
                                >
                                    {' '}
                                    {weight_unit}
                                </span>
                            </Typography>
                        </div>
                    </Grid>
                    <Divider css={styles.cardDivider} />
                    <Grid item css={styles.flexColumn}>
                        <div>
                            <Typography
                                css={styles.dark}
                                variant="h6"
                                fontSize="18px"
                                mb="28px"
                            >
                                PC
                            </Typography>
                            <Typography sx={{ fontSize: '24px' }}>
                                <strong>{data.pc}</strong>
                                <span
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '400px',
                                        color: '#5E5873',
                                    }}
                                >
                                    {' '}
                                    num.
                                </span>
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </WrapperLoading>
        </Card>
    );
};

export default DataTypes;
