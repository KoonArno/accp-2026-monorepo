import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = React.memo(({
  size = 'medium',
  color = '#00C853',
  text
}) => {
  const sizeMap = {
    small: '24px',
    medium: '48px',
    large: '72px'
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        padding: '20px'
      }}
    >
      <i
        className="fa-solid fa-spinner fa-spin"
        style={{
          fontSize: sizeMap[size],
          color: color
        }}
      />
      {text && (
        <p
          style={{
            margin: 0,
            color: '#666',
            fontSize: '14px'
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
});

LoadingSpinner.displayName = 'LoadingSpinner';

export default LoadingSpinner;
