// icons
import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiEnvelope,
} from 'react-icons/hi2';

import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiTwitterXLine,
  RiGithubLine,
  RiLinkedinLine,
} from 'react-icons/ri';

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma,
} from 'react-icons/fa';

import {
  SiNextdotjs,
  SiFramer,
  SiAdobexd,
  SiAdobephotoshop,
} from 'react-icons/si';

import {
  RxCrop,
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
} from "react-icons/rx";

import {
  NavDataProps,
  SocialDataProps,
  DefaultBreakpointsProps,
  ServicesDataProps,
} from '@interfaces';

// bgm data
export const playlist = [
  { title: 'I Don\'t Want To See Tomorrow - Nat King Cole', src: 'i-dont-want-to-see-tomorrow.mp3' },
  { title: 'The Mamas & The Papas - California Dreamin', src: 'california-dreamin.mp3' },
];

// nav data
export const navData: NavDataProps[] = [
  { name: 'home', path: '/', icon: <HiHome /> },
  { name: 'about', path: '/about', icon: <HiUser /> },
  { name: 'services', path: '/services', icon: <HiRectangleGroup /> },
  { name: 'work', path: '/work', icon: <HiViewColumns /> },
  {
    name: 'contact',
    path: '/contact',
    icon: <HiEnvelope />,
  },
];

// social data
export const socialData: SocialDataProps[] = [
  { link: 'https://www.instagram.com/darth.nathan/', style: 'hover:text-accent transition-all duration-300', icon: <RiInstagramLine /> },
  { link: 'https://www.facebook.com/i.am.ye.xiu', style: 'hover:text-accent transition-all duration-300', icon: <RiFacebookBoxLine /> },
  { link: 'https://twitter.com/DBAnathan', style: 'hover:text-accent transition-all duration-300', icon: <RiTwitterXLine /> },
  { link: 'https://github.com/jvconcepcion', style: 'hover:text-accent transition-all duration-300', icon: <RiGithubLine /> },
  { link: 'https://www.linkedin.com/in/jvconcepcion/', style: 'hover:text-accent transition-all duration-300', icon: <RiLinkedinLine /> },
];

// (services, work) slider/swiper data

export const defaultBreakpoints: DefaultBreakpointsProps = {
  320: {
    slidesPerView: 1,
    spaceBetween: 15,
  },
  640: {
    slidesPerView: 3,
    spaceBetween: 15,
  }
};

export const serviceData: ServicesDataProps[] = [
  {
    icon: <RxDesktop />,
    title: 'Development',
    description: 'Transform your ideas into responsive, high-performance web applications using the latest technologies like React JS, Next JS, Node.js, LoopBack 4 and MongoDB.',
  },
  {
    icon: <RxPencil2 />,
    title: 'Design',
    description: 'Craft visually stunning and user-friendly designs with expertise in Photoshop and Figma. I bring your vision to life, creating intuitive interfaces that captivate users and enhance their experience.',
  },
  {
    icon: <RxCrop />,
    title: 'Branding',
    description: 'Elevate your brand with a cohesive and compelling digital presence. From logo design to complete brand identity, I help you establish a strong, memorable brand that resonates with your target audience.',
  },
];