<template>
  <h4><b>Overview</b></h4>

  <p class="text">
    When someone submit an image that is existed on the Internet to another
    online service, the image may be modified, such as scaling, cropping, color
    adjustment, which impact the overall quality of the image, and this can
    cause to a low-quality image. However, saving and editing multiple times may
    make it difficult to realize if a person manipulated the image.
  </p>

  <p class="text">
    Hence, when you have a low-quality image or out-of-content image, using
    online image search services can help you to find variations of the image.
    The search results can include higher quality version of the image,
    distribution patterns and circumstances that can provide context to the
    image.
  </p>

  <h4><b>Some Reverse Image Search Tool</b></h4>

  <p class="text">
    Reverse image search engines use algorithms to identify similar pictures. We
    would like to introduce you three popular search engines: Google Image
    Search, Microsoft Bing Image Search, and TinEye.
  </p>

  <p class="text">
    According to FotoForensics, these engines include pros and cons below:
  </p>

  <ul>
    <li>
      Google Image Search: This search engine has indexed most of the pictures
      found by Google, including late-breaking pictures that are only a few
      hours old. It is exceptional at identifying textual content related to
      pictures. However, Google Image Search is not strong at identifying
      significant variations from cropping, splicing, or editing.
    </li>
    <li>
      Microsoft Bing Image Search: Microsoft's Bing includes a search engine
      that matches based on similar shapes. However, it does not have a large
      corpus of indexed images and it usually does not find variations of the
      same picture. If the picture has a large rectangular region in the middle,
      then it will usually find other pictures with large rectangular regions in
      the middle. This is useful for finding visually similar images without
      finding variations of the exact same picture.
    </li>
    <li>
      TinEye: This search engine is exceptional at finding partial matches.
      Although it may not know immediately about new pictures, it will usually
      identify widely circulated pictures, as well as images from news outlets.
    </li>
  </ul>

  <p class="text">
    Based on your purpose, you can use one or more of these search engines to
    find desired image. Unfortunately, we do not guarantee your privacy when you
    use these engines, as your image will be processed at the server to get the
    results.
  </p>

  <h4><b>Where is Reverse Image Search tool in our site?</b></h4>

  <p class="text">
    To access Reverse Image Search, after uploading an image, click on "Advanced
    Analysis" icon in the sidebar on the left, then you will see "Reverse Image
    Search" section.
  </p>

  <p class="text">
    We list the home page of three engines for you for easier access. Once
    again, we warn you that your privacy is not guaranteed when you upload your
    image to these search engines.
  </p>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "How to use Reverse Image Search?",
    });
  },
};
</script>
