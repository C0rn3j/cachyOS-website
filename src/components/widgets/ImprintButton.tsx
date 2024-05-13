import { useState } from 'preact/compat';
import ImprintModal from './ImprintModal';

export default function ImprintButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <ImprintModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <button
        className="btn-ghost hover:text-gray-700 dark:text-gray-400 hover:underline transition duration-150 ease-in-out"
        onClick={() => setIsOpen(true)}
      >
        Imprint
      </button>
    </>
  );
}
