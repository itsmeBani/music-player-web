
import {type ReactNode,} from 'react';

import {useAuth} from "@/context/AuthProvider.tsx";
import {Navigate} from "react-router";




interface ProtectedComponentProps {
    children: ReactNode;
}


function ProtectedRoute({ children }: ProtectedComponentProps) {
   const {currentUser,token}=useAuth()
    if (token && currentUser) return <Navigate to={"/"}/>
    if (!currentUser || !token) return children
}

export default ProtectedRoute;
