import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import BarChartSignal from './component/chart/BarChartSignal';
import {
    TopNav,
    DataTypes,
    TotalData,
    ManifestInvoice,
    LatePaidCustomers,
    TableWithStats,
} from './component';
import TableTopItems from './component/tables/TableTopItems';
import LastPayment from './component/LastPayment';
import TopCustomers from './component/TopCustomer';
import BarChart from './component/chart/BarChart';
import LineChart from './component/chart/LineChart1';

interface IProps {
    PermissionsPage: any;
}
const Dashboard: FC<IProps> = ({ PermissionsPage }) => {
    const [date, setDate] = useState({
        startDate: '',
        endDate: '',
    });
    const filterDate = (data: any) => {
        setDate({ ...data });
        return data;
    };
    const settings = useSelector((state: any) => state?.Settings) || {
        language: 'English',
        weight_unit: 'lbs',
        monetary_unit: 'Dollar',
    };
    const reloadData = () => {
        return null;
    };
  
    return (
        <div style={{ width: '100%', position: 'relative' }}>
            <TopNav getDate={filterDate} reloadData={reloadData} />
            <Grid container flexDirection="column" justifyItems="center">
                <Grid item display="flex" flex={1} m="32px 0 24px">
                    <DataTypes filterDate={date} setting={settings} />
                    <TotalData filterDate={date} setting={settings} />
                </Grid>
                <Grid container justifyItems="center">
                    <Grid item flex={1}>
                        <BarChart filterDate={date} setting={settings} />
                        <TableWithStats filterDate={date} />
                        <LineChart filterDate={date} setting={settings} />
                        <BarChartSignal filterDate={date} />
                        <TopCustomers
                            title="Top 5 Customer (Pickup)"
                            subtitle="Order Time"
                            filterDate={date}
                        />
                    </Grid>
                    <Grid item flex={1} ml="24px">
                        <ManifestInvoice filterDate={date} />
                        <LatePaidCustomers
                            title="Late Paid Customers"
                            filterDate={date}
                            setting={settings}
                        />

                        <TableTopItems
                            title="Top 10 Items by PC"
                            subtitle="Count"
                            secondSubtitle="Weight"
                            noCode
                            filterDate={date}
                        />
                        <LastPayment
                            title="Last 5 Payment"
                            subtitle="Amount"
                            secondSubtitle="Date"
                            filterDate={date}
                            setting={settings}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
