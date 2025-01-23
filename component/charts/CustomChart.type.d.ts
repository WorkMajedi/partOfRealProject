interface dataChart {
    datasets: any[];
    labels: string[];
    options?: any;
    width?: number;
    height?: number;
}
export interface ICustomChart {
    typeChart: string;
    dataChart?: IFakeDataChart;
    title: string;
    subtitle?: string;
    theme?: any;
    height?: number | string;
    width?: number | string;
    options?: ChartOptions;
}
export interface IFakeDataChart {
    labels: string[];
    data: any[];
}
export interface IDatasets {
    label: string;
    fill?: boolean;
    backgroundColor: string;
    data: number[];
}
