/* General Layout */
.alt-dashboard-container {
    display: flex;
    background-color: #f7f9fc;
    /* flex-direction: column; */
    padding: 20px;
    overflow-x: hidden;
    flex-direction: row;
  
    height: 75vh;
  }
  
  .alt-sidebar {
    width: 280px;
    background-color: #2b3a67;
    color: white;
    border-radius: 12px;
    overflow-y: auto;
  }
  
  .alt-main-content {
    flex: 1;
    overflow-y: auto;
  }
  
  .market-card-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding-top: 20px;
  }
  
  .market-card {
    width: 100%;
    margin-bottom: 10px;
    background-color: #3f4a85;
    color: white;
    cursor: pointer;
    transition: transform 0.3s;
    border-radius: 10px;
  }
  
  .market-card:hover {
    transform: scale(1.05);
    background-color: #5862a6;
  }
  
  .market-title {
    color: #3f4a85;
    font-weight: bold;
    font-size: 1.6rem;
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* User Stats Pop-Up */
  .stats-popup {
    background-color: #ffffff;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    max-width: 800px;
    margin: auto;
    animation: slideIn 0.4s ease-in-out;
  }
  
  .stats-grid {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
  
  .stat-card {
    background-color: #edf2f8;
    color: #2b3a67;
    text-align: center;
    border-radius: 10px;
    transition: box-shadow 0.3s;
  }
  
  .stat-card:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
  
  .stat-icon {
    font-size: 2rem;
    color: #4a66c3;
    margin-bottom: 10px;
  }
  
  .stat-title {
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  .stat-value {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 5px;
  }
  
  /* Welcome Card */
  .welcome-card {
    background-color: #e6f2ff;
    padding: 40px;
    border-radius: 12px;
    text-align: center;
  }
  
  .welcome-title {
    color: #2b3a67;
    font-size: 1.6rem;
    font-weight: bold;
  }
  
  .welcome-text {
    color: #3a557f;
    font-size: 1.1rem;
  }
  
  .close-btn {
    display: block;
    margin: auto;
  }
  
  /* Animation */
  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  