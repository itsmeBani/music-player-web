import {createContext, useContext, ReactNode, useEffect, useState} from "react";
import {supabase} from "@/services/supabase-config.ts";
import {z} from "zod";
import {toast} from "sonner";
import axios, {AxiosError} from "axios";
import {BACKEND_AUTH_BASE_URL, REDIRECT_URL_LOGIN} from "../../constant.ts";
import {loginSchema, registerSchema} from "../../form_schemas.ts";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";


interface AuthContextType {
    currentUser: User | null | undefined
    loginWithSpotify: () => void;
    logout: () => void;
    token: string | undefined | null
    RegisterUser: (data: z.infer<typeof registerSchema>) => Promise<void>;
    LoginWithEmailPassword: (data: z.infer<typeof loginSchema>) => Promise<void>;
    LoginForm: UseFormReturn<{ email: string; password: string }>
    RegisterForm: UseFormReturn<{ username: string, email: string; password: string; confirmPassword: string }>
    loadingRegister: boolean;
    loadingLogin: boolean;
    VerifyEmail: () => void;

}

interface User {
    userName: string;
    email: string;
    emailConfirmed: boolean;
    roles: string[];
    spotifyId: string;
    id: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {

    const LoginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    const RegisterForm = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    const [token, setToken] = useState<string | null | undefined>(undefined)
    const [currentUser, setCurrentUser] = useState<User | null | undefined>(undefined)
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);

    const getCurrentUserRole: () => Promise<void> = async () => {
        const user_token = localStorage.getItem("user_token");

        try {
            const response = await axios.get(`${BACKEND_AUTH_BASE_URL}/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${user_token}`,
                },
            });
            console.log("Response:", response.data);
            setCurrentUser(response.data)
        } catch (error) {
            console.error("Error fetching data:", error);
            setCurrentUser(null)
        }

    }
    const loginWithSpotify = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'spotify',
            options: {
                scopes:"user-read-email user-library-read user-read-recently-played user-top-read playlist-read-private playlist-read-collaborative user-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-modify-playback-state streaming",
                redirectTo: REDIRECT_URL_LOGIN,

            }
        })

    };

    const getSession: () => void = async () => {
        const {data} = await supabase.auth.getSession()
        if (data?.session?.provider_token) {
            setToken(data.session.provider_token)

        } else {
            setToken(null)
            setCurrentUser(null)
        }

    }

    const logout = async () => {
        const {error} = await supabase.auth.signOut()
        if (!error) {

            setToken(null)
            setCurrentUser(null)
            localStorage.removeItem("user_token")
        }

    }

    const LoginWithEmailPassword = async (data: z.infer<typeof loginSchema>) => {
        setLoadingLogin(true);
        try {
            const response = await axios.post(`${BACKEND_AUTH_BASE_URL}/api/account/login`,
                {
                    email: data.email,
                    password: data.password,
                }
            )

            if (response.data) {
                localStorage.setItem("user_token", response.data.token)
                toast.success('User successfully authenticated')
                await getCurrentUserRole()
            }


        } catch (e) {
            console.log("error", e)
            toast.error('Invalid username or password. Please try again')

        } finally {
            setLoadingLogin(false)
        }
    };

    const RegisterUser = async (data: z.infer<typeof registerSchema>) => {
        getSession()
        setLoadingRegister(true);

        try {
            const response = await axios.post(`${BACKEND_AUTH_BASE_URL}/api/account/register-test`,
                {
                    email: data.email,
                    password: data.password,
                    userName: data.username,
                    spotifyToken: token,
                    ClientUri: `${BACKEND_AUTH_BASE_URL}/confirmEmail`
                }
            )

            console.log(response?.data[0]?.description)
            if (response.data[0]?.code) {
                toast.error(response?.data[0]?.description)
            } else {
                RegisterForm.reset()
                toast.success('User Created')
            }


        } catch (e: unknown) {
            const err = e as AxiosError<{ title: string }>;
            if (err.response?.data?.title) {
                toast.error(err.response.data.title);
            } else {
                console.error("Unexpected error", err);
            }
        } finally {
            setLoadingRegister(false)
        }
    };
    const VerifyEmail=async ()=>{
        if (!currentUser?.id) {
            toast.error("Can't Verify Email");
            return;
        }

        toast.promise(
            axios.post(`${BACKEND_AUTH_BASE_URL}/api/account/SendAuthEmail`, {
                UserId: currentUser?.id,
                ClientUri: `${BACKEND_AUTH_BASE_URL}/confirmEmail`,
            }),
            {
                loading: "Sending verification link...",
                success: () => `Link sent to ${currentUser?.email}`,
                error: (err) =>
                    err?.response?.data?.message ||
                    "Failed to send verification link. Try again.",
            }
        );

    }
    useEffect(() => {
        getSession()
         getCurrentUserRole().then()
    }, []);
    return (
        <AuthContext.Provider value={{
            currentUser,
            loginWithSpotify,
            token,
            logout,
            loadingLogin,loadingRegister,
            LoginWithEmailPassword, RegisterUser, LoginForm, RegisterForm,VerifyEmail
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
