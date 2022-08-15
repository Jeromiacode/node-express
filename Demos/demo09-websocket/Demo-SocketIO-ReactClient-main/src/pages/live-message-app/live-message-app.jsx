import { nanoid } from 'nanoid';
import { useState } from 'react';
import MessageGroup from '../../containers/message-group/message-group';
import MessageReceiver from '../../containers/message-receiver/message-receiver';
import MessageSender from '../../containers/message-sender/message-sender';
import { MessageSocketProvider } from '../../websocket/message-websocket';

const LiveMessageApp = () => {

    // Utilisation du "Provider" customiser pour interagir avec SocketIO 
    const [fakeToken] = useState(nanoid(5).toUpperCase());

    return (<>
        <h1>Chat Box (UserId: {fakeToken})</h1>
        <MessageSocketProvider token={fakeToken}>
            <MessageSender />
            <MessageGroup />
            <MessageReceiver />
        </MessageSocketProvider>
    </>);
};

export default LiveMessageApp;