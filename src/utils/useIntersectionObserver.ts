import * as React from 'react';

export default function useIntersectionObserver({
  enabled = true,
  onIntersect = () => {},
  threshold = 1.0,
  rootMargin = '0px',
}) {
  const [element, setElement] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (!enabled) {
      //Last page list rendered, so no need tp ;recreate a mew event listener on the group last item
      return;
    }
    const observer = new IntersectionObserver(
      entries => {
        const first = entries[0];
        first.isIntersecting && onIntersect();
      },
      { threshold, rootMargin }
    );

    const currentElement = element;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return function cleanup() {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [element, enabled, rootMargin, threshold, onIntersect]);

  return setElement;
}
