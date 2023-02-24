const methods = [
  {
    alt: 'ela',
    methodName: 'Error Level Analysis',
    tooltip: 'Analysis of compression artifacts',
  },
  {
    alt: 'ghost',
    methodName: 'JPEG Ghost',
    tooltip: 'Analysis of compression artifacts',
  },
  {
    alt: 'artifact',
    methodName: 'Demosaicing Artifacts',
    tooltip: '**Long running task, need to wait**\nAnalysis of compression artifacts when going through Color Filter Array',
  },
  {
    alt: 'mediannoise',
    methodName: 'Noise Median Inconsistencies',
    tooltip: 'Detect noise inconsistencies',
  },
  {
    alt: 'geometric-physics',
    methodName: 'Geometric and Physics Analysis',
    tooltip: 'Inconsitencies in 3D objects, distances, lightnings, shadows, etc.',
  },
  {
    alt: 'metadata',
    methodName: 'Metadata',
    tooltip: 'Information contained inside image',
  },
  {
    alt: 'histogram',
    methodName: 'Histogram',
    tooltip: 'Distribution of colors in image',
  },
];

export default methods;
