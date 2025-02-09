'use client';

import { Particles } from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from "tsparticles-engine";
import { useCallback } from 'react';
import { particlesLink } from '@utils/variants';

const ParticlesContainer = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    await console.log(container);
}, []);

  return <Particles
    className='w-full h-full absolute translate-z-0'
    id='tsparticles'
    init={particlesInit}
    loaded={particlesLoaded}
    options={particlesLink}
  />;
};

export default ParticlesContainer;
