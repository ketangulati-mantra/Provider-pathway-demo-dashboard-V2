import React from 'react';
import CertificateDownloadPage from './CertificateDownloadPage';
import { useLessonCompletion } from '../hooks/useLessonCompletion';
import { CompletionScreen } from '../components';

const LESSON_ID = 'diet-certificate';
const REWARD_POINTS = 20;

const dietConfig = {
  certificateTitle: 'Certificate of Completion',
  programName: 'DIET & NUTRITION PROVIDER PROGRAM',
  awardText: 'This certificate is proudly awarded to',
  completionText: 'for successfully completing the',
  courseName: 'Diet Provider Pathway',
  quote: '"Nourishing the body is an act of care. Thank you for guiding clients toward healthier lifestyles, balanced nutrition, and lifelong wellness."',
  authorizedBy: 'MantraCare Diet & Nutrition Program',
  footer: 'Empowering health through nutrition. | mantracare.org',
  certificateIdPrefix: 'MC-DPP',
  congratsBadge: '🎉 DIET PROVIDER PATHWAY COMPLETE',
  congratsHeading: 'You did it!',
  congratsDescription: 'Completing the Diet Provider Pathway takes real courage. Enter your name to receive your certificate.',
};

export default function DietCertificatePage({ onBack }) {
  const { 
    showCelebrate, 
    handleCloseCelebration, 
    handleActionComplete 
  } = useLessonCompletion(LESSON_ID, onBack, {
    hasVideo: false,
    hasQuiz: false,
    hasAction: true
  });

  return (
    <>
      <CertificateDownloadPage 
        onBack={onBack} 
        certificateConfig={dietConfig}
        onDownload={handleActionComplete}
      />
      {showCelebrate && (
        <CompletionScreen
          points={REWARD_POINTS}
          title="Pathway Complete!"
          subtitle="Congratulations on completing the Diet Provider Pathway."
          onClose={handleCloseCelebration}
        />
      )}
    </>
  );
}
