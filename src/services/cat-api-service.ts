import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

export const getBreeds = async (): Promise<Record<string, any>[]> => {
    return axios.get(`${BASE_URL}/breeds`)
        .then(response => response.data);
};

export const getCatsByBreed = async (breedId: string): Promise<Record<string, any>[]> => {
    return axios.get(`${BASE_URL}/images/search`, { params: { breed_id: breedId } })
        .then(response => response.data);
};

export const getImageById = async (imageId: string): Promise<Record<string, any>> => {
    return axios.get(`${BASE_URL}/images/${imageId}`)
        .then(response => response.data);
};