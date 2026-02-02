// Blur placeholder for images - shimmer effect
export const shimmerBlurDataUrl = `data:image/svg+xml;base64,${Buffer.from(
  `<svg width="400" height="400" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#f6f7f8" offset="0%" />
        <stop stop-color="#edeef1" offset="20%" />
        <stop stop-color="#f6f7f8" offset="40%" />
        <stop stop-color="#f6f7f8" offset="100%" />
      </linearGradient>
    </defs>
    <rect width="400" height="400" fill="#f6f7f8" />
    <rect id="r" width="400" height="400" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-400" to="400" dur="1s" repeatCount="indefinite"  />
  </svg>`
).toString('base64')}`;

// Simple gray blur placeholder
export const grayBlurDataUrl = 
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjwvc3ZnPg==';
