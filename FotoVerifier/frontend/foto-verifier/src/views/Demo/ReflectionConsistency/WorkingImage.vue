<template>
  <div class="container" v-if="!isFinished">
    <div class="row">
      <div class="col-sm-12">
        <center>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </center>
      </div>
    </div>
  </div>
  <canvas
    ref="imageView"
    @click="handleClick"
    @mousemove="handleMousemove"
  ></canvas>
  <notifications position="bottom right" />
</template>

<script>
import { ref, onMounted, reactive } from "vue";
import { drawImageScaled } from "../../../utils/canvas.js";
import { createReflectionConstraint } from "../../../utils/reflectionConstraint.js";
//import Swal from "sweetalert2";

export default {
  props: {
    imageData: String,
    canvasWidth: Number,
    canvasHeight: Number,
    tool: String,
    color: String,
    horizontalState: Boolean,
    verticalState: Boolean,
  },
  emit: [
    "resetTool",
    "updateCastShadowConstraints",
    "updateAttachedShadowConstraints",
  ],
  setup(props, context) {
    let showHintCnt = 0;
    let imageView = ref(null);
    let isFinished = ref(false);
    let clickedPoints = reactive([]);
    let reflectionConstraints = reactive([]);
    let reflectionConstraintID = 0;
    let ratio = 0;
    let hintX = 0;
    let hintY = 0;
    let hasHintPoint = false;
    let step = 1;
    let hintInterval = null;

    let drawCanvas = function (noLoading = false) {
      if (!noLoading) {
        isFinished.value = false;
      }
      let img = new Image();
      img.src = props.imageData;
      img.onload = function () {
        let ctx = imageView.value.getContext("2d");
        let canvas = ctx.canvas;
        canvas.width = props.canvasWidth;
        canvas.height = props.canvasHeight;
        ratio = drawImageScaled(img, ctx);

        for (let i = 0; i < reflectionConstraints.length; i++) {
          if (reflectionConstraints[i].show) {
            drawReflectionConstraint(reflectionConstraints[i]);
          }
        }

        if (!noLoading) {
          isFinished.value = true;
        }

        if (hasHintPoint) {
          let x = hintX * ratio;
          let y = hintY * ratio;
          console.log(x, y);
          ctx = imageView.value.getContext("2d");
          ctx.beginPath();
          ctx.arc(x, y, 3 * ((showHintCnt % 2) + 1), 0, Math.PI * 2, false);
          ctx.strokeStyle = "yellow";
          ctx.lineWidth = 3;
          ctx.stroke();
          showHintCnt++;
        }
      };
    };

    onMounted(() => {
      drawCanvas();
    });

    let moveToStep5 = function () {
      step = 5;
      showHintCnt = 0;
      hintX = 561;
      hintY = 497;
      hasHintPoint = true;
      hintInterval = setInterval(() => {
        drawCanvas(true);
      }, 400);
    };

    let moveToStep6 = function () {
      clearInterval(hintInterval);
      step = 6;
      showHintCnt = 0;
      hintX = 108;
      hintY = 436;
      hasHintPoint = true;
      hintInterval = setInterval(() => {
        drawCanvas(true);
      }, 400);
      context.emit("moveToStep6");
    };

    let moveToStep7 = function () {
      clearInterval(hintInterval);
      step = 7;
      hasHintPoint = false;
      context.emit("moveToStep7");
    };

    let moveToStep10 = function () {
      step = 10;
      showHintCnt = 0;
      hintX = 179;
      hintY = 204;
      hasHintPoint = true;
      hintInterval = setInterval(() => {
        drawCanvas(true);
      }, 400);
    };

    let dist = function (x1, y1, x2, y2) {
      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    let drawReflectionConstraint = function (constraint) {
      let root = constraint.line.point;
      let p1 = constraint.line.otherPoint;
      let color = constraint.color;
      let ctx = imageView.value.getContext("2d");
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(root.x, root.y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.lineTo(p1.x, p1.y);
      ctx.stroke();
    };

    let addReflectionConstraintPoint1 = function (x, y) {
      if (dist(x, y, hintX * ratio, hintY * ratio) <= 6) {
        clickedPoints.push({ x: hintX * ratio, y: hintY * ratio });
        moveToStep6();
      }
    };

    let addReflectionConstraint = function (x1, y1, x2, y2) {
      clickedPoints = [];
      clickedPoints.push({ x: x1 * ratio, y: y1 * ratio });
      clickedPoints.push({ x: x2 * ratio, y: y2 * ratio });
      console.log(x1 * ratio, y1 * ratio);
      console.log(x2 * ratio, y2 * ratio);
      console.log("====");
      reflectionConstraintID++;
      let constraint = createReflectionConstraint(
        clickedPoints[0],
        clickedPoints[1],
        "#00AA00",
        reflectionConstraintID
      );
      reflectionConstraints.push(constraint);
      clickedPoints = [];
      drawCanvas(true);
    };

    let moveToStep15 = function () {
      step = 15;
      addReflectionConstraint(725, 457, 129, 389);
      addReflectionConstraint(514, 590, 22, 512);
    };

    let moveToStep18 = function () {
      step = 18;
      addReflectionConstraint(678, 52, 120, 56);
      addReflectionConstraint(753, 235, 72, 224);
    };

    let addReflectionConstraintPoint2 = function (x, y) {
      if (dist(x, y, hintX * ratio, hintY * ratio) <= 6) {
        moveToStep7();
        clickedPoints.push({ x: hintX * ratio, y: hintY * ratio });
        reflectionConstraintID++;
        let constraint = createReflectionConstraint(
          clickedPoints[0],
          clickedPoints[1],
          "#00AA00",
          reflectionConstraintID
        );
        reflectionConstraints.push(constraint);
        drawCanvas();
        clickedPoints = [];
      }
    };

    let handleClick = function (e) {
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      if (step == 5) {
        addReflectionConstraintPoint1(x, y);
      } else if (step == 6) {
        addReflectionConstraintPoint2(x, y);
      }
    };

    let handleMousemove = function (e) {
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      if (step == 6) {
        if (clickedPoints.length > 0) {
          drawCanvas(true);
          setTimeout(() => {
            let root = clickedPoints[0];
            let ctx = imageView.value.getContext("2d");
            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.moveTo(root.x, root.y);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#00AA00";
            ctx.lineTo(x, y);
            ctx.stroke();
          }, 10);
        }
      }
    };

    return {
      imageView,
      isFinished,
      clickedPoints,
      handleClick,
      handleMousemove,
      moveToStep5,
      moveToStep10,
      moveToStep15,
      moveToStep18,
    };
  },
};
</script>
