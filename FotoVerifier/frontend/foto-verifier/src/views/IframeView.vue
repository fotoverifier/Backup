<template>
  <p>This is iframe content</p>
  <button class="primary-btn" @click="sendMessage">Click Here</button>
</template>

<script>
export default {
  setup() {
    let sendMessage = function () {
      window.parent.postMessage("this is message", "http://localhost:8080");
    };

    return {
      sendMessage,
    };
  },
};
</script>
