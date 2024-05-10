import { useStore } from '@nanostores/react';
import { isSupportModalOpen } from '~/atoms/supportModalStore';

interface Props {
  children: React.ReactNode;
}

const SupportOptions = ({ children }: Readonly<Props>) => {
  const $isSupportModalOpen = useStore(isSupportModalOpen);
  return (
    <button
      className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-600 dark:highlight-white/20 dark:hover:bg-sky-700"
      onClick={() => isSupportModalOpen.set(!$isSupportModalOpen)}
    >
      {children}
    </button>
  );
};

export default SupportOptions;