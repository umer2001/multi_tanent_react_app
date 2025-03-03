import { createContext, useContext, useEffect, useState } from "react";
import { CookieJar } from "cookiejar";
import type { Tenant } from "../types/tenant";

interface TenantContextType {
  tenant: Tenant | null;
  loading: boolean;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  loading: true,
});

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectTenant = async () => {
      try {
        const cookies = new CookieJar();
        const storeName = cookies.getCookie("store_name", {
          domain: window.location.hostname,
          path: "/",
          secure: true,
          script: false,
        });
        const hostname = window.location.hostname;

        // Mock tenant data - replace with actual API call
        setTenant({
          domain: hostname,
          name: storeName?.value ?? hostname.split(".")[0],
          theme: {
            primary: "#646cff",
            secondary: "#535bf2",
          },
        });
      } catch (error) {
        console.error("Failed to detect tenant:", error);
      } finally {
        setLoading(false);
      }
    };

    detectTenant();
  }, []);

  return (
    <TenantContext.Provider value={{ tenant, loading }}>
      {children}
    </TenantContext.Provider>
  );
}

export const useTenant = () => useContext(TenantContext);
