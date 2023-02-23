<template>
  <SubSidebar
    ref="subSidebar"
    @changeTool="changeTool"
    @changeColor="changeColor"
    @changeHorizontalState="changeHorizontalState"
    @changeVerticalState="changeVerticalState"
    @checkShadowConsistency="checkShadowConsistency"
    @resetImage="resetImage"
    @toggleDisplayCastShadowConstraint="toggleDisplayCastShadowConstraint"
    @toggleDisplayAttachedShadowConstraint="
      toggleDisplayAttachedShadowConstraint
    "
  />
  <div class="container-fluid scrollarea">
    <div class="row my-container">
      <div class="col-sm-6">
        <div class="d-flex flex-row">
          <div class="pt-2">
            <h4>
              <b>
                <p class="content-title">Check shadow consistency</p>
              </b>
            </h4>
          </div>
        </div>
      </div>
      <div class="col-sm-6">
        <div class="d-flex flex-row-reverse">
          <div class="p-2">
            <a
              href="/shadow-consistency-tutorial"
              target="_blank"
              class="btn btn-primary"
            >
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
                ></path>
              </svg>
              Tutorial
            </a>
            &nbsp;
            <a href="/" target="_blank" class="btn btn-success btn-new-analyze">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-file-earmark-image"
                viewBox="0 0 16 16"
              >
                <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
                <path
                  d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM4 1a1 1 0 0 0-1 1v10l2.224-2.224a.5.5 0 0 1 .61-.075L8 11l2.157-3.02a.5.5 0 0 1 .76-.063L13 10V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4z"
                ></path>
              </svg>
              Analyze new image
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-container">
      <div class="col-sm-12 p-2">
        <h5><b>Result</b></h5>
        <center>
          <WorkingImage
            ref="workingImage"
            @resetTool="resetTool"
            @updateCastShadowConstraints="updateCastShadowConstraints"
            @updateAttachedShadowConstraints="updateAttachedShadowConstraints"
            :imageData="uploadedImage"
            :canvasWidth="imageViewWidth"
            :canvasHeight="imageViewHeight"
            :tool="tool"
            :color="color"
            :horizontalState="horizontalState"
            :verticalState="verticalState"
          />
        </center>
      </div>
    </div>
  </div>
</template>

<script>
import SubSidebar from "@/components/ShadowConsistency/SubSidebar.vue";
import WorkingImage from "../components/ShadowConsistency/WorkingImage.vue";
import { ref } from "vue";

export default {
  props: {
    uploadedImage: String,
  },
  setup() {
    let subSidebar = ref(null);
    let workingImage = ref(null);
    let imageViewWidth = ref(window.innerWidth / 2);
    let imageViewHeight = ref(window.innerHeight / 2);
    let tool = ref("none");
    let color = ref("#ffffff");
    let horizontalState = ref(false);
    let verticalState = ref(false);

    let changeTool = function (newTool) {
      tool.value = newTool;
    };

    let changeColor = function (newColor) {
      color.value = newColor;
    };

    let changeHorizontalState = function (newHortizontalState) {
      horizontalState.value = newHortizontalState;
    };

    let changeVerticalState = function (newVerticalState) {
      verticalState.value = newVerticalState;
    };

    let checkShadowConsistency = async function () {
      console.log("checkShadowConsistency");
      let isConsistent = await workingImage.value.checkShadowConsistency();
      subSidebar.value.updateConsistencyResult(isConsistent);
    };

    let resetImage = function () {
      workingImage.value.resetImage();
      console.log("resetImage");
    };

    let resetTool = function () {
      subSidebar.value.resetTool();
    };

    let updateCastShadowConstraints = function (castShadowConstraints) {
      subSidebar.value.updateCastShadowConstraints(castShadowConstraints);
    };

    let updateAttachedShadowConstraints = function (attachedShadowConstraints) {
      subSidebar.value.updateAttachedShadowConstraints(
        attachedShadowConstraints
      );
    };

    let toggleDisplayCastShadowConstraint = function (id) {
      workingImage.value.toggleDisplayCastShadowConstraint(id);
    };

    let toggleDisplayAttachedShadowConstraint = function (id) {
      workingImage.value.toggleDisplayAttachedShadowConstraint(id);
    };

    return {
      subSidebar,
      workingImage,
      imageViewWidth,
      imageViewHeight,
      tool,
      color,
      horizontalState,
      verticalState,
      changeTool,
      changeColor,
      changeHorizontalState,
      changeVerticalState,
      checkShadowConsistency,
      resetImage,
      resetTool,
      updateCastShadowConstraints,
      updateAttachedShadowConstraints,
      toggleDisplayCastShadowConstraint,
      toggleDisplayAttachedShadowConstraint,
    };
  },

  components: {
    SubSidebar,
    WorkingImage,
  },
};
</script>
