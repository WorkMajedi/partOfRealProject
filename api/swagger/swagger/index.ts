// This is the auto-generated modified swagger_12_token.ts file
// Please do not modify it manually

// Define your Swagger data for 12/token here
const swagger = {
  url: "/api/token/",
  undefined: {
    url: "/api/token//",
    path: "/api/token/",
    data: {
      post: {
        operationId: "token_create",
        description:
          "Takes a set of user credentials and returns an access and refresh JSON web\ntoken pair to prove the authentication of those credentials.",
      },
    },
  },
  refresh: {
    url: "/api/token/refresh//",
    path: "/api/token/refresh/",
    data: {
      post: {
        operationId: "token_refresh_create",
        description:
          "Takes a refresh type JSON web token and returns an access type JSON web\ntoken if the refresh token is valid.",
      },
    },
  },
};

export default swagger;
