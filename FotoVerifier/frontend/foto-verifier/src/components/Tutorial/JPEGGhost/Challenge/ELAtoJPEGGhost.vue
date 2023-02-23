<template>
  <p class="text">
    <b
      ><i
        >Note: You should complete Challenge 1: Normal ELA before doing this
        challenge.</i
      ></b
    >
  </p>

  <h4><b>Requirement</b></h4>

  <p class="text">
    Can you still remember
    <a href="/image/challenge/normal/pic.jpg" target="_blank">this image</a>?
    Now use <a href="/" target="_blank">JPEG Ghost</a> to realize modifications.
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
  </p>

  <div class="collapse pt-2" id="hint-1">
    <div class="card card-body">
      <b>Hint #1:</b> Just like ELA approach, did you realize the area with
      different brightness? Don't forget to adjust JPEG Quality parameter.
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
        With default JPEQ Quality, the result looks like this:
      </p>
      <center>
        <img
          src="/image/challenge/ghost-1/result1a.PNG"
          width="400"
          height="400"
        />
      </center>
      <br />
      <p class="card-text">
        There are some bright areas, and 'ein Bears' seems to be brighter than
        other. Try adjusting higher our JPEG Ghost parameter!
      </p>
      <center>
        <img
          src="/image/challenge/ghost-1/result1b.PNG"
          width="400"
          height="400"
        />
      </center>
      <br />
      <p class="card-text">
        Yeah, 'ein Bears' is bright inside the dark remaining area. So, this is
        the modified part.
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
        <li>If you get used to ELA, approaching JPEG Ghost is not so hard!</li>
        <li>Remember to change JPEG Quality for easier consideration.</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "Challenge 1: From ELA to JPEG Ghost",
    });
  },
};
</script>
