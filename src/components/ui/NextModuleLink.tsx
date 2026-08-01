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
        to={`/module/${targetModuleId}`}
        className="group relative inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 overflow-hidden"
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
