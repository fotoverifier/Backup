<template>
  <div class="container-fluid scrollarea">
    <div class="row my-container">
      <div class="col-sm-6">
        <div class="d-flex flex-row">
          <div class="pt-2">
            <h4>
              <b>
                <p class="content-title">Image Information</p>
              </b>
            </h4>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="d-flex flex-row-reverse">
          <div class="p-2">
            <a href="/tutorial-home" target="_blank" class="btn btn-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-question-lg"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"
                />
              </svg>
              Tutorial
            </a>
            &nbsp;
            <a
              href="/upload"
              target="_blank"
              class="btn btn-success btn-new-analyze"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
                <path
                  d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"
                />
              </svg>
              Analyze new image
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-container image-information-navbar">
      <div class="col-sm-12 p-2">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link
              class="router-link nav-link exif-metadata"
              active-class="active"
              :to="'/image-information/exif-metadata'"
            >
              EXIF Metadata
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="router-link nav-link geo-tags"
              active-class="active"
              :to="'/image-information/geo-tags'"
            >
              Geo Tags
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="router-link nav-link thumbnail-analysis"
              active-class="active"
              :to="'/image-information/thumbnail-analysis'"
            >
              Thumbnail Analysis
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="row my-container image-information-content">
      <div class="col-sm-6 p-2">
        <h5>
          <b>Result</b>
        </h5>
        <ExifMetadata
          v-if="currentRoute == 'exif-metadata'"
          :uploadedImage="uploadedImage"
        />
        <GeoTags
          v-if="currentRoute == 'geo-tags'"
          :uploadedImage="uploadedImage"
        />
        <ThumbnailAnalysis
          v-if="currentRoute == 'thumbnail-analysis'"
          :uploadedImage="uploadedImage"
        />
        <JPEGAnalysis
          v-if="currentRoute == 'jpeg-analysis'"
          :uploadedImage="uploadedImage"
        />
        <StringExtraction
          v-if="currentRoute == 'string-extraction'"
          :uploadedImage="uploadedImage"
        />
      </div>
      <div class="col-sm-6 p-2">
        <h5>
          <b>Your image</b>
        </h5>
        <center>
          <ImageView
            :imageData="uploadedImage"
            :canvasWidth="imageViewWidth"
            :canvasHeight="imageViewHeight"
          />
        </center>
      </div>
    </div>
    <span style="display: none">{{ currentRoute }}</span>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import ExifMetadata from "../components/ImageInformation/ExifMetadata.vue";
import GeoTags from "../components/ImageInformation/GeoTags.vue";
import ThumbnailAnalysis from "../components/ImageInformation/ThumbnailAnalysis.vue";
import JPEGAnalysis from "../components/ImageInformation/JPEGAnalysis.vue";
import StringExtraction from "../components/ImageInformation/StringExtraction.vue";
import ImageView from "../components/ImageView.vue";

export default {
  props: {
    uploadedImage: String,
  },
  setup() {
    let imageViewWidth = ref(window.innerWidth / 2);
    let imageViewHeight = ref(window.innerHeight / 2);

    const currentRoute = computed(() => {
      return useRouter().currentRoute.value.name;
    });

    return { currentRoute, imageViewWidth, imageViewHeight };
  },
  components: {
    ExifMetadata,
    GeoTags,
    ThumbnailAnalysis,
    JPEGAnalysis,
    StringExtraction,
    ImageView,
  },
};
</script>
