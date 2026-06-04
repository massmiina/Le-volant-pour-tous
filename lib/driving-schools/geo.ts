export function getDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const earthRadiusMeters = 6371000;
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(earthRadiusMeters * c);
}

export function getDistanceKmLabel(distanceMeters?: number) {
  if (distanceMeters === undefined) return undefined;
  return (distanceMeters / 1000).toFixed(distanceMeters < 10000 ? 1 : 0);
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}
