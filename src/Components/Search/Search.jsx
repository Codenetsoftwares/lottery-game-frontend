import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Search.css'; 
import { SearchLotteryTicket } from '../../Utils/apiService';

const Search = () => {
  const [sem, setSem] = useState('');
  const [group, setGroup] = useState(''); 
  const [series, setSeries] = useState(''); 
  const [number, setNumber] = useState(''); 
  const [isGroupPickerVisible, setIsGroupPickerVisible] = useState(false);
  const [isSeriesPickerVisible, setIsSeriesPickerVisible] = useState(false);
  const [isNumberPickerVisible, setIsNumberPickerVisible] = useState(false);
  const [responseData, setResponseData] = useState(null); // State to hold API response
  const [showSearch, setShowSearch] = useState(true); // State to control visibility of search box

  const handleSemChange = (e) => {
    setSem(e.target.value);
  };

  const handleGroupSelect = (value) => {
    setGroup(value);
    setIsGroupPickerVisible(false);
  };

  const renderGroupGrid = () => {
    const groups = Array.from({ length: 62 }, (_, i) => (i + 38).toString());
    return (
      <div className="calendar-grid">
        {groups.map((group) => (
          <button
            key={group}
            className="calendar-cell"
            onClick={() => handleGroupSelect(group)}
          >
            {group}
          </button>
        ))}
      </div>
    );
  };

  const handleSeriesSelect = (value) => {
    setSeries(value);
    setIsSeriesPickerVisible(false);
  };

  const renderSeriesGrid = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'J', 'K', 'L'];
    return (
      <div className="calendar-grid">
        {letters.map((letter) => (
          <button
            key={letter}
            className="calendar-cell"
            onClick={() => handleSeriesSelect(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    );
  };

  const handleNumberSelect = (value) => {
    setNumber(value);
    setIsNumberPickerVisible(false);
  };

  const renderNumberGrid = (rangeStart = 0, rangeEnd = 99999, isFormatted = true) => {
    const numbers = Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => i + rangeStart);
    return (
      <div className="calendar-grid">
        {numbers.map((number) => (
          <button
            key={number}
            className="calendar-cell"
            onClick={() => handleNumberSelect(isFormatted ? number.toString().padStart(5, '0') : number.toString())}
          >
            {isFormatted ? number.toString().padStart(5, '0') : number.toString()}
          </button>
        ))}
      </div>
    );
  };

  const handleSearch = async () => {
    const requestBody = {
      group: group ? parseInt(group) : null,
      series: series ? series : null,
      number: number ? parseInt(number) : null,
      sem: sem ? parseInt(sem) : null,
    };

    console.log("Request Body:", requestBody); 

    try {
      const response = await SearchLotteryTicket(requestBody);
      console.log('Success:', response);
      
      // Set the response data and hide the search box
      setResponseData(response.data);

      setShowSearch(false);
    } catch (error) {
      console.error('Error:', error);
      // Handle the error if necessary
    }
  };
  console.log('====>>> line 110',responseData)

  return (
    <div className="container-fluid d-flex justify-content-center" style={{ minHeight: '75vh', backgroundColor: '#f0f4f8' }}>
      <div className="border border-3 rounded-3 shadow-lg" style={{ padding: '40px', width: '80%', maxWidth: '800px', backgroundColor: '#ffffff' }}>
        {showSearch ? (
          <>
            <div className="text-center mb-4">
              <h2 className="mb-1" style={{ color: '#4682B4', fontWeight: 'bold', letterSpacing: '1px' }}>🔍 Search Lottery Tickets</h2>
            </div>

            {/* SEM Input Field */}
            <div className="mb-4">
              <label htmlFor="sem" className="form-label" style={{ color: '#4682B4', fontWeight: 'bold' }}>Select SEM</label>
              <select id="sem" className="form-select" value={sem} onChange={handleSemChange}>
                <option value="">Choose SEM</option>
                <option value="5">5 SEM</option>
                <option value="10">10 SEM</option>
                <option value="25">25 SEM</option>
                <option value="50">50 SEM</option>
                <option value="100">100 SEM</option>
                <option value="200">200 SEM</option>
              </select>
            </div>

            {/* Group Input */}
            <div className="mb-3">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Group"
                  className="form-control"
                  value={group}
                  onFocus={() => setIsGroupPickerVisible(true)}
                  readOnly
                />
                {isGroupPickerVisible && (
                  <div className="picker-dropdown">
                    {renderGroupGrid()}
                  </div>
                )}
              </div>
            </div>

            {/* Series Input */}
            <div className="mb-3">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Series"
                  className="form-control"
                  value={series}
                  onFocus={() => setIsSeriesPickerVisible(true)}
                  readOnly
                />
                {isSeriesPickerVisible && (
                  <div className="picker-dropdown">
                    {renderSeriesGrid()}
                  </div>
                )}
              </div>
            </div>

            {/* Number Input */}
            <div className="mb-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Number"
                  className="form-control"
                  value={number}
                  onFocus={() => setIsNumberPickerVisible(true)}
                  readOnly
                />
                {isNumberPickerVisible && (
                  <div className="picker-dropdown">
                    {renderNumberGrid()}
                  </div>
                )}
              </div>
            </div>

             {/* Search Button */}
             <div className="text-center">
              <button className="btn btn-primary" onClick={handleSearch} style={{ backgroundColor: '#4682B4', padding: '10px 40px', fontWeight: 'bold' }}>Search</button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h4 style={{ color: '#4682B4', fontWeight: 'bold' }}>Search Results:</h4>
            <div className="mt-3">
              {responseData && responseData.tickets && responseData.tickets.length > 0 ? ( 
                <>
                  <h5>Tickets:</h5>
                  <ul>
                    {responseData.tickets.map((ticket, index) => ( 
                      <li key={index} style={{ color: '#3b6e91' }}>{ticket}</li>
                    ))}
                  </ul>
                  <h5>Price: <span style={{ color: '#3b6e91' }}>₹{responseData.price}</span></h5>
                  <h5>SEM: <span style={{ color: '#3b6e91' }}>{responseData.sem}</span></h5>
                </>
              ) : (
                <h5 style={{ color: '#3b6e91' }}>{responseData ? responseData.message || 'No tickets found.' : 'No data available.'}</h5>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
