import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'preact/compat';

interface Props {
  data: {
    title: string;
    direct_url: string;
    srcforge_url?: string;
  };
}

const DOWNLOADS_API_ENDPOINT = 'https://iso-stats.cachyos.org/api/download';

async function handleDirectButton(edition_name: string) {
  fetch(DOWNLOADS_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `{"name":"${edition_name}"}`,
  }).catch((e) => null);
}

const DropdownMenu = ({ data }: Readonly<Props>) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          className="btn dropdown-toggle py-4 px-6"
          onClick={() => setShow(!show)}
          onBlur={() => setShow(false)}
        >
          Download GUI Installer
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        show={show}
      >
        <div
          id="editions-menu-list"
          className="dropdown-menu min-w-max absolute bg-white dark:bg-gray-800 text-base z-50 float-left py-2 list-none text-left rounded-lg shadow-lg mt-1 m-0 bg-clip-padding border-none"
          role="menu"
          tabIndex={-1}
        >
          <div className="py-1" role="none" onClick={() => setShow(false)}>
            <a
              key={data.direct_url}
              href={data.direct_url}
              className="btn-dropdown-item block"
              tabIndex={-1}
              role="menuitem"
              onClick={async () => await handleDirectButton(data.title)}
            >
              Direct
            </a>
            {data.srcforge_url ? (
              <a
                key={data.srcforge_url}
                href={data.srcforge_url}
                className="btn-dropdown-item block"
                tabIndex={-1}
                role="menuitem"
              >
                Sourceforge
              </a>
            ) : null}
            <a
              key={data.direct_url + '.sha256'}
              href={data.direct_url + '.sha256'}
              className="btn-dropdown-item block"
              tabIndex={-1}
              role="menuitem"
            >
              Checksum
            </a>
            <a
              key={data.direct_url + '.sig'}
              href={data.direct_url + '.sig'}
              className="btn-dropdown-item block"
              tabIndex={-1}
              role="menuitem"
            >
              Signature
            </a>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default DropdownMenu;
