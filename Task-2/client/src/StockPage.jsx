


import React, { useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px',
    backgroundColor: '#2c3e50',
    color: 'white',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: '10px',
  },
  navLinks: {
    display: 'flex',
    gap: '20px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  activeNavLink: {
    backgroundColor: '#3498db',
    color: 'white',
  },
  contentArea: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    marginBottom: '20px',
    color: '#2c3e50',
  },
  inputGroup: {
    display: 'flex',
    gap: '15px',
    marginBottom: '25px',
    flexWrap: 'wrap',
  },
  input: {
    padding: '12px 15px',
    borderRadius: '4px',
    border: '1px solid #dcdcdc',
    fontSize: '16px',
    flexGrow: '1',
    minWidth: '120px',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  resultSection: {
    marginTop: '30px',
  },
  averagePrice: {
    fontSize: '24px',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  highlight: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  chartWrapper: {
    marginTop: '20px',
    height: '400px',
  },
  stockInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
  },
  infoCard: {
    backgroundColor: '#f1f8fe',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    flex: '1',
    margin: '0 10px',
    textAlign: 'center',
  },
  infoValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#3498db',
    margin: '10px 0',
  },
  infoLabel: {
    color: '#7f8c8d',
    fontSize: '14px',
  },
  loadingIndicator: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#7f8c8d',
    fontSize: '18px',
  },
  noData: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#7f8c8d',
  }
};

export default function StockPage() {
  const [ticker, setTicker] = useState('');
  const [minutes, setMinutes] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!ticker || !minutes) {
      setError('Please enter both ticker symbol and minutes');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`http://localhost:5000/stocks/${ticker}?minutes=${minutes}&aggregation=average`);
      setData(res.data);
    } catch (err) {
      setError('Error fetching data. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };


  const chartData = {
    labels: data ? data.priceHistory.map(p => {
    
      const date = new Date(p.time);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }) : [],
    datasets: [
      {
        label: `${ticker} Price`,
        data: data ? data.priceHistory.map(p => p.price) : [],
        fill: false,
        backgroundColor: '#3498db',
        borderColor: '#3498db',
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: `Price Trend for ${ticker.toUpperCase()}`,
        font: {
          size: 18,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(44, 62, 80, 0.9)',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function(tooltipItems) {
            return `Time: ${tooltipItems[0].label}`;
          },
          label: function(context) {
            return `Price: $${context.parsed.y.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Time',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          maxRotation: 45,
          minRotation: 45,
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        title: {
          display: true,
          text: 'Price ($)',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function(value) {
            return '$' + value.toFixed(2);
          }
        }
      }
    }
  };

  return (
    <div style={styles.container}>
      
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>📊</span>
          StockTracker Pro
        </div>
        <div style={styles.navLinks}>
          <a href="#" style={{...styles.navLink, ...styles.activeNavLink}}>Stock Dashboard</a>
          <a href="/correlation" style={styles.navLink}>Correlation Heatmap</a>
          <a href="#" style={styles.navLink}>Watchlist</a>
          <a href="#" style={styles.navLink}>Settings</a>
        </div>
      </nav>

    
      <div style={styles.contentArea}>
        <h2 style={styles.header}>📈 Stock Price Analysis</h2>
        
  
        <div style={styles.inputGroup}>
          <input 
            style={styles.input} 
            placeholder="Enter ticker symbol (e.g., AAPL)" 
            value={ticker} 
            onChange={e => setTicker(e.target.value.toUpperCase())} 
          />
          <input 
            style={styles.input} 
            placeholder="Minutes to analyze" 
            type="number"
            value={minutes} 
            onChange={e => setMinutes(e.target.value)} 
          />
          <button 
            style={styles.button} 
            onClick={fetchData}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#2980b9'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#3498db'}
          >
            Get Price Data
          </button>
        </div>

       
        {error && (
          <div style={{ color: '#e74c3c', marginBottom: '20px', padding: '10px', backgroundColor: '#fadbd8', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={styles.loadingIndicator}>
            Loading data for {ticker}...
          </div>
        )}

       
        {data && !loading && (
          <div style={styles.resultSection}>
           
            <div style={styles.stockInfo}>
              <div style={styles.infoCard}>
                <div style={styles.infoLabel}>Average Price</div>
                <div style={styles.infoValue}>${data.averageStockPrice.toFixed(2)}</div>
              </div>
              {data.priceHistory.length > 0 && (
                <>
                  <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Highest Price</div>
                    <div style={styles.infoValue}>
                      ${Math.max(...data.priceHistory.map(p => p.price)).toFixed(2)}
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Lowest Price</div>
                    <div style={styles.infoValue}>
                      ${Math.min(...data.priceHistory.map(p => p.price)).toFixed(2)}
                    </div>
                  </div>
                  <div style={styles.infoCard}>
                    <div style={styles.infoLabel}>Data Points</div>
                    <div style={styles.infoValue}>{data.priceHistory.length}</div>
                  </div>
                </>
              )}
            </div>
            
          
            <div style={styles.chartWrapper}>
              {data.priceHistory.length > 0 ? (
                <Line data={chartData} options={chartOptions} />
              ) : (
                <div style={styles.noData}>No price history data available for the selected period.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}