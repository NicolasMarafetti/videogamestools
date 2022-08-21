/**
 * Get the device type
 * @return mobile_vertical | mobile_horizontal | desktop
 */
export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop';

  const windowWidth = window.innerWidth;

  if (windowWidth < 500) {
    return 'mobile_vertical';
  }
  if (windowWidth < 1200) {
    return 'mobile_horizontal';
  }
  return 'desktop';
}
