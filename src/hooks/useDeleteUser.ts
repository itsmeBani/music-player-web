
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import {toast} from "sonner";
import {BACK_END_API_KEY, BACKEND_AUTH_BASE_URL} from "../../constant.ts";

const deleteUser = async (id: string) => {
    const user_token = localStorage.getItem("user_token");
    const response = await axios.delete(
        `${BACKEND_AUTH_BASE_URL}/api/Users/DeleteUser/${id}`,
        {
            headers: {
                Authorization: `Bearer ${user_token}`,
                "Content-Type": "application/json",
                "api-key": BACK_END_API_KEY,
            },
        }
    );

    return response.data;
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["USERS"]}).then();
            toast.success("Successfully Deleted")
        },
        onError: (error) => {
            console.log(error)
           toast.error(error.message)
        },
    });
};
