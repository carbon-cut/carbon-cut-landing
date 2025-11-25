import React, { useRef, useEffect } from 'react';

export default function MenuHamburger({ isOpen }: {isOpen: boolean}) {
  const ref = useRef<HTMLObjectElement>(null);

  useEffect(() => {
    const obj = ref.current;
    if (!obj) return;

    const onLoad = () => {
      const svg = obj.contentDocument?.querySelector('svg');
      if (svg) svg.setAttribute('data-state', isOpen ? 'open' : 'closed');
    };

    obj.addEventListener('load', onLoad);
    if (obj.contentDocument) onLoad();

    return () => obj.removeEventListener('load', onLoad);
  }, [isOpen]);

  return <object className='pointer-events-none mt-3' ref={ref} type="image/svg+xml" data="menu/charm_menu-hamburger.svg" />;
}
