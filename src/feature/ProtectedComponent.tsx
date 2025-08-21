import {type ReactNode,} from 'react';
import {useAuth} from "../context/AuthProvider.tsx";

import {Navigate} from "react-router";
interface ProtectedComponentProps {
    children: ReactNode;
}
function ProtectedComponent({children}: ProtectedComponentProps) {
    const {token, currentUser} = useAuth()

    if (token === undefined || currentUser === undefined) return <p>loading</p>
    if (token === null) return <Navigate to={"/getStarted"} replace={true}/>
    if (currentUser === null) return <Navigate to={"/login"} replace={true}/>
    if (token && currentUser) return children

}

export default ProtectedComponent;
