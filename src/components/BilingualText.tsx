import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { db, saveContentToDB } from '../lib/firebase';
import { ref, onValue } from 'firebase/database';
import { Edit2, Check, X } from 'lucide-react';

interface BilingualTextProps {
  en: string | React.ReactNode;
  bn: string | React.ReactNode;
  className?: string;
  isInline?: boolean; // Sometimes it's inside a p or span
}

// Simple base64 encode to use English text as a valid Firebase key
// We replace problematic characters in base64 (+, /, =)
const generateKey = (text: string) => {
  try {
    return btoa(text).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (e) {
    return 'invalid_key';
  }
};

export const BilingualText: React.FC<BilingualTextProps> = ({ en, bn, className = '', isInline = false }) => {
  const { language, isAdmin } = useStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [liveEn, setLiveEn] = useState(en);
  const [liveBn, setLiveBn] = useState(bn);
  const [editEn, setEditEn] = useState(en as string);
  const [editBn, setEditBn] = useState(bn as string);
  const [contentKey, setContentKey] = useState<string | null>(null);

  useEffect(() => {
    // Only attempt to sync if it's a string
    if (typeof en === 'string') {
      const key = generateKey(en);
      setContentKey(key);
      
      const contentRef = ref(db, `content/${key}`);
      const unsubscribe = onValue(contentRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          if (data.en) setLiveEn(data.en);
          if (data.bn) setLiveBn(data.bn);
        }
      });
      return () => unsubscribe();
    }
  }, [en]);

  const handleSave = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (contentKey) {
        await saveContentToDB(contentKey, 'en', editEn);
        await saveContentToDB(contentKey, 'bn', editBn);
      }
      setLiveEn(editEn);
      setLiveBn(editBn);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Firebase save error:', err);
      alert(`Failed to save to database. \n\nError: ${err.message}\n\nPlease ensure you created the Realtime Database in your Firebase console and set the rules to 'Test Mode'.`);
      setIsEditing(false);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEditEn(liveEn as string);
    setEditBn(liveBn as string);
    setIsEditing(false);
  };

  const Wrapper = isInline ? 'span' : 'div';

  // Render the core text block based on language
  const renderContent = () => {
    if (language === 'en') return <span className={className}>{liveEn}</span>;
    if (language === 'bn') return <span className={className}>{liveBn}</span>;

    return (
      <div className={`flex flex-col sm:flex-row gap-2 sm:gap-4 ${className}`}>
        <div className="flex-1">
          <span className="text-blue-700 dark:text-blue-300 font-medium block mb-1 text-xs uppercase tracking-wider">English</span>
          {liveEn}
        </div>
        <div className="flex-1 border-t sm:border-t-0 sm:border-l border-gray-200 dark:border-gray-700 pt-2 sm:pt-0 sm:pl-4">
          <span className="text-emerald-700 dark:text-emerald-300 font-medium block mb-1 text-xs uppercase tracking-wider">বাংলা</span>
          {liveBn}
        </div>
      </div>
    );
  };

  if (!isAdmin || typeof en !== 'string') {
    return renderContent();
  }

  // ADMIN MODE: Wrapper for editing
  return (
    <Wrapper className="group relative inline-block">
      {isEditing ? (
        <div className="absolute z-50 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 min-w-[300px] -top-2 -left-2 flex flex-col gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">English</label>
            <textarea 
              value={editEn} 
              onChange={(e) => setEditEn(e.target.value)}
              className="w-full text-sm p-2 rounded bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 mb-1">Bengali</label>
            <textarea 
              value={editBn} 
              onChange={(e) => setEditBn(e.target.value)}
              className="w-full text-sm p-2 rounded bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 text-black dark:text-white"
              rows={3}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button onClick={handleCancel} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
              <X className="w-5 h-5" />
            </button>
            <button onClick={handleSave} className="p-2 text-green-500 hover:bg-green-50 rounded-lg">
              <Check className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="relative border border-transparent group-hover:border-yellow-400/50 group-hover:bg-yellow-400/10 rounded px-1 transition-all">
            {renderContent()}
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(true); }}
              className="absolute -top-3 -right-3 p-1.5 bg-yellow-400 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110 z-40"
              title="Edit Text"
            >
              <Edit2 className="w-3 h-3" />
            </button>
          </div>
        </>
      )}
    </Wrapper>
  );
};
