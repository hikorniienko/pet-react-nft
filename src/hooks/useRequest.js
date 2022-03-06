import {useEffect, useState} from "react";

function useRequest (request) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        request()
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setLoading(false));
    }, [])

    return {data: data, loading: loading, error: error};
};
export default useRequest;
