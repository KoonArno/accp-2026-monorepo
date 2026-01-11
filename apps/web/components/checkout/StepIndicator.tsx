'use client'
import React from 'react'

interface Step {
  number: number
  title: string
  isComplete: boolean
  isCurrent: boolean
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '30px 0',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          {/* Step Circle */}
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: step.isComplete 
                ? 'linear-gradient(135deg, #00C853 0%, #69F0AE 100%)'
                : step.isCurrent
                ? 'linear-gradient(135deg, #FFBA00 0%, #FFD54F 100%)'
                : '#e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              color: step.isComplete || step.isCurrent ? '#fff' : '#999',
              fontSize: '20px',
              fontWeight: '700',
              transition: 'all 0.3s ease',
              boxShadow: step.isCurrent ? '0 4px 12px rgba(255, 186, 0, 0.3)' : 'none'
            }}>
              {step.isComplete ? (
                <i className="fa-solid fa-check" />
              ) : (
                step.number
              )}
            </div>
            <div style={{
              fontSize: '13px',
              fontWeight: step.isCurrent ? '600' : '500',
              color: step.isCurrent ? '#1a1a2e' : '#666',
              transition: 'all 0.3s ease'
            }}>
              {step.title}
            </div>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div style={{
              flex: 0.5,
              height: '3px',
              background: step.isComplete 
                ? 'linear-gradient(90deg, #00C853 0%, #69F0AE 100%)'
                : '#e0e0e0',
              marginBottom: '40px',
              transition: 'all 0.3s ease'
            }} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
