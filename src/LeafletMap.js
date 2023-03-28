import { React, forwardRef, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, useMapEvents, GeoJSON, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import SearchField from "./SearchField";
import { ScaleControl } from 'react-leaflet';
import axios from 'axios';

const { BaseLayer } = LayersControl;

const LocationFinderDummy = ({ setSelectedGlacier, ...props }) => {

  async function getIndex(url) {
    try {
      const response = await axios.get(url);
      let index = 0;
      for (let i in response.data.values) {
        const v = response.data.values[i];
        index = Math.max(index, v[1]);
      }

      if (index) {
        const k = Object.keys(props.data.features).find(k => props.data.features[k].properties.index === index);
        console.log('index', k);
        console.log(props.data.features[k]);

        const selectedGlacier = {
          'type': 'FeatureCollection',
          'name': 'outline',
          'crs': { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
          'features': [props.data.features[k]]
        }

        setSelectedGlacier(selectedGlacier);
      }

    }
    catch (error) {
      console.log(error);
    }
  }

  const map = useMapEvents({
    click(e) {
      console.log(e.latlng);

      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
      const url = `https://rconnect.usgs.gov/tile_api/mosaicjson/point/${lng},${lat}?url=https%3A%2F%2Falaska.usgs.gov%2Fscience%2Fglacier%2Fdashboard%2Fdata%2Fglacier_dashboard_data%2Fcogs%2Findex_mosaic.json&bidx=1&nodata=nan`
      getIndex(url);



    },
  });
  return null;
};

const LeafletMap = forwardRef((props, ref) => {
  const geoJsonRef = useRef();

  let url = '';
  if (props.selectedDataset != 'None') {

    const dataset = props.datasets.get(props.selectedDataset);

    const query_params = {
      url: dataset['mosaic_url'],
      bidx: '1',
      rescale: props.dataMin + 'e0,' + props.dataMax + 'e0',
      colormap_name: 'viridis',
      nodata: 'nan',
    };
    const query_string = new URLSearchParams(query_params).toString();
    const tile_server = 'http://rconnect.usgs.gov/tile_api/mosaicjson/tiles/WebMercatorQuad/{z}/{x}/{y}@1x?'
    url = tile_server + query_string;
  }


  // set the data to new data whenever it changes
  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.clearLayers();   // remove old data
      if(props.selectedGlacier){
        geoJsonRef.current.addData(props.selectedGlacier);
      }
       // might need to be geojson.features
    }
  }, [geoJsonRef, props.selectedGlacier])


  return (
    <MapContainer
      style={{ height: '800px' }}
      center={[props.lat, props.lon]}
      zoom={props.zoom}
      scrollWheelZoom={true}
      ref={ref}>
      {true && <SearchField />}
      {!props.hideData &&
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url={url}
          bounds={[[36.386, -176.142], [69.351, -105.608]]}
          maxZoom={15}
          unloadInvisibleTiles={true}
          reuseTiles={true}
          zIndex={100}
        />
      }
      <LayersControl>
        <BaseLayer checked name="ESRI World Imagery">
          <TileLayer
            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
          />
        </BaseLayer>
        <BaseLayer name="Stamen Terrain">
          <TileLayer
            url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png'
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

          />
        </BaseLayer>

        <BaseLayer name="Carto DB Dark Matter">
          <TileLayer
            url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'

          />
        </BaseLayer>
      </LayersControl>
      <GeoJSON
        ref={geoJsonRef}
        data={props.selectedGlacier}
      />

      <ScaleControl position="bottomleft" />
      <LocationFinderDummy datasets={props.datasets} setSelectedGlacier={props.setSelectedGlacier} data={props.data} />
    </MapContainer>
  )
});

export default LeafletMap;