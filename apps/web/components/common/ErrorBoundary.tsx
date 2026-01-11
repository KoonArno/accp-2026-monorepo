import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            padding: '40px',
            textAlign: 'center',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <i
            className="fa-solid fa-exclamation-triangle"
            style={{
              fontSize: '48px',
              color: '#f44336',
              marginBottom: '20px'
            }}
          />
          <h2 style={{ color: '#333', marginBottom: '10px' }}>
            เกิดข้อผิดพลาด
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            ขออภัย เกิดข้อผิดพลาดบางอย่าง กรุณาลองรีเฟรชหน้าเว็บ
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              background: '#00C853',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            รีเฟรชหน้าเว็บ
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
