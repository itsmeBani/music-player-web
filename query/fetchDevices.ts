import { queryOptions } from "@tanstack/react-query";
import apiClient, { API_BASE_URL } from "./AxiosClientConfig";

export const fetchActiveDevices = () => {
    return queryOptions({
        queryKey: ["active-devices"],
        queryFn: () => getDevices(),
    });
};


export const fetchCurrentActiveDevice = () => {
    return queryOptions({
        queryKey: ["current-active-device"],
        queryFn: () => getCurrentDevice(),
    });
};

const getDevices = async () => {
    const response = await apiClient.get(`${API_BASE_URL}/me/player/devices`);
    return response.data;
};



const getCurrentDevice = async () => {
    const response = await apiClient.get(`${API_BASE_URL}/me/player`);
    return response.data; // contains current playback state & active device info
};
