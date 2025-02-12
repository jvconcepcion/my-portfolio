import React from 'react';
import { TooltipProps } from '@interfaces';

const Tooltip: React.FC<TooltipProps> = ({ name = '', positionClass = '' }) => {
  return (
    <div className={`absolute hidden xl:group-hover:flex ${positionClass}`}>
      <div className='bg-white relative inline-flex text-primary items-center p-[6px] rounded-[3px] shadow-md whitespace-nowrap'>

        <div className='text-[12px] leading-none font-semibold capitalize'>
          {name}
        </div>
        {/* pointer/triangle */}
        <div className='border-solid border-l-white border-l-8 border-y-transparent
      border-y-[6px] border-r-0 absolute -right-2' />
      </div>
    </div>
  )
}

export default Tooltip;