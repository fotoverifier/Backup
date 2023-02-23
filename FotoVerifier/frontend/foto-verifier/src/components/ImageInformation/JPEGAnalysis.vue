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
    <div class="alert alert-danger" role="alert" v-if="error.length > 0">
      {{ error }}
    </div>
    <div class="result">
      <div
        class="row"
        v-for="(data, index) in quantizationTables.data"
        :key="index"
      >
        <div class="col-sm-12">
          <h6>Quantization Table {{ index }}</h6>
          <table class="jpeg-layer-quantization-table">
            <tr v-for="i in 8" :key="i">
              <td
                v-for="j in 8"
                :key="j"
                v-bind:style="{
                  background:
                    'hsl(' +
                    ((160 + data[(i - 1) * 8 + j - 1] * 3) % 256) +
                    ', 37%, 52%)',
                }"
              >
                {{ data[(i - 1) * 8 + j - 1] }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { isJPEG, jpegAnalysis } from "../../utils/image.js";

export default {
  props: {
    uploadedImage: String,
  },
  setup(props) {
    let isFinished = ref(false);
    let error = ref("");
    let quantizationTables = reactive({ data: [] });

    onMounted(async () => {
      isFinished.value = false;

      let imageData = props.uploadedImage;
      if (!isJPEG(imageData)) {
        error.value = "This is not a JPEG image";
      } else {
        let analysisOutput = await jpegAnalysis(imageData);
        if (analysisOutput.error) {
          error.value = analysisOutput.data;
        } else {
          quantizationTables.data = analysisOutput.data;
        }
      }

      isFinished.value = true;
    });
    return { isFinished, error, quantizationTables };
  },
};
</script>

<style scoped>
.jpeg-layer-quantization-table td {
  width: 48px;
  height: 48px;
  padding: 8px;
  border: 2px solid #fff;
  color: #fff;
  text-align: center;
  vertical-align: middle;
}
</style>
