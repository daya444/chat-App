import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./authcontext";
import io from 'socket.io-client';

export const socketContext = createContext();

export const useSocketContext = () => {
    return useContext(socketContext);
}

export const SocketContextProvider = ({ children }) => {

    const [socket, setSocket] = useState(null);
    const [onLineUser, setOnLineUser] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            // Create a new socket connection
            const newSocket = io('http://localhost:8000', {
                query: {
                    userId: authUser._id
                }
            });

            // Set the socket state
            setSocket(newSocket);

            // Set up the event listener on the newly created socket
            newSocket.on('getOnlineUser', (user) => {
                setOnLineUser(user);
            });

            // Cleanup the socket connection on component unmount or when authUser changes
            return () => {
                newSocket.close();
            };
        } else {
            // If there is no authenticated user, close the existing socket and reset the state
            if (socket) {
                socket.close();
            }
            setSocket(null);
        }
    }, [authUser]); // Removed socket from dependencies

    return (
        <socketContext.Provider value={{ socket, onLineUser }}>
            {children}
        </socketContext.Provider>
    );
};
