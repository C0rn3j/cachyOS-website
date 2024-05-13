import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'preact/compat';

const ImprintModal = ({ isOpen, onClose }: Readonly<{ isOpen: boolean; onClose: () => void }>) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      {/* @ts-expect-error broken types due to preact/compat and @headlessui/react targets only react */}
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-1 md:p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white dark:bg-dark p-4 text-left align-middle shadow-xl transition-all">
                <div className="absolute right-0 top-0 pr-3 pt-3">
                  <button
                    aria-label="Close"
                    className="rounded-tremor-small p-2 text-tremor-content-subtle hover:bg-tremor-background-subtle hover:text-tremor-content dark:text-dark-tremor-content-subtle hover:dark:bg-dark-tremor-background-subtle hover:dark:text-tremor-content"
                    onClick={() => onClose()}
                    type="button"
                    autoFocus={false}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <DialogTitle
                  as="h3"
                  /* @ts-expect-error broken types due to preact/compat and @headlessui/react targets only react */
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-slate-200 text-center"
                >
                  Imprint
                </DialogTitle>
                <div className="mt-2 space-y-0.5">
                  <p>Peter Jung</p>
                  <p>Paarstraße 40</p>
                  <p>86453 Dasing</p>
                  <br />
                  <p>Contact:</p>
                  <p>
                    E-Mail:{' '}
                    <a
                      href="mailto:ptr1337@cachyos.org"
                      target="_blank"
                      rel="noopener"
                      className="dark:text-white font-bold decoration-slate-400 underline decoration-dotted"
                    >
                      ptr1337@cachyos.org
                    </a>
                  </p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImprintModal;
