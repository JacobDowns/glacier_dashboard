import React from 'react';
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Card, Elevation } from "@blueprintjs/core";

const DataTable = (props) => {

    const selectedGlacier = props.selectedGlacier;

    return (
            <>
            <h4 className="bp4-heading">{selectedGlacier.features[0].properties.RGIId} </h4>
            <h4 className="bp4-heading">Name: {selectedGlacier.features[0].properties.Name || 'None'}</h4>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Area <Latex>{'(km $^2$)'}</Latex></TableCell>
                            <TableCell align="right">Min. Elevation (m)</TableCell>
                            <TableCell align="right">Max. Elevation (m)</TableCell>
                            <TableCell align="right">Nedian Elevation (m)</TableCell>
                            <TableCell align="right">Avg. Slope <Latex>{'(${\\circ}$)'}</Latex></TableCell>
                            <TableCell align="right">Avg. Aspect <Latex>{'(${\\circ}$)'}</Latex></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow key={0}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{selectedGlacier.features[0].properties.Area}</TableCell>
                            <TableCell align="right">{selectedGlacier.features[0].properties.Zmin}</TableCell>
                            <TableCell align="right">{selectedGlacier.features[0].properties.Zmax}</TableCell>
                            <TableCell align="right">{selectedGlacier.features[0].properties.Zmed}</TableCell>
                            <TableCell align="right">{selectedGlacier.features[0].properties.Slope}</TableCell>
                            <TableCell align="right">{selectedGlacier.features[0].properties.Aspect}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <h4 className="bp4-heading">Glacier Statistics</h4>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="other table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Dataset</TableCell>
                            <TableCell align="left">Min. </TableCell>
                            <TableCell align="left">Avg. </TableCell>
                            <TableCell align="left">Max.</TableCell>
                            <TableCell align="left">Unit</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow key={1}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Millan 2022 Ice Thickness</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.H_millan_min}</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.H_millan_avg}</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.H_millan_max}</TableCell>
                            <TableCell align="left">m</TableCell>
                        </TableRow>
                        <TableRow key={1}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Farinotti 2019 Ice Thickness</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.H_farinotti_min}</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.H_farinotti_avg}</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.H_farinotti_max}</TableCell>
                            <TableCell align="left">m</TableCell>
                        </TableRow>
                        <TableRow key={2}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Millan 2022 Ice Velocity</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.V_millan_min}</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.V_millan_avg}</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.V_millan_max}</TableCell>
                            <TableCell align="left"><Latex>{'m a $^{-1}$'}</Latex></TableCell>
                        </TableRow>
                        <TableRow key={2}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">Hugonnet 2021 Elevation Change</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.dhdt_min}</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.dhdt_hugonnet_avg}</TableCell>
                            <TableCell align="left">{selectedGlacier.features[0].properties.dhdt_max}</TableCell>
                            <TableCell align="left"><Latex>{'m a $^{-1}$'}</Latex></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </>
    )
}

export default DataTable;