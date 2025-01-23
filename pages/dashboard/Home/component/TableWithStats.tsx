/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Refresh } from 'assets/svg';

import { Api } from 'api';

import WrapperLoading from 'component/common/WrapperLoading';
import { Card, Divider, Grid } from '@mui/material';
import ErrorComponent from './ErrorComponent';
import TotalLateCards from './tables/TotalLateCards';
import { GreenCircle, styles } from './style';
import useMockAPI from '../../../../utils/mockApi/useMockAPI';
import { dataMock } from './dataMock';

const items = [
    {
        customer_name: 'CORONADO ISLAND MARRIOTT',
        customer_code: '1237',
        order_count: 30,
    },
    {
        customer_name: 'MARRIOTT DEL MAR',
        customer_code: '1212',
        order_count: 8,
    },
    {
        customer_name: 'HYATT ORANGE COUNTY (NORTH)',
        customer_code: '1105',
        order_count: 7,
    },
    {
        customer_name: 'BEVERLY HILTON HOTEL',
        customer_code: '1000',
        order_count: 6,
    },
    {
        customer_name: 'LIDO HOUSE-AUTOGRAPH COLLECTION',
        customer_code: '1278',
        order_count: 4,
    },
];

export interface ITableWithStatsProps {
    filterDate: {
        startDate: string;
        endDate: string;
    };
}

const TableWithStats = ({ filterDate }: ITableWithStatsProps) => {
    const { startDate, endDate } = filterDate;
    const [data, setData] = React.useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);

    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.carts_information.url,
        dataMock.carts_information.response,
        250,
    );
    useEffect(() => {
        if (startDate && endDate) {
            fetchData();
        }
    }, [filterDate]);

    const fetchData = async () => {
        setData([]);
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
    const { cart_in, cart_out, total_cart, late_carts, total_late_carts }: any =
        data;
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
                    <GreenCircle />
                </Grid>
                <Grid item css={styles.divFlex} sx={{ p: '1rem' }}>
                    <Grid item css={styles.flexColumn}>
                        <span
                            style={{
                                fontSize: '18px',
                                marginBottom: ' 1rem',
                            }}
                        >
                            Total Cart
                        </span>
                        <div
                            style={{
                                fontSize: '24px',
                            }}
                        >
                            <strong>{total_cart}</strong>
                            <span
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                }}
                            >
                                {' '}
                                num.
                            </span>
                        </div>
                    </Grid>
                    <Divider css={styles.cardDivider} />
                    <Grid item css={styles.flexColumn}>
                        <span
                            style={{
                                fontSize: '18px',
                                marginBottom: '1rem',
                            }}
                        >
                            Cart In
                        </span>
                        <div
                            style={{
                                fontSize: '24px',
                            }}
                        >
                            <strong className="">{cart_in}</strong>
                            <span
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                }}
                            >
                                {' '}
                                num.
                            </span>
                        </div>
                    </Grid>
                    <Divider css={styles.cardDivider} />
                    <Grid item css={styles.flexColumn}>
                        <span
                            style={{
                                fontSize: '18px',
                                marginBottom: '1rem',
                            }}
                        >
                            Cart Out
                        </span>
                        <div
                            style={{
                                fontSize: '24px',
                            }}
                        >
                            <strong className="">{cart_out}</strong>
                            <span
                                style={{
                                    fontSize: '14px',
                                    fontWeight: 400,
                                }}
                            >
                                {' '}
                                num.
                            </span>
                        </div>
                    </Grid>
                </Grid>
                <TotalLateCards
                    data={late_carts || []}
                    title="Total Late Carts"
                    noIcons
                    renderSubTitle={() => {
                        return (
                            <div>
                                <span
                                    // className="text-black"
                                    style={{
                                        color: '#EA5455',
                                        fontSize: '24px',
                                    }}
                                >
                                    {total_late_carts}
                                </span>{' '}
                                <span
                                    style={{
                                        color: '#EA5455',
                                    }}
                                >
                                    num.
                                </span>
                            </div>
                        );
                    }}
                />
            </WrapperLoading>
        </Card>
    );
};

export default TableWithStats;
