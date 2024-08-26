import { useState, useEffect, useRef } from 'react';

const App = () => {
  const [currentTarget, setCurrentTarget] = useState('home');
  const [backgroundImage, setBackgroundImage] = useState('');
  const cursorEffectRef = useRef(null);
  const contentRef = useRef(null);
  const ellipsisDivRef = useRef(null);
  const wsRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [systemMessages, setSystemMessages] = useState([]);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:3002');

    wsRef.current.onopen = () => {
      console.log('Connected to the server');
    };

    wsRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => {
        if (ellipsisDivRef.current) {
          const updatedMessages = prevMessages.slice(0, -1);
          ellipsisDivRef.current = null;
          return updatedMessages;
        }
        if (data.type === 'chat' && data.response) {
          return [
            ...prevMessages,
            { type: 'chat', content: data.response, from: 'Bot' },
          ];
        }
        if (data.type === 'system' && data.message) {
          const timeoutId = setTimeout(() => {
            setSystemMessages((prevSystemMessages) =>
              prevSystemMessages.filter((msg) => msg.id !== data.id)
            );
          }, 10000);
          return [
            ...prevMessages,
            { type: 'system', content: data.message, timeoutId },
          ];
        }
        if (data.error) {
          return [...prevMessages, { type: 'error', content: data.error }];
        }
        return prevMessages;
      });
    };

    wsRef.current.onclose = () => {
      console.log('Disconnected from the server');
    };

    return () => {
      wsRef.current.close();
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const offsetX = 10;
      const offsetY = 10;
      if (cursorEffectRef.current) {
        cursorEffectRef.current.style.left = `${e.clientX - offsetX}px`;
        cursorEffectRef.current.style.top = `${e.clientY - offsetY}px`;
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBackgroundImage(`url(${e.target.result})`);
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = (userMessage) => {
    if (!userMessage.trim()) {
      alert('Please enter a message.');
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      { type: 'chat', content: userMessage, from: 'You' },
    ]);

    ellipsisDivRef.current = { type: 'ellipsis' };
    setMessages((prevMessages) => [...prevMessages, ellipsisDivRef.current]);

    wsRef.current.send(
      JSON.stringify({
        userId: 'User123',
        message: userMessage,
      })
    );
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage(e.target.value);
      e.target.value = '';
    }
  };

  const handleClose = () => {
    if (contentRef.current) {
      contentRef.current.classList.add('fade-out');
      setTimeout(() => {
        contentRef.current.style.display = 'none';
      }, 500);
    }
  };

  const handleNavClick = (target) => {
    setCurrentTarget(target);
    contentRef.current.classList.remove('fade-out');
    contentRef.current.classList.add('fade-in');
    contentRef.current.style.display = 'block';
  };

  return (
    <div
      className={`bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4 ${
        backgroundImage ? '' : 'macos-background'
      }`}
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!backgroundImage && <div className="colorful-background"></div>}

      <div className="shape circle shape-1"></div>
      <div className="shape square shape-2"></div>
      <div className="shape triangle shape-3"></div>
      <div className="shape circle shape-4"></div>

      <header id="header" className="w-full max-w-4xl fixed top-0 left-0 p-4">
        <nav className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
          <div className="flex space-x-4">
            <a
              href="#"
              className="nav-link text-gray-700 font-medium hover:text-blue-500 transition duration-300"
              onClick={() => handleNavClick('home')}
            >
              Home
            </a>
            <a
              href="#"
              className="nav-link text-gray-700 font-medium hover:text-blue-500 transition duration-300"
              onClick={() => handleNavClick('diagram')}
            >
              Diagram
            </a>
            <a
              href="#"
              className="nav-link text-gray-700 font-medium hover:text-blue-500 transition duration-300"
              onClick={() => handleNavClick('about')}
            >
              About
            </a>
          </div>
          <button
            id="backgroundButton"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => document.getElementById('backgroundInput').click()}
          >
            Select Background
          </button>
          <input
            type="file"
            id="backgroundInput"
            className="hidden"
            accept="image/*"
            onChange={handleBackgroundChange}
          />
        </nav>
      </header>

      <div
        id="content"
        className="macos-window bg-white w-full max-w-4xl mx-auto relative"
        style={{ position: 'absolute' }}
        ref={contentRef}
      >
        <div className="macos-titlebar flex items-center justify-between p-2">
          <div className="flex space-x-2 ml-2">
            <div className="buttons close" onClick={handleClose}></div>
            <div className="buttons minimize"></div>
            <div className="buttons maximize"></div>
          </div>
          <div className="text-center flex-1">
            <span className="text-gray-700 font-medium">Chatbot</span>
          </div>
          <div className="w-12"></div>
        </div>

        <div className="page-content-container h-[600px]">
          <div
            id="home"
            className={`page-content flex flex-col md:flex-row h-full ${
              currentTarget === 'home' ? '' : 'hidden'
            }`}
          >
            <div className="message-area flex-1 p-4 border-r border-gray-200 flex flex-col justify-between">
              <div className="messages space-y-4 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message fade-in p-3 rounded-lg ${
                      message.type === 'chat'
                        ? message.from === 'You'
                          ? 'bg-gray-100 self-start'
                          : 'bg-blue-100 self-end'
                        : 'bg-red-100'
                    }`}
                  >
                    <p
                      className={`text-gray-800 ${
                        message.type === 'chat' ? '' : 'text-red-800'
                      }`}
                    >
                      <strong>{message.from || 'Error'}:</strong>{' '}
                      {message.content}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Type a message..."
                  onKeyDown={handleInputKeyDown}
                />
              </div>
            </div>
            <div className="system-message-area w-full md:w-1/3 p-4 bg-gray-50 overflow-y-auto">
              {systemMessages.map((message) => (
                <div
                  key={message.id}
                  className="system-message fade-in bg-gray-200 p-3 rounded-lg"
                >
                  <p className="text-gray-800">
                    <strong>System:</strong> {message.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            id="diagram"
            className={`page-content hidden p-4 ${
              currentTarget === 'diagram' ? '' : 'hidden'
            }`}
          >
            <p className="text-gray-800">This is the Diagram page content.</p>
          </div>
          <div
            id="about"
            className={`page-content hidden p-4 ${
              currentTarget === 'about' ? '' : 'hidden'
            }`}
          >
            <p className="text-gray-800">This is the About page content.</p>
          </div>
        </div>
      </div>

      <div className="cursor-effect" id="cursorEffect" ref={cursorEffectRef}></div>
    </div>
  );
};

export default App;
