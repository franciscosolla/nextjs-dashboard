'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEventHandler, useRef } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const { replace } = useRouter();

  const searchParams = useSearchParams();

  const handleSearch = (term: string) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (term?.length) {
      if (term !== searchParams.get('query')) {
        newSearchParams.set('page', '1');
      }

      newSearchParams.set('query', term);
    } else {
      newSearchParams.delete('query');
      newSearchParams.delete('page');
    }

    const search = newSearchParams.toString();

    replace(`${window.location.pathname}${search.length ? `?${search}` : ''}`);
  };

  const timeoutRef = useRef<NodeJS.Timeout>();

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => handleSearch(e.target.value), 300);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query') || ''}
        onChange={onChange}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
