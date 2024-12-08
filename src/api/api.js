export async function apiRequest (url){
    try {
        const response = await fetch(url);
        const data  = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetch :', error);
        throw error;
    }
}
