import { createContext, useContext, useEffect, useState } from "react";
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
        // In a real app, you might want to fetch this from an API
        const hostname = window.location.hostname;
        // Mock tenant data - replace with actual API call
        setTenant({
          domain: hostname,
          name: hostname.split(".")[0],
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
