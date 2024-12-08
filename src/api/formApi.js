export async function sendFormData(data) {
    const formUrl = import.meta.env.VITE_PRODUCT_API_URL;

    try {
        const response = await fetch(formUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error sending form data:', error);
        throw error;
    }
}
