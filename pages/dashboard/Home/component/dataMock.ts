const dataMock = {
    total_invoice_and_due: {
        url: '/api/v1/dashboard/data/total_invoice_and_due/',
        response: {
            status: 'success',
            data: {
                total_invoice: '48,790.77',
                total_due: '24,730.84',
            },
        },
    },
    pc_lb_counter: {
        url: 'pc_lb_counter',
        response: {
            status: 'success',
            data: {
                pc: 104,
                lb: 381,
            },
        },
    },
    total_net_out_in: {
        url: '/api/v1/dashboard/charts/total_net_out_in/',
        response: {
            status: 'success',
            data: {
                labels: [
                    '12/29',
                    '12/30',
                    '01/01',
                    '01/02',
                    '01/03',
                    '01/04',
                    '01/09',
                    '01/10',
                    '01/11',
                    '01/12',
                    '01/15',
                    '01/16',
                    '01/17',
                    '02/01',
                    '02/06',
                    '02/07',
                    '02/21',
                    '02/22',
                    '02/23',
                    '02/27',
                    '02/28',
                    '03/02',
                    '03/03',
                    '03/06',
                    '03/07',
                    '03/08',
                    '03/09',
                    '03/13',
                    '03/14',
                    '03/15',
                    '03/16',
                    '03/28',
                    '04/02',
                    '04/03',
                    '04/04',
                    '04/05',
                    '04/17',
                    '04/24',
                    '04/27',
                    '05/08',
                    '07/12',
                ],
                chart1: [
                    1200.0, 6000.0, 0, 450.0, 17986.0, 2939.0, 0, 800.0, 0,
                    2372.0, 1580.0, 2495.0, 300.0, 3550.0, 242.0, 4150.0,
                    4630.0, 700.0, 600.0, 1600.0, 2590.0, 800.0, 800.0, 1600.0,
                    2400.0, 1208.0, 800.0, 666.0, 666.0, 666.0, 666.0, 10822.0,
                    1946.0, 0, 2100.0, 0, 1066.0, 1151.0, 70.0, 139.0, 1851.0,
                ],
                chart2: [
                    0, 0, 800.0, 14400.0, 1009.0, 700.0, 0.0, 0, 200.0, 0,
                    2500.0, 2199.0, 4120.0, 2096.0, 0, 1760.0, 0, 0, 600.0,
                    1600.0, 2400.0, 800.0, 800.0, 1200.0, 2397.0, 2400.0, 0, 0,
                    666.0, 666.0, 1066.0, 3728.0, 0, 1866.0, 1299.0, 380.0,
                    1066.0, 1083.0, 0, 0, 0,
                ],
                Total_net_in: 83601.0,
                Total_Net_Out: 53801.0,
            },
        },
    },
    not_manifested_tickets_and_unpaid_invoicing: {
        url: '/api/v1/dashboard/data/not_manifested_tickets_and_unpaid_invoicing/',
        response: {
            status: 'success',
            data: {
                not_manifested_tickets: 1,
                unpaid_invoicing_count: 24,
                unpaid_invoicing_amount: '-',
            },
        },
    },
    late_paid_customers: {
        url: '/api/v1/dashboard/data/late_paid_customers/',
        response: {
            status: 'success',
            data: [
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
                    late_paid_amount: '1,500.00',
                },
                {
                    customer_code: '1280',
                    customer_name: 'LE MERIDIEN PASADENA ARCADIA',
                    late_paid_amount: '1,512.18',
                },
                {
                    customer_code: '1278',
                    customer_name: 'LIDO HOUSE-AUTOGRAPH COLLECTION',
                    late_paid_amount: '1,390.50',
                },
            ],
        },
    },
    carts_information: {
        url: '/api/v1/dashboard/data/carts_information/',
        response: {
            status: 'success',
            data: {
                total_cart: 172,
                cart_in: 143,
                cart_out: 29,
                total_late_carts: 27,
                late_carts: [
                    {
                        customer_code: '1237',
                        customer_name: 'CORONADO ISLAND MARRIOTT',
                        count: 22,
                    },
                    {
                        customer_code: '1000',
                        customer_name: 'BEVERLY HILTON HOTEL',
                        count: 2,
                    },
                    {
                        customer_code: '1278',
                        customer_name: 'LIDO HOUSE-AUTOGRAPH COLLECTION',
                        count: 1,
                    },
                    {
                        customer_code: '1105',
                        customer_name: 'HYATT ORANGE COUNTY (NORTH)',
                        count: 1,
                    },
                    {
                        customer_code: '1212',
                        customer_name: 'MARRIOTT DEL MAR',
                        count: 1,
                    },
                ],
            },
        },
    },
    systematic_control: {
        url: '/api/v1/dashboard/charts/systematic_control/',
        response: {
            status: 'success',
            data: {
                labels: [
                    'Dry Clean Service Require',
                    'StainHeld',
                    'Discard',
                    'New',
                    'Rewash',
                    'Damage',
                    'Return',
                    'Lost and Found',
                    'Special',
                    'CSR',
                    'RFID Hold',
                    'Damage Item Sent by Customer',
                ],
                data: {
                    'Dry Clean Service Require': 202,
                    StainHeld: 494,
                    Discard: 328,
                    New: 120,
                    Rewash: 67,
                    Damage: 55,
                    Return: 10,
                    'Lost and Found': 56,
                    Special: 112,
                    CSR: 56,
                    'RFID Hold': 56,
                    'Damage Item Sent by Customer': 56,
                },
                total: 1612,
            },
        },
    },
    total_net_out_for_am_pm: {
        url: '/api/v1/dashboard/charts/total_net_out_for_am_pm/',
        response: {
            status: 'success',
            data: {
                labels: [
                    '12/30',
                    '01/03',
                    '01/04',
                    '01/09',
                    '01/17',
                    '01/19',
                    '02/01',
                    '02/06',
                    '02/07',
                    '02/22',
                    '02/23',
                    '02/27',
                    '03/02',
                    '03/03',
                    '03/08',
                    '03/09',
                    '03/15',
                    '03/16',
                    '03/28',
                    '04/04',
                    '12/29',
                    '12/31',
                    '01/02',
                    '01/10',
                    '01/15',
                    '01/16',
                    '02/21',
                    '02/28',
                    '04/02',
                    '04/17',
                    '04/24',
                    '04/27',
                ],
                chart1: [
                    5000.0, 1009.0, 700.0, 0.0, 3820.0, 321.0, 1775.0, 0.0,
                    1760.0, 700.0, 600.0, 1200.0, 800.0, 800.0, 1700.0, 999.0,
                    666.0, 1066.0, 2029.0, 1299.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                ],
                chart2: [
                    0.0, 0.0, 0.0, 0.0, 300.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
                    400.0, 0.0, 0.0, 700.0, 0.0, 0.0, 0.0, 0.0, 0.0, 3100.0,
                    0.0, 7100.0, 200.0, 2500.0, 2199.0, 380.0, 2400.0, 1200.0,
                    2397.0, 666.0, 1866.0, 1066.0, 1083.0, 0.0,
                ],
                total: 53801.0,
            },
        },
    },
    top_8_items: {
        url: '/api/v1/dashboard/data/top_8_items/',
        response: {
            status: 'success',
            data: [
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
            ],
        },
    },
    last_5_payment: {
        url: '/api/v1/dashboard/data/last_5_payment/',
        response: {
            status: 'success',
            data: [
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
            ],
        },
    },
    total_discounts_and_variety: {
        url: '/api/v1/dashboard/charts/total_discounts_and_variety/',
        response: {
            status: 'success',
            data: {
                labels: ['03/08', '04/10', '04/17', '04/24'],
                chart1: [370.0, 15.0, 180.0, 100.0],
            },
        },
    },
    top_5_customers: {
        url: 'api/v1/dashboard/data/top_5_customers/',
        response: {
            status: 'success',
            data: [
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
            ],
        },
    },
};
export { dataMock };
