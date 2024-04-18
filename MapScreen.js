import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Modal, ScrollView, Image} from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AudioPlayer from './AudioPlayer';
import EnlargedImage from './EnlargedImage';
import { useNavigation } from '@react-navigation/native';
import AppNameComponent from './AppNameComponent';

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [nearestLocations, setNearestLocations] = useState([]);
  const [playAudio, setPlayAudio] = useState(false);
  const [playAudioState, setPlayAudioState] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(categories.map(category => category.Id));
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [allCategoriesUnselected, setAllCategoriesUnselected] = useState(true);


    // State to store the information of the clicked marker
  const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(null); 

    // Assuming you have a state variable to control the visibility of nearest location display
  const [showNearestLocation, setShowNearestLocation] = useState(true); 


  const [enlargedImageUri, setEnlargedImageUri] = useState(null); // New state for the enlarged image URI

  
  const mapRef = useRef(null);

  const navigation = useNavigation();

  const [appName, setAppName] = useState(null);

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => {
        setAppName(data.AppName);
      })
      .catch(error => console.error('Error fetching app name:', error));
  }, []);


  useEffect(() => {                    // getting the categories
    // Fetch categories
    fetch('')
      .then(response => response.json())
      .then(data => setCategories(data.Data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  useEffect(() => {       // for selecting all the categories by default
    // Fetch categories
    fetch('')
      .then(response => response.json())
      .then(data => {
        setCategories(data.Data);
        // Set all categories as selected initially
        const allCategoryIds = data.Data.map(category => category.Id);
        setSelectedCategories(allCategoryIds);
      })
      .catch(error => console.error('Error fetching categories:', error));
  }, []);


  useEffect(() => {          // for selecting the categories and getting one by one
    if (selectedCategories.length > 0) {
      const requestBody = {
        Categories: selectedCategories.join(',')
      };

      fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(response => response.json())
        .then(data =>{ 
          setFilteredLocations(data.Data)
          
          // Log the data to the console
          console.log('Filtered Locations:', data.Data)
        })

        .catch(error => console.error('Error fetching filtered locations:', error));
    } else {
      setFilteredLocations([]);
    }
  }, [selectedCategories]);

  useEffect(() => {                   // fetch user's location
    let isMounted = true;

    const fetchUserLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { coords } = position;
          if (isMounted) {
            setUserLocation(coords);
          }
        },
        error => console.error('Error getting current location:', error),
        { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
      );
    };

    fetchUserLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {                   // watching user's location
    let watchId;
    let intervalId;

    const watchUserLocation = () => {
      watchId = Geolocation.watchPosition(
        position => {
          const { coords } = position;
          setUserLocation(coords);
        },
        error => console.error('Error watching user location:', error),
        { enableHighAccuracy: true, distanceFilter: 2 }
      );
    };

    const updateUserLocation = () => {
      intervalId = setInterval(() => {
        Geolocation.getCurrentPosition(
          position => {
            const { coords } = position;
            setUserLocation(coords);
          },
          error => console.error('Error getting current location:', error),
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
      }, 5000);
    };

    watchUserLocation();
    updateUserLocation();

    return () => {
      if (watchId) {
        Geolocation.clearWatch(watchId);
      }
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {                    // filtered locations, calculating distnace, handling audio play
    if (!userLocation || !filteredLocations?.length) return;

    const locationsWithDistances = filteredLocations.map(item => ({
      ...item,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        parseFloat(item.Latitude),
        parseFloat(item.Longitude)
      )
    }));

    locationsWithDistances.sort((a, b) => a.distance - b.distance);

    // const nearest = locationsWithDistances.slice(0, 4);  

    const uniqueLocationNames = new Set(); // Create a set to store unique location names
    const nearest = locationsWithDistances.reduce((acc, location) => {
      if (!uniqueLocationNames.has(location.Title)) { // Check if location name is not already in the set
        uniqueLocationNames.add(location.Title); // Add location name to set
        // acc.push(location); // Add location to nearest array
        acc.push({
          ...location,
          key: location.id // Using location ID as the key
        });
      }
      return acc;
    }, []).slice(0, 4);

    // const uniqueLocationNames = new Set(); // Create a set to store unique location names
    // const nearest = locationsWithDistances.reduce((acc, location, index) => {
    //   const key = location.Title + index; // Append index to the key if locations have the same name
    //   if (!uniqueLocationNames.has(location.Title)) { // Check if location name is not already in the set
    //     uniqueLocationNames.add(location.Title); // Add location name to set
    //     acc.push({
    //       ...location,
    //       key: key // Using location Title and index as the key
    //     });
    //   }
    //   return acc;
    // }, []).slice(0, 4);
    

    // const uniqueLocationTitles = new Set(); // Create a set to store unique location titles
    // const nearest = locationsWithDistances.reduce((acc, location) => {
    //   if (!uniqueLocationTitles.has(location.Title)) { // Check if location title is not already in the set
    //     uniqueLocationTitles.add(location.Title); // Add location title to set
    //     acc.push({
    //       ...location,
    //       key: location.id // Using location ID as the key
    //     });
    //   }
    //   return acc;
    // }, []).slice(0, 4);
    

    // const uniqueLocationTitles = new Set(); // Create a set to store unique location titles
    // const nearest = locationsWithDistances.reduce((acc, location) => {
    //   if (!uniqueLocationTitles.has(location.Title)) { // Check if location title is not already in the set
    //     uniqueLocationTitles.add(location.Title); // Add location title to set
    //     acc.push({
    //       ...location,
    //       key: location.id // Using location ID as the key
    //     });
    //   } else {
    //     const uniqueKey = `${location.Title}_${Math.random().toString(36).substr(2, 9)}`; // Generate a random string
    //     acc.push({
    //       ...location,
    //       key: uniqueKey // Use the unique key
    //     });
    //     uniqueLocationTitles.add(uniqueKey); // Add the unique key to the set
    //   }
    //   return acc;
    // }, []).slice(0, 4);






    // const uniqueLocationNames = new Set(); // Create a set to store unique location names
    // const nearest = locationsWithDistances.reduce((acc, location, index) => {
    //   if (!uniqueLocationNames.has(location.Title)) {
    //     uniqueLocationNames.add(location.Title);
    //     acc.push({
    //       ...location,
    //       key: `${location.Title}_${index}` // Adding index to make the key unique
    //     });
    //   }
    //   return acc;
    // }, []).slice(0, 4);
    




    if (!nearest) return;

    nearest.forEach((location, index) => {
      const triggerDistance = location.distance <= location.TriggerDistance;

      if (triggerDistance) {
        if (location.AudioURL && !playAudioState[location.Title]) {
          setTimeout(() => {
            AudioPlayer.play(location.AudioURL);
            setPlayAudioState(prevState => ({
              ...prevState,
              [location.Title]: true
            }));
          }, index * 6000);
        }
      } else {
        if (playAudioState[location.Title]) {
          AudioPlayer.stop();
          setPlayAudioState(prevState => ({
            ...prevState,
            [location.Title]: false
          }));
        }
      }
    });

    setNearestLocations(nearest);
  }, [userLocation, filteredLocations]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const deg2rad = (deg) => deg * (Math.PI / 180);
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
  };


const handleRefresh = () => {         // refresh button, audio stops
  // Stop any currently playing audio
  AudioPlayer.stop();

  // Clear audio state
  setPlayAudioState({});

  setShowNearestLocation(true);

  setSelectedMarkerInfo(false);

  // Clear nearest locations
  // setNearestLocations([]);
  
  // Reset user's location
  Geolocation.getCurrentPosition(
    position => {
      const { latitude, longitude } = position.coords;
      setUserLocation(position.coords);
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0222,
          longitudeDelta: 0.0221,
        });
      }
    },
    error => console.error('Error getting current location:', error),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );

};

  const handleMuteToggle = () => {         // handling mute button
    if (isMuted) {
      AudioPlayer.unmute();
      setIsMuted(false);
      console.log("Unmuting audio");
    } else {
      AudioPlayer.mute();
      setIsMuted(true);
      console.log("Muting audio");
    }
  };

  const handleItemPress = (categoryId) => {
    if (!selectedCategories.includes(categoryId)) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
    setAllCategoriesUnselected(true)
  
  };
  
  const handleToggleSelectAll = () => {
    
    const allCategoryIds = categories.map(category => category.Id);
    setSelectedCategories(allCategoryIds);
    setAllCategoriesUnselected(true);
    
  };

  // Define handleMarkerClick function to set the selectedMarkerInfo state
  const handleMarkerClick = (location) => {
    setSelectedMarkerInfo({
      title: location.title,
      category: location.category
    });
  };

// Function to close nearest location display
const closeNearestLocationDisplay = () => {
  setShowNearestLocation(false);
};

const handleCloseAll = () => {
  setSelectedCategories([]);
  setAllCategoriesUnselected(false)
  AudioPlayer.stop();

}

// const handlePlayAudio = (location) => {
//   // Assuming location has an AudioURL property
//   if (location.AudioURL) {
//     AudioPlayer.play(location.AudioURL);
//     console.log('Playing audio for:', location.Title);
//   }
// };

// Inside handlePlayAudio function
const handlePlayAudio = (location) => {
  if (location.AudioURL) {
    if (!isMuted) {
      AudioPlayer.play(location.AudioURL);
      console.log('Playing audio for:', location.Title);
    } else {
      // If muted, play audio silently
      AudioPlayer.setVolume(0); // Set volume to 0 for silent playback
      AudioPlayer.play(location.AudioURL);
      console.log('Playing audio silently for:', location.Title);
    }
  }
};

// const handleImageClick = (imageUri) => {
//   navigation.navigate('EnlargedImage', { imageUri });
// };

const handleImageClick = (imageUri, allImages, locationName) => {
  navigation.navigate('EnlargedImage', { imageUri, allImages, locationName });
};


const handleCloseImage = () => {
  setEnlargedImageUri(null);
};


  return (
    <View style={{ flex: 1 }}>

{appName && <AppNameComponent appName={appName} />}
      

{userLocation && (                                                 // display MapView
  <MapView
    ref={mapRef}
    style={{ flex: 1 }}
    initialRegion={{
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0222,
      longitudeDelta: 0.0221,
    }}
  >
      {!allCategoriesUnselected &&                                 //  show the Markers for the selected categories
      selectedCategories.length > 0 && filteredLocations && filteredLocations.map(location => (
        <Marker
          key={location.Title}
          coordinate={{
            latitude: parseFloat(location.Latitude),
            longitude: parseFloat(location.Longitude)
          }}
          onPress={() => handleMarkerClick(location)}
        />
      ))}
  
      {filteredLocations && filteredLocations.map(location => (    // adding selectable Marker for filtered locations
        <Marker
          key={location.Title}
          coordinate={{
            latitude: parseFloat(location.Latitude),
            longitude: parseFloat(location.Longitude),
          }}
          onPress={() => setSelectedMarkerInfo(location)}
        />
      ))}

      {userLocation && (                                           // blue color Marker for UserLocation
        <Marker
          coordinate={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          title="User Location"
          pinColor="blue"
        />
      )}

      {userLocation && (                                           // circle for userLocation
          <Circle
            center={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            radius={0.7}
            fillColor="rgba(255,200,0,0.9)"
            strokeColor="transparent"
          />
        )}

  </MapView>
)}


      <Modal                                                             // for showing categories to select
        animationType="slide"
        transparent={true}
        visible={showCategories}
        onRequestClose={() => setShowCategories(false)}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <TouchableOpacity onPress={handleToggleSelectAll} style={styles.selectAllButton}>
              <Text style={styles.selectAllButtonText}>Select All</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCloseAll} style={styles.selectAllButton}>
              <Text style={styles.selectAllButtonText}>Clear All</Text>
            </TouchableOpacity>
            <ScrollView style={styles.itemsScrollView}>
              {categories.map(category => (
                <TouchableOpacity
                  key={category.Id}
                  style={[styles.categoryItem, selectedCategories.includes(category.Id) && styles.selectedCategoryItem]}
                  onPress={() => handleItemPress(category.Id)}
                >
                  <Text style={styles.categoryText}>{category.Category}</Text>
                  <Text style={styles.categoryText}>{category.Description}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setShowCategories(false)} style={styles.okButton}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>


      {/* Show Categories Button */}
      <TouchableOpacity onPress={() => setShowCategories(true)} style={styles.settingsButton}>
        <Text style={styles.settingsButtonText}>Categories</Text>
      </TouchableOpacity> 


      {allCategoriesUnselected && (

        <>

          {nearestLocations.length > 0 && (
            <View style={{ flex:1, position: 'absolute', top: 20, left: 20, backgroundColor: 'rgba(125, 125, 0, 0.9)', padding: 10, borderRadius: 5 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5, color: "black" }}> Nearest Locations:</Text>
              {nearestLocations.map((nearest, index) => (
                index < 4 && (
                  <View key={nearest.Title} style={{ marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, color: "black" }}>{nearest.Title}</Text>
                    <Text style={{ fontSize: 12, color: "black" }}>Distance: {(nearest.distance).toFixed(2)} meters</Text>
                  </View>
                )
              ))}
            </View>
          )}
  
{/* {!selectedMarkerInfo && showNearestLocation && nearestLocations.length > 0 && (
      <View style={{ flex: 1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5, width: 320, paddingTop: 10 }}>
        <ScrollView>
          {nearestLocations.map((location, index) => {
            if (location && location.distance <= location.TriggerDistance) {
              return (
                <View key={index} style={{ marginBottom: 20 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1, alignItems: 'flex-start' }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16, color: "black" }}>{location.Title}</Text>
                    </View>
                    <Text style={{ fontWeight: 'bold', fontSize: 14, color: "skyblue", marginRight: '6%' }}>{location.Category}</Text>
                    <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={{ fontSize: 14, color: "black" }}>Description: {location.Description}</Text>
                  <ScrollView horizontal>
                    <View style={{ flexDirection: 'row' }}>
                      {location.Image1 && <TouchableOpacity onPress={() => handleImageClick(location.Image1)}><Image source={{ uri: location.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                      {location.Image2 && <TouchableOpacity onPress={() => handleImageClick(location.Image2)}><Image source={{ uri: location.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                      {location.Image3 && <TouchableOpacity onPress={() => handleImageClick(location.Image3)}><Image source={{ uri: location.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                      {location.Image4 && <TouchableOpacity onPress={() => handleImageClick(location.Image4)}><Image source={{ uri: location.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                      {location.Image5 && <TouchableOpacity onPress={() => handleImageClick(location.Image5)}><Image source={{ uri: location.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                    </View>
                  </ScrollView>
                  <TouchableOpacity onPress={() => handlePlayAudio(selectedMarkerInfo)} style={{ marginTop: 10, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
                    <Text style={{ color: 'white' }}>Play {location.Title}'s Audio</Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return null;
            }
          })}
        </ScrollView>
      </View>
    )} */}


{!selectedMarkerInfo && showNearestLocation && nearestLocations.some(location => location.distance <= location.TriggerDistance) && (
  <View style={{ flex: 1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 95, 21, 0.9)', padding: 10, borderRadius: 5, width: 320, paddingTop: 10 }}>
    <ScrollView>
      {nearestLocations.map((location, index) => {
        if (location.distance <= location.TriggerDistance) {
          return (
            <View key={index} style={{ marginBottom: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: "black" }}>{location.Title}</Text>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 14, color: "skyblue", marginRight: '6%' }}>{location.Category}</Text>
                <TouchableOpacity onPress={closeNearestLocationDisplay} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 14, color: "black" }}>Description: {location.Description}</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  {location.Image1 && <TouchableOpacity onPress={() => handleImageClick(location.Image1)}><Image source={{ uri: location.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                  {location.Image2 && <TouchableOpacity onPress={() => handleImageClick(location.Image2)}><Image source={{ uri: location.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                  {location.Image3 && <TouchableOpacity onPress={() => handleImageClick(location.Image3)}><Image source={{ uri: location.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                  {location.Image4 && <TouchableOpacity onPress={() => handleImageClick(location.Image4)}><Image source={{ uri: location.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                  {location.Image5 && <TouchableOpacity onPress={() => handleImageClick(location.Image5)}><Image source={{ uri: location.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                </View>
              </ScrollView>
              <TouchableOpacity onPress={() => handlePlayAudio(selectedMarkerInfo)} style={{ marginTop: 10, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Play {location.Title}'s Audio</Text>
              </TouchableOpacity>
            </View>
          );
        } else {
          return null;
        }
      })}
    </ScrollView>
  </View>
)}


      {enlargedImageUri && <EnlargedImage imageUri={enlargedImageUri} onClose={handleCloseImage} />}


{selectedMarkerInfo && (
            <View style={{ flex: 1, position: 'absolute', top: 300, left: 20, backgroundColor: 'rgba(255, 68, 51, 0.9)', padding: 10, borderRadius: 5, width: 320, paddingTop: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 16, color: "black" }}>{selectedMarkerInfo.Title}</Text>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: 14, color: "skyblue", marginRight: '6%' }}>{selectedMarkerInfo.Category}</Text>
                {showNearestLocation ? (
                  <TouchableOpacity onPress={() => {
                    setSelectedMarkerInfo(null)
                    setShowNearestLocation(false)
                  }} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={() => {
                    setSelectedMarkerInfo(null)
                    setShowNearestLocation(false)
                  }} style={{ position: 'absolute', top: 0, right: 0, padding: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>X</Text>
                  </TouchableOpacity>
                )}
              </View>
              <Text style={{ fontSize: 14, color: "black" }}>Description: {selectedMarkerInfo.Description}</Text>
              <ScrollView horizontal>
                <View style={{ flexDirection: 'row' }}>
                  {selectedMarkerInfo.Image1 && <TouchableOpacity onPress={() => handleImageClick(selectedMarkerInfo.Image1, [selectedMarkerInfo.Image1, selectedMarkerInfo.Image2, selectedMarkerInfo.Image3, selectedMarkerInfo.Image4, selectedMarkerInfo.Image5], selectedMarkerInfo.Title)}><Image source={{ uri: selectedMarkerInfo.Image1 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                  {selectedMarkerInfo.Image2 && <TouchableOpacity onPress={() => handleImageClick(selectedMarkerInfo.Image2, [selectedMarkerInfo.Image1, selectedMarkerInfo.Image2, selectedMarkerInfo.Image3, selectedMarkerInfo.Image4, selectedMarkerInfo.Image5], selectedMarkerInfo.Title)}><Image source={{ uri: selectedMarkerInfo.Image2 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                  {selectedMarkerInfo.Image3 && <TouchableOpacity onPress={() => handleImageClick(selectedMarkerInfo.Image3, [selectedMarkerInfo.Image1, selectedMarkerInfo.Image2, selectedMarkerInfo.Image3, selectedMarkerInfo.Image4, selectedMarkerInfo.Image5], selectedMarkerInfo.Title)}><Image source={{ uri: selectedMarkerInfo.Image3 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                  {selectedMarkerInfo.Image4 && <TouchableOpacity onPress={() => handleImageClick(selectedMarkerInfo.Image4, [selectedMarkerInfo.Image1, selectedMarkerInfo.Image2, selectedMarkerInfo.Image3, selectedMarkerInfo.Image4, selectedMarkerInfo.Image5], selectedMarkerInfo.Title)}><Image source={{ uri: selectedMarkerInfo.Image4 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                  {selectedMarkerInfo.Image5 && <TouchableOpacity onPress={() => handleImageClick(selectedMarkerInfo.Image5, [selectedMarkerInfo.Image1, selectedMarkerInfo.Image2, selectedMarkerInfo.Image3, selectedMarkerInfo.Image4, selectedMarkerInfo.Image5], selectedMarkerInfo.Title)}><Image source={{ uri: selectedMarkerInfo.Image5 }} style={{ width: 100, height: 100, marginRight: 10 }} /></TouchableOpacity>}
                </View>
              </ScrollView>
              <TouchableOpacity onPress={() => handlePlayAudio(selectedMarkerInfo)} style={{ marginTop: 10, backgroundColor: 'skyblue', padding: 10, borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Play {selectedMarkerInfo.Title}'s Audio</Text>
              </TouchableOpacity>
            </View>
          )}

        </>
      )}


        {playAudio && nearestLocations.length > 0  &&(
          <Text style={{ position: 'absolute', bottom: 20, alignSelf: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: 10, borderRadius: 5, color: 'white' }}>{`Near to ${nearestLocations.length > 0 ? nearestLocations[0].Title : ''}`} </Text>
        )}

        <View style={{ position: 'absolute', bottom: 20, right: 20 }}>
          <Button title="Refresh" onPress={() => {
            handleRefresh();
          }} />
        </View>

        <TouchableOpacity onPress={handleMuteToggle} style={[styles.muteButton, { backgroundColor: isMuted ? 'red' : 'green' }]}>
          <Text style={{ color: isMuted ? 'white' : 'black' }}>{isMuted ? 'Unmute' : 'Mute'}</Text>
        </TouchableOpacity>

      </View>
    );
  }

  const styles = StyleSheet.create({
    modalContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
      height: 400, // Set a fixed height
    },
    itemsScrollView: {
      maxHeight: 600, // Set a maximum height for the ScrollView
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      color:'#0f0f0f',
      width: '100%',
      maxHeight: '100%', // Adjusted size for the modal window
    },
    categoryItem: {
      backgroundColor: '#f9f9f9',
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#666',
      color: 'black', // Changed color to black
      paddingLeft:10,
    },
    selectedCategoryItem: {
      backgroundColor: 'lightblue',
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
      color: '#0f0f0f',
    },
    settingsButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#0f0f0f',
    },
    muteButton: {
      position: 'absolute',
      bottom: 80,
      alignSelf: 'center',
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
    },
    categoryText: {
      color: 'black', // Set the text color to black
      width:240,
    },
    okButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      alignSelf: 'flex-end',
      marginTop: 10,
    },
    okButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    selectAllButtonText: {
      justifyContent:'flex-end'
    },
    selectedMarkerCategory:{
      color:'black'
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    scrollViewContent: {
      paddingVertical: 20,
      paddingHorizontal: 10,
    },
    selectAllButton: {
      marginBottom: 10,
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    selectAllButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    categoryItem: {
      marginBottom: 10,
      backgroundColor: 'lightgrey',
      padding: 10,
      borderRadius: 5,
    },
    selectedCategoryItem: {
      backgroundColor: 'lightgreen',
    },
    categoryText: {
      fontSize: 16,
    },
    okButton: {
      marginTop: 20,
      backgroundColor: 'lightblue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    okButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
  export default MapScreen;
  

