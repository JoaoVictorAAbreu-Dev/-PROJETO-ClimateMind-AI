import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

function ForecastChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="empty-state">Sem previsao disponivel.</div>
  }

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || payload.length === 0) {
      return null
    }

    const point = payload[0].payload

    return (
      <div className="chart-tooltip">
        <p>{point.date} {point.time}</p>
        <p>Temp: {Math.round(point.temperature)} C</p>
        <p>Umidade: {point.humidity}%</p>
        <p>{point.weather}</p>
      </div>
    )
  }

  return (
    <div className="forecast-chart">
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#3a5f8f" />
          <XAxis dataKey="time" stroke="#8aa6d8" />
          <YAxis stroke="#8aa6d8" />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#ff6b6b"
            dot={{ fill: '#ff6b6b', r: 5 }}
            activeDot={{ r: 7 }}
            strokeWidth={3}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ForecastChart
