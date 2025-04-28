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
  "/dev": {};
  "/dev/components": {};
  "/dev/new": {};
  "/pubkey": {};
  "/pubkey/communities": {};
  "/pubkey/communities/create": {};
  "/pubkey/communities/:community": {
    "community": string;
  };
  "/pubkey/profiles": {};
  "/pubkey/profiles/create": {};
  "/pubkey/profiles/:profile": {
    "profile": string;
  };
  "/onboarding": {};
  "/onboarding/wallets": {};
  "/onboarding/profile": {};
  "/onboarding/done": {};
  "/dashboard": {};
  "/profile": {};
  "/login": {};
  "/logout": {};
  "/about": {};
};