import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/api/auth/:provider": {
    "provider": string;
  };
  "/api/auth/:provider/callback": {
    "provider": string;
  };
  "/api/set-theme": {};
  "/admin/users": {};
  "/admin/users/create": {};
  "/admin/users/:id/*": {
    "id": string;
    "*": string;
  };
  "/admin": {};
  "/admin/settings/general": {};
  "/admin/settings/security": {};
  "/dashboard": {};
  "/profile": {};
  "/login": {};
  "/logout": {};
  "/about": {};
};