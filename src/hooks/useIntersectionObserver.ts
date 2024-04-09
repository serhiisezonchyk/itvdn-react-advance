import { MutableRefObject, useEffect, useRef, useState } from 'react';
interface Options {
  threshold?: number;
  root?: Element;
  rootMargin?: string;
  onIntersect?(): void;
}
type ReturnType = [MutableRefObject<null>, IntersectionObserverEntry?];
const useIntersectionObserver = (options: Options = {}): ReturnType => {
  const { threshold = 1.0, root = null, rootMargin = '0px' } = options;
  const targetRef = useRef(null);
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) options.onIntersect?.();
        setEntry(entry);
      },
      { threshold, root, rootMargin },
    );
    const currentRef = targetRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.disconnect();
    };
  }, [root, rootMargin, threshold, options.onIntersect]);
  return [targetRef, entry];
};
export default useIntersectionObserver;
