
import React from 'react';
import { BanknoteIcon } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const iconSize = {
    sm: 20,
    md: 24,
    lg: 32,
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  }[size];

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <div className="absolute inset-0 bg-vault-500 rounded-md blur-sm opacity-30 animate-pulse-green"></div>
        <div className="relative bg-gradient-to-r from-vault-600 to-vault-500 text-white p-1.5 rounded-md">
          <BanknoteIcon size={iconSize} className="stroke-[2.5px]" />
        </div>
      </div>
      {showText && (
        <span className={`font-bold ${textSize} bg-clip-text text-transparent bg-gradient-to-r from-vault-700 to-vault-500`}>
          VAULT
        </span>
      )}
    </div>
  );
};

export default Logo;
