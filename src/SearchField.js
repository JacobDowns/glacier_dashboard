import React, { useState, useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import {useMap} from 'react-leaflet';
import 'leaflet-geosearch/dist/geosearch.css';


const SearchField = (props) => {

    const map = useMap();
    const provider = new OpenStreetMapProvider();

    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider: provider,
        showMarker: false
    });

    useEffect(() => {
        map.addControl(searchControl);
        return () => map.removeControl(searchControl);
    }, []);

    return null;
};

export default SearchField;