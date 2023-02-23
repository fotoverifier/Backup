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
import { ref, onMounted, watch, reactive } from "vue";
import { drawImageScaled } from "../../utils/canvas.js";
import {
  isPointOnLine,
  isValidReflectionConstraint,
  createReflectionConstraint,
} from "../../utils/reflectionConstraint.js";
//import Swal from "sweetalert2";
import { notify } from "@kyvg/vue3-notification";

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
  emit: ["resetTool", "updateReflectionConstraints"],
  setup(props, context) {
    let imageView = ref(null);
    let imageZoom = ref(null);
    let isFinished = ref(false);
    let horizontalColor = ref("#ffffff");
    let verticalColor = ref("#ffffff");
    let clickedPoints = reactive([]);
    let reflectionConstraints = reactive([]);
    let reflectionConstraintID = 0;

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
        drawImageScaled(img, ctx);

        if (props.horizontalState) {
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2);
          ctx.lineWidth = 3;
          ctx.strokeStyle = horizontalColor.value;
          ctx.lineTo(canvas.width - 1, canvas.height / 2);
          ctx.stroke();
        }

        if (props.verticalState) {
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2, 0);
          ctx.lineWidth = 3;
          ctx.strokeStyle = verticalColor.value;
          ctx.lineTo(canvas.width / 2, canvas.height - 1);
          ctx.stroke();
        }

        for (let i = 0; i < reflectionConstraints.length; i++) {
          if (reflectionConstraints[i].show) {
            drawReflectionConstraint(reflectionConstraints[i]);
          }
        }

        if (!noLoading) {
          isFinished.value = true;
        }
      };
    };

    onMounted(() => {
      drawCanvas();
    });

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

    let addReflectionConstraintClick = function (x, y) {
      if (clickedPoints.length < 2) {
        clickedPoints.push({ x, y });
        if (clickedPoints.length == 1) {
          notify({
            title: "Step 2: Select corresponding point in object's reflection",
          });
        } else if (clickedPoints.length == 2) {
          if (isValidReflectionConstraint(clickedPoints[0], clickedPoints[1])) {
            reflectionConstraintID++;
            let constraint = createReflectionConstraint(
              clickedPoints[0],
              clickedPoints[1],
              "#00AA00",
              reflectionConstraintID
            );
            reflectionConstraints.push(constraint);
            if (constraint.show) {
              drawReflectionConstraint(constraint);
            }
            context.emit("updateReflectionConstraints", reflectionConstraints);
          } else {
            notify({
              type: "error",
              title: "Error: Invalid reflection shadow constraint",
            });
          }
          clickedPoints = [];
          context.emit("resetTool");
        }
      }
    };

    let eraserClick = function (x, y) {
      for (let i = 0; i < reflectionConstraints.length; i++) {
        let constraints = reflectionConstraints[i];
        if (!constraints.show) {
          continue;
        }
        let line = constraints.line;
        if (isPointOnLine(x, y, line)) {
          reflectionConstraints.splice(i, 1);
          drawCanvas(true);
          context.emit("updateReflectionConstraints", reflectionConstraints);
          return;
        }
      }
    };

    let handleClick = function (e) {
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      if (props.tool == "addReflectionConstraint") {
        addReflectionConstraintClick(x, y);
      } else if (props.tool == "eraser") {
        eraserClick(x, y);
      }
    };

    let handleMousemove = function (e) {
      let rect = imageView.value.getBoundingClientRect();
      let scaleX = imageView.value.width / rect.width;
      let scaleY = imageView.value.height / rect.height;
      let x = (e.clientX - rect.left) * scaleX;
      let y = (e.clientY - rect.top) * scaleY;

      if (props.tool == "eraser") {
        let isOnConstraints = false;

        for (let i = 0; i < reflectionConstraints.length; i++) {
          let constraints = reflectionConstraints[i];
          if (!constraints.show) {
            continue;
          }
          let line = constraints.line;
          if (isPointOnLine(x, y, line)) {
            isOnConstraints = true;
            break;
          }
        }

        if (isOnConstraints) {
          imageView.value.style.cursor = "crosshair";
        } else {
          imageView.value.style.cursor = "default";
        }
      } else if (props.tool == "addReflectionConstraint") {
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

    let toggleDisplayReflectionConstraint = function (id) {
      for (let i = 0; i < reflectionConstraints.length; ++i) {
        if (reflectionConstraints[i].id == id) {
          reflectionConstraints[i].show = !reflectionConstraints[i].show;
        }
      }
      drawCanvas(true);
    };

    let resetImage = function () {
      clickedPoints = [];
      reflectionConstraints = [];
      reflectionConstraintID = 0;
      context.emit("updateReflectionConstraints", reflectionConstraints);
      drawCanvas(true);
    };

    let consistentSet = function (set) {
      let intersectPoints = [];
      let cnt = 0;

      for (let i = 0; i < set.length; i++) {
        for (let j = i + 1; j < set.length; j++) {
          cnt++;
          let norm1 = set[i].data.line.norm;
          let point1 = set[i].data.line.point;
          let norm2 = set[j].data.line.norm;
          let point2 = set[j].data.line.point;
          let a1 = norm1.x,
            b1 = norm1.y,
            c1 = -norm1.x * point1.x - norm1.y * point1.y;
          let a2 = norm2.x,
            b2 = norm2.y,
            c2 = -norm2.x * point2.x - norm2.y * point2.y;
          let d = a1 * b2 - a2 * b1;
          if (Math.abs(d) > 1e-9) {
            let p = {
              x: (b1 * c2 - b2 * c1) / d,
              y: (c1 * a2 - c2 * a1) / d,
            };
            intersectPoints.push(p);
          }
        }
      }

      if (cnt == 0) {
        return true;
      }

      if (intersectPoints.length == 0) {
        return false;
      }

      let c = {
        x: 0,
        y: 0,
      };

      for (let i = 0; i < intersectPoints.length; i++) {
        c.x += intersectPoints[i].x;
        c.y += intersectPoints[i].y;
      }

      c.x /= intersectPoints.length;
      c.y /= intersectPoints.length;

      let maxDist = 0;
      for (let i = 0; i < intersectPoints.length; i++) {
        let dist = Math.sqrt(
          (intersectPoints[i].x - c.x) * (intersectPoints[i].x - c.x) +
            (intersectPoints[i].y - c.y) * (intersectPoints[i].y - c.y)
        );
        maxDist = Math.max(maxDist, dist);
      }

      return maxDist <= 110;
    };

    let checkReflectionConsistency = async function () {
      for (let i = 0; i < reflectionConstraints.length; i++) {
        reflectionConstraints[i].inInconsistentSet = false;
      }

      let intersectPoints = [];
      let cnt = 0;

      for (let i = 0; i < reflectionConstraints.length; i++) {
        if (reflectionConstraints[i].show) {
          for (let j = i + 1; j < reflectionConstraints.length; j++) {
            if (reflectionConstraints[j].show) {
              cnt++;
              let norm1 = reflectionConstraints[i].line.norm;
              let point1 = reflectionConstraints[i].line.point;
              let norm2 = reflectionConstraints[j].line.norm;
              let point2 = reflectionConstraints[j].line.point;
              let a1 = norm1.x,
                b1 = norm1.y,
                c1 = -norm1.x * point1.x - norm1.y * point1.y;
              let a2 = norm2.x,
                b2 = norm2.y,
                c2 = -norm2.x * point2.x - norm2.y * point2.y;
              let d = a1 * b2 - a2 * b1;
              if (Math.abs(d) > 1e-9) {
                let p = {
                  x: (b1 * c2 - b2 * c1) / d,
                  y: (c1 * a2 - c2 * a1) / d,
                };
                intersectPoints.push(p);
                console.log(p);
              }
            }
          }
        }
      }

      if (cnt == 0) {
        return true;
      }

      if (intersectPoints.length == 0) {
        return false;
      }

      let c = {
        x: 0,
        y: 0,
      };

      for (let i = 0; i < intersectPoints.length; i++) {
        c.x += intersectPoints[i].x;
        c.y += intersectPoints[i].y;
      }

      c.x /= intersectPoints.length;
      c.y /= intersectPoints.length;

      let maxDist = 0;
      for (let i = 0; i < intersectPoints.length; i++) {
        let dist = Math.sqrt(
          (intersectPoints[i].x - c.x) * (intersectPoints[i].x - c.x) +
            (intersectPoints[i].y - c.y) * (intersectPoints[i].y - c.y)
        );
        maxDist = Math.max(maxDist, dist);
      }

      console.log(maxDist);

      if (maxDist > 110) {
        let arr = [];
        for (let i = 0; i < reflectionConstraints.length; i++) {
          if (reflectionConstraints[i].show) {
            arr.push({
              data: reflectionConstraints[i],
              id: i,
            });
          }
        }

        let inconsistentSet = [];
        if (arr.length >= 2) {
          let id = Math.floor(Math.random() * arr.length);
          inconsistentSet.push(arr[id]);
          arr.splice(id, 1);

          id = Math.floor(Math.random() * arr.length);
          inconsistentSet.push(arr[id]);
          arr.splice(id, 1);

          while (consistentSet(inconsistentSet)) {
            id = Math.floor(Math.random() * arr.length);
            inconsistentSet.push(arr[id]);
            arr.splice(id, 1);
          }

          for (let i = 0; i < inconsistentSet.length; i++) {
            reflectionConstraints[
              inconsistentSet[i].id
            ].inInconsistentSet = true;
          }
        }
        return false;
      }

      return true;
    };

    watch(
      () => props.tool,
      () => {
        console.log("tool change " + props.tool);
        clickedPoints = [];
        drawCanvas(true);
        if (props.tool == "addReflectionConstraint") {
          imageView.value.style.cursor = "crosshair";
          notify({
            title: "Step 1: Select a point in an object",
          });
        } else {
          imageView.value.style.cursor = "default";
        }
      }
    );

    watch(
      () => props.horizontalState,
      () => {
        console.log("horizontalState change");
        horizontalColor.value = props.color;
        drawCanvas(true);
      }
    );

    watch(
      () => props.verticalState,
      () => {
        console.log("verticalState change");
        verticalColor.value = props.color;
        drawCanvas(true);
      }
    );

    return {
      imageView,
      imageZoom,
      isFinished,
      horizontalColor,
      verticalColor,
      clickedPoints,
      reflectionConstraints,
      handleClick,
      handleMousemove,
      resetImage,
      checkReflectionConsistency,
      toggleDisplayReflectionConstraint,
    };
  },
};
</script>
