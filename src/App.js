import React from 'react';
import DeckMap from './DeckMap.js';
import LeafletMap from './LeafletMap.js';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { datasets } from './datasets.ts';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Colorbar from './Colorbar.js';
import Grid from '@mui/material/Grid';
import { RangeSlider, Label } from "@blueprintjs/core";
import '@blueprintjs/core/lib/css/blueprint.css';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import DataTable from './DataTable.js';
import Info from './Info.js';
import axios from 'axios';
import {
  Icon,
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
} from "@blueprintjs/core";

import CircularProgress from '@mui/material/CircularProgress';


class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef(null);

    this.state = {
      view: 'raster',
      map: null,
      zoom: 5,
      lat: 63,
      lon: -151,
      options: [],
      datasets: datasets,
      selectedDataset: 'millan_thickness',
      dataRange: [0, 1000],
      selectedGlacier: null,
      hideData: false,
      isLoading: true,
      data: null
    };

    // Select options
    datasets.forEach((data, key) => {
      this.state.options.push({
        'value': key,
        'label': data.full_name,
      });
    });

    this.changeView = this.changeView.bind(this);
    this.changeDataset = this.changeDataset.bind(this);
    this.changeDataRange = this.changeDataRange.bind(this);
    this.setSelectedGlacier = this.setSelectedGlacier.bind(this);
    this.changeDisplay = this.changeDisplay.bind(this);
    this.showHelp = this.showHelp.bind(this);
  }

  componentDidMount() {
    console.log('im here');
    const promise = axios.get('https://alaska.usgs.gov/science/glacier/dashboard/data/glacier_dashboard_data/outlines/outlines.json')
      .then(({ data }) => {
        console.log('got data', data);
        this.setState({ data: data, isLoading: false });
      }).catch(function (error) {
        console.log(error);
      });;
  }

  setSelectedGlacier(glacier) {
    this.setState({ 'selectedGlacier': glacier });
  }

  showHelp() {
    this.setState({ 'selectedGlacier': null });
  }

  changeView(event) {

    if (this.state.view == 'raster') {
      // Switch from raster to avg. 
      const zoom = this.mapRef.current.getZoom();
      const center = this.mapRef.current.getCenter();
      this.setState({ 'zoom': zoom - 1 });
      this.setState({ 'lat': center.lat });
      this.setState({ 'lon': center.lng });
      const dataset = this.state.datasets.get(this.state.selectedDataset);
      this.setState({ dataRange: dataset.avg_range });
    }
    else {
      // Switch from avg. to raster
      const lat = this.mapRef.current.deck.viewState['default-view'].latitude;
      const lon = this.mapRef.current.deck.viewState['default-view'].longitude;
      const zoom = this.mapRef.current.deck.viewState['default-view'].zoom;
      this.setState({ 'zoom': zoom + 1 });
      this.setState({ 'lat': lat });
      this.setState({ 'lon': lon });
      const dataset = this.state.datasets.get(this.state.selectedDataset);
      this.setState({ dataRange: dataset.range });
    }

    this.setState({ view: event.target.value });

  }

  changeDataset(event) {
    this.setState({ selectedDataset: event.target.value });
    const dataset = this.state.datasets.get(event.target.value);

    if (this.state.view == 'raster') {
      this.setState({ dataRange: dataset.range });
    }
    else {
      this.setState({ dataRange: dataset.avg_range });
    }
  }

  changeDataRange(range) {
    if (this.state.view == 'raster') {
      this.setState({ dataRange: range });
      this.state.datasets.get(this.state.selectedDataset).range = range;
    }
    else {
      this.setState({ dataRange: range });
      this.state.datasets.get(this.state.selectedDataset).avg_range = range;
    }
  }

  changeDisplay() {
    this.setState({ hideData: !this.state.hideData });

  }

  render() {

    if (this.state.isLoading) {
      return (
        <Container style={{width: '100%', height : '500px'}}>
          <CircularProgress/>
        </Container>
      )
    }

    const dataset = this.state.datasets.get(this.state.selectedDataset);
    const selectedGlacier = this.state.selectedGlacier;

    

    return (
      <>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Container>


            <Navbar>
              <NavbarGroup align={Alignment.CENTER}>
                <NavbarHeading>Glacier Dashboard</NavbarHeading>
                <NavbarDivider />
                <a href="https://akcasc.org/" target="_blank" rel="noopener noreferrer">
                  <Button className={Classes.MINIMAL} icon="home" intent="primary" text="Alaska CASC" minimal={true} />
                </a>
                <NavbarDivider />
                <a href="https://www.usgs.gov/centers/norock" target="_blank" rel="noopener noreferrer">
                  <Button className={Classes.MINIMAL} icon="home" intent="primary" text="NOROCK" minimal={true} />
                </a>
                <NavbarDivider />
                <a href="https://www.usgs.gov/centers/alaska-science-center" target="_blank" rel="noopener noreferrer">
                  <Button className={Classes.MINIMAL} icon="home" intent="primary" text="Alaska Science Center" minimal={true} />
                </a>
                <NavbarDivider />
                <a href="https://www.usgs.gov/programs/climate-research-and-development-program/science/usgs-benchmark-glacier-project" target="_blank" rel="noopener noreferrer">
                  <Button className={Classes.MINIMAL} icon="home" intent="primary" text="Benchmark Glacier Project" minimal={true} />
                </a>
                <NavbarDivider />

                <a target="_blank">
                  <Button className={Classes.MINIMAL} icon="help" text="Help" onClick={this.showHelp} />
                </a>
              </NavbarGroup>
            </Navbar>
          </Container>
        </Paper>

        <Container style={{ 'min-width': '1400px', 'max-width': '1800px' }}>
          <Grid container spacing={0}>
            <Grid item xs={12}>

              {
                this.state.view == 'avg' ? (
                  <div style={{ height: '800px', width: '100%', position: 'relative' }}>
                    <DeckMap
                      ref={this.mapRef}
                      lat={this.state.lat}
                      lon={this.state.lon}
                      zoom={this.state.zoom}
                      selectedDataset={this.state.selectedDataset}
                      datasets={this.state.datasets}
                      min={this.state.dataRange[0]}
                      max={this.state.dataRange[1]}
                      nshades={32}
                      hideData={this.state.hideData}
                      data={this.state.data}
                    />
                  </div>
                ) :
                  (
                    <div style={{ height: '800px', width: '100%', position: 'relative' }}>
                      <LeafletMap
                        ref={this.mapRef}
                        lat={this.state.lat}
                        lon={this.state.lon}
                        zoom={this.state.zoom}
                        datasets={this.state.datasets}
                        selectedDataset={this.state.selectedDataset}
                        dataMin={this.state.dataRange[0]}
                        dataMax={this.state.dataRange[1]}
                        setSelectedGlacier={this.setSelectedGlacier}
                        selectedGlacier={this.state.selectedGlacier}
                        hideData={this.state.hideData}
                        data={this.state.data}
                      />
                    </div>
                  )
              }

            </Grid>
          </Grid>

        </Container>
        <Paper elevation={3} style={{ padding: '10px' }}>
          <Container style={{ 'min-width': '1400px', 'max-width': '1600px', height: '110px' }}>

            <Grid container spacing={2} >
              <Grid item xs='auto'>
                <Container style={{ 'width': '325px' }}>
                  <Label>
                    Dataset <br />
                    <TextField
                      value={this.state.selectedDataset}
                      select // tell TextField to render select
                      onChange={this.changeDataset}
                      style={{ width: '100%' }}
                    >
                      {this.state.options.map((item, index) => {
                        return <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
                      })}
                    </TextField>
                  </Label>
                </Container>
              </Grid>
              <Grid item xs='auto'>
                <Container style={{ 'width': '275px' }}>
                  <Label>
                    Data Range
                    {
                      this.state.view == 'avg' ? (<RangeSlider
                        min={dataset.max_avg_range[0]}
                        max={dataset.max_avg_range[1]}
                        stepSize={Math.abs(dataset.max_avg_range[1] - dataset.max_avg_range[0]) / 40.}
                        labelStepSize={Math.abs(dataset.max_avg_range[1] - dataset.max_avg_range[0]) / 5.}
                        value={this.state.dataRange}
                        onChange={this.changeDataRange}
                      />) : (<RangeSlider
                        min={dataset.max_range[0]}
                        max={dataset.max_range[1]}
                        stepSize={Math.abs(dataset.max_range[1] - dataset.max_range[0]) / 40}
                        labelStepSize={Math.abs(dataset.max_range[1] - dataset.max_range[0]) / 5.}
                        value={this.state.dataRange}
                        onChange={this.changeDataRange}
                      />)
                    }


                  </Label>
                </Container>
              </Grid>
              <Grid item xs='auto'>
                <Container style={{ 'width': '375px' }}>
                  <Label>
                    <Latex>{dataset.unit}</Latex><br />
                    <Colorbar min={this.state.dataRange[0]} max={this.state.dataRange[1]} />
                  </Label>

                </Container>
              </Grid>
              <Grid item xs='auto'>
                <Label>
                  Data View<br />
                  <ToggleButtonGroup
                    size='small'
                    value={this.state.view}
                    exclusive
                    aria-label="text alignment"
                    onChange={this.changeView}
                  >
                    <ToggleButton value="raster" aria-label="raster">
                      Raster
                    </ToggleButton>
                    <ToggleButton value="avg" aria-label="average">
                      Averages
                    </ToggleButton>
                  </ToggleButtonGroup>

                </Label>
              </Grid>
              <Grid item xs='auto'>

                <Label>
                  Display<br />
                  <ToggleButton
                    value='hide'
                    selected={this.state.hideData}
                    size='small'
                    onChange={this.changeDisplay}
                  >Hide Data</ToggleButton>
                </Label>

              </Grid>
            </Grid>


          </Container>
        </Paper>
        <Container style={{ 'max-width': '1300px', padding: '10px' }}>
          {
            selectedGlacier ? (<DataTable selectedGlacier={selectedGlacier} />) : (<Info />)
          }
        </Container>
      </>
    );
  }
}

export default MapView;