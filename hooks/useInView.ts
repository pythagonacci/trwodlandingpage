import { useEffect, useState, RefObject } from "react";

export interface UseInViewOptions extends IntersectionObserverInit {}

export function useInView<T extends Element>(
  ref: RefObject<T>,
  options?: UseInViewOptions
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target || isInView) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          }
        });
      },
      {
        threshold: 0.1,
        ...options
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, isInView]);

  return isInView;
}

