/** @jsxImportSource @emotion/react */
import { Api } from 'api';
import React, { useEffect, useState } from 'react';
import { Refresh } from 'assets/svg';

import WrapperLoading from 'component/common/WrapperLoading';
import { Card, Divider, Grid, Typography } from '@mui/material';
import ErrorComponent from './ErrorComponent';
import { RedCircle, styles } from './style';
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

export interface ITopCustomersProps {
    data?: {
        id: number;
        name: string;
        code: string;
        price: string;
        card?: string;
    }[];
    title: string;
    subtitle?: string;
    // eslint-disable-next-line no-undef
    renderSubTitle?: () => JSX.Element;
    withCard?: boolean;
    noIcons?: boolean;
    filterDate: {
        startDate: string;
        endDate: string;
    };
}
interface IData {
    order_count: 27;
    customer_code?: number | string;
    customer_name?: string;
    card?: string | any;
}
const TopCustomers = ({
    filterDate,
    title,
    subtitle,
    withCard = false,
    noIcons = false,
    renderSubTitle,
}: ITopCustomersProps) => {
    const [data, setData] = useState<IData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);

    const { startDate, endDate } = filterDate;
    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.top_5_customers.url,
        dataMock.top_5_customers.response,
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
    return (
        <Card css={styles.card}>
            <WrapperLoading
                isLoading={loading}
                isError={error && <ErrorComponent fetchData={fetchData} />}
            >
                {noIcons ? null : (
                    <Grid item css={styles.divFlexWrapper}>
                        <Grid item css={styles.divButton} onClick={fetchData}>
                            <Refresh />
                        </Grid>
                        <RedCircle />
                    </Grid>
                )}
                <Grid item css={styles.divWrapperStart} sx={{ p: '10px 5px' }}>
                    <Grid item css={styles.divFlex}>
                        <Typography variant="h3" css={styles.titleCard}>
                            {title}
                        </Typography>
                        {subtitle ? (
                            <Typography css={styles.textTitleTable}>
                                {subtitle}
                            </Typography>
                        ) : (
                            renderSubTitle && renderSubTitle()
                        )}
                    </Grid>
                    <Divider css={styles.tableDivider} />
                    {data.map((item, index) => (
                        <Grid item css={styles.contentTable} key={index}>
                            <Grid item display="flex">
                                <Typography>{index + 1}- </Typography>
                                <Typography className="codeText">
                                    {item.customer_code}
                                </Typography>{' '}
                                <Typography>{item.customer_name}</Typography>
                            </Grid>
                            <Grid item>
                                {withCard ? (
                                    <Typography>{item?.card}</Typography>
                                ) : (
                                    <Typography>{item.order_count}</Typography>
                                )}{' '}
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </WrapperLoading>
        </Card>
    );
};

export default TopCustomers;
