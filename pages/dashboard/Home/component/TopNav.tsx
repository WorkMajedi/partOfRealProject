/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    Typography,
} from '@mui/material';
import moment from 'moment';
import { QuickAction, Refresh } from 'assets/svg';
import { CustomButton } from 'component/common';
import { styles } from './style';

export interface ITopNavProps {
    getDate: (p: { endDate: any; startDate: any }) => void;
    reloadData?: () => void;
}

const HomeButton = ({ text, icon, onClick }: any) => {
    return (
        <CustomButton
            variant="outlined"
            sx={{
                width: 210,
                margin: '5px',
                padding: 2,
                alignItems: 'flex-center',
                display: 'flex',
                justifyContent: 'left',
            }}
            onClick={onClick}
            icon={icon}
        >
            {text}
        </CustomButton>
    );
};

const TopNav = ({ getDate }: ITopNavProps) => {
    const navigate = useNavigate();
    const [openQuick, setOpenQuick] = useState(false);
    const [nameFilter, setNameFilter] = useState('Monthly');
    const filterDaily = () => {
        getDate({
            startDate: moment()
                .subtract(1, 'day')
                .endOf('day')
                .format('YYYY-MM-DD'),
            endDate: moment().add(1, 'day').endOf('day').format('YYYY-MM-DD'),
        });
    };
    const filterWeek = () => {
        getDate({
            startDate: moment()
                .subtract(7, 'day')
                .endOf('day')
                .format('YYYY-MM-DD'),
            endDate: moment().add(1, 'day').endOf('day').format('YYYY-MM-DD'),
        });
    };
    const filterMonth = () => {
        getDate({
            startDate: moment()
                .subtract(0, 'month')
                .startOf('month')
                .format('YYYY-MM-DD'),
            endDate: moment().add(1, 'day').endOf('day').format('YYYY-MM-DD'),
        });
    };

    useEffect(() => {
        filterDate(nameFilter);
    }, []);
    const filterDate = (name: string) => {
        setNameFilter(name);
        switch (name) {
            case 'Daily':
                filterDaily();
                return 'Daily';
            case 'Weekly':
                filterWeek();
                return 'Weekly';
            case 'Monthly':
                filterMonth();
                return 'Monthly';
            default:
                return 'Monthly';
        }
    };
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpenQuick(false);
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
    const listQuickAccess = [
        {
            id: 1,
            label: 'Items',
            icon: 'layers',
            url: '/manufacture/items/list',
        },
        {
            id: 1,
            label: 'New Production',
            icon: 'ProductionSvg',
            url: '/manufacture/production/list',
        },
        {
            id: 1,
            label: 'New Order',
            icon: 'OrderSvg',
            url: '/sales/order/list',
        },
        {
            id: 1,
            label: 'New Purchase Order',
            icon: 'PurchaseOrder',
            url: '/sales/PurchaseOrder/add',
        },
        {
            id: 1,
            label: 'Purchase Order Receipt',
            icon: 'PurchaseOrder',
            url: '/sales/PurchaseOrder/receipt/add',
        },
        {
            id: 1,
            label: 'New Cash Application',
            icon: 'AccountingSvg',
            url: '/sales/accounting/CashApplication/add',
        },
        {
            id: 1,
            label: 'Raw Materials List',
            icon: 'RawMaterialSvg',
            url: '/manufacture/raw-material/list',
        },
        {
            id: 1,
            label: 'Packaging Materials List',
            icon: 'PackagingMaterialSvg',
            url: '/manufacture/packaging-material/list',
        },
        {
            id: 1,
            label: 'Invoices List',
            icon: 'InvoiceSvg',
            url: '/sales/invoice/list',
        },
    ];
    return (
        <Card ref={ref}>
            <Grid
                item
                css={styles.divFlex}
                sx={{ padding: '6px 30px 7px 15px' }}
            >
                <Grid
                    item
                    css={styles.divButton}
                    onClick={e => {
                        e.stopPropagation();
                        setOpenQuick(!openQuick);
                    }}
                >
                    <QuickAction style={{ marginRight: '1rem' }} />
                    <Typography variant="body1" color="#4B4B4B">
                        Dashboard
                    </Typography>
                </Grid>
                <Divider css={styles.divider} />
                <Grid item css={styles.divFlexWrapper}>
                    <Typography css={styles.textNav} sx={{ mr: '1rem' }}>
                        Show Data By:
                    </Typography>
                    <Grid item css={styles.divFlexWrapper}>
                        <Button
                            className="mx-0 toggleButton"
                            onClick={() => filterDate('Daily')}
                            sx={
                                nameFilter === 'Daily'
                                    ? { color: '#000', fontWeight: 800 }
                                    : {
                                          color: '#b9b9c3',
                                          fontWeight: '400',
                                          fontSize: '14px',
                                          lineHeight: '21px',
                                      }
                            }
                        >
                            Current Date{' '}
                        </Button>
                        <Typography color="#b9b9c3">/</Typography>
                        <Button
                            className="mx-0 toggleButton"
                            onClick={() => filterDate('Weekly')}
                            sx={
                                nameFilter === 'Weekly'
                                    ? { color: '#000', fontWeight: 800 }
                                    : {
                                          color: '#b9b9c3',
                                          fontWeight: '500',
                                          fontSize: '14px',
                                          lineHeight: '23px',
                                      }
                            }
                        >
                            Last 7 Days{' '}
                        </Button>
                        <Typography color="#b9b9c3">/</Typography>
                        <Button
                            className="mx-0 toggleButton"
                            onClick={() => filterDate('Monthly')}
                            sx={
                                nameFilter === 'Monthly'
                                    ? {
                                          color: '#5E5873',
                                          fontWeight: '500',
                                          fontSize: '15px',
                                          lineHeight: '24px',
                                      }
                                    : {
                                          color: '#5E5873',
                                          fontWeight: '500',
                                          fontSize: '15px',
                                          lineHeight: '24px',
                                      }
                            }
                        >
                            Month to Date{' '}
                        </Button>
                    </Grid>
                    {/* <ButtonGroup aria-label="Basic example">
              <Button variant="secondary">Daily</Button>
              <Button variant="secondary">Weekly</Button>
              <Button variant="secondary">Monthly</Button>
            </ButtonGroup> */}
                </Grid>
                <Divider css={styles.divider} />
                <Grid item style={{ marginRight: '2rem' }}>
                    <Grid
                        item
                        css={styles.divButton}
                        onClick={() => {
                            filterDate(nameFilter);
                            throw new Error(
                                'Sentry Test Error in live project',
                            );
                        }}
                    >
                        <Typography variant="body2" color="#5E5873" mr="9px">
                            Reload all data
                        </Typography>
                        <Refresh />
                    </Grid>
                </Grid>
                {openQuick && (
                    <Grid
                        item
                        sx={{
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            position: 'absolute',
                            width: 500,
                            top: 55,
                            left: 0,
                            zIndex: 1000,
                            display: 'flex',
                            textAlign: 'justify',
                        }}
                    >
                        <Card className="quickaction">
                            <CardContent>
                                <Typography variant="h3">
                                    Quick Access to Sections
                                </Typography>
                                <Grid
                                    item
                                    className="home-buttons"
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        alignItems: 'center',
                                        marginTop: 5,
                                    }}
                                >
                                    {listQuickAccess.map((item, index) => {
                                        return (
                                            <HomeButton
                                                text={item.label}
                                                onClick={() =>
                                                    navigate(item.url)
                                                }
                                                icon={item.icon}
                                            />
                                        );
                                    })}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Card>
    );
};

export default TopNav;
