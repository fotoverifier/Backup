<template>
  <div
    class="flex-shrink-0 p-3 bg-white edit-image-sub-sidebar"
    style="width: 350px"
  >
    <!--<p class="pt-3" style="font-weight: 600; color: rgba(0, 0, 0, 0.65)">
      Color
    </p>-->
    <ColorPicker ref="colorPicker" @changeColor="changeColor" v-if="false" />
    <p style="font-weight: 600; color: rgba(0, 0, 0, 0.65)">
      Reflection Status
    </p>
    <center>
      <div class="row" v-if="checkConsistencyLoading">
        <div class="col-sm-12">
          <center>
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </center>
        </div>
      </div>
      <div v-if="!checkConsistencyLoading">
        <div v-if="isConsistent">
          <h3 class="text-success">Consistency</h3>
          <p>All selected reflection are consistent with one plane mirror</p>
        </div>
        <div v-if="!isConsistent">
          <h3 class="text-danger">Inconsistency</h3>
          <p>Some selected reflection are from another plane mirror</p>
        </div>
      </div>
    </center>
    <ul class="list-unstyled ps-0 pt-2">
      <li class="mb-1">
        <center>
          <button
            class="btn btn-primary align-items-center rounded"
            @click="checkReflectionConsistency"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-check"
              viewBox="0 0 16 16"
            >
              <path
                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
              />
            </svg>
            Check Reflection Consistency
          </button>
        </center>
      </li>
    </ul>
    <div class="border-bottom pt-4"></div>
    <div class="pt-2"></div>
    <p style="font-weight: 600; color: rgba(0, 0, 0, 0.65)">
      Reflection Constraint
    </p>
    <div class="table-responsive">
      <div class="table-wrapper-scroll-y my-custom-scrollbar">
        <table class="table table-bordered table-striped mb-0">
          <thead>
            <tr>
              <th scope="col">Show</th>
              <th scope="col">ID</th>
              <th scope="col">P1</th>
              <th scope="col">P2</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="constraints in reflectionConstraints"
              :key="constraints.id"
            >
              <th scope="row">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :checked="constraints.show"
                  @change="toggleDisplayReflectionConstraint(constraints.id)"
                />
              </th>
              <td
                :class="{
                  'fw-bold': constraints.inInconsistentSet,
                  'text-danger': constraints.inInconsistentSet,
                }"
              >
                {{ constraints.id }}
              </td>
              <td
                :class="{
                  'fw-bold': constraints.inInconsistentSet,
                  'text-danger': constraints.inInconsistentSet,
                }"
              >
                ({{ Math.round(constraints.line.point.x) }},
                {{ Math.round(constraints.line.point.y) }})
              </td>
              <td
                :class="{
                  'fw-bold': constraints.inInconsistentSet,
                  'text-danger': constraints.inInconsistentSet,
                }"
              >
                ({{ Math.round(constraints.line.otherPoint.x) }},
                {{ Math.round(constraints.line.otherPoint.y) }})
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="pt-2"></div>
    <div class="row">
      <div class="col-sm-12">
        <center>
          <button
            class="btn btn-outline-success align-items-center rounded"
            :class="{ active: tool == 'addReflectionConstraint' }"
            @click="tool = 'addReflectionConstraint'"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-plus-lg"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
              />
            </svg>
            Add New
          </button>
        </center>
      </div>
    </div>
    <div class="border-bottom pt-4"></div>
    <div class="pt-2"></div>
    <p style="font-weight: 600; color: rgba(0, 0, 0, 0.65)">Edit Constraint</p>
    <ul class="list-unstyled ps-0">
      <li class="mb-1">
        <div class="row">
          <div class="col-md-6">
            <center>
              <button
                class="btn btn-secondary align-items-center rounded"
                @click="resetImage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-counterclockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                  />
                  <path
                    d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
                  />
                </svg>
                Reset Image
              </button>
            </center>
          </div>
          <div class="col-md-6">
            <center>
              <button
                class="btn btn-outline-danger align-items-center rounded"
                :class="{ active: tool == 'eraser' }"
                @click="tool = 'eraser'"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eraser"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
                  />
                </svg>
                Eraser
              </button>
            </center>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ColorPicker from "@/components/ShadowConsistency/ColorPicker.vue";
import { ref, watch } from "vue";

export default {
  emits: [
    "changeTool",
    "changeColor",
    "changeHorizontalState",
    "changeVerticalState",
    "checkReflectionConsistency",
    "resetImage",
    "toggleDisplayReflectionConstraint",
  ],
  setup(props, context) {
    let colorPicker = ref(null);
    let tool = ref("selection");
    let horizontalState = ref(false);
    let verticalState = ref(false);
    let reflectionConstraints = ref([]);
    let isConsistent = ref(true);
    let checkConsistencyLoading = ref(false);

    let checkReflectionConsistency = function () {
      checkConsistencyLoading.value = true;
      context.emit("checkReflectionConsistency");
    };

    let resetImage = function () {
      tool.value = "selection";
      horizontalState.value = false;
      verticalState.value = false;
      //colorPicker.value.resetColor();
      context.emit("resetImage");
    };

    let updateReflectionConstraints = function (newReflectionConstraints) {
      reflectionConstraints.value = [];
      for (let i = 0; i < newReflectionConstraints.length; ++i) {
        reflectionConstraints.value.push(newReflectionConstraints[i]);
      }
    };

    let updateConsistencyResult = function (res) {
      checkConsistencyLoading.value = false;
      isConsistent.value = res;
    };

    let resetTool = function () {
      tool.value = "selection";
    };

    watch(tool, () => {
      context.emit("changeTool", tool.value);
    });

    watch(horizontalState, () => {
      context.emit("changeHorizontalState", horizontalState.value);
    });

    watch(verticalState, () => {
      context.emit("changeVerticalState", verticalState.value);
    });

    let changeColor = function (newColor) {
      context.emit("changeColor", newColor);
    };

    let toggleDisplayReflectionConstraint = function (id) {
      context.emit("toggleDisplayReflectionConstraint", id);
    };

    return {
      colorPicker,
      tool,
      horizontalState,
      verticalState,
      checkReflectionConsistency,
      resetImage,
      changeColor,
      resetTool,
      reflectionConstraints,
      updateReflectionConstraints,
      toggleDisplayReflectionConstraint,
      updateConsistencyResult,
      isConsistent,
      checkConsistencyLoading,
    };
  },

  components: {
    ColorPicker,
  },
};
</script>
