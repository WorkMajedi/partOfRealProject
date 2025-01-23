// import api from '../../../api';
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

const items = [
    {
        customer_code: '1237',
        customer_name: 'CORONADO ISLAND MARRIOTT',
        late_paid_amount: '1,389.29',
    },
    {
        customer_code: '1212',
        customer_name: 'MARRIOTT DEL MAR',
        late_paid_amount: '14,776.26',
    },
    {
        customer_code: '1105',
        customer_name: 'HYATT ORANGE COUNTY (NORTH)',
        late_paid_amount: '4,162.61',
    },
    {
        customer_code: '1000',
        customer_name: 'BEVERLY HILTON HOTEL',
    },
];

export interface ILatePaidCustomersProps {
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
    setting: any;
}
interface IData {
    customer_code?: number | string;
    customer_name?: string;
    late_paid_amount?: string;
    card?: string;
}
const LatePaidCustomers = ({
    filterDate,
    title,
    subtitle,
    withCard = false,
    noIcons = false,
    renderSubTitle,
    setting,
}: ILatePaidCustomersProps) => {
    const { startDate, endDate } = filterDate;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);
    const { monetary_unit } = setting;
    const [data, setData] = useState<IData[]>([]);
    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.late_paid_customers.url,
        dataMock.late_paid_customers.response,
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
                        <Typography css={styles.titleCard} variant="h3">
                            {title}
                        </Typography>
                        {subtitle ? (
                            <span style={{ color: 'dark' }}>{subtitle}</span>
                        ) : (
                            renderSubTitle &&
                            data?.length > 0 &&
                            renderSubTitle()
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
                            {withCard ? (
                                <Typography>{item?.card}</Typography>
                            ) : (
                                <Typography className="amountText">
                                    {`$${item.late_paid_amount}`}
                                </Typography>
                            )}{' '}
                        </Grid>
                    ))}
                </Grid>
            </WrapperLoading>
        </Card>
    );
};

export default LatePaidCustomers;
