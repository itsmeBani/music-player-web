import {createBrowserRouter, RouterProvider} from "react-router";

import './App.css'
import {LibraryLayout, RootLayout} from "@/pages/RootLayout.tsx";
import Home from "@/pages/home.tsx";
import Login from "@/pages/login.tsx";
import Register from "@/pages/register.tsx";
import Play from "@/pages/play.tsx";
import Library from "@/pages/library.tsx";

import ProtectedComponent from "@/feature/ProtectedComponent.tsx";

import PublicComponent from "@/feature/publicComponent.tsx";
import GetStarted from "@/pages/getStarted.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import PlaylistTracks from "@/pages/PlaylistTracks.tsx";
import TopArtist from "@/pages/topArtist.tsx";
import ArtistAlbum from "@/pages/ArtistAlbum.tsx";
import ManageUsers from "@/pages/ManageUsers.tsx";
import NotFoundPage from "@/pages/NotFoundPage.tsx";


function App() {


    const router = createBrowserRouter([
        {
            path: "/",
            element: <ProtectedComponent><RootLayout/></ProtectedComponent>,
            errorElement:<NotFoundPage/>,
            children: [
                {
                    path: "/",
                    element: <Home/>,
                },
                {
                    path: "/top-artist/:artistID",
                    element: <TopArtist/>,
                },
                {
                    path: "/top-artist/:artistID/album/:albumID",
                    element: <ArtistAlbum/>,
                },
                {
                    path: "/play",
                    element: <Play/>,
                }, {
                    path: "/library",
                    element: <LibraryLayout/>,
                    children: [
                        {
                            path: "",
                            element: <Library/>

                        },
                        {
                            path: "playlist/:PlaylistID",
                            element:<PlaylistTracks/>

                        }
                    ]
                },
                {
                    path:"/users",
                    element :<ManageUsers/>,
                }
            ]
        },
        {
            path: "/login",
            element: <PublicComponent><Login/></PublicComponent>,
            errorElement:<NotFoundPage/>,
        },
        {
            path: "/register",
            element: <PublicComponent><Register/></PublicComponent>,
            errorElement:<NotFoundPage/>,
        }, {
            path: "/getStarted",
            element: <GetStarted/>,
            errorElement:<NotFoundPage/>,
        }
    ])

    const queryCLient = new QueryClient()
    return (
        <QueryClientProvider client={queryCLient}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    )
}

export default App
