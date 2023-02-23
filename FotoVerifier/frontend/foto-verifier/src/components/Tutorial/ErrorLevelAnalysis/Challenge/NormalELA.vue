<template>
  <h4><b>Requirement</b></h4>

  <p class="text">
    <a href="/image/challenge/normal/pic.jpg" target="_blank">This image</a>
    has been modified. Can you use <a href="/" target="_blank">ELA</a> to prove
    that?
    <br />
    <b>Challenge idea:</b> Base on
    <a
      href="https://fotoforensics.com/messages.php?read=1399223421146&challenge=1"
      target="_blank"
      >FotoForensics</a
    >
  </p>
  <br />

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
    &nbsp;
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#hint-2"
      aria-expanded="false"
      aria-controls="hint-2"
    >
      Hint #2
    </button>
  </p>

  <div class="collapse pt-2" id="hint-1">
    <div class="card card-body">
      <b>Hint #1:</b> Try to adjust "JPEG Quality" value and "Error Scale" to
      see which part of ELA result has higher brightness
    </div>
  </div>

  <div class="collapse pt-2" id="hint-2">
    <div class="card card-body">
      <b>Hint #2:</b> Remember that if an image is original then all
      high-contrast edges must have similar brightness and all low-contrast
      edges must have similar brightness
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
        Once the image has been uploaded, the default value of "JPEG Quality" is
        95 and we can't see any area that brighter than others in ELA result.
      </p>
      <center>
        <img
          src="/image/challenge/normal/answer-1.png"
          width="400"
          height="400"
        />
      </center>
      <br />
      <p class="card-text">
        So we need to adjust the value of quality, 70 seems good.
      </p>
      <center>
        <img
          src="/image/challenge/normal/answer-2.png"
          width="400"
          height="400"
        />
      </center>
      <br />
      <p class="card-text">
        Look at the text "The Berenstein Bears", we can see that edge of letter
        "T" is as same bright as letters in "he Berenstein", but is darker than
        edge of letters in "ein Bears", so we can conclude that the part "ein
        Bears" has been modified.
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
      <ul>
        <li>
          Remember to determine edge, texture and surface in image before you
          read ELA result.
        </li>
        <li>
          You need to modify 2 parameter "JPEG Quality" and "Error Scale" to
          suitable value, then it's easier to see ELA result.
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "Challenge 1: Normal Error Level Analysis",
    });
  },
};
</script>
