const startAnalysis = () => {
  const imageID = localStorage.getItem('imageID');
  if (!imageID) {
    alertMessage("Unknown error have occured, please try again", 'danger');
    return;
  }
  getMetadata(imageID);
  getResolution(imageID);
  getFacebookSource(imageID);
  getFlickrSource(imageID);
  getTwitterSource(imageID);
  getRedditSource(imageID);
}

const addBadgeElement = (elementID) => {
  document.getElementById(elementID).classList.add("bg-success");
  document.getElementById(elementID).classList.remove("bg-secondary");
}

const removeBadgeElement = (elementID) => {
  document.getElementById(elementID).classList.remove("bg-success");
  document.getElementById(elementID).classList.add("bg-secondary");
}

const rewriteElement = (elementID, content) => {
  const element = document.getElementById(elementID);
  if (typeof content === 'string') {
    element.innerHTML = content;
  }
  else if (content instanceof HTMLElement) {
    element.replaceChildren(content);
  }
}

const setSpinner = (parentID) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = [
    '<div class="spinner-border text-secondary" role="status">',
    '  <span class="visually-hidden">Loading...</span>',
    '</div>'
  ].join('');

  rewriteElement(parentID, wrapper);
}

const fetchAnalysisResult = async (imageID, type, containerID, callback) => {
  setSpinner(containerID);
  const res = await fetch(`/api/v1/analyze?${new URLSearchParams({
    id: imageID,
    type: type
  })}`).then(res => res.json());

  if (!res.success) {
    rewriteElement(containerID, "Wait for image to be uploaded");
    alertMessage(res.data.error, 'danger');
    return;
  }

  callback(res.data);
}

const getMetadataResultElement = (metadata, title, id, renderType = 'parsed') => {
  const container = document.createElement('div');
  container.setAttribute('class', "accordion-item");

  const header = document.createElement('h4');
  header.setAttribute('class', "accordion-header");
  header.innerHTML = [
    `<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="false" aria-controls="${id}">`,
    title,
    '</button>'
  ].join('');

  const content = document.createElement('div');
  content.setAttribute('class', "accordion-collapse collapse");
  content.setAttribute('id', id);
  content.setAttribute('data-bs-parent', "metadata-accordion");

  const contentBody = document.createElement('div');
  contentBody.setAttribute('class', "accordion-body");
  contentBody.setAttribute('style', "max-height: 500px; overflow-y: scroll");

  if (renderType === 'parsed') {
    const ulElement = document.createElement('ul');
  
    if (metadata && Object.keys(metadata).length > 0) {
      Object.keys(metadata).forEach(key => {
        let liElement = document.createElement('li');
        liElement.append(key);
        if (metadataExplanation[key]) {
          liElement.append(' [');
          liElement.append(createTooltipElement("?", metadataExplanation[key]));
          liElement.append(']');
        }
        liElement.append(`: ${metadata[key]}`);
    
        ulElement.append(liElement);
      });
    }
    else {
      ulElement.append('Not found')
    }
    
    contentBody.append(ulElement);
  }
  else if (renderType === 'raw') {
    const preElement = document.createElement('pre');
    preElement.append(metadata);
    contentBody.append(preElement);
  }

  content.append(contentBody);
  container.append(header);
  container.append(content);

  return container;
}

const getExifResultElement = (exifData) => {
  const version = exifData.ExifVersion || "unknown";
  delete exifData.ExifVersion;
  
  return getMetadataResultElement(exifData, `Exif - Version: ${version}`, "exif-accordion-item");
}

const getIPTCResultElement = (iptcData) => {
  return getMetadataResultElement(iptcData, `IPTC`, "IPTC-accordion-item");
}

const getXMPResultElement = (xmpData) => {
  const version = xmpData.version || "unknown";

  return getMetadataResultElement(xmpData.xml || "Not found", `XMP - Version: ${version}`, "XMP-accordion-item", 'raw');
}

const getMetadata = async (imageID) => {
  const handleResult = (data) => {
    exif = getExifResultElement(data.exif);
    iptc = getIPTCResultElement(data.iptc);
    xml = getXMPResultElement(data.xmp);

    const content = document.createElement('div');
    content.setAttribute('class', "accordion");
    content.setAttribute('id', "metadata-accordion");
    content.append(exif);
    content.append(iptc);
    content.append(xml);

    rewriteElement('metadata-result', content);
  }

  fetchAnalysisResult(imageID, 'metadata', 'metadata-result', handleResult);
}

const getResolution = async (imageID) => {
  const handleResult = (data) => {
    const content = document.createElement('div');

    const resolution = document.createElement('p');
    resolution.innerHTML = `Image size: (${data.width} x ${data.height})`;
    content.append(resolution);

    if (data.source_speculation) {
      const speculation = document.createElement('p');
      speculation.setAttribute('class', 'lead');
      speculation.innerHTML = data.source_speculation;
      content.append(speculation);
    }

    rewriteElement('resolution-result', content);
  }

  fetchAnalysisResult(imageID, 'resolution', 'resolution-result', handleResult);
}

const renderTooltip = () => {
  // Render tooltips on demand
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

const createTooltipElement = (shown, content) => {
  const element = document.createElement('a');
  element.setAttribute('href', '#');
  element.setAttribute('data-bs-title', content);
  element.setAttribute('data-bs-toggle', 'tooltip');
  element.append(shown);
  new bootstrap.Tooltip(element);

  return element;
}

const createTextElement = (tag, ...texts) => {
  element = document.createElement(tag);
  texts.forEach(text => {
    if (text instanceof Node) {
      element.appendChild(text);
    }
    else {
      element.appendChild(document.createTextNode(text));
    }
  });

  return element;
}

const createAnchorElement = (url) => {
  element = document.createElement('a');
  element.href = url;
  element.appendChild(document.createTextNode(url));

  return element;
}

const handleFacebookResult = (data) => {
  // Facebook
  const contentFacebook = document.createElement('div');

  if (data.url === "Not found") {
    contentFacebook.append(createTextElement('p', 'Image source from Facebook: Not found'));
  }
  else {
    contentFacebook.append(createTextElement('p', 'Image source from Facebook: ', createAnchorElement(data.url)));
    if (data.posted_at) {
      contentFacebook.append(createTextElement('p', `This image was posted to Facebook at ${data.posted_at}`));
    }
    addBadgeElement('facebook-result-title');
  }

  rewriteElement('facebook-result', contentFacebook);
}

const getFacebookSource = async (imageID) => {
  fetchAnalysisResult(imageID, 'facebook_filename', 'facebook-result', handleFacebookResult);
}


const handleFlickrResult = (data) => {
  // Flickr
  const animationList = [];
  const contentFlickr = document.createElement('div');

  if (data.url != 'Not found') {
    contentFlickr.append(createTextElement('p', 'Image source from Flickr: ', createAnchorElement(data.url)));
    if (data.posted_date) {
      const tmp = createTextElement('p', 'This image was posted to Flickr at ');
      tmp.append(createTextElement('b', data.posted_date));
      contentFlickr.append(tmp);
    }
    if (data.taken_date) {
      const tmp = createTextElement('p', 'This image was taken at ');
      tmp.append(createTextElement('b', data.taken_date));
      contentFlickr.append(tmp);
    }
    if (data.time_analysis) {
      const timeAnalysis = data.time_analysis;
      const timeContent = document.createElement('div');
      const title = createTextElement('p', 'Uploaded time speculation based on ID [');
      title.append(createTooltipElement('?', 'Because Flickr IDs tends to increase with time, uploaded time of adjacent IDs can suggest the actual uploaded time as this piece of data is modifiable by authors'));
      title.append(']');

      timeContent.append(title);

      const timeContentList = document.createElement('div');
      timeContentList.classList.add('flickr-time-list');

      console.log(timeAnalysis);
      const total = Object.keys(timeAnalysis).reduce((cur, key) => cur + parseInt(timeAnalysis[key]), 0);
      Object.keys(timeAnalysis).forEach((time) => {
        const count = timeAnalysis[time];
        timeContentList.append(createTextElement('b', time));

        const bar = document.createElement('div');
        bar.classList.add('flickr-time-bar');
        bar.classList.add('bg-success');
        const id = `flickr-time-bar-${time}`;
        bar.id = id;

        const barContainer = document.createElement('div');
        barContainer.classList.add('flickr-time-bar-container');
        barContainer.append(bar);

        timeContentList.append(barContainer);

        animationList.push({ id, style: { width: `${count / total * 100}%` } })
      })

      timeContent.append(timeContentList);
      contentFlickr.append(timeContent);
    }

    addBadgeElement('flickr-result-title');
  }
  else {
    contentFlickr.append(createTextElement('p', 'Image source from Flickr: Not found'));
  }

  rewriteElement('flickr-result', contentFlickr);

  animationList.forEach((animation) => {
    Object.keys(animation.style).forEach((attr) => {
      setTimeout(() => {
        document.getElementById(animation.id).style[attr] = animation.style[attr];
      }, 500); // Wait for elements to be rendered
    })
  })

}

const getFlickrSource = async (imageID) => {
  fetchAnalysisResult(imageID, 'flickr_filename', 'flickr-result', handleFlickrResult);
}

const handleRedditResult = (data) => {
  // Reddit
  const contentReddit = document.createElement('div');
  if (data.numOfResults) {
    if (data.numOfResults === 1) {
      contentReddit.append(createTextElement('p', 'Image source from Reddit: ', createAnchorElement(data.results[0].url)));
      contentReddit.append(createTextElement('p', `This image was posted to Reddit at ${data.results[0].postedDate} (UTC)`));
    }
    else {
      contentReddit.append(createTextElement('i', 'This image was uploaded on Reddit in many posts'));
      contentReddit.append(createTextElement('p', ''))
      data.results.forEach((result, i) => {
        let subContent = document.createElement('div');
        subContent.append(createTextElement('b', `Source #${parseInt(i) + 1}: `))
        subContent.append(createAnchorElement(result.url));
        subContent.append(createTextElement('p', `This image was posted to Reddit at ${result.postedDate} (UTC)`))

        contentReddit.append(subContent);
      });
    }
    addBadgeElement('reddit-result-title');
  }
  else {
    contentReddit.append(createTextElement('p', 'Image source from Reddit: Not found'));
  }

  rewriteElement('reddit-result', contentReddit);
}

const getRedditSource = async (imageID) => {
  fetchAnalysisResult(imageID, 'reddit_filename', 'reddit-result', handleRedditResult);
}

const handleTwitterResult = (data) => {
  // Twitter
  const contentTwitter = document.createElement('div');
  if (data.url === "Not found") {
    contentTwitter.append(createTextElement('p', "Image doesn't seem to exist on Twitter"))
  }
  else {
    contentTwitter.append(createTextElement('p', "Image was uploaded to Twitter at ", createAnchorElement(data.url)));
    contentTwitter.append(createTextElement('p', `Upload time: ${data.uploaded_date}`));

    addBadgeElement('twitter-result-title');
  }

  rewriteElement('twitter-result', contentTwitter);

}

const getTwitterSource = async (imageID) => {
  fetchAnalysisResult(imageID, 'twitter_filename', 'twitter-result', handleTwitterResult);
}

const metadataExplanation = {};
