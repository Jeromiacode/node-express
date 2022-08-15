import { useState } from 'react';
import MessageView from '../../components/message-view/message-view';
import { useMessageSocketReceiver } from '../../websocket/message-websocket';

const MessageReceiver = () => {

    // State pour stocker les messages recus par SocketIO
    const [messages, setMessages] = useState([]);

    // Récuperation des messages via le hook custom
    useMessageSocketReceiver((msg) => {
        setMessages(messages => [...messages, msg]);
    });

    return (
        <div>
            <h2>Liste des messages :</h2>
            <MessageView messages={messages} />
        </div>
    );
};

export default MessageReceiver;
