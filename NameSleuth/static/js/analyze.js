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
  getRedditSource(imageID);
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

const getFacebookSource = async (imageID) => {
  const handleResult = (data) => {
    const content = document.createElement('div');

    content.append(createTextElement('p', 'Image source from Facebook: ', data.url == 'Not found' ? data.url : createAnchorElement(data.url)));
    if (data.posted_at) {
      content.append(createTextElement('p', `This image was posted to Facebook at ${data.posted_at}`));
    }

    rewriteElement('facebook-result', content);
  }

  fetchAnalysisResult(imageID, 'facebook_filename', 'facebook-result', handleResult);
}

const getFlickrSource = async (imageID) => {
  const handleResult = (data) => {
    const content = document.createElement('div');
    content.append(createTextElement('p', 'Image source from Flickr: ', data.url == 'Not found' ? data.url : createAnchorElement(data.url)));
    if (data.posted_date) {
      content.append(createTextElement('p', `This image was posted to Flickr at ${data.posted_date}`));
    }
    if (data.posted_date) {
      content.append(createTextElement('p', `This image was taken at ${data.taken_date}`));
    }

    rewriteElement('flickr-result', content);
  }

  fetchAnalysisResult(imageID, 'flickr_filename', 'flickr-result', handleResult);
}

const getRedditSource = async (imageID) => {
  const handleResult = (data) => {
    const content = document.createElement('div');
    if (data.numOfResults) {
      if (data.numOfResults === 1) {
        content.append(createTextElement('p', 'Image source from Reddit: ', createAnchorElement(data.url[0])));
        content.append(createTextElement('p', `This image was posted to Reddit at ${data.postedDate[0]} (UTC)`));
      }
      else {
        content.append(createTextElement('i', 'This image was uploaded on Reddit in many posts'));
        content.append(createTextElement('p', ''))
        data.results.forEach((result, i) => {
          let subContent = document.createElement('div');
          subContent.append(createTextElement('b', `Source #${parseInt(i) + 1}: `))
          subContent.append(createAnchorElement(result.url));
          subContent.append(createTextElement('p', `This image was posted to Reddit at ${result.postedDate} (UTC)`))

          content.append(subContent);
        });
      }
    }
    else {
      content.append(createTextElement('p', 'Image source from Reddit: Not found'));
    }

    rewriteElement('reddit-result', content);
  }

  fetchAnalysisResult(imageID, 'reddit_filename', 'reddit-result', handleResult);
}

const metadataExplanation = {};
