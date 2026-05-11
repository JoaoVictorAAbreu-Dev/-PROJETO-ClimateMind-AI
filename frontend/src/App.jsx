import { lazy, Suspense, useEffect, useState } from 'react'
import './styles/global.css'
import SearchBar from './features/weather/components/SearchBar'
import WeatherCard from './features/weather/components/WeatherCard'
import api from './features/weather/services/api'
import Navbar from './shared/components/Navbar'

const ForecastChart = lazy(() => import('./features/weather/components/ForecastChart'))
const DEFAULT_CITY = 'Sao Paulo'
const DEFAULT_HISTORY = ['Sao Paulo', 'Rio de Janeiro', 'Belo Horizonte']

function App() {
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [prediction, setPrediction] = useState(null)
  const [city, setCity] = useState(DEFAULT_CITY)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [history, setHistory] = useState(DEFAULT_HISTORY)

  const fetchWeather = async (cityName) => {
    const normalizedCity = cityName.trim()
    if (!normalizedCity) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const encodedCity = encodeURIComponent(normalizedCity)
      const [weatherResponse, forecastResponse] = await Promise.all([
        api.get(`/weather/${encodedCity}`),
        api.get(`/weather/${encodedCity}/forecast?limit=8`),
      ])
      const nextCity = weatherResponse.data.city

      setWeather(weatherResponse.data)
      setForecast(forecastResponse.data.items)
      setPrediction(null)
      setCity(nextCity)

      try {
        const predictionResponse = await api.post('/prediction/temperature', {
          humidity: weatherResponse.data.humidity,
          pressure: weatherResponse.data.pressure,
        })
        setPrediction(predictionResponse.data.predicted_temperature)
      } catch {
        setPrediction(null)
      }

      setHistory((prev) => {
        const newHistory = [nextCity, ...prev.filter((item) => item !== nextCity)].slice(0, 5)
        localStorage.setItem('cityHistory', JSON.stringify(newHistory))
        return newHistory
      })
    } catch (err) {
      const message =
        err.response?.data?.detail || `Nao foi possivel encontrar a cidade: ${normalizedCity}`

      setError(message)
      setWeather(null)
      setForecast([])
      setPrediction(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem('cityHistory')
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory)
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setHistory(parsedHistory)
        }
      } catch {
        localStorage.removeItem('cityHistory')
      }
    }

    fetchWeather(DEFAULT_CITY)
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
                  <h3>Sensacao Termica</h3>
                  <p className="large-text">{Math.round(weather.feels_like)}°C</p>
                </div>
                <div className="info-card">
                  <h3>Umidade</h3>
                  <p className="large-text">{weather.humidity}%</p>
                </div>
                <div className="info-card">
                  <h3>Vento</h3>
                  <p className="large-text">{weather.wind_speed} m/s</p>
                </div>
                <div className="info-card">
                  <h3>Pressao</h3>
                  <p className="large-text">{weather.pressure} hPa</p>
                </div>
                <div className="info-card">
                  <h3>Predicao ML</h3>
                  <p className="large-text">
                    {prediction === null ? 'N/A' : `${Math.round(prediction)}°C`}
                  </p>
                </div>
              </div>

              <div className="forecast-section">
                <h2>Previsao</h2>
                <Suspense fallback={<div className="empty-state">Carregando grafico...</div>}>
                  <ForecastChart data={forecast} />
                </Suspense>
              </div>
            </div>
          </div>
        )}

        <div className="history-section">
          <h3>Historico de Buscas</h3>
          <div className="history-grid">
            {history.map((item) => (
              <button
                key={item}
                className={`history-btn ${item === city ? 'active' : ''}`}
                onClick={() => fetchWeather(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
