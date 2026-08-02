import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BilingualText } from '../BilingualText';

interface NextModuleLinkProps {
  targetModuleId: string;
  text: { en: string; bn: string };
}

export const NextModuleLink: React.FC<NextModuleLinkProps> = ({ targetModuleId, text }) => {
  return (
    <div className="mt-12 mb-8 flex justify-end">
      <Link 
        to={`/learn/${targetModuleId}`}
        className="btn btn-primary group relative overflow-hidden px-6 py-4"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        <span className="relative z-10 text-lg">
          <BilingualText en={text.en} bn={text.bn} />
        </span>
        <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};
