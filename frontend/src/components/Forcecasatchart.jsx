import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function ForecastChart() {
  // Dados simulados de previsão
  const data = [
    { time: '00h', temp: 22, humidity: 65 },
    { time: '06h', temp: 20, humidity: 72 },
    { time: '12h', temp: 28, humidity: 50 },
    { time: '18h', temp: 25, humidity: 60 },
    { time: '24h', temp: 21, humidity: 70 },
  ]

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'linear-gradient(135deg, #1a2235, #2a3f5f)',
          padding: '10px 15px',
          borderRadius: '8px',
          border: '2px solid #3a5f8f',
          color: '#fff'
        }}>
          <p style={{ margin: 0, marginBottom: '5px' }}>{payload[0].payload.time}</p>
          <p style={{ margin: 0, color: '#ff6b6b' }}>Temp: {payload[0].value}°C</p>
        </div>
      )
    }
    return null
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
            dataKey="temp"
            stroke="#ff6b6b"
            dot={{ fill: '#ff6b6b', r: 5 }}
            activeDot={{ r: 7 }}
            strokeWidth={3}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ForecastChart