export function openMapsForDevice(address: string) {
  const encodedAddress = encodeURIComponent(address);
  const userAgent = navigator.userAgent || "";
  const isIOS =
    /iPhone|iPad|iPod/i.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isAndroid = /Android/i.test(userAgent);

  if (isIOS) {
    window.location.href = `maps://?q=${encodedAddress}`;
    return;
  }

  if (isAndroid) {
    window.location.href = `geo:0,0?q=${encodedAddress}`;
    return;
  }

  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
    "_blank",
    "noopener,noreferrer",
  );
}
