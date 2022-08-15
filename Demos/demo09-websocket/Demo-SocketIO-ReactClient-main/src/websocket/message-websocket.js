import React, { useContext, useEffect, useState } from 'react';
import { io } from "socket.io-client";

// Création d'un context
// -> Stockage de l'instance de SocketIO
const MessageSocketContext = React.createContext();

// Création d'un "Provider" pour notre utilisation de SocketIO
export const MessageSocketProvider = ({ uri, token: userToken, loadingComponent, children }) => {

    // Stockage interne (via le state) de l'instance de connection à SocketIO
    const [socket, setSocket] = useState();

    useEffect(() => {
        // Configuration de SocketIO
        const socketIO = io("127.0.0.1:4224", {
            reconnectionDelayMax: 10000,
            auth: {
                token: userToken
            }
        });

        // Etablissement de la connection de SocketIO
        setSocket(socketIO.connect());
        console.log('Open Socket');

        return () => {
            // Déconnection de SocketIO
            socketIO.disconnect();
            console.log('Close Socket');
        };
    }, []);

    return (
        // Utilisation du "Provider" du Context pour diffusé le context
        <MessageSocketContext.Provider value={socket}>
            {!socket ? (
                loadingComponent
            ) : (
                children
            )}
        </MessageSocketContext.Provider>
    );
};

MessageSocketProvider.defaultProps = {
    loadingComponent: <div>Connection to WebSocket</div>
};

// Création d'un "Hook" pour s'abonner au message envoyé via SocketIO
export const useMessageSocketReceiver = (onMessage) => {

    // Récuperation de l'instance de SocketIO via le context
    const socket = useContext(MessageSocketContext);

    useEffect(() => {
        // Abonnement à l'event "message"
        socket.on('message', onMessage);

        return () => {
            // Désabonnement à l'event "message"
            socket.off('message');
        };
    }, []);
};

// Création d'un "Hook" pour envoyer des messages via SocketIO
export const useMessageSocketSender = () => {

    // Récuperation de l'instance de SocketIO via le context
    const socket = useContext(MessageSocketContext);

    // Création d'un fonction pour déclancher l'envoie de message via SocketIO
    const sendMessage = (msg) => {
        socket.emit("message", msg);
    };

    return sendMessage;
};

// Création d'un "Hook" pour envoyer des messages via SocketIO
export const useGroupSocketAction = () => {

    // Récuperation de l'instance de SocketIO via le context
    const socket = useContext(MessageSocketContext);

    // Création d'un fonction pour déclancher les actions de groupe via SocketIO
    const sendMessageGroup = (group, msg) => {
        socket.emit("groupMessage", group.toUpperCase(), msg);
    };

    const joinGroup = (group) => {
        socket.emit("groupJoin", group.toUpperCase());
    };

    const leaveGroup = (group) => {
        socket.emit("groupLeave", group.toUpperCase());
    };

    return { sendMessageGroup, joinGroup, leaveGroup };
};
