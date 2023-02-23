<template>
  <h4><b>Overview</b></h4>

  <p class="text">
    EXIF Metadata and Geo Tags are the tools that help user consider information
    from EXIF Metadata and GPS Metadata in images.
  </p>

  <h4><b>Where is EXIF Metadata tool on our site?</b></h4>

  <p class="text">
    To access EXIF Metadata tool, by default, after uploading an image, you will
    see EXIF Metadata result for the image.
  </p>

  <p class="text">
    If you are not at the EXIF Metadata tool, click on "Format-based Analysis",
    then click on "EXIF Metadata" tab.
  </p>

  <h4><b>Where is Geo Tags tool on our site?</b></h4>

  <p class="text">
    To access Geo Tags tool, after uploading an image, you will be at
    Format-based Analysis section. Click on "Geo Tags" to see the result.
  </p>

  <p class="text">
    If you are not at the Geo Tags tool, click on "Format-based Analysis", then
    click on "Geo Tags" tab.
  </p>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "How to use EXIF Metadata and Geo Tags?",
    });
  },
};
</script>
