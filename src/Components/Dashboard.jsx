import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Dashboard.module.css'; // Optional: For custom styles

// 注册Chart.js所需的组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Sidebar = () => (
  <div className="w-64 bg-gray-800 p-4 bg-opacity-90">
    <h2 className="text-xl font-bold mb-4">Servers</h2>
    <ul>
      <li className="p-2 bg-gray-700 rounded mb-2">Ser6 Vest Pro (Server)</li>
    </ul>
  </div>
);

const Header = () => (
  <header className="bg-gray-800 p-4 flex justify-between items-center bg-opacity-90">
    <h1 className="text-2xl font-bold">Server Status Dashboard</h1>
  </header>
);

const Chart = ({ type, title, data, options }) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={options} />;
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md bg-opacity-90">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {renderChart()}
    </div>
  );
};

Chart.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  options: PropTypes.object,
};

const ServerLocation = () => {
  useEffect(() => {
    const map = L.map('map').setView([31.2304, 121.4737], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);
    L.marker([31.2304, 121.4737]).addTo(map)
      .bindPopup('Server is located here in Shanghai.')
      .openPopup();
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md bg-opacity-90">
      <h3 className="text-lg font-semibold mb-2">Server Location - Shanghai</h3>
      <div id="map" style={{ height: '300px', width: '100%' }}></div>
    </div>
  );
};




const Dashboard = () => {
  // 数据
  const lineChartData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Server Uptime (%)',
        data: (() => {
          // 基于时间戳生成稳定的伪随机数
          function seededRandom(seed) {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
          }
  
          // 生成稳定的随机浮动数值
          function generateStableRandomValues(base, variance, seedOffset, count) {
            const timestamp = new Date().getTime();
            return Array.from({ length: count }, (_, i) => {
              const seed = timestamp + i + seedOffset;
              return base + seededRandom(seed) * variance * 2 - variance;
            });
          }
  
          // 周一至周五在25%-35%范围内浮动，周末在1%-5%范围内浮动
          return generateStableRandomValues(30, 5, 100, 5).concat(generateStableRandomValues(3, 2, 200, 2));
        })(),
        borderColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };
  

  const barChartData = {
    labels: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    datasets: [
      {
        label: 'Server Load',
        data: (() => {
          // 服务器负载在11点到20点之间随机变化
          function seededRandom(seed) {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
          }
  
          function generateStableRandomValues(base, variance, seedOffset, count) {
            const timestamp = new Date().getTime();
            return Array.from({ length: count }, (_, i) => {
              const seed = timestamp + i + seedOffset;
              return base + seededRandom(seed) * variance * 2 - variance;
            });
          }
  
          return generateStableRandomValues(15, 10, 300, 10); // 负载值在5-25%之间浮动
        })(),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };
  
  const pieChartData = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        data: (() => {
          // 硬盘使用情况，23%已用
          const usedPercentage = 23;
          return [usedPercentage, 100 - usedPercentage];
        })(),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };
  
  const networkTrafficData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Network Traffic (%)',
        data: (() => {
          // 网络流量在1%-10%之间浮动
          function seededRandom(seed) {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
          }
  
          function generateStableRandomValues(base, variance, seedOffset, count) {
            const timestamp = new Date().getTime();
            return Array.from({ length: count }, (_, i) => {
              const seed = timestamp + i + seedOffset;
              return base + seededRandom(seed) * variance * 2 - variance;
            });
          }
  
          return generateStableRandomValues(5, 4, 400, 7); // 网络流量数据
        })(),
        borderColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };
  
  const cpuUsageData = {
    labels: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'],
    datasets: [
      {
        label: 'CPU Usage (%)',
        data: (() => {
          // CPU使用情况，在线时在10%左右，偶尔50%
          function seededRandom(seed) {
            const x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
          }
  
          function generateStableRandomValues(base, variance, seedOffset, count, spike = false) {
            const timestamp = new Date().getTime();
            return Array.from({ length: count }, (_, i) => {
              const seed = timestamp + i + seedOffset;
              const value = base + seededRandom(seed) * variance * 2 - variance;
              return spike && i === 8 ? 50 : value; // 第9个数据点偶尔出现50%使用率的峰值
            });
          }
  
          return generateStableRandomValues(10, 5, 500, 10, true); // CPU使用情况
        })(),
        borderColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };
  

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white', // 设置图例文字颜色为白色
        },
      },
      title: {
        display: true,
        color: 'white', // 设置标题颜色为白色
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // 设置X轴刻度文字颜色为白色
        },
      },
      y: {
        ticks: {
          color: 'white', // 设置Y轴刻度文字颜色为白色
        },
      },
    },
  };

  return (
    <div className="bg-black bg-opacity-90 text-white flex flex-col md:flex-row h-full w-full max-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Chart type="line" title="Server Uptime (Last 7 Days)" data={lineChartData} options={chartOptions} />
          <Chart type="bar" title="Server Load (11:00 - 20:00)" data={barChartData} options={chartOptions} />
          <Chart type="line" title="Network Traffic (Last 7 Days)" data={networkTrafficData} options={chartOptions} />
          <Chart type="pie" title="Disk Usage" data={pieChartData} options={chartOptions} />
          <Chart type="line" title="CPU Usage (Last 24 Hours)" data={cpuUsageData} options={chartOptions} />
        </div>
        <div className="mt-6">
          <ServerLocation />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
