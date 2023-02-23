<template>
  <h4><b>Requirement</b></h4>

  <p class="text">
    <a href="/image/challenge/metadata-1/pic.jpg" target="_blank">This image</a>
    has been modified. Can you use
    <a href="/" target="_blank">EXIF Metadata</a> to prove that?
    <br />
    <b>Challenge idea:</b> Base on
    <a
      href="https://fotoforensics.com/messages.php?read=1420247530700&challenge=1"
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
  </p>

  <div class="collapse pt-2" id="hint-1">
    <div class="card card-body">
      <b>Hint #1:</b> Check the metadata for the application's name and version,
      also the modified date.
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
        Look at "Software", you can see "Adobe Photoshop CS2 Windows".
      </p>
      <p class="card-text">
        Look at "ModifyDate", you can see the modified timestamp is Apr-14-2011
        11:00:44.
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
      <p class="card-text">
        Checking information in metadata can realize image modification.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "Challenge 1: Metadata Consideration",
    });
  },
};
</script>
