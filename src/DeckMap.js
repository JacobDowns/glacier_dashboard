import React from 'react';
import DeckGL from '@deck.gl/react';
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';
import { forwardRef } from 'react';
import axios from 'axios';
let colormap = require('colormap');


const colors = colormap({
    colormap: 'viridis',
    nshades: 32,
    format: 'rba',
    alpha: 1
});

const DeckMap = forwardRef((props, ref) => {
    const dataset = props.datasets.get(props.selectedDataset);
    const key = dataset['short_name'] + '_avg';

    const layer = new TileLayer({
        // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
        data: 'https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg',
        minZoom: 0,
        maxZoom: 19,
        tileSize: 256,
        renderSubLayers: props => {

            const {
                bbox: { west, south, east, north }
            } = props.tile;

            return new BitmapLayer(props, {
                data: null,
                image: props.data,
                bounds: [west, south, east, north]
            });
        }
    });

    const getColor = (f => {
        let x = f.properties[key];
        
        if (x == null) {
            return [0, 0, 0];
        }
        const range = Math.abs(props.max - props.min);
        x = (x - props.min) / range;
        let i = parseInt(x * props.nshades);
        i = (i > 31) ? 31 : i;
        i = (i < 0) ? 0 : i;
        const c = colors[i].slice(0, 3);
        return c;
    });
    function getTooltip({ object }) {
        return object &&
            `RGIId: ${object.properties.RGIId}
        Name: ${object.properties.Name || 'None'}
        Value: ${object.properties[key]}
        `;
    }

    const outlines = new GeoJsonLayer({
        id: 'geojson',
        data : props.data,
        opacity: 1,
        stroked: false,
        filled: true,
        extruded: false,
        wireframe: false,
        //getElevation: f => f.properties.H_millan_avg * 200,
        getFillColor: f => getColor(f),
        getLineColor: [255, 255, 255],
        pickable: true,
        pickable: true,
        updateTriggers: {
            getFillColor: [props.min, props.max, props.selectedDataset]
        },
        visible: !props.hideData
    });


    const layers = [layer, outlines];


    return (
        <DeckGL
            style={{ height: '800px' }}
            initialViewState={{
                longitude: props.lon,
                latitude: props.lat,
                zoom: props.zoom,
                pitch: 0,
                bearing: 0
            }}
            controller={true}
            layers={layers}
            ref={ref}
            getTooltip={getTooltip}
        />
    )
});
export default DeckMap;