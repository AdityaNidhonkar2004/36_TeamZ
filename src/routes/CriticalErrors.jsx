import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import Card from '../components/Card';
import axios from 'axios';

const CriticalErrors = () => {
  const [criticalError, setCriticalError] = useState([]);


  useEffect(() => {
    fetchRecentActivity();
  }, []);
  const fetchRecentActivity = async () => {
    try {
      const response = await axios.get(`https://053e-210-212-183-60.ngrok-free.app/api/errorLogs/all/Critical`, { 
        headers: { 'ngrok-skip-browser-warning': 'true' }
      });
      setCriticalError(response.data); 
    } catch (error) {
      console.error("Error fetching recent activity:", error);
    }
  };

  return (
    <div className='flex'>
      <SideBar/>
      <div className="max-h-80 overflow-y-auto">
              <div className="grid grid-cols-1 gap-4">
                  {criticalError.map((activity, index) => (
                    <div key={index}>
                      <Card
                        title={activity.createdAt}
                        status={activity.resolved || "Critical"}
                        errorLog={activity.log}
                        solution="No solution needed for this entry."
                      />
                    </div>
                  ))}
              </div>
            </div>
    </div>
  )
}

export default CriticalErrors