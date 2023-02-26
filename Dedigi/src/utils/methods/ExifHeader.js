/* eslint-disable func-names */
import loadImage from 'blueimp-load-image';

function asyncGetMetaData() {
  return new Promise((resolve) => {
    const img = document.getElementById('originalImage');
    if (img) {
      loadImage(
        img.src,
        function (_img, data) {
          const exifData = data.exif?.getAll()?.Exif;
          const thumbnailData = data.exif?.getAll()?.Thumbnail;
          const gpsInfo = data.exif?.getAll()?.GPSInfo;
          const itpcData = data.iptc?.getAll();
          const tiffData = { ...data.exif?.getAll() };
          delete tiffData?.Exif;
          delete tiffData?.Thumbnail;
          delete tiffData?.GPSInfo;

          resolve({
            exifData,
            thumbnailData,
            gpsInfo,
            tiffData,
            itpcData,
          });
        },
        { meta: true }
      );
    }
  });
}

export default async function ExifHeader() {
  const res = await asyncGetMetaData();
  return { ...res };
}
