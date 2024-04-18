
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { useLocations } from './LocationsContext'; // Import the useLocations hook
import MapScreen from './MapScreen';

const SettingsComponent = () => {
  const locations = useLocations(); // Use the useLocations hook to access locations data

  const [apiData, setApiData] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  // Fetch API data
  useEffect(() => {
    fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
      .then(response => response.json())
      .then(data => setApiData(data.Data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fetch filtered locations when selected categories change
  useEffect(() => {
    if (selectedCategories.length > 0) {
      const requestBody = {
        Categories: selectedCategories.join(',')
      };
      
      fetch('https://dev.netisoft.in/reag/api/GetPOIs.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
      .then(response => response.json())
      .then(data => setFilteredLocations(data.Data))
      .catch(error => console.error('Error fetching filtered locations:', error));
    } else {
      setFilteredLocations([]);
    }
  }, [selectedCategories]);

  const handleItemPress = (item) => {
    setSelectedCategories(prevSelectedCategories => {
      if (prevSelectedCategories.includes(item.Id)) {
        return prevSelectedCategories.filter(id => id !== item.Id);
      } else {
        return [...prevSelectedCategories, item.Id];
      }
    });
  };

  const isClicked = (item) => {
    return selectedCategories.includes(item.Id);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.settingsButton}>
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>

      {/* Modal for Settings Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showSettings}
        onRequestClose={() => setShowSettings(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView>
              {apiData.map(item => (
                <TouchableOpacity
                  key={item.Id}
                  style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
                  onPress={() => handleItemPress(item)}
                >
                  <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
                  <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowSettings(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MapScreen */}
      <MapScreen filteredLocations={filteredLocations} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    zIndex: 1,
  },
  settingsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    maxHeight: '80%',
  },
  itemContainer: {
    backgroundColor: '#f9f9f9',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clickedItem: {
    backgroundColor: 'lightblue',
  },
  category: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  clickedCategory: {
    color: 'blue',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 4,
  },
  clickedDescription: {
    color: 'blue',
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SettingsComponent;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
// import { useLocations } from './LocationsContext'; // Import the useLocations hook
// import MapScreen from './MapScreen';

// const SettingsComponent = () => {
//   const locations = useLocations(); // Use the useLocations hook to access locations data

//   const [apiData, setApiData] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [showSettings, setShowSettings] = useState(false);

//   // Fetch API data and set initial selected categories
//   useEffect(() => {
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => {
//         setApiData(data.Data);
//         // Set initial selected categories based on fetched data
//         setSelectedCategories(data.Data.map(item => item.Id));
//       })
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   // Fetch filtered locations when selected categories change
//   useEffect(() => {
//     if (selectedCategories.length > 0) {
//       const requestBody = {
//         Categories: selectedCategories.join(',')
//       };
      
//       fetch('https://dev.netisoft.in/reag/api/GetPOIs.php', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(requestBody)
//       })
//       .then(response => response.json())
//       .then(data => setFilteredLocations(data.Data))
//       .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   const handleItemPress = (item) => {
//     setSelectedCategories(prevSelectedCategories => {
//       if (prevSelectedCategories.includes(item.Id)) {
//         return prevSelectedCategories.filter(id => id !== item.Id);
//       } else {
//         return [...prevSelectedCategories, item.Id];
//       }
//     });
//   };

//   const isClicked = (item) => {
//     return selectedCategories.includes(item.Id);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => setShowSettings(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Settings</Text>
//       </TouchableOpacity>

//       {/* Modal for Settings Component */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showSettings}
//         onRequestClose={() => setShowSettings(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <ScrollView>
//               {apiData.map(item => (
//                 <TouchableOpacity
//                   key={item.Id}
//                   style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
//                   onPress={() => handleItemPress(item)}
//                 >
//                   <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
//                   <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//             <TouchableOpacity onPress={() => setShowSettings(false)} style={styles.closeButton}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* MapScreen */}
//       <MapScreen filteredLocations={filteredLocations} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   settingsButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 5,
//     elevation: 3,
//     zIndex: 1,
//   },
//   settingsButtonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     width: '80%',
//     maxHeight: '80%',
//   },
//   itemContainer: {
//     backgroundColor: '#f9f9f9',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   clickedItem: {
//     backgroundColor: 'lightblue',
//   },
//   category: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   clickedCategory: {
//     color: 'blue',
//   },
//   description: {
//     fontSize: 16,
//     color: '#333',
//     marginTop: 4,
//   },
//   clickedDescription: {
//     color: 'blue',
//   },
//   closeButton: {
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//     alignSelf: 'flex-end',
//     marginTop: 10,
//   },
//   closeButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default SettingsComponent;
