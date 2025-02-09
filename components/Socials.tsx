import Link from 'next/link';
import {
  RiYoutubeLine,
  RiInstagramLine,
  RiFacebookBoxLine,
  RiTwitterXLine,
  RiGithubLine,
  RiLinkedinLine,
} from 'react-icons/ri';

import { socialData } from '@utils';

const Socials = () => {
  return (
    <div className='flex items-center gap-x-5 text-lg'>
      {socialData.map(({ link, style, icon }, i) => (
        <Link key={i} href={link} className={style} target="_blank">
          {icon}
        </Link>
      ))}
    </div>
  );
};

export default Socials;
