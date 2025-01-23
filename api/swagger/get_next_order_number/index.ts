// This is the auto-generated modified swagger_7_order.ts file
// Please do not modify it manually

// Define your Swagger data for 7/order here
const get_next_order_number = {
  url: "/api/order/get_next_order_number/",
  get_next_order_number: {
    url: "/api/order/get_next_order_number//",
    path: "/api/order/get_next_order_number/",
    data: {
      get: {
        operationId: "order_get_next_order_number_retrieve",
        description:
          "method : get\njust call it, and it will return the next available code for Production",
      },
    },
  },
  orders: {
    url: "/api/order/orders/",
    path: "/api/order/orders/{id}/",
    data: {
      get: {
        operationId: "order_orders_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "order_orders_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "order_orders_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "order_orders_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
};

export default get_next_order_number;
