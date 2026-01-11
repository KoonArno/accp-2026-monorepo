'use client'
import React from 'react'

interface OrderItem {
  id: string
  name: string
  price: number
  details?: string
}

interface OrderSummaryProps {
  packageItem: OrderItem
  addOns: OrderItem[]
  isThai: boolean
  discount?: number
  onRemoveAddOn?: (id: string) => void
}

export default function OrderSummary({
  packageItem,
  addOns,
  isThai,
  discount = 0,
  onRemoveAddOn
}: OrderSummaryProps) {
  const currency = isThai ? '฿' : '$'
  const currencyLabel = isThai ? 'บาท' : 'USD'

  const subtotal = packageItem.price + addOns.reduce((sum, addon) => sum + addon.price, 0)
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal - discountAmount

  return (
    <div style={{
      position: 'sticky',
      top: '100px',
      padding: '25px',
      border: '2px solid #00C853',
      borderRadius: '16px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 20px rgba(0, 200, 83, 0.1)',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <i className="fa-solid fa-receipt" style={{
          fontSize: '24px',
          color: '#00C853'
        }} />
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#1a1a2e',
          margin: 0
        }}>
          Order Summary
        </h3>
      </div>

      {/* Package */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '12px'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '15px',
              fontWeight: '600',
              color: '#1a1a2e',
              marginBottom: '4px'
            }}>
              {packageItem.name}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#00C853',
              fontWeight: '600'
            }}>
              <i className="fa-solid fa-badge-check" style={{ marginRight: '4px' }} />
              Registration Package
            </div>
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#1a1a2e'
          }}>
            {currency}{packageItem.price.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Add-ons */}
      {addOns.length > 0 && (
        <div style={{
          marginBottom: '20px',
          paddingTop: '16px',
          borderTop: '1px solid #f0f0f0'
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#666',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Add-ons
          </div>
          {addOns.map((addon) => (
            <div
              key={addon.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                padding: '8px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '14px',
                  color: '#333'
                }}>
                  {addon.name}
                </div>
                {addon.details && (
                  <div style={{
                    fontSize: '12px',
                    color: '#666',
                    marginTop: '2px',
                    fontStyle: 'italic'
                  }}>
                    {addon.details}
                  </div>
                )}
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#1a1a2e'
                }}>
                  {currency}{addon.price.toLocaleString()}
                </div>
                {onRemoveAddOn && (
                  <button
                    onClick={() => onRemoveAddOn(addon.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff6b6b',
                      cursor: 'pointer',
                      fontSize: '14px',
                      padding: '4px'
                    }}
                    title="Remove"
                  >
                    <i className="fa-solid fa-times-circle" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Subtotal */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
        paddingTop: '16px',
        borderTop: '1px solid #f0f0f0'
      }}>
        <span style={{ fontSize: '14px', color: '#666' }}>Subtotal</span>
        <span style={{ fontSize: '15px', fontWeight: '600', color: '#333' }}>
          {currency}{subtotal.toLocaleString()}
        </span>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '12px'
        }}>
          <span style={{ fontSize: '14px', color: '#00C853', fontWeight: '600' }}>
            <i className="fa-solid fa-tag" style={{ marginRight: '6px' }} />
            Discount ({discount}%)
          </span>
          <span style={{ fontSize: '15px', fontWeight: '600', color: '#00C853' }}>
            -{currency}{discountAmount.toLocaleString()}
          </span>
        </div>
      )}

      {/* Total */}
      <div style={{
        marginTop: '20px',
        padding: '20px',
        background: 'linear-gradient(135deg, #f0f9f6 0%, #e8f5e9 100%)',
        borderRadius: '12px',
        border: '2px solid #00C853'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              fontSize: '13px',
              color: '#666',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Total Amount
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#00C853',
              lineHeight: 1
            }}>
              {currency}{total.toLocaleString()}
            </div>
            <div style={{
              fontSize: '12px',
              color: '#666',
              marginTop: '4px'
            }}>
              {currencyLabel}
            </div>
          </div>
          <i className="fa-solid fa-circle-check" style={{
            fontSize: '40px',
            color: '#00C853',
            opacity: 0.3
          }} />
        </div>
      </div>

      {/* Security Badge */}
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        textAlign: 'center',
        fontSize: '12px',
        color: '#666'
      }}>
        <i className="fa-solid fa-shield-halved" style={{
          color: '#00C853',
          marginRight: '6px'
        }} />
        Secure payment powered by SSL encryption
      </div>
    </div>
  )
}
