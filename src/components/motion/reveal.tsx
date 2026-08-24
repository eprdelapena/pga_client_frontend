'use client';

import {useEffect, useRef, useState, type CSSProperties, type ReactNode} from 'react';
import {observeReveal} from '@/lib/client/reveal-observer';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li';
};

export function Reveal({children, className = '', delay = 0, as = 'div'}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    return observeReveal(node, () => setVisible(true));
  }, []);

  const Tag = as;
  const style = {'--reveal-delay': `${delay}ms`} as CSSProperties;
  return (
    <Tag ref={ref as never} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  );
}
