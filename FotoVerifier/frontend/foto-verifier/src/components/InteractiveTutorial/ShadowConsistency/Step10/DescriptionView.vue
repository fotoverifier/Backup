<template>
  <h5 class="title">10. Use "Check Shadow Consistency" tool</h5>
  <p v-if="step == 1">
    Once you have uploaded the image, you need to move to the
    <strong style="color: #f27289">Check Shadow Consistency</strong>
    tool to check the consistency between the shadows in the
    <strong style="color: rgb(97, 189, 109)">uploaded image</strong>. Now we
    will guide you step by step to open this tool.
  </p>

  <p v-if="step == 2">
    You have now opened the
    <strong style="color: #f27289">Check Shadow Consistency</strong> tool. Let's
    take a look at the <strong style="color: #f27289">components</strong> of
    this tool.
  </p>

  <p v-if="step == 2">
    The <strong style="color: #f27289">first component</strong> is the
    <strong style="color: rgb(97, 189, 109)">toolbar</strong>
    on the left side. This
    <strong style="color: rgb(97, 189, 109)">toolbar</strong> describes the
    <strong style="color: rgb(44, 130, 201)">state</strong> for the
    <strong style="color: #f27289">current image</strong>. Consists of:
  </p>

  <ul v-if="step == 2">
    <li>
      <strong style="color: rgb(250, 197, 28)">Consistency</strong> of the
      <strong style="color: rgb(250, 197, 28)">shadows</strong> in the
      <strong style="color: #f27289">image</strong>.
    </li>
    <li>
      List of
      <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraints</strong>.
    </li>
    <li>
      List of
      <strong style="color: rgb(250, 197, 28)"
        >Attached Shadow Constraints</strong
      >
    </li>
  </ul>

  <p v-if="step == 2">
    At the same time, you can also perform some
    <strong style="color: rgb(44, 130, 201)">actions</strong> on this
    <strong style="color: rgb(97, 189, 109)">toolbar</strong> such as:
  </p>

  <ul v-if="step == 2">
    <li>
      Add a
      <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong>.
    </li>
    <li>
      Add an
      <strong style="color: rgb(250, 197, 28)"
        >Attached Cast Shadow Constraint</strong
      >.
    </li>
    <li>
      Remove a
      <strong style="color: rgb(250, 197, 28)">Shadow Constraint</strong>.
    </li>
    <li>
      Remove all
      <strong style="color: rgb(250, 197, 28)">Shadow Constraint</strong>.
    </li>
    <li>
      Toggle <strong style="color: rgb(97, 189, 109)">hide</strong> or
      <strong style="color: rgb(97, 189, 109)">show</strong> a
      <strong style="color: rgb(250, 197, 28)">Shadow Constraint</strong>.
    </li>
    <li>
      The most important is
      <strong style="color: #f27289">Check Shadow Consistency</strong> for
      current
      <strong style="color: rgb(250, 197, 28)">Shadow Constraints</strong>.
    </li>
  </ul>

  <p v-if="step == 3">
    The <strong style="color: #f27289">second component</strong> on the right
    hand side is the
    <strong style="color: rgb(97, 189, 109)">image view</strong>. Here displays
    the <strong style="color: #f27289">image</strong> you have uploaded and
    displays the
    <strong style="color: rgb(250, 197, 28)">Shadow Constraints</strong> drawn
    by you on the <strong style="color: #f27289">image</strong>.
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong>
    will be colored <strong style="color: rgb(97, 189, 109)">green</strong> and
    <strong style="color: rgb(250, 197, 28)">Attached Shadow Constraint</strong>
    will be colored <strong style="color: rgb(97, 189, 109)">blue</strong>.
  </p>

  <p v-if="step == 4">
    Once you're familiar with the
    <strong style="color: #f27289">tool's components</strong>, we'll walk you
    through using it to
    <strong style="color: #f27289">check shadow consistency</strong> in
    <strong style="color: #f27289">uploaded image</strong>.
  </p>

  <p v-if="step == 4">
    First you need to draw
    <strong style="color: rgb(250, 197, 28)">Shadow Constraints</strong> on the
    <strong style="color: #f27289">image</strong>. We will show you how to draw
    <strong style="color: rgb(250, 197, 28)">Attached Shadow Constraint</strong>
    first.
  </p>

  <p v-if="step == 5 || step == 6 || step == 7">
    To draw an
    <strong style="color: rgb(250, 197, 28)">Attached Shadow Constraint</strong
    >, you need to do <strong style="color: rgb(97, 189, 109)">2 steps</strong>:
  </p>
  <ul v-if="step == 5 || step == 6 || step == 7">
    <li>
      <strong style="color: rgb(97, 189, 109)">Step 1:</strong> Select a point
      <strong style="color: rgb(250, 197, 28)">A</strong> in the
      <strong style="color: rgb(250, 197, 28)">attached shadow</strong>.
    </li>
    <li v-if="step == 6 || step == 7">
      <strong style="color: rgb(97, 189, 109)">Step 2:</strong> Select a point
      <strong style="color: rgb(250, 197, 28)">B</strong>
      such that the
      <strong style="color: rgb(250, 197, 28)">vector AB</strong> points towards
      the <strong style="color: rgb(250, 197, 28)">light source</strong>.
    </li>
  </ul>
  <p v-if="step == 7">
    You have drawn an
    <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong>. Good job!
  </p>

  <p v-if="step == 8">
    After you draw an
    <strong style="color: rgb(250, 197, 28)">Attached Shadow Constraint</strong>
    on the <strong style="color: #f27289">image</strong>, information about that
    constraint will be displayed in the
    <strong style="color: rgb(250, 197, 28)">Attached Shadow Constraint</strong>
    section of the <strong style="color: rgb(97, 189, 109)">toolbar</strong>.
    The information displayed includes:
  </p>
  <ul v-if="step == 8">
    <li>
      <strong style="color: rgb(97, 189, 109)">Show:</strong> Used to
      <strong style="color: #f27289">show</strong> or
      <strong style="color: #f27289">hide</strong> this
      <strong style="color: rgb(250, 197, 28)">constraint</strong>.
    </li>
    <li>
      <strong style="color: rgb(97, 189, 109)">ID:</strong> Order of
      <strong style="color: rgb(250, 197, 28)">constraints</strong>.
    </li>
    <li>
      <strong style="color: rgb(97, 189, 109)">P1:</strong> The
      <strong style="color: #f27289">coordinates</strong> of point
      <strong style="color: rgb(250, 197, 28)">A</strong> of
      <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong>.
    </li>
    <li>
      <strong style="color: rgb(97, 189, 109)">P2:</strong> The
      <strong style="color: #f27289">coordinates</strong> of point
      <strong style="color: rgb(250, 197, 28)">B</strong> of
      <strong style="color: rgb(250, 197, 28)">Attached Shadow</strong>.
    </li>
  </ul>

  <p v-if="step == 9">
    So you know how to draw
    <strong style="color: rgb(250, 197, 28)">Attached Shadow Constraint</strong>
    on the <strong style="color: #f27289">image</strong>. Next we will show you
    how to draw
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong>.
  </p>
  <p v-if="step == 10 || step == 11 || step == 12">
    To draw an
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong>,
    you need to do <strong style="color: rgb(97, 189, 109)">2 steps</strong>:
  </p>
  <ul v-if="step == 10 || step == 11 || step == 12 || step == 13">
    <li>
      <strong style="color: rgb(97, 189, 109)">Step 1:</strong> Select a point
      <strong style="color: rgb(250, 197, 28)">A</strong> in the
      <strong style="color: rgb(250, 197, 28)">cast shadow</strong>.
    </li>
    <li v-if="step == 11 || step == 12 || step == 13">
      <strong style="color: rgb(97, 189, 109)">Step 2:</strong> Select a point
      <strong style="color: rgb(250, 197, 28)">B</strong>
      and <strong style="color: rgb(250, 197, 28)">C</strong> on the
      corresponding <strong style="color: rgb(250, 197, 28)">object</strong>.
    </li>
    <li v-if="step == 12 || step == 13">
      <strong style="color: rgb(97, 189, 109)">Step 3:</strong> Select a point
      <strong style="color: rgb(250, 197, 28)">C</strong> on the corresponding
      <strong style="color: rgb(250, 197, 28)">object</strong> such that
      <strong style="color: #f27289">range</strong> form by scanning line
      segment <strong style="color: rgb(250, 197, 28)">AB</strong> to
      <strong style="color: rgb(250, 197, 28)">AC</strong>
      contains the
      <strong style="color: rgb(250, 197, 28)">corresponding point</strong> on
      the <strong style="color: rgb(250, 197, 28)">object</strong> with the
      point <strong style="color: rgb(250, 197, 28)">A</strong> in the
      <strong style="color: rgb(250, 197, 28)">shadow</strong>.
    </li>
  </ul>

  <p v-if="step == 13">
    You have drawn an
    <strong style="color: rgb(250, 197, 28)">Cast Shadow</strong>. Good job!
  </p>

  <p v-if="step == 14">
    After you draw an
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong>
    on the <strong style="color: #f27289">image</strong>, information about that
    constraint will be displayed in the
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong>
    section of the <strong style="color: rgb(97, 189, 109)">toolbar</strong>.
    The information displayed includes:
  </p>
  <ul v-if="step == 14">
    <li>
      <strong style="color: rgb(97, 189, 109)">Show:</strong> Used to
      <strong style="color: #f27289">show</strong> or
      <strong style="color: #f27289">hide</strong> this
      <strong style="color: rgb(250, 197, 28)">constraint</strong>.
    </li>
    <li>
      <strong style="color: rgb(97, 189, 109)">ID:</strong> Order of
      <strong style="color: rgb(250, 197, 28)">constraints</strong>.
    </li>
    <li>
      <strong style="color: rgb(97, 189, 109)">P1:</strong> The
      <strong style="color: #f27289">coordinates</strong> of point
      <strong style="color: rgb(250, 197, 28)">A</strong> of
      <strong style="color: rgb(250, 197, 28)">Cast Shadow</strong>.
    </li>
    <li>
      <strong style="color: rgb(97, 189, 109)">P2:</strong> The
      <strong style="color: #f27289">coordinates</strong> of point
      <strong style="color: rgb(250, 197, 28)">B</strong> of
      <strong style="color: rgb(250, 197, 28)">Cast Shadow</strong>.
    </li>
    <li>
      <strong style="color: rgb(97, 189, 109)">P3:</strong> The
      <strong style="color: #f27289">coordinates</strong> of point
      <strong style="color: rgb(250, 197, 28)">C</strong> of
      <strong style="color: rgb(250, 197, 28)">Cast Shadow</strong>.
    </li>
  </ul>

  <p v-if="step == 15">
    By this step we believe you already know how to draw
    <strong style="color: rgb(250, 197, 28)">Attached Shadow Constraint</strong>
    and
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong> on
    image. Next we will come to how to check the drawn
    <strong style="color: rgb(250, 197, 28)">Shadow Constraints</strong> are
    <strong style="color: #f27289">consistent</strong> or not.
  </p>
  <p v-if="step == 15">
    For your convenience, we have added a
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong> in
    the <strong style="color: rgb(97, 189, 109)">man</strong> in the white shirt
    standing in the
    <strong style="color: rgb(97, 189, 109)">middle of the photo</strong>.
  </p>

  <p v-if="step == 16">
    Checking whether the drawn
    <strong style="color: rgb(250, 197, 28)">shadow constraints</strong> are
    <strong style="color: #f27289">consistent</strong> or not is very simple.
    You just need to click the
    <strong style="color: rgb(97, 189, 109)">Check Shadow Consistency</strong>
    button on the <strong style="color: rgb(97, 189, 109)">toolbar</strong>.
  </p>

  <p v-if="step == 17">
    The results show that the drawn
    <strong style="color: rgb(250, 197, 28)">shadow constraints</strong> are
    <strong style="color: #f27289">consistent</strong> with each other. This
    makes sense because in this image we suspect the two
    <strong style="color: rgb(97, 189, 109)">female dancers</strong> look very
    similar were edited using
    <strong style="color: #f27289">Image Cloning</strong> but we haven't drawn
    any <strong style="color: rgb(250, 197, 28)">shadow constraints</strong> for
    these two. Now we will draw
    <strong style="color: rgb(250, 197, 28)">shadow constraints</strong> for
    them and observe the
    <strong style="color: rgb(97, 189, 109)">new result</strong>.
  </p>

  <p v-if="step == 18">
    To save you time, we've added for you 2
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraints</strong> of
    2 <strong style="color: rgb(97, 189, 109)">female dancers</strong> who look
    very similar. Now let's see how the
    <strong style="color: rgb(250, 197, 28)">test results</strong> are.
  </p>

  <p v-if="step == 19">
    After adding 2
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraints</strong> of
    2 <strong style="color: rgb(97, 189, 109)">female dancers</strong>, the
    result is <strong style="color: #f27289">inconsistent</strong>. This proves
    that these two
    <strong style="color: rgb(97, 189, 109)">female dancers</strong> have a
    problem.
  </p>
  <p v-if="step == 19">
    So how to tell which
    <strong style="color: rgb(97, 189, 109)">female dancer</strong> is the
    <strong style="color: rgb(250, 197, 28)">copied version</strong>?. Let's see
    the list of
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraints</strong> in
    the <strong style="color: rgb(97, 189, 109)">toolbar</strong>, the
    <strong style="color: rgb(250, 197, 28)">constraints</strong> which are
    highlighted in red are a
    <strong style="color: rgb(44, 130, 201)">random collection</strong> of
    <strong style="color: rgb(250, 197, 28)">constraints</strong> that are
    <strong style="color: #f27289">inconsistent</strong> with each other. Since
    this <strong style="color: rgb(44, 130, 201)">collection</strong> is
    <strong style="color: #f27289">random</strong>, you just need to check the
    <strong style="color: rgb(250, 197, 28)">shadow consistency</strong> a few
    more times and see if any
    <strong style="color: rgb(250, 197, 28)">shadow constraint</strong> appears
    in all the collection then it's most likely related to a
    <strong style="color: rgb(97, 189, 109)">modified area</strong>.
  </p>

  <p v-if="step == 20 || step == 21">
    In the run in the
    <strong style="color: rgb(97, 189, 109)">previous step</strong>, we have the
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraints</strong>
    <strong style="color: #f27289">1</strong>,
    <strong style="color: #f27289">2</strong>,
    <strong style="color: #f27289">4</strong> which are
    <strong style="color: #f27289">inconsistent</strong>.
  </p>
  <p v-if="step == 20 || step == 21">
    Let's run
    <strong style="color: rgb(250, 197, 28)">Check Shadow Consistency</strong>
    one more time to see
    <strong style="color: rgb(97, 189, 109)">1 more collections</strong> of
    <strong style="color: rgb(250, 197, 28)">shadow constraints</strong> that
    are <strong style="color: #f27289">inconsistent</strong> with each other.
  </p>
  <p v-if="step == 21">
    In the second run, there are two inconsistent
    <strong style="color: #f27289">shadow constraints</strong>, they are
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraints</strong>
    <strong style="color: #f27289">2</strong>
    and <strong style="color: #f27289">4</strong>.
  </p>
  <p v-if="step == 21">
    Because
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraints</strong>
    <strong style="color: #f27289">2</strong>
    and <strong style="color: #f27289">4</strong> appear in
    <strong style="color: rgb(97, 189, 109)">two collections</strong>, so they
    are suspicious.
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong>
    <strong style="color: #f27289">2</strong>
    is for the man in the white shirt and
    <strong style="color: rgb(250, 197, 28)">Cast Shadow Constraint</strong>
    <strong style="color: #f27289">4</strong>
    is for the female dancer on the right, therefore, we can conclude that this
    <strong style="color: rgb(97, 189, 109)">image</strong> has been
    <strong style="color: #f27289">edited</strong> and that the
    <strong style="color: rgb(97, 189, 109)">female dancer</strong> on the
    <strong style="color: rgb(97, 189, 109)">right</strong>
    is a <strong style="color: #f27289">copy</strong> of the
    <strong style="color: rgb(97, 189, 109)">female dancer</strong> on the
    <strong style="color: rgb(97, 189, 109)">left</strong>.
  </p>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    let step = ref(1);

    let moveToStep2 = function () {
      step.value = 2;
    };

    let moveToStep3 = function () {
      step.value = 3;
    };

    let moveToStep4 = function () {
      step.value = 4;
    };

    let moveToStep5 = function () {
      step.value = 5;
    };

    let moveToStep6 = function () {
      step.value = 6;
    };

    let moveToStep7 = function () {
      step.value = 7;
    };

    let moveToStep8 = function () {
      step.value = 8;
    };

    let moveToStep9 = function () {
      step.value = 9;
    };

    let moveToStep10 = function () {
      step.value = 10;
    };

    let moveToStep11 = function () {
      step.value = 11;
    };

    let moveToStep12 = function () {
      step.value = 12;
    };

    let moveToStep13 = function () {
      step.value = 13;
    };

    let moveToStep14 = function () {
      step.value = 14;
    };

    let moveToStep15 = function () {
      step.value = 15;
    };

    let moveToStep16 = function () {
      step.value = 16;
    };

    let moveToStep17 = function () {
      step.value = 17;
    };

    let moveToStep18 = function () {
      step.value = 18;
    };

    let moveToStep19 = function () {
      step.value = 19;
    };

    let moveToStep20 = function () {
      step.value = 20;
    };

    let moveToStep21 = function () {
      step.value = 21;
    };

    return {
      origin,
      step,
      moveToStep2,
      moveToStep3,
      moveToStep4,
      moveToStep5,
      moveToStep6,
      moveToStep7,
      moveToStep8,
      moveToStep9,
      moveToStep10,
      moveToStep11,
      moveToStep12,
      moveToStep13,
      moveToStep14,
      moveToStep15,
      moveToStep16,
      moveToStep17,
      moveToStep18,
      moveToStep19,
      moveToStep20,
      moveToStep21,
    };
  },
};
</script>

<style scoped>
.title {
  color: #c0cbeb;
}

ul {
  padding-left: 20px;
}

.btn-copy:focus {
  outline: none;
  box-shadow: none;
}

.window {
  background-color: #2c3967;
  border: 1px solid rgba(128, 152, 255, 0.22);
  box-shadow: 0 0.1875rem 1px -2px rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 1px 0.3125rem 0 rgba(0, 0, 0, 0.12);
  border-radius: 0;
}

.shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

.btn-copy:active {
  animation: shake 0.1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
