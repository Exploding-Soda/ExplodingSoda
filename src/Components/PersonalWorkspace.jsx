import React, { useState } from 'react';
import DraggableWindow from './DraggableWindow';
import styles from './PersonalWorkspace.module.css';
import PropTypes from 'prop-types';

const Dock = ({ icons, onClickIcon }) => {
  console.log('Rendering Dock with icons:', icons);

  return (
    <div className={styles.dock}>
      {icons.map((icon, index) => (
        <React.Fragment key={icon.id}>
          {index > 0 && icons[index - 1].type === 'dynamic' && icon.type === 'fixed' && (
            <div className={styles.divider} />
          )}
          <a
            href={icon.url || "#"}
            onClick={(e) => {
              if (icon.url) {
                e.preventDefault();
                console.log('Opening new window for:', icon.url);
                window.open(icon.url, '_blank'); // Open URL in a new tab or window
              } else {
                e.preventDefault();
                console.log('Restoring window:', icon.id);
                onClickIcon(icon.id);
              }
            }}
            className={styles.dockItem}
          >
            <img src={icon.src} alt={`Icon for ${icon.id}`} />
          </a>
        </React.Fragment>
      ))}
    </div>
  );
};


Dock.propTypes = {
  icons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired,
      url: PropTypes.string,
      type: PropTypes.oneOf(['dynamic', 'fixed']).isRequired,
    })
  ).isRequired,
  onClickIcon: PropTypes.func.isRequired,
};

const PersonalWorkspace = () => {
  const [windows, setWindows] = useState({
    systemConfig: { minimized: false, icon: "./Images/MacConsole.png" },
    personalCard: { minimized: false, icon: "./Images/SafariIcon.png" },
  });

  const handleMinimize = (windowName) => {
    console.log(`Minimizing window: ${windowName}`);
    setWindows(prevWindows => {
      const updatedWindows = {
        ...prevWindows,
        [windowName]: { ...prevWindows[windowName], minimized: true }
      };
      console.log('Updated windows state after minimize:', updatedWindows);
      return updatedWindows;
    });
  };

  const handleRestore = (windowName) => {
    console.log(`Restoring window: ${windowName}`);
    setWindows(prevWindows => {
      const updatedWindows = {
        ...prevWindows,
        [windowName]: { ...prevWindows[windowName], minimized: false }
      };
      console.log('Updated windows state after restore:', updatedWindows);
      return updatedWindows;
    });
  };

  const fixedDockIcons = [
    { id: "website1", src: "./Images/Github.png", url: "https://github.com/Exploding-Soda", type: "fixed" },
    { id: "website2", src: "https://placehold.co/48", url: "https://example.com", type: "fixed" },
    { id: "website3", src: "https://placehold.co/48", url: "https://example.com", type: "fixed" },
  ];

  const dynamicDockIcons = Object.keys(windows)
    .filter(windowName => windows[windowName].minimized)
    .map(windowName => ({
      id: windowName,
      src: windows[windowName].icon,
      type: 'dynamic',
    }));

  const dockIcons = [...dynamicDockIcons, ...fixedDockIcons];
  
  console.log('Current dockIcons state:', dockIcons);

  return (
    <div className={styles.workspace}>
      {!windows.systemConfig.minimized && (
        <DraggableWindow 
          title="" 
          initialSize={{ width: window.innerWidth * 0.5, height: window.innerHeight * 0.5 }}
          positionType="top-left"
          onMinimize={() => handleMinimize('systemConfig')}
          onFocus={() => console.log('System Config window focused')}
          zIndex={1}
        >
          <div style={{ fontFamily: 'monospace', backgroundColor: '#1e1e1e', color: '#00ff00', padding: '10px' }}>
            <h2 style={{ borderBottom: '1px solid #00ff00' }}>[系统配置控制台]</h2>
            <section>
              <p>> 欢迎来到系统配置控制台。</p>
              <p>> 您正在查看本系统的核心信息：</p>
              <ul>
                <li>> <strong>个人简介</strong> - 了解我的背景、技能与经验。</li>
                <li>> <strong>项目展示</strong> - 探索我参与的项目和案例分析。</li>
                <li>> <strong>联系信息</strong> - 获取与我联系的方式。</li>
                <li>> <strong>相关链接</strong> - 访问与我相关的其他资源与平台。</li>
                <li>> <strong>交互式Chatbot</strong> - 启动聊天机器人以获取更多信息或帮助。</li>
              </ul>
            </section>
            <section>
              <p>> [提示]: 新内容和功能将陆续推出，敬请期待！</p>
            </section>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <p>> </p>
              <div style={{
                width: '10px',
                height: '20px',
                backgroundColor: '#00ff00',
                marginLeft: '5px',
                animation: 'blink 1s step-end infinite'
              }} />
            </div>
          </div>
          <style>
            {`
              @keyframes blink {
                from, to { opacity: 1; }
                50% { opacity: 0; }
              }
            `}
          </style>
        </DraggableWindow>
      )}

      {!windows.personalCard.minimized && (
        <DraggableWindow 
          title="" 
          initialSize={{ width: window.innerWidth * 0.5, height: window.innerHeight * 0.8 }}
          positionType="bottom-right"
          onMinimize={() => handleMinimize('personalCard')}
          onFocus={() => console.log('Personal Card window focused')}
          zIndex={1}
        >
          <PersonalCard />
        </DraggableWindow>
      )}

      <Dock 
        icons={dockIcons} 
        onClickIcon={handleRestore} 
      />
    </div>
  );
};

const PersonalCard = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg fade-in">
      <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-600">
        <img className="w-32 h-32 rounded-full border-4 border-white" src="./Images/Avatar.jpg" alt="Placeholder image of a person" />
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-800">Eason</h1>
        <p className="mt-4 text-gray-600">
          我是一名热衷于前端开发的工程师，拥有丰富的项目经验和技术背景，擅长使用Vue3、React以及Tailwind CSS等前端技术栈进行现代化、用户体验优先的Web应用开发。我对开源项目和自动化工具开发有着浓厚的兴趣，尤其是在AI驱动的应用场景中表现出色。
        </p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">框架 / 库</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-green-500 text-white px-2 py-1 rounded">Vue3</span>
            <span className="bg-blue-600 text-white px-2 py-1 rounded">React</span>
            <span className="bg-gray-600 text-white px-2 py-1 rounded">Tailwind CSS</span>
            <span className="bg-yellow-600 text-white px-2 py-1 rounded">JavaScript (ES6+)</span>
            <span className="bg-blue-500 text-white px-2 py-1 rounded">TypeScript</span>
            <span className="bg-gray-700 text-white px-2 py-1 rounded">Node.js & Express</span>
            <span className="bg-gray-600 text-white px-2 py-1 rounded">Flask & FastAPI</span>
            <span className="bg-blue-400 text-white px-2 py-1 rounded">OpenAI API & GPT Finetune</span>
            <span className="bg-gray-500 text-white px-2 py-1 rounded">Selenium & 自动化工具开发</span>
            <span className="bg-green-600 text-white px-2 py-1 rounded">MySQL & 向量数据库</span>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">AI</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded">Stable Diffusion</span>
            <span className="bg-purple-500 text-white px-2 py-1 rounded">Flux</span>
            <span className="bg-red-600 text-white px-2 py-1 rounded">SoVITs</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded">Torch</span>
            <span className="bg-green-600 text-white px-2 py-1 rounded">Data Mining</span>
            <span className="bg-green-500 text-white px-2 py-1 rounded">Machine Learning</span>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">掌握的语言</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-gray-600 text-white px-2 py-1 rounded">CSS3</span>
            <span className="bg-gray-600 text-white px-2 py-1 rounded">HTML5</span>
            <span className="bg-red-500 text-white px-2 py-1 rounded">NodeJS</span>
            <span className="bg-blue-500 text-white px-2 py-1 rounded">Python</span>
            <span className="bg-yellow-600 text-white px-2 py-1 rounded">JavaScript</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">一些其他的技能</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-gray-600 text-white px-2 py-1 rounded">日语: N1</span>
            <span className="bg-gray-600 text-white px-2 py-1 rounded">英语：CET-6</span>
            <span className="bg-gray-600 text-white px-2 py-1 rounded">Git</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">工作经历</h2>
          <p className="mt-2 text-gray-600">
            我在一家主要面向海外市场的公司担任前端开发工程师，负责与后端团队的紧密合作，确保产品开发的高效与顺畅。我熟悉敏捷开发流程，能够快速响应需求变化并持续交付高质量的代码。工作中，主要使用的语言为英语，这使得我能够在多语言和多文化的环境中自如地沟通和协作。
          </p>
          <p className="mt-2 text-gray-600">
            我的主要职责包括：
          </p>
          <ul className="mt-2 text-gray-600 list-disc list-inside">
            <li>与后端工程师合作，设计和实现高效的API接口。</li>
            <li>参与敏捷开发中的每日站会和迭代计划，确保项目按时交付。</li>
            <li>根据用户反馈和产品需求，快速迭代前端功能。</li>
            <li>维护并优化前端代码库，确保代码质量和可维护性。</li>
            <li>为团队提供技术支持，帮助解决前端相关的问题和挑战。</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">项目经验</h2>
          <ul className="mt-2 text-gray-600">
            <li>
              <strong>艺术管理系统：</strong> 负责前端开发与项目管理，使用Vue3、Vue Router、vite、elementUI和TypeScript进行开发，并通过CloudFlare部署。
            </li>
            <li>
              <strong>微信聊天机器人：</strong> 基于Wechaty、TypeScript、NodeJS和Python开发的自动化聊天机器人，并通过LangChain的概念扩展其功能。
            </li>
            <li>
              <strong>向量数据库：</strong> 使用Flask开放API端点，基于OpenAI的Embedding模型和Transformer模型实现的向量数据库，支持微信助手的知识库系统。
            </li>
            <li>
              <strong>候选人分析谷歌插件：</strong> 开发了用于分析候选人简历的谷歌插件，结合GPT和公司内部的数据集采集服务器实现高效的候选人匹配。
            </li>
            <li>
              <strong>自动化候选人匹配工具：</strong> 使用Selenium和pandas开发的自动化工具，帮助公司HR在招聘网站上快速筛选并分析候选人。
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800">教育背景</h2>
          <p className="mt-2 text-gray-600">上海杉达学院，软件工程，GPA：3.3 / 4 </p>
        </div>
      </div>
    </div>
  );
};


export default PersonalWorkspace;
