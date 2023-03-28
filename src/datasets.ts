
const base_url = 'https://alaska.usgs.gov/science/glacier/dashboard/data/glacier_dashboard_data/';

export interface Dataset {
    readonly full_name: string;
    readonly mosaic_url: string;
    readonly max_range: Array<number>;
    readonly unit: string;
    range: Array<number>;
    readonly attribution: string;
    readonly short_name: string;
    avg_range: Array<number>;
    max_avg_range: Array<number>;
}

export var datasets = new Map<string, Dataset>();
 
datasets.set('millan_thickness',  {
    'full_name' : 'Millan 2022 Ice Thickness',
    'mosaic_url' : base_url + 'cogs/H_millan_mosaic.json',   
    'max_range' : [0., 4000],
    'unit' : 'Thickness (m)',
    'range' : [0., 2500.],
    'attribution' : 'Data Source: Millan 2022',
    'short_name' : 'H_millan',
    'avg_range' : [0, 250],
    'max_avg_range' : [0, 1000]
});

datasets.set('farinotti_thickness',  {
    'full_name' : 'Farinotti 2019 Ice Thickness',
    'mosaic_url' : base_url + 'cogs/H_farinotti_mosaic.json',
    'max_range' : [0., 4000],
    'unit' : 'Thickness (m)',
    'range' : [0., 2500.],
    'attribution' : 'Data Source: Farinotti 2019',
    'short_name' : 'H_farinotti',
    'avg_range' : [0, 250],
    'max_avg_range' : [0, 1000]
});

datasets.set('millan_velocity', {
    'full_name' : 'Millan 2022 Ice Velocity',
    'mosaic_url' : base_url + 'cogs/V_mosaic.json',
    'max_range' : [0., 4000],
    'unit' : 'Speed (m a$^{-1}$)',
    'range' : [0., 1500.],
    'attribution' : 'Data Source: Millan 2022',
    'short_name' : 'V_millan',
    'avg_range' : [0, 100],
    'max_avg_range' : [0, 1000]
});

datasets.set('hugonnet_thinning', {
    'full_name' : 'Hugonnet 2021 Elevation Change',
    'mosaic_url' : base_url + 'cogs/dhdt_mosaic.json',
    'max_range' : [-25., 25.],
    'unit' : 'Thinning (m a$^{-1}$)',
    'range' : [-5., 1.],
    'attribution' : 'Data Source: Hugonnet 2021',
    'short_name' : 'dhdt_hugonnet',
    'avg_range' : [-5, 1.],
    'max_avg_range' : [-15, 10.]
});
