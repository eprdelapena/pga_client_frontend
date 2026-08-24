type RevealCallback = () => void;

let observer: IntersectionObserver | null = null;
const callbacks = new Map<Element, RevealCallback>();

function getObserver(): IntersectionObserver {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const callback = callbacks.get(entry.target);
        if (callback) callback();
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    }, {threshold: 0.12, rootMargin: '0px 0px -6%'});
  }
  return observer;
}

export function observeReveal(node: Element, callback: RevealCallback): () => void {
  callbacks.set(node, callback);
  getObserver().observe(node);
  return () => {
    callbacks.delete(node);
    observer?.unobserve(node);
  };
}
