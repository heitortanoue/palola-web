export function addOpacityHex (hex: string, opacity: number) {
  const hexWithoutHash = hex.replace('#', '')
  const hexWithOpacity = hexWithoutHash + Math.round(opacity * 255).toString(16)
  return `#${hexWithOpacity}`
}