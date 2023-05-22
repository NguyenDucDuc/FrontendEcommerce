import "./message.style.scss"


interface IProps {
    content: string;
    time: string;
}

export const MessageReceiver: React.FC<IProps> = ({ content, time }) => {
    const date = time.split('T')[0]
    const newTime = time.split('T')[1].split('.')[0]
    return (
        <div className="message-receiver-wrap">
            <p style={{ color: '#bfbfbf' }} className="time">{date} {newTime}</p>
            <div className="message-receiver">
                <p>{content}</p>
            </div>
        </div>
    )
}