<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Bayes Color Filter Array</strong>
        </div>
        <div class="card-body">
          <center>
            <canvas ref="imageView"></canvas>
          </center>
        </div>
      </div>
    </div>
  </div>
  <div class="row pt-2" v-if="questionID <= 4">
    <div class="col-md-12">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Question {{ questionID }}</strong>
        </div>
        <div class="card-body">
          <p class="pt-2">
            <strong style="color: #f27289">Question {{ questionID }}:</strong>
            What is the
            <strong style="color: rgb(97, 189, 109)">pattern</strong> of
            <strong style="color: rgb(97, 189, 109)"
              >Bayes Color Filter Array</strong
            >
            above?
          </p>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="RGGB"
              v-model="answer"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              RGGB
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="GRBG"
              v-model="answer"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              GRBG
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault3"
              value="GBRG"
              v-model="answer"
            />
            <label class="form-check-label" for="flexRadioDefault3">
              GBRG
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault4"
              value="BGGR"
              v-model="answer"
            />
            <label class="form-check-label" for="flexRadioDefault4">
              BGGR
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row pt-2" v-if="questionID >= 5 && questionID <= 8">
    <div class="col-md-12">
      <div class="card window">
        <div class="card-header window-header">
          <strong class="text-warning">Question {{ questionID }}</strong>
        </div>
        <div class="card-body">
          <p class="pt-2">
            <strong style="color: #f27289">Question {{ questionID }}:</strong>
            Which
            <strong style="color: rgb(97, 189, 109)">two color channel</strong>
            values are missing when
            <strong style="color: rgb(250, 197, 28)">light</strong> passes
            through the
            <strong style="color: rgb(250, 197, 28)">blinking cell</strong> of
            the
            <strong style="color: rgb(97, 189, 109)"
              >Bayes Color Filter Array</strong
            >
            above?
          </p>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="GandB"
              v-model="answer"
            />
            <label class="form-check-label" for="flexRadioDefault1">
              Green and Blue
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
              value="RandB"
              v-model="answer"
            />
            <label class="form-check-label" for="flexRadioDefault2">
              Red and Blue
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault3"
              value="RandG"
              v-model="answer"
            />
            <label class="form-check-label" for="flexRadioDefault3">
              Red and Green
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";

export default {
  setup(props, context) {
    let imageView = ref(null);
    let questionID = ref(1);
    let answer = ref("");
    let interval = null;

    let drawPattern = function (pattern) {
      let canvas = imageView.value;
      let ctx = canvas.getContext("2d");
      canvas.width = 600;
      canvas.height = 600;
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;

      for (let i = 0; i <= 10; i++) {
        let x = i * 60;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        let y = i * 60;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      let colorPattern = {
        R: "#992E40",
        G: "#2E9951",
        B: "#2E3599",
      };

      let p = ctx.lineWidth / 2;
      for (let xCell = 0; xCell < 10; xCell++) {
        for (let yCell = 0; yCell < 10; yCell++) {
          let color;
          if (xCell % 2 == 0) {
            if (yCell % 2 == 0) {
              color = colorPattern[pattern[0]];
            } else {
              color = colorPattern[pattern[1]];
            }
          } else {
            if (yCell % 2 == 0) {
              color = colorPattern[pattern[2]];
            } else {
              color = colorPattern[pattern[3]];
            }
          }
          let x = xCell * 60;
          let y = yCell * 60;
          ctx.fillStyle = color;
          ctx.fillRect(x + p, y + p, 60 - p * 2, 60 - p * 2);
        }
      }
    };

    let drawBlinkingPattern = function (posX, posY, c) {
      let canvas = imageView.value;
      let ctx = canvas.getContext("2d");
      canvas.width = 600;
      canvas.height = 600;
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;

      for (let i = 0; i <= 10; i++) {
        let x = i * 60;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();

        let y = i * 60;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      let colorPattern = {
        R: "#992E40",
        G: "#2E9951",
        B: "#2E3599",
      };

      let pattern = "RGGB";

      let p = ctx.lineWidth / 2;
      for (let xCell = 0; xCell < 10; xCell++) {
        for (let yCell = 0; yCell < 10; yCell++) {
          let color;
          if (xCell % 2 == 0) {
            if (yCell % 2 == 0) {
              color = colorPattern[pattern[0]];
            } else {
              color = colorPattern[pattern[1]];
            }
          } else {
            if (yCell % 2 == 0) {
              color = colorPattern[pattern[2]];
            } else {
              color = colorPattern[pattern[3]];
            }
          }

          let x = xCell * 60;
          let y = yCell * 60;
          ctx.fillStyle = color;
          ctx.fillRect(x + p, y + p, 60 - p * 2, 60 - p * 2);
        }
      }

      let counter = 0;
      interval = setInterval(function () {
        if (c == "red") {
          ctx.fillStyle = counter % 2 === 0 ? "red" : colorPattern.R;
        } else if (c == "green") {
          ctx.fillStyle = counter % 2 === 0 ? "green" : colorPattern.G;
        } else if (c == "blue") {
          ctx.fillStyle = counter % 2 === 0 ? "blue" : colorPattern.B;
        }
        let x = posX * 60;
        let y = posY * 60;
        ctx.fillRect(x + p, y + p, 60 - p * 2, 60 - p * 2);
        counter++;
      }, 500);
    };

    let nextQuestion = function () {
      questionID.value++;
      answer.value = "";
      if (interval != null) {
        clearInterval(interval);
      }
      if (questionID.value == 2) {
        drawPattern("GRBG");
      } else if (questionID.value == 3) {
        drawPattern("BGGR");
      } else if (questionID.value == 4) {
        drawPattern("RGGB");
      } else if (questionID.value == 5) {
        drawBlinkingPattern(3, 3, "blue");
      } else if (questionID.value == 6) {
        drawBlinkingPattern(3, 6, "green");
      } else if (questionID.value == 7) {
        drawBlinkingPattern(4, 8, "red");
      } else if (questionID.value == 8) {
        drawBlinkingPattern(2, 2, "red");
      }
    };

    watch(
      () => answer.value,
      () => {
        if (questionID.value == 1 && answer.value == "GRBG") {
          context.emit("correctAnswer");
        } else if (questionID.value == 2 && answer.value == "GBRG") {
          context.emit("correctAnswer");
        } else if (questionID.value == 3 && answer.value == "BGGR") {
          context.emit("correctAnswer");
        } else if (questionID.value == 4 && answer.value == "RGGB") {
          context.emit("correctAnswer");
        } else if (questionID.value == 5 && answer.value == "RandG") {
          context.emit("correctAnswer");
        } else if (questionID.value == 6 && answer.value == "RandB") {
          context.emit("correctAnswer");
        } else if (questionID.value == 7 && answer.value == "GandB") {
          context.emit("correctAnswer");
        } else if (questionID.value == 8 && answer.value == "GandB") {
          context.emit("correctAnswer");
        }
      }
    );

    onMounted(() => {
      drawPattern("GBRG");
    });

    return {
      imageView,
      questionID,
      answer,
      nextQuestion,
    };
  },
};
</script>

<style scoped>
.window {
  background-color: transparent;
  border: 1px solid rgba(128, 152, 255, 0.22);
  box-shadow: 0 0.1875rem 1px -2px rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 1px 0.3125rem 0 rgba(0, 0, 0, 0.12);
  border-radius: 0;
}

.window-header {
  background-color: #28335e;
  box-shadow: 0 0.1875rem 1px -2px rgba(0, 0, 0, 0.2),
    0 0.125rem 0.125rem 0 rgba(0, 0, 0, 0.14),
    0 1px 0.3125rem 0 rgba(0, 0, 0, 0.12);
}
</style>
