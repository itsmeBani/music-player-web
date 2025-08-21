import { queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { BACK_END_API_KEY, BACKEND_AUTH_BASE_URL } from "../constant";

const getUsers = async () => {
    const user_token = localStorage.getItem("user_token");

    if (!user_token) {
        return [];
    }

    try {
        const response = await axios.get(
            `${BACKEND_AUTH_BASE_URL}/api/Users/getUsers`,
            {
                headers: {
                    Authorization: `Bearer ${user_token}`,
                    "Content-Type": "application/json",
                    "api-key": BACK_END_API_KEY,
                },
            }
        );

        console.log(response);
        return response.data ?? [];
    } catch (e) {
        console.error(e);
        throw e;
    }
};

export const fetchUsers = () => {
    return queryOptions({
        queryKey: ["USERS"],
        queryFn: getUsers,
    });
};
