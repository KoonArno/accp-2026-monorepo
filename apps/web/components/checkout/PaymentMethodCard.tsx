'use client'
import React from 'react'

interface PaymentMethodCardProps {
  id: string
  title: string
  description: string
  icon: string
  isSelected: boolean
  onSelect: (id: string) => void
  processingTime?: string
}

export default function PaymentMethodCard({
  id,
  title,
  description,
  icon,
  isSelected,
  onSelect,
  processingTime
}: PaymentMethodCardProps) {
  return (
    <div
      onClick={() => onSelect(id)}
      style={{
        aspectRatio: '1/1',
        padding: '16px',
        border: isSelected ? '3px solid #00C853' : '2px solid #e0e0e0',
        borderRadius: '12px',
        cursor: 'pointer',
        backgroundColor: isSelected ? '#f0f9f6' : '#fff',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        position: 'relative',
        boxShadow: isSelected 
          ? '0 6px 20px rgba(0, 200, 83, 0.15)' 
          : '0 2px 8px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Selected Indicator */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '10px'
        }}>
          <i className="fa-solid fa-check" />
        </div>
      )}

      {/* Icon */}
      <div style={{
        fontSize: '36px',
        marginBottom: '10px',
        filter: isSelected ? 'none' : 'grayscale(50%)',
        transition: 'filter 0.3s ease'
      }}>
        {icon}
      </div>

      {/* Title */}
      <h4 style={{
        margin: '0 0 6px 0',
        fontSize: '14px',
        fontWeight: '700',
        color: isSelected ? '#00C853' : '#1a1a2e'
      }}>
        {title}
      </h4>

      {/* Description */}
      <p style={{
        color: '#666',
        fontSize: '11px',
        margin: '0 0 8px 0',
        lineHeight: 1.4
      }}>
        {description}
      </p>

      {/* Processing Time */}
      {processingTime && (
        <div style={{
          display: 'inline-block',
          padding: '4px 8px',
          backgroundColor: isSelected ? '#e8f5e9' : '#f5f5f5',
          borderRadius: '4px',
          fontSize: '10px',
          color: isSelected ? '#00C853' : '#666',
          fontWeight: '600'
        }}>
          <i className="fa-solid fa-clock" style={{ marginRight: '4px' }} />
          {processingTime}
        </div>
      )}
    </div>
  )
}
