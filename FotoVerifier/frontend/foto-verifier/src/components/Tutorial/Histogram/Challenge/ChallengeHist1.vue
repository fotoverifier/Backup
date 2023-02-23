<template>
  <h4><b>Requirement</b></h4>

  <p class="text">
    <a href="/image/challenge/hist-1/pic.jpg" target="_blank">This image</a>
    has been double-compressed from high quality to low quality. Using
    <a href="/" target="_blank">Histogram Analysis</a>, can you describe the
    histograms of the image?
  </p>

  <h4><b>Hints</b></h4>

  <p>If you can't solve, let's see some hints.</p>

  <p class="text">
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#hint-1"
      aria-expanded="false"
      aria-controls="hint-1"
    >
      Hint #1
    </button>
  </p>

  <div class="collapse pt-2" id="hint-1">
    <div class="card card-body">
      <b>Hint #1:</b> Check the histograms. How is the trend? How tall are the
      bars?
    </div>
  </div>

  <h4><b>Answer</b></h4>

  <p>
    In case you can't solve it, even after going through all hints, you can try
    to see our answer.
  </p>

  <p class="text">
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#answer"
      aria-expanded="false"
      aria-controls="answer"
    >
      Answer
    </button>
  </p>

  <div class="collapse pt-2" id="answer">
    <div class="card card-body">
      <p class="card-text">
        As the histograms contain up and down bars consecutively next to each
        other, it concludes that this image has been double-compressed from high
        quality to low quality.
      </p>
    </div>
  </div>

  <h4><b>What you should learn after solving this challenge</b></h4>

  <p class="text">
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#objective"
      aria-expanded="false"
      aria-controls="answer"
    >
      Click to see
    </button>
  </p>

  <div class="collapse pt-2" id="objective">
    <div class="card card-body">
      By looking at the histograms, you can realize when an image is
      double-compressed from high quality to low quality, the histograms can
      contain up and down bars consecutively next to each other.
    </div>
  </div>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "Challenge 1: Histogram Test 1",
    });
  },
};
</script>
