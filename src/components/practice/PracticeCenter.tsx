import React, { useState, useEffect } from 'react';
import { QUESTION_BANK } from '../../content/questions';
import { BilingualText } from '../BilingualText';
import { Clock, CheckCircle2, XCircle, ChevronRight, Award, RotateCcw, PenTool } from 'lucide-react';

export const PracticeCenter: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);

  // Timer logic
  useEffect(() => {
    let timer: number;
    if (started && !finished && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, finished, timeRemaining]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setStarted(true);
    setFinished(false);
    setCurrentIndex(0);
    setScore(0);
    setTimeRemaining(600);
    setSelectedOption(null);
    setIsAnswerChecked(false);
  };

  const handleCheck = () => {
    if (!selectedOption) return;
    setIsAnswerChecked(true);
    const isCorrect = selectedOption === QUESTION_BANK[currentIndex].correctOptionId;
    if (isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUESTION_BANK.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setFinished(true);
    }
  };

  if (!started) {
    return (
      <div className="surface-panel mx-auto my-4 max-w-4xl overflow-hidden">
        <div className="crystal-grid relative overflow-hidden p-8 text-center text-white sm:p-12">

          <div className="relative z-10">
            <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-[var(--radius-lg)] border border-white/20 bg-white/10 backdrop-blur-md">
              <PenTool className="h-10 w-10 text-sky-200" />
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">
              <BilingualText en="Practice Center" bn="অনুশীলন কেন্দ্র" />
            </h1>
            <p className="text-white/90 max-w-lg mx-auto text-lg leading-relaxed">
              <BilingualText
                en="Test your knowledge of Solid-State Chemistry. You have 10 minutes to complete 10 questions."
                bn="কঠিন অবস্থার রসায়নে আপনার জ্ঞান যাচাই করুন। ১০টি প্রশ্ন সম্পন্ন করার জন্য আপনার কাছে ১০ মিনিট সময় আছে।"
              />
            </p>
          </div>
        </div>
        <div className="p-10 text-center bg-[var(--surface-primary)]">
          <button type="button"
            onClick={handleStart}
            className="btn btn-primary px-10 py-4 text-lg"
          >
            <BilingualText en="Start Session" bn="অধিবেশন শুরু করুন" />
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / QUESTION_BANK.length) * 100);
    return (
      <div className="surface-panel mx-auto my-4 max-w-4xl overflow-hidden">
        <div className="bg-[var(--surface-secondary)] p-10 text-center border-b border-[var(--border-default)]">
          <Award className={`w-24 h-24 mx-auto mb-6 ${percentage >= 80 ? 'text-[var(--accent-amber)]' : 'text-[var(--text-muted)]'}`} />
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
            <BilingualText en="Session Completed!" bn="অধিবেশন সম্পন্ন হয়েছে!" />
          </h1>
          <p className="text-[var(--text-secondary)]">
            <BilingualText en="Here are your final results." bn="এখানে আপনার চূড়ান্ত ফলাফল দেওয়া হলো।" />
          </p>
        </div>
        
        <div className="p-10">
          <div className="flex justify-center items-center gap-16 mb-10">
            <div className="text-center">
              <div className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                <BilingualText en="Final Score" bn="চূড়ান্ত স্কোর" />
              </div>
              <div className="text-6xl font-black text-[var(--accent-primary)]">
                {score} <span className="text-3xl text-[var(--text-muted)]">/ {QUESTION_BANK.length}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2">
                <BilingualText en="Accuracy" bn="নির্ভুলতা" />
              </div>
              <div className={`text-6xl font-black ${percentage >= 80 ? 'text-[var(--success)]' : percentage >= 50 ? 'text-[var(--accent-amber)]' : 'text-[var(--error)]'}`}>
                {percentage}%
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button type="button"
              onClick={handleStart}
              className="btn btn-secondary px-8 py-4"
            >
              <RotateCcw className="w-5 h-5" />
              <BilingualText en="Try Again" bn="আবার চেষ্টা করুন" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUESTION_BANK[currentIndex];
  const isCorrect = selectedOption === q.correctOptionId;

  return (
    <div className="mx-auto my-4 max-w-5xl">
      {/* Quiz Header */}
      <div className="flex items-center justify-between bg-[var(--surface-primary)] p-5 rounded-[var(--radius-lg)] shadow-sm border border-[var(--border-default)] mb-6">
        <div className="flex items-center gap-5 flex-1">
          <div className="bg-[var(--selected-state)] text-[var(--accent-primary)] font-bold px-4 py-2 rounded-lg border border-[var(--accent-primary)]/20">
            {currentIndex + 1} / {QUESTION_BANK.length}
          </div>
          <div className="w-full max-w-xs h-3 bg-[var(--surface-secondary)] rounded-full overflow-hidden border border-[var(--border-default)]">
            <div 
              className="h-full bg-[var(--accent-primary)] transition-all duration-300"
              style={{ width: `${((currentIndex) / QUESTION_BANK.length) * 100}%` }} 
            />
          </div>
        </div>
        
        <div className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg border ${timeRemaining < 60 ? 'bg-[var(--error)]/10 text-[var(--error)] border-[var(--error)]/30 animate-pulse' : 'bg-[var(--surface-secondary)] text-[var(--text-secondary)] border-[var(--border-default)]'}`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-lg tracking-wider">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-[var(--surface-primary)] rounded-[var(--radius-lg)] shadow-md border border-[var(--border-default)] p-8 md:p-10">
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8 leading-relaxed">
          <BilingualText en={q.text.en} bn={q.text.bn} />
        </h2>

        <div className="space-y-4 mb-10">
          {q.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrectOption = opt.id === q.correctOptionId;
            
            let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] ";
            
            if (!isAnswerChecked) {
              btnClass += isSelected 
                ? "border-[var(--accent-primary)] bg-[var(--selected-state)] text-[var(--accent-primary)]"
                : "border-[var(--border-default)] hover:border-[var(--border-interactive)] text-[var(--text-primary)] bg-[var(--surface-primary)]";
            } else {
              if (isCorrectOption) {
                btnClass += "border-[var(--success)] bg-[var(--success)]/10 text-[var(--success)]";
              } else if (isSelected && !isCorrectOption) {
                btnClass += "border-[var(--error)] bg-[var(--error)]/10 text-[var(--error)]";
              } else {
                btnClass += "border-[var(--border-default)] opacity-50 text-[var(--text-muted)] bg-[var(--surface-secondary)]";
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswerChecked}
                onClick={() => setSelectedOption(opt.id)}
                className={btnClass}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${isSelected && !isAnswerChecked ? 'border-[var(--accent-primary)] text-[var(--accent-primary)]' : 'border-current'}`}>
                  {opt.id.toUpperCase()}
                </div>
                <div className="text-lg pt-0.5 font-medium">
                  <BilingualText en={opt.text.en} bn={opt.text.bn} />
                </div>
                
                {isAnswerChecked && isCorrectOption && (
                  <CheckCircle2 className="w-6 h-6 text-[var(--success)] ml-auto mt-1 shrink-0" />
                )}
                {isAnswerChecked && isSelected && !isCorrectOption && (
                  <XCircle className="w-6 h-6 text-[var(--error)] ml-auto mt-1 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Controls */}
        <div className="min-h-[100px] border-t border-[var(--border-default)] pt-8">
          {isAnswerChecked ? (
            <div className="animate-fade-in-up">
              <div className={`p-6 rounded-xl border ${isCorrect ? 'bg-[var(--success)]/10 border-[var(--success)]/30' : 'bg-[var(--error)]/10 border-[var(--error)]/30'} mb-8 shadow-sm`}>
                <h4 className={`font-bold text-lg mb-3 flex items-center gap-2 ${isCorrect ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                  {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  <BilingualText 
                    en={isCorrect ? "Correct!" : "Incorrect"} 
                    bn={isCorrect ? "সঠিক!" : "ভুল"} 
                  />
                </h4>
                <p className="text-[var(--text-primary)] leading-relaxed">
                  <BilingualText en={q.explanation.en} bn={q.explanation.bn} />
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-[var(--accent-primary)] hover:bg-opacity-90 text-white font-bold py-3.5 px-8 rounded-[var(--radius-interactive)] transition-all shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-[var(--focus-ring)]"
                >
                  <BilingualText 
                    en={currentIndex === QUESTION_BANK.length - 1 ? "See Results" : "Next Question"} 
                    bn={currentIndex === QUESTION_BANK.length - 1 ? "ফলাফল দেখুন" : "পরবর্তী প্রশ্ন"} 
                  />
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={handleCheck}
                disabled={!selectedOption}
                className="btn btn-primary px-8 py-3.5"
              >
                <BilingualText en="Check Answer" bn="উত্তর যাচাই করুন" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
