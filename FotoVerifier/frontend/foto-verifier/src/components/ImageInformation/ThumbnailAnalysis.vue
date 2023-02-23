<template>
  <div class="container" v-if="!isFinished">
    <div class="row">
      <div class="col-sm-12">
        <center>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </center>
      </div>
    </div>
  </div>
  <div class="container" v-if="isFinished">
    <div class="alert alert-secondary" role="alert" v-if="noThumbnail">
      This image has no Thumbnail
    </div>
    <div class="metadata" v-if="!noThumbnail">
      <center>
        <img v-bind:src="thumbnailURL" class="thumbnail" />
      </center>
    </div>
  </div>
</template>

<script>
import { getThumbnail } from "../../utils/image.js";
import { ref, onMounted } from "vue";

export default {
  props: {
    uploadedImage: String,
  },
  setup(props) {
    let isFinished = ref(false);
    let noThumbnail = ref(false);
    let thumbnailURL = ref("");

    onMounted(async () => {
      let imageData = props.uploadedImage;
      let url = await getThumbnail(imageData);
      isFinished.value = true;

      if (url == null) {
        noThumbnail.value = true;
      } else {
        thumbnailURL.value = url;
      }
    });
    return { isFinished, noThumbnail, thumbnailURL };
  },
};
</script>
