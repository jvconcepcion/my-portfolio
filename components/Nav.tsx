'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navData } from '@utils';
import { Tooltip } from '@components';
import { NavDataProps } from '@interfaces';

const Nav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className='flex flex-col items-center xl:justify-center gap-y-4 fixed h-max
    bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen'>
      <div className='flex w-full xl:flex-col items-center justify-between xl:justify-center
      gap-y-10 px-4 md:px-40 xl:px-0 h-[80px] xl:h-max py-8 bg-white/10 backdrop-blur-sm
      text-3xl xl:text-xl xl:rounded-full'>
        {navData.map(({ path, name, icon }, i) => (
          <Link
            className={`${path === pathname && 'text-accent'} relative flex items-center
            group hover:text-accent transition-all duration-300`}
            key={i}
            href={path}
          >
            <Tooltip name={name} positionClass='pr-14 right-0 xl:group-hover:flex'/>
            {icon}
          </Link>))}
      </div>
    </nav>
  );
};

export default Nav;
