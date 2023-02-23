import exifr from "exifr/dist/full.esm.mjs";

async function isImage(fileSrc) {
  let blob = await fetch(fileSrc).then((res) => res.blob());
  try {
    await exifr.parse(blob, { gps: false });
  } catch (error) {
    //console.log(error);
    return false;
  }
  return true;
}

function isJPEG(imageSrc) {
  return imageSrc.startsWith("data:image/jpeg;base64,");
}

async function getExifMetadata(imageData) {
  let blob = await fetch(imageData).then((res) => res.blob());
  let url = URL.createObjectURL(blob);
  let output = null;

  try {
    output = (await exifr.parse(url, { gps: false })) || null;
  } catch {
    return null;
  }

  return output;
}

async function getGeoTags(imageData) {
  let blob = await fetch(imageData).then((res) => res.blob());
  let url = URL.createObjectURL(blob);
  let output = null;

  try {
    output =
      (await exifr.parse(url, {
        tiff: false,
        ifd0: false,
        exif: false,
        gps: true,
      })) || null;
  } catch {
    return null;
  }

  return output;
}

async function getThumbnail(imageData) {
  let blob = await fetch(imageData).then((res) => res.blob());
  let url = URL.createObjectURL(blob);
  let output = null;

  try {
    output = (await exifr.thumbnailUrl(url)) || null;
  } catch (error) {
    return null;
  }

  return output;
}

// https://gist.github.com/FranckFreiburger/d8e7445245221c5cf38e69a88f22eeeb
function getQuantizationTables(data) {
  let quantizationTables = [];

  let dctZigZag = new Int32Array([
    0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40,
    48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36,
    29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61,
    54, 47, 55, 62, 63,
  ]);

  let offset = 0;

  function readUint16() {
    let value = (data[offset] << 8) | data[offset + 1];
    offset += 2;
    return value;
  }

  let fileMarker = readUint16();
  if (fileMarker != 0xffd8) {
    // SOI (Start of Image)
    throw new Error("SOI not found");
  }

  fileMarker = readUint16();

  markerLoop: while (fileMarker != 0xffd9) {
    // EOI (End of image)
    let j;
    switch (fileMarker) {
      case 0xff00:
        break;
      case 0xffe0: // APP0 (Application Specific)
      case 0xffe1: // APP1
      case 0xffe2: // APP2
      case 0xffe3: // APP3
      case 0xffe4: // APP4
      case 0xffe5: // APP5
      case 0xffe6: // APP6
      case 0xffe7: // APP7
      case 0xffe8: // APP8
      case 0xffe9: // APP9
      case 0xffea: // APP10
      case 0xffeb: // APP11
      case 0xffec: // APP12
      case 0xffed: // APP13
      case 0xffee: // APP14
      case 0xffef: // APP15
      case 0xfffe: // COM (Comment)
      case 0xffc0: // SOF0 (Start of Frame, Baseline DCT)
      case 0xffc1: // SOF1 (Start of Frame, Extended DCT)
      case 0xffc2: // SOF2 (Start of Frame, Progressive DCT)
      case 0xffc4: // DHT (Define Huffman Tables)
      case 0xffdd: // DRI (Define Restart Interval)
        offset += readUint16(); // skip
        break;
      case 0xffdb: // DQT (Define Quantization Tables)
        var quantizationTablesLength = readUint16();
        var quantizationTablesEnd = quantizationTablesLength + offset - 2;
        while (offset < quantizationTablesEnd) {
          var quantizationTableSpec = data[offset++];
          var tableData = new Int32Array(64);
          if (quantizationTableSpec >> 4 === 0) {
            // 8 bit values
            for (j = 0; j < 64; j++) {
              let z = dctZigZag[j];
              tableData[z] = data[offset++];
            }
          } else if (quantizationTableSpec >> 4 === 1) {
            //16 bit
            for (j = 0; j < 64; j++) {
              let z = dctZigZag[j];
              tableData[z] = readUint16();
            }
          } else throw new Error("DQT: invalid table spec");
          quantizationTables[quantizationTableSpec & 15] = tableData;
        }
        break;

      case 0xffda: // SOS (Start of Scan)
        break markerLoop;

      case 0xffff: // Fill bytes
        if (data[offset] !== 0xff) {
          // Avoid skipping a valid marker.
          offset--;
        }
        break;

      default:
        if (
          data[offset - 3] == 0xff &&
          data[offset - 2] >= 0xc0 &&
          data[offset - 2] <= 0xfe
        ) {
          // could be incorrect encoding -- last 0xFF byte of the previous
          // block was eaten by the encoder
          offset -= 3;
          break;
        }
        throw new Error("unknown JPEG marker " + fileMarker.toString(16));
    }
    fileMarker = readUint16();
  }

  return quantizationTables;
}

async function jpegAnalysis(imageData) {
  let blob = await fetch(imageData).then((res) => res.blob());
  let blobAB = await blob.arrayBuffer();
  let blobArray = new Uint8Array(blobAB);
  let output = { error: true, data: "Something error" };
  try {
    let tables = getQuantizationTables(blobArray);
    output = { error: false, data: tables };
  } catch (error) {
    output.data = error.message;
  }
  return output;
}

async function getImageDataFromURL(imageURL) {
  let output = { error: true, data: "Something error" };
  await fetch(imageURL)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    )
    .then((dataURL) => {
      // console.log(`dataURL`, dataURL);
      output = { error: false, data: dataURL };
    })
    .catch((error) => {
      // console.log(`getImageDataFromURL error`, error);
      output = { error: true, data: error };
    });
  return output;
}

export {
  isImage,
  isJPEG,
  getExifMetadata,
  getGeoTags,
  getThumbnail,
  jpegAnalysis,
  getImageDataFromURL,
};
