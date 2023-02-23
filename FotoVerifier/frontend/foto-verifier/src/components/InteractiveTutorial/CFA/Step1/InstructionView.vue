<template>
  <div class="row">
    <div class="col-md-12 pt-2">
      <p>
        When you are ready, click <strong class="text-warning">Next</strong> to
        continue
      </p>
    </div>
  </div>
  <div class="row pt-2">
    <div class="col-md-6"></div>
    <div class="col-md-6">
      <button
        type="button"
        class="btn btn-warning float-end"
        v-on:click="nextStep()"
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["nextStep"],

  setup(props, context) {
    let nextStep = function () {
      context.emit("nextStep");
    };

    return {
      nextStep,
    };
  },
};
</script>
