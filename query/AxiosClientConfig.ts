
import axios from 'axios';
import {supabase} from "@/services/supabase-config.ts";
const apiClient = axios.create();

apiClient.interceptors.request.use(async (config) => {

    const {data} = await supabase.auth.getSession()


    try {
        config.headers.Authorization = `Bearer ${data?.session?.provider_token}`;
        return config;
    } catch (error) {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
});

export default apiClient;
export const API_BASE_URL = 'https://api.spotify.com/v1';
