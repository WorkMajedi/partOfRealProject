// This is the auto-generated modified swagger_9_pick_ticket.ts file
// Please do not modify it manually

// Define your Swagger data for 9/pick_ticket here
const create_pick_ticket_from_order = {
  url: "/api/pick_ticket/create_pick_ticket_from_order/{id}/",
  create_pick_ticket_from_order: {
    url: "/api/pick_ticket/create_pick_ticket_from_order/",
    path: "/api/pick_ticket/create_pick_ticket_from_order/{id}/",
    data: {
      post: {
        operationId: "pick_ticket_create_pick_ticket_from_order_create",
        description: "create a pick ticket based on the given order id",
      },
    },
  },
  get_next_pick_ticket_number: {
    url: "/api/pick_ticket/get_next_pick_ticket_number//",
    path: "/api/pick_ticket/get_next_pick_ticket_number/",
    data: {
      get: {
        operationId: "pick_ticket_get_next_pick_ticket_number_retrieve",
        description:
          "method : get\njust call it, and it will return the next available code for Production",
      },
    },
  },
  pick_ticket: {
    url: "/api/pick_ticket/pick_ticket/",
    path: "/api/pick_ticket/pick_ticket/{id}/",
    data: {
      get: {
        operationId: "pick_ticket_pick_ticket_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "pick_ticket_pick_ticket_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "pick_ticket_pick_ticket_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "pick_ticket_pick_ticket_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
};

export default create_pick_ticket_from_order;
