"use client";

import { createContext, useContext, useState, useCallback } from "react";
import TWAlert from "../components/ui/Alert";



export type AlertType = "success" | "warning" | "error" | "info";

interface AlertState {
  message: string;
  type: AlertType;
}

interface AlertContextType {
  showAlert: (message: string, type?: AlertType) => void;
  clearAlert: () => void;
}



const AlertContext = createContext<AlertContextType | null>(null);



export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const clearAlert = useCallback(() => {
    setAlert(null);
  }, []);

  const showAlert = useCallback(
    (message: string, type: AlertType = "info") => {
      setAlert({ message, type });


      setTimeout(() => {
        setAlert(null);
      }, 3000);
    },
    []
  );

  return (
    <AlertContext.Provider value={{ showAlert, clearAlert }}>
      {children}

      {/* GLOBAL ALERT RENDER */}
      {alert && (
        <TWAlert
          type={alert.type}
          message={alert.message}
          onClose={clearAlert}
        />
      )}
    </AlertContext.Provider>
  );
}



export function useAlert() {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("❌ useAlert must be used inside <AlertProvider>");
  }
  return ctx;
}
