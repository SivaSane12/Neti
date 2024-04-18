// const fs = require('fs');

// // // Function to fetch app name from API
// // async function fetchAppName() {
// //   try {
// //     const response = await fetch('https://dev.netisoft.in/reag/api/GetSystemSettings.php');
// //     if (!response.ok) {
// //       throw new Error(`Failed to fetch app name (${response.status} ${response.statusText})`);
// //     }
// //     const data = await response.json();
// //     return data.appName;
// //   } catch (error) {
// //     console.error('Error fetching app name:', error);
// //     return null;
// //   }
// // }


// // Function to fetch app name from API
// // async function fetchAppName() {
// //     try {
// //       const response = await fetch('https://dev.netisoft.in/reag/api/GetSystemSettings.php');
// //       if (!response.ok) {
// //         throw new Error(`Failed to fetch app name (${response.status} ${response.statusText})`);
// //       }
// //       const data = await response.json();
// //       if (!data.Data || data.Data.length === 0 || !data.Data[0].AppName) {
// //         throw new Error('Invalid or missing app name in API response');
// //       }
// //       return data.Data[0].AppName;
// //     } catch (error) {
// //       console.error('Error fetching app name:', error);
// //       return null;
// //     }
// //   }


// // Function to update package.json and package-lock.json with the fetched app name
// async function fetchAppName(appName) {
//     try {
//       // Update package.json
//       const packageJsonPath = './package.json';
//       const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
//       packageJson.name = appName;
//       fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
//       // Update package-lock.json
//       const packageLockPath = './package-lock.json';
//       const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
//       packageLock.name = appName;
//       fs.writeFileSync(packageLockPath, JSON.stringify(packageLock, null, 2));
  
//       console.log(`App name set to: ${appName}`);
//     } catch (error) {
//       console.error('Error updating package files:', error);
//     }
//   }
  




// // Function to update package.json with the fetched app name
// async function updatePackageName(appName) {
//   try {
//     const packageJsonPath = './package.json';
//     const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
//     packageJson.name = appName;
//     fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
//     console.log(`App name set to: ${appName}`);
//   } catch (error) {
//     console.error('Error updating package.json:', error);
//   }
// }

// // Main function to orchestrate the build process
// async function build() {
//   // Fetch app name from API
//   const appName = await fetchAppName();

//   // Update package.json with the fetched app name
//   if (appName) {
//     await updatePackageName(appName);
//   } else {
//     console.error('Failed to fetch app name. Aborting build process.');
//     return;
//   }

//   // Execute the build process for React Native
//   console.log('Starting React Native build process...');
//   // Execute your build command here, e.g., `react-native run-android` or `react-native run-ios`
// }

// // Run the build process
// build();



const fetch = require('node-fetch');
const fs = require('fs');

// Function to fetch app name from API
async function fetchAppName() {
  try {
    const response = await fetch('https://dev.netisoft.in/reag/api/GetSystemSettings.php');
    if (!response.ok) {
      throw new Error(`Failed to fetch app name (${response.status} ${response.statusText})`);
    }
    const data = await response.json();
    if (!data.Data || data.Data.length === 0 || !data.Data[0].AppName) {
      throw new Error('Invalid or missing app name in API response');
    }
    return data.Data[0].AppName;
  } catch (error) {
    console.error('Error fetching app name:', error);
    return null;
  }
}

// Function to update package.json and package-lock.json with the fetched app name
async function updatePackageNames() {
  try {
    // Fetch app name from API
    const appName = await fetchAppName();

    // Update package.json
    const packageJsonPath = './package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.name = appName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Update package-lock.json
    const packageLockPath = './package-lock.json';
    const packageLock = JSON.parse(fs.readFileSync(packageLockPath, 'utf8'));
    packageLock.name = appName;
    fs.writeFileSync(packageLockPath, JSON.stringify(packageLock, null, 2));

    console.log(`App name set to: ${appName}`);
  } catch (error) {
    console.error('Error updating package files:', error);
  }
}

// Call the function to update package names
updatePackageNames();
