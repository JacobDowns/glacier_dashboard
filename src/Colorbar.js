import React from 'react';
import Plot from 'react-plotly.js';

class Colorbar extends React.Component {
    render() {
        return (
            <Plot
                config={{ staticPlot: true }}
                data={[
                    {
                        z: [[this.props.min, this.props.max]],
                        type: 'heatmap',
                        colorscale: 'Viridis',
                        colorbar: { 'orientation': 'h' }
                    },
                ]}
                layout={{
                    width: 350,
                    height: 75,
                    margin: {
                        l: 1,
                        r: 1,
                        b: 0,
                        t: 60,
                        pad: 5
                    },
                    'xaxis': {
                        'range': [-1, 0],
                        'showgrid': false,
                        'zeroline': false,
                        'visible': false,
                    },
                    'yaxis': {
                        'range': [-10, -5],
                        'showgrid': false,
                        'zeroline': false,
                        'visible': false,
                    },

                }}
            />
        );
    }
}

export default Colorbar;
