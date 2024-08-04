const axios = require('axios');

const fetchDataFromExternalApi = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to fetch data from external API: ${error.message}`);
    }
};

module.exports = {
    fetchDataFromExternalApi,
};