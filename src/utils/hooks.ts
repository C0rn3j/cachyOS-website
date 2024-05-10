import { useState } from 'react';

interface clipRetType {
  isCopied: boolean;
  copyToClipboard: (value: string) => void;
};

export const useCopyToClipboard = ({ timeout = 2000 }: { timeout?: number }) : clipRetType => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = (value: string) : void => {
    if (typeof window === 'undefined' || !navigator.clipboard?.writeText) {
      return;
    }
    if (!value) {
      return;
    }
    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    });
  };

  return { isCopied, copyToClipboard } as clipRetType;
};