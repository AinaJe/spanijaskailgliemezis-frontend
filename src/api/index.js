// src/api/index.js
import config from '../config.js';

const API_BASE_URL = config.API_BASE_URL;

/**
 * Veic API pieprasījumu.
 * @param {string} endpoint - API galapunkts (piem., 'authors', 'cards').
 * @param {string} [method='GET'] - HTTP metode (GET, POST, PUT, DELETE).
 * @param {object|FormData} [data=null] - Dati, kas jāsūta (POST/PUT).
 * @param {object} [params=null] - URL parametri (GET).
 * @param {boolean} [requiresAuth=false] - Vai pieprasījumam nepieciešama autentifikācija ar JWT tokenu.
 * @returns {Promise<object>} - API atbilde.
 * @throws {Error} - Ja pieprasījums neizdodas vai atgriež kļūdu.
 */
async function apiRequest(endpoint, method = 'GET', data = null, params = null, requiresAuth = false) {
    let url = `${API_BASE_URL}/${endpoint}`;
    const options = {
        method,
        headers: {},
    };

    if (params) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
    }

    if (requiresAuth) {
        const token = localStorage.getItem('adminToken');
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        } else {
            throw new Error('Nav autorizācijas tokena. Lūdzu, piesakieties.');
        }
    }

    // Datu apstrāde (JSON vai FormData)
    if (data instanceof FormData) {
        // Ja sūtām FormData (faili), Content-Type galveni nenorādām - pārlūkprogramma to iestatīs automātiski
        options.body = data;
    } else if (data) {
        // Ja sūtām JSON datus, norādām Content-Type
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, options);
        const responseData = await response.json();

        if (!response.ok) {
            const errorMessage = responseData.message || responseData.messages?.error || responseData.error || 'Nezināma kļūda.';
            const error = new Error(errorMessage);
            error.status = response.status;
            error.response = responseData;
            throw error;
        }

        return responseData.data || responseData; // Atgriežam 'data' lauku, ja tas pastāv, citādi visu atbildi
    } catch (error) {
        console.error(`API kļūda: ${method} ${url}`, error);
        throw error;
    }
}

// Specifiskas API metodes
export const getAuthors = (params = null) => apiRequest('authors', 'GET', null, params);
export const createAuthor = (authorData) => apiRequest('authors', 'POST', authorData, null, true); // `true` for requiresAuth
export const updateAuthor = (id, authorData) => apiRequest(`authors/${id}`, 'PUT', authorData, null, true); // `true` for requiresAuth
export const deleteAuthor = (id) => apiRequest(`authors/${id}`, 'DELETE', null, null, true); // `true` for requiresAuth

export const getThemes = (params = null) => apiRequest('themes', 'GET', null, params);
export const createTheme = (themeData) => apiRequest('themes', 'POST', themeData, null, true);
export const updateTheme = (id, themeData) => apiRequest(`themes/${id}`, 'PUT', themeData, null, true);
export const deleteTheme = (id) => apiRequest(`themes/${id}`, 'DELETE', null, null, true);

export const getCards = (params = null) => apiRequest('cards', 'GET', null, params);
export const createCard = (cardData) => apiRequest('cards', 'POST', cardData, null, true);
export const updateCard = (id, cardData) => apiRequest(`cards/${id}`, 'PUT', cardData, null, true);
export const deleteCard = (id) => apiRequest(`cards/${id}`, 'DELETE', null, null, true);

export const getCardImages = (params = null) => apiRequest('card_images', 'GET', null, params);
export const createCardImage = (imageData) => apiRequest('card_images', 'POST', imageData, null, true);
export const updateCardImage = (id, imageData) => apiRequest(`card_images/${id}`, 'PUT', imageData, null, true);
export const deleteCardImage = (id) => apiRequest(`card_images/${id}`, 'DELETE', null, null, true);

export const getArticles = (params = null) => apiRequest('articles', 'GET', null, params);
export const createArticle = (articleData) => apiRequest('articles', 'POST', articleData, null, true);
export const updateArticle = (id, articleData) => apiRequest(`articles/${id}`, 'PUT', articleData, null, true);
export const deleteArticle = (id) => apiRequest(`articles/${id}`, 'DELETE', null, null, true);

export const getVideos = (params = null) => apiRequest('videos', 'GET', null, params);
export const createVideo = (videoData) => apiRequest('videos', 'POST', videoData, null, true);
export const updateVideo = (id, videoData) => apiRequest(`videos/${id}`, 'PUT', videoData, null, true);
export const deleteVideo = (id) => apiRequest(`videos/${id}`, 'DELETE', null, null, true);

export const loginAdmin = (credentials) => apiRequest('admin/login', 'POST', credentials);