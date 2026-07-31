import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success', duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#0f172a',
          color: '#ffffff',
          padding: '10px 20px 10px 14px',
          borderRadius: '99px',
          border: '1px solid #334155',
          boxShadow: '0 20px 35px -10px rgba(15, 23, 42, 0.4)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 999999,
          backdropFilter: 'blur(12px)',
          animation: 'fade-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {toast.type === 'success' ? (
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
              <Check size={14} strokeWidth={3} />
            </div>
          ) : (
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', flexShrink: 0 }}>
              <AlertTriangle size={14} strokeWidth={3} />
            </div>
          )}

          <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>
            {toast.message}
          </span>
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext) || { showToast: () => {} };
