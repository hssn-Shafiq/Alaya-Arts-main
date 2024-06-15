import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Alaya Arts - Feel the stuff';
    }
  }, [title]);
};

export default useDocumentTitle;
