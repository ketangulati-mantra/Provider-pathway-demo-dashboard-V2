import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import Step1Welcome from './Step1Welcome';
import Step2Mission from './Step2Mission';
import Step3Benefits from './Step3Benefits';
import Step4HowItWorks from './Step4HowItWorks';
import Step5Commitment from './Step5Commitment';
import Step6Interest from './Step6Interest';
import Step7Confirmation from './Step7Confirmation';

export default function OnboardingWizardContainer({ initialStep = 1, onSaveStep, onOpenAppModal, onOptOut, onBack }) {
  const [currentStep, setCurrentStep] = useState(initialStep || 1);

  useEffect(() => {
    if (initialStep && initialStep !== currentStep) {
      setCurrentStep(initialStep);
    }
  }, [initialStep]);

  const handleGoToStep = (newStep) => {
    const clamped = Math.min(Math.max(newStep, 1), 7);
    setCurrentStep(clamped);
    if (onSaveStep) {
      onSaveStep(clamped);
    }
  };

  const progressPercent = Math.round((currentStep / 7) * 100);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onNext={() => handleGoToStep(2)} />;
      case 2:
        return <Step2Mission onNext={() => handleGoToStep(3)} />;
      case 3:
        return <Step3Benefits onNext={() => handleGoToStep(4)} />;
      case 4:
        return <Step4HowItWorks onNext={() => handleGoToStep(5)} />;
      case 5:
        return <Step5Commitment onNext={() => handleGoToStep(6)} />;
      case 6:
        return <Step6Interest onAccept={onOpenAppModal} onMaybeLater={onOptOut} />;
      case 7:
        return <Step7Confirmation onConfirm={onOpenAppModal} />;
      default:
        return <Step1Welcome onNext={() => handleGoToStep(2)} />;
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '16px 20px 60px' }} className="animate-fade-in">
      
      {/* Top Header & Wizard Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        
        {/* Navigation Control Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {currentStep > 1 && (
            <button
              onClick={() => handleGoToStep(currentStep - 1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> Previous
            </button>
          )}

          {onBack && (
            <button
              onClick={onBack}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f8fafc',
                border: '1px solid #cbd5e1',
                padding: '8px 14px',
                borderRadius: '10px',
                fontSize: '0.82rem',
                fontWeight: 700,
                color: '#64748b',
                cursor: 'pointer'
              }}
            >
              <Clock size={16} /> Resume Later
            </button>
          )}
        </div>

        {/* Step Indicator Badge */}
        <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563eb', background: '#eff6ff', padding: '6px 16px', borderRadius: '20px', border: '1px solid #bfdbfe' }}>
          Step {currentStep} of 7
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div style={{ background: '#ffffff', padding: '16px 20px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', marginBottom: '8px' }}>
          <span>ONBOARDING PROGRESS</span>
          <span>{progressPercent}% COMPLETE</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #2563eb, #7c3aed)', borderRadius: '10px', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Step Content Container */}
      {renderStepContent()}

    </div>
  );
}
