<template>
  <h5 class="title">5. Check Your Understanding</h5>
  <p>
    To make sure you understand the concept of
    <strong style="color: rgb(97, 189, 109)">RGB Color System</strong> in
    images, we have an exercise for you. Given a
    <strong style="color: rgb(250, 197, 28)">landscape image</strong> on the
    right side, every time you
    <strong style="color: rgb(250, 197, 28)">move the mouse</strong> over each
    <strong style="color: rgb(250, 197, 28)">pixel</strong> you will know the
    <strong style="color: rgb(97, 189, 109)">red</strong>,
    <strong style="color: rgb(97, 189, 109)">green</strong>,
    <strong style="color: rgb(97, 189, 109)">blue</strong> value of that
    <strong style="color: rgb(250, 197, 28)">pixel</strong>. Your task is click
    on the <strong style="color: rgb(250, 197, 28)">pixel</strong> that has a
    <strong style="color: rgb(97, 189, 109)">red</strong> value of
    <strong style="color: rgb(250, 197, 28)">0</strong>, and
    <strong style="color: rgb(97, 189, 109)">blue</strong> value is larger than
    <strong style="color: rgb(250, 197, 28)">200</strong>.
  </p>
  <div class="card window">
    <div class="card-body">
      <div class="d-flex flex-row align-items-center flex-wrap">
        <div class="col-md-12">
          <p>
            <strong>Hint:</strong> The larger the
            <strong style="color: rgb(97, 189, 109)">blue</strong>
            value, the more
            <strong style="color: rgb(97, 189, 109)">blue</strong> the
            <strong style="color: rgb(250, 197, 28)">pixel</strong> has
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {},
};
</script>

<style scoped>
.title {
  color: #c0cbeb;
}

ul {
  padding-left: 20px;
}

.window {
  background-color: #2c3967;
  border: 1px solid rgba(128, 152, 255, 0.22);
  box-shadow: 0 0.1875rem 1px -2px rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 1px 0.3125rem 0 rgba(0, 0, 0, 0.12);
  border-radius: 0;
}
</style>
