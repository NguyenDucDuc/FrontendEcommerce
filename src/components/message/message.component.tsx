import { time } from 'console';
import './message.style.scss'

interface IProps {
    isRight?: boolean;
    content: string;
    time: string;
}

export const MessageSender: React.FC<IProps> = ({ isRight, content, time }) => {
    const date = time.split('T')[0]
    const newTime = time.split('T')[1].split('.')[0]
    return (
        <div className='message-sender-wrap'>
            <p style={{ color: '#bfbfbf' }} className='time'>{date} {newTime}</p>
            <div className='message-sender'>
                <p>{content}</p>
            </div>
        </div>

    )
}