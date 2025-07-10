// src/api/index.js
import config from '/src/config.js'; // Importējam API konfigurāciju

const API_BASE_URL = config.API_BASE_URL;

/**
 * Veic API pieprasījumu.
 * @param {string} endpoint - API galapunkts (piem., 'authors', 'cards').
 * @param {string} [method='GET'] - HTTP metode (GET, POST, PUT, DELETE).
 * @param {object} [data=null] - Dati, kas jāsūta (POST/PUT).
 * @param {object} [params=null] - URL parametri (GET).
 * @returns {Promise<object>} - API atbilde.
 * @throws {Error} - Ja pieprasījums neizdodas vai atgriež kļūdu.
 */
async function apiRequest(endpoint, method = 'GET', data = null, params = null) {
    let url = `${API_BASE_URL}/${endpoint}`;
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (params) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
    }

    if (data) {
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (!response.ok) {
            const errorMessages = responseData.messages?.error || responseData.error || 'Nezināma kļūda.';
            const error = new Error(errorMessages);
            error.status = response.status;
            error.response = responseData; // Pievienojam visu atbildi kļūdas objektam
            throw error;
        }

        return responseData.data; // Atgriežam tikai 'data' lauku no atbildes
    } catch (error) {
        console.error(`API kļūda: ${method} ${url}`, error);
        throw error;
    }
}

// Specifiskas API metodes
export const getAuthors = (params = null) => apiRequest('authors', 'GET', null, params);
export const createAuthor = (authorData) => apiRequest('authors', 'POST', authorData);
export const updateAuthor = (id, authorData) => apiRequest(`authors/${id}`, 'PUT', authorData);
export const deleteAuthor = (id) => apiRequest(`authors/${id}`, 'DELETE');

export const getThemes = (params = null) => apiRequest('themes', 'GET', null, params);
export const createTheme = (themeData) => apiRequest('themes', 'POST', themeData);
export const updateTheme = (id, themeData) => apiRequest(`themes/${id}`, 'PUT', themeData);
export const deleteTheme = (id) => apiRequest(`themes/${id}`, 'DELETE');

export const getCards = (params = null) => apiRequest('cards', 'GET', null, params);
export const createCard = (cardData) => apiRequest('cards', 'POST', cardData);
export const updateCard = (id, cardData) => apiRequest(`cards/${id}`, 'PUT', cardData);
export const deleteCard = (id) => apiRequest(`cards/${id}`, 'DELETE');

export const getArticles = (params = null) => apiRequest('articles', 'GET', null, params);
export const createArticle = (articleData) => apiRequest('articles', 'POST', articleData);
export const updateArticle = (id, articleData) => apiRequest(`articles/${id}`, 'PUT', articleData);
export const deleteArticle = (id) => apiRequest(`articles/${id}`, 'DELETE');

export const getVideos = (params = null) => apiRequest('videos', 'GET', null, params);
export const createVideo = (videoData) => apiRequest('videos', 'POST', videoData);
export const updateVideo = (id, videoData) => apiRequest(`videos/${id}`, 'PUT', videoData);
export const deleteVideo = (id) => apiRequest(`videos/${id}`, 'DELETE');