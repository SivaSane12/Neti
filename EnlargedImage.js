// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';

// const EnlargeImage = ({ imageUri, onClose }) => {
//   return (
//     <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' }}>
//       <TouchableOpacity onPress={onClose} style={{ position: 'absolute', top: 20, right: 20 }}>
//         <Text style={{ color: 'red', fontWeight: 'bold' }}>Closerxdtcfyvgbhrxdtcfygvbuhxrdtcfyvgbuhxrtcfvgbhn</Text>
//       </TouchableOpacity>
//       <Image source={{ uri: imageUri }} style={{ width: '80%', height: '80%' }} resizeMode="contain" />
//     </View>
//   );
// };

// export default EnlargeImage;

// EnlargeImage.js

// import React from 'react';
// import { View, Text, TouchableOpacity, Image } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';

// const EnlargeImage = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { imageUri } = route.params;

//   const handleClose = () => {
//     navigation.goBack(); // Navigate back to the previous screen
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: 'black' }}>
//       <TouchableOpacity onPress={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}>
//         <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
//       </TouchableOpacity>
//       <Image source={{ uri: imageUri }} style={{ flex: 1 }} resizeMode="contain" />
//     </View>
//   );
// };

// export default EnlargeImage;


import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EnlargeImage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { imageUri, allImages, locationName } = route.params;

  const handleClose = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {/* <Text style={{ color: 'white', fontWeight: 'bold' }}>{locationName}</Text>
      <TouchableOpacity onPress={handleClose} style={{ position: 'absolute', top: 20, right: 20 }}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
      </TouchableOpacity> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, padding: 20, marginTop:20 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{locationName}</Text>
      <TouchableOpacity onPress={handleClose}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Close</Text>
      </TouchableOpacity>
      </View>

      <ScrollView horizontal style={{ flex: 1 }}>
        {allImages.map((uri, index) => (
          <Image key={index} source={{ uri }} style={styles.image} resizeMode="contain" />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: windowWidth, // Fill width of the screen
    height: windowHeight, // Fill height of the screen
    marginRight: 10, // Add margin between images
  },
});

export default EnlargeImage;

