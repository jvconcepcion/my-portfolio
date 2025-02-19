import { Dispatch, SetStateAction, CSSProperties } from 'react';
import { Transporter, SentMessageInfo } from 'nodemailer';
import { UrlObject } from 'url';
import { SwiperOptions } from 'swiper/types';
import { SimpleIcon } from 'react-icon-cloud';
import { Map } from 'leaflet';

// api error
interface APIError extends Error {
  status: number;
  data?: any;
}

// tooltip
export interface TooltipProps {
  name?: string;
  positionClass?: string;
}



//  music player
export interface Track {
  title: string;
  src: string;
}

export interface MusicPlayerProps {
  playlist: Track[];
}

// String to JSX props
export interface StringToJSXProps {
  domString: string,
  styles?: CSSProperties,
  className?: string,
}

// simple icon types
export interface SimpleIconProps {
  simpleIcons: Record<string, SimpleIcon>,
  allIcon: Record<string, {
    title: string,
    hex: string,
    slug: string,
  }>,
};

// nav types
export interface NavDataProps {
  name: string,
  path: string | UrlObject,
  icon: JSX.Element,
};

// messenger
export interface MessagesProps {
  role: 'user' | 'assistant';
  content: string;
}

// social header types
export interface SocialDataProps {
  link: string | UrlObject,
  style: string,
  icon: JSX.Element,
};

// about types
export interface AboutDataProps {
  title: string,
  info: {
    [key: string]: any
  }[]
};

export interface TabNameProps {
  title: string,
  tabIndex: number,
  currentIndex: number,
  setIndex: Dispatch<SetStateAction<number>>
};

export interface TabInfoProps {
  title: string,
  stage: string,
  knowledge: [],
  index: number
};

export interface ExpandedStateProps {
  arrowRotation: number;
  open: boolean;
};

export interface ListModalProps {
  visible: boolean,
  selectedID: number,
};

export interface MapGeoLocationProps {
  loc?: string,
  lat: number,
  lng: number,
};

export interface MapConfigProps {
  POSITION_CLASSES: {
    bottomleft: string,
    bottomright: string,
    topleft: string,
    topright: string,
  },
  BOUNDS_STYLE: { weight: number }
};

export interface MinimapControlProps {
  position: string,
  zoom?: number,
  children?: string | JSX.Element | JSX.Element[],
};

export interface MiniBoundsProps {
  parentMap: Map,
  zoom: number,
};

export interface CurrentZoomProps {
  mini: number,
  large: number,
};

export interface CustomZoomControlProps {
  lat: number,
  lng: number,
  zoom?: number,
  setMiniZoom: (num: number, arithmetic: string) => void
};

export interface CustomPanningConfigProps {
  title: string,
  className: string,
  onClick: (e: React.MouseEvent) => void,
  component: JSX.Element,
}

// (services, work) slider/swiper types
export interface DefaultBreakpointsProps {
  [key: number]: SwiperOptions,
  [key: string]: SwiperOptions,
};

export interface ServicesDataProps {
  icon: JSX.Element,
  title: string,
  description: string,
};

export interface WorkDataProps {
  slides: {
    images: {
      title: string,
      path: string,
      link: string,
    }[];
  }[];
};

// contacts data props

export interface ContactDataProps {
  [key: string]: string
};

// Icon and Text Cloud Props

export interface IconTextCloudDataProps {
  data: string[],
};

export interface StackListDataProps {
  data: any[],
  options: {
    config: {
      useData: boolean,
      useDataProp: boolean,
      useModal?: boolean,
    },
    container: {
      customClass: string,
    },
    components: {
      element: string,
      className: string,
      dataProperty: string,
      text: string,
    }[],
    modalComponent: {
      windowTitle: string,
      dataProperty: string,
      childComponent: string,
    }
  }
};

// api data props

export interface CustomError extends Error {
  status?: number;
  message: string;
  response?: {
    status: number;
  };
}

export interface CustomTransporter extends Transporter<SentMessageInfo> {}

