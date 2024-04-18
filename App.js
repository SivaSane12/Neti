  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createStackNavigator } from '@react-navigation/stack';
  import MapScreen from './MapScreen';
  import SettingsComponent from './SettingsComponent';
  import { LocationsProvider } from './LocationsContext';
  import EnlargedImage from './EnlargedImage';
  import AppNameComponent from './AppNameComponent';

  import NetworkErrorHandler from './NetworkErrorHandler';


  const Stack = createStackNavigator();

  const App = () => {
    return (
      <LocationsProvider>
        <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Neti Maps" component={MapScreen} />
              <Stack.Screen name="AppName" component={AppNameComponent} />
              <Stack.Screen name="Categories" component={SettingsComponent} />
              <Stack.Screen name="EnlargedImage" component={EnlargedImage} />
          </Stack.Navigator>
        </NavigationContainer>
      </LocationsProvider>
    );
  }

  export default App;
