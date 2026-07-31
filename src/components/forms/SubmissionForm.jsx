import React, { useState, useRef } from 'react';
import { Upload, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useToast, Button } from '../index';
import { useActivitySubmission } from '../../hooks/useActivitySubmission';

export default function SubmissionForm({ 
  onSuccess, 
  lessonId = "profile-verification",
  activityTitle = "Verify Your Profile",
  submissionType = "profile_verification",
  title = "Submit Your Proof",
  successTitle = "Submission received successfully.",
  successMessage = "Our team will review your proof shortly.",
  buttonText = "Submit",
  successButtonText = "Mark Lesson as Complete"
}) {
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const { submit, isSubmitting, isSuccess, reset } = useActivitySubmission({
    lessonId,
    activityTitle,
    submissionType,
    successTitle,
    successMessage,
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (validTypes.includes(selectedFile.type) && selectedFile.size <= 20 * 1024 * 1024) {
      setFile(selectedFile);
      reset();
    } else {
      showToast("Please upload a valid PNG, JPG, or PDF file under 20MB.", "warning");
    }
  };

  const clearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    reset();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      showToast('Please upload a screenshot or file.', 'warning');
      return;
    }

    await submit({
      file,
      formData: {
        ...(fullName.trim() ? { fullName: fullName.trim() } : {}),
        ...(email.trim() ? { email: email.trim() } : {}),
        ...(phone.trim() ? { phone: phone.trim() } : {}),
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
    <div style={{ width: '100%', marginTop: '16px' }}>
      {!isSuccess ? (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
            {title}
          </div>

          {/* Contact Input Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.88rem',
                  outline: 'none',
                  background: '#ffffff'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    background: '#ffffff'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '4px', display: 'block' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    outline: 'none',
                    background: '#ffffff'
                  }}
                />
              </div>
            </div>
          </div>

          {/* File Drag & Drop Upload */}
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '6px', display: 'block' }}>
              Upload Proof Screenshot / Document
            </label>

            <div 
              onClick={triggerFileSelect}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{ 
                border: file ? '1px solid #10b981' : isDragging ? '1px dashed var(--color-primary)' : '1px dashed #d1d5db',
                borderRadius: '8px',
                background: file ? '#ecfdf5' : isDragging ? '#f0f9ff' : '#fafafa',
                padding: file ? '12px 16px' : '20px 16px',
                display: 'flex',
                alignItems: 'center',
                justify: file ? 'space-between' : 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minHeight: '64px'
              }}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileSelect} 
                accept=".png,.jpg,.jpeg,.pdf" 
                style={{ display: 'none' }} 
              />
              
              {!file ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Upload size={18} color="var(--color-primary)" />
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Click to upload</span> or drag and drop
                  </span>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                    <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#065f46', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <button type="button" onClick={clearFile} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', color: '#6b7280' }}>
                      <X size={16} />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          <Button variant="primary" type="submit" disabled={isSubmitting || !file} style={{ padding: '12px', fontSize: '0.95rem', borderRadius: '8px', marginTop: '4px' }}>
            {isSubmitting ? 'Uploading & Submitting...' : buttonText}
          </Button>
        </form>
      ) : (
        <div style={{ textAlign: 'center', padding: '24px 0', background: '#f8fafc', borderRadius: '12px', border: '1px solid #eef0f3' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#d1fae5', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={20} color="#059669" />
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-main)' }}>{successTitle}</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>{successMessage}</p>
          <Button variant="primary" onClick={handleCompleteClick} style={{ padding: '8px 20px', fontSize: '0.85rem' }}>
            {successButtonText}
          </Button>
        </div>
      )}
    </div>
  );
}
