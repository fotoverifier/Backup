<template>
  <div class="tutorial">
    <SidebarLeft />
    <div class="container-fluid scrollarea">
      <div class="row content">
        <div class="col-sm-6">
          <div class="d-flex flex-row">
            <div class="pt-2">
              <h4>
                <b>
                  <p class="content-title">{{ title }}</p>
                </b>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="d-flex flex-row-reverse">
            <div class="p-2">
              <a
                href="/"
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
      <div class="row content">
        <div class="col-sm-12 p-2">
          <BrightnessContrast
            v-if="currentRoute == 'ela-brightness-contrast'"
            @setTitle="setTitle"
          />
          <EdgeComp v-if="currentRoute == 'ela-edge'" @setTitle="setTitle" />
          <JPEGCompression
            v-if="currentRoute == 'ela-jpeg-compression'"
            @setTitle="setTitle"
          />
          <ErrorLevelAnalysis
            v-if="currentRoute == 'ela-how-to-use'"
            @setTitle="setTitle"
          />
          <NormalELA
            v-if="currentRoute == 'ela-challenge-normal'"
            @setTitle="setTitle"
          />
          <MultipleCompression
            v-if="currentRoute == 'ela-challenge-multiple-compression'"
            @setTitle="setTitle"
          />

          <JPEGGhost
            v-if="currentRoute == 'jpeg-ghost-how-to-use'"
            @setTitle="setTitle"
          />
          <ELAtoJPEGGhost
            v-if="currentRoute == 'jpeg-ghost-challenge-ela-to-jpeg-ghost'"
            @setTitle="setTitle"
          />

          <ShadowComp
            v-if="currentRoute == 'shadow-consistency-shadow'"
            @setTitle="setTitle"
          />
          <CheckShadowConsistency
            v-if="currentRoute == 'shadow-consistency-check-shadow-consistency'"
            @setTitle="setTitle"
          />
          <ChallengeNormal
            v-if="currentRoute == 'shadow-consistency-challenge-normal'"
            @setTitle="setTitle"
          />

          <MetadataComp
            v-if="currentRoute == 'format-based-metadata'"
            @setTitle="setTitle"
          />
          <GPSMetadata
            v-if="currentRoute == 'format-based-gps'"
            @setTitle="setTitle"
          />
          <ExifMetadataGeoTags
            v-if="currentRoute == 'format-based-exif-metadata-geo-tags'"
            @setTitle="setTitle"
          />
          <ChallengeMetadata1
            v-if="currentRoute == 'format-based-challenge-metadata-1'"
            @setTitle="setTitle"
          />
          <ChallengeMetadata2
            v-if="currentRoute == 'format-based-challenge-metadata-2'"
            @setTitle="setTitle"
          />
          <ThumbnailAnalysis
            v-if="currentRoute == 'format-based-thumbnail-analysis'"
            @setTitle="setTitle"
          />

          <HistogramComp
            v-if="currentRoute == 'histogram-histogram'"
            @setTitle="setTitle"
          />
          <DoubleJPEGCompression
            v-if="currentRoute == 'histogram-double-jpeg'"
            @setTitle="setTitle"
          />
          <HistogramAnalysis
            v-if="currentRoute == 'histogram-how-to-use'"
            @setTitle="setTitle"
          />
          <ChallengeHist1
            v-if="currentRoute == 'histogram-challenge-hist-1'"
            @setTitle="setTitle"
          />
          <ChallengeHist2
            v-if="currentRoute == 'histogram-challenge-hist-2'"
            @setTitle="setTitle"
          />

          <NoiseConcept
            v-if="currentRoute == 'noise-median-inconsistencies-noise'"
            @setTitle="setTitle"
          />
          <MedianFilter
            v-if="currentRoute == 'noise-median-inconsistencies-median-filter'"
            @setTitle="setTitle"
          />
          <HowToUseNMI
            v-if="currentRoute == 'noise-median-inconsistencies-how-to-use'"
            @setTitle="setTitle"
          />

          <HowToUseRIS
            v-if="currentRoute == 'reverse-image-search-how-to-use'"
            @setTitle="setTitle"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import SidebarLeft from "@/components/Tutorial/SidebarLeft.vue";
// ELA
import BrightnessContrast from "../components/Tutorial/ErrorLevelAnalysis/BrightnessContrast/BrightnessContrast.vue";
import EdgeComp from "../components/Tutorial/ErrorLevelAnalysis/Edge.vue/EdgeComp.vue";
import JPEGCompression from "../components/Tutorial/ErrorLevelAnalysis/JPEGCompression/JPEGCompression.vue";
import ErrorLevelAnalysis from "../components/Tutorial/ErrorLevelAnalysis/ErrorLevelAnalysis.vue";
import NormalELA from "../components/Tutorial/ErrorLevelAnalysis/Challenge/NormalELA.vue";
import MultipleCompression from "../components/Tutorial/ErrorLevelAnalysis/Challenge/MultipleCompression.vue";
// JPEG Ghost
import JPEGGhost from "../components/Tutorial/JPEGGhost/JPEGGhost.vue";
import ELAtoJPEGGhost from "../components/Tutorial/JPEGGhost/Challenge/ELAtoJPEGGhost.vue";
// shadow-consistency Forensics
import ShadowComp from "../components/Tutorial/GeometricBased/ShadowComp.vue";
import CheckShadowConsistency from "../components/Tutorial/GeometricBased/CheckShadowConsistency.vue";
import ChallengeNormal from "../components/Tutorial/GeometricBased/Challenge/ChallengeNormal.vue";
// Format-based Forensics
import MetadataComp from "../components/Tutorial/FormatBased/MetadataComp.vue";
import GPSMetadata from "../components/Tutorial/FormatBased/GPSMetadata.vue";
import ExifMetadataGeoTags from "../components/Tutorial/FormatBased/ExifMetadataGeoTags.vue";
import ChallengeMetadata1 from "../components/Tutorial/FormatBased/Challenge/ChallengeMetadata1.vue";
import ChallengeMetadata2 from "../components/Tutorial/FormatBased/Challenge/ChallengeMetadata2.vue";
import ThumbnailAnalysis from "../components/Tutorial/FormatBased/ThumbnailAnalysis.vue";
// Histogram Analysis
import HistogramComp from "../components/Tutorial/Histogram/HistogramComp.vue";
import DoubleJPEGCompression from "../components/Tutorial/Histogram/DoubleJPEGCompression.vue";
import HistogramAnalysis from "../components/Tutorial/Histogram/HistogramAnalysis.vue";
import ChallengeHist1 from "../components/Tutorial/Histogram/Challenge/ChallengeHist1.vue";
import ChallengeHist2 from "../components/Tutorial/Histogram/Challenge/ChallengeHist2.vue";
// Noise Median Inconsistencies
import NoiseConcept from "@/components/Tutorial/NoiseMedianInconsistencies/NoiseConcept.vue";
import MedianFilter from "@/components/Tutorial/NoiseMedianInconsistencies/MedianFilter/MedianFilter.vue";
import HowToUseNMI from "@/components/Tutorial/NoiseMedianInconsistencies/HowToUseNMI.vue";
// Reverse Image Search
import HowToUseRIS from "@/components/Tutorial/ReverseImageSearch/HowToUseRIS.vue";

export default {
  setup() {
    let title = ref("");

    const currentRoute = computed(() => {
      return useRouter().currentRoute.value.name;
    });

    let setTitle = (data) => {
      title.value = data.title;
    };

    return { currentRoute, setTitle, title };
  },
  components: {
    SidebarLeft,
    // ELA
    BrightnessContrast,
    EdgeComp,
    JPEGCompression,
    ErrorLevelAnalysis,
    NormalELA,
    MultipleCompression,
    // JPEG Ghost
    JPEGGhost,
    ELAtoJPEGGhost,
    // shadow-consistency Forensics
    ShadowComp,
    CheckShadowConsistency,
    ChallengeNormal,
    // Image Information
    MetadataComp,
    GPSMetadata,
    ExifMetadataGeoTags,
    ChallengeMetadata1,
    ChallengeMetadata2,
    ThumbnailAnalysis,
    // Histogram Analysis
    HistogramComp,
    DoubleJPEGCompression,
    HistogramAnalysis,
    ChallengeHist1,
    ChallengeHist2,
    // Noise Median Inconsistencies
    NoiseConcept,
    MedianFilter,
    HowToUseNMI,
    // Reverse Image Search
    HowToUseRIS,
  },
};
</script>

<style scoped>
.tutorial {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
}

.content {
  background-color: white;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 7px;
}
</style>
