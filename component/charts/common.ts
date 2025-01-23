import { Bar, Doughnut, Line, Pie, Radar } from 'react-chartjs-2';
import { humanizeToEnglish } from 'utils/humanizeToFarsiChart';

/* eslint-disable */
export let CHART_LIST: any = {
    Bar: {
        name: 'Bar',
        component: Bar,
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
                labels: {
                    textAlign: 'center',
                    usePointStyle: true,
                    boxWidth: 2,
                },
            },
            tooltips: {
                intersect: false,
            },
            hover: {
                intersect: true,
            },
            plugins: {
                filler: {
                    propagate: false,
                },
            },
            scales: {
                xAxes: [
                    {
                        reverse: true,
                        gridLines: {
                            display: false,
                            color: 'rgba(0,0,0,0)',
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 5,
                            precision: 0,
                            padding: 12,
                            callback(value: number | string) {
                                return humanizeToEnglish(value ?? 0);
                            },
                        },
                        display: true,
                        borderDash: [5, 5],
                        gridLines: {
                            display: false,
                            color: '#E1E5ED',
                            fontColor: '#fff',
                        },
                    },
                ],
            },
        },
    },
    Doughnut: {
        name: 'Doughnut',
        component: Doughnut,
        options: {
            maintainAspectRatio: false,
            cutoutPercentage: 65,
            legend: {
                display: false,
            },
        },
    },
    Line: {
        name: 'Line',
        component: Line,
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
                labels: {
                    textAlign: 'center',
                    usePointStyle: true,
                    boxWidth: 2,
                },
            },
            tooltips: {
                intersect: false,
            },
            hover: {
                intersect: true,
            },
            plugins: {
                filler: {
                    propagate: false,
                },
            },
            scales: {
                xAxes: [
                    {
                        reverse: true,
                        gridLines: {
                            display: false,
                            color: 'rgba(0,0,0,0)',
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            autoSkip: true,
                            maxTicksLimit: 5,
                            precision: 0,
                            padding: 12,
                            callback(value: number | string) {
                                return humanizeToEnglish(value ?? 0);
                            },
                        },
                        display: true,
                        borderDash: [5, 5],
                        gridLines: {
                            display: false,
                            color: '#E1E5ED',
                            fontColor: '#fff',
                        },
                    },
                ],
            },
        },
    },
    Pie: {
        name: 'Pie',
        component: Pie,
        options: {
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
        },
    },
    Radar: {
        name: 'Radar',
        component: Radar,
        options: { maintainAspectRatio: false },
    },
};
