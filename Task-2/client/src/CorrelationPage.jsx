


import React, { useState } from 'react';
import axios from 'axios';


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
  heatmapContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '30px',
  },
  correlationSummary: {
    textAlign: 'center',
    marginBottom: '25px',
    padding: '15px',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px',
  },
  correlationValue: {
    fontSize: '36px',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  correlationLabel: {
    fontSize: '16px',
    color: '#7f8c8d',
  },
  heatmapGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
    width: '100%',
  },
  heatmapRow: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  },
  heatmapCell: {
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'white',
    margin: '2px',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
  },
  heatmapLabelCell: {
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    margin: '2px',
    borderRadius: '4px',
  },
  stockInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    flexWrap: 'wrap',
  },
  infoCard: {
    backgroundColor: '#f1f8fe',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    flex: '1',
    margin: '0 10px 10px 0',
    minWidth: '200px',
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
  colorLegend: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30px',
    padding: '15px',
    backgroundColor: '#f1f8fe',
    borderRadius: '8px',
    width: '100%',
  },
  colorGradient: {
    height: '20px',
    width: '80%',
    maxWidth: '500px',
    background: 'linear-gradient(to right, #e74c3c, #f9f9f9, #2ecc71)',
    borderRadius: '4px',
    position: 'relative',
  },
  colorLabels: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    maxWidth: '500px',
    marginTop: '5px',
    fontSize: '14px',
    color: '#7f8c8d',
  },
  loadingIndicator: {
    textAlign: 'center',
    padding: '40px 0',
    color: '#7f8c8d',
    fontSize: '18px',
  },
  error: {
    color: '#e74c3c',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fadbd8',
    borderRadius: '4px',
  },
  priceChartContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: '40px',
  },
  priceChart: {
    flex: '1',
    minWidth: '45%',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  },
  priceChartHeader: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '15px',
    color: '#2c3e50',
  },
  priceChartCanvas: {
    width: '100%',
    height: '250px',
  }
};


const getCorrelationColor = (value) => {
  if (value === null || value === undefined) return '#f9f9f9';
  

  if (value <= -0.7) return '#e74c3c';
  
  if (value <= -0.3) return '#f5b7b1';
  
  if (value < 0) return '#fadbd8';
 
  if (value === 0) return '#f9f9f9';
  
  if (value <= 0.3) return '#d5f5e3';
 
  if (value <= 0.7) return '#abebc6';

  return '#2ecc71';
};


const getTextColor = (value) => {
  if (value === null || value === undefined) return '#2c3e50';
  
  if (value <= -0.7 || value >= 0.7) return 'white';
  return '#2c3e50';
};


const getCorrelationCategory = (value) => {
  if (value === null || value === undefined) return '';
  
  if (value > 0.7) return 'Strong Positive';
  if (value > 0.3) return 'Moderate Positive';
  if (value > 0) return 'Weak Positive';
  if (value === 0) return 'No Correlation';
  if (value > -0.3) return 'Weak Negative';
  if (value > -0.7) return 'Moderate Negative';
  return 'Strong Negative';
};

export default function CorrelationPage() {
  const [ticker1, setTicker1] = useState('');
  const [ticker2, setTicker2] = useState('');
  const [minutes, setMinutes] = useState('');
  const [correlation, setCorrelation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCorrelation = async () => {
    if (!ticker1 || !ticker2 || !minutes) {
      setError('Please enter both ticker symbols and minutes');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`http://localhost:5000/stockcorrelation?minutes=${minutes}&ticker=${ticker1}&ticker=${ticker2}`);
      setCorrelation(res.data);
    } catch (err) {
      setError('Error fetching correlation data. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  
  const createCorrelationMatrix = () => {
    if (!correlation) return [];
    
  
    const stock1 = correlation.stocks[ticker1.toUpperCase()];
    const stock2 = correlation.stocks[ticker2.toUpperCase()];
    
    if (!stock1 || !stock2) return [];
    
   
    return [
      [1, correlation.correlation],
      [correlation.correlation, 1]
    ];
  };

  const formatPriceData = (stockData) => {
    if (!stockData || !stockData.priceHistory) return [];
    
    return stockData.priceHistory.map(item => {
      const date = new Date(item.lastUpdatedAt);
      return {
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        price: item.price
      };
    });
  };

  return (
    <div style={styles.container}>
     
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>📊</span>
          StockTracker Pro
        </div>
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Stock Dashboard</a>
          <a href="/correlation" style={{...styles.navLink, ...styles.activeNavLink}}>Correlation Heatmap</a>
         
        </div>
      </nav>

     
      <div style={styles.contentArea}>
        <h2 style={styles.header}>🔄 Stock Correlation Analysis</h2>
        
    
        <div style={styles.inputGroup}>
          <input 
            style={styles.input} 
            placeholder="Enter first ticker symbol (e.g., AAPL)" 
            value={ticker1} 
            onChange={e => setTicker1(e.target.value.toUpperCase())} 
          />
          <input 
            style={styles.input} 
            placeholder="Enter second ticker symbol (e.g., MSFT)" 
            value={ticker2} 
            onChange={e => setTicker2(e.target.value.toUpperCase())} 
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
            onClick={fetchCorrelation}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#2980b9'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#3498db'}
          >
            Calculate Correlation
          </button>
        </div>

      
        {error && <div style={styles.error}>{error}</div>}


        {loading && (
          <div style={styles.loadingIndicator}>
            Calculating correlation between {ticker1} and {ticker2}...
          </div>
        )}


        {correlation && !loading && (
          <div style={styles.resultSection}>
          
            <div 
              style={{
                ...styles.correlationSummary,
                backgroundColor: getCorrelationColor(correlation.correlation) + '33' // Add transparency
              }}
            >
              <div style={styles.correlationLabel}>
                Correlation between {ticker1} and {ticker2}
              </div>
              <div 
                style={{
                  ...styles.correlationValue,
                  color: getCorrelationColor(correlation.correlation)
                }}
              >
                {correlation.correlation.toFixed(4)}
              </div>
              <div style={styles.correlationLabel}>
                {getCorrelationCategory(correlation.correlation)}
              </div>
            </div>

           
            <div style={styles.stockInfo}>
            
              <div style={styles.infoCard}>
                <div style={styles.infoLabel}>{ticker1} Average Price</div>
                <div style={styles.infoValue}>
                  ${correlation.stocks[ticker1]?.averagePrice.toFixed(2) || 'N/A'}
                </div>
                <div style={styles.infoLabel}>
                  Data points: {correlation.stocks[ticker1]?.priceHistory?.length || 0}
                </div>
              </div>
              
              
              <div style={styles.infoCard}>
                <div style={styles.infoLabel}>{ticker2} Average Price</div>
                <div style={styles.infoValue}>
                  ${correlation.stocks[ticker2]?.averagePrice.toFixed(2) || 'N/A'}
                </div>
                <div style={styles.infoLabel}>
                  Data points: {correlation.stocks[ticker2]?.priceHistory?.length || 0}
                </div>
              </div>
            </div>

            <div style={styles.heatmapContainer}>
              <h3>Correlation Heatmap</h3>
              
              <div style={styles.heatmapGrid}>
               
                <div style={styles.heatmapRow}>
                  <div style={styles.heatmapLabelCell}></div>
                  <div style={styles.heatmapLabelCell}>{ticker1}</div>
                  <div style={styles.heatmapLabelCell}>{ticker2}</div>
                </div>
                
                {createCorrelationMatrix().map((row, rowIndex) => (
                  <div key={rowIndex} style={styles.heatmapRow}>
                 
                    <div style={styles.heatmapLabelCell}>
                      {rowIndex === 0 ? ticker1 : ticker2}
                    </div>
                    
                  
                    {row.map((value, colIndex) => (
                      <div 
                        key={colIndex}
                        style={{
                          ...styles.heatmapCell,
                          backgroundColor: getCorrelationColor(value),
                          color: getTextColor(value)
                        }}
                      >
                        {value.toFixed(2)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              
              
              <div style={styles.colorLegend}>
                <div>
                  <div style={styles.colorGradient}></div>
                  <div style={styles.colorLabels}>
                    <span>-1.0 Strong Negative</span>
                    <span>0.0</span>
                    <span>Strong Positive 1.0</span>
                  </div>
                </div>
              </div>
            </div>

         
            {correlation.stocks[ticker1]?.priceHistory?.length > 0 && correlation.stocks[ticker2]?.priceHistory?.length > 0 && (
              <div style={styles.priceChartContainer}>
                <div style={{...styles.priceChart, marginRight: '10px'}}>
                  <h3 style={styles.priceChartHeader}>{ticker1} Price History</h3>
                  <div>
                    {correlation.stocks[ticker1].priceHistory.map((point, index) => (
                      <div key={index} style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0'}}>
                        <span>{new Date(point.lastUpdatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <span>${point.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={styles.priceChart}>
                  <h3 style={styles.priceChartHeader}>{ticker2} Price History</h3>
                  <div>
                    {correlation.stocks[ticker2].priceHistory.map((point, index) => (
                      <div key={index} style={{display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', padding: '8px 0'}}>
                        <span>{new Date(point.lastUpdatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        <span>${point.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}