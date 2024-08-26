import  { useEffect } from 'react';
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
      <li className="p-2 bg-gray-700 rounded mb-2">Server 1</li>
      <li className="p-2 bg-gray-700 rounded mb-2">Server 2</li>
      <li className="p-2 bg-gray-700 rounded mb-2">Server 3</li>
    </ul>
  </div>
);

const Header = () => (
  <header className="bg-gray-800 p-4 flex justify-between items-center bg-opacity-90">
    <h1 className="text-2xl font-bold">Server Status Dashboard</h1>
    <div className="flex items-center">
      <i className="fas fa-user-circle text-2xl"></i>
    </div>
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
        data: [98, 95, 99, 97, 96, 94, 98],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Server Load',
        data: [30, 45, 50, 60, 40, 55],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        data: [65, 35],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
      },
    ],
  };

  return (
    <div className="bg-black bg-opacity-90 text-white flex flex-col md:flex-row h-full w-full max-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Chart type="line" title="Server Uptime (Last 7 Days)" data={lineChartData} />
          <Chart type="bar" title="Server Load (Last 24 Hours)" data={barChartData} />
          <Chart type="line" title="Network Traffic (Last 7 Days)" data={lineChartData} />
          <Chart type="pie" title="Disk Usage" data={pieChartData} />
          <Chart type="bar" title="Memory Usage (Last 24 Hours)" data={barChartData} />
          <Chart type="line" title="CPU Usage (Last 7 Days)" data={lineChartData} />
        </div>
        <div className="mt-6">
          <ServerLocation />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
