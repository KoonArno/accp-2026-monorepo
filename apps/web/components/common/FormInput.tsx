import React from 'react';

interface FormInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  icon?: string;
  iconColor?: string;
  maxLength?: number;
}

const FormInput: React.FC<FormInputProps> = React.memo(({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  icon,
  iconColor = '#FFBA00',
  maxLength
}) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label
        style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '8px'
        }}
      >
        {icon && (
          <i
            className={icon}
            style={{ marginRight: '8px', color: iconColor }}
          />
        )}
        {label} {required && '*'}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        required={required}
        maxLength={maxLength}
        style={{
          width: '100%',
          padding: '14px 18px',
          fontSize: '15px',
          border: error ? '2px solid #f44336' : '2px solid #e8e8e8',
          borderRadius: '10px',
          outline: 'none',
          transition: 'all 0.3s ease',
          background: '#fafafa'
        }}
      />
      {error && (
        <p
          style={{
            color: '#f44336',
            fontSize: '12px',
            marginTop: '4px',
            marginBottom: 0
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
});

FormInput.displayName = 'FormInput';

export default FormInput;
