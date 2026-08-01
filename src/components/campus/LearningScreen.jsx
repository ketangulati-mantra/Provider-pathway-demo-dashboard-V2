import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, Circle, ArrowRight, ArrowLeft, ShieldCheck, Award, Sparkles, Send, PauseCircle, ChevronRight, Lock, BookOpen, Layers } from 'lucide-react';
import { goToDashboard } from '../../mantra';
import { useToast } from '../Toast';

export default function LearningScreen({ statusData, onCompleteModule, onSubmitApp, isUpdating, onBack }) {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [mobileTab, setMobileTab] = useState('content'); // 'content' | 'curriculum'

  const { showToast } = useToast();
  const topRef = useRef(null);

  const isSubmitted = statusData?.journeyStage === 'APPLICATION_SUBMITTED' || statusData?.journeyStage === 'UNDER_REVIEW';

  // Auto scroll to top when switching modules
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeModuleIndex]);

  if (!statusData) return null;

  const { availableModules = [], profile = {} } = statusData;
  const completedCount = availableModules.filter(m => m.completed).length;
  const progressPercent = Math.round((completedCount / (availableModules.length || 1)) * 100);
  const allModulesCompleted = completedCount === availableModules.length;

  const currentModule = availableModules[activeModuleIndex] || availableModules[0];

  const handleReturnToDashboard = () => {
    if (onBack) {
      onBack();
    } else {
      goToDashboard();
    }
  };

  const handleNextModule = () => {
    if (activeModuleIndex < availableModules.length - 1) {
      setActiveModuleIndex(prev => prev + 1);
    }
  };

  const handlePrevModule = () => {
    if (activeModuleIndex > 0) {
      setActiveModuleIndex(prev => prev - 1);
    }
  };

  const handleCompleteClick = async () => {
    await onCompleteModule(currentModule.moduleId);

    const isFinalModule = completedCount + 1 >= availableModules.length;
    const msg = isFinalModule
      ? `All 3 Modules Completed! +20 Credits Unlocked 🎉`
      : `Module ${activeModuleIndex + 1} Completed ✓`;

    if (showToast) {
      showToast(msg, 'success', 3200);
    }

    if (activeModuleIndex < availableModules.length - 1) {
      setActiveModuleIndex(prev => prev + 1);
    }
  };

  return (
    <div ref={topRef} style={{ maxWidth: '1600px', margin: '0 auto', padding: '12px 24px 50px', width: '100%', boxSizing: 'border-box' }} className="animate-fade-in">

      {/* CSS Styles for Layout Stability, Udemy Player & Mobile Responsiveness */}
      <style>{`
        html {
          scrollbar-gutter: stable;
          overflow-y: scroll;
        }

        .udemy-header-bar {
          background: #0f172a;
          border-radius: 16px;
          padding: 14px 20px;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
          box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.4);
          width: 100%;
          box-sizing: border-box;
        }

        .udemy-grid-container {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 20px;
          width: 100%;
          box-sizing: border-box;
        }

        .mobile-tab-bar {
          display: none;
        }

        @media (max-width: 900px) {
          .udemy-grid-container {
            grid-template-columns: 1fr;
          }
          .mobile-tab-bar {
            display: flex;
            background: #f1f5f9;
            padding: 4px;
            border-radius: 12px;
            margin-bottom: 16px;
            gap: 4px;
          }
          .mobile-tab-btn {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 8px;
            font-size: 0.85rem;
            font-weight: 800;
            cursor: pointer;
            text-align: center;
          }
          .mobile-hide-curriculum {
            display: none !important;
          }
          .mobile-hide-content {
            display: none !important;
          }
          .udemy-header-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}</style>

      {/* Udemy-Style Compact Top Control Bar */}
      <div className="udemy-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            onClick={handleReturnToDashboard}
            style={{
              padding: '8px 14px',
              borderRadius: '10px',
              border: '1px solid #334155',
              background: '#1e293b',
              color: '#f8fafc',
              fontWeight: 800,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <ArrowLeft size={16} /> Resume Later
          </button>

          <div>
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Campus Initiative Orientation
            </div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 900, color: '#ffffff' }}>
              Campus Ambassador Training Program
            </h2>
          </div>
        </div>

        {/* Balance & Completion Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: '#1e293b', padding: '6px 14px', borderRadius: '10px', border: '1px solid #334155', fontSize: '0.82rem', fontWeight: 800, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '6px' }}>
            🪙 {profile.credits || 0} Credits
          </div>

          <div style={{ background: '#2563eb', padding: '6px 14px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 800, color: '#ffffff' }}>
            {completedCount}/3 Completed ({progressPercent}%)
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="mobile-tab-bar">
        <button
          className="mobile-tab-btn"
          onClick={() => setMobileTab('content')}
          style={{
            background: mobileTab === 'content' ? '#ffffff' : 'transparent',
            color: mobileTab === 'content' ? '#2563eb' : '#64748b',
            boxShadow: mobileTab === 'content' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
          }}
        >
          📺 Module Lesson ({activeModuleIndex + 1}/3)
        </button>
        <button
          className="mobile-tab-btn"
          onClick={() => setMobileTab('curriculum')}
          style={{
            background: mobileTab === 'curriculum' ? '#ffffff' : 'transparent',
            color: mobileTab === 'curriculum' ? '#2563eb' : '#64748b',
            boxShadow: mobileTab === 'curriculum' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
          }}
        >
          📑 Curriculum ({completedCount}/3 Completed)
        </button>
      </div>

      {/* Udemy Horizontal 2-Column Layout */}
      <div className="udemy-grid-container">

        {/* Left Column: Lesson Player & Reading Guide */}
        <div className={mobileTab === 'curriculum' ? 'mobile-hide-content' : ''} style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: 0, width: '100%', boxSizing: 'border-box' }}>

          {/* Simulated Udemy Video Player Container */}
          <div style={{
            background: '#020617',
            borderRadius: '16px',
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            maxHeight: '340px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #1e293b',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.2)',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            <div style={{ textAlign: 'center', padding: '20px', zIndex: 2 }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', marginBottom: '12px', boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)' }}>
                <Play size={28} style={{ marginLeft: '4px' }} />
              </div>
              <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.25rem', fontWeight: 900, overflowWrap: 'break-word' }}>
                {currentModule?.title}
              </h3>
              <p style={{ margin: '6px 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
                Module {activeModuleIndex + 1} of 3 • Ambassador Foundation Series
              </p>
            </div>

            {/* Subtle background glow effect */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, transparent 70%)' }} />
          </div>

          {/* Module Content Guide */}
          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ minHeight: '85px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#2563eb', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Module {activeModuleIndex + 1} Description
              </div>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a', margin: '4px 0 8px', overflowWrap: 'break-word' }}>
                {currentModule?.title}
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, margin: 0 }}>
                {currentModule?.description}
              </p>
            </div>

            {/* Checklist items */}
            <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.86rem', color: '#334155' }}>
              <h4 style={{ margin: '0 0 8px', color: '#0f172a', fontWeight: 800, fontSize: '0.9rem' }}>Ambassador Action Checklist:</h4>
              <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px', lineHeight: 1.5 }}>
                <li>Establish a confidential student listening booth or mental health desk.</li>
                <li>Share verified peer-support resources and distress emergency helplines.</li>
                <li>Guide students requiring specialized care into subsidized therapy channels.</li>
              </ul>
            </div>

            {/* Bottom Action Footer */}
            <div style={{ paddingTop: '16px', marginTop: '12px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', width: '100%', boxSizing: 'border-box' }}>
              <div style={{ fontSize: '0.82rem', color: '#475569', fontWeight: 700 }}>
                Completion Bonus: <strong style={{ color: '#059669' }}>+20 Credits Overall (upon completing all 3 modules)</strong>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginLeft: 'auto' }}>
                {activeModuleIndex > 0 && (
                  <button
                    onClick={handlePrevModule}
                    style={{
                      padding: '10px 16px',
                      borderRadius: '10px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#475569',
                      fontWeight: 800,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    Previous
                  </button>
                )}

                <button
                  onClick={handleCompleteClick}
                  disabled={currentModule.completed || isUpdating}
                  style={{
                    padding: '10px 22px',
                    borderRadius: '10px',
                    border: 'none',
                    background: currentModule.completed ? '#f1f5f9' : 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    color: currentModule.completed ? '#059669' : '#ffffff',
                    fontWeight: 800,
                    fontSize: '0.85rem',
                    cursor: currentModule.completed ? 'default' : 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    boxShadow: currentModule.completed ? 'none' : '0 4px 12px rgba(37, 99, 235, 0.25)'
                  }}
                >
                  {currentModule.completed ? <>Completed ✓</> : <>Mark Complete & Continue <ArrowRight size={15} /></>}
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Udemy Course Content Curriculum Accordion */}
        <div className={mobileTab === 'content' ? 'mobile-hide-curriculum' : ''} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box' }}>

          <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 900, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={18} color="#2563eb" /> Course Content
              </h3>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b' }}>
                {completedCount}/3 Modules
              </span>
            </div>

            {/* Module Accordion List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {availableModules.map((mod, idx) => {
                const isActive = idx === activeModuleIndex;
                return (
                  <div
                    key={mod.moduleId}
                    onClick={() => {
                      setActiveModuleIndex(idx);
                      setMobileTab('content');
                    }}
                    style={{
                      background: isActive ? '#eff6ff' : '#f8fafc',
                      border: isActive ? '1.5px solid #2563eb' : '1px solid #e2e8f0',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {mod.completed ? (
                      <CheckCircle2 size={18} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
                    ) : (
                      <Circle size={18} color={isActive ? "#2563eb" : "#cbd5e1"} style={{ marginTop: '2px', flexShrink: 0 }} />
                    )}

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 800, color: mod.completed ? '#059669' : isActive ? '#2563eb' : '#64748b' }}>
                        Module {idx + 1} {mod.completed && '• Done'}
                      </div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', marginTop: '2px', lineHeight: 1.3 }}>
                        {mod.title}
                      </div>
                    </div>

                    <ChevronRight size={16} color={isActive ? "#2563eb" : "#94a3b8"} style={{ marginTop: '3px' }} />
                  </div>
                );
              })}
            </div>
            {/* Submission card when all completed */}
            {allModulesCompleted && (
              isSubmitted ? (
                <div style={{ marginTop: '16px', padding: '16px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#043263', marginBottom: '4px' }}>
                    All Modules Completed
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#1e40af', marginBottom: '14px', lineHeight: 1.45 }}>
                    <strong>+20 Credits gained</strong>. You can continue with other provider tasks and check your application status by coming back after some time.
                  </div>
                  <button
                    onClick={() => {
                      if (typeof goToDashboard === 'function') {
                        goToDashboard();
                      } else {
                        window.location.href = '/';
                      }
                    }}
                    style={{
                      width: '100%',
                      height: '40px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#043263',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(4, 50, 99, 0.25)'
                    }}
                  >
                    Continue with Other Tasks <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <div style={{ marginTop: '16px', padding: '16px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#043263', marginBottom: '4px' }}>
                    Orientation Modules Completed
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#1e40af', marginBottom: '14px', lineHeight: 1.45 }}>
                    You have unlocked +20 Welcome Bonus Credits. Complete your application form to submit for verification.
                  </div>
                  <button
                    onClick={onSubmitApp}
                    disabled={isUpdating}
                    style={{
                      width: '100%',
                      height: '40px',
                      borderRadius: '8px',
                      border: 'none',
                      background: '#043263',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      boxShadow: '0 4px 12px rgba(4, 50, 99, 0.25)'
                    }}
                  >
                    <Send size={15} /> Submit Application Form
                  </button>
                </div>
              )
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
