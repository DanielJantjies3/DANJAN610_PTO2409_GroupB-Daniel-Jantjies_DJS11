const BASE_URL = "https://podcast-api.netlify.app/";

export async function fetchAllPodcasts() {
    try {
        const response = await fetch(`${BASE_URL}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching podcasts:", error);
        throw error;
    }
}

export async function fetchPodcastById(id) {
    try {
        const response = await fetch(`${BASE_URL}/id/${id}`);
        const data = await response.json()
        return data;
    } catch (error) {
        console.error("Error fetching podcast by ID:", error);
        throw error;            
    }

}

export async function fetchAllPodcastsByGenre(genreID) {
    try {
        const response = await fetch(`${BASE_URL}/genre/${genreID}`);
        const data = await response.json()
        return data.results;
    }
    catch (error){
        console.error("Failed to fetch the data from the end point ", error);
        throw error;
    }
}