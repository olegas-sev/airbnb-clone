import { useState } from 'react'
import ReactMapGl, {Marker, Popup} from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'
import { LocationMarkerIcon } from '@heroicons/react/solid';
import Image from 'next/image'
import {StarIcon} from '@heroicons/react/solid'

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({})
    // transform api results into right object syntax for geolib
    const coordinates = searchResults.map((obj) => ({
        longitude: obj.long,
        latitude: obj.lat,
    }))

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    });

    return (
        <ReactMapGl
            mapStyle="mapbox://styles/webdevhusky/cks4ox8jr3gol18qqjnk2d6jm"
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                    longitude={result.long}
                    latitude={result.lat}
                    offsetLeft={-20}
                    offsetTop={-10}
                    >
                        <LocationMarkerIcon 
                        role="img"
                        onClick={() => setSelectedLocation(result)} aria-label="push-pin"
                        className="cursor-pointer animate-bounce text-blue-400 h-8"></LocationMarkerIcon>
                    </Marker>
                    {/* Popup onclick */}
                    {selectedLocation.long === result.long ? (
                        <Popup
                        onClose={() => setSelectedLocation({})}
                        closeOnClick={true}
                        latitude={result.lat}
                        longitude={result.long}
                        >
                            <div className="relative h-32   ">
                                <Image src={result.img} layout="fill" objectFit="cover" />
                            </div>
                            <div>
                                {result.title}
                                <div className="flex justify-between">
                                    <p><StarIcon className="inline h-5 text-blue-400"/>{result.star}</p>
                                    <p>{result.price}</p>
                                </div>
                            </div>
                        </Popup>
                    ): (
                        false
                    )}
                </div>
            ))}
        </ReactMapGl>
    )
}

export default Map
