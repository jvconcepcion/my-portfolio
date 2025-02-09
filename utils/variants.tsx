import { ISourceOptions } from "tsparticles-engine"

// framer motion variants
export const fadeIn = (direction: string, delay: number) => {
  return {
    hidden: {
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      opacity: 0,
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
      transition: {
        type: 'tween',
        duration: 1.5,
        delay: delay,
        ease: [0.25, 0.6, 0.3, 0.8],
      },
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 1.4,
        delay: delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

// react ts-particles variants

export const particlesLink: ISourceOptions = {
  fullScreen: { enable: false },
  background: {
    color: {
      value: '',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: 'push',
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 90,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      }
    }
  },
  particles: {
    color: {
      value: ['#00008B', '#0000FF'],
    },
    links: {
      color: '#000435',
      distance: 150,
      enable: true,
      opacity: 0,
      width: 1,
    },
    collisions: {
      enable: true,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: {
        default: 'bounce',
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      value: { min: 1, max: 5 },
    },
  },
  detectRetina: true,
};



// Stacklist options

export const experienceOptions = {
  config: {
    useData: true,
    useDataProp: true,
    useModal: true,
  },
  container: {
    customClass: 'w-[28em] xs:w-[22em] bg-white shadow overflow-hidden rounded-md max-w-sm mx-auto mb-5'
  },
  components: [
    {
      element: 'h3',
      className: 'list-header',
      dataProperty: 'occupations',
      text: `Position`,
    },
    {
      element: 'p',
      className: 'default-label',
      dataProperty: 'company',
      text: 'Company',
    },
    {
      element: 'p',
      className: 'default-label',
      dataProperty: 'location',
      text: 'Location',
    },
    {
      element: 'p',
      className: 'default-label highlight',
      dataProperty: 'stage',
      text: 'Stage',
    },
  ],
  modalComponent: {
    windowTitle: 'Job Description',
    dataProperty: 'occupations',
    childComponent: 'list'
  }
};

export const educationOptions = {
  config: {
    useData: true,
    useDataProp: true,
    useModal: true,
  },
  container: {
    customClass: 'w-[28em] xs:w-[22em] bg-white shadow overflow-hidden rounded-md max-w-sm mx-auto mb-5'
  },
  components: [
    {
      element: 'h3',
      className: 'list-header',
      dataProperty: 'course',
      text: `Position`,
    },
    {
      element: 'p',
      className: 'default-label',
      dataProperty: 'school',
      text: 'School',
    },
    {
      element: 'p',
      className: 'default-label',
      dataProperty: 'location',
      text: 'location',
    },
  ],
  modalComponent: {
    windowTitle: 'School Map',
    dataProperty: 'geoLocation',
    childComponent: 'map'
  }
};
