import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = React.memo(({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style
}) => {
  const getVariantStyles = () => {
    const baseStyles = {
      padding: '16px',
      border: 'none',
      borderRadius: '10px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '700',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      width: fullWidth ? '100%' : 'auto'
    };

    const variants = {
      primary: {
        background: disabled || loading ? '#ccc' : 'linear-gradient(135deg, #1a237e 0%, #3949ab 100%)',
        boxShadow: '0 8px 25px rgba(26, 35, 126, 0.3)'
      },
      secondary: {
        background: disabled || loading ? '#ccc' : 'linear-gradient(135deg, #00695c 0%, #00897b 100%)',
        boxShadow: '0 8px 25px rgba(0, 105, 92, 0.3)'
      },
      success: {
        background: disabled || loading ? '#ccc' : 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
        boxShadow: '0 8px 25px rgba(0, 200, 83, 0.3)'
      },
      warning: {
        background: disabled || loading ? '#ccc' : 'linear-gradient(135deg, #FF6F00 0%, #FFA000 100%)',
        boxShadow: '0 8px 25px rgba(255, 111, 0, 0.3)'
      }
    };

    return { ...baseStyles, ...variants[variant], ...style };
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={getVariantStyles()}
    >
      {loading ? (
        <>
          <i className="fa-solid fa-spinner fa-spin" />
          Loading...
        </>
      ) : (
        <>
          {icon && <i className={icon} />}
          {children}
        </>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
