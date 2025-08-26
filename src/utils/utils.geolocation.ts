// utils.geolocation.ts
export const myLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by this browser."));
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true, // This is key! Requests GPS if available
      timeout: 10000, // Don't wait longer than 10 seconds
      maximumAge: 0, // Don't use a cached position
    };

    // Use watchPosition to get updates. We'll clear it after the first good one.
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        // Check if the accuracy is good enough (e.g., under 100 meters)
        // if (position.coords.accuracy > 100) {
        //   console.log("Accuracy is poor, waiting for better...", position.coords.accuracy);
        //   return;
        // }
        // Stop watching once we get a good position
        navigator.geolocation.clearWatch(watchId);
        resolve(position);
      },
      (error) => reject(error),
      options // Don't forget to pass the options!
    );
  });
};