'use client';

import { useIcons } from '@utils/customHooks';
import { IconCloudDataProps } from '@interfaces';
import { Cloud, ICloud  } from 'react-icon-cloud'

const cloudProps: Omit<ICloud, 'children'> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }
  },

  options: {
    clickToFront: 500,
    depth: 1,
    imageScale: 2,
    initial: [0.1, -0.1],
    outlineColour: "#0000",
    reverse: true,
    tooltip: "native",
    tooltipDelay: 0,
    wheelZoom: false
  }
}

const IconCloud = ({ data = [{ "iconID": "react", "url": "https://react.dev/" }] }: IconCloudDataProps) => {
  const icons = useIcons(data);

  return (
    <div className='w-[80%] sm:w-[60%] mt-5'>
      <Cloud {...cloudProps} id='1'>
        {icons}
        <div />
      </Cloud>
    </div>
  )
};

export default IconCloud;