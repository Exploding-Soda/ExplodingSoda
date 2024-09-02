import { useEffect, useState } from "react";

const AlternativeComponent = () => {
    const [serverOnline, setServerOnline] = useState(false);

    useEffect(() => {
        // 尝试ping服务器
        fetch("https://cn-sz-yd-plustmp2.natfrp.cloud:43049", { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    setServerOnline(true);
                } else {
                    setServerOnline(false);
                }
            })
            .catch(error => {
                setServerOnline(false);
            });
    }, []);

    return (
        <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-center p-4 macos-background">
            <div className="colorful-background"></div>

            {/* Shapes in the background */}
            <div className="shape circle shape-1"></div>
            <div className="shape square shape-2"></div>
            <div className="shape triangle shape-3"></div>
            <div className="shape circle shape-4"></div>

            {/* Content Container */}
            <div className="macos-window bg-white w-full max-w-4xl mx-auto relative mt-24">
                <div className="macos-titlebar flex items-center justify-between p-2">
                    <div className="flex space-x-2 ml-2">
                        <div className="buttons close"></div>
                        <div className="buttons minimize"></div>
                        <div className="buttons maximize"></div>
                    </div>
                    <div className="w-12"></div>
                </div>

                {/* Page Content */}
                <div className="page-content-container h-[600px] flex flex-col justify-center items-center p-4">
                    {serverOnline ? (
                        <div className="text-container max-w-2xl">
                            <a 
                                href="https://cn-sz-yd-plustmp2.natfrp.cloud:43049" 
                                className="text-blue-600 underline mb-4"
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Visit the project website
                            </a>

                            <p className="text-gray-800 text-center text-lg mb-4">
                                About the Chatbot Project
                            </p>
                            <p className="text-gray-600 text-center mb-8">
                                This is an advanced chatbot project that integrates a custom Agent, designed to operate both on WeChat and via a web interface, with synchronized conversation history across both platforms. The core Agent is built from the ground up, enabling it to leverage Python automation tools, which means it can perform tasks that other AI assistants simply cannot. Unlike traditional AI assistants that are limited to providing responses, this Agent can utilize your computer's resources to execute complex tasks—provided these tasks are pre-defined in Python automation scripts.
                            </p>
                            <p className="text-gray-600 text-center mb-8">
                                What sets this chatbot apart is its ability to autonomously decide which script best suits a given task. It uses SoM (Set of Marks) to interact with the computer just like a human would, even managing to solve basic captchas. This makes the system incredibly versatile, requiring only Python automation expertise to expand its capabilities.
                            </p>
                            <p className="text-gray-600 text-center mb-8">
                                Key features include web queries, daily weather updates via WeChat, automated Weibo browsing, a Constitution assistant powered by a vector database, and summarization of Bilibili video content. This combination of features makes it a powerful tool for automation and AI-driven tasks that go beyond the capabilities of standard AI assistants.
                            </p>
                            <p className="text-gray-600 text-center mb-8">
                                However due to server resource limitations and the cost of large models, I cannot trust everyone to use my server without restriction. Therefore only the "Find News" function of Agent is open to the public in this web demo. All functions are available via WeChat. I'll prabably put a QR code on this demo website in the future, but for now you can use the following key to give the demo a try:
                                "Eason"
                            </p>
                        </div>
                    ) : (
                        <div className="text-container max-w-2xl text-center">
                            <p className="text-red-600 text-lg mb-4">
                                Chatbot Server Offline
                            </p>
                            <p className="text-gray-600 text-center mb-8">
                                Come back and check later
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="cursor-effect"></div>
        </div>
    );
};

export default AlternativeComponent;
