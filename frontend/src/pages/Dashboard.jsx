import Navbar from '../components/Navbar'
import WeatherCard from '../components/WeatherCard'

function Dashboard() {
  return (
    <div>
      <Navbar />

      <div className="container">
        <WeatherCard />
      </div>
    </div>
  )
}

export default Dashboard