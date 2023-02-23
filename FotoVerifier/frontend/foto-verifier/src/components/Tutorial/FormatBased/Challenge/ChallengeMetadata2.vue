<template>
  <h4><b>Requirement</b></h4>

  <p class="text">
    <a href="/image/challenge/metadata-2/pic.jpg" target="_blank">This image</a>
    has been modified. Can only <a href="/" target="_blank">EXIF Metadata</a> be
    used to prove that?
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
      Hint Question #1
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
      Hint Question #2
    </button>
    &nbsp;
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#hint-3"
      aria-expanded="false"
      aria-controls="hint-3"
    >
      Hint Question #3
    </button>
  </p>

  <div class="collapse pt-2" id="hint-1">
    <div class="card card-body">
      <b>Hint Question #1:</b> Look at the metadata for the camera's make and
      model.
    </div>
  </div>

  <div class="collapse pt-2" id="hint-2">
    <div class="card card-body">
      <b>Hint Question #2:</b> Look at the metadata for the timestamps,
      including creation date, modified date, date/time original.
    </div>
  </div>

  <div class="collapse pt-2" id="hint-3">
    <div class="card card-body">
      <b>Hint Question #3:</b> Look for inconsistent timestamps, metadata fields
      that only come from applications, or other inconsistencies.
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
      data-bs-target="#answer-1"
      aria-expanded="false"
      aria-controls="answer-1"
    >
      Answer Question #1
    </button>
    &nbsp;
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#answer-2"
      aria-expanded="false"
      aria-controls="answer-2"
    >
      Answer Question #2
    </button>
    &nbsp;
    <button
      class="btn btn-primary"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#answer-3"
      aria-expanded="false"
      aria-controls="answer-3"
    >
      Answer Question #3
    </button>
  </p>

  <div class="collapse pt-2" id="answer-1">
    <div class="card card-body">
      <b>Answer Question #1:</b>
      "Make" field identifies this as a "Casio Computer Co., LTD" camera. The
      model is EX-Z3.
    </div>
  </div>

  <div class="collapse pt-2" id="answer-2">
    <div class="card card-body">
      <b>Answer Question #2:</b>
      The creation date, modify date, and original date/time all say the same
      thing. The picture was photographed on Jun-24-2006 19:51:05.
    </div>
  </div>

  <div class="collapse pt-2" id="answer-3">
    <div class="card card-body">
      <b>Answer Question #3:</b>
      <p class="card-text">
        The timestamps are consistent. The metadata sections appear consistent
        for metadata from a camera. There is no indication of tampering or
        third-party applications altering this picture.
      </p>
      <p class="card-text">
        Based only on the metadata, this appears to be a camera-original
        picture.
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
        Considering only on metadata information is not always successful. You
        need to combine with various forensics method.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "Challenge 2: Metadata Cannot Help This Problem",
    });
  },
};
</script>
