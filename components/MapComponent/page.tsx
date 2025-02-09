import { InteractiveLoader } from '@components';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./Map'), {
  loading: () => (
    <div className='h-[23rem] xs:h-[30rem] sm:h-[35rem]'>
      <InteractiveLoader
        background='white'
        imgUrl='/bg-explosion.png'
      />
    </div>
  ),
  ssr: false
})

export default MapComponent;

