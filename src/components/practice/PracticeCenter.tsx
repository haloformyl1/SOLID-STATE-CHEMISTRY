import React, { useState, useEffect } from 'react';
import { QUESTION_BANK } from '../../content/questions';
import { BilingualText } from '../BilingualText';
import { Clock, CheckCircle2, XCircle, ChevronRight, Award, RotateCcw } from 'lucide-react';

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
      <div className="max-w-3xl mx-auto my-12 glass-panel rounded-2xl shadow-xl overflow-hidden border border-[var(--border-sub)]">
        <div className="bg-primary p-8 text-center text-white">
          <Award className="w-20 h-20 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl font-bold mb-2">
            <BilingualText en="Practice Center" bn="অনুশীলন কেন্দ্র" />
          </h1>
          <p className="text-blue-100 max-w-lg mx-auto">
            <BilingualText 
              en="Test your knowledge of Solid-State Chemistry. You have 10 minutes to complete 10 questions." 
              bn="কঠিন অবস্থার রসায়নে আপনার জ্ঞান যাচাই করুন। ১০টি প্রশ্ন সম্পন্ন করার জন্য আপনার কাছে ১০ মিনিট সময় আছে।" 
            />
          </p>
        </div>
        <div className="p-8 text-center">
          <button 
            onClick={handleStart}
            className="bg-primary hover:bg-primary-dark text-white font-bold text-lg py-4 px-12 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <BilingualText en="Start Quiz" bn="কুইজ শুরু করুন" />
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / QUESTION_BANK.length) * 100);
    return (
      <div className="max-w-3xl mx-auto my-12 glass-panel rounded-2xl shadow-xl overflow-hidden border border-[var(--border-sub)]">
        <div className="bg-slate-50 dark:bg-slate-900 p-8 text-center border-b border-gray-200 dark:border-slate-700">
          <Award className={`w-24 h-24 mx-auto mb-4 ${percentage >= 80 ? 'text-amber-400' : 'text-slate-400'}`} />
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            <BilingualText en="Quiz Completed!" bn="কুইজ সম্পন্ন হয়েছে!" />
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            <BilingualText en="Here are your final results." bn="এখানে আপনার চূড়ান্ত ফলাফল দেওয়া হলো।" />
          </p>
        </div>
        
        <div className="p-8">
          <div className="flex justify-center items-center gap-12 mb-8">
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                <BilingualText en="Final Score" bn="চূড়ান্ত স্কোর" />
              </div>
              <div className="text-5xl font-black text-primary">
                {score} <span className="text-2xl text-slate-400">/ {QUESTION_BANK.length}</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                <BilingualText en="Accuracy" bn="নির্ভুলতা" />
              </div>
              <div className={`text-5xl font-black ${percentage >= 80 ? 'text-emerald-500' : percentage >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                {percentage}%
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={handleStart}
              className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-bold py-3 px-8 rounded-full transition-colors"
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
    <div className="max-w-4xl mx-auto my-8">
      {/* Quiz Header */}
      <div className="flex items-center justify-between glass-panel p-4 rounded-xl shadow-sm border border-[var(--border-sub)] mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 text-primary font-bold px-4 py-2 rounded-lg">
            {currentIndex + 1} / {QUESTION_BANK.length}
          </div>
          <div className="w-48 h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${((currentIndex) / QUESTION_BANK.length) * 100}%` }} 
            />
          </div>
        </div>
        
        <div className={`flex items-center gap-2 font-bold px-4 py-2 rounded-lg ${timeRemaining < 60 ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 animate-pulse' : 'bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
          <Clock className="w-5 h-5" />
          <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="glass-panel rounded-xl shadow-sm border border-[var(--border-sub)] p-6 md:p-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 leading-relaxed">
          <BilingualText en={q.text.en} bn={q.text.bn} />
        </h2>

        <div className="space-y-4 mb-8">
          {q.options.map((opt) => {
            const isSelected = selectedOption === opt.id;
            const isCorrectOption = opt.id === q.correctOptionId;
            
            let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-4 ";
            
            if (!isAnswerChecked) {
              btnClass += isSelected 
                ? "border-primary bg-primary/5 dark:bg-primary/10 text-primary-dark" 
                : "border-gray-200 dark:border-slate-700 hover:border-primary/50 text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800";
            } else {
              if (isCorrectOption) {
                btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400";
              } else if (isSelected && !isCorrectOption) {
                btnClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
              } else {
                btnClass += "border-gray-200 dark:border-slate-700 opacity-50 text-slate-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-900";
              }
            }

            return (
              <button
                key={opt.id}
                disabled={isAnswerChecked}
                onClick={() => setSelectedOption(opt.id)}
                className={btnClass}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${isSelected && !isAnswerChecked ? 'border-primary text-primary' : 'border-current'}`}>
                  {opt.id.toUpperCase()}
                </div>
                <div className="text-lg pt-1">
                  <BilingualText en={opt.text.en} bn={opt.text.bn} />
                </div>
                
                {isAnswerChecked && isCorrectOption && (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 ml-auto mt-1" />
                )}
                {isAnswerChecked && isSelected && !isCorrectOption && (
                  <XCircle className="w-6 h-6 text-red-500 ml-auto mt-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Controls */}
        <div className="min-h-[100px]">
          {isAnswerChecked ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className={`p-6 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'} mb-6`}>
                <h4 className={`font-bold mb-2 ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                  <BilingualText 
                    en={isCorrect ? "Correct!" : "Incorrect"} 
                    bn={isCorrect ? "সঠিক!" : "ভুল"} 
                  />
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  <BilingualText en={q.explanation.en} bn={q.explanation.bn} />
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors"
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
                className="bg-slate-800 dark:bg-slate-200 hover:bg-slate-700 dark:hover:bg-slate-300 text-white dark:text-slate-900 disabled:opacity-50 disabled:cursor-not-allowed font-bold py-3 px-10 rounded-full transition-colors"
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
