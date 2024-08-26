import { useState, useEffect } from 'react';
import './LockScreenStyle.css';

const LockScreen = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const formattedDate = currentTime.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="lock-screen">
            <div className="date">{formattedDate}</div>
            <div className="time">{formattedTime}</div>
            <div className="user-info">
                <p>Easons Mac</p>
                <br></br>
                <img src="./Images/Avatar.jpg" alt="User profile picture" />
                <p>Eason King</p>
            </div>
            <div className="status-bar">
                <div className="battery">
                    <i className="fas fa-battery-three-quarters"></i>
                    <span>89%</span>
                </div>
                <i className="fas fa-power-off"></i>
            </div>
            <div className="scroll-down">Scroll Down</div> {/* 新增的部分 */}
        </div>
    );
    
}

export default LockScreen;
