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
    <div class="alert alert-secondary" role="alert" v-if="noGeoTags">
      This image has no Geo Tags
    </div>
    <div class="metadata">
      <div class="row" v-for="(data, index) in geoTagsArray" :key="index">
        <div class="col-sm-6">
          <b>{{ data.key }}</b>
        </div>
        <div class="col-sm-6">
          {{ data.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGeoTags } from "../../utils/image.js";
import { ref, reactive, onMounted } from "vue";

export default {
  props: {
    uploadedImage: String,
  },
  setup(props) {
    let isFinished = ref(false);
    let noGeoTags = ref(false);
    let geoTagsArray = reactive([]);

    onMounted(async () => {
      let imageData = props.uploadedImage;
      let metadata = await getGeoTags(imageData);
      isFinished.value = true;

      if (metadata == null) {
        noGeoTags.value = true;
      } else {
        for (let key in metadata) {
          geoTagsArray.push({ key: key, value: metadata[key] });
        }
      }
    });
    return { isFinished, noGeoTags, geoTagsArray };
  },
};
</script>
