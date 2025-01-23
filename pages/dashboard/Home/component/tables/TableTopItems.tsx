/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { Refresh } from 'assets/svg';
import WrapperLoading from 'component/common/WrapperLoading';
import { Card, Divider, Grid, Typography } from '@mui/material';
import { Api } from '../../../../../api';
import ErrorComponent from '../ErrorComponent';
import { GreenCircle, styles } from '../style';
import useMockAPI from '../../../../../utils/mockApi/useMockAPI';
import { dataMock } from '../dataMock';

const items = [
    {
        name: '100 (KING SHEET)',
        count: 8779,
        weight: 0,
    },
    {
        name: '102 (QUEEN SHEET)',
        count: 3743,
        weight: 0,
    },
    {
        name: '547 (QUEEN FUSION COVERLT)',
        count: 3245,
        weight: 0,
    },
    {
        name: '100STP (STRIPED KING SHEET)',
        count: 3223,
        weight: 0,
    },
    {
        name: '546 (KING FUSION COVERLT)',
        count: 3050,
        weight: 0,
    },
    {
        name: '120 (PILLOW CASE)',
        count: 2999,
        weight: 0,
    },
    {
        name: '523 (CHAIR COVER)',
        count: 2645,
        weight: 0,
    },
    {
        name: '104 (DOUBLE SHEET)',
        count: 2569,
        weight: 0,
    },
    {
        name: '122 (KING PILLOW CASE)',
        count: 1954,
        weight: 0,
    },
    {
        name: '130 (BATH TOWEL)',
        count: 1941,
        weight: 0,
    },
];

export interface ITable3ColumnsProps {
    title: string;
    subtitle?: string;
    secondSubtitle?: string;
    noCode?: boolean;
    filterDate: {
        startDate: string;
        endDate: string;
    };
}
interface IData {
    name?: string;
    count?: number;
    weight?: number;
    code?: string;
}
const TableTopItems = ({
    filterDate,
    title,
    subtitle,
    secondSubtitle,
    noCode = false,
}: ITable3ColumnsProps) => {
    const { startDate, endDate } = filterDate;
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = React.useState(false);

    const [data, setData] = useState<IData[]>([]);
    const { fetchData: getDataMock } = useMockAPI<any>(
        dataMock.top_8_items.url,
        dataMock.top_8_items.response,
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
        <Card css={styles.card} sx={{ pb: '2rem' }}>
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
                <Grid item css={styles.divWrapperStart} sx={{ p: '10px 5px' }}>
                    <Grid item css={styles.divFlex}>
                        <Grid item sm={6}>
                            <Typography css={styles.titleCard}>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item sm={4}>
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
                            <Grid item display="flex" sm={6}>
                                <Typography>{index + 1}- </Typography>
                                {noCode === false && (
                                    <Typography className="badge-grey">
                                        {item.code}
                                    </Typography>
                                )}{' '}
                                <Typography>{item.name}</Typography>
                            </Grid>
                            <Grid item sm={4}>
                                <Typography className="dateText">
                                    {item.count}
                                </Typography>
                            </Grid>
                            <Grid item sm={1} textAlign="end">
                                <Typography className="dateText">
                                    {`${item.weight} lb`}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </WrapperLoading>
        </Card>
    );
};

export default TableTopItems;
