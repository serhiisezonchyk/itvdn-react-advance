import { MutableRefObject, useEffect, useRef, useState } from 'react';
interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
}
type ReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];
const useIntersectionObserver = (options: Options = {}): ReturnType => {
  const { threshold = 1.0, root = null, rootMargin = '0px' } = options;
  const targetRef = useRef(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  useEffect(() => {
    const callbackFn = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      setEntry(entry);
    };
    const observer = new IntersectionObserver(callbackFn, { threshold, root, rootMargin });
    const currentRef = targetRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [root, rootMargin, threshold]);
  return [targetRef, entry];
};
export default useIntersectionObserver;
