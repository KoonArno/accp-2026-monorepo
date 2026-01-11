'use client'
import React from 'react'

interface PackageCardProps {
  id: string
  title: string
  priceUSD: number
  priceTHB: number
  originalPriceUSD?: number
  originalPriceTHB?: number
  features: string[]
  isSelected: boolean
  isThai: boolean
  onSelect: (id: string) => void
  recommended?: boolean
}

export default function PackageCard({
  id,
  title,
  priceUSD,
  priceTHB,
  originalPriceUSD,
  originalPriceTHB,
  features,
  isSelected,
  isThai,
  onSelect,
  recommended = false
}: PackageCardProps) {
  const price = isThai ? priceTHB : priceUSD
  const originalPrice = isThai ? originalPriceTHB : originalPriceUSD
  const currency = isThai ? '฿' : '$'
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <div
      onClick={() => onSelect(id)}
      style={{
        position: 'relative',
        padding: '30px',
        border: isSelected ? '3px solid #00C853' : '2px solid #e0e0e0',
        borderRadius: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: isSelected ? '#f0f9f6' : '#fff',
        transform: isSelected ? 'scale(1.02)' : 'scale(1)',
        boxShadow: isSelected 
          ? '0 8px 24px rgba(0, 200, 83, 0.2)' 
          : '0 2px 8px rgba(0, 0, 0, 0.08)'
      }}
    >
      {/* Recommended Badge */}
      {recommended && (
        <div style={{
          position: 'absolute',
          top: '-12px',
          right: '20px',
          background: 'linear-gradient(135deg, #FFBA00 0%, #FFD54F 100%)',
          color: '#1a1a2e',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '700',
          textTransform: 'uppercase',
          boxShadow: '0 4px 12px rgba(255, 186, 0, 0.3)'
        }}>
          <i className="fa-solid fa-star" style={{ marginRight: '6px' }} />
          Recommended
        </div>
      )}

      {/* Selected Indicator */}
      {isSelected && (
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '14px'
        }}>
          <i className="fa-solid fa-check" />
        </div>
      )}

      {/* Package Title */}
      <h3 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: '16px',
        textTransform: 'capitalize'
      }}>
        {title}
      </h3>

      {/* Price */}
      <div style={{ marginBottom: '24px' }}>
        {originalPrice && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '8px'
          }}>
            <span style={{
              fontSize: '18px',
              color: '#999',
              textDecoration: 'line-through'
            }}>
              {currency}{originalPrice.toLocaleString()}
            </span>
            <span style={{
              background: '#ff6b6b',
              color: '#fff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700'
            }}>
              Save {discount}%
            </span>
          </div>
        )}
        <div style={{
          fontSize: '40px',
          fontWeight: '700',
          color: '#00C853',
          lineHeight: 1
        }}>
          {currency}{price.toLocaleString()}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#666',
          marginTop: '4px'
        }}>
          {isThai ? 'บาท' : 'USD'}
        </div>
      </div>

      {/* Features */}
      <div style={{
        borderTop: '1px solid #e0e0e0',
        paddingTop: '20px'
      }}>
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              marginBottom: '12px',
              fontSize: '14px',
              color: '#333'
            }}
          >
            <i className="fa-solid fa-circle-check" style={{
              color: '#00C853',
              marginTop: '2px',
              fontSize: '16px'
            }} />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {/* Select Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onSelect(id)
        }}
        style={{
          width: '100%',
          padding: '14px',
          marginTop: '24px',
          background: isSelected 
            ? 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)'
            : 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      >
        {isSelected ? (
          <>
            <i className="fa-solid fa-check-circle" style={{ marginRight: '8px' }} />
            Selected
          </>
        ) : (
          <>
            <i className="fa-solid fa-hand-pointer" style={{ marginRight: '8px' }} />
            Select Package
          </>
        )}
      </button>
    </div>
  )
}
