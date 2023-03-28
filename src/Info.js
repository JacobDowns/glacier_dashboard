import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import LinkIcon from '@mui/icons-material/Link';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Latex from 'react-latex-next'

const Info = (props) => {

    return (

        <Container fixed>
            <Box sx={{padding: '10px', 'max-width': '1000px' }}>
                <h4 className="bp4-heading">About Glacier Dashboard</h4>
                <Typography variant="body1" gutterBottom>
                    The U.S. Geological Survey Alaska Climate Adaptation Science Center collaborated with the Alaska Science Center and
                    Northern Rocky Mountain Science Center to compile available datasets on glacier outlines, ice thickness, ice velocity,
                    and glacier surface elevation change to assess the vulnerability of Alaskan glaciers. This data viewer reflects that
                    effort.
                </Typography>
                <br />

                <h4 className="bp4-heading">Datasets</h4>

                <Typography variant="body1" gutterBottom>
                    Data sources compiled in Glacier Dashboard are shown in the following table, including information about data sources, spatial resolution, and data
                    coverage. Glacier dashboard covers regions 1 and 2 of the Randolph Glacier Inventory (RGI) v6, which includes Alaska and Western North America. 
                    Note that these data sources are estimates, and are prone to uncertainty. Please refer to the relevant publications for more details as well as 
                    caveats and limitations for each dataset. 
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Dataset</TableCell>
                                <TableCell align="left">Link</TableCell>
                                <TableCell align="left">Coverage </TableCell>
                                <TableCell align="left">Description </TableCell>
                                <TableCell align="left">Native Resolution </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Randolph Glacier Inventory v6.0</TableCell>
                                <TableCell align="left">
                                    <Link href="https://www.glims.org/RGI/" target="_blank" >
                                        <LinkIcon />
                                    </Link>
                                </TableCell>
                                <TableCell align="left">Comprehensive inventory of all glaciers in RGI regions 1/2</TableCell>
                                <TableCell align="left">Glacier outlines and basic characteristics such as area, median elevation, etc.</TableCell>
                                <TableCell align="left">Vector Data</TableCell>
                            </TableRow>

                            <TableRow key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Millan 2022 Ice Thickness</TableCell>
                                <TableCell align="left">
                                    <Link href="https://www.nature.com/articles/s41561-021-00885-z" target="_blank" >
                                        <LinkIcon />
                                    </Link>
                                </TableCell>
                                <TableCell align="left">Most glaciers in Randolph Glacier Inventory v6 regions 1 and 2. Smaller, slower glaciers more likely to be excluded</TableCell>
                                <TableCell align="left">Estimate of glacier ice thickness <Latex>$\approx$</Latex> 2017 derived from surface velocity estimates </TableCell>
                                <TableCell align="left">50 m</TableCell>
                            </TableRow>

                            <TableRow key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Farinotti 2019 Ice Thickness</TableCell>
                                <TableCell align="left">
                                    <Link href="https://www.nature.com/articles/s41561-019-0300-3" target="_blank" >
                                        <LinkIcon />
                                    </Link>
                                </TableCell>
                                <TableCell align="left">All glaciers in Randolph Glacier Inventory v6 regions 1 and 2</TableCell>
                                <TableCell align="left"> Consensus estimate of glacier ice thickness <Latex>$\approx$</Latex> 2019 derived using variety of methods </TableCell>
                                <TableCell align="left">50 m</TableCell>
                            </TableRow>

                            <TableRow key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Millan 2022 Ice Velocity</TableCell>
                                <TableCell align="left">
                                    <Link href="https://www.nature.com/articles/s41561-021-00885-z" target="_blank" >
                                        <LinkIcon />
                                    </Link>
                                </TableCell>
                                <TableCell align="left">Most glaciers in Randolph Glacier Inventory v6 regions 1 and 2. Smaller, slower glaciers more likely to be excluded</TableCell>
                                <TableCell align="left">Estimate of ice surface speed <Latex>$\approx$</Latex> 2017 derived from feature tracking </TableCell>
                                <TableCell align="left">50 m</TableCell>
                            </TableRow>

                            <TableRow key={1}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">Hugonnet 2021 Elevation Change</TableCell>
                                <TableCell align="left">
                                    <Link href="https://www.nature.com/articles/s41586-021-03436-z" target="_blank" >
                                        <LinkIcon />
                                    </Link>
                                </TableCell>
                                <TableCell align="left">All glaciers in Randolph Glacier Inventory v6 regions 1 and 2 </TableCell>
                                <TableCell align="left">Estimate of glacier thinning rates from 2000-2019 satellite and airborne datasets</TableCell>
                                <TableCell align="left">100 m</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>

                <br />
                <h4 className="bp4-heading">Basic Use</h4>

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
                            Dataset Selection
                        </Typography>
                        <Typography variant="body2">
                            Select a data from the dropdown menu to view a particular dataset. Dataset units are displayed above the colorbar to the right
                            of the map.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
                            Data Range
                        </Typography>
                        <Typography variant="body2">
                            Use the data range slider to customize the colormap range. This can be useful for visualizing data for glaciers of
                            widely different sizes.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
                            Data View
                        </Typography>
                        <Typography variant="body2">
                            Toggle between the "raster" or "average" view to see spatially distributed fields or glacierwide averages respectively.
                            Search features are only available in raster mode.
                        </Typography>
                    </CardContent>
                </Card>

                
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
                        Glacier Information
                        </Typography>
                        <Typography variant="body2">
                        Clicking on a glacier in raster view mode will show the full glacier outline and glacier statistics in a table below the map.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
                        Search
                        </Typography>
                        <Typography variant="body2">
                        Clicking on the magnifying glass on the map in raster mode will open a search field. This can be used to search for glacirs
                    by name, or search for specific locations or features  that may help orient you.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
                        Scale
                        </Typography>
                        <Typography variant="body2">
                        A scale bar is shown in the bottom left of the map in raster mode.
                        </Typography>
                    </CardContent>
                </Card>

                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 16 }} color="black" gutterBottom>
                        Interpreting Units
                        </Typography>
                        <Typography variant="body2">
                        Data fields have units of meters (m) or meters per year also called meters per annum <Latex>{'(m a$^{-1}$)'}</Latex>.
                        </Typography>
                    </CardContent>
                </Card>


                

            </Box>


        </Container >
    )
}

export default Info;