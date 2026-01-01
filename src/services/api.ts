import axios, { AxiosError, AxiosResponse } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<{ message?: string }>) => {
    let errorMessage: string;

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      switch (status) {
        case 400:
          errorMessage = data?.message || 'Données invalides. Vérifiez votre saisie.';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée.';
          break;
        case 409:
          errorMessage = data?.message || 'Conflit détecté (ex: horaires qui se chevauchent).';
          break;
        case 500:
          errorMessage = 'Erreur serveur. Réessayez plus tard.';
          break;
        default:
          errorMessage = data?.message || `Erreur ${status}`;
      }
    } else if (error.request) {
      errorMessage = 'Impossible de contacter le serveur. Vérifiez votre connexion réseau.';
    } else {
      errorMessage = error.message || 'Erreur inconnue';
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
