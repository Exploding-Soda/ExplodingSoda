import styles from './ProjectBrowser.module.css';

const projects = [
    { 
        id: 1, 
        name: 'yolov5-tensorrt-aimbot', 
        description: 'A Yolov5 based object detection project', 
        image: './Images/Project1.png', 
        alt: 'A folder icon representing design files',
        link: 'https://github.com/Exploding-Soda/yolov5-tensorrt-aimbot'
    },
    { 
        id: 2, 
        name: 'Vector Database', 
        description: 'Contrary to traditional databases, the key of each entry is a vector', 
        image: './Images/Project2.png', 
        alt: 'A folder icon representing code repository',
        link: 'https://github.com/Exploding-Soda/Simple-Python-Vector-Database'
    },
    { 
        id: 3, 
        name: 'Chatbot Front End Page', 
        description: 'A Frontend Interface for my Chatbot', 
        image: './Images/Project4.png', 
        alt: 'A folder icon representing media resources',
        link: './MacOS_Style_Chatbot_Offline.html'
    },
    { 
        id: 4, 
        name: 'Vue-ChatGPT', 
        description: 'A page where you can chat with GPTs through APIs', 
        image: './Images/Project3.png', 
        alt: 'A folder icon representing media resources',
        link: 'https://github.com/Exploding-Soda/Chatweb'
    },
    { 
        id: 5, 
        name: 'bilibili-subtitle-uploader', 
        description: 'A Chrome extension that allows you to upload & display your own subtitle', 
        image: './Images/Project4.png', 
        alt: 'A folder icon representing media resources',
        link: 'https://github.com/Exploding-Soda/bilibili-subtitle-uploader'
    }
    // Add more projects here as needed
];

function ProjectBrowser() {
    return (
        <div className={styles.fullScreen}>
            <div className={styles.window}>
                <div className={styles.windowHeader}>
                    <div className={styles.windowButtons}>
                        <div className={styles.windowButton}></div>
                        <div className={styles.windowButton}></div>
                        <div className={styles.windowButton}></div>
                    </div>
                    <div className={styles.windowTitle}>Projects</div>
                </div>
                <div className={styles.content}>
                    {projects.map(project => (
                        <a key={project.id} href={project.link} target="_blank" rel="noopener noreferrer" className={styles.projectItem}>
                            <img src={project.image} alt={project.alt} className={styles.projectImage} />
                            <div className={styles.projectContent}>
                                <div className={styles.projectTitle}>{project.name}</div>
                                <div className={styles.projectDescription}>{project.description}</div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default ProjectBrowser;
