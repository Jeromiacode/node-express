
const MessageView = ({ messages }) => {

    const messagesJSX = messages.map(
        (message, index) => <p key={index}>{message}</p>
    );

    return (
        <section>
            {messagesJSX}
        </section>
    );
};

MessageView.defaultProps = {
    messages: []
};

export default MessageView;