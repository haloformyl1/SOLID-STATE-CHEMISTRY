import { Hexagon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[var(--border-sub)] bg-[var(--bg-main)] mt-auto py-12">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="glass-panel p-6 rounded-2xl border-2 border-[var(--acc-prim)]/20 shadow-[0_0_20px_rgba(37,99,235,0.05)] max-w-sm w-full text-center hover-glow relative overflow-hidden group">
          {/* Decorative background crystal */}
          <div className="absolute -right-4 -top-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Hexagon className="w-24 h-24 text-[var(--acc-prim)]" />
          </div>
          
          <div className="relative z-10 text-center">
            <p className="font-medium text-[var(--text-str)] text-sm m-0">
              Designed & Prepared By- Arghyadeep Roy Contact- 9830507435.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
