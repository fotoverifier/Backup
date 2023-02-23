<template>
  <div class="forensics-container">
    <SidebarLeft />
    <slot :uploadedImage="uploadedImage" />
  </div>
</template>

<script>
import SidebarLeft from "@/components/SidebarLeft.vue";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount, ref } from "vue";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();

    let uploadedImage = ref("");

    onBeforeMount(() => {
      if ("uploadedImage" in route.params) {
        uploadedImage.value = route.params.uploadedImage;
      } else {
        router.push({ name: "upload" });
      }
    });

    return { uploadedImage };
  },

  components: {
    SidebarLeft,
  },
};
</script>

<style lang="css" scoped>
.router-link {
  text-decoration: none !important;
}
</style>
