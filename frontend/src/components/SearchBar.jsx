import { useState } from 'react'

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!input.trim()) {
      return
    }

    onSearch(input)
    setInput('')
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Digite o nome da cidade..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn">
        Buscar
      </button>
    </form>
  )
}

export default SearchBar
