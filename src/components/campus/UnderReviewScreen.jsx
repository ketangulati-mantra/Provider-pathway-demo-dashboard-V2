import React from 'react';
import { Clock, CheckCircle2, Circle, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function UnderReviewScreen({ statusData, onBack, onGoToLearning }) {
  const profile = statusData?.profile || {};
  const application = statusData?.application || {};
  const timeline = statusData?.timeline || [
    { id: 't1', title: 'Application Submitted', description: 'Application received by review team.', status: 'completed' },
    { id: 't2', title: 'Under Review', description: 'Institutional credentials being verified.', status: 'current' },
    { id: 't3', title: 'Approval Pending', description: 'Final committee sign-off.', status: 'upcoming' },
    { id: 't4', title: 'Activation', description: 'Ambassador ID and referral code generated.', status: 'upcoming' }
  ];

  const submittedDate = application.submitted_at 
    ? new Date(application.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently Submitted';

  return (
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '16px 20px 48px' }} className="animate-fade-in">
      
      {onBack && (
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: '#ffffff',
            border: '1px solid #cbd5e1',
            padding: '7px 14px',
            borderRadius: '8px',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#475569',
            cursor: 'pointer',
            marginBottom: '16px'
          }}
        >
          <ArrowLeft size={15} /> Return to Dashboard
        </button>
      )}

      {/* Main Confirmation Hero Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '28px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        
        {/* Header Title Banner */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              color: '#043263',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Clock size={24} style={{ display: 'block', margin: 'auto' }} />
            </div>

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#eff6ff', border: '1px solid #dbeafe', padding: '3px 10px', borderRadius: '6px', fontSize: '0.73rem', fontWeight: 800, color: '#1e40af' }}>
                Application Status: Under Review
              </div>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 2px' }}>
                Application Submitted
              </h1>
              <p style={{ fontSize: '0.84rem', color: '#64748b', margin: 0 }}>
                Thank you for applying to the Campus Mental Health Initiative.
              </p>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '8px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>
              Estimated Review Time
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#059669', marginTop: '1px' }}>
              1 – 3 Business Days
            </div>
          </div>
        </div>

        {/* Metadata Specs Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px',
          background: '#f8fafc',
          padding: '14px 16px',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          fontSize: '0.82rem'
        }}>
          <div>
            <span style={{ color: '#64748b', fontWeight: 600, display: 'block', fontSize: '0.75rem' }}>Submitted Date:</span>
            <strong style={{ color: '#0f172a', fontWeight: 700 }}>{submittedDate}</strong>
          </div>

          <div>
            <span style={{ color: '#64748b', fontWeight: 600, display: 'block', fontSize: '0.75rem' }}>Applicant College:</span>
            <strong style={{ color: '#0f172a', fontWeight: 700 }}>{application.college || profile.college_name || 'Registered Campus'}</strong>
          </div>

          <div>
            <span style={{ color: '#64748b', fontWeight: 600, display: 'block', fontSize: '0.75rem' }}>Welcome Bonus:</span>
            <strong style={{ color: '#043263', fontWeight: 700 }}>+50 Credits Credited</strong>
          </div>
        </div>

        {/* CONTINUATION CALL TO ACTION CARD */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          border: '1px solid #bae6fd',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0369a1', margin: '0 0 2px' }}>
              In the meantime, start your learning modules
            </div>
            <div style={{ fontSize: '0.8rem', color: '#0c4a6e', lineHeight: 1.45 }}>
              Complete your orientation modules and earn points while your application is under institutional review.
            </div>
          </div>

          <button
            onClick={onGoToLearning || onBack}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              background: '#043263',
              color: '#ffffff',
              fontSize: '0.83rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(4, 50, 99, 0.25)'
            }}
          >
            Go to Learning Modules <ArrowRight size={15} />
          </button>
        </div>

        {/* Animated Progress Timeline Component */}
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '4px 0 14px' }}>
            Verification Lifecycle Timeline
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative', paddingLeft: '4px' }}>
            {timeline.map((item, idx) => {
              const isCompleted = item.status === 'completed';
              const isCurrent = item.status === 'current';
              const isActionRequired = item.status === 'action_required';
              const isLast = idx === timeline.length - 1;

              return (
                <div key={item.id || idx} style={{ display: 'flex', gap: '14px', position: 'relative', paddingBottom: isLast ? '0' : '20px' }}>
                  
                  {/* Vertical Connecting Line */}
                  {!isLast && (
                    <div style={{
                      position: 'absolute',
                      left: '13px',
                      top: '28px',
                      bottom: '0',
                      width: '2px',
                      background: isCompleted ? '#10b981' : '#e2e8f0'
                    }} />
                  )}

                  {/* Icon Marker */}
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isCompleted ? '#ecfdf5' : isCurrent ? '#eff6ff' : isActionRequired ? '#fef2f2' : '#f8fafc',
                    border: `2px solid ${isCompleted ? '#10b981' : isCurrent ? '#2563eb' : isActionRequired ? '#ef4444' : '#cbd5e1'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    flexShrink: 0
                  }}>
                    {isCompleted ? (
                      <CheckCircle2 size={16} color="#10b981" style={{ display: 'block', margin: 'auto' }} />
                    ) : isCurrent ? (
                      <Clock size={14} color="#2563eb" className="animate-spin" style={{ display: 'block', margin: 'auto' }} />
                    ) : isActionRequired ? (
                      <AlertCircle size={14} color="#ef4444" style={{ display: 'block', margin: 'auto' }} />
                    ) : (
                      <Circle size={12} color="#94a3b8" style={{ display: 'block', margin: 'auto' }} />
                    )}
                  </div>

                  {/* Text Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '0.86rem',
                        fontWeight: isCurrent || isCompleted ? 800 : 600,
                        color: isCompleted ? '#065f46' : isCurrent ? '#1e40af' : isActionRequired ? '#991b1b' : '#64748b'
                      }}>
                        {item.title}
                      </h4>

                      {item.timestamp && (
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                          {new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>

                    <p style={{ margin: '2px 0 0', fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45 }}>
                      {item.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
