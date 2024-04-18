import React, { createContext, useContext, useEffect, useState } from 'react';

// Creating a context for locations data
const LocationsContext = createContext();

// Custom hook to consume locations context
export const useLocations = () => {
  return useContext(LocationsContext);
};

// Context provider to fetch and provide locations data
export const LocationsProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dev.netisoft.in/reag/api/GetPOIs.php');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setLocations(jsonData.Data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <LocationsContext.Provider value={locations}>
      {children}
    </LocationsContext.Provider>
  );
};
