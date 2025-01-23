/** @jsxImportSource @emotion/react */
import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { Refresh } from 'assets/svg';
import { RedCircle, styles } from '../style';

export interface ILatePaidCustomersProps {
    data: any[];
    // IData[];
    title: string;
    subtitle?: string;
    // eslint-disable-next-line no-undef
    renderSubTitle?: () => JSX.Element;
    withCard?: boolean;
    noIcons?: boolean;
}
interface IData {
    customer_code?: number | string;
    customer_name?: string;
    count?: string;
    card?: string;
}
const TotalLateCards = ({
    data,
    title,
    subtitle,
    withCard = false,
    noIcons = false,
    renderSubTitle,
}: ILatePaidCustomersProps) => {
    return (
        <Grid container direction="column" mt="25px" p="2rem">
            {noIcons ? null : (
                <Grid item css={styles.divFlexWrapper}>
                    <Refresh />
                    <RedCircle />
                </Grid>
            )}
            <Grid item css={styles.divWrapperStart}>
                <Grid item css={styles.divFlex}>
                    <Typography css={styles.titleCard} variant="h3">
                        {title}
                    </Typography>
                    {subtitle ? (
                        <span style={{ color: 'black' }}>{subtitle}</span>
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
                            <Typography>{item?.customer_name}</Typography>
                        </Grid>
                        <Grid item>
                            {withCard ? (
                                <Typography>{item?.card}</Typography>
                            ) : (
                                <Typography>{item?.count}</Typography>
                            )}{' '}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default TotalLateCards;
