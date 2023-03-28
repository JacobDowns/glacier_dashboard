import axios from 'axios';


async function getOutlines() {
    console.log('fetching outlines');
    try {
        const response = await axios.get('https://alaska.usgs.gov/science/glacier/dashboard/data/glacier_dashboard_data/outlines/outlines.json');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export default getOutlines;