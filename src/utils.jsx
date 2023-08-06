import { renderToString } from 'react-dom/server';

export function getIconAsSvgDataURL(iconComponent) {
  const svgString = renderToString(iconComponent);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}
