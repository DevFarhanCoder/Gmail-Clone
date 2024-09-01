import axios from 'axios';

// Load environment variable
const API_URI = process.env.REACT_APP_API_URI; 

const API_GMAIL = async (serviceUrlObject, requestData = {}) => {
    const { params, urlParams, ...body } = requestData;

    try {
        const response = await axios({
            method: serviceUrlObject.method,
            url: `${API_URI}/${serviceUrlObject.endpoint}${urlParams ? `/${urlParams}` : ''}`,
            data: body,
            params: params,
        });
        return response;
    } catch (error) {
        throw error; // Ensure errors are properly thrown
    }
}

export default API_GMAIL;
