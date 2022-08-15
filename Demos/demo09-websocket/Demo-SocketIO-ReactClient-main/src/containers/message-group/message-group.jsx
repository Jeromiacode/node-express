import { useId, useState } from 'react';
import { useGroupSocketAction } from '../../websocket/message-websocket';

const MessageGroup = () => {

    // State pour manipuler le formulaire
    const [group, setGroup] = useState('');
    const [isLog, setLog] = useState(false);
    const [message, setMessage] = useState('');

    // Génération d'un identifiant pour les elements HTML (Nouveauté de React 18)
    const idForm = useId();

    // Récuperation de la méthode pour envoyer des message via le hook custom
    const { joinGroup, leaveGroup, sendMessageGroup } = useGroupSocketAction();

    // Action lier au groupe
    const handleJoinGroup = (e) => {
        e.preventDefault();
        joinGroup(group);
        setLog(true);
    };

    const handleLeaveGroup = () => {
        leaveGroup(group);
        setGroup('');
        setLog(false);
    };

    // Action sur le submit du formulaire
    const handleSendMsg = (e) => {
        e.preventDefault();
        sendMessageGroup(group, message);
        setMessage('');
    };

    return (
        <div>
            <h2>Envoyer un message dans un groupe :</h2>
            <form onSubmit={handleJoinGroup}>
                <label htmlFor={idForm + "_groupe"}>Groupe : </label>
                <input id={idForm + "_groupe"} disabled={isLog}
                    value={group} onChange={(e) => setGroup(e.target.value)} />
                <button type='submit' disabled={isLog} >Join</button>
                <button type='button' disabled={!isLog} onClick={handleLeaveGroup}>Leave</button>
            </form>
            {isLog && (
                <form onSubmit={handleSendMsg}>
                    <label htmlFor={idForm + "_message"}>Message : </label>
                    <input id={idForm + "_message"}
                        value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button type="submit">Envoyer</button>
                </form>
            )}
        </div>
    );
};

export default MessageGroup;