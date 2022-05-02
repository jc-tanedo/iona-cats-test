import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

export const getBreeds = async (): Promise<Record<string, any>[]> => {
  return axios.get(`${BASE_URL}/breeds`)
    .then(response => response.data);
};