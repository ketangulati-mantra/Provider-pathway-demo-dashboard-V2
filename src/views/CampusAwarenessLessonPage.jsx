import React, { useState } from 'react';
import { useLessonCompletion } from '../hooks/useLessonCompletion';
import { Header, Button, CompletionScreen } from '../components';
import { goToDashboard } from '../mantra';
import {
  GraduationCap, Award, Heart, Check, Sparkles, ArrowLeft, BookOpen, Clock
} from 'lucide-react';

const LESSON_ID = 'campus-awareness';
const LESSON_TITLE = 'Campus Ambassador Program';
const REWARD_POINTS = 50;

const BENEFITS = [
  '50 certification credits for every campus partnership',
  'Free student listener support & mental health workshops',
  'Leadership experience & campus initiative recognition',
  'Official Certificate of Appreciation from Mantra Foundation'
];

export default function CampusAwarenessLessonPage({ onBack }) {
  const [step, setStep] = useState('landing'); // 'landing' | 'learning'

  const {
    lessonProgress,
    showCelebrate,
    handleCloseCelebration,
    handleActionComplete
  } = useLessonCompletion(LESSON_ID, onBack, {
    hasVideo: false,
    hasQuiz: false,
    hasAction: true
  });

  const handleYesInterested = () => {
    // Transition to the learning module inside this single activity
    setStep('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNotRightNow = () => {
    // Do NOT mark task completed, no points given. Redirect to tasks dashboard.
    if (onBack) {
      onBack();
    } else {
      goToDashboard();
    }
  };

  const handleFinishLearning = () => {
    // User reaches the end of the learning content -> mark task completed & award 50 points
    handleActionComplete();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-app)' }} className="animate-fade-in">
      <Header
        title={LESSON_TITLE}
        onBack={step === 'learning' ? () => setStep('landing') : onBack}
        progress={step === 'learning' ? lessonProgress : 0}
        points={REWARD_POINTS}
      />

      <main style={{
        flex: 1,
        padding: '24px 20px 48px',
        maxWidth: '780px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>

        {step === 'landing' ? (
          <>
            {/* ── Compact Header & Introduction ────────────────────────── */}
            <header style={{ textAlign: 'center' }}>
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: '#e0f2fe',
                color: '#0369a1',
                borderRadius: '20px',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}>
                🎓 CAMPUS INITIATIVE
              </span>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.75rem',
                fontWeight: 800,
                margin: '0 0 8px',
                color: '#0f172a'
              }}>
                {LESSON_TITLE}
              </h1>
              <p style={{
                fontSize: '0.98rem',
                color: '#64748b',
                maxWidth: '580px',
                margin: '0 auto',
                lineHeight: '1.5'
              }}>
                Help bring mental health support to your college by connecting your campus with Mantra Foundation programs.
              </p>
            </header>

            {/* ── 2 Compact Cards Grid ─────────────────────────────────── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}>
              {/* Why This Matters Card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: '#fef3c7', color: '#d97706',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Heart size={18} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                    Why This Matters
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: '1.55' }}>
                  Many colleges lack accessible mental health resources. As an ambassador, you bridge this gap by connecting students with free listener support, workshops, and affordable care.
                </p>
              </div>

              {/* What's In It For You Card */}
              <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '20px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: '#dcfce7', color: '#16a34a',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <Award size={18} />
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                    What's in it for you?
                  </h3>
                </div>
                <ul style={{
                  margin: 0, paddingLeft: 0, listStyle: 'none',
                  display: 'flex', flexDirection: 'column', gap: '6px'
                }}>
                  {BENEFITS.map((b, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: '#334155', lineHeight: '1.4' }}>
                      <Check size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ── Decision CTA Card ───────────────────────────────── */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '24px 28px',
              border: '1.5px solid #cbd5e1',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '14px',
              marginTop: '4px'
            }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: '#f0f9ff', color: '#0284c7',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Sparkles size={22} />
              </div>

              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0f172a',
                margin: 0
              }}>
                Interested in becoming a Campus Ambassador?
              </h2>

              <p style={{
                fontSize: '0.9rem',
                color: '#64748b',
                lineHeight: '1.55',
                maxWidth: '540px',
                margin: 0
              }}>
                If you're passionate about spreading mental health awareness in your college, we'll guide you step-by-step on how the entire initiative works and how you can successfully introduce it in your institution.
              </p>

              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
                marginTop: '6px'
              }}>
                <Button
                  variant="primary"
                  onClick={handleYesInterested}
                  style={{
                    padding: '12px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    borderRadius: '10px'
                  }}
                >
                  Yes, I'm Interested
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleNotRightNow}
                  style={{
                    padding: '12px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    borderRadius: '10px',
                    background: '#f1f5f9',
                    color: '#475569',
                    border: '1px solid #cbd5e1'
                  }}
                >
                  Not right now
                </Button>
              </div>
            </div>
          </>
        ) : (
          /* ── Learning Module View ───────────────────────────────── */
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '40px 32px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#e0f2fe',
              color: '#0284c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <GraduationCap size={32} />
            </div>

            <span style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#0369a1',
              background: '#e0f2fe',
              borderRadius: '20px',
              padding: '4px 12px'
            }}>
              EDUCATIONAL MODULE
            </span>

            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#0f172a',
              margin: 0
            }}>
              Campus Ambassador Learning
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#64748b',
              lineHeight: '1.6',
              maxWidth: '500px',
              margin: 0
            }}>
              Page 1 coming soon...
            </p>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '16px 24px',
              fontSize: '0.9rem',
              color: '#475569',
              marginTop: '8px'
            }}>
              This educational module will guide you step-by-step on how to successfully introduce mental health initiatives in your institution.
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
              <Button
                variant="secondary"
                onClick={() => setStep('landing')}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <ArrowLeft size={16} />
                <span>Back to Overview</span>
              </Button>

              <Button
                variant="primary"
                onClick={handleFinishLearning}
                style={{ padding: '10px 24px' }}
              >
                Mark as Completed
              </Button>
            </div>
          </div>
        )}

      </main>

      {showCelebrate && (
        <CompletionScreen
          points={REWARD_POINTS}
          title="Campus Ambassador Program Completed!"
          subtitle="You have successfully completed the Campus Ambassador module and earned 50 points."
          onClose={handleCloseCelebration}
        />
      )}
    </div>
  );
}
