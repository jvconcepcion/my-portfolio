'use client';

import { CurrentZoomProps, MapConfigProps, MapGeoLocationProps, MiniBoundsProps, MinimapControlProps } from '@interfaces';
import React, { useState, useMemo, useCallback } from 'react';
import { AttributionControl, MapContainer, Marker, Popup, Rectangle, TileLayer, useMap, useMapEvent } from 'react-leaflet';
import { useEventHandlers, useLeafletContext } from '@react-leaflet/core';
import L, { LeafletMouseEvent } from 'leaflet';
import { CustomZoomControl, CustomMarker } from './CustomMapComponents';
import { motion } from 'framer-motion';
import { fadeIn } from '@utils/variants';
import { performOperation } from '@utils/reusablesFunc';

const Map: React.FC<MapGeoLocationProps> = ({
  loc = '',
  lat = 51.505,
  lng = -0.09,
}) => {

  const [geoData, setGeoData] = useState<MapGeoLocationProps>({ lat, lng });
  const [currentZoom, setCurrentZoom] = useState<CurrentZoomProps>({ mini: 14, large: 20 });

  const mapConfig: MapConfigProps = {
    POSITION_CLASSES: {
      bottomleft: 'leaflet-bottom leaflet-left',
      bottomright: 'leaflet-bottom leaflet-right',
      topleft: 'leaflet-top leaflet-left',
      topright: 'leaflet-top leaflet-right',
    },
    BOUNDS_STYLE: { weight: 1 }
  };

  const { POSITION_CLASSES, BOUNDS_STYLE } = mapConfig;

  const MinimapBounds: React.FC<MiniBoundsProps> = ({ parentMap, zoom }) => {
    const minimap = useMap()

    // Clicking a point on the minimap sets the parent's map center
    const onClick = useCallback(
      (e: LeafletMouseEvent) => {
        parentMap.setView(e.latlng, parentMap.getZoom())
      },
      [parentMap],
    )
    useMapEvent('click', onClick)

    // Keep track of bounds in state to trigger renders
    const [bounds, setBounds] = useState(parentMap.getBounds())
    const onChange = useCallback(() => {
      setBounds(parentMap.getBounds())
      // Update the minimap's view to match the parent map's center and zoom
      minimap.setView(parentMap.getCenter(), zoom)
    }, [minimap, parentMap, zoom])

    // Listen to events on the parent map
    const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
    const context = useLeafletContext();
    useEventHandlers({ instance: parentMap, context }, handlers)

    return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
  };

  const MinimapControl: React.FC<MinimapControlProps> = ({ position, zoom, children }) => {
    const parentMap = useMap()
    const mapZoom = zoom || 5

    // Memoize the minimap so it's not affected by position changes
    const minimap = useMemo(
      () => (
        <motion.div
          variants={fadeIn('left', 0.2)}
          initial='hidden'
          animate='show'
          exit='hidden'
        >
          <MapContainer
            className='miniMapContainer'
            center={parentMap.getCenter()}
            zoom={mapZoom}
            dragging={false}
            doubleClickZoom={false}
            scrollWheelZoom={false}
            attributionControl={false}
            zoomControl={false}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
          </MapContainer>
        </motion.div>
      ),
      [],
    )

    const positionClass =
      (position && POSITION_CLASSES[position as keyof typeof POSITION_CLASSES]) || POSITION_CLASSES.topright
    return (
      <>
        <div className={positionClass}>
          <div className='leaflet-control leaflet-bar pointer-events-none'>{minimap}</div>
        </div>
        <div className='absolute z-[1000] top-[9.7rem] right-0'>
        {children}
        </div>
      </>
    )
  };

  return (
    <>
      <MapContainer
        className='flex flex-col h-[23rem] xs:h-[30rem] sm:h-[35rem]'
        center={[geoData.lat, geoData.lng]}
        zoom={20}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {geoData.lat && geoData.lng && (
          <Marker position={[geoData.lat, geoData.lng]} icon={L.divIcon(CustomMarker)}>
            <Popup>
              {loc}
            </Popup>
          </Marker>
        )}
        <MinimapControl position='topright'>
          <CustomZoomControl
            lat={geoData.lat}
            lng={geoData.lng}
            zoom={currentZoom.large}
            setMiniZoom={(num: number, arithmetic: string) =>
              setCurrentZoom((prevState) => ({
                ...prevState,
                mini: performOperation(prevState.mini, num, arithmetic)
              }))}
          />
        </MinimapControl>
        <AttributionControl position='bottomright' prefix={false} />
      </MapContainer>
    </>
  );
};

export default Map;