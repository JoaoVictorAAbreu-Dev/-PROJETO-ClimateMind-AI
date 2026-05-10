import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/global.css'
import Navbar from './components/Navbar'
import WeatherCard from './components/WeatherCard'
import SearchBar from './components/SearchBar'
import Forcecasatchart from './components/Forcecasatchart'

function App() {
  const [weather, setWeather] = useState(null)
  const [city, setCity] = useState('São Paulo')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState(['São Paulo', 'Rio de Janeiro', 'Belo Horizonte'])

  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get(`http://127.0.0.1:8000/weather/${cityName}`)
      setWeather(response.data)
      setCity(cityName)

      // Adicionar ao histórico
      setHistory(prev => {
        const newHistory = [cityName, ...prev.filter(c => c !== cityName)]
        return newHistory.slice(0, 5)
      })
      localStorage.setItem('cityHistory', JSON.stringify(newHistory))
    } catch (err) {
      setError(`Não foi possível encontrar a cidade: ${cityName}`)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem('cityHistory')
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
    fetchWeather('São Paulo')
  }, [])

  return (
    <div className="app">
      <Navbar />

      <div className="main-container">
        <div className="search-section">
          <SearchBar onSearch={fetchWeather} />
        </div>

        {error && <div className="error-message">{error}</div>}

        {loading && <div className="loading">Carregando...</div>}

        {weather && !loading && (
          <div className="content">
            <div className="primary-section">
              <WeatherCard weather={weather} city={city} />
            </div>

            <div className="secondary-section">
              <div className="info-grid">
                <div className="info-card">
                  <h3>Sensação Térmica</h3>
                  <p className="large-text">{weather.temperature}°C</p>
                </div>
                <div className="info-card">
                  <h3>Umidade</h3>
                  <p className="large-text">{weather.humidity}%</p>
                </div>
              </div>

              <div className="forecast-section">
                <h2>Previsão</h2>
                <Forcecasatchart />
              </div>
            </div>
          </div>
        )}

        <div className="history-section">
          <h3>Histórico de Buscas</h3>
          <div className="history-grid">
            {history.map((c, idx) => (
              <button
                key={idx}
                className={`history-btn ${c === city ? 'active' : ''}`}
                onClick={() => fetchWeather(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
