import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputData, setInputData] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const filters = [
    { label: 'Numbers', value: 'numbers' },
    { label: 'Alphabets', value: 'alphabets' },
    { label: 'Highest Lowercase Alphabet', value: 'highest_lowercase_alphabet' }
  ];

  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedFilters(
      e.target.checked
        ? [...selectedFilters, value]
        : selectedFilters.filter((filter) => filter !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(inputData);
      const response = await fetch('http://localhost:4000/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData.data }),
      });
      const result = await response.json();
      setResponseData(result);
    } catch (error) {
      console.error('Invalid JSON or server error:', error);
    }
  };

  const renderFilteredData = () => {
    if (!responseData) return null;
    const result = [];
    if (selectedFilters.includes('numbers') && responseData.numbers) {
      result.push(<p key="numbers">Numbers: {responseData.numbers.join(', ')}</p>);
    }
    if (selectedFilters.includes('alphabets') && responseData.alphabets) {
      result.push(<p key="alphabets">Alphabets: {responseData.alphabets.join(', ')}</p>);
    }
    if (selectedFilters.includes('highest_lowercase_alphabet') && responseData.highest_lowercase_alphabet) {
      result.push(
        <p key="highest_lowercase_alphabet">
          Highest Lowercase Alphabet: {responseData.highest_lowercase_alphabet.join(', ')}
        </p>
      );
    }
    return result;
  };

  return (
    <div className="App">
      <h1>21BCE11257</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputData}
          onChange={handleInputChange}
          placeholder='Enter JSON here'
        />
        <button type="submit">Submit</button>
      </form>
      
      <div>
        <h2>Select Filters:</h2>
        {filters.map((filter) => (
          <label key={filter.value}>
            <input
              type="checkbox"
              value={filter.value}
              onChange={handleFilterChange}
            />
            {filter.label}
          </label>
        ))}
      </div>

      {responseData && (
        <div className="filtered-results">
          <h2>Filtered Results:</h2>
          {renderFilteredData()}
        </div>
      )}
    </div>
  );
}

export default App;
