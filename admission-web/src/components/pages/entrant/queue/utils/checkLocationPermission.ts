export async function checkLocationPermission(): Promise<boolean> {
  if (!navigator.permissions || !navigator.geolocation) {
    return false;
  }

  try {
    const permissionStatus = await navigator.permissions.query({
      name: 'geolocation',
    });
    switch (permissionStatus.state) {
      case 'granted':
        return true;
      case 'prompt':
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            () => resolve(true),
            () => resolve(false)
          );
        });
      case 'denied':
        return false;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
}
