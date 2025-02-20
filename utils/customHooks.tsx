import { useState, useEffect } from 'react';
import { renderSimpleIcon, fetchSimpleIcons, SimpleIcon } from 'react-icon-cloud';
import { SimpleIconProps } from '../interfaces';

interface ParamProps {
  iconID: string;
  url: string;
}

export const useIcons = (param: ParamProps[]) => {
  const slugs = param.map((item) => item.iconID);
  const [icons, setIcons] = useState<SimpleIconProps>();

  useEffect(() => { 
    const fetchData = async () => {
      const data = await fetchSimpleIcons({ slugs });
      setIcons(data);
    };
    fetchData().catch(console.error);
  }, [param])

  if (icons) {
    return Object.values(icons.simpleIcons).map((icon: SimpleIcon) => {
      const matchingItem = param.find((item) => item.iconID === icon.slug);
      return renderSimpleIcon({
        icon,
        size: 42,
        aProps: {
          href: matchingItem?.url || "#",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      });
    });
  }

  return <a>Loading</a>
};