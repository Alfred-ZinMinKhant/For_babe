import React, { useEffect, useRef } from 'react';

const FadeInWrapper = ({ children, duration = 1200 }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = 0;
      ref.current.style.transform = 'translateY(30px)';
      setTimeout(() => {
        ref.current.style.transition = `opacity ${duration}ms, transform ${duration}ms`;
        ref.current.style.opacity = 1;
        ref.current.style.transform = 'translateY(0)';
      }, 100);
    }
  }, [duration]);

  return <div ref={ref}>{children}</div>;
};

export default FadeInWrapper;
