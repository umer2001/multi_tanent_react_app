export interface Tenant {
  domain: string;
  name: string;
  theme?: {
    primary: string;
    secondary: string;
  };
}
