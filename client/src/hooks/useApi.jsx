import { useState } from 'react';
import API from '../services/api';

const useApi = (urlObject) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const call = async (payload, type = '') => {
        setResponse(null);
        setIsLoading(true);
        setError("");
        
        try {
            // Ensure API function is correctly handling URL and method
            const res = await API(urlObject.endpoint, urlObject.method, payload);
            setResponse(res.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { call, response, error, isLoading };
}

export default useApi;
