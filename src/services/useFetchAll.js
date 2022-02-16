import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// fetches multiple calls
function useFetchAll(urls) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const promises = urls.map((url) =>
            fetch(baseUrl + url).then((response) => {
                if (response.ok) return response.json();
                throw response
            })
        );
        //The Promise.all() method takes an iterable of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises.
        //Syntax : Promise.all(iterable);
        Promise.all(promises)
            .then((json) => setData(json))
            .catch((e) => {
                console.error(e);
                setError(e)
            })
            .finally(() => setLoading(false))
        //eslint-disable-next-line
    }, []);

    return { data, loading, error }
};

export default useFetchAll;