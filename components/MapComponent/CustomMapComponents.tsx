'use client';

import React, { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { GiVirtualMarker } from 'react-icons/gi';
import { renderToString } from 'react-dom/server';
import { CustomPanningConfigProps, CustomZoomControlProps } from '@interfaces';
import { MdFilterCenterFocus, MdOutlineZoomIn, MdOutlineZoomOut, MdOutlinePanTool, MdOutlineCancel } from 'react-icons/md';
import { motion } from 'framer-motion';
import { fadeIn } from '@utils/variants';
import { Ping } from '@components';

const CustomMarker: L.DivIconOptions = {
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -8],
  className: 'custom-marker',
  html: renderToString(<Ping />),
};

const CustomZoomControl: React.FC<CustomZoomControlProps> = ({
  lat = 0,
  lng = 0,
  zoom = 0,
  setMiniZoom = (num: number, arithmetic: string) => console.log(num, arithmetic),
}) => {
  const [isPanningEnabled, setIsPanningEnabled] = useState<boolean>(true);
  const map = useMap();

  map.dragging.disable();
  if (!isPanningEnabled) {
    map.dragging.enable();
  }

  const config: CustomPanningConfigProps[] = [
    {
      title: 'Zoom in',
      className: 'leaflet-control-zoom-in',
      onClick: (e) => zoomIn(e),
      component: <MdOutlineZoomIn size={30} color='#131424' />
    },
    {
      title: 'Center',
      className: 'leaflet-control-center',
      onClick: (e) => goToCenter(e),
      component: <MdFilterCenterFocus size={30} color='#131424' />
    },
    {
      title: 'Zoom out',
      className: 'leaflet-control-zoom-out',
      onClick: (e) => zoomOut(e),
      component: <MdOutlineZoomOut size={30} color='#131424' />
    },
    {
      title: 'Disable Panning',
      className: 'leaflet-control-disable-panning',
      onClick: (e) => togglePanning(e),
      component: <MdOutlineCancel size={24} color='#131424' />
    },
  ];

  const togglePanning = (e: React.MouseEvent) => {
    e.preventDefault();
    map.setView([lat, lng], zoom);
    setIsPanningEnabled((prev) => !prev);
  };

  const zoomIn = (e: React.MouseEvent) => {
    e.preventDefault();
    map.setZoom(map.getZoom() + 1);
  };

  const zoomOut = (e: React.MouseEvent) => {
    e.preventDefault();
    // setMiniZoom(1, '-');
    map.setZoom(map.getZoom() - 1);
  };

  const goToCenter = (e: React.MouseEvent) => {
    e.preventDefault();
    map.setView([lat, lng], zoom);
  };

  useEffect(() => {
    console.log("Test")
  
  }, [])
  

  return (
    <div className='leaflet-bar'>
      {!isPanningEnabled
        ? config.map((items, i) => (
          <motion.a
            key={i}
            className={items.className}
            href='/'
            title={items.title}
            role='button'
            aria-label={items.title}
            onClick={items.onClick}
            variants={fadeIn('left', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            {items.component}
          </motion.a>))
        : (
          <motion.a
            className='leaflet-control-enable-panning'
            href='/'
            title='Enable Panning'
            role='button'
            aria-label='Enable Panning'
            onClick={togglePanning}
            variants={fadeIn('left', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            <MdOutlinePanTool size={22} color='#131424' />
          </motion.a>
        )
      }
    </div>
  )
}

export {
  CustomMarker,
  CustomZoomControl
}