import * as React from 'react';

export interface Options {
  /**
   * Element to observe if visible on screen
   */
  ref: React.RefObject<HTMLElement>;
  /**
   * Callback to execute when element is inside the viewport
   */
  onIntersect: () => void;
  /**
   * Optional enable the observer. Defaults to true
   */
  enabled?: boolean;
  /**
   * what percentage of the target's visibility the observer's callback should be executed
   */
  threshold?: number;
  /**
   * Margin around the root element viewPort
   */
  rootMargin?: string;
}

/**
 * detect when an element is visible on the screen as well as specify how much of the element should be visible before being considered on screen.
 * Note: this custom hook based on the following hook https://usehooks.com/useOnScreen/
 * @param opts Set of options to apply for the given element
 */
export default function useIntersectionObserver(opts: Options) {
  React.useEffect(() => {
    const { ref, enabled = true, onIntersect, threshold = 1.0, rootMargin = '70px' } = opts;
    if (!enabled) {
      //Last page list rendered, so no need tp ;recreate a mew event listener on the group last item
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.length === 0) {
          return;
        }
        const first = entries[0];
        first.isIntersecting && onIntersect();
      },
      { threshold: threshold, rootMargin: rootMargin }
    );

    const currentElement = ref.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return function cleanup() {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [opts]);
}
