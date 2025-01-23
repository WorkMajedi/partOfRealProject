import React from 'react';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { ChartWrapper } from './CustomChart.Style';
import { ICustomChart } from './CustomChart.type';
import { CHART_LIST } from './common';

function CustomChart({
    dataChart,
    title,
    options,
    theme,
    typeChart,
    height,
    width,
}: ICustomChart) {
    // @ts-ignore
    const data = {
        labels: dataChart?.labels,
        datasets: dataChart?.data,
    };
    const ComponentChart = CHART_LIST[typeChart].component;
    Chart.register(CategoryScale);
    return (
        <ChartWrapper>
            <ComponentChart
                data={data}
                options={{
                    ...CHART_LIST[typeChart].options,
                    ...options,
                }}
                width={width || 250}
                height={height || 400}
            />
        </ChartWrapper>
    );
}

export default CustomChart;
