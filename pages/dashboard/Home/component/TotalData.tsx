/** @jsxImportSource @emotion/react */
import { Api } from 'api';
import React, { useEffect, useState } from 'react';
import { Card, Divider, Grid, Typography } from '@mui/material';
import { Refresh } from 'assets/svg';
import WrapperLoading from 'component/common/WrapperLoading';
import ErrorComponent from './ErrorComponent';
import { styles } from './style';
import useMockAPI from '../../../../utils/mockApi/useMockAPI';
import { dataMock } from './dataMock';

export interface ITotalDataProps {
    filterDate: {
        startDate: string;
        endDate: string;
    };
    setting: any;
}

const TotalData = ({ filterDate, setting }: ITotalDataProps) => {
    const { startDate, endDate } = filterDate;
    const initialState = {
        total_invoice: 0,
        total_due: 0,
    };

    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);

    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.total_invoice_and_due.url,
        dataMock.total_invoice_and_due.response,
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
    const { monetary_unit = '' } = { ...setting };

    return (
        <Card css={styles.totalDataCard}>
            <WrapperLoading
                isLoading={loading}
                isError={error && <ErrorComponent fetchData={fetchData} />}
            >
                <Grid item css={styles.divFlexWrapper}>
                    <Grid item css={styles.divButton} onClick={fetchData}>
                        <Refresh />
                    </Grid>
                </Grid>
                <Grid item css={styles.divFlex}>
                    <Grid item css={styles.flexColumn}>
                        <span
                            style={{
                                fontSize: '18px',
                                fontWeight: 500,
                                marginBottom: '18px',
                            }}
                        >
                            Total Invoicing
                        </span>
                        <span
                            style={{
                                color: '#28C76F',
                                fontSize: '24px',
                                fontWeight: 500,
                            }}
                        >
                            {monetary_unit + data?.total_invoice}
                        </span>
                    </Grid>
                    <Divider css={styles.cardDivider} />
                    <Grid item css={styles.flexColumn}>
                        <span
                            style={{
                                fontSize: '18px',
                                fontWeight: 500,
                                marginBottom: '18px',
                            }}
                        >
                            Total Due
                        </span>
                        <span
                            style={{
                                fontSize: '24px',
                                color: '#EA5455',
                                fontWeight: 500,
                            }}
                        >
                            {monetary_unit + data.total_due}
                        </span>
                    </Grid>
                </Grid>
            </WrapperLoading>
        </Card>
    );
};

export default TotalData;
