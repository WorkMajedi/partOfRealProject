/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Refresh } from 'assets/svg';
import { Api } from 'api';

import { Card, Divider, Grid, Typography } from '@mui/material';
import ErrorComponent from './ErrorComponent';
import WrapperLoading from '../../../../component/common/WrapperLoading';
import { GreenCircle, styles } from './style';
import useMockAPI from '../../../../utils/mockApi/useMockAPI';
import { dataMock } from './dataMock';

const items = [
    {
        customer_code: '1212',
        customer_name: 'MARRIOTT DEL MAR',
        amount: '431.24',
        date: '04/2022/23',
    },
    {
        customer_code: '1212',
        customer_name: 'MARRIOTT DEL MAR',
        amount: '100.00',
        date: '04/2022/23',
    },
    {
        customer_code: '1105',
        customer_name: 'HYATT ORANGE COUNTY (NORTH)',
        amount: '500.00',
        date: '04/2022/23',
    },
    {
        customer_code: '1105',
        customer_name: 'HYATT ORANGE COUNTY (NORTH)',
        amount: '500.00',
        date: '04/2022/16',
    },
    {
        customer_code: '1237',
        customer_name: 'CORONADO ISLAND MARRIOTT',
        amount: '10,500.00',
        date: '04/2022/16',
    },
];

export interface ITable3ColumnsProps {
    data?: {
        id: number;
        name: string;
        code: string;
        price: string;
        date?: string;
    }[];
    title: string;
    subtitle?: string;
    secondSubtitle?: string;
    noCode?: false;
    filterDate: {
        startDate: string;
        endDate: string;
    };
    setting: any;
}
interface IData {
    amount: string;
    date: string;
    customer_code?: number | string;
    customer_name?: string;
    late_paid_amount?: string;
}
const LastPayment = ({
    filterDate,
    title,
    subtitle,
    secondSubtitle,
    setting,
    noCode = false,
}: ITable3ColumnsProps) => {
    const { startDate, endDate } = filterDate;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);
    const { monetary_unit } = setting;
    const [data, setData] = React.useState<IData[]>([]);
    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.last_5_payment.url,
        dataMock.last_5_payment.response,
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
                <Grid item css={styles.divFlex}>
                    <Grid item css={styles.divButton} onClick={fetchData}>
                        <Refresh />
                    </Grid>
                    <GreenCircle />
                </Grid>
                <Grid item css={styles.divWrapperStart} sx={{ p: '10px 5px' }}>
                    <Grid item css={styles.divFlex}>
                        <Grid item sm={6}>
                            <Typography variant="h3" css={styles.titleCard}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item sm={2}>
                            {subtitle && (
                                <Typography css={styles.textTitleTable}>
                                    {subtitle}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item sm={1}>
                            {secondSubtitle && (
                                <Typography css={styles.textTitleTable}>
                                    {secondSubtitle}
                                </Typography>
                            )}
                        </Grid>
                    </Grid>
                    <Divider css={styles.tableDivider} />
                    {data.map((item, index) => (
                        <Grid item css={styles.contentTable} key={index}>
                            <Grid item sm={6.5} sx={{ display: 'flex' }}>
                                <Typography>{index + 1}- </Typography>
                                {noCode === false && (
                                    <Typography className="codeText">
                                        {item.customer_code}
                                    </Typography>
                                )}{' '}
                                <Typography>{item.customer_name}</Typography>
                            </Grid>
                            <Grid item sm={1.7}>
                                <Typography className="amountText">
                                    {`$${item.amount}`}
                                </Typography>
                            </Grid>
                            <Grid item sm={1.7}>
                                <Typography className="dateText">
                                    {item?.date}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </WrapperLoading>
        </Card>
    );
};

export default LastPayment;
