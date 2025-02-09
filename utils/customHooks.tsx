import { useState, useEffect } from 'react';
import { renderSimpleIcon, fetchSimpleIcons, SimpleIcon } from 'react-icon-cloud';
import { SimpleIconProps } from '../interfaces';

export const useIcons = (slugs: string[] ) => {
  const [icons, setIcons] = useState<SimpleIconProps>();
  useEffect(() => { 
    const fetchData = async () => {
      const data = await fetchSimpleIcons({ slugs: slugs });
      setIcons(data);
    };
    fetchData().catch(console.error);
  }, [slugs])

  if (icons) {
    return Object.values(icons.simpleIcons).map((icon: SimpleIcon) => renderSimpleIcon({
      icon,
      size: 42,
      aProps: {
        onClick: (e: any) => e.preventDefault()
      }
    }))
  }

  return <a>Loading</a>
};