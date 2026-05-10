import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      onSearch(input)
      setInput('')
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite o nome da cidade..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn">
        🔍 Buscar
      </button>
    </form>
  )
}

export default SearchBar
