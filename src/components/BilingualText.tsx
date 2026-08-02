import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  } catch {
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
    setLiveEn(en);
    setLiveBn(bn);
    setEditEn(en as string);
    setEditBn(bn as string);
  }, [en, bn]);

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

  // Render the core text block based on language
  const renderContent = () => {
    if (language === 'en') return <span lang="en" className={className}>{liveEn}</span>;
    if (language === 'bn') return <span lang="bn" className={`font-bengali ${className}`}>{liveBn}</span>;

    if (isInline) {
      return (
        <span className={className}>
          <span lang="en">{liveEn}</span>
          <span className="mx-1.5 text-[var(--border-strong)]" aria-hidden="true">/</span>
          <span lang="bn" className="font-bengali">{liveBn}</span>
        </span>
      );
    }

    return (
      <span className={`bilingual-layout ${className}`}>
        <span className="bilingual-pane min-w-0" lang="en">
          <span className="language-badge mb-1.5">EN</span>
          <span className="block">{liveEn}</span>
        </span>
        <span className="bilingual-pane font-bengali min-w-0" lang="bn">
          <span className="language-badge mb-1.5">বাংলা</span>
          <span className="block">{liveBn}</span>
        </span>
      </span>
    );
  };

  if (!isAdmin || typeof en !== 'string') {
    return renderContent();
  }

  // ADMIN MODE: keep the inline trigger valid even when text is rendered inside
  // a link or button. The editor itself lives in a portal so form controls are
  // never nested inside the surrounding interactive element.
  return (
    <span className="group relative inline-block">
      <span className="relative inline-block rounded border border-transparent px-1 transition-all group-hover:border-[var(--warning)] group-hover:bg-[color-mix(in_srgb,var(--warning)_8%,transparent)]">
        {renderContent()}
        {!isEditing && (
          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setIsEditing(true);
            }}
            onKeyDown={(event) => {
              if (event.key !== 'Enter' && event.key !== ' ') return;
              event.preventDefault();
              event.stopPropagation();
              setIsEditing(true);
            }}
            className="absolute -right-3 -top-3 z-40 rounded-full bg-[var(--warning)] p-1.5 text-[var(--text-inverse)] opacity-0 shadow-md transition-opacity group-hover:opacity-100 focus:opacity-100"
            title="Edit Text"
            aria-label="Edit text"
          >
            <Edit2 className="h-3 w-3" aria-hidden="true" />
          </span>
        )}
      </span>

      {isEditing && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[120] grid place-items-center bg-slate-950/45 px-4 py-8" role="presentation">
          <section className="surface-panel flex w-full max-w-lg flex-col gap-3 p-5 shadow-[var(--shadow-modal)]" role="dialog" aria-modal="true" aria-label="Edit bilingual text">
          <div>
            <label className="mb-1 block text-xs font-bold text-[var(--text-muted)]">English</label>
            <textarea 
              value={editEn} 
              onChange={(e) => setEditEn(e.target.value)}
              className="w-full p-2 text-sm"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-bold text-[var(--text-muted)]">Bengali</label>
            <textarea 
              value={editBn} 
              onChange={(e) => setEditBn(e.target.value)}
              className="font-bengali w-full p-2 text-sm"
              rows={3}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={handleCancel} className="icon-button text-[var(--error)]" aria-label="Cancel editing">
              <X className="w-5 h-5" />
            </button>
            <button type="button" onClick={handleSave} className="icon-button text-[var(--success)]" aria-label="Save text">
              <Check className="w-5 h-5" />
            </button>
          </div>
          </section>
        </div>,
        document.body,
      )}
    </span>
  );
};
