export default {
    product_template_detail: (data: any) => {
        return {
            ...data,
            product_template_critical_path:
                data?.product_template_critical_path?.map((i: any) => {
                    return {
                        ...i,
                        rowId: i.guid,
                        phase_code: i?.phase.phase_code,
                        phase_description: i?.phase.phase_description,
                        product_template_raw_material:
                            i?.product_template_raw_material?.map(
                                (ptrm: any) => {
                                    return {
                                        ...ptrm,
                                        ...ptrm?.inventory,
                                        rowId: ptrm.guid,
                                    };
                                },
                            ),
                    };
                }),
            qa:
                data?.qa &&
                data?.qa?.map((item: any) => {
                    return {
                        ...item,
                        ...item?.quality_assurance,
                    };
                }),
        };
    },
    raw_material_details: (data: any) => {
        return {
            ...data,
            raw_material_vendor: data.raw_material_vendor.map((item: any) => {
                return {
                    id: item.id,
                    vendor: item.vendor,
                    vendorID: item.vendor.id,
                    name: item.vendor.name,
                    code: item.vendor.code,
                    uom: item.uom,
                    primary: item.primary,
                };
            }),
        };
    },
    pick_ticket_details: (data: any) => {
        return {
            ...data,
            term: data?.customer_term,
            address_zip_code: data?.address_zip_code,
            sales_tax: data?.address_zip_code?.sales_tax,
            items_list: !!data?.pick_ticket_items.length
                ? data?.pick_ticket_items.map((pick: any) => ({
                      ...pick,
                      ...pick?.item,
                      open_qty:
                          Number(pick?.order_qty || 0) -
                          Number(pick?.invoiced_qty || 0) -
                          Number(pick?.adjusted_qty || 0),
                      item_comment: pick?.item?.comment,
                      item_remark: pick?.item?.remark,

                      pick_ticket_item_lots: pick?.pick_ticket_item_lots?.length
                          ? pick?.pick_ticket_item_lots.map((pk: any) => ({
                                ...pk,
                                ...pk.item_lot,
                            }))
                          : [],
                  }))
                : [],
            invoices_list: data?.invoices_for_pick_ticket,
        };
    },
    invoice_details: (data: any) => {
        return {
            ...data,
            term: data?.customer_term,
            address_zip_code: data?.address_zip_code,
            sales_tax: data?.address_zip_code?.sales_tax,
            invoice_items: !!data?.invoice_items?.length
                ? data?.invoice_items.map((order: any) => ({
                      ...order.item,
                      ...order,
                      extension: Number(
                          (order?.price * order?.invoice_qty).toFixed(3),
                      ),
                      open_qty:
                          Number(order?.order_qty || 0) -
                          Number(order?.invoiced_qty || 0) -
                          Number(order?.adjusted_qty || 0),
                      item_comment: order?.comment,
                      item_remark: order?.remark,
                      order_qty_uom: order?.invoice_qty_uom,

                      invoice_item_lots: !!order?.invoice_item_lots?.length
                          ? order.invoice_item_lots.map((invc: any) => ({
                                ...invc,
                                ...invc.item_lot,
                            }))
                          : [],
                  }))
                : [],
            cash_applications_list: !!data?.cash_apps?.length
                ? data?.cash_apps
                : [],
            order_salespersons: !!data?.order?.order_salespersons?.length
                ? data?.order?.order_salespersons.map((slp: any) => ({
                      ...slp,
                      code: slp?.salesperson?.code,
                      commission_rate: slp?.commission_rate,
                      name: slp?.salesperson?.name || '',
                  }))
                : [],
        };
    },
    cash_application_details: (data: any) => {
        const TotalAppliedCredit =
            !!data?.invoices_list?.length &&
            data?.invoices_list.reduce((sum: any, item: any) => {
                const appliedCredit = Number(item?.applied_credit) || 0;
                return sum + appliedCredit;
            }, 0);
        return {
            ...data,
            total_applied_credit:
                TotalAppliedCredit && TotalAppliedCredit?.toFixed(3),
            invoices_list:
                !!data?.invoices_list?.length &&
                data?.invoices_list.map((item: any) => {
                    return {
                        ...item,
                        ...item.invoice,
                        applied_credits_list: !!item?.invoice?.applied_credits
                            ?.length
                            ? item?.invoice?.applied_credits
                            : [],
                    };
                }),
        };
    },
    vendor_details: (data: any) => {
        return {
            ...data,
            sr: data?.sr?.name,
        };
    },
    production_details: (data: any) => {
        const res = data?.product_template;
        return {
            ...data,
            ...res,
            machine_volume: data?.machine?.machine_volume,
            template: res,
            qa: data?.qa?.map(({ quality_assurance, ...item }: any) => {
                return {
                    ...item,
                    ...quality_assurance,
                };
            }),
            product_template_critical_path:
                data?.final_product_template?.product_template_critical_path &&
                data.final_product_template?.product_template_critical_path.map(
                    (item: any) => {
                        return {
                            ...item.phase,
                            ...item,
                            product_template_raw_material:
                                item?.product_template_raw_material &&
                                item?.product_template_raw_material?.map(
                                    (i: any) => {
                                        return {
                                            ...i,
                                            ...(i.inventory
                                                ? {
                                                      ...i?.inventory,
                                                      rowId: i?.inventory?.id,
                                                  }
                                                : []),
                                        };
                                    },
                                ),
                        };
                    },
                ),
        };
    },
    customer_details: (data: any) => ({
        ...data,
        customer_salespersons: !!data?.customer_salespersons?.length
            ? data?.customer_salespersons.map((item: any) => ({
                  ...item,
                  code: item?.salesperson?.code,
                  commission_rate: item.commission_rate,
                  name: item?.salesperson?.name || '',
              }))
            : [],
    }),
    purchase_order_receipt_details: (data: any) => ({
        ...data,
        purchase_receipt_lines: !!data?.purchase_receipt_lines?.length
            ? data?.purchase_receipt_lines
            : [],
    }),

    purchase_order_details: (data: any) => ({
        ...data,
        pro_lines: !!data?.pro_lines?.length ? data?.pro_lines : [],
    }),
    adjustment_details: (data: any) => ({
        ...data,
        adjustment_add_from: !!data?.from_rows?.length
            ? data?.from_rows.map(({ id, ...rest }: any) => {
                  return {
                      ...rest,
                      row_id: id,
                  };
              })
            : [],
        adjustment_add_to: !!data?.to_rows?.length
            ? data?.to_rows.map(({ id, ...rest }: any) => {
                  return {
                      ...rest,
                      row_id: id,
                  };
              })
            : [],
    }),
    order_details: (data: any) => ({
        ...data,
        term: data?.customer_term,
        address_zip_code: data?.address_zip_code,
        sales_tax: data?.address_zip_code?.sales_tax,
        order_items: !!data?.order_items.length
            ? data?.order_items.map((order: any) => ({
                  ...order.item,
                  ...order,
                  open_qty:
                      Number(order?.order_qty || 0) -
                      Number(order?.invoiced_qty || 0) -
                      Number(order?.adjusted_qty || 0),
                  item_comment: order.comment,
                  item_remark: order.remark,
              }))
            : [],
        order_salespersons: !!data?.order_salespersons.length
            ? data?.order_salespersons.map((slp: any) => ({
                  ...slp,
                  code: slp?.salesperson?.code,
                  commission_rate: slp?.commission_rate,
                  name: slp?.salesperson?.name || '',
              }))
            : [],
        pick_tickets_list: data?.pick_tickets || [],
        invoices_list: data?.invoices || [],
    }),
};
