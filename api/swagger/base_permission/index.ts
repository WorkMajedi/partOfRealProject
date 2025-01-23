// This is the auto-generated modified swagger_0_auth.ts file
// Please do not modify it manually

// Define your Swagger data for 0/auth here
const base_permission = {
  url: "/api/auth/base_permission/",
  base_permission: {
    url: "/api/auth/base_permission//",
    path: "/api/auth/base_permission/",
    data: {
      get: {
        operationId: "auth_base_permission_retrieve",
      },
    },
  },
  default_perms: {
    url: "/api/auth/default_perms//",
    path: "/api/auth/default_perms/",
    data: {
      get: {
        operationId: "auth_default_perms_retrieve",
      },
    },
  },
  jwt: {
    url: "/api/auth/jwt/verify//",
    path: "/api/auth/jwt/verify/",
    data: {
      post: {
        operationId: "auth_jwt_verify_create",
        description:
          "Takes a token and indicates if it is valid.  This view provides no\ninformation about a token's fitness for a particular use.",
      },
    },
  },
  role: {
    url: "/api/auth/role/clone/",
    path: "/api/auth/role/clone/{id}/",
    data: {
      post: {
        operationId: "auth_role_clone_create",
      },
    },
  },
  users: {
    url: "/api/auth/users/promote_to_superuser_view/",
    path: "/api/auth/users/promote_to_superuser_view/{user_id}/",
    data: {
      get: {
        operationId: "auth_users_promote_to_superuser_view_retrieve",
      },
    },
  },
};

export default base_permission;
