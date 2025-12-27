import { useEffect } from 'react';
import { Info } from 'lucide-react';

interface ToastProps {
  message: string;
  onClose: () => void;
}

export const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white/90 text-black px-6 py-3 rounded-full shadow-2xl z-50 font-bold flex items-center gap-2 border border-white/50 backdrop-blur">
      <Info size={18} className="text-cyan-600" />
      {message}
    </div>
  );
};