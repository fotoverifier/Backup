<template>
  <div class="flex-shrink-0 p-3 bg-white sub-sidebar" style="width: 280px">
    <a
      href="/tutorial"
      class="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
    >
      <span class="fs-5 fw-semibold">Tutorial & Challenge</span>
    </a>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <button
          ref="errorLevelAnalysis"
          class="btn btn-toggle align-items-center rounded collapsed error-level-analysis-btn"
          data-bs-toggle="collapse"
          data-bs-target="#error-level-analysis-collapse"
          aria-expanded="false"
        >
          Error Level Analysis
        </button>
        <div class="collapse pt-2" id="error-level-analysis-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/ela/brightness-contrast'"
              >
                Concept: Brightness & Contrast
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/ela/edge'"
              >
                Concept: Edge
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/ela/jpeg-compression'"
              >
                Concept: JPEG Compression
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/ela/how-to-use'"
              >
                How to use Error Level Analysis
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/ela/challenge/normal'"
              >
                Challenge 1: Normal ELA
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/ela/challenge/multiple-compression'"
              >
                Challenge 2: Multiple Compression
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button
          ref="jpegGhost"
          class="btn btn-toggle align-items-center rounded collapsed jpeg-ghost-btn"
          data-bs-toggle="collapse"
          data-bs-target="#jpeg-ghost-collapse"
          aria-expanded="false"
        >
          JPEG Ghost
        </button>
        <div class="collapse pt-2" id="jpeg-ghost-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/jpeg-ghost/how-to-use'"
              >
                How to use JPEG Ghost
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/jpeg-ghost/challenge/ela-to-jpeg-ghost'"
              >
                Challenge 1: From ELA to JPEG Ghost
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button
          ref="geometricBased"
          class="btn btn-toggle align-items-center rounded collapsed geometric-based-btn"
          data-bs-toggle="collapse"
          data-bs-target="#check-shadow-inconsistent-collapse"
          aria-expanded="false"
        >
          Geometric-based Forensics
        </button>
        <div class="collapse pt-2" id="check-shadow-inconsistent-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/geometric-based/shadow'"
              >
                Concept: Shadow
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/geometric-based/check-shadow-consistency'"
              >
                How to check Shadow Consistency
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/geometric-based/challenge/normal'"
              >
                Challenge 1: Normal check
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button
          ref="formatBased"
          class="btn btn-toggle align-items-center rounded collapsed format-based-btn"
          data-bs-toggle="collapse"
          data-bs-target="#format-based-collapse"
          aria-expanded="false"
        >
          Format-based Forensics
        </button>
        <div class="collapse pt-2" id="format-based-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/format-based/metadata'"
              >
                Concept: Metadata
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/format-based/gps'"
              >
                Concept: GPS Metadata
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/format-based/exif-metadata-geo-tags'"
              >
                How to use EXIF Metadata and Geo Tags
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/format-based/challenge/metadata-1'"
              >
                Challenge 1: Metadata
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/format-based/challenge/metadata-2'"
              >
                Challenge 2: Metadata Cannot Help This Problem
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/format-based/thumbnail-analysis'"
              >
                How to use Thumbnail Analysis
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button
          ref="histogram"
          class="btn btn-toggle align-items-center rounded collapsed histogram-btn"
          data-bs-toggle="collapse"
          data-bs-target="#histogram-collapse"
          aria-expanded="false"
        >
          Histogram Analysis
        </button>
        <div class="collapse pt-2" id="histogram-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/histogram/histogram'"
              >
                Concept: Histogram
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/histogram/double-jpeg'"
              >
                Concept: Double JPEG Compression
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/histogram/how-to-use'"
              >
                How to use Histogram Analysis
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/histogram/challenge/hist-1'"
              >
                Challenge 1: Histogram Test 1
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/histogram/challenge/hist-2'"
              >
                Challenge 2: Histogram Test 2
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button
          ref="noiseMedianInconsistencies"
          class="btn btn-toggle text-start flex-grow-1 align-items-center rounded collapsed noise-median-inconsistencies-btn"
          data-bs-toggle="collapse"
          data-bs-target="#noise-median-inconsistencies-collapse"
          aria-expanded="false"
        >
          Noise Median Inconsistencies
        </button>
        <div class="collapse pt-2" id="noise-median-inconsistencies-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/noise-median-inconsistencies/noise'"
              >
                Concept: Noise
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/noise-median-inconsistencies/median-filter'"
              >
                Concept: Median Filter
              </router-link>
            </li>
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/noise-median-inconsistencies/how-to-use'"
              >
                How to use Noise Median Inconsistencies
              </router-link>
            </li>
          </ul>
        </div>
      </li>
      <li class="mb-1">
        <button
          ref="reverseImageSearch"
          class="btn btn-toggle text-start flex-grow-1 align-items-center rounded collapsed reverse-image-search-btn"
          data-bs-toggle="collapse"
          data-bs-target="#reverse-image-search-collapse"
          aria-expanded="false"
        >
          Reverse Image Search
        </button>
        <div class="collapse pt-2" id="reverse-image-search-collapse">
          <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
            <li>
              <router-link
                class="router-link link-dark rounded"
                active-class="active"
                :to="'/tutorial/reverse-image-search/how-to-use'"
              >
                How to use Reverse Image Search
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    let errorLevelAnalysis = ref(null);
    let jpegGhost = ref(null);
    let geometricBased = ref(null);
    let formatBased = ref(null);
    let histogram = ref(null);
    let noiseMedianInconsistencies = ref(null);
    let reverseImageSearch = ref(null);

    let currentRoute = computed(() => {
      return useRouter().currentRoute.value.name;
    });

    onMounted(() => {
      if (currentRoute.value.startsWith("ela-")) {
        errorLevelAnalysis.value.click();
      } else if (currentRoute.value.startsWith("jpeg-ghost-")) {
        jpegGhost.value.click();
      } else if (currentRoute.value.startsWith("geometric-based-")) {
        geometricBased.value.click();
      } else if (currentRoute.value.startsWith("format-based-")) {
        formatBased.value.click();
      } else if (currentRoute.value.startsWith("histogram-")) {
        histogram.value.click();
      } else if (
        currentRoute.value.startsWith("noise-median-inconsistencies-")
      ) {
        noiseMedianInconsistencies.value.click();
      } else if (currentRoute.value.startsWith("reverse-image-search-")) {
        reverseImageSearch.value.click();
      }
    });

    return {
      errorLevelAnalysis,
      jpegGhost,
      geometricBased,
      formatBased,
      histogram,
      noiseMedianInconsistencies,
      reverseImageSearch,
      currentRoute,
    };
  },
};
</script>
