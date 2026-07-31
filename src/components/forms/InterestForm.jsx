import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { useToast } from '../index';
import { isValidEmail, isValidPhoneNumber } from '../../mantra/validation';
import { Button } from '../index';
import { useActivitySubmission } from '../../hooks/useActivitySubmission';

export default function InterestForm({ 
  initiative,
  lessonId = "interest-form",
  activityTitle,
  submissionType = "interest_application",
  onSuccess,
  title = "Interest Form",
  description = "Fill out the form below to get started.",
  successTitle = "Application Submitted Successfully",
  successMessage = "Our team will review your details and contact you if you're shortlisted.",
  buttonText = "Submit Application",
  successButtonText = "Mark Lesson as Complete"
}) {
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const { submit, isSubmitting, isSuccess } = useActivitySubmission({
    lessonId: lessonId || 'interest-form',
    activityTitle: activityTitle || initiative || 'Interest Application',
    submissionType: submissionType || 'interest_application',
    successTitle,
    successMessage,
  });

  const validateEmail = () => {
    if (!email) return true;
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'warning');
      return false;
    }
    return true;
  };

  const validatePhone = () => {
    if (!phone) return true;
    if (!isValidPhoneNumber(phone)) {
      showToast('Please enter a valid phone number.', 'warning');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!initiative) {
      showToast('Initiative value is missing.', 'error');
      return;
    }
    if (!validateEmail()) return;
    if (!validatePhone()) return;

    await submit({
      formData: {
        initiative,
        fullName,
        email,
        phone,
        submittedAt: new Date().toISOString()
      }
    });
  };

  const handleCompleteClick = () => {
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <div style={{
      background: '#ffffff', borderRadius: '20px', padding: '24px',
      border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      width: '100%', boxSizing: 'border-box'
    }}>
      {!isSuccess ? (
        <>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.35rem', margin: '0 0 8px', color: '#0f172a' }}>{title}</h2>
          <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.9rem', lineHeight: '1.5' }}>{description}</p>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', width: '100%', boxSizing: 'border-box' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>Initiative</label>
              <input 
                type="text" 
                value={initiative} 
                disabled 
                style={{ 
                  padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', 
                  outline: 'none', background: '#f1f5f9', fontSize: '0.9rem', color: '#475569',
                  cursor: 'not-allowed', width: '100%', boxSizing: 'border-box' 
                }} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>Full Name</label>
                <input 
                  type="text" 
                  required 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Full Name" 
                  style={{ padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc', fontSize: '0.9rem', color: '#0f172a', width: '100%', boxSizing: 'border-box' }} 
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))} 
                  onBlur={validateEmail} 
                  placeholder="Email Address" 
                  style={{ padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc', fontSize: '0.9rem', color: '#0f172a', width: '100%', boxSizing: 'border-box' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>Phone Number</label>
              <input 
                type="tel" 
                inputMode="tel" 
                required
                maxLength={20} 
                value={phone} 
                onChange={(e) => setPhone(e.target.value.replace(/[^\d\s\+\-\(\)]/g, ''))} 
                onBlur={validatePhone} 
                placeholder="Phone Number (e.g. +1 555-555-5555)" 
                style={{ padding: '12px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none', background: '#f8fafc', fontSize: '0.9rem', color: '#0f172a', width: '100%', boxSizing: 'border-box' }} 
              />
            </div>

            <Button variant="primary" type="submit" disabled={isSubmitting} style={{ padding: '14px', marginTop: '6px', fontSize: '0.95rem', background: '#0284c7', width: '100%', boxSizing: 'border-box' }}>
              {isSubmitting ? 'Submitting Application...' : buttonText}
            </Button>
          </form>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#dcfce7', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={40} color="#16a34a" />
          </div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px', color: '#0f172a' }}>{successTitle}</h3>
          <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '1.05rem' }}>{successMessage}</p>
          <Button className="academy-btn-full" variant="primary" onClick={handleCompleteClick} style={{ padding: '16px', fontSize: '1rem', background: '#0284c7' }}>
            {successButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}
