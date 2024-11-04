import React, { useState, useEffect } from 'react';
import { CreateDrawTime } from '../../Utils/apiService';
import { useAppContext } from '../../contextApi/context';
import strings from '../../Utils/constant/stringConstant';

const CreateTime = () => {
  const { store, dispatch } = useAppContext();
  const [timeInput, setTimeInput] = useState('');
  const [isPM, setIsPM] = useState(false);
  const today = new Date().toLocaleDateString();

  // Set drawTimes directly from the store's drawTimes array
  const drawTimes = store.drawTimes || [];

  useEffect(() => {
    // Clears drawTimes at midnight
    const clearDrawTimes = () => {
      const now = new Date();
      if (now.getHours() === 0 && now.getMinutes() === 0) {
        dispatch({ type: strings.CLEAR_DRAW_TIMES });
      }
    };

    const intervalId = setInterval(clearDrawTimes, 60000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  // const handleAddTime = async () => {
  //   if (timeInput) {
  //     const drawTime = `${timeInput} ${isPM ? 'PM' : 'AM'}`;
  //     const body = { drawDate: drawTime };

  //     const response = await CreateDrawTime(body);

   
  //     if (response && !drawTimes.includes(drawTime)) {
  //       dispatch({
  //         type: strings.ADD_DRAW_TIME,
  //         payload: drawTime,
  //       });
  //       setTimeInput('');
  //     }
  //   }
  // };

  const handleAddTime = async () => {
    if (timeInput) {
      const drawTime = `${timeInput} ${isPM ? 'PM' : 'AM'}`;
      
      // Check if drawTime already exists in drawTimes
      if (drawTimes.includes(drawTime)) {
        alert("This time already exists in the schedule.");
        return;
      }
  
      const body = { drawDate: drawTime };
  
      const response = await CreateDrawTime(body);
  
      // Add drawTime if the API call was successful and it's not a duplicate
      if (response) {
        dispatch({
          type: strings.ADD_DRAW_TIME,
          payload: drawTime,
        });
        setTimeInput('');
      }
    }
  };
  

  return (
    <div
      className="container-fluid d-flex flex-column align-items-center"
      style={{ minHeight: '75vh', backgroundColor: '#f0f4f8' }}
    >
      <div
        className="text-center"
        style={{
          backgroundColor: '#e6f7ff',
          padding: '20px 0',
          borderBottom: '3px solid #4682B4',
          borderBottomLeftRadius: '15px',
          borderBottomRightRadius: '15px',
          width: '100%',
          marginBottom: '20px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h2 className="mb-1" style={{ color: '#4682B4', fontWeight: 'bold', letterSpacing: '1px', fontSize: '2rem' }}>
          ⏰ Lottery Schedule
        </h2>
      </div>

      <div
        className="border border-3 rounded-4 shadow"
        style={{
          padding: '30px',
          width: '90%',
          maxWidth: '500px',
          height: '600px',
          background: 'linear-gradient(135deg, #ffffff 0%, #e0f7fa 100%)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div className="text-center py-4">
          <p style={{ fontStyle: 'italic', color: '#555', fontSize: '1.1rem', fontWeight: '900' }}>
            Set Your Lottery Draw Times Below:
          </p>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter time (e.g., 10:00)"
              value={timeInput}
              onChange={(e) => setTimeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTime()}
              style={{
                borderRadius: '25px 0 0 25px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                borderColor: '#80deea',
              }}
            />
            <select
              className="form-select"
              value={isPM ? 'PM' : 'AM'}
              onChange={(e) => setIsPM(e.target.value === 'PM')}
              style={{
                borderRadius: '0 25px 25px 0',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                borderColor: '#80deea',
              }}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={handleAddTime}
              style={{
                borderRadius: '25px',
                backgroundColor: '#00838f',
                borderColor: '#00695c',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = '#00695c')}
              onMouseOut={(e) => (e.target.style.backgroundColor = '#00838f')}
            >
              <i className="bi bi-clock" style={{ marginRight: '5px' }}></i> Add Time
            </button>
          </div>

          <div className="draw-time-list">
            <h5 className="mb-3" style={{ color: '#00796b' }}>
              Scheduled Draw Times for {today}
            </h5>
            <div
              style={{
                maxHeight: '300px',
                overflowY: 'auto',
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
              }}
            >
              {drawTimes.length > 0 ? (
                <ul className="list-group">
                  {drawTimes.map((time, index) => (
                    <li
                      key={index}
                      className="list-group-item list-group-item-action"
                      style={{
                        backgroundColor: '#e1f5fe',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = '#b2ebf2')}
                      onMouseOut={(e) => (e.target.style.backgroundColor = '#e1f5fe')}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ color: '#666' }}>No draw times scheduled for today.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTime;
