/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Refresh } from 'assets/svg';

import { Api } from 'api';
import WrapperLoading from 'component/common/WrapperLoading';
import { Card, Divider, Grid, Typography } from '@mui/material';
import ErrorComponent from './ErrorComponent';
import { RedCircle, styles } from './style';
import useMockAPI from '../../../../utils/mockApi/useMockAPI';
import { dataMock } from './dataMock';

export interface IManifestInvoiceProps {
    filterDate: {
        startDate: string;
        endDate: string;
    };
}

const ManifestInvoice = ({ filterDate }: IManifestInvoiceProps) => {
    const { startDate, endDate } = filterDate;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);

    const initialState = {
        not_manifested_tickets: 0,
        unpaid_invoicing_count: 0,
        unpaid_invoicing_amount: '-',
    };
    const [data, setData] = useState(initialState);
    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.not_manifested_tickets_and_unpaid_invoicing.url,
        dataMock.not_manifested_tickets_and_unpaid_invoicing.response,
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
        <Card css={styles.card} sx={{ pb: '2rem' }}>
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
                <Grid item css={styles.divFlex} mt="10px">
                    <Grid item css={styles.flexColumn}>
                        <Typography
                            style={{
                                fontSize: '18px',
                                marginBottom: '25px',
                            }}
                        >
                            Not Manifested Tickets
                        </Typography>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: '100%',
                            }}
                        >
                            <div
                                className=""
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 500,
                                }}
                            >
                                <strong>{data.not_manifested_tickets}</strong>{' '}
                                <span
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 400,
                                    }}
                                >
                                    Ticket
                                </span>
                            </div>
                        </Grid>
                    </Grid>
                    <Divider css={styles.cardDivider} />
                    <Grid item css={styles.flexColumn} sx={{ width: 'auto' }}>
                        <Typography
                            style={{
                                fontSize: '18px',
                                marginBottom: '25px',
                            }}
                        >
                            Unpaid Invoicing
                        </Typography>
                        <Grid
                            item
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                width: '100%',
                            }}
                        >
                            <div
                                style={{
                                    fontSize: '28px',
                                    fontWeight: 500,
                                }}
                            >
                                <strong>{data.unpaid_invoicing_count}</strong>
                                {'  '}{' '}
                                <span
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: 400,
                                    }}
                                >
                                    num.
                                </span>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </WrapperLoading>
        </Card>
    );
};

export default ManifestInvoice;
