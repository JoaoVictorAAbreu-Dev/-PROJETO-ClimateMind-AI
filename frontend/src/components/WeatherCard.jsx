function WeatherCard({ weather, city }) {
  const getWeatherIcon = (description) => {
    const desc = description.toLowerCase()
    if (desc.includes('chuva')) return '🌧️'
    if (desc.includes('nuvem') || desc.includes('nublado')) return '☁️'
    if (desc.includes('céu limpo') || desc.includes('claro')) return '☀️'
    if (desc.includes('neve')) return '❄️'
    if (desc.includes('trovão') || desc.includes('tempestade')) return '⛈️'
    if (desc.includes('neblina') || desc.includes('névoa')) return '🌫️'
    return '🌤️'
  }

  return (
    <div className="weather-card-large">
      <div className="card-header">
        <h2 className="city-name">{city}</h2>
        <span className="weather-icon">{getWeatherIcon(weather.weather)}</span>
      </div>

      <div className="temperature-display">
        <span className="temp">{Math.round(weather.temperature)}</span>
        <span className="unit">°C</span>
      </div>

      <p className="weather-description">{weather.weather}</p>

      <div className="weather-details">
        <div className="detail-item">
          <span className="label">Umidade</span>
          <span className="value">{weather.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Sensação</span>
          <span className="value">{Math.round(weather.temperature - 2)}°C</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard