import axios from "axios";
import { supabase } from "@/services/supabase-config.ts";

export const API_BASE_URL = "https://api.spotify.com/v1";


const apiClient = axios.create({
    baseURL: API_BASE_URL,
});


apiClient.interceptors.request.use(async (config) => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Error fetching session:", error);
        return config;
    }

    const accessToken = data.session?.provider_token;

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});


apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const { data, error: refreshError } = await supabase.auth.refreshSession();

                if (refreshError) {
                    console.error("Failed to refresh session:", refreshError);
                    return Promise.reject(refreshError);
                }

                const newAccessToken = data.session?.provider_token;

                if (newAccessToken) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshCatch) {
                console.error("Refresh token failed:", refreshCatch);
                return Promise.reject(refreshCatch);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
