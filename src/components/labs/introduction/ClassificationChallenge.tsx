import { useState } from 'react';
import { BilingualText } from '../../BilingualText';

const QUESTIONS = [
  { substance: 'NaCl', type: 'ionic', en: 'Table Salt (NaCl)', bn: 'খাদ্য লবণ (NaCl)' },
  { substance: 'Diamond', type: 'covalent', en: 'Diamond (C)', bn: 'হীরা (C)' },
  { substance: 'Ice', type: 'molecular-h', en: 'Ice (H₂O)', bn: 'বরফ (H₂O)' },
  { substance: 'Copper', type: 'metallic', en: 'Copper Wire (Cu)', bn: 'তামার তার (Cu)' },
  { substance: 'Dry Ice', type: 'molecular-nonpolar', en: 'Dry Ice (Solid CO₂)', bn: 'শুষ্ক বরফ (কঠিন CO₂)' }
];

export const ClassificationChallenge = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{msgEn: string, msgBn: string, isCorrect: boolean} | null>(null);

  const handleSelect = (selectedType: string) => {
    const q = QUESTIONS[currentIdx];
    if (selectedType === q.type) {
      setFeedback({ msgEn: 'Correct!', msgBn: 'সঠিক!', isCorrect: true });
      setScore(s => s + 1);
    } else {
      setFeedback({ msgEn: `Incorrect. It is a ${q.type.replace('-', ' ')} solid.`, msgBn: 'ভুল।', isCorrect: false });
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIdx < QUESTIONS.length - 1) setCurrentIdx(i => i + 1);
      else setCurrentIdx(QUESTIONS.length); // end state
    }, 2000);
  };

  if (currentIdx >= QUESTIONS.length) {
    return (
      <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-800">
        <h3 className="text-2xl font-bold text-[var(--acc-prim)] mb-2">
          <BilingualText en="Practice Completed!" bn="অনুশীলন সম্পন্ন!" />
        </h3>
        <p className="text-lg">Score: {score} / {QUESTIONS.length}</p>
        <button onClick={() => { setCurrentIdx(0); setScore(0); }} className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
          <BilingualText en="Try Again" bn="আবার চেষ্টা করুন" />
        </button>
      </div>
    );
  }

  const currentQ = QUESTIONS[currentIdx];

  return (
    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl shadow border border-slate-200 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6 flex justify-between items-center">
        <span><BilingualText en="Classification Challenge" bn="শ্রেণিবিভাগ চ্যালেঞ্জ" /></span>
        <span className="text-sm font-normal text-slate-500">Question {currentIdx + 1} of {QUESTIONS.length}</span>
      </h3>

      <div className="text-center mb-8">
        <div className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-2">
          <BilingualText en={currentQ.en} bn={currentQ.bn} />
        </div>
        <p className="text-slate-600 dark:text-slate-400">
          <BilingualText en="What type of crystalline solid is this?" bn="এটি কোন ধরনের স্ফটিকাকার কঠিন?" />
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
        {feedback && (
          <div className={`absolute inset-0 z-10 flex items-center justify-center rounded-lg backdrop-blur-sm ${feedback.isCorrect ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
            <div className={`px-6 py-3 rounded-full text-white font-bold text-xl ${feedback.isCorrect ? 'bg-emerald-600' : 'bg-rose-600'}`}>
              <BilingualText en={feedback.msgEn} bn={feedback.msgBn} />
            </div>
          </div>
        )}

        <button disabled={!!feedback} onClick={() => handleSelect('ionic')} className="p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50 dark:border-indigo-900 dark:hover:bg-indigo-900/30 transition-all font-bold text-slate-700 dark:text-slate-300">
          Ionic<br/><span className="text-sm font-normal text-slate-500">আয়নিক</span>
        </button>
        <button disabled={!!feedback} onClick={() => handleSelect('metallic')} className="p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50 dark:border-indigo-900 dark:hover:bg-indigo-900/30 transition-all font-bold text-slate-700 dark:text-slate-300">
          Metallic<br/><span className="text-sm font-normal text-slate-500">ধাতব</span>
        </button>
        <button disabled={!!feedback} onClick={() => handleSelect('covalent')} className="p-4 rounded-xl border-2 border-indigo-200 hover:border-indigo-500 hover:bg-indigo-50 dark:border-indigo-900 dark:hover:bg-indigo-900/30 transition-all font-bold text-slate-700 dark:text-slate-300">
          Covalent / Network<br/><span className="text-sm font-normal text-slate-500">সমযোজী</span>
        </button>
        <button disabled={!!feedback} onClick={() => handleSelect('molecular-nonpolar')} className="p-4 rounded-xl border-2 border-sky-200 hover:border-sky-500 hover:bg-sky-50 dark:border-sky-900 dark:hover:bg-sky-900/30 transition-all font-bold text-slate-700 dark:text-slate-300">
          Molecular (Non-Polar)<br/><span className="text-sm font-normal text-slate-500">অধ্রুবীয় আণবিক</span>
        </button>
        <button disabled={!!feedback} onClick={() => handleSelect('molecular-polar')} className="p-4 rounded-xl border-2 border-sky-200 hover:border-sky-500 hover:bg-sky-50 dark:border-sky-900 dark:hover:bg-sky-900/30 transition-all font-bold text-slate-700 dark:text-slate-300">
          Molecular (Polar)<br/><span className="text-sm font-normal text-slate-500">ধ্রুবীয় আণবিক</span>
        </button>
        <button disabled={!!feedback} onClick={() => handleSelect('molecular-h')} className="p-4 rounded-xl border-2 border-sky-200 hover:border-sky-500 hover:bg-sky-50 dark:border-sky-900 dark:hover:bg-sky-900/30 transition-all font-bold text-slate-700 dark:text-slate-300">
          Molecular (H-Bonded)<br/><span className="text-sm font-normal text-slate-500">H-বন্ধনযুক্ত আণবিক</span>
        </button>
      </div>
    </div>
  );
};
