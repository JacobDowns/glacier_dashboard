import React from 'react';
import { Button, Card, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { Popover2 } from "@blueprintjs/popover2";
import { Code, Label, Switch } from "@blueprintjs/core";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const DataSelect = (props) => {

    const exampleMenu = (
        <Menu>
            <ToggleButtonGroup
                value={'raster'}
                aria-label="display"
            >
                <ToggleButton value="raster" aria-label="raster">
                    Raster
                </ToggleButton>
                <ToggleButton value="avg" aria-label="avg">
                    Average
                </ToggleButton>
            </ToggleButtonGroup>
            <MenuDivider />
            <Switch checked={true} label="Show Data" />
        </Menu>
    );

    return (
        <Popover2 content={exampleMenu} fill={true} placement="bottom">
            <Button
                alignText="left"
                fill={true}
                icon="applications"
                rightIcon="caret-down"
                text="Data Display"
            />
        </Popover2>
    )

}

export default DataSelect;