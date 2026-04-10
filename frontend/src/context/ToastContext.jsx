import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import ToastContainer from '../components/ToastContainer';

const ToastContext = createContext(undefined);
const TOAST_DURATION_MS = 3000;

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToast = useCallback((toastId) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== toastId));
  }, []);

  const showToast = useCallback(
    (message, type = 'info') => {
      const toastId = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

      setToasts((currentToasts) => [...currentToasts, { id: toastId, message, type }]);

      window.setTimeout(() => {
        dismissToast(toastId);
      }, TOAST_DURATION_MS);
    },
    [dismissToast],
  );

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider.');
  }

  return context;
}

export { ToastProvider, useToast };
