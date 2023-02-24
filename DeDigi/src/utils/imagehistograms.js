exports.colorChannels = {
  Red: 0,
  Green: 1,
  Blue: 2,
};

function createHistogram(channel, colourFrequencies, maxFrequency) {
  const histWidth = 512;
  const histHeight = 316;
  const columnWidth = 2;
  const pixelsPerUnit = histHeight / maxFrequency;

  let hexColour;
  let x = 0;
  let columnHeight;

  let svgstring = `<svg width='${histWidth}px' height='${histHeight}px' xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink'>\n`;

  // svgstring += `    <rect fill='#ffffff;' width='${histWidth}px' height='${histHeight}px' y='0' x='0' />\n`;

  for (let i = 0; i <= 255; i += 1) {
    hexColour = i.toString(16).padStart(2, '0');

    switch (channel) {
      case exports.colorChannels.Red:
        hexColour = `#${hexColour}0000`;
        break;
      case exports.colorChannels.Green:
        hexColour = `#00${hexColour}00`;
        break;
      case exports.colorChannels.Blue:
        hexColour = `#0000${hexColour}`;
        break;
      default:
        break;
    }

    columnHeight = colourFrequencies[i] * pixelsPerUnit;

    svgstring += `    <rect fill='${hexColour}' stroke='${hexColour}' stroke-width='0.25px' width='${columnWidth}' height='${columnHeight}' y='${
      histHeight - columnHeight
    }' x='${x}' />\n`;

    x += columnWidth;
  }

  svgstring += '</svg>';

  return svgstring;
}

function getColourFrequencies(channel, jimpImage) {
  const startIndex = channel; // StartIndex same as RGB enum: R=0, G=1, B=2

  let maxFrequency = 0;
  const colourFrequencies = Array(256).fill(0);

  // Iterate bitmap and count frequencies of specified component values
  for (let i = startIndex, len = jimpImage.bitmap.data.length; i < len; i += 4) {
    colourFrequencies[jimpImage.bitmap.data[i]] += 1;

    if (colourFrequencies[jimpImage.bitmap.data[i]] > maxFrequency) {
      maxFrequency += 1;
    }
  }

  const result = {
    colourFrequencies,
    maxFrequency,
  };

  return result;
}

exports.histogramRGB = (channel, jimpImage) => {
  const colourFrequencies = getColourFrequencies(channel, jimpImage);

  const histogram = createHistogram(channel, colourFrequencies.colourFrequencies, colourFrequencies.maxFrequency);

  return histogram;
};
