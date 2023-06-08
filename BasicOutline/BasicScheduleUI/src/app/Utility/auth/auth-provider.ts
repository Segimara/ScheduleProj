import { UserManager } from "oidc-client";

type AuthProviderProps = {
  userManager: UserManager;
}

const AuthProvider = ({ userManager, children }: React.PropsWithChildren<AuthProviderProps>) => { 