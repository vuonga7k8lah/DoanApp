import { useEffect, useState } from 'react';
import { NavigationStackProp } from 'react-navigation-stack';

const useScrollTop = (navigation: NavigationStackProp) => {
  const [isScrollTop, setScrollTop] = useState(false);

  const handleScroll = () => {
    setScrollTop(false);
  };

  useEffect(() => {
    navigation.setParams({
      onScrollToTop: () => {
        setScrollTop(true);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isScrollTop,
    onScroll: handleScroll,
  };
};

export default useScrollTop;
