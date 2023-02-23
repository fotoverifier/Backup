<template>
  <div class="mobile-content">
    This website does not support for smartphones and tablets. Please access
    this website on desktop or laptop device.
  </div>
  <div class="desktop-content">
    <component :is="layout" v-slot="slotProps">
      <router-view :uploadedImage="slotProps.uploadedImage" />
    </component>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/css/global.css";
import "intro.js/introjs.css";

import { useRoute } from "vue-router";
import { computed } from "vue";
import { PUBLIC_LAYOUT } from "./constants/index.js";

export default {
  setup() {
    const route = useRoute();
    return {
      layout: computed(() => route.meta.layout || PUBLIC_LAYOUT),
    };
  },
};
</script>
