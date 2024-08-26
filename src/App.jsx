import { useEffect } from 'react';
import LockScreen from './Components/LockScreen';
import PersonalWorkspace from './Components/PersonalWorkspace';
import ProjectBrowser from './Components/ProjectBrowser';
import AlternativeComponent from './Components/AlternativeComponent';
import './App.css';

function App() {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            const positionX = (mouseX - 0.5) * 20;
            const positionY = (mouseY - 0.5) * 20;

            document.body.style.setProperty('--background-position-x', `${50 + positionX}%`);
            document.body.style.setProperty('--background-position-y', `${50 + positionY}%`);
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const backgroundStyle = {
        background: 'linear-gradient(135deg, rgba(58, 123, 213, 0.8), rgba(0, 210, 255, 0.8)), url("/Images/Background.png")',
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
        backgroundPosition: 'var(--background-position-x, center) var(--background-position-y, center)',
        transition: 'background-position 0.1s ease',
        height: '100vh',
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
    };

    return (
        <div style={backgroundStyle}>
            <div className="app-container">
                <div className="section">
                    <LockScreen />
                </div>
                <div className="section">
                    <PersonalWorkspace />
                </div>
                <div className="section">
                    <ProjectBrowser />
                </div>
                <div className="section">
                    <AlternativeComponent />
                </div>
            </div>
        </div>
    );
}

export default App;