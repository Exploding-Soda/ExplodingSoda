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

    return (
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
    );
}

export default App;

                    // <div>
                    //     <AlternativeComponent />
                    // </div>
