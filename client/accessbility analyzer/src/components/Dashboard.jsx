import React, { useState } from 'react';
import AccessibilityForm from './AccessibilityForm';
import Results from './Results';
import { analyzeAccessibility } from '../Services/api.js';
import { Bar, Pie } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [summary, setSummary] = useState(null);

  const handleAnalyze = async (url) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await analyzeAccessibility(url);
      const data = response.data;

      setResults(data); // Set the raw results

      if (data && data.length > 0) {
        // Count issues by impact level
        const impactCounts = {
          serious: data.filter((result) => result.impact === 'serious').length,
          moderate: data.filter((result) => result.impact === 'moderate').length,
          minor: data.filter((result) => result.impact === 'minor').length,
          low: data.filter((result) => result.impact === 'low').length,
        };
        
        // Set summary data
        setSummary({
          total: data.length,
          impactCounts
        });

        // Common colors for consistency
        const backgroundColors = [
          'rgba(220, 53, 69, 0.8)',   // serious - red
          'rgba(255, 193, 7, 0.8)',   // moderate - yellow
          'rgba(108, 117, 125, 0.8)', // minor - gray
          'rgba(23, 162, 184, 0.8)'   // low - blue
        ];
        
        const borderColors = [
          'rgba(220, 53, 69, 1)',
          'rgba(255, 193, 7, 1)',
          'rgba(108, 117, 125, 1)',
          'rgba(23, 162, 184, 1)'
        ];

        // Prepare chart data
        setChartData({
          labels: ['Serious', 'Moderate', 'Minor', 'Low'],
          datasets: [
            {
              label: 'Issues by Impact Level',
              data: [impactCounts.serious, impactCounts.moderate, impactCounts.minor, impactCounts.low],
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        });
      } else {
        setChartData(null);
        setSummary(null);
      }
    } catch (error) {
      console.error('Error analyzing URL:', error);
      setError('Failed to analyze URL. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Accessibility Analyzer</h1>
      <AccessibilityForm onSubmit={handleAnalyze} />
      
      {isLoading && <p className="loading-message">Analyzing website, please wait...</p>}
      {error && <p className="error-message">{error}</p>}
      
      {!isLoading && !error && summary && (
        <div className="summary-container">
          <h2>Summary</h2>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-value">{summary.total}</span>
              <span className="stat-label">Total Issues</span>
            </div>
            <div className="stat-item serious">
              <span className="stat-value">{summary.impactCounts.serious}</span>
              <span className="stat-label">Serious</span>
            </div>
            <div className="stat-item moderate">
              <span className="stat-value">{summary.impactCounts.moderate}</span>
              <span className="stat-label">Moderate</span>
            </div>
            <div className="stat-item minor">
              <span className="stat-value">{summary.impactCounts.minor}</span>
              <span className="stat-label">Minor</span>
            </div>
            <div className="stat-item low">
              <span className="stat-value">{summary.impactCounts.low}</span>
              <span className="stat-label">Low</span>
            </div>
          </div>
        </div>
      )}
      
      {!isLoading && !error && chartData && (
        <div className="charts-container">
          <div className="chart-row">
            <div className="chart-column">
              <div className="chart-container">
                <h2>Bar Chart: Impact Distribution</h2>
                <Bar 
                  data={chartData} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      title: {
                        display: true,
                        text: 'Issues by Impact Level',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: {
                          precision: 0
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>
            <div className="chart-column">
              <div className="chart-container">
                <h2>Pie Chart: Impact Distribution</h2>
                <Pie 
                  data={chartData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'right',
                      },
                      title: {
                        display: true,
                        text: 'Issues by Impact Level',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!isLoading && !error && (
        <Results results={results} />
      )}
    </div>
  );
};

export default Dashboard;