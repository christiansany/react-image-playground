import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface IUseInView {
  /**
   * TODO
   */
  skip?: boolean;
  /**
   * TODO
   */
  once?: boolean;
  /**
   * TODO
   */
  options?: IntersectionObserverInit;
}

export const useInView = ({
  skip = false,
  once = false,
  options = {},
}: IUseInView) => {
  const [isInView, setIsInView] = useState(skip);

  const { ref } = useIntersectionObserver({
    skip: skip,
    once: once,
    onEnter: () => setIsInView(true),
    onLeave: () => setIsInView(false),
    options,
  });

  return useMemo(
    () => ({
      ref,
      isInView,
    }),
    [ref, isInView]
  );
};

interface IUseIntersectionObserver {
  /**
   * TODO
   */
  skip?: boolean;
  /**
   * TODO
   */
  once?: boolean;
  /**
   * TODO
   */
  onEnter?: (entry: IntersectionObserverEntry) => void;
  /**
   * TODO
   */
  onLeave?: (entry: IntersectionObserverEntry) => void;
  /**
   * TODO
   */
  options?: IntersectionObserverInit;
}

const defaultIntersectionObserverOptions = {
  rootMargin: "500px 0px 500px 0px",
};

export const useIntersectionObserver = ({
  skip = false,
  once = false,
  onEnter,
  onLeave,
  options = {},
}: IUseIntersectionObserver) => {
  const onceSatisfied = useRef(false);
  const isIntersecting = useRef(false);
  const intersectionRef = useRef(null);

  const observer = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isIntersecting.current) {
              isIntersecting.current = true;
              if (onEnter) {
                onEnter(entry);
                if (once) {
                  onceSatisfied.current = true;
                  unobserve(true);
                }
              }
            } else if (!entry.isIntersecting && isIntersecting.current) {
              isIntersecting.current = false;
              if (onLeave) {
                onLeave(entry);
                if (once) {
                  onceSatisfied.current = true;
                  unobserve(true);
                }
              }
            }
          });
        },
        {
          ...defaultIntersectionObserverOptions,
          ...options,
        }
      ),
    []
  );

  const observe = useCallback(() => {
    if (intersectionRef.current) observer.observe(intersectionRef.current);
  }, [intersectionRef.current, observer]);

  const unobserve = useCallback(
    (disconnect = false) => {
      if (intersectionRef.current) observer.unobserve(intersectionRef.current);
      if (disconnect) observer.disconnect();
    },
    [intersectionRef.current, observer]
  );

  useEffect(() => {
    if (!skip && intersectionRef.current && !onceSatisfied.current) {
      observe();
    }
    return () => {
      if (!skip && intersectionRef.current) {
        // Unobserve the ref, if not already unobserved
        unobserve(true);
      }
    };
  }, [intersectionRef]);

  return useMemo(
    () => ({
      ref: intersectionRef,
    }),
    [intersectionRef]
  );
};
