import { useId, useState } from 'react';
import { useMessageSocketSender } from '../../websocket/message-websocket';

const MessageSender = () => {

    // State pour manipuler le formulaire
    const [message, setMessage] = useState('');

    // Génération d'un identifiant pour les elements HTML (Nouveauté de React 18)
    const idForm = useId();

    // Récuperation de la méthode pour envoyer des message via le hook custom
    const sendMessage = useMessageSocketSender();

    // Action sur le submit du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    };

    return (
        <div>
            <h2>Envoyer un message :</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor={idForm + "_message"}>Message : </label>
                <input id={idForm + "_message"} value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit">Envoyer</button>
            </form>
        </div>
    );
};

export default MessageSender;