import {
  Cloud,
  CloudFog,
  CloudRain,
  CloudSun,
  Snowflake,
  Sun,
  ThermometerSun,
  Zap,
} from 'lucide-react'

const WEATHER_BY_MAIN = {
  Clear: { label: 'Ensolarado', Icon: Sun, className: 'sun' },
  Clouds: { label: 'Nublado', Icon: Cloud, className: 'cloud' },
  Rain: { label: 'Chuvoso', Icon: CloudRain, className: 'rain' },
  Drizzle: { label: 'Garoa', Icon: CloudRain, className: 'rain' },
  Thunderstorm: { label: 'Tempestade', Icon: Zap, className: 'storm' },
  Snow: { label: 'Neve', Icon: Snowflake, className: 'snow' },
  Mist: { label: 'Neblina', Icon: CloudFog, className: 'fog' },
  Smoke: { label: 'Neblina', Icon: CloudFog, className: 'fog' },
  Haze: { label: 'Neblina', Icon: CloudFog, className: 'fog' },
  Fog: { label: 'Neblina', Icon: CloudFog, className: 'fog' },
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function getWeatherType(weather) {
  const byMain = WEATHER_BY_MAIN[weather.weather_main]
  if (byMain) {
    return byMain
  }

  const normalizedDescription = normalizeText(weather.weather)
  if (normalizedDescription.includes('chuva') || normalizedDescription.includes('garoa')) {
    return { label: 'Chuvoso', Icon: CloudRain, className: 'rain' }
  }
  if (normalizedDescription.includes('trovao') || normalizedDescription.includes('tempestade')) {
    return { label: 'Tempestade', Icon: Zap, className: 'storm' }
  }
  if (normalizedDescription.includes('neblina') || normalizedDescription.includes('nevoa')) {
    return { label: 'Neblina', Icon: CloudFog, className: 'fog' }
  }
  if (weather.temperature >= 30 || String(weather.weather_icon || '').endsWith('d')) {
    return { label: 'Quente', Icon: ThermometerSun, className: 'hot' }
  }

  return { label: 'Parcial', Icon: CloudSun, className: 'partial' }
}

function WeatherCard({ weather, city }) {
  const weatherType = getWeatherType(weather)
  const Icon = weatherType.Icon

  return (
    <div className="weather-card-large">
      <div className="card-header">
        <div>
          <h2 className="city-name">{city}</h2>
          <span className={`condition-badge ${weatherType.className}`}>
            <Icon size={18} strokeWidth={2.4} />
            {weatherType.label}
          </span>
        </div>
        <div className={`weather-icon ${weatherType.className}`} aria-label={weatherType.label}>
          <Icon size={58} strokeWidth={1.8} />
        </div>
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
          <span className="label">Sensacao</span>
          <span className="value">{Math.round(weather.feels_like)}°C</span>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
