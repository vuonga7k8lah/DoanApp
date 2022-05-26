import { useRef, useState } from 'react';

const TIME = 400;

const useSearch = () => {
  const [value, setValue] = useState('');
  const timeoutIdRef = useRef<Timeout | number>(0);

  const handleSearch = (value: string) => {
    !!timeoutIdRef.current && clearTimeout(timeoutIdRef.current as number);
    timeoutIdRef.current = setTimeout(() => {
      setValue(value);
    }, TIME);
  };

  return {
    value,
    onSearch: handleSearch,
  };
};

export default useSearch;
