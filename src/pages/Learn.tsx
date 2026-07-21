import React from 'react';
import { Link } from 'react-router-dom';
import { modules } from '../content';
import { BilingualText } from '../components/BilingualText';
import { useStore } from '../store/useStore';
import { BookOpen, CheckCircle } from 'lucide-react';

export const Learn: React.FC = () => {
  const completedModules = useStore((state) => state.completedModules);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
          <BilingualText en="Modules" bn="অধ্যায়সমূহ" />
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          <BilingualText 
            en="Select a topic to start learning" 
            bn="শেখা শুরু করতে একটি বিষয় নির্বাচন করুন" 
          />
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module, index) => {
          const isCompleted = completedModules.includes(module.id);
          
          return (
            <Link 
              key={module.id} 
              to={`/learn/${module.id}`}
              className={`block bg-white dark:bg-slate-800 p-6 rounded-xl border-2 transition-all hover:shadow-md ${isCompleted ? 'border-emerald-500' : 'border-gray-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-semibold text-primary dark:text-primary-dark">
                  <BilingualText en={`Module ${index + 1}`} bn={`অধ্যায় ${index + 1}`} />
                </span>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                ) : (
                  <BookOpen className="w-6 h-6 text-slate-400" />
                )}
              </div>
              <h2 className="text-xl font-bold mb-2 text-slate-800 dark:text-slate-200">
                <BilingualText en={module.title.en} bn={module.title.bn} />
              </h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
