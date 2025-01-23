// This is the auto-generated modified swagger_6_manufacture.ts file
// Please do not modify it manually

// Define your Swagger data for 6/manufacture here
const class_obj = {
  url: "/api/manufacture/class_obj/",
  class_obj: {
    url: "/api/manufacture/class_obj/",
    path: "/api/manufacture/class_obj/{id}/",
    data: {
      get: {
        operationId: "manufacture_class_obj_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_class_obj_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_class_obj_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_class_obj_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  color: {
    url: "/api/manufacture/color/",
    path: "/api/manufacture/color/{id}/",
    data: {
      get: {
        operationId: "manufacture_color_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_color_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_color_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_color_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  department: {
    url: "/api/manufacture/department/",
    path: "/api/manufacture/department/{id}/",
    data: {
      get: {
        operationId: "manufacture_department_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_department_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_department_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_department_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  "department-attach-class": {
    url: "/api/manufacture/department-attach-class//",
    path: "/api/manufacture/department-attach-class/{id}",
    data: {
      get: {
        operationId: "manufacture_department_attach_class_retrieve",
      },
      post: {
        operationId: "manufacture_department_attach_class_create",
      },
      patch: {
        operationId: "manufacture_department_attach_class_partial_update",
      },
    },
  },
  "department-attach-division": {
    url: "/api/manufacture/department-attach-division//",
    path: "/api/manufacture/department-attach-division/{id}",
    data: {
      get: {
        operationId: "manufacture_department_attach_division_retrieve",
      },
      post: {
        operationId: "manufacture_department_attach_division_create",
      },
      patch: {
        operationId: "manufacture_department_attach_division_partial_update",
      },
    },
  },
  division: {
    url: "/api/manufacture/division/",
    path: "/api/manufacture/division/{id}/",
    data: {
      get: {
        operationId: "manufacture_division_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_division_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_division_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_division_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  get_item_from_packaing: {
    url: "/api/manufacture/get_item_from_packaing//",
    path: "/api/manufacture/get_item_from_packaing/",
    data: {
      post: {
        operationId: "manufacture_get_item_from_packaing_create",
      },
    },
  },
  get_next_product_template_version: {
    url: "/api/manufacture/get_next_product_template_version//",
    path: "/api/manufacture/get_next_product_template_version/{code}",
    data: {
      get: {
        operationId: "manufacture_get_next_product_template_version_retrieve",
        description:
          "    method : get\n    input_data :\nduct template (WITHOUT  the version)\n    response data :\n        next_version : next version of product template (sth. like 02)",
      },
    },
  },
  get_next_production_id: {
    url: "/api/manufacture/get_next_production_id/",
    path: "/api/manufacture/get_next_production_id",
    data: {
      get: {
        operationId: "manufacture_get_next_production_id_retrieve",
        description:
          "method : get\njust call it, and it will return the next available code for Production",
      },
    },
  },
  get_product_template_pdf_report: {
    url: "/api/manufacture/get_product_template_pdf_report/",
    path: "/api/manufacture/get_product_template_pdf_report/{id}/",
    data: {
      get: {
        operationId: "manufacture_get_product_template_pdf_report_retrieve",
      },
    },
  },
  get_production_pdf_report: {
    url: "/api/manufacture/get_production_pdf_report/",
    path: "/api/manufacture/get_production_pdf_report/{id}/",
    data: {
      get: {
        operationId: "manufacture_get_production_pdf_report_retrieve",
      },
    },
  },
  get_serial_number_template: {
    url: "/api/manufacture/get_serial_number_template/",
    path: "/api/manufacture/get_serial_number_template/{id}/",
    data: {
      get: {
        operationId: "manufacture_get_serial_number_template_retrieve",
        description: "send id of the serial number and get the label",
      },
    },
  },
  hire_archy: {
    url: "/api/manufacture/hire_archy/",
    path: "/api/manufacture/hire_archy/{id}/",
    data: {
      get: {
        operationId: "manufacture_hire_archy_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_hire_archy_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_hire_archy_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_hire_archy_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  item: {
    url: "/api/manufacture/item/",
    path: "/api/manufacture/item/{id}/",
    data: {
      get: {
        operationId: "manufacture_item_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_item_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_item_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_item_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  item_category: {
    url: "/api/manufacture/item_category/",
    path: "/api/manufacture/item_category/{id}/",
    data: {
      get: {
        operationId: "manufacture_item_category_retrieve",
        description:
          "having front end reqeust to consider the page=0 as page=1 in query params",
      },
      put: {
        operationId: "manufacture_item_category_update",
        description:
          "having front end reqeust to consider the page=0 as page=1 in query params",
      },
      patch: {
        operationId: "manufacture_item_category_partial_update",
        description:
          "having front end reqeust to consider the page=0 as page=1 in query params",
      },
      delete: {
        operationId: "manufacture_item_category_destroy",
        description:
          "having front end reqeust to consider the page=0 as page=1 in query params",
      },
    },
  },
  location: {
    url: "/api/manufacture/location/",
    path: "/api/manufacture/location/{id}/",
    data: {
      get: {
        operationId: "manufacture_location_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_location_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_location_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_location_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  machine: {
    url: "/api/manufacture/machine/",
    path: "/api/manufacture/machine/{id}/",
    data: {
      get: {
        operationId: "manufacture_machine_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_machine_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_machine_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_machine_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  manufacture_customer: {
    url: "/api/manufacture/manufacture_customer/",
    path: "/api/manufacture/manufacture_customer/{id}/",
    data: {
      get: {
        operationId: "manufacture_manufacture_customer_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_manufacture_customer_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_manufacture_customer_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_manufacture_customer_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  manufacture_item_lot: {
    url: "/api/manufacture/manufacture_item_lot/",
    path: "/api/manufacture/manufacture_item_lot/{id}/",
    data: {
      get: {
        operationId: "manufacture_manufacture_item_lot_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_manufacture_item_lot_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_manufacture_item_lot_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_manufacture_item_lot_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  mrp_list: {
    url: "/api/manufacture/mrp_list/",
    path: "/api/manufacture/mrp_list/{id}/",
    data: {
      get: {
        operationId: "manufacture_mrp_list_list",
        description:
          "get a list of all raw materials in a formula with\nthe sum over the quantities in product template raw materials,\njust send the id of the product template (formula) in url",
      },
    },
  },
  packaging_material: {
    url: "/api/manufacture/packaging_material/",
    path: "/api/manufacture/packaging_material/{id}/",
    data: {
      get: {
        operationId: "manufacture_packaging_material_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_packaging_material_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_packaging_material_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_packaging_material_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  phase: {
    url: "/api/manufacture/phase/",
    path: "/api/manufacture/phase/{id}/",
    data: {
      get: {
        operationId: "manufacture_phase_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_phase_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_phase_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_phase_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  product_template: {
    url: "/api/manufacture/product_template/clone/",
    path: "/api/manufacture/product_template/clone/{id}/",
    data: {
      post: {
        operationId: "manufacture_product_template_clone_create",
        description:
          "clone an instance from different models such as ProductTemplate",
      },
    },
  },
  production: {
    url: "/api/manufacture/production/",
    path: "/api/manufacture/production/{id}/",
    data: {
      get: {
        operationId: "manufacture_production_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_production_update",
        description: "update the production",
      },
      patch: {
        operationId: "manufacture_production_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_production_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  "production-list": {
    url: "/api/manufacture/production-list/",
    path: "/api/manufacture/production-list/{id}/",
    data: {
      get: {
        operationId: "manufacture_production_list_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_production_list_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_production_list_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_production_list_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  production_packaging: {
    url: "/api/manufacture/production_packaging/",
    path: "/api/manufacture/production_packaging/{id}/",
    data: {
      get: {
        operationId: "manufacture_production_packaging_retrieve",
        description:
          "Product Template EndPoint\n\nnote : a new format for front end has been implemented.\nfor change the data format send field 'new_format' in the query params while retrieving and creating a instance.",
      },
      put: {
        operationId: "manufacture_production_packaging_update",
        description:
          "Product Template EndPoint\n\nnote : a new format for front end has been implemented.\nfor change the data format send field 'new_format' in the query params while retrieving and creating a instance.",
      },
      patch: {
        operationId: "manufacture_production_packaging_partial_update",
        description:
          "Product Template EndPoint\n\nnote : a new format for front end has been implemented.\nfor change the data format send field 'new_format' in the query params while retrieving and creating a instance.",
      },
      delete: {
        operationId: "manufacture_production_packaging_destroy",
        description:
          "Product Template EndPoint\n\nnote : a new format for front end has been implemented.\nfor change the data format send field 'new_format' in the query params while retrieving and creating a instance.",
      },
    },
  },
  quality_assurance: {
    url: "/api/manufacture/quality_assurance/",
    path: "/api/manufacture/quality_assurance/{id}/",
    data: {
      get: {
        operationId: "manufacture_quality_assurance_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_quality_assurance_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_quality_assurance_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_quality_assurance_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  raw_material: {
    url: "/api/manufacture/raw_material/",
    path: "/api/manufacture/raw_material/{id}/",
    data: {
      get: {
        operationId: "manufacture_raw_material_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_raw_material_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_raw_material_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_raw_material_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
  sample_heavry_pdf: {
    url: "/api/manufacture/sample_heavry_pdf/",
    path: "/api/manufacture/sample_heavry_pdf",
    data: {
      get: {
        operationId: "manufacture_sample_heavry_pdf_retrieve",
      },
    },
  },
  serial_number: {
    url: "/api/manufacture/serial_number/",
    path: "/api/manufacture/serial_number/{id}/",
    data: {
      get: {
        operationId: "manufacture_serial_number_retrieve",
        description: "ViewSet for the SerialNumber class",
      },
      put: {
        operationId: "manufacture_serial_number_update",
        description: "ViewSet for the SerialNumber class",
      },
      patch: {
        operationId: "manufacture_serial_number_partial_update",
        description: "ViewSet for the SerialNumber class",
      },
      delete: {
        operationId: "manufacture_serial_number_destroy",
        description: "ViewSet for the SerialNumber class",
      },
    },
  },
  upload_attachment: {
    url: "/api/manufacture/upload_attachment//",
    path: "/api/manufacture/upload_attachment/",
    data: {
      post: {
        operationId: "manufacture_upload_attachment_create",
      },
    },
  },
  upload_packaging_material_attachment: {
    url: "/api/manufacture/upload_packaging_material_attachment//",
    path: "/api/manufacture/upload_packaging_material_attachment/",
    data: {
      post: {
        operationId: "manufacture_upload_packaging_material_attachment_create",
      },
    },
  },
  upload_raw_material_attachment: {
    url: "/api/manufacture/upload_raw_material_attachment//",
    path: "/api/manufacture/upload_raw_material_attachment/",
    data: {
      post: {
        operationId: "manufacture_upload_raw_material_attachment_create",
      },
    },
  },
  vendor: {
    url: "/api/manufacture/vendor/",
    path: "/api/manufacture/vendor/{id}/",
    data: {
      get: {
        operationId: "manufacture_vendor_retrieve",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      put: {
        operationId: "manufacture_vendor_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      patch: {
        operationId: "manufacture_vendor_partial_update",
        description:
          "Mixin for converting query arguments into query parameters",
      },
      delete: {
        operationId: "manufacture_vendor_destroy",
        description:
          "Mixin for converting query arguments into query parameters",
      },
    },
  },
};

export default class_obj;
