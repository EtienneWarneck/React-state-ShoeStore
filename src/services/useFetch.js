import { useState, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;



export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const myInit = {
            method: 'GET',
            body: JSON.stringify(),
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default',
        };

        async function init() {
            console.log("useFetch.js", myInit)
            try {
                const response = await fetch(baseUrl + url, myInit);
                if (response.ok) {
                    const json = await response.json();
                    setData(json)
                } else {
                    throw response;
                }
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        }
        init();

    }, [url]);
    console.log("useFetch.js", { data, loading, error })

    return { data, error, loading }
}