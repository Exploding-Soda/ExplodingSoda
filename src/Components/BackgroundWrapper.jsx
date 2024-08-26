import PropTypes from 'prop-types';

const BackgroundWrapper = ({ children }) => {
    const backgroundStyle = {
        margin: '0',
        padding: '0',
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(135deg, rgba(58, 123, 213, 0.8), rgba(0, 210, 255, 0.8)), url(./Images/Background.png)',
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
        backgroundPosition: 'var(--background-position-x, center) var(--background-position-y, center)',
        transition: 'background-position 0.1s ease',
        height: '100vh',
    };

    return (
        <div style={backgroundStyle}>
            {children}
        </div>
    );
};

BackgroundWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BackgroundWrapper;
