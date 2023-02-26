import axios from 'axios';
import Jimp from 'jimp';
import imghist from './imagehistograms';

async function createHistograms(src) {
  let histred = null;
  let histgreen = null;
  let histblue = null;
  return axios({
    method: 'get',
    url: src,
    responseType: 'arraybuffer',
  }).then(({ data: imageBuffer }) => {
    (async () => {
      await Jimp.read(imageBuffer, (err, photo) => {
        if (!err) histred = imghist.histogramRGB(imghist.colorChannels.Red, photo);
        histgreen = imghist.histogramRGB(imghist.colorChannels.Green, photo);
        histblue = imghist.histogramRGB(imghist.colorChannels.Blue, photo);
        document.getElementById('red-histo').innerHTML = histred;
        document.getElementById('green-histo').innerHTML = histgreen;
        document.getElementById('blue-histo').innerHTML = histblue;
      });
    })();
  });
}

export default createHistograms;
