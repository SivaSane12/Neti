  // useEffect(() => {
  //   if (!userLocation || data.length === 0) return;
  
  //   const locationsWithDistances = data.map(item => ({
  //     ...item,
  //     distance: calculateDistance(
  //       userLocation.latitude,
  //       userLocation.longitude,
  //       parseFloat(item.Latitude),
  //       parseFloat(item.Longitude)
  //     )
  //   }));
  
  //   locationsWithDistances.sort((a, b) => a.distance - b.distance);
  
  //   const nearest = locationsWithDistances.slice(0, 4); // Get the first four nearest locations
  
  //   if (!nearest) return;
  
  //   nearest.forEach(location => {
  //     const { Title, distance, TriggerDistance, AudioURL } = location;
  //     if (distance <= TriggerDistance && !playAudioState[Title]) {
  //       // Play audio for this location if it's within trigger distance and not already played
  //       if (AudioURL) {
  //         AudioPlayer.play(AudioURL);
  //         // Update playAudioState for this location to prevent repeated playback
  //         setPlayAudioState(prevState => ({
  //           ...prevState,
  //           [Title]: true
  //         }));
  //       }
  //     }
  //   });
  
  //   // Clear playAudioState for locations that are no longer within trigger distance
  //   Object.keys(playAudioState).forEach(title => {
  //     const isNearest = nearest.some(location => location.Title === title);
  //     if (!isNearest && playAudioState[title]) {
  //       // Stop audio if it's no longer in trigger distance
  //       AudioPlayer.stop();
  //       // Reset playAudioState for this location
  //       setPlayAudioState(prevState => ({
  //         ...prevState,
  //         [title]: false
  //       }));
  //     }
  //   });
  
  //   // Update nearestLocations state
  //   setNearestLocations(nearest);
  // }, [userLocation, data, playAudioState]);





    // useEffect(() => {
  //   if (!userLocation || data.length === 0) return;
  
  //   const locationsWithDistances = data.map(item => ({
  //     ...item,
  //     distance: calculateDistance(
  //       userLocation.latitude,
  //       userLocation.longitude,
  //       parseFloat(item.Latitude),
  //       parseFloat(item.Longitude)
  //     )
  //   }));
  
  //   locationsWithDistances.sort((a, b) => a.distance - b.distance);
  
  //   const nearest = locationsWithDistances.slice(0, 4); // Get the first four nearest locations
  
  //   if (!nearest) return;
  
  //   // Loop through each nearest location
  //   nearest.forEach((location, index) => {
  //     const triggerDistance = location.distance <= location.TriggerDistance;
  
  //     if (triggerDistance) {
  //       // Play audio only if it's not already playing for this location
  //       if (location.AudioURL && !playAudioState[location.Title]) {
  //       //   AudioPlayer.play(location.AudioURL);
  //       //   setPlayAudioState(prevState => ({
  //       //     ...prevState,
  //       //     [location.Title]: true // Set playAudioState for this location to true
  //       //   }));
  //       // }
  //       setTimeout(() => {
  //         AudioPlayer.play(location.AudioURL);
  //         setPlayAudioState(prevState => ({
  //           ...prevState,
  //           [location.Title]: true // Set playAudioState for this location to true
  //         }));
  //       }, index * 6000); // Delay the audio play based on index
  //     }
  //     } else {
  //       // Stop audio if it's playing for this location
  //       if (playAudioState[location.Title]) {
  //         AudioPlayer.stop();
  //         setPlayAudioState(prevState => ({
  //           ...prevState,
  //           [location.Title]: false // Set playAudioState for this location to false
  //         }));
  //       }
  //     }
  //   });













//   -----------------------------------------------------------------------------------------------------------------------
//MapScreen 
// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';

// import SettingsComponent from './SettingsComponent';


// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const deg2rad = (deg) => deg * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Distance in meters
// };

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [data, setData] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);

//   const navigation = useNavigation();


//   const mapRef = useRef(null); // Create a reference to the MapView component

//   // Declare playAudioState object globally
//   const [playAudioState, setPlayAudioState] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://dev.netisoft.in/reag/api/GetPOIs.php');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         setData(jsonData.Data);

//         // Initialize playAudioState globally after fetching data
//         const playAudioStateObj = {};
//         jsonData.Data.forEach(item => {
//           playAudioStateObj[item.Title] = false;
//         });

//         setPlayAudioState(playAudioStateObj);
//         console.log('playAudioState Object Schema:', playAudioStateObj);
        
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let isMounted = true; // Variable to track if the component is mounted
  
//     // Function to fetch user's initial location
//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords); // Set userLocation state
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };
  
//     // Call fetchUserLocation when the component mounts
//     fetchUserLocation();
  
//     // Cleanup function to clear isMounted flag when the component unmounts
//     return () => {
//       isMounted = false;
//     };
//   }, []);
  

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 } // Watch for every 2 meters
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000); // Update every 5 seconds
//     };

//     watchUserLocation();
//     updateUserLocation();

//     // Cleanup function to clear the watchId and intervalId
//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || data.length === 0) return;
  
//     const locationsWithDistances = data.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));
  
//     locationsWithDistances.sort((a, b) => a.distance - b.distance);
  
//     const nearest = locationsWithDistances.slice(0, 4); // Get the first four nearest locations
  
//     if (!nearest) return;
  
//     // Loop through each nearest location
//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;
  
//       if (triggerDistance) {
//         // Play audio only if it's not already playing for this location
//         if (location.AudioURL && !playAudioState[location.Title]) {
//         setTimeout(() => {
//           AudioPlayer.play(location.AudioURL);
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: true // Set playAudioState for this location to true
//           }));
//         }, index * 6000); // Delay the audio play based on index
//       }
//       } else {
//         // Stop audio if it's playing for this location
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false // Set playAudioState for this location to false
//           }));
//         }
//       }
//     });
  
//     setNearestLocations(nearest);
//   }, [userLocation, data]);
  

 


//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         // Check if mapRef is not null before calling animateToRegion
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };



// const handleSettingPress = () => {
//     navigation.navigate('Settings');
//     console.log('Setting button pressed');
//   };


//     return (
//       <View style={{ flex: 1 }}>

//         {userLocation && (
//           <MapView
//             ref={mapRef} // Assign the reference to the MapView component
//             style={{ flex: 1 }}
//             initialRegion={{
//               latitude: userLocation.latitude,
//               longitude: userLocation.longitude,
//               latitudeDelta: 0.0222,
//               longitudeDelta: 0.0221,
//             }}
//           >
//             {data.map(location => (
//               <Marker
//                 key={location.Title} // Unique key prop based on Title
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude),
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />
//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title} // Unique key prop based on Title
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />
//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//             {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//         {/* Settings button */}
//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Settings</Text>
//         </TouchableOpacity>
  
//         {nearestLocations.length > 0 && (
//         <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}
  
//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}
  
//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>
//       </View>    
//     );
//   }


//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 20, // Add padding to provide space from edges
//     },
//     settingButton: {
//       position: 'absolute',
//       top: 10, // Adjust the top value as needed for spacing from top
//       right: 10, // Adjust the right value as needed for spacing from right
//     },
//   });

// export default MapScreen;




//  ---------------------------------------------------------------------------------------------------------------------
//App.js




// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SettingsComponent from './SettingsComponent';
// // import MapScreen from './MapScreen'; // Import the MapScreen component

// const Stack = createStackNavigator();


// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const deg2rad = (deg) => deg * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Distance in meters
// };

// const App = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [data, setData] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);

//   const mapRef = useRef(null); // Create a reference to the MapView component

//   // Declare playAudioState object globally
//   const [playAudioState, setPlayAudioState] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://dev.netisoft.in/reag/api/GetPOIs.php');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         setData(jsonData.Data);

//         // Initialize playAudioState globally after fetching data
//         const playAudioStateObj = {};
//         jsonData.Data.forEach(item => {
//           playAudioStateObj[item.Title] = false;
//         });

//         setPlayAudioState(playAudioStateObj);
//         console.log('playAudioState Object Schema:', playAudioStateObj);
        
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let isMounted = true; // Variable to track if the component is mounted
  
//     // Function to fetch user's initial location
//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords); // Set userLocation state
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };
  
//     // Call fetchUserLocation when the component mounts
//     fetchUserLocation();
  
//     // Cleanup function to clear isMounted flag when the component unmounts
//     return () => {
//       isMounted = false;
//     };
//   }, []);
  

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 } // Watch for every 2 meters
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000); // Update every 5 seconds
//     };

//     watchUserLocation();
//     updateUserLocation();

//     // Cleanup function to clear the watchId and intervalId
//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || data.length === 0) return;
  
//     const locationsWithDistances = data.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));
  
//     locationsWithDistances.sort((a, b) => a.distance - b.distance);
  
//     const nearest = locationsWithDistances.slice(0, 4); // Get the first four nearest locations
  
//     if (!nearest) return;
  
//     // Loop through each nearest location
//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;
  
//       if (triggerDistance) {
//         // Play audio only if it's not already playing for this location
//         if (location.AudioURL && !playAudioState[location.Title]) {
//         //   AudioPlayer.play(location.AudioURL);
//         //   setPlayAudioState(prevState => ({
//         //     ...prevState,
//         //     [location.Title]: true // Set playAudioState for this location to true
//         //   }));
//         // }
//         setTimeout(() => {
//           AudioPlayer.play(location.AudioURL);
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: true // Set playAudioState for this location to true
//           }));
//         }, index * 6000); // Delay the audio play based on index
//       }
//       } else {
//         // Stop audio if it's playing for this location
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false // Set playAudioState for this location to false
//           }));
//         }
//       }
//     });
  
//     setNearestLocations(nearest);
//   }, [userLocation, data]);
  

//   // useEffect(() => {
//   //   if (!userLocation || data.length === 0) return;
  
//   //   const locationsWithDistances = data.map(item => ({
//   //     ...item,
//   //     distance: calculateDistance(
//   //       userLocation.latitude,
//   //       userLocation.longitude,
//   //       parseFloat(item.Latitude),
//   //       parseFloat(item.Longitude)
//   //     )
//   //   }));
  
//   //   locationsWithDistances.sort((a, b) => a.distance - b.distance);
  
//   //   const nearest = locationsWithDistances.slice(0, 4); // Get the first four nearest locations
  
//   //   if (!nearest) return;
  
//   //   nearest.forEach(location => {
//   //     const { Title, distance, TriggerDistance, AudioURL } = location;
//   //     if (distance <= TriggerDistance && !playAudioState[Title]) {
//   //       // Play audio for this location if it's within trigger distance and not already played
//   //       if (AudioURL) {
//   //         AudioPlayer.play(AudioURL);
//   //         // Update playAudioState for this location to prevent repeated playback
//   //         setPlayAudioState(prevState => ({
//   //           ...prevState,
//   //           [Title]: true
//   //         }));
//   //       }
//   //     }
//   //   });
  
//   //   // Clear playAudioState for locations that are no longer within trigger distance
//   //   Object.keys(playAudioState).forEach(title => {
//   //     const isNearest = nearest.some(location => location.Title === title);
//   //     if (!isNearest && playAudioState[title]) {
//   //       // Stop audio if it's no longer in trigger distance
//   //       AudioPlayer.stop();
//   //       // Reset playAudioState for this location
//   //       setPlayAudioState(prevState => ({
//   //         ...prevState,
//   //         [title]: false
//   //       }));
//   //     }
//   //   });
  
//   //   // Update nearestLocations state
//   //   setNearestLocations(nearest);
//   // }, [userLocation, data, playAudioState]);
  

  


//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         // Check if mapRef is not null before calling animateToRegion
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };


    

//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Map" component={() => <MapScreen userLocation={userLocation} nearestLocations={nearestLocations} data={data} />} />
//         <Stack.Screen name="Settings" component={SettingsComponent} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };
// const MapScreen = ({ userLocation, nearestLocations, data }) => {

//   const mapRef = useRef(null);

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         // Check if mapRef is not null before calling animateToRegion
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//     return (
//       <View style={{ flex: 1 }}>
//         {userLocation && (
//           <MapView
//             ref={mapRef} // Assign the reference to the MapView component
//             style={{ flex: 1 }}
//             initialRegion={{
//               latitude: userLocation.latitude,
//               longitude: userLocation.longitude,
//               latitudeDelta: 0.0222,
//               longitudeDelta: 0.0221,
//             }}
//           >
//             {data.map(location => (
//               <Marker
//                 key={location.Title} // Unique key prop based on Title
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude),
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />
//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title} // Unique key prop based on Title
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />
//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//             {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}
  
//         {nearestLocations.length > 0 && (
//         <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}
  
//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}
  
//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>
//       </View>    
//     );
//   }

// export default App;




// // App.js
// import React from 'react';
// import { View, Text, Button } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SettingsComponent from './SettingsComponent';

// const Stack = createStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Settings" component={SettingsComponent} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const HomeScreen = ({ navigation }) => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//     </View>
//   );
// };

// export default App;



// // App.js

// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator, StackNavigator, Screen } from '@react-navigation/stack';
// import SettingsComponent from './SettingsComponent';
// import MapScreen from './MapScreen'; // Import the MapScreen component

// const Stack = createStackNavigator();

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const deg2rad = (deg) => deg * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Distance in meters
// };

// const App = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [data, setData] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);

//   const mapRef = useRef(null); // Create a reference to the MapView component

//   // Declare playAudioState object globally
//   const [playAudioState, setPlayAudioState] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://dev.netisoft.in/reag/api/GetPOIs.php');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         setData(jsonData.Data);

//         // Initialize playAudioState globally after fetching data
//         const playAudioStateObj = {};
//         jsonData.Data.forEach(item => {
//           playAudioStateObj[item.Title] = false;
//         });

//         setPlayAudioState(playAudioStateObj);
//         console.log('playAudioState Object Schema:', playAudioStateObj);
        
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let isMounted = true; // Variable to track if the component is mounted
  
//     // Function to fetch user's initial location
//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords); // Set userLocation state
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };
  
//     // Call fetchUserLocation when the component mounts
//     fetchUserLocation();
  
//     // Cleanup function to clear isMounted flag when the component unmounts
//     return () => {
//       isMounted = false;
//     };
//   }, []);
  

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 } // Watch for every 2 meters
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000); // Update every 5 seconds
//     };

//     watchUserLocation();
//     updateUserLocation();

//     // Cleanup function to clear the watchId and intervalId
//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || data.length === 0) return;
  
//     const locationsWithDistances = data.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));
  
//     locationsWithDistances.sort((a, b) => a.distance - b.distance);
  
//     const nearest = locationsWithDistances.slice(0, 4); // Get the first four nearest locations
  
//     if (!nearest) return;
  
//     // Loop through each nearest location
//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;
  
//       if (triggerDistance) {
//         // Play audio only if it's not already playing for this location
//         if (location.AudioURL && !playAudioState[location.Title]) {
//         //   AudioPlayer.play(location.AudioURL);
//         //   setPlayAudioState(prevState => ({
//         //     ...prevState,
//         //     [location.Title]: true // Set playAudioState for this location to true
//         //   }));
//         // }
//         setTimeout(() => {
//           AudioPlayer.play(location.AudioURL);
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: true // Set playAudioState for this location to true
//           }));
//         }, index * 6000); // Delay the audio play based on index
//       }
//       } else {
//         // Stop audio if it's playing for this location
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false // Set playAudioState for this location to false
//           }));
//         }
//       }
//     });
  
//     setNearestLocations(nearest);
//   }, [userLocation, data]);
  
//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         // Check if mapRef is not null before calling animateToRegion
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   return (
//     <NavigationContainer>
//       <StackNavigator>
//         <Screen
//           name="Map"
//           component={MapScreen}
//           initialParams={{ userLocation: userLocation, nearestLocations: nearestLocations, data: data, setUserLocation: setUserLocation }}
//         />
//         <Stack.Screen name="Settings" component={SettingsComponent} />
//       </StackNavigator>
//         {/* Pass userLocation, nearestLocations, and playAudio as props to the MapScreen component */}
//         {/* <Stack.Screen name="Map" component={() => <MapScreen userLocation={userLocation} nearestLocations={nearestLocations} data={data} playAudio={playAudio} setUserLocation={setUserLocation} />} /> */}
//     </NavigationContainer>
//   );
// };

// export default App;








// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// // import SettingsComponent from './SettingsComponent';


// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const deg2rad = (deg) => deg * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Distance in meters
// };

// const App = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [data, setData] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);

//   const mapRef = useRef(null); // Create a reference to the MapView component

//   // Declare playAudioState object globally
//   const [playAudioState, setPlayAudioState] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://dev.netisoft.in/reag/api/GetPOIs.php');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         setData(jsonData.Data);

//         // Initialize playAudioState globally after fetching data
//         const playAudioStateObj = {};
//         jsonData.Data.forEach(item => {
//           playAudioStateObj[item.Title] = false;
//         });

//         setPlayAudioState(playAudioStateObj);
//         console.log('playAudioState Object Schema:', playAudioStateObj);
        
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let isMounted = true; // Variable to track if the component is mounted
  
//     // Function to fetch user's initial location
//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords); // Set userLocation state
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };
  
//     // Call fetchUserLocation when the component mounts
//     fetchUserLocation();
  
//     // Cleanup function to clear isMounted flag when the component unmounts
//     return () => {
//       isMounted = false;
//     };
//   }, []);
  

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 } // Watch for every 2 meters
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000); // Update every 5 seconds
//     };

//     watchUserLocation();
//     updateUserLocation();

//     // Cleanup function to clear the watchId and intervalId
//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || data.length === 0) return;
  
//     const locationsWithDistances = data.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));
  
//     locationsWithDistances.sort((a, b) => a.distance - b.distance);
  
//     const nearest = locationsWithDistances.slice(0, 4); // Get the first four nearest locations
  
//     if (!nearest) return;
  
//     // Loop through each nearest location
//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;
  
//       if (triggerDistance) {
//         // Play audio only if it's not already playing for this location
//         if (location.AudioURL && !playAudioState[location.Title]) {
//         setTimeout(() => {
//           AudioPlayer.play(location.AudioURL);
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: true // Set playAudioState for this location to true
//           }));
//         }, index * 6000); // Delay the audio play based on index
//       }
//       } else {
//         // Stop audio if it's playing for this location
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false // Set playAudioState for this location to false
//           }));
//         }
//       }
//     });
  
//     setNearestLocations(nearest);
//   }, [userLocation, data]);
  

 


//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         // Check if mapRef is not null before calling animateToRegion
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleSettingPress = () => {
//     // Implement your logic here to handle settings button press
//     console.log('Setting button pressed');
// };


//     return (
//       <View style={{ flex: 1 }}>

//         {userLocation && (
//           <MapView
//             ref={mapRef} // Assign the reference to the MapView component
//             style={{ flex: 1 }}
//             initialRegion={{
//               latitude: userLocation.latitude,
//               longitude: userLocation.longitude,
//               latitudeDelta: 0.0222,
//               longitudeDelta: 0.0221,
//             }}
//           >
//             {data.map(location => (
//               <Marker
//                 key={location.Title} // Unique key prop based on Title
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude),
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />
//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title} // Unique key prop based on Title
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />
//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//             {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//         {/* Settings button */}
//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Settings</Text>
//         </TouchableOpacity>
  
//         {nearestLocations.length > 0 && (
//         <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}
  
//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}
  
//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>
//       </View>    
//     );
//   }


//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 20, // Add padding to provide space from edges
//     },
//     settingButton: {
//       position: 'absolute',
//       top: 10, // Adjust the top value as needed for spacing from top
//       right: 10, // Adjust the right value as needed for spacing from right
//     },
//   });

// export default App;





// -------------------------------------------------------------------------------------------------------------------

//SettingsComponent.js 

// import React from 'react';
// import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';

// const SettingsComponent = () => {
//   // Dummy data categorized into sections
//   const dummyData = [
//     {
//       title: 'Account Settings',
//       data: [
//         { id: '1', name: 'Edit Profile' },
//         { id: '2', name: 'Change Password' },
//         { id: '3', name: 'Privacy Settings' },
//         { id: '4', name: 'Account Security' },
//       ],
//     },
//     {
//       title: 'Notification Settings',
//       data: [
//         { id: '5', name: 'Push Notifications' },
//         { id: '6', name: 'Email Notifications' },
//         { id: '7', name: 'SMS Notifications' },
//         { id: '8', name: 'Notification Preferences' },
//       ],
//     },
//     {
//       title: 'App Settings',
//       data: [
//         { id: '9', name: 'Language' },
//         { id: '10', name: 'Theme' },
//         { id: '11', name: 'Data Usage' },
//         { id: '12', name: 'Accessibility' },
//       ],
//     },
//     // Add more sections as needed
//   ];

//   const handleItemPress = (name) => {
//     console.log('Clicked on:', name);
//   };

//   return (
//     <View style={styles.container}>
//       <SectionList
//         sections={dummyData}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleItemPress(item.name)}>
//             <View style={styles.item}>
//               <Text style={styles.itemText}>{item.name}</Text>
//             </View>
//           </TouchableOpacity>
//         )}
//         renderSectionHeader={({ section: { title } }) => (
//           <Text style={styles.sectionHeader}>{title}</Text>
//         )}
//         keyExtractor={item => item.id}
//         stickySectionHeadersEnabled={false} // Disable sticky headers
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: 16,
//   },
//   sectionHeader: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     backgroundColor: '#fff',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     margin: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     color: '#000',
//   },
//   item: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default SettingsComponent;



// import React, { useState, useEffect } from 'react';
// import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';

// const SettingsComponent = () => {
//   const [apiData, setApiData] = useState([]);

//   useEffect(() => {
//     // Fetch API data here
//     // Example fetch request
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setApiData(data.Data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   const handleItemPress = (name) => {
//     console.log('Clicked on:', name);
//   };

//   return (
//     <View style={styles.container}>
//       {apiData && apiData.length > 0 ? (
//         <SectionList
//           sections={apiData}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleItemPress(item.Description)}>
//               <View style={styles.item}>
//                 <Text style={styles.itemText}>{item.Description}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//           renderSectionHeader={({ section }) => (
//             <Text style={styles.sectionHeader}>{section.Category}</Text>
//           )}
//           keyExtractor={item => item.Id}
//           stickySectionHeadersEnabled={false}
//         />
//       ) : (
//         <Text>Loading...</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: 16,
//   },
//   sectionHeader: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     backgroundColor: '#fff',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     margin: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     color: '#000',
//   },
//   item: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemText: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default SettingsComponent;


// ------------------------------------------------------------------------------------------------------------

// SettingsComponent.js


  // import React, { useState, useEffect } from 'react';
  // import { View, Text, StyleSheet,ScrollView } from 'react-native';  

  // const SettingsComponent = () => {
  //   const [apiData, setApiData] = useState([]);

  //   useEffect(() => {
  //     // Fetch API data here
  //     // Example fetch request
  //     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
  //       .then(response => response.json())
  //       .then(data => setApiData(data.Data))
  //       .catch(error => console.error('Error fetching data:', error));
  //   }, []);

  //   const [clickedItem, setClickedItem] = useState(null);

  //   const handleItemPress = (item) => {
  //     setClickedItem(item);
  //     console.log('Clicked on:', item.Description);
  //   };

  //   const isClicked = (item) => {
  //     return clickedItem && clickedItem.Id === item.Id;
  //   };

  //   return (
  //     <ScrollView style={styles.container}>
  //     <View style={styles.container}>
  //       {apiData.map(item => (
  //         <View
  //           key={item.Id}
  //           style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
  //           onTouchStart={() => handleItemPress(item)}>
  //           <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
  //           <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
  //         </View>
  //       ))}
  //     </View>
  //     </ScrollView>
  //   );
  // };

  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     backgroundColor: '#f9f9f9',
  //     paddingHorizontal: 16,
  //   },
  //   itemContainer: {
  //     backgroundColor: '#fff',
  //     paddingVertical: 12,
  //     paddingHorizontal: 16,
  //     borderBottomWidth: 1,
  //     borderBottomColor: '#ccc',
  //     marginBottom: 8,
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
  // });

  // export default SettingsComponent;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useLocations } from './LocationsContext'; // Import the useLocations hook

// const SettingsComponent = () => {
//   const locations = useLocations(); // Use the useLocations hook to access locations data

//   const [apiData, setApiData] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [clickedItem, setClickedItem] = useState(null);

//   useEffect(() => {
//     // Fetch API data here
//     // Example fetch request
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setApiData(data.Data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   useEffect(() => {
//     // Filter locations based on whether the name contains the clicked item's description
//     if (clickedItem) {
//       const filtered = locations.filter(location => location.Title.includes(clickedItem.Category));
//       setFilteredLocations(filtered);
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [clickedItem, locations]);

//   const handleItemPress = (item) => {
//     setClickedItem(item);
//     console.log('Clicked on:', item.Description);
//   };

//   const isClicked = (item) => {
//     return clickedItem && clickedItem.Id === item.Id;
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.container}>
//         {apiData.map(item => (
//           <View
//             key={item.Id}
//             style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
//             onTouchStart={() => handleItemPress(item)}>
//             <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
//             <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Display filtered locations */}
//       {filteredLocations.map(location => (
//         <View key={location.id} style={styles.filteredContainer}>
//           <Text style={styles.filteredName}>{location.name}</Text>
//           {/* Display other location data as needed */}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: 16,
//   },
//   itemContainer: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
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
//   filteredContainer: {
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
//   },
//   filteredName: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default SettingsComponent;


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useLocations } from './LocationsContext'; // Import the useLocations hook

// const SettingsComponent = () => {
//   const locations = useLocations(); // Use the useLocations hook to access locations data

//   const [apiData, setApiData] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [clickedItem, setClickedItem] = useState(null);

//   useEffect(() => {
//     // Fetch API data here
//     // Example fetch request
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setApiData(data.Data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);
  
//   useEffect(() => {
    
//     // Filter locations based on whether the Title contains the clicked item's description
//     if (clickedItem) {
//       const filtered = locations.filter(location => location.Title && location.Title.includes(clickedItem.Category));
//       setFilteredLocations(filtered);
//       console.log(clickedItem.Category);
      
//     } else {
//       setFilteredLocations([]);
//     }

//   }, [clickedItem, locations]);

//   const handleItemPress = (item) => {
//     setClickedItem(item);
//     console.log('Clicked on:', item.Description);
//   };

//   const isClicked = (item) => {
//     return clickedItem && clickedItem.Id === item.Id;
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.container}>
//         {apiData.map(item => (
//           <View
//             key={item.Id}
//             style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
//             onTouchStart={() => handleItemPress(item)}>
//             <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
//             <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Display filtered locations */}
//       {filteredLocations.map(location => (
//         <View key={location.id} style={styles.filteredContainer}>
//           <Text style={styles.filteredTitle}>{location.Title}</Text>
//           {/* Display other location data as needed */}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: 16,
//   },
//   itemContainer: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
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
//   filteredContainer: {
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
//   },
//   filteredTitle: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default SettingsComponent;

  
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useLocations } from './LocationsContext'; // Import the useLocations hook

// const SettingsComponent = () => {
//   const locations = useLocations(); // Use the useLocations hook to access locations data

//   const [clickedItem, setClickedItem] = useState(null);

//   const handleItemPress = (item) => {
//     setClickedItem(item);
//     console.log('Clicked on:', item.Description);
//   };

//   const isClicked = (item) => {
//     return clickedItem && clickedItem.Id === item.Id;
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {locations.map(item => (
//         <View
//           key={item.Id}
//           style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
//           onTouchStart={() => handleItemPress(item)}>
//           <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
//           <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: 16,
//   },
//   itemContainer: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
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
// });

// export default SettingsComponent;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useLocations } from './LocationsContext'; // Import the useLocations hook

// const SettingsComponent = () => {
//   const locations = useLocations(); // Use the useLocations hook to access locations data

//   const [clickedItem, setClickedItem] = useState(null);

//   const handleItemPress = (item) => {
//     setClickedItem(item);
//     console.log('Clicked on:', item.Description);
//   };

//   const isClicked = (item) => {
//     return clickedItem && clickedItem.Id === item.Id;
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView style={styles.settingsList}>
//         {locations.map(item => (
//           <View
//             key={item.Id}
//             style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
//             onTouchStart={() => handleItemPress(item)}>
//             <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
//             <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
//           </View>
//         ))}
//       </ScrollView>
//       {clickedItem && (
//         <View style={styles.categoryDataContainer}>
//           <Text style={styles.categoryDataTitle}>{clickedItem.Category} Data:</Text>
//           <Text style={styles.categoryData}>{clickedItem.CategoryData}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//   },
//   settingsList: {
//     maxHeight: '70%', // Adjust as needed
//   },
//   itemContainer: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
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
//   categoryDataContainer: {
//     backgroundColor: '#fff',
//     padding: 16,
//     marginTop: 8,
//   },
//   categoryDataTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: 'blue',
//   },
//   categoryData: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default SettingsComponent;



// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useLocations } from './LocationsContext'; // Import the useLocations hook

// const SettingsComponent = () => {
//   const locations = useLocations(); // Use the useLocations hook to access locations data

//   const [clickedItem, setClickedItem] = useState(null);

//   const handleItemPress = (item) => {
//     setClickedItem(item);
//     console.log('Clicked on:', item.Description);
//   };

//   const isClicked = (item) => {
//     return clickedItem && clickedItem.Id === item.Id;
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {locations.map(item => (
//         <View
//           key={item.Id}
//           style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
//           onTouchStart={() => handleItemPress(item)}>
//           <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
//           <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
//           {isClicked(item) && (
//             <View style={styles.categoryDataContainer}>
//               <Text style={styles.categoryData}>Category: {item.Category}</Text>
//               <Text style={styles.categoryData}>Description: {item.Description}</Text>
//               <Text style={styles.categoryData}>Latitude: {item.Latitude}</Text>
//               <Text style={styles.categoryData}>Longitude: {item.Longitude}</Text>
//               {/* Add more category data as needed */}
//             </View>
//           )}
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: 16,
//   },
//   itemContainer: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
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
//   categoryDataContainer: {
//     marginTop: 8,
//     backgroundColor: '#f0f0f0',
//     padding: 8,
//     borderRadius: 5,
//   },
//   categoryData: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default SettingsComponent;







// ------------------------------------------------------------------------------------------------------------------------

//MapsScreen.js



// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const deg2rad = (deg) => deg * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Distance in meters
// };

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [data, setData] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);

//   const navigation = useNavigation();
//   const mapRef = useRef(null); // Create a reference to the MapView component

//   // Declare playAudioState object globally
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false); // State to track mute state

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://dev.netisoft.in/reag/api/GetPOIs.php');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const jsonData = await response.json();
//         setData(jsonData.Data);

//         // Initialize playAudioState globally after fetching data
//         const playAudioStateObj = {};
//         jsonData.Data.forEach(item => {
//           playAudioStateObj[item.Title] = false;
//         });

//         setPlayAudioState(playAudioStateObj);
//         console.log('playAudioState Object Schema:', playAudioStateObj);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     let isMounted = true; // Variable to track if the component is mounted

//     // Function to fetch user's initial location
//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords); // Set userLocation state
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     // Call fetchUserLocation when the component mounts
//     fetchUserLocation();

//     // Cleanup function to clear isMounted flag when the component unmounts
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 } // Watch for every 2 meters
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000); // Update every 5 seconds
//     };

//     watchUserLocation();
//     updateUserLocation();

//     // Cleanup function to clear the watchId and intervalId
//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || data.length === 0) return;

//     const locationsWithDistances = data.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4); // Get the first four nearest locations

//     if (!nearest) return;

//     // Loop through each nearest location
//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         // Play audio only if it's not already playing for this location
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true // Set playAudioState for this location to true
//             }));
//           }, index * 6000); // Delay the audio play based on index
//         }
//       } else {
//         // Stop audio if it's playing for this location
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false // Set playAudioState for this location to false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, data]);

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         // Check if mapRef is not null before calling animateToRegion
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleSettingPress = () => {
//     navigation.navigate('Settings');
//     console.log('Setting button pressed');
//   };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>

//       {userLocation && (
//         <MapView
//           ref={mapRef} // Assign the reference to the MapView component
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >
//             {data.map(location => (
//               <Marker
//                 key={location.Title} // Unique key prop based on Title
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />
//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title} // Unique key prop based on Title
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />
//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//             {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}
  
//         {/* Settings button */}
//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Settings</Text>
//         </TouchableOpacity>
  
//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}
  
//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}
  
//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         {/* Mute button */}
//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//         <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//       </TouchableOpacity>

//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 20, // Add padding to provide space from edges
//     },
//     settingButton: {
//       position: 'absolute',
//       top: 10, // Adjust the top value as needed for spacing from top
//       right: 10, // Adjust the right value as needed for spacing from right
//     },
//     muteButton: {
//         position: 'absolute',
//         bottom: 80, // Adjust position as needed
//         alignSelf: 'center',
//         backgroundColor: 'red',
//         padding: 10,
//         borderRadius: 5,
//       },
//   });
  
//   export default MapScreen;
  






// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';
// import { useLocations } from './LocationsContext'; // Import the useLocations hook from the context

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const deg2rad = (deg) => deg * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Distance in meters
// };

// const MapScreen = ({ filteredLocations }) => {
  
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);

//   const navigation = useNavigation();
//   const mapRef = useRef(null);

//   // Using the useLocations hook to access the locations data
//   const locations = useLocations();

//   // console.log(filteredLocations);
//   // console.log(locations)

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

  // useEffect(() => {
  //   if (!userLocation || !locations.length) return;

  //   const locationsWithDistances = locations.map(item => ({
  //     ...item,
  //     distance: calculateDistance(
  //       userLocation.latitude,
  //       userLocation.longitude,
  //       parseFloat(item.Latitude),
  //       parseFloat(item.Longitude)
  //     )
  //   }));

  //   locationsWithDistances.sort((a, b) => a.distance - b.distance);

  //   const nearest = locationsWithDistances.slice(0, 4);

  //   if (!nearest) return;

  //   nearest.forEach((location, index) => {
  //     const triggerDistance = location.distance <= location.TriggerDistance;

  //     if (triggerDistance) {
  //       if (location.AudioURL && !playAudioState[location.Title]) {
  //         setTimeout(() => {
  //           AudioPlayer.play(location.AudioURL);
  //           setPlayAudioState(prevState => ({
  //             ...prevState,
  //             [location.Title]: true
  //           }));
  //         }, index * 6000);
  //       }
  //     } else {
  //       if (playAudioState[location.Title]) {
  //         AudioPlayer.stop();
  //         setPlayAudioState(prevState => ({
  //           ...prevState,
  //           [location.Title]: false
  //         }));
  //       }
  //     }
  //   });

//     setNearestLocations(nearest);
//   }, [userLocation, locations]);

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleSettingPress = () => {
//     navigation.navigate('Settings');
//     console.log('Setting button pressed');
//   };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>

//       {userLocation && (
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >
//             {locations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />
//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />
//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//             {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}
  
//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Settings</Text>
//         </TouchableOpacity>
  
//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}
  
//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}
  
//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 20, // Add padding to provide space from edges
//     },
//     settingButton: {
//       position: 'absolute',
//       top: 10, // Adjust the top value as needed for spacing from top
//       right: 10, // Adjust the right value as needed for spacing from right
//     },
//     muteButton: {
//         position: 'absolute',
//         bottom: 80, // Adjust position as needed
//         alignSelf: 'center',
//         backgroundColor: 'red',
//         padding: 10,
//         borderRadius: 5,
//       },
//   });
  
//   export default MapScreen;




// --------------------------------------------------------------------------------------------------------------------------

// Updated SettingsComponent.js


// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import { useLocations } from './LocationsContext'; // Import the useLocations hook
// import MapScreen from './MapScreen';

// const SettingsComponent = () => {
//   const locations = useLocations(); // Use the useLocations hook to access locations data

//   const [apiData, setApiData] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);


//   useEffect(() => {
//     // Fetch API data here
//     // Example fetch request
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setApiData(data.Data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);
  
//   useEffect(() => {
//     // Fetch filtered locations when selected categories change
//     if (selectedCategories.length > 0) {
//       // Prepare the request body
//       const requestBody = {
//         Categories: selectedCategories.join(',') // Convert selected category IDs to comma-separated string
//       };
      
//       // Fetch locations based on selected categories
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
//       // Reset filtered locations when no category is selected
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   const handleItemPress = (item) => {
//     // Toggle selection of category
//     setSelectedCategories(prevSelectedCategories => {
//       if (prevSelectedCategories.includes(item.Id)) {
//         return prevSelectedCategories.filter(id => id !== item.Id); // Deselect category
//       } else {
//         return [...prevSelectedCategories, item.Id]; // Select category
//       }
//     });
//     console.log('Clicked on:', item.Description);
//   };

//   const isClicked = (item) => {
//     return selectedCategories.includes(item.Id);
//   };

//   return (
//     <>
//     <MapScreen filteredLocations={filteredLocations} />
//     <ScrollView style={styles.container}>
//       <View style={styles.container}>
//         {apiData.map(item => (
//           <View
//             key={item.Id}
//             style={[styles.itemContainer, isClicked(item) && styles.clickedItem]}
//             onTouchStart={() => handleItemPress(item)}>
//             <Text style={[styles.category, isClicked(item) && styles.clickedCategory]}>{item.Category}</Text>
//             <Text style={[styles.description, isClicked(item) && styles.clickedDescription]}>{item.Description}</Text>
//           </View>
//         ))}
//       </View>

//       {/* Display filtered locations */}
//       {filteredLocations && filteredLocations.map(location => (
//         <View key={location.id} style={styles.filteredContainer}>
//           <Text style={styles.filteredTitle}>{location.Title}</Text>
//           {/* Display other location data as needed */}
//         </View>
//       ))}
//     </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     paddingHorizontal: 16,
//   },
//   itemContainer: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
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
//   filteredContainer: {
//     backgroundColor: '#f0f0f0',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     marginBottom: 8,
//   },
//   filteredTitle: {
//     fontSize: 16,
//     color: '#333',
//   },
// });

// export default SettingsComponent;


// -------------------------------------------------------------------------------------------------------------

// updated MapScreen.js 



// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';

// const MapScreen = ({ filteredLocations }) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false); // State to manage showing/hiding categories
//   const [showCategoriesOnMap, setShowCategoriesOnMap] = useState(false);

//   const navigation = useNavigation();
//   const mapRef = useRef(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleSettingPress = () => {
//     setShowCategories(!showCategories); // Toggle the state to show/hide categories
//         // Toggle the state when "Categories" button is pressed
//         // setShowCategories(prevState => !prevState);
//         // setShowCategoriesOnMap(prevState => !prevState);
//     console.log('Setting button pressed');
//   };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>

//       {userLocation && (
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (              
//           <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//         {/* Toggle Categories button */}
//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity>

//         {/* Categories List */}
//         {showCategories && (
//           <View style={styles.categoriesContainer}>
//             <Text style={styles.categoriesTitle}>Categories</Text>
//             {/* Iterate over categories and render them */}
//             {filteredLocations?.map(location => (
//               <View key={location.Title} style={styles.categoryItem}>
//                 <Text style={styles.categoryTitle}>{location.Title}</Text>
//                 <Text style={styles.categoryDescription}>{location.Description}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Nearest Locations */}
//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {/* Display current audio status */}
//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         {/* Refresh Button */}
//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         {/* Mute Toggle Button */}
//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   categoriesContainer: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//     zIndex: 1,
//   },
//   categoriesTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   categoryItem: {
//     marginBottom: 10,
//   },
//   categoryTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   categoryDescription: {
//     fontSize: 12,
//   },
//   muteButton: {
//     position: 'absolute',
//     bottom: 80,
//     alignSelf: 'center',
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
//   categoriesButton: {
//     position: 'absolute',
//     top: 20,
//     right: 20,
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//     zIndex: 1,
//   },
//   categoriesButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default MapScreen;

             
// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const deg2rad = (deg) => deg * (Math.PI / 180);
//   const R = 6371; // Radius of the Earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c * 1000; // Distance in meters
// };

// const MapScreen = ({ filteredLocations }) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);  
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   // const navigation = useNavigation();
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   useEffect(() => {
//     // Fetch filtered locations when selected categories change
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
//         .then(response => response.json())
//         .then(data => setNearestLocations(data.Data))
//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setNearestLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || !nearestLocations?.length) return;

//     const locationsWithDistances = nearestLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, nearestLocations]);

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleSettingPress = () => {
//     setShowCategories(true);
//   };

//   const handleCategoryToggle = categoryId => {
//     setSelectedCategories(prevSelectedCategories => {
//       if (prevSelectedCategories.includes(categoryId)) {
//         return prevSelectedCategories.filter(id => id !== categoryId);
//       } else {
//         return [...prevSelectedCategories, categoryId];
//       }
//     });
//   };

//   return (
//     <View style={{ flex: 1 }}>

//       {userLocation && (
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//           {/* Render markers for nearest locations */}
//           {nearestLocations?.map(location => (
//             <Marker
//               key={location.Title}
//               coordinate={{
//                 latitude: parseFloat(location.Latitude),
//                 longitude: parseFloat(location.Longitude)
//               }}
//               title={location.Title}
//               description={location.Description}
//             />
//           ))}

//             {/* Render marker for user's location */}
//             {userLocation && (
//             <Marker
//               coordinate={{
//                 latitude: userLocation.latitude,
//                 longitude: userLocation.longitude,
//               }}
//               title="User Location"
//               pinColor="blue"
//             />
//           )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity>


//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={showCategories}
//           onRequestClose={() => setShowCategories(false)}
//         >
//           <View style={styles.modalContainer}>
//             <ScrollView contentContainerStyle={styles.modalContent}>
//               {/* Render categories */}
//               {categories.map(category => (
//                 <TouchableOpacity
//                   key={category.Id}
//                   style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//                   onPress={() => handleCategoryToggle(category.Id)}
//                 >
//                   <Text style={styles.categoryText}>{category.Category}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
//         </Modal>



//         {nearestLocations?.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14 }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12 }}>Distance: {nearest && nearest.distance ? nearest.distance.toFixed(2) : 'Unknown'} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     width: '100%',
//     height: '100%',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     paddingRight: 100, // Adjust paddingRight to increase width
//     paddingLeft: 100, // Adjust paddingLeft to increase width
//     paddingBottom: 240,
//     width: '80%',
//     maxWidth: 400, // Max width for the modal content
//     borderRadius: 10,
//     elevation: 5, // For Android
//     shadowColor: 'black', // For iOS
//     shadowOffset: { width: 0, height: 2 }, // For iOS
//     shadowOpacity: 0.2, // For iOS
//     shadowRadius: 4, // For iOS
//   },
//   categoryItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0, 0, 0, 0.2)',
//   },
//   selectedCategoryItem: {
//     backgroundColor: 'rgba(22, 223, 255, 0.3)',
//   },
//   categoryText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'black',
//   },
//   muteButton: {
//     position: 'absolute',
//     bottom: 80,
//     alignSelf: 'center',
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
// });
  

// export default MapScreen;





// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';

// const MapScreen = ({ filteredLocations }) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);  

//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   // const navigation = useNavigation();
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   useEffect(() => {
//     // Fetch filtered locations when selected categories change
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
//         .then(response => response.json())
//         .then(data => setNearestLocations(data.Data))
//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setNearestLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   // const handleSettingPress = () => {
//   //   navigation.navigate('Categories');
//   //   console.log('Setting button pressed');
//   // };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };


//   const handleSettingPress = () => {
//     setShowCategories(true);
//   };


//   const handleCategoryToggle = categoryId => {
//     setSelectedCategories(prevSelectedCategories => {
//       if (prevSelectedCategories.includes(categoryId)) {
//         return prevSelectedCategories.filter(id => id !== categoryId);
//       } else {
//         return [...prevSelectedCategories, categoryId];
//       }
//     });
//   };



//   return (
//     <View style={{ flex: 1 }}>

//       {userLocation && (
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {/* {filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))} */}

//           {/* Render markers for nearest locations */}
//           {nearestLocations?.map(location => (
//             <Marker
//               key={location.Title}
//               coordinate={{
//                 latitude: parseFloat(location.Latitude),
//                 longitude: parseFloat(location.Longitude)
//               }}
//               title={location.Title}
//               description={location.Description}
//             />
//           ))}

//             {/* Render marker for user's location */}
//             {userLocation && (
//             <Marker
//               coordinate={{
//                 latitude: userLocation.latitude,
//                 longitude: userLocation.longitude,
//               }}
//               title="User Location"
//               pinColor="blue"
//             />
//           )}

//             {/* {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )} */}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity>


//       {/* Modal for selecting categories */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCategories}
//         onRequestClose={() => setShowCategories(false)}
//       >
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
//             {/* Render categories */}
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category.Id}
//                 style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//                 onPress={() => handleCategoryToggle(category.Id)}
//               >
//                 <Text>{category.Category}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       </Modal>



//       {nearestLocations.length > 0 && (
//         <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//           {nearestLocations.map((nearest, index) => (
//             index < 4 && (
//               <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                 <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                 <Text style={{ fontSize: 12, color: "black" }}>Distance: {nearest.distance ? nearest.distance.toFixed(2) : 'N/A'} meters</Text>
//               </View>
//             )
//           ))}
//         </View>
//       )}


//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 20, // Add padding to provide space from edges
//     },
//     settingButton: {
//       position: 'absolute',
//       top: 10, // Adjust the top value as needed for spacing from top
//       right: 10, // Adjust the right value as needed for spacing from right
//     },
//     muteButton: {
//         position: 'absolute',
//         bottom: 80, // Adjust position as needed
//         alignSelf: 'center',
//         backgroundColor: 'red',
//         padding: 10,
//         borderRadius: 5,
//       },
//   });

// export default MapScreen;







// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';

// const MapScreen = ({ filteredLocations }) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false); // State to manage showing/hiding categories

//   const navigation = useNavigation();
//   const mapRef = useRef(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleSettingPress = () => {
//     setShowCategories(!showCategories); // Toggle the state to show/hide categories
//     console.log('Setting button pressed');
//   };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>

//       {userLocation && (
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (              <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//         {/* Toggle Categories button */}
//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity>

//         {/* Categories List */}
//         {showCategories && (
//           <View style={styles.categoriesContainer}>
//             <Text style={styles.categoriesTitle}>Categories</Text>
//             {/* Iterate over categories and render them */}
//             {filteredLocations.map(location => (
//               <View key={location.Title} style={styles.categoryItem}>
//                 <Text style={styles.categoryTitle}>{location.Title}</Text>
//                 <Text style={styles.categoryDescription}>{location.Description}</Text>
//               </View>
//             ))}
//           </View>
//         )}

//         {/* Nearest Locations */}
//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {/* Display current audio status */}
//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         {/* Refresh Button */}
//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         {/* Mute Toggle Button */}
//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   categoriesContainer: {
//     position: 'absolute',
//     top: 20,
//     left: 20,
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     padding: 10,
//     borderRadius: 5,
//     zIndex: 1,
//   },
//   categoriesTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   categoryItem: {
//     marginBottom: 10,
//   },
//   categoryTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   categoryDescription: {
//     fontSize: 12,
//   },
//   muteButton: {
//     position: 'absolute',
//     bottom: 80,
//     alignSelf: 'center',
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
// });

// export default MapScreen;


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';
// import SettingsComponent from './SettingsComponent'; // Import the SettingsComponent

// const MapScreen = ({ filteredLocations }) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   // const navigation = useNavigation();
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     // Fetch filtered locations when selected categories change
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
//         .then(response => response.json())
//         .then(data => setNearestLocations(data.Data))
//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setNearestLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleSettingPress = () => {
//     setShowCategories(prevState => !prevState); // Toggle the state when "Categories" button is pressed
//   };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleCategoryToggle = categoryId => {
//     setSelectedCategories(prevSelectedCategories => {
//       if (prevSelectedCategories.includes(categoryId)) {
//         return prevSelectedCategories.filter(id => id !== categoryId);
//       } else {
//         return [...prevSelectedCategories, categoryId];
//       }
//     });
//   };


//   return (
//     <View style={{ flex: 1 }}>

// {userLocation && (
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >
//           {/* Render markers for nearest locations */}
//           {nearestLocations.map(location => (
//             <Marker
//               key={location.Title}
//               coordinate={{
//                 latitude: parseFloat(location.Latitude),
//                 longitude: parseFloat(location.Longitude)
//               }}
//               title={location.Title}
//               description={location.Description}
//             />
//           ))}
//           {/* Render marker for user's location */}
//           {userLocation && (
//             <Marker
//               coordinate={{
//                 latitude: userLocation.latitude,
//                 longitude: userLocation.longitude,
//               }}
//               title="User Location"
//               pinColor="blue"
//             />
//           )}
//           {/* Render circle around user's location */}
//           {userLocation && (
//             <Circle
//               center={{
//                 latitude: userLocation.latitude,
//                 longitude: userLocation.longitude,
//               }}
//               radius={0.7}
//               fillColor="rgba(255,200,0,0.9)"
//               strokeColor="transparent"
//             />
//           )}
//         </MapView>
//       )}

//       {/* "Categories" button */}
//       <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//         <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//       </TouchableOpacity>

//       {/* Modal for selecting categories */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCategories}
//         onRequestClose={() => setShowCategories(false)}
//       >
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
//             {/* Render categories */}
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category.Id}
//                 style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//                 onPress={() => handleCategoryToggle(category.Id)}
//               >
//                 <Text>{category.Category}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       </Modal>

//         {/* Toggle Categories button */}
//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity>

//         {/* Conditional rendering of SettingsComponent */}
//         {showCategories && <SettingsComponent />}

//         {/* Nearest Locations */}
//         {nearestLocations && nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {nearest.distance && (nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {/* Display current audio status */}
//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         {/* Refresh Button */}
//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         {/* Mute Toggle Button */}
//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
// }

// const styles = StyleSheet.create({
//   muteButton: {
//     position: 'absolute',
//     bottom: 80,
//     alignSelf: 'center',
//     backgroundColor: 'red',
//     padding: 10,
//     borderRadius: 5,
//   },
// });

// export default MapScreen;


             




// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------

// updated MapsScreen .js 


// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';

// const MapScreen = ({ filteredLocations }) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);  

//   const navigation = useNavigation();
//   const mapRef = useRef(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleSettingPress = () => {
//     navigation.navigate('Categories');
//     console.log('Setting button pressed');
//   };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>

//       {userLocation && (
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity>

//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 20, // Add padding to provide space from edges
//     },
//     settingButton: {
//       position: 'absolute',
//       top: 10, // Adjust the top value as needed for spacing from top
//       right: 10, // Adjust the right value as needed for spacing from right
//     },
//     muteButton: {
//         position: 'absolute',
//         bottom: 80, // Adjust position as needed
//         alignSelf: 'center',
//         backgroundColor: 'red',
//         padding: 10,
//         borderRadius: 5,
//       },
//   });

// export default MapScreen;






// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
  
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


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
//         .then(response => response.json())
//         .then(data => setFilteredLocations(data.Data))
//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   // const handleRefresh = () => {
//   //   Geolocation.getCurrentPosition(
//   //     position => {
//   //       const { latitude, longitude } = position.coords;
//   //       setUserLocation(position.coords);
//   //       if (mapRef.current) {
//   //         mapRef.current.animateToRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0222,
//   //           longitudeDelta: 0.0221,
//   //         });
//   //       }
//   //     },
//   //     error => console.error('Error getting current location:', error),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };


// const handleRefresh = () => {
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleItemPress = (categoryId) => {
//     setSelectedCategories(prevSelectedCategories => {
//       if (prevSelectedCategories.includes(categoryId)) {
//         return prevSelectedCategories.filter(id => id !== categoryId);
//       } else {
//         return [...prevSelectedCategories, categoryId];
//       }
//     });
//   };

//   const isCategorySelected = (categoryId) => {
//     return selectedCategories.includes(categoryId);
//   };

//   return (
//     <View style={{ flex: 1 }}>


//       {userLocation && (   
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations?.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//       {/* Categories Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCategories}
//         onRequestClose={() => setShowCategories(false)}
//       >
        
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
//             {/* Render categories */}
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category.Id}
//                 style={[styles.categoryItem, isCategorySelected(category.Id) && styles.selectedCategoryItem]}
//                 onPress={() => handleItemPress(category.Id)}
//               >
//                 <Text style={styles.categoryText}>{category.Category}</Text>
//               </TouchableOpacity>
//             ))}
   
//             <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//               <Text style={styles.okButtonText}>OK</Text>
//             </TouchableOpacity>

//           </ScrollView>
//         </View>
//       </Modal>

//         {/* <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity> */}


//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 


//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(50, 50, 50, 0.5)',
//       // width: '100%',
//       // height: '100%',
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//       // paddingLeft:120,
//       // paddingRight:100,
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//       // width:'100%',
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//   });
  
//   export default MapScreen;
  





// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [allCategoriesUnselected, setAllCategoriesUnselected] = useState(true);

  
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


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
//         .then(response => response.json())
//         .then(data => setFilteredLocations(data.Data))
//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   // const handleRefresh = () => {
//   //   Geolocation.getCurrentPosition(
//   //     position => {
//   //       const { latitude, longitude } = position.coords;
//   //       setUserLocation(position.coords);
//   //       if (mapRef.current) {
//   //         mapRef.current.animateToRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0222,
//   //           longitudeDelta: 0.0221,
//   //         });
//   //       }
//   //     },
//   //     error => console.error('Error getting current location:', error),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };


// const handleRefresh = () => {
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleItemPress = (categoryId) => {
//     // Logic to select/deselect individual categories
//     // Toggle the selection state of the category
//     if (selectedCategories.includes(categoryId)) {
//       setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
//     } else {
//       setSelectedCategories([...selectedCategories, categoryId]);
//     }
//   };

//   const isCategorySelected = (categoryId) => {
//     return selectedCategories.includes(categoryId);
//   };

//   const handleOkButtonPress = () => {
//     const allUnselected = selectedCategories.length === 0;
//     setAllCategoriesUnselected(allUnselected);
//     setShowCategories(false); // Close the modal
//   };


//   useEffect(() => {
//     // Set all categories as selected initially
//     const allCategoryIds = categories.map(category => category.Id);
//     setSelectedCategories(allCategoryIds);
//   }, []); // Run only once when component mounts


//   const handleToggleSelectAll = () => {
//     // Toggle select all categories
//     if (selectedCategories.length === categories.length) {
//       setSelectedCategories([]);
//     } else {
//       const allCategoryIds = categories.map(category => category.Id);
//       setSelectedCategories(allCategoryIds);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>


//       {userLocation && (   
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {!allCategoriesUnselected && selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations?.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//       {/* Categories Modal */}
//       {/* <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCategories}
//         onRequestClose={() => setShowCategories(false)}
//       >
        
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
           
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category.Id}
//                 style={[styles.categoryItem, isCategorySelected(category.Id) && styles.selectedCategoryItem]}
//                 onPress={() => handleItemPress(category.Id)}
//               >
//                 <Text style={styles.categoryText}>{category.Category}</Text>
//               </TouchableOpacity>
//             ))}
   
//             <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//               <Text style={styles.okButtonText}>OK</Text>
//             </TouchableOpacity>

//           </ScrollView>
//         </View>
//       </Modal> */}

// <Modal
//       animationType="slide"
//       transparent={true}
//       visible={showCategories}
//       onRequestClose={() => setShowCategories(false)}
//     >
//       <View style={styles.modalContainer}>
//         <ScrollView contentContainerStyle={styles.modalContent}>
//         <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
//           <Text style={[styles.selectAllButtonText, { color: selectedCategories.length === categories.length ? 'red' : 'lightgreen' }]}>
//             {selectedCategories.length === categories.length ? 'Unselect All' : 'Select All'}
//           </Text>
//         </TouchableOpacity>
//           {/* Render categories */}
//           {categories.map(category => (
//             <TouchableOpacity
//               key={category.Id}
//               style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//               onPress={() => handleItemPress(category.Id)}
//             >
//               <Text style={styles.categoryText}>{category.Category}</Text>
//               <Text style={styles.categoryText}>{category.Description}</Text>
//             </TouchableOpacity>
//           ))}

//           <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//             <Text style={styles.okButtonText}>OK</Text>
//           </TouchableOpacity>

//         </ScrollView>
//       </View>
//     </Modal>

//         {/* <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity> */}


//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 


//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(50, 50, 50, 0.5)',
//       // width: '100%',
//       // height: '100%',
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//       // paddingLeft:120,
//       // paddingRight:100,
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//       // width:'100%',
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//     selectAllButtonText: {
//       justifyContent:'flex-end'
//     }
//   });
  
//   export default MapScreen;






// updated MapScreen Component -- 01-04-2024 13:15


// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [allCategoriesUnselected, setAllCategoriesUnselected] = useState(true);


//     // State to store the information of the clicked marker
//     const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); // added now

//     // Assuming you have a state variable to control the visibility of nearest location display
// const [showNearestLocation, setShowNearestLocation] = useState(true); // added now

  
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


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
//         .then(response => response.json())
//         .then(data =>{ 
//           setFilteredLocations(data.Data)
          
//           // Log the data to the console
//           console.log('Filtered Locations:', data.Data)
//         })

//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   // const handleRefresh = () => {
//   //   Geolocation.getCurrentPosition(
//   //     position => {
//   //       const { latitude, longitude } = position.coords;
//   //       setUserLocation(position.coords);
//   //       if (mapRef.current) {
//   //         mapRef.current.animateToRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0222,
//   //           longitudeDelta: 0.0221,
//   //         });
//   //       }
//   //     },
//   //     error => console.error('Error getting current location:', error),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };


// const handleRefresh = () => {
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   setShowNearestLocation(true);

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleItemPress = (categoryId) => {
//     // Logic to select/deselect individual categories
//     // Toggle the selection state of the category
//     if (selectedCategories.includes(categoryId)) {
//       setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
//     } else {
//       setSelectedCategories([...selectedCategories, categoryId]);
//     }
//   };

//   const isCategorySelected = (categoryId) => {
//     return selectedCategories.includes(categoryId);
//   };

//   const handleOkButtonPress = () => {
//     const allUnselected = selectedCategories.length === 0;
//     setAllCategoriesUnselected(allUnselected);
//     setShowCategories(false); // Close the modal
//   };


//   useEffect(() => {
//     // Set all categories as selected initially
//     const allCategoryIds = categories.map(category => category.Id);
//     setSelectedCategories(allCategoryIds);
//   }, []); // Run only once when component mounts


//   const handleToggleSelectAll = () => {
//     // Toggle select all categories
//     if (selectedCategories.length === categories.length) {
//       setSelectedCategories([]);
//     } else {
//       const allCategoryIds = categories.map(category => category.Id);
//       setSelectedCategories(allCategoryIds);
//     }
//   };


//   // Define handleMarkerClick function to set the selectedMarkerInfo state
//   const handleMarkerClick = (location) => {
//     setSelectedMarkerInfo({
//       title: location.title,
//       category: location.category
//     });
//   };



// // Function to close nearest location display
// const closeNearestLocationDisplay = () => {
//   setShowNearestLocation(false);
// };

//   return (
//     <View style={{ flex: 1 }}>


//       {userLocation && (   
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {/* {!allCategoriesUnselected && selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))} */}


//             {!allCategoriesUnselected && selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//                 onPress={() => handleMarkerClick(location)}
//               />
//             ))}



//             {/* {nearestLocations?.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//                 onPress={() => setSelectedMarkerInfo(nearest)}
//               />

//             ))} */}

//         {/* Render markers for filtered locations */}
//         {filteredLocations.map(location => (
//           <Marker
//             key={location.Title}
//             coordinate={{
//               latitude: parseFloat(location.Latitude),
//               longitude: parseFloat(location.Longitude),
//             }}
//             title={location.Title}
//             description={location.Description}
//             onPress={() => setSelectedMarkerInfo(location)}
//           />
//         ))}



//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//       {/* Categories Modal */}
//       {/* <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCategories}
//         onRequestClose={() => setShowCategories(false)}
//       >
        
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
           
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category.Id}
//                 style={[styles.categoryItem, isCategorySelected(category.Id) && styles.selectedCategoryItem]}
//                 onPress={() => handleItemPress(category.Id)}
//               >
//                 <Text style={styles.categoryText}>{category.Category}</Text>
//               </TouchableOpacity>
//             ))}
   
//             <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//               <Text style={styles.okButtonText}>OK</Text>
//             </TouchableOpacity>

//           </ScrollView>
//         </View>
//       </Modal> */}

// <Modal
//       animationType="slide"
//       transparent={true}
//       visible={showCategories}
//       onRequestClose={() => setShowCategories(false)}
//     >
//       <View style={styles.modalContainer}>
//         <ScrollView contentContainerStyle={styles.modalContent}>
//         <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
//           <Text style={[styles.selectAllButtonText, { color: selectedCategories.length === categories.length ? 'red' : 'lightgreen' }]}>
//             {selectedCategories.length === categories.length ? 'Unselect All' : 'Select All'}
//           </Text>
//         </TouchableOpacity>
//           {/* Render categories */}
//           {categories.map(category => (
//             <TouchableOpacity
//               key={category.Id}
//               style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//               onPress={() => handleItemPress(category.Id)}
//             >
//               <Text style={styles.categoryText}>{category.Category}</Text>
//               <Text style={styles.categoryText}>{category.Description}</Text>
//             </TouchableOpacity>
//           ))}

//           <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//             <Text style={styles.okButtonText}>OK</Text>
//           </TouchableOpacity>

//         </ScrollView>
//       </View>
//     </Modal>

//         {/* <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity> */}


//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 


//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

// {/* {showNearestLocation && nearestLocations.length > 0 && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[0].Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[0].Category}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[0].Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {nearestLocations[0].Image1 && <Image source={{ uri: nearestLocations[0].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image2 && <Image source={{ uri: nearestLocations[0].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image3 && <Image source={{ uri: nearestLocations[0].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image4 && <Image source={{ uri: nearestLocations[0].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image5 && <Image source={{ uri: nearestLocations[0].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}

// {showNearestLocation && nearestLocations.length > 0 && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[0].Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[0].Category}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[0].Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {nearestLocations[0].Image1 && <Image source={{ uri: nearestLocations[0].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image2 && <Image source={{ uri: nearestLocations[0].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image3 && <Image source={{ uri: nearestLocations[0].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image4 && <Image source={{ uri: nearestLocations[0].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image5 && <Image source={{ uri: nearestLocations[0].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )}
// {selectedMarkerInfo && !showNearestLocation && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )}


// {/* {selectedMarkerInfo && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}


//  {/* {selectedMarkerInfo && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}




//         {playAudio && nearestLocations.length > 0  &&(
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(50, 50, 50, 0.5)',
//       // width: '100%',
//       // height: '100%',
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//       // paddingLeft:120,
//       // paddingRight:100,
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//       // width:'100%',
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//     selectAllButtonText: {
//       justifyContent:'flex-end'
//     },
//     selectedMarkerCategory:{
//       color:'black'
//     }
//   });
  
//   export default MapScreen;






          {/* {selectedMarkerInfo && !showNearestLocation && (
            <View style={{ flex:1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
              <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
              <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                </View>
              </ScrollView>
            </View>
          )}



          {showNearestLocation && selectedMarkerInfo && (
            <View style={{flex:1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 68, 51, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
              <TouchableOpacity onPress={() => setShowNearestLocation(false)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
              <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                </View>
              </ScrollView>
            </View>
          )} */}


          {/* {allCategoriesUnselected && nearestLocations[0] && nearestLocations[0].distance <= nearestLocations[0].TriggerDistance && showNearestLocation && nearestLocations.length > 0 && (
            <View style={{flex:1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5 }}>
              <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[0].Title}</Text>
              <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[0].Category}</Text>
              <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[0].Description}</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  {nearestLocations[0].Image1 && <Image source={{ uri: nearestLocations[0].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {nearestLocations[0].Image2 && <Image source={{ uri: nearestLocations[0].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {nearestLocations[0].Image3 && <Image source={{ uri: nearestLocations[0].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {nearestLocations[0].Image4 && <Image source={{ uri: nearestLocations[0].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {nearestLocations[0].Image5 && <Image source={{ uri: nearestLocations[0].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                </View>
              </ScrollView>
            </View>
          )}

          {allCategoriesUnselected && nearestLocations[1] && nearestLocations[1].distance <= nearestLocations[1].TriggerDistance && showNearestLocation && nearestLocations.length > 0 && (
            <View style={{ flex:1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5 }}>
              <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[1].Title}</Text>
              <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[1].Category}</Text>
              <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[1].Description}</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  {nearestLocations[1].Image1 && <Image source={{ uri: nearestLocations[1].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {nearestLocations[1].Image2 && <Image source={{ uri: nearestLocations[1].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {nearestLocations[1].Image3 && <Image source={{ uri: nearestLocations[1].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {nearestLocations[1].Image4 && <Image source={{ uri: nearestLocations[1].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {nearestLocations[1].Image5 && <Image source={{ uri: nearestLocations[1].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                </View>
              </ScrollView>
            </View>
          )} */}

{/* {allCategoriesUnselected && showNearestLocation && nearestLocations.length > 0 && (
  <View style={{ flex: 1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5 }}>
    <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
    </TouchableOpacity>
    <ScrollView>
      {nearestLocations.map((location, index) => {
        if (location && location.distance <= location.TriggerDistance) {
          return (
            <View key={index} style={{ marginBottom: 20 }}>
              <Text style={{  display:'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black", flex:1, }}>{location.Title}</Text>
              <Text style={{ fontSize: 14, color: "black" }}>{location.Category}</Text>
              </Text>
              <Text style={{ fontSize: 14, color: "black" }}>Description: {location.Description}</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  {location.Image1 && <Image source={{ uri: location.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {location.Image2 && <Image source={{ uri: location.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {location.Image3 && <Image source={{ uri: location.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {location.Image4 && <Image source={{ uri: location.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                  {location.Image5 && <Image source={{ uri: location.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
                </View>
              </ScrollView>
            </View>
          );
        } else {
          return null;
        }
      })}
    </ScrollView>
  </View>
)} */}



// updated on 06-04-2024

// import React, { useEffect, useState, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';
// import { useNavigation } from '@react-navigation/native';

// const MapScreen = ({ filteredLocations }) => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);  

//   const navigation = useNavigation();
//   const mapRef = useRef(null);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   const handleRefresh = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         setUserLocation(position.coords);
//         if (mapRef.current) {
//           mapRef.current.animateToRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           });
//         }
//       },
//       error => console.error('Error getting current location:', error),
//       { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//     );
//   };

//   const handleSettingPress = () => {
//     navigation.navigate('Categories');
//     console.log('Setting button pressed');
//   };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>

//       {userLocation && (
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//         <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity>

//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingHorizontal: 20, // Add padding to provide space from edges
//     },
//     settingButton: {
//       position: 'absolute',
//       top: 10, // Adjust the top value as needed for spacing from top
//       right: 10, // Adjust the right value as needed for spacing from right
//     },
//     muteButton: {
//         position: 'absolute',
//         bottom: 80, // Adjust position as needed
//         alignSelf: 'center',
//         backgroundColor: 'red',
//         padding: 10,
//         borderRadius: 5,
//       },
//   });

// export default MapScreen;






// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
  
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


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
//         .then(response => response.json())
//         .then(data => setFilteredLocations(data.Data))
//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   // const handleRefresh = () => {
//   //   Geolocation.getCurrentPosition(
//   //     position => {
//   //       const { latitude, longitude } = position.coords;
//   //       setUserLocation(position.coords);
//   //       if (mapRef.current) {
//   //         mapRef.current.animateToRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0222,
//   //           longitudeDelta: 0.0221,
//   //         });
//   //       }
//   //     },
//   //     error => console.error('Error getting current location:', error),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };


// const handleRefresh = () => {
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleItemPress = (categoryId) => {
//     setSelectedCategories(prevSelectedCategories => {
//       if (prevSelectedCategories.includes(categoryId)) {
//         return prevSelectedCategories.filter(id => id !== categoryId);
//       } else {
//         return [...prevSelectedCategories, categoryId];
//       }
//     });
//   };

//   const isCategorySelected = (categoryId) => {
//     return selectedCategories.includes(categoryId);
//   };

//   return (
//     <View style={{ flex: 1 }}>


//       {userLocation && (   
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations?.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//       {/* Categories Modal */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCategories}
//         onRequestClose={() => setShowCategories(false)}
//       >
        
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
//             {/* Render categories */}
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category.Id}
//                 style={[styles.categoryItem, isCategorySelected(category.Id) && styles.selectedCategoryItem]}
//                 onPress={() => handleItemPress(category.Id)}
//               >
//                 <Text style={styles.categoryText}>{category.Category}</Text>
//               </TouchableOpacity>
//             ))}
   
//             <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//               <Text style={styles.okButtonText}>OK</Text>
//             </TouchableOpacity>

//           </ScrollView>
//         </View>
//       </Modal>

//         {/* <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity> */}


//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 


//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(50, 50, 50, 0.5)',
//       // width: '100%',
//       // height: '100%',
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//       // paddingLeft:120,
//       // paddingRight:100,
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//       // width:'100%',
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//   });
  
//   export default MapScreen;
  





// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [allCategoriesUnselected, setAllCategoriesUnselected] = useState(true);

  
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


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
//         .then(response => response.json())
//         .then(data =>{ 
//           setFilteredLocations(data.Data)
          
//           // Log the data to the console
//           console.log('Filtered Locations:', data.Data)
//         })

//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   // const handleRefresh = () => {
//   //   Geolocation.getCurrentPosition(
//   //     position => {
//   //       const { latitude, longitude } = position.coords;
//   //       setUserLocation(position.coords);
//   //       if (mapRef.current) {
//   //         mapRef.current.animateToRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0222,
//   //           longitudeDelta: 0.0221,
//   //         });
//   //       }
//   //     },
//   //     error => console.error('Error getting current location:', error),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };


// const handleRefresh = () => {
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleItemPress = (categoryId) => {
//     // Logic to select/deselect individual categories
//     // Toggle the selection state of the category
//     if (selectedCategories.includes(categoryId)) {
//       setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
//     } else {
//       setSelectedCategories([...selectedCategories, categoryId]);
//     }
//   };

//   const isCategorySelected = (categoryId) => {
//     return selectedCategories.includes(categoryId);
//   };

//   const handleOkButtonPress = () => {
//     const allUnselected = selectedCategories.length === 0;
//     setAllCategoriesUnselected(allUnselected);
//     setShowCategories(false); // Close the modal
//   };


//   useEffect(() => {
//     // Set all categories as selected initially
//     const allCategoryIds = categories.map(category => category.Id);
//     setSelectedCategories(allCategoryIds);
//   }, []); // Run only once when component mounts


//   const handleToggleSelectAll = () => {
//     // Toggle select all categories
//     if (selectedCategories.length === categories.length) {
//       setSelectedCategories([]);
//     } else {
//       const allCategoryIds = categories.map(category => category.Id);
//       setSelectedCategories(allCategoryIds);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>


//       {userLocation && (   
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >

//             {!allCategoriesUnselected && selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//               />

//             ))}
//             {nearestLocations?.map(nearest => (
//               <Marker
//                 key={nearest.Title}
//                 coordinate={{
//                   latitude: parseFloat(nearest.Latitude),
//                   longitude: parseFloat(nearest.Longitude),
//                 }}
//                 title={nearest.Title}
//                 description={nearest.Description}
//               />

//             ))}
//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}

//       {/* Categories Modal */}
//       {/* <Modal
//         animationType="slide"
//         transparent={true}
//         visible={showCategories}
//         onRequestClose={() => setShowCategories(false)}
//       >
        
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
           
//             {categories.map(category => (
//               <TouchableOpacity
//                 key={category.Id}
//                 style={[styles.categoryItem, isCategorySelected(category.Id) && styles.selectedCategoryItem]}
//                 onPress={() => handleItemPress(category.Id)}
//               >
//                 <Text style={styles.categoryText}>{category.Category}</Text>
//               </TouchableOpacity>
//             ))}
   
//             <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//               <Text style={styles.okButtonText}>OK</Text>
//             </TouchableOpacity>

//           </ScrollView>
//         </View>
//       </Modal> */}

// <Modal
//       animationType="slide"
//       transparent={true}
//       visible={showCategories}
//       onRequestClose={() => setShowCategories(false)}
//     >
//       <View style={styles.modalContainer}>
//         <ScrollView contentContainerStyle={styles.modalContent}>
//         <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
//           <Text style={[styles.selectAllButtonText, { color: selectedCategories.length === categories.length ? 'red' : 'lightgreen' }]}>
//             {selectedCategories.length === categories.length ? 'Unselect All' : 'Select All'}
//           </Text>
//         </TouchableOpacity>
//           {/* Render categories */}
//           {categories.map(category => (
//             <TouchableOpacity
//               key={category.Id}
//               style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//               onPress={() => handleItemPress(category.Id)}
//             >
//               <Text style={styles.categoryText}>{category.Category}</Text>
//               <Text style={styles.categoryText}>{category.Description}</Text>
//             </TouchableOpacity>
//           ))}

//           <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//             <Text style={styles.okButtonText}>OK</Text>
//           </TouchableOpacity>

//         </ScrollView>
//       </View>
//     </Modal>

//         {/* <TouchableOpacity onPress={handleSettingPress} style={{ position: 'absolute', top: 20, right: 20 }}>
//           <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'white', backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>Categories</Text>
//         </TouchableOpacity> */}


//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 


//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {playAudio && (
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(50, 50, 50, 0.5)',
//       // width: '100%',
//       // height: '100%',
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//       // paddingLeft:120,
//       // paddingRight:100,
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//       // width:'100%',
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//     selectAllButtonText: {
//       justifyContent:'flex-end'
//     }
//   });
  
//   export default MapScreen;
  









// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [allCategoriesUnselected, setAllCategoriesUnselected] = useState(true);


//     // State to store the information of the clicked marker
//     const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); 

//     // Assuming you have a state variable to control the visibility of nearest location display
// const [showNearestLocation, setShowNearestLocation] = useState(true); 

  
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


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
//         .then(response => response.json())
//         .then(data =>{ 
//           setFilteredLocations(data.Data)
          
//           // Log the data to the console
//           console.log('Filtered Locations:', data.Data)
//         })

//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   // const handleRefresh = () => {
//   //   Geolocation.getCurrentPosition(
//   //     position => {
//   //       const { latitude, longitude } = position.coords;
//   //       setUserLocation(position.coords);
//   //       if (mapRef.current) {
//   //         mapRef.current.animateToRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0222,
//   //           longitudeDelta: 0.0221,
//   //         });
//   //       }
//   //     },
//   //     error => console.error('Error getting current location:', error),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };


// const handleRefresh = () => {
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   setShowNearestLocation(true);

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleItemPress = (categoryId) => {
//     // Logic to select/deselect individual categories
//     // Toggle the selection state of the category
//     if (selectedCategories.includes(categoryId)) {
//       setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
//     } else {
//       setSelectedCategories([...selectedCategories, categoryId]);
//     }
//   };

//   // const isCategorySelected = (categoryId) => {
//   //   return selectedCategories.includes(categoryId);
//   // };

//   // const handleOkButtonPress = () => {
//   //   const allUnselected = selectedCategories.length === 0;
//   //   setAllCategoriesUnselected(allUnselected);
//   //   setShowCategories(false); // Close the modal
//   // };


//   useEffect(() => {
//     // Set all categories as selected initially
//     const allCategoryIds = categories.map(category => category.Id);
//     setSelectedCategories(allCategoryIds);
//   }, []); // Run only once when component mounts


//   const handleToggleSelectAll = () => {
//     // Toggle select all categories
//     if (selectedCategories.length === categories.length) {
//       setSelectedCategories([]);
//     } else {
//       const allCategoryIds = categories.map(category => category.Id);
//       setSelectedCategories(allCategoryIds);
//     }
//   };


//   // Define handleMarkerClick function to set the selectedMarkerInfo state
//   const handleMarkerClick = (location) => {
//     setSelectedMarkerInfo({
//       title: location.title,
//       category: location.category
//     });
//   };



// // Function to close nearest location display
// const closeNearestLocationDisplay = () => {
//   setShowNearestLocation(false);
// };

//   return (
//     <View style={{ flex: 1 }}>


//       {userLocation && (   
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >


//             {!allCategoriesUnselected && selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//                 onPress={() => handleMarkerClick(location)}
//               />
//             ))}

//         {/* Render markers for filtered locations */}
//         {filteredLocations.map(location => (
//           <Marker
//             key={location.Title}
//             coordinate={{
//               latitude: parseFloat(location.Latitude),
//               longitude: parseFloat(location.Longitude),
//             }}
//             title={location.Title}
//             description={location.Description}
//             onPress={() => setSelectedMarkerInfo(location)}
//           />
//         ))}

//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}


// <Modal
//       animationType="slide"
//       transparent={true}
//       visible={showCategories}
//       onRequestClose={() => setShowCategories(false)}
//     >
//       <View style={styles.modalContainer}>
//         <ScrollView contentContainerStyle={styles.modalContent}>
//         <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
//           <Text style={[styles.selectAllButtonText, { color: selectedCategories.length === categories.length ? 'red' : 'lightgreen' }]}>
//             {selectedCategories.length === categories.length ? 'Unselect All' : 'Select All'}
//           </Text>
//         </TouchableOpacity>
//           {/* Render categories */}
//           {categories.map(category => (
//             <TouchableOpacity
//               key={category.Id}
//               style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//               onPress={() => handleItemPress(category.Id)}
//             >
//               <Text style={styles.categoryText}>{category.Category}</Text>
//               <Text style={styles.categoryText}>{category.Description}</Text>
//             </TouchableOpacity>
//           ))}

//           <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//             <Text style={styles.okButtonText}>OK</Text>
//           </TouchableOpacity>

//         </ScrollView>
//       </View>
//     </Modal>



//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 


//         {nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

// {/* {showNearestLocation && nearestLocations.length > 0 && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[0].Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[0].Category}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[0].Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {nearestLocations[0].Image1 && <Image source={{ uri: nearestLocations[0].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image2 && <Image source={{ uri: nearestLocations[0].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image3 && <Image source={{ uri: nearestLocations[0].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image4 && <Image source={{ uri: nearestLocations[0].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image5 && <Image source={{ uri: nearestLocations[0].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}

// {showNearestLocation && nearestLocations.length > 0 && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[0].Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[0].Category}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[0].Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {nearestLocations[0].Image1 && <Image source={{ uri: nearestLocations[0].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image2 && <Image source={{ uri: nearestLocations[0].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image3 && <Image source={{ uri: nearestLocations[0].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image4 && <Image source={{ uri: nearestLocations[0].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image5 && <Image source={{ uri: nearestLocations[0].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )}
// {selectedMarkerInfo && !showNearestLocation && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )}


// {/* {selectedMarkerInfo && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}


//  {/* {selectedMarkerInfo && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}




//         {playAudio && nearestLocations.length > 0  &&(
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(50, 50, 50, 0.5)',
//       // width: '100%',
//       // height: '100%',
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//       // paddingLeft:120,
//       // paddingRight:100,
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//       // width:'100%',
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//     selectAllButtonText: {
//       justifyContent:'flex-end'
//     },
//     selectedMarkerCategory:{
//       color:'black'
//     }
//   });
  
//   export default MapScreen;
  














// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   // const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState(categories.map(category => category.Id));
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [allCategoriesUnselected, setAllCategoriesUnselected] = useState(true);


//     // State to store the information of the clicked marker
//     const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); 

//     // Assuming you have a state variable to control the visibility of nearest location display
// const [showNearestLocation, setShowNearestLocation] = useState(true); 

  
//   const mapRef = useRef(null);

//   useEffect(() => {
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


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
//         .then(response => response.json())
//         .then(data =>{ 
//           setFilteredLocations(data.Data)
          
//           // Log the data to the console
//           console.log('Filtered Locations:', data.Data)
//         })

//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   // const handleRefresh = () => {
//   //   Geolocation.getCurrentPosition(
//   //     position => {
//   //       const { latitude, longitude } = position.coords;
//   //       setUserLocation(position.coords);
//   //       if (mapRef.current) {
//   //         mapRef.current.animateToRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0222,
//   //           longitudeDelta: 0.0221,
//   //         });
//   //       }
//   //     },
//   //     error => console.error('Error getting current location:', error),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };


// const handleRefresh = () => {
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   setShowNearestLocation(true);

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };

//   const handleMuteToggle = () => {
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   // const handleItemPress = (categoryId) => {
//   //   // Logic to select/deselect individual categories
//   //   // Toggle the selection state of the category
//   //   if (selectedCategories.includes(categoryId)) {
//   //     setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
//   //   } else {
//   //     setSelectedCategories([...selectedCategories, categoryId]);
//   //   }
//   // };


//     // Handle function to toggle category selection
//     const handleItemPress = (categoryId) => {
//       if (selectedCategories.includes(categoryId)) {
//         // Deselect category
//         setSelectedCategories(prevState => prevState.filter(id => id !== categoryId));
//       } else {
//         // Select category
//         setSelectedCategories(prevState => [...prevState, categoryId]);
//       }
//     };



//   // const isCategorySelected = (categoryId) => {
//   //   return selectedCategories.includes(categoryId);
//   // };

//   // const handleOkButtonPress = () => {
//   //   const allUnselected = selectedCategories.length === 0;
//   //   setAllCategoriesUnselected(allUnselected);
//   //   setShowCategories(false); // Close the modal
//   // };


//   useEffect(() => {
//     // Set all categories as selected initially
//     const allCategoryIds = categories.map(category => category.Id);
//     setSelectedCategories(allCategoryIds);
//   }, []); // Run only once when component mounts


//   const handleToggleSelectAll = () => {
//     // Toggle select all categories
//     if (selectedCategories.length === categories.length) {
//       setSelectedCategories([]);
//     } else {
//       const allCategoryIds = categories.map(category => category.Id);
//       setSelectedCategories(allCategoryIds);
//     }
//   };


//   // Define handleMarkerClick function to set the selectedMarkerInfo state
//   const handleMarkerClick = (location) => {
//     setSelectedMarkerInfo({
//       title: location.title,
//       category: location.category
//     });
//   };



// // Function to close nearest location display
// const closeNearestLocationDisplay = () => {
//   setShowNearestLocation(false);
// };

//   return (
//     <View style={{ flex: 1 }}>


//       {userLocation && (   
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >


//             {!allCategoriesUnselected && selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//                 onPress={() => handleMarkerClick(location)}
//               />
//             ))}

//         {/* Render markers for filtered locations */}
//         {filteredLocations.map(location => (
//           <Marker
//             key={location.Title}
//             coordinate={{
//               latitude: parseFloat(location.Latitude),
//               longitude: parseFloat(location.Longitude),
//             }}
//             title={location.Title}
//             description={location.Description}
//             onPress={() => setSelectedMarkerInfo(location)}
//           />
//         ))}

//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}


// <Modal
//   animationType="slide"
//   transparent={true}
//   visible={showCategories}
//   onRequestClose={() => setShowCategories(false)}
// >
//   <View style={styles.modalContainer}>
//     <ScrollView contentContainerStyle={styles.modalContent}>
//       <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
//         <Text style={[styles.selectAllButtonText, { color: selectedCategories.length === categories.length ? 'red' : 'lightgreen' }]}>
//           {selectedCategories.length === categories.length ? 'Unselect All' : 'Select All'}
//         </Text>
//       </TouchableOpacity>
//       <ScrollView style={styles.itemsScrollView}>
//         {categories.map(category => (
//           <TouchableOpacity
//             key={category.Id}
//             style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//             onPress={() => handleItemPress(category.Id)}
//           >
//             <Text style={styles.categoryText}>{category.Category}</Text>
//             <Text style={styles.categoryText}>{category.Description}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//         <Text style={styles.okButtonText}>OK</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   </View>
// </Modal>



// {/* <Modal
//       animationType="slide"
//       transparent={true}
//       visible={showCategories}
//       onRequestClose={() => setShowCategories(false)}
//     >
//       <View style={styles.modalContainer}>
//         <ScrollView contentContainerStyle={styles.scrollViewContent}>
//           <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
//             <Text style={[styles.selectAllButtonText, { color: selectedCategories.length === categories.length ? 'red' : 'lightgreen' }]}>
//               {selectedCategories.length === categories.length ? 'Unselect All' : 'Select All'}
//             </Text>
//           </TouchableOpacity>
//           {categories.map(category => (
//             <TouchableOpacity
//               key={category.Id}
//               style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//               onPress={() => handleItemPress(category.Id)}
//             >
//               <Text style={styles.categoryText}>{category.Category}</Text>
//               <Text style={styles.categoryText}>{category.Description}</Text>
//             </TouchableOpacity>
//           ))}
//           <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//             <Text style={styles.okButtonText}>OK</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </Modal> */}



//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 


        // {nearestLocations.length > 0 && (
        //   <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
        //     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
        //     {nearestLocations.map((nearest, index) => (
        //       index < 4 && (
        //         <View key={nearest.Title} style={{ marginBottom: 10 }}>
        //           <Text style={{ fontSize: 14, color: "black" }}>{nearest.Description}</Text>
        //           <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
        //         </View>
        //       )
        //     ))}
        //   </View>
        // )}

        // {selectedMarkerInfo && !showNearestLocation && (
        //   <View style={{ position: 'absolute', top: 400, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
        //     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
        //       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
        //     </TouchableOpacity>
        //     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
        //     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
        //     <ScrollView horizontal>
        //       <View style={{ flexDirection: 'row' }}>
        //         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
        //         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
        //         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
        //         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
        //         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
        //       </View>
        //     </ScrollView>
        //   </View>
        // )}


// {/* {showNearestLocation && nearestLocations.length > 0 && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[0].Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[0].Category}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[0].Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {nearestLocations[0].Image1 && <Image source={{ uri: nearestLocations[0].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image2 && <Image source={{ uri: nearestLocations[0].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image3 && <Image source={{ uri: nearestLocations[0].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image4 && <Image source={{ uri: nearestLocations[0].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image5 && <Image source={{ uri: nearestLocations[0].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}

// {showNearestLocation && nearestLocations.length > 0 && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[0].Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[0].Category}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[0].Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {nearestLocations[0].Image1 && <Image source={{ uri: nearestLocations[0].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image2 && <Image source={{ uri: nearestLocations[0].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image3 && <Image source={{ uri: nearestLocations[0].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image4 && <Image source={{ uri: nearestLocations[0].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image5 && <Image source={{ uri: nearestLocations[0].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )}

// {/* {selectedMarkerInfo && !showNearestLocation && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}


// {/* {selectedMarkerInfo && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.7)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}


//  {/* {selectedMarkerInfo && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//     <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )} */}




//         {playAudio && nearestLocations.length > 0  &&(
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     // modalContainer: {
//     //   flex: 1,
//     //   justifyContent: 'center',
//     //   alignItems: 'center',
//     //   backgroundColor: 'rgba(50, 50, 50, 0.5)',
//     //   // width: '100%',
//     //   // height: '100%',
//     // },
//     modalContent: {
//       flexGrow: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingVertical: 20,
//       height: 400, // Set a fixed height
//     },
//     itemsScrollView: {
//       maxHeight: 600, // Set a maximum height for the ScrollView
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//       // paddingLeft:120,
//       // paddingRight:100,
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//       // width:'100%',
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//     selectAllButtonText: {
//       justifyContent:'flex-end'
//     },
//     selectedMarkerCategory:{
//       color:'black'
//     },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     scrollViewContent: {
//       paddingVertical: 20,
//       paddingHorizontal: 10,
//     },
//     selectAllButton: {
//       marginBottom: 10,
//       backgroundColor: 'lightblue',
//       padding: 10,
//       borderRadius: 5,
//       alignItems: 'center',
//     },
//     selectAllButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     categoryItem: {
//       marginBottom: 10,
//       backgroundColor: 'lightgrey',
//       padding: 10,
//       borderRadius: 5,
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightgreen',
//     },
//     categoryText: {
//       fontSize: 16,
//     },
//     okButton: {
//       marginTop: 20,
//       backgroundColor: 'lightblue',
//       padding: 10,
//       borderRadius: 5,
//       alignItems: 'center',
//     },
//     okButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//   });
  
//   export default MapScreen;
  














// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Image, PanResponder } from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   // const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState(categories.map(category => category.Id));
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [allCategoriesUnselected, setAllCategoriesUnselected] = useState(true);


//   // const [position, setPosition] = useState({ x: 20, y: 400 });  // added now
//   // const [panResponder, setPanResponder] = useState(null);      // added now


//     // State to store the information of the clicked marker
//     const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); 

//     // Assuming you have a state variable to control the visibility of nearest location display
// const [showNearestLocation, setShowNearestLocation] = useState(true); 

  
//   const mapRef = useRef(null);


//   // giving the user to move the info window
//   // useEffect(() => {
//   //   // Initialize PanResponder
//   //   const responder = PanResponder.create({
//   //     onStartShouldSetPanResponder: () => true,
//   //     onPanResponderMove: (_, gesture) => {
//   //       setPosition({ x: position.x + gesture.dx, y: position.y + gesture.dy });
//   //     },
//   //   });

//   //   setPanResponder(responder);

//   //   return () => {
//   //     // Clean up PanResponder
//   //     responder.panHandlers = {};
//   //   };
//   // }, [position]);

//   useEffect(() => {                    // getting the categories
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   useEffect(() => {       // for selecting all the categories by default
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => {
//         setCategories(data.Data);
//         // Set all categories as selected initially
//         const allCategoryIds = data.Data.map(category => category.Id);
//         setSelectedCategories(allCategoryIds);
//       })
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


//   useEffect(() => {          // for selecting the categories and getting one by one
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
//         .then(response => response.json())
//         .then(data =>{ 
//           setFilteredLocations(data.Data)
          
//           // Log the data to the console
//           console.log('Filtered Locations:', data.Data)
//         })

//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };

//   // const handleRefresh = () => {
//   //   Geolocation.getCurrentPosition(
//   //     position => {
//   //       const { latitude, longitude } = position.coords;
//   //       setUserLocation(position.coords);
//   //       if (mapRef.current) {
//   //         mapRef.current.animateToRegion({
//   //           latitude,
//   //           longitude,
//   //           latitudeDelta: 0.0222,
//   //           longitudeDelta: 0.0221,
//   //         });
//   //       }
//   //     },
//   //     error => console.error('Error getting current location:', error),
//   //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   //   );
//   // };


// const handleRefresh = () => {         // refresh button, audio stops
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   setShowNearestLocation(true);

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };

//   const handleMuteToggle = () => {         // handling mute button
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleItemPress = (categoryId) => {
//     // Logic to select/deselect individual categories
//     // Toggle the selection state of the category
//     if (!selectedCategories.includes(categoryId)) {
//       // setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
//       // setAllCategoriesUnselected(true)
//       setSelectedCategories([...selectedCategories, categoryId]);
//     } else {
//       // setSelectedCategories([...selectedCategories, categoryId]);
//       setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
//       setAllCategoriesUnselected(true)
//     }
//   };


//     // // Handle function to toggle category selection
//     // const handleItemPress = (categoryId) => {          // selecting items
//     //   if (selectedCategories.includes(categoryId)) {
//     //     // Deselect category
//     //     setSelectedCategories(prevState => prevState.filter(id => id !== categoryId));
//     //     setAllCategoriesUnselected(true)
//     //   } else {
//     //     // Select category
//     //     setSelectedCategories(prevState => [...prevState, categoryId]);
//     //   }
//     // };



//   // const isCategorySelected = (categoryId) => {
//   //   return selectedCategories.includes(categoryId);
//   // };

//   // const handleOkButtonPress = () => {
//   //   const allUnselected = selectedCategories.length === 0;
//   //   setAllCategoriesUnselected(allUnselected);
//   //   setShowCategories(false); // Close the modal
//   // };


//   useEffect(() => {               
//     // Set all categories as selected initially
//     const allCategoryIds = categories.map(category => category.Id);
//     setSelectedCategories(allCategoryIds);
//   }, []); // Run only once when component mounts


//   // const handleToggleSelectAll = () => {
//   //   // Toggle select all categories
//   //   if (selectedCategories.length === categories.length) {
//   //     setSelectedCategories([]);
//   //   } else {
//   //     const allCategoryIds = categories.map(category => category.Id);
//   //     setSelectedCategories(allCategoryIds);
//   //   }
//   // };

  
//   const handleToggleSelectAll = () => {
    
//     const allCategoryIds = categories.map(category => category.Id);
//     setSelectedCategories(allCategoryIds);
//     setAllCategoriesUnselected(true);
    
//   };



//   // Define handleMarkerClick function to set the selectedMarkerInfo state
//   const handleMarkerClick = (location) => {
//     setSelectedMarkerInfo({
//       title: location.title,
//       category: location.category
//     });
//   };



// // Function to close nearest location display
// const closeNearestLocationDisplay = () => {
//   setShowNearestLocation(false);
// };

// const handleCloseAll = () => {
//   setSelectedCategories([]);
//   setAllCategoriesUnselected(false)
//   AudioPlayer.stop();

// }

//   return (
//     <View style={{ flex: 1 }}>
      


//       {userLocation && (   
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >


//             {!allCategoriesUnselected && selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//                 onPress={() => handleMarkerClick(location)}
//               />
//             ))}

        
//         {filteredLocations && filteredLocations.map(location => (
//           <Marker
//             key={location.Title}
//             coordinate={{
//               latitude: parseFloat(location.Latitude),
//               longitude: parseFloat(location.Longitude),
//             }}
//             title={location.Title}
//             description={location.Description}
//             onPress={() => setSelectedMarkerInfo(location)}
//           />
//         ))}

//             {userLocation && (
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//           {userLocation && (
//               <Circle
//                 center={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 radius={0.7}
//                 fillColor="rgba(255,200,0,0.9)"
//                 strokeColor="transparent"
//               />
//             )}
//           </MapView>
//         )}


// <Modal
//   animationType="slide"
//   transparent={true}
//   visible={showCategories}
//   onRequestClose={() => setShowCategories(false)}
// >
//   <View style={styles.modalContainer}>
//     <ScrollView contentContainerStyle={styles.modalContent}>
//       <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
//         <Text style={styles.selectAllButtonText}>Select All</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={handleCloseAll} style={styles.selectAllButton}>
//         <Text style={styles.selectAllButtonText}>Clear All</Text>
//       </TouchableOpacity>
//       <ScrollView style={styles.itemsScrollView}>
//         {categories.map(category => (
//           <TouchableOpacity
//             key={category.Id}
//             style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//             onPress={() => handleItemPress(category.Id)}
//           >
//             <Text style={styles.categoryText}>{category.Category}</Text>
//             <Text style={styles.categoryText}>{category.Description}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//       <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//         <Text style={styles.okButtonText}>OK</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   </View>
// </Modal>



//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 


//       {/* {allCategoriesUnselected && nearestLocations.length > 0 && (
//           <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5 }}>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//             {nearestLocations.map((nearest, index) => (
//               index < 4 && (
//                 <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                   <Text style={{ fontSize: 14, color: "black" }}>{nearest.Title}</Text>
//                   <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                 </View>
//               )
//             ))}
//           </View>
//         )}

//         {allCategoriesUnselected && selectedMarkerInfo && !showNearestLocation && (
//           <View style={{ position: 'absolute', top: 400, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//             <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//               <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//             </TouchableOpacity>
//             <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//             <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//             <ScrollView horizontal>
//               <View style={{ flexDirection: 'row' }}>
//                 {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                 {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                 {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                 {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                 {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//               </View>
//             </ScrollView>
//           </View>
//         )} */}



// {allCategoriesUnselected && (
//   <>
//     {nearestLocations.length > 0 && (
//       <View style={{ position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5 }}>
//         <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//         {nearestLocations.map((nearest, index) => (
//           index < 4 && (
//             <View key={nearest.Title} style={{ marginBottom: 10 }}>
//               <Text style={{ fontSize: 14, color: "black" }}>{nearest.Title}</Text>
//               <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//             </View>
//           )
//         ))}
//       </View>
//     )}

//     {selectedMarkerInfo && !showNearestLocation && (
//       <View style={{ position: 'absolute', top: 400, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//         <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//         </TouchableOpacity>
//         <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//         <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//         <ScrollView horizontal>
//           <View style={{ flexDirection: 'row' }}>
//             {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//             {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//             {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//             {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//             {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//           </View>
//         </ScrollView>
//       </View>
//     )}

//     {showNearestLocation && selectedMarkerInfo && (
//       <View style={{ position: 'absolute', top: 400, left: 20, backgroundColor: 'rgba(255, 68, 51, 0.9)', padding: 10, borderRadius: 5, maxWidth: 300 }}>
//         <TouchableOpacity onPress={() => setShowNearestLocation(false)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//           <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//         </TouchableOpacity>
//         <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//         <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//         <ScrollView horizontal>
//           <View style={{ flexDirection: 'row' }}>
//             {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//             {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//             {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//             {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//             {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//           </View>
//         </ScrollView>
//       </View>
//     )}
//   </>
// )}




// {allCategoriesUnselected && nearestLocations[0] && nearestLocations[0].distance <= nearestLocations[0].TriggerDistance && showNearestLocation && nearestLocations.length > 0 && (
//   <View style={{ position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5 }}>
//     <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//       <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//     </TouchableOpacity>
//     <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}>{nearestLocations[0].Title}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Category: {nearestLocations[0].Category}</Text>
//     <Text style={{ fontSize: 14, color: "black" }}>Description: {nearestLocations[0].Description}</Text>
//     <ScrollView horizontal>
//       <View style={{ flexDirection: 'row' }}>
//         {nearestLocations[0].Image1 && <Image source={{ uri: nearestLocations[0].Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image2 && <Image source={{ uri: nearestLocations[0].Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image3 && <Image source={{ uri: nearestLocations[0].Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image4 && <Image source={{ uri: nearestLocations[0].Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//         {nearestLocations[0].Image5 && <Image source={{ uri: nearestLocations[0].Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//       </View>
//     </ScrollView>
//   </View>
// )}




//         {playAudio && nearestLocations.length > 0  &&(
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={handleRefresh} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     modalContent: {
//       flexGrow: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingVertical: 20,
//       height: 400, // Set a fixed height
//     },
//     itemsScrollView: {
//       maxHeight: 600, // Set a maximum height for the ScrollView
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//     selectAllButtonText: {
//       justifyContent:'flex-end'
//     },
//     selectedMarkerCategory:{
//       color:'black'
//     },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     scrollViewContent: {
//       paddingVertical: 20,
//       paddingHorizontal: 10,
//     },
//     selectAllButton: {
//       marginBottom: 10,
//       backgroundColor: 'lightblue',
//       padding: 10,
//       borderRadius: 5,
//       alignItems: 'center',
//     },
//     selectAllButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     categoryItem: {
//       marginBottom: 10,
//       backgroundColor: 'lightgrey',
//       padding: 10,
//       borderRadius: 5,
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightgreen',
//     },
//     categoryText: {
//       fontSize: 16,
//     },
//     okButton: {
//       marginTop: 20,
//       backgroundColor: 'lightblue',
//       padding: 10,
//       borderRadius: 5,
//       alignItems: 'center',
//     },
//     okButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//   });
  
//   export default MapScreen;
  













// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Image} from 'react-native';
// import MapView, { Marker, Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import AudioPlayer from './AudioPlayer';

// const MapScreen = () => {
//   const [userLocation, setUserLocation] = useState(null);
//   const [nearestLocations, setNearestLocations] = useState([]);
//   const [playAudio, setPlayAudio] = useState(false);
//   const [playAudioState, setPlayAudioState] = useState({});
//   const [isMuted, setIsMuted] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [categories, setCategories] = useState([]);
//   // const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState(categories.map(category => category.Id));
//   const [filteredLocations, setFilteredLocations] = useState([]);
//   const [allCategoriesUnselected, setAllCategoriesUnselected] = useState(true);


//     // State to store the information of the clicked marker
//   const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); 

//     // Assuming you have a state variable to control the visibility of nearest location display
//   const [showNearestLocation, setShowNearestLocation] = useState(true); 

  
//   const mapRef = useRef(null);

//   useEffect(() => {                    // getting the categories
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => setCategories(data.Data))
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);

//   useEffect(() => {       // for selecting all the categories by default
//     // Fetch categories
//     fetch('https://dev.netisoft.in/reag/api/GetCategories.php')
//       .then(response => response.json())
//       .then(data => {
//         setCategories(data.Data);
//         // Set all categories as selected initially
//         const allCategoryIds = data.Data.map(category => category.Id);
//         setSelectedCategories(allCategoryIds);
//       })
//       .catch(error => console.error('Error fetching categories:', error));
//   }, []);


//   useEffect(() => {          // for selecting the categories and getting one by one
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
//         .then(response => response.json())
//         .then(data =>{ 
//           setFilteredLocations(data.Data)
          
//           // Log the data to the console
//           console.log('Filtered Locations:', data.Data)
//         })

//         .catch(error => console.error('Error fetching filtered locations:', error));
//     } else {
//       setFilteredLocations([]);
//     }
//   }, [selectedCategories]);

//   useEffect(() => {                   // fetch user's location
//     let isMounted = true;

//     const fetchUserLocation = () => {
//       Geolocation.getCurrentPosition(
//         position => {
//           const { coords } = position;
//           if (isMounted) {
//             setUserLocation(coords);
//           }
//         },
//         error => console.error('Error getting current location:', error),
//         { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
//       );
//     };

//     fetchUserLocation();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {                   // watching user's location
//     let watchId;
//     let intervalId;

//     const watchUserLocation = () => {
//       watchId = Geolocation.watchPosition(
//         position => {
//           const { coords } = position;
//           setUserLocation(coords);
//         },
//         error => console.error('Error watching user location:', error),
//         { enableHighAccuracy: true, distanceFilter: 2 }
//       );
//     };

//     const updateUserLocation = () => {
//       intervalId = setInterval(() => {
//         Geolocation.getCurrentPosition(
//           position => {
//             const { coords } = position;
//             setUserLocation(coords);
//           },
//           error => console.error('Error getting current location:', error),
//           { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
//         );
//       }, 5000);
//     };

//     watchUserLocation();
//     updateUserLocation();

//     return () => {
//       if (watchId) {
//         Geolocation.clearWatch(watchId);
//       }
//       if (intervalId) {
//         clearInterval(intervalId);
//       }
//     };
//   }, []);

//   useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
//     if (!userLocation || !filteredLocations?.length) return;

//     const locationsWithDistances = filteredLocations.map(item => ({
//       ...item,
//       distance: calculateDistance(
//         userLocation.latitude,
//         userLocation.longitude,
//         parseFloat(item.Latitude),
//         parseFloat(item.Longitude)
//       )
//     }));

//     locationsWithDistances.sort((a, b) => a.distance - b.distance);

//     const nearest = locationsWithDistances.slice(0, 4);

//     if (!nearest) return;

//     nearest.forEach((location, index) => {
//       const triggerDistance = location.distance <= location.TriggerDistance;

//       if (triggerDistance) {
//         if (location.AudioURL && !playAudioState[location.Title]) {
//           setTimeout(() => {
//             AudioPlayer.play(location.AudioURL);
//             setPlayAudioState(prevState => ({
//               ...prevState,
//               [location.Title]: true
//             }));
//           }, index * 6000);
//         }
//       } else {
//         if (playAudioState[location.Title]) {
//           AudioPlayer.stop();
//           setPlayAudioState(prevState => ({
//             ...prevState,
//             [location.Title]: false
//           }));
//         }
//       }
//     });

//     setNearestLocations(nearest);
//   }, [userLocation, filteredLocations]);

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const deg2rad = (deg) => deg * (Math.PI / 180);
//     const R = 6371; // Radius of the Earth in km
//     const dLat = deg2rad(lat2 - lat1);
//     const dLon = deg2rad(lon2 - lon1);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     return R * c * 1000; // Distance in meters
//   };


// const handleRefresh = () => {         // refresh button, audio stops
//   // Stop any currently playing audio
//   AudioPlayer.stop();

//   // Clear audio state
//   setPlayAudioState({});

//   setShowNearestLocation(true);

//   setSelectedMarkerInfo(false);

//   // Clear nearest locations
//   // setNearestLocations([]);
  
//   // Reset user's location
//   Geolocation.getCurrentPosition(
//     position => {
//       const { latitude, longitude } = position.coords;
//       setUserLocation(position.coords);
//       if (mapRef.current) {
//         mapRef.current.animateToRegion({
//           latitude,
//           longitude,
//           latitudeDelta: 0.0222,
//           longitudeDelta: 0.0221,
//         });
//       }
//     },
//     error => console.error('Error getting current location:', error),
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );

// };

//   const handleMuteToggle = () => {         // handling mute button
//     if (isMuted) {
//       AudioPlayer.unmute();
//       setIsMuted(false);
//       console.log("Unmuting audio");
//     } else {
//       AudioPlayer.mute();
//       setIsMuted(true);
//       console.log("Muting audio");
//     }
//   };

//   const handleItemPress = (categoryId) => {
//     if (!selectedCategories.includes(categoryId)) {
//       setSelectedCategories([...selectedCategories, categoryId]);
//     } else {
//       setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
//     }
//     setAllCategoriesUnselected(true)
  
//   };



  
//   const handleToggleSelectAll = () => {
    
//     const allCategoryIds = categories.map(category => category.Id);
//     setSelectedCategories(allCategoryIds);
//     setAllCategoriesUnselected(true);
    
//   };



//   // Define handleMarkerClick function to set the selectedMarkerInfo state
//   const handleMarkerClick = (location) => {
//     setSelectedMarkerInfo({
//       title: location.title,
//       category: location.category
//     });
//   };



// // Function to close nearest location display
// const closeNearestLocationDisplay = () => {
//   setShowNearestLocation(false);
// };

// const handleCloseAll = () => {
//   setSelectedCategories([]);
//   setAllCategoriesUnselected(false)
//   AudioPlayer.stop();

// }

// const handlePlayAudio = (location) => {
//   // Assuming location has an AudioURL property
//   if (location.AudioURL) {
//     AudioPlayer.play(location.AudioURL);
//     console.log('Playing audio for:', location.Title);
//   }
// };



//   return (
//     <View style={{ flex: 1 }}>
      
//       {userLocation && (                                                 // display MapView
//         <MapView
//           ref={mapRef}
//           style={{ flex: 1 }}
//           initialRegion={{
//             latitude: userLocation.latitude,
//             longitude: userLocation.longitude,
//             latitudeDelta: 0.0222,
//             longitudeDelta: 0.0221,
//           }}
//         >
//             {!allCategoriesUnselected &&                                 //  show the Markers for the selected categories
//             selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude)
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//                 onPress={() => handleMarkerClick(location)}
//               />
//             ))}
        
//             {filteredLocations && filteredLocations.map(location => (    // adding selectable Marker for filtered locations
//               <Marker
//                 key={location.Title}
//                 coordinate={{
//                   latitude: parseFloat(location.Latitude),
//                   longitude: parseFloat(location.Longitude),
//                 }}
//                 title={location.Title}
//                 description={location.Description}
//                 onPress={() => setSelectedMarkerInfo(location)}
//               />
//             ))}

//             {userLocation && (                                           // blue color Marker for UserLocation
//               <Marker
//                 coordinate={{
//                   latitude: userLocation.latitude,
//                   longitude: userLocation.longitude,
//                 }}
//                 title="User Location"
//                 pinColor="blue"
//               />
//             )}
  
//             {userLocation && (                                           // circle for userLocation
//                 <Circle
//                   center={{
//                     latitude: userLocation.latitude,
//                     longitude: userLocation.longitude,
//                   }}
//                   radius={0.7}
//                   fillColor="rgba(255,200,0,0.9)"
//                   strokeColor="transparent"
//                 />
//               )}

//         </MapView>
//       )}


//       <Modal                                                             // for showing categories to select
//         animationType="slide"
//         transparent={true}
//         visible={showCategories}
//         onRequestClose={() => setShowCategories(false)}
//       >
//         <View style={styles.modalContainer}>
//           <ScrollView contentContainerStyle={styles.modalContent}>
//             <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
//               <Text style={styles.selectAllButtonText}>Select All</Text>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={handleCloseAll} style={styles.selectAllButton}>
//               <Text style={styles.selectAllButtonText}>Clear All</Text>
//             </TouchableOpacity>
//             <ScrollView style={styles.itemsScrollView}>
//               {categories.map(category => (
//                 <TouchableOpacity
//                   key={category.Id}
//                   style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
//                   onPress={() => handleItemPress(category.Id)}
//                 >
//                   <Text style={styles.categoryText}>{category.Category}</Text>
//                   <Text style={styles.categoryText}>{category.Description}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//             <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
//               <Text style={styles.okButtonText}>OK</Text>
//             </TouchableOpacity>
//           </ScrollView>
//         </View>
//       </Modal>



//       {/* Show Categories Button */}
//       <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
//         <Text style={styles.settingsButtonText}>Categories</Text>
//       </TouchableOpacity> 



//       {allCategoriesUnselected && (

//         <>

//           {nearestLocations.length > 0 && (
//             <View style={{ flex:1, position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5 }}>
//               <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
//               {nearestLocations.map((nearest, index) => (
//                 index < 4 && (
//                   <View key={nearest.Title} style={{ marginBottom: 10 }}>
//                     <Text style={{ fontSize: 14, color: "black" }}>{nearest.Title}</Text>
//                     <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
//                   </View>
//                 )
//               ))}
//             </View>
//           )}


//           {!selectedMarkerInfo && showNearestLocation && nearestLocations.length > 0 && (
//             <View style={{ flex: 1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5, width:320, paddingTop:10 }}>
//               <ScrollView>
//                 {nearestLocations.map((location, index) => {
//                   if (location && location.distance <= location.TriggerDistance) {
//                     return (
//                       <View key={index} style={{ marginBottom: 20 }}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                           <View style={{ flex: 1, alignItems: 'flex-start' }}>
//                           <Text style={{ fontWeight: 'bold', fontSize: 16, color: "black" }}>{location.Title}</Text>
//                           </View>
//                             <Text style={{ fontWeight: 'bold', fontSize: 18, color: "skyblue", marginRight: '6%' }}>{location.Category}</Text>
//                           <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//                             <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//                           </TouchableOpacity>
//                         </View>
//                         <Text style={{ fontSize: 14, color: "black" }}>Description: {location.Description}</Text>
//                         <ScrollView horizontal>
//                           <View style={{ flexDirection: 'row' }}>
//                             {location.Image1 && <Image source={{ uri: location.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                             {location.Image2 && <Image source={{ uri: location.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                             {location.Image3 && <Image source={{ uri: location.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                             {location.Image4 && <Image source={{ uri: location.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                             {location.Image5 && <Image source={{ uri: location.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                           </View>
//                         </ScrollView>
//                         <TouchableOpacity onPress={() => handlePlayAudio(selectedMarkerInfo)} style={{ marginTop: 10, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
//                           <Text style={{ color: 'white' }}>Play {location.Title}'s Audio</Text>
//                         </TouchableOpacity>
//                       </View>
//                     );
//                   } else {
//                     return null;
//                   }
//                 })}
//               </ScrollView>
//             </View>
//           )}

//           {/* {selectedMarkerInfo && !showNearestLocation && (
//             <View style={{ flex: 1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 68, 51, 0.9)', padding: 10, borderRadius: 5, width: 300, paddingTop:10 }}>
          
//               <View style={{ flexDirection: 'row', alignItems: 'center'}}>
//                 <View style={{ flex: 1, alignItems: 'flex-start' }}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 16, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//                 </View>
//                   <Text style={{ fontWeight: 'bold', fontSize: 18, color: "skyblue", marginRight: '6%' }}>{selectedMarkerInfo.Category}</Text>
//                   <TouchableOpacity onPress={() => setSelectedMarkerInfo(null)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//                 <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//               </TouchableOpacity>
//               </View>
//               <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//               <ScrollView horizontal>
//                 <View style={{ flexDirection: 'row' }}>
//                   {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                 </View>
//               </ScrollView>
//               <TouchableOpacity onPress={() => handlePlayAudio(selectedMarkerInfo)} style={{ marginTop: 10, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
//               <Text style={{ color: 'white' }}>Play {selectedMarkerInfo.Title}'s Audio</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           {showNearestLocation && selectedMarkerInfo && (
//             <View style={{flex:1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 68, 51, 0.9)', padding: 10, borderRadius: 5, width: 300, paddingTop:10 }}>

//               <View style={{ flexDirection: 'row', alignItems: 'center'}}>
//                 <View style={{ flex: 1, alignItems: 'flex-start' }}>
//                 <Text style={{ fontWeight: 'bold', fontSize: 16, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//                 </View>
//                   <Text style={{ fontWeight: 'bold', fontSize: 18, color: "skyblue", marginRight: '6%' }}>{selectedMarkerInfo.Category}</Text>
//                 <TouchableOpacity onPress={() => setShowNearestLocation(false)} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//                   <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//                 </TouchableOpacity>
//               </View>
//               <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//               <ScrollView horizontal>
//                 <View style={{ flexDirection: 'row' }}>
//                   {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                 </View>
//               </ScrollView>
//               <TouchableOpacity onPress={() => handlePlayAudio(selectedMarkerInfo)} style={{ marginTop: 10, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
//                 <Text style={{ color: 'white' }}>Play {selectedMarkerInfo.Title}'s Audio</Text>
//               </TouchableOpacity>
//             </View>
//           )} */}


//           {selectedMarkerInfo && (
//             <View style={{ flex: 1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 68, 51, 0.9)', padding: 10, borderRadius: 5, width: 320, paddingTop: 10 }}>
//               <View style={{ flexDirection: 'row', alignItems: 'center'}}>
//                 <View style={{ flex: 1, alignItems: 'flex-start' }}>
//                   <Text style={{ fontWeight: 'bold', fontSize: 16, color: "black" }}>{selectedMarkerInfo.Title}</Text>
//                 </View>
//                 <Text style={{ fontWeight: 'bold', fontSize: 18, color: "skyblue", marginRight: '6%' }}>{selectedMarkerInfo.Category}</Text>
//                 {showNearestLocation ? (
//                   <TouchableOpacity onPress={() => {
//                     setSelectedMarkerInfo(null)
//                     setShowNearestLocation(false)
//                   }} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//                     <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity onPress={() => {
//                     setSelectedMarkerInfo(null)
//                     setShowNearestLocation(false)
//                   }} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
//                     <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//               <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
//               <ScrollView horizontal>
//                 <View style={{ flexDirection: 'row' }}>
//                   {selectedMarkerInfo.Image1 && <Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image2 && <Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image3 && <Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image4 && <Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                   {selectedMarkerInfo.Image5 && <Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} />}
//                 </View>
//               </ScrollView>
//               <TouchableOpacity onPress={() => handlePlayAudio(selectedMarkerInfo)} style={{ marginTop: 10, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
//                 <Text style={{ color: 'white' }}>Play {selectedMarkerInfo.Title}'s Audio</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//         </>
//       )}


//         {playAudio && nearestLocations.length > 0  &&(
//           <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
//         )}

//         <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
//           <Button title="Refresh" onPress={() => {
//             handleRefresh();
//           }} />
//         </View>

//         <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
//           <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
//         </TouchableOpacity>

//       </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     modalContent: {
//       flexGrow: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       paddingVertical: 20,
//       height: 400, // Set a fixed height
//     },
//     itemsScrollView: {
//       maxHeight: 600, // Set a maximum height for the ScrollView
//     },
//     modalContent: {
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       padding: 20,
//       color:'#0f0f0f',
//       width: '100%',
//       maxHeight: '100%', // Adjusted size for the modal window
//     },
//     categoryItem: {
//       backgroundColor: '#f9f9f9',
//       paddingVertical: 24,
//       paddingHorizontal: 16,
//       borderBottomWidth: 1,
//       borderBottomColor: '#666',
//       color: 'black', // Changed color to black
//       paddingLeft:10,
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightblue',
//     },
//     settingsButton: {
//       position: 'absolute',
//       top: 20,
//       right: 20,
//       backgroundColor: '#fff',
//       padding: 10,
//       borderRadius: 5,
//       elevation: 3,
//       zIndex: 1,
//       color: '#0f0f0f',
//     },
//     settingsButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//       color: '#0f0f0f',
//     },
//     muteButton: {
//       position: 'absolute',
//       bottom: 80,
//       alignSelf: 'center',
//       backgroundColor: 'red',
//       padding: 10,
//       borderRadius: 5,
//     },
//     categoryText: {
//       color: 'black', // Set the text color to black
//       width:240,
//     },
//     okButton: {
//       backgroundColor: 'green',
//       padding: 10,
//       borderRadius: 5,
//       alignSelf: 'flex-end',
//       marginTop: 10,
//     },
//     okButtonText: {
//       color: '#fff',
//       fontWeight: 'bold',
//     },
//     selectAllButtonText: {
//       justifyContent:'flex-end'
//     },
//     selectedMarkerCategory:{
//       color:'black'
//     },
//     modalContainer: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     scrollViewContent: {
//       paddingVertical: 20,
//       paddingHorizontal: 10,
//     },
//     selectAllButton: {
//       marginBottom: 10,
//       backgroundColor: 'lightblue',
//       padding: 10,
//       borderRadius: 5,
//       alignItems: 'center',
//     },
//     selectAllButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//     categoryItem: {
//       marginBottom: 10,
//       backgroundColor: 'lightgrey',
//       padding: 10,
//       borderRadius: 5,
//     },
//     selectedCategoryItem: {
//       backgroundColor: 'lightgreen',
//     },
//     categoryText: {
//       fontSize: 16,
//     },
//     okButton: {
//       marginTop: 20,
//       backgroundColor: 'lightblue',
//       padding: 10,
//       borderRadius: 5,
//       alignItems: 'center',
//     },
//     okButtonText: {
//       fontSize: 16,
//       fontWeight: 'bold',
//     },
//   });
  
//   export default MapScreen;
  




