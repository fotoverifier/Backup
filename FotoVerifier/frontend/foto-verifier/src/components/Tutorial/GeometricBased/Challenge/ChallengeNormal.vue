<template>
  <p class="text">
    <a href="/image/challenge/shadow_consistency_normal/pic.png" target="_blank"
      >This image</a
    >
    has been modified. Can you use
    <a href="/" target="_blank">Shadow Consistency</a> to prove that?
    <br />
    <b>Image source:</b> Taken taken from paper
    <a href="https://farid.berkeley.edu/downloads/publications/tog13/tog13.pdf"
      >Exposing Photo Manipulation with Inconsistent Shadows</a
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
      <b>Hint #1:</b> Can you find some shadow in image? Let's draw shadow
      constraints from them!
    </div>
  </div>

  <div class="collapse pt-2" id="hint-2">
    <div class="card card-body">
      <b>Hint #2:</b> I'm sure that the image was modified, if you still see
      "Consistency" when you click "Check Shadow Consistency" button, you need
      to add more shadow constraint!
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
        Once the image has been uploaded, add two shadow constraints: one that
        the roof and one at the child who is playing basketball, the image now
        looks like picture below:
      </p>
      <center>
        <img
          src="/image/challenge/shadow_consistency_normal/shadow_challenge_answer.png"
        />
      </center>
      <br />
      <p class="card-text">
        Then click button "Check Shadow Consistency", you we see the result is
        "Inconsistency":
      </p>
      <center>
        <img
          src="/image/challenge/shadow_consistency_normal/chall_result.png"
        />
      </center>
      <br />
      <p class="card-text">
        So in the image, there is more than one light source, which is not
        usually happened in original image.
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
          You need to add a large enough amount of shadow constraints, so the
          result after checking is more reliable.
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
      title: "Challenge 1: Check Shadow Consistency",
    });
  },
};
</script>
