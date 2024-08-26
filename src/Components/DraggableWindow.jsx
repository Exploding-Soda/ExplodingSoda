import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './DraggableWindow.module.css';

const DraggableWindow = ({ children, title, initialPosition, initialSize, positionType, zIndex, onFocus, onMinimize, minimizing }) => {
    const windowRef = useRef(null);
    const [position, setPosition] = useState(calculateInitialPosition());
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState(initialSize);

    useEffect(() => {
        if (minimizing) {
            const dock = document.querySelector(`.${styles.dock}`);
            const dockRect = dock.getBoundingClientRect();
            const windowRect = windowRef.current.getBoundingClientRect();
            const translateX = dockRect.left - windowRect.left;
            const translateY = dockRect.top - windowRect.top;
            
            windowRef.current.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.1)`;
            windowRef.current.style.opacity = '0';
        }
    }, [minimizing]);

    const MIN_WIDTH = 200;
    const MIN_HEIGHT = 150;

    function calculateInitialPosition() {
        let xPos = initialPosition.x;
        let yPos = initialPosition.y;

        if (positionType === 'bottom-left') {
            xPos = 100;
            yPos = window.innerHeight - initialSize.height - 100;
        } else if (positionType === 'top-right') {
            xPos = window.innerWidth - initialSize.width - 100;
            yPos = 100;
        } else if (positionType === 'top-left') {
            xPos = 100;
            yPos = 100;
        } else if (positionType === 'bottom-right') {
            xPos = window.innerWidth - initialSize.width - 100;
            yPos = window.innerHeight - initialSize.height - 100;
        }

        return { x: xPos, y: yPos };
    }

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDragging) {
                setPosition({
                    x: e.clientX - offset.x,
                    y: e.clientY - offset.y,
                });
            } else if (isResizing) {
                const newWidth = e.clientX - position.x;
                const newHeight = e.clientY - position.y;

                if (newWidth > MIN_WIDTH && newHeight > MIN_HEIGHT) {
                    setSize({
                        width: newWidth,
                        height: newHeight,
                    });
                }
            }
        };

        const handleMouseUp = () => {
            if (isDragging) setIsDragging(false);
            if (isResizing) setIsResizing(false);
        };

        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, offset, position]);

    const handleHeaderMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        onFocus(); // Call the onFocus function passed from the parent
    };

    const handleResizeMouseDown = (e) => {
        setIsResizing(true);
        e.stopPropagation(); // Prevent triggering drag
    };

    return (
        <div
            ref={windowRef}
            className={`${styles.window} ${minimizing ? styles.minimizing : ''}`}
            style={{
                top: `${position.y}px`,
                left: `${position.x}px`,
                width: `${size.width}px`,
                height: `${size.height}px`,
                zIndex: zIndex,
                transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out'
            }}
            onMouseDown={(e) => e.stopPropagation()} // Prevent drag on content click
        >
            <div className={styles.header} onMouseDown={handleHeaderMouseDown}>
                <div className={styles.buttons}>
                    <div className={`${styles.button} ${styles.close}`} onClick={onMinimize}></div>
                    <div className={`${styles.button} ${styles.minimize}`} onClick={onMinimize}></div>
                    <div className={`${styles.button} ${styles.maximize}`}></div>
                </div>
                <div>{title}</div>
            </div>
            <div className={styles.content}>{children}</div>
            <div
                className={styles.resizeHandle}
                onMouseDown={handleResizeMouseDown}
            ></div>
        </div>
    );
};

DraggableWindow.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    initialPosition: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    initialSize: PropTypes.shape({
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    }).isRequired,
    positionType: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right', 'custom']),
    zIndex: PropTypes.number.isRequired,
    onFocus: PropTypes.func.isRequired,
    onMinimize: PropTypes.func.isRequired, // Add onMinimize prop
    minimizing: PropTypes.bool, // Add minimizing prop to trigger animation
};

DraggableWindow.defaultProps = {
    initialPosition: { x: 0, y: 0 },
    initialSize: { width: 600, height: 400 },
    positionType: 'custom',
};

export default DraggableWindow;
