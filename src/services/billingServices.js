const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getBillingInfo(userId) {
    return fetch(baseUrl + "billingInfo/" + userId).then((response) => {
        if (response.ok) return response.json();
        throw response;
    });
}

export async function saveBillingInfo(info) {
    return fetch(baseUrl + "billingInfo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
    });
}