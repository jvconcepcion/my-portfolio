import React from 'react';
import { GiVirtualMarker } from 'react-icons/gi';
type Props = {}

const Ping = (props: Props) => {
  return (
    <div className='relative flex h-8 w-8'>
      <GiVirtualMarker size={32} className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-80"/>
      <GiVirtualMarker size={16} color='#131424' className='relative inline-flex rounded-full h-8 w-8 transform' />
    </div>
  )
}

export default Ping