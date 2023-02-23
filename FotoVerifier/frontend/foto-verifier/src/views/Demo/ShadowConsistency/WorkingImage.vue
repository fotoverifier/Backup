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
import { drawImageScaled } from "../../../utils/canvas.js";
import {
  isPointOnLine,
  isValidCastShadowConstraint,
  createCastShadowConstraint,
  isValidAttachedShadowConstraint,
  createAttachedShadowConstraint,
} from "../../../utils/shadowConstraint.js";
//import Swal from "sweetalert2";
import * as highs from "highs";
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
  emit: [
    "resetTool",
    "updateCastShadowConstraints",
    "updateAttachedShadowConstraints",
  ],
  setup(props, context) {
    let showHintCnt = 0;
    let imageView = ref(null);
    let isFinished = ref(false);
    let horizontalColor = ref("#ffffff");
    let verticalColor = ref("#ffffff");
    let clickedPoints = reactive([]);
    let castShadowConstraints = reactive([]);
    let tempCastShadowLines = reactive([]);
    let attachedShadowConstraints = reactive([]);
    let castShadowConstraintID = 0;
    let attachedShadowConstraintID = 0;
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

        for (let i = 0; i < castShadowConstraints.length; i++) {
          if (castShadowConstraints[i].show) {
            drawCastShadowConstraint(castShadowConstraints[i]);
          }
        }

        for (let i = 0; i < tempCastShadowLines.length; i++) {
          drawTempCastShadowLine(tempCastShadowLines[i]);
        }

        for (let i = 0; i < attachedShadowConstraints.length; ++i) {
          if (attachedShadowConstraints[i].show) {
            drawAttachedShadowConstraint(attachedShadowConstraints[i]);
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
      hintX = 914;
      hintY = 111;
      hasHintPoint = true;
      hintInterval = setInterval(() => {
        drawCanvas(true);
      }, 400);
    };

    let moveToStep6 = function () {
      clearInterval(hintInterval);
      step = 6;
      showHintCnt = 0;
      hintX = 948;
      hintY = 76;
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

    let moveToStep11 = function () {
      clearInterval(hintInterval);
      step = 11;
      showHintCnt = 0;
      hintX = 270;
      hintY = 148;
      hasHintPoint = true;
      hintInterval = setInterval(() => {
        drawCanvas(true);
      }, 400);
      context.emit("moveToStep11");
    };

    let moveToStep12 = function () {
      clearInterval(hintInterval);
      step = 12;
      showHintCnt = 0;
      hintX = 257;
      hintY = 205;
      hasHintPoint = true;
      hintInterval = setInterval(() => {
        drawCanvas(true);
      }, 400);
      context.emit("moveToStep12");
    };

    let moveToStep13 = function () {
      clearInterval(hintInterval);
      step = 13;
      hasHintPoint = false;
      context.emit("moveToStep13");
    };

    let drawAttachedShadowConstraint = function (constraint) {
      let p1 = constraint.direction.point;
      let p2 = constraint.direction.otherPoint;
      let ctx = imageView.value.getContext("2d");
      let dx = p2.x - p1.x;
      let dy = p2.y - p1.y;
      let headlen = 12; // length of head in pixels
      let angle = Math.atan2(dy, dx);
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#3498db";
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(
        p2.x - headlen * Math.cos(angle - Math.PI / 6),
        p2.y - headlen * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(
        p2.x - headlen * Math.cos(angle + Math.PI / 6),
        p2.y - headlen * Math.sin(angle + Math.PI / 6)
      );
      ctx.stroke();

      let a = p2.x - p1.x;
      let b = p2.y - p1.y;
      let A = {
        x: 0,
        y: (a * p1.x) / b + p1.y,
      };
      let B = {
        x: (b * p1.y) / a + p1.x,
        y: 0,
      };
      let C = {
        x: imageView.value.width,
        y: (-a * (imageView.value.width - p1.x)) / b + p1.y,
      };
      let D = {
        x: (-b * (imageView.value.height - p1.y)) / a + p1.x,
        y: imageView.value.height,
      };
      let arr = [A, B, C, D];
      for (let i = 0; i < arr.length; ++i) {
        for (let j = i + 1; j < arr.length; ++j) {
          if (
            arr[i].x >= 0 &&
            arr[i].x <= imageView.value.width &&
            arr[i].y >= 0 &&
            arr[i].y <= imageView.value.height &&
            arr[j].x >= 0 &&
            arr[j].x <= imageView.value.width &&
            arr[j].y >= 0 &&
            arr[j].y <= imageView.value.height
          ) {
            ctx.beginPath();
            ctx.setLineDash([5, 1]);
            ctx.moveTo(arr[i].x, arr[i].y);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#3498db";
            ctx.lineTo(arr[j].x, arr[j].y);
            ctx.stroke();
            return;
          }
        }
      }
    };

    let drawCastShadowConstraint = function (constraint) {
      let root = constraint.line1.point;
      let p1 = constraint.line1.otherPoint;
      let p2 = constraint.line2.otherPoint;
      let color = constraint.color;
      let ctx = imageView.value.getContext("2d");
      ctx.beginPath();
      ctx.setLineDash([]);
      ctx.moveTo(root.x, root.y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.lineTo(p1.x, p1.y);
      ctx.moveTo(root.x, root.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    };

    let drawTempCastShadowLine = function (line) {
      let ctx = imageView.value.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(line.p1.x, line.p1.y);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00AA00";
      ctx.lineTo(line.p2.x, line.p2.y);
      ctx.stroke();
    };

    let addCastShadowConstraintClick = function (x, y) {
      if (clickedPoints.length < 3) {
        clickedPoints.push({ x, y });
        if (clickedPoints.length == 1) {
          notify({
            title: "Step 2: Select one point on object casting the shadow",
          });
        } else if (clickedPoints.length == 2) {
          tempCastShadowLines.push({
            p1: clickedPoints[0],
            p2: { x, y },
          });
          drawCanvas(true);
          notify({
            title: "Step 3: Select another point on object casting the shadow",
          });
        } else if (clickedPoints.length == 3) {
          if (
            isValidCastShadowConstraint(
              clickedPoints[0],
              clickedPoints[1],
              clickedPoints[2]
            )
          ) {
            castShadowConstraintID++;
            let constraint = createCastShadowConstraint(
              clickedPoints[0],
              clickedPoints[1],
              clickedPoints[2],
              "#00AA00",
              castShadowConstraintID
            );
            castShadowConstraints.push(constraint);
            if (constraint.show) {
              drawCastShadowConstraint(constraint);
            }
            context.emit("updateCastShadowConstraints", castShadowConstraints);
          } else {
            notify({
              type: "error",
              title: "Error: Invalid cast shadow constraint",
            });
          }
          clickedPoints = [];
          context.emit("resetTool");
        }
      }
    };

    let dist = function (x1, y1, x2, y2) {
      return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };

    let addAttachedShadowConstraintPoint1 = function (x, y) {
      if (dist(x, y, hintX * ratio, hintY * ratio) <= 6) {
        clickedPoints.push({ x: hintX * ratio, y: hintY * ratio });
        moveToStep6();
      }
    };

    let addCastShadowConstraintPoint1 = function (x, y) {
      if (dist(x, y, hintX * ratio, hintY * ratio) <= 6) {
        clickedPoints.push({ x: hintX * ratio, y: hintY * ratio });
        moveToStep11();
      }
    };

    let addCastShadowConstraintPoint2 = function (x, y) {
      if (dist(x, y, hintX * ratio, hintY * ratio) <= 6) {
        clickedPoints.push({ x: hintX * ratio, y: hintY * ratio });
        tempCastShadowLines.push({
          p1: clickedPoints[0],
          p2: { x: hintX * ratio, y: hintY * ratio },
        });
        drawCanvas(true);
        moveToStep12();
      }
    };

    let addCastShadowConstraintPoint3 = function (x, y) {
      if (dist(x, y, hintX * ratio, hintY * ratio) <= 6) {
        moveToStep13();
        clickedPoints.push({ x: hintX * ratio, y: hintY * ratio });
        castShadowConstraintID++;
        let constraint = createCastShadowConstraint(
          clickedPoints[0],
          clickedPoints[1],
          clickedPoints[2],
          "#00AA00",
          castShadowConstraintID
        );
        castShadowConstraints.push(constraint);
        clickedPoints = [];
        tempCastShadowLines = [];
        drawCanvas(true);
      }
    };

    let addCastShadowConstraint = function (x1, y1, x2, y2, x3, y3) {
      clickedPoints.push({ x: x1 * ratio, y: y1 * ratio });
      clickedPoints.push({ x: x2 * ratio, y: y2 * ratio });
      clickedPoints.push({ x: x3 * ratio, y: y3 * ratio });
      castShadowConstraintID++;
      let constraint = createCastShadowConstraint(
        clickedPoints[0],
        clickedPoints[1],
        clickedPoints[2],
        "#00AA00",
        castShadowConstraintID
      );
      castShadowConstraints.push(constraint);
      clickedPoints = [];
      tempCastShadowLines = [];
      drawCanvas(true);
    };

    let moveToStep15 = function () {
      step = 15;
      addCastShadowConstraint(465, 331, 647, 267, 652, 290);
    };

    let moveToStep18 = function () {
      step = 18;
      addCastShadowConstraint(253, 450, 431, 398, 434, 426);
      addCastShadowConstraint(561, 446, 747, 396, 749, 423);
    };

    let addAttachedShadowConstraintPoint2 = function (x, y) {
      if (dist(x, y, hintX * ratio, hintY * ratio) <= 6) {
        moveToStep7();
        clickedPoints.push({ x: hintX * ratio, y: hintY * ratio });
        attachedShadowConstraintID++;
        let constraint = createAttachedShadowConstraint(
          clickedPoints[0],
          clickedPoints[1],
          "#3498db",
          imageView.value.width,
          imageView.value.height,
          attachedShadowConstraintID
        );
        attachedShadowConstraints.push(constraint);
        drawCanvas();
        clickedPoints = [];
      }
    };

    let addAttachedShadowConstraintClick = function (x, y) {
      if (clickedPoints.length < 2) {
        clickedPoints.push({ x, y });
        if (clickedPoints.length == 1) {
          notify({
            title: "Step 2: Select a point direction to the light",
          });
        } else if (clickedPoints.length == 2) {
          if (
            isValidAttachedShadowConstraint(clickedPoints[0], clickedPoints[1])
          ) {
            attachedShadowConstraintID++;
            let constraint = createAttachedShadowConstraint(
              clickedPoints[0],
              clickedPoints[1],
              "#3498db",
              imageView.value.width,
              imageView.value.height,
              attachedShadowConstraintID
            );
            attachedShadowConstraints.push(constraint);
            if (constraint.show) {
              drawAttachedShadowConstraint(constraint);
            }
            context.emit(
              "updateAttachedShadowConstraints",
              attachedShadowConstraints
            );
          } else {
            notify({
              type: "error",
              title: "Error: Invalid attached shadow constraint",
            });
          }
          clickedPoints = [];
          context.emit("resetTool");
        }
      }
    };

    let eraserClick = function (x, y) {
      for (let i = 0; i < castShadowConstraints.length; i++) {
        let constraints = castShadowConstraints[i];
        if (!constraints.show) {
          continue;
        }
        let line1 = constraints.line1;
        let line2 = constraints.line2;
        if (isPointOnLine(x, y, line1) || isPointOnLine(x, y, line2)) {
          castShadowConstraints.splice(i, 1);
          drawCanvas(true);
          context.emit("updateCastShadowConstraints", castShadowConstraints);
          return;
        }
      }

      for (let i = 0; i < attachedShadowConstraints.length; ++i) {
        let constraints = attachedShadowConstraints[i];
        if (!constraints.show) {
          continue;
        }
        let line1 = constraints.direction;
        let line2 = constraints.line;
        if (isPointOnLine(x, y, line1) || isPointOnLine(x, y, line2)) {
          attachedShadowConstraints.splice(i, 1);
          drawCanvas(true);
          context.emit(
            "updateAttachedShadowConstraints",
            attachedShadowConstraints
          );
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

      if (props.tool == "addCastShadowConstraint") {
        addCastShadowConstraintClick(x, y);
      } else if (props.tool == "addAttachedShadowConstraint") {
        addAttachedShadowConstraintClick(x, y);
      } else if (props.tool == "eraser") {
        eraserClick(x, y);
      }

      if (step == 5) {
        addAttachedShadowConstraintPoint1(x, y);
      } else if (step == 6) {
        addAttachedShadowConstraintPoint2(x, y);
      } else if (step == 10) {
        addCastShadowConstraintPoint1(x, y);
      } else if (step == 11) {
        addCastShadowConstraintPoint2(x, y);
      } else if (step == 12) {
        addCastShadowConstraintPoint3(x, y);
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

        for (let i = 0; i < castShadowConstraints.length; i++) {
          let constraints = castShadowConstraints[i];
          if (!constraints.show) {
            continue;
          }
          let line1 = constraints.line1;
          let line2 = constraints.line2;
          if (isPointOnLine(x, y, line1) || isPointOnLine(x, y, line2)) {
            isOnConstraints = true;
            break;
          }
        }

        for (let i = 0; i < attachedShadowConstraints.length; ++i) {
          let constraints = attachedShadowConstraints[i];
          let line1 = constraints.direction;
          let line2 = constraints.line;
          if (isPointOnLine(x, y, line1) || isPointOnLine(x, y, line2)) {
            isOnConstraints = true;
            break;
          }
        }

        if (isOnConstraints) {
          imageView.value.style.cursor = "crosshair";
        } else {
          imageView.value.style.cursor = "default";
        }
      } else if (
        props.tool == "addCastShadowConstraint" ||
        step == 11 ||
        step == 12
      ) {
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
      } else if (props.tool == "addAttachedShadowConstraint" || step == 6) {
        if (clickedPoints.length > 0) {
          drawCanvas(true);
          setTimeout(() => {
            let root = clickedPoints[0];
            let ctx = imageView.value.getContext("2d");
            ctx.setLineDash([]);
            let dx = x - root.x;
            let dy = y - root.y;
            let headlen = 12; // length of head in pixels
            let angle = Math.atan2(dy, dx);
            ctx.beginPath();
            ctx.moveTo(root.x, root.y);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#3498db";
            ctx.lineTo(x, y);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(
              x - headlen * Math.cos(angle - Math.PI / 6),
              y - headlen * Math.sin(angle - Math.PI / 6)
            );
            ctx.lineTo(x, y);
            ctx.lineTo(
              x - headlen * Math.cos(angle + Math.PI / 6),
              y - headlen * Math.sin(angle + Math.PI / 6)
            );
            ctx.stroke();

            let p1 = root;
            let p2 = { x, y };
            let a = p2.x - p1.x;
            let b = p2.y - p1.y;
            let A = {
              x: 0,
              y: (a * p1.x) / b + p1.y,
            };
            let B = {
              x: (b * p1.y) / a + p1.x,
              y: 0,
            };
            let C = {
              x: imageView.value.width,
              y: (-a * (imageView.value.width - p1.x)) / b + p1.y,
            };
            let D = {
              x: (-b * (imageView.value.height - p1.y)) / a + p1.x,
              y: imageView.value.height,
            };
            let arr = [A, B, C, D];
            for (let i = 0; i < arr.length; ++i) {
              for (let j = i + 1; j < arr.length; ++j) {
                if (
                  arr[i].x >= 0 &&
                  arr[i].x <= imageView.value.width &&
                  arr[i].y >= 0 &&
                  arr[i].y <= imageView.value.height &&
                  arr[j].x >= 0 &&
                  arr[j].x <= imageView.value.width &&
                  arr[j].y >= 0 &&
                  arr[j].y <= imageView.value.height
                ) {
                  ctx.beginPath();
                  ctx.setLineDash([5, 1]);
                  ctx.moveTo(arr[i].x, arr[i].y);
                  ctx.lineWidth = 3;
                  ctx.strokeStyle = "#3498db";
                  ctx.lineTo(arr[j].x, arr[j].y);
                  ctx.stroke();
                  return;
                }
              }
            }
          }, 10);
        }
      }
    };

    let toggleDisplayCastShadowConstraint = function (id) {
      for (let i = 0; i < castShadowConstraints.length; ++i) {
        if (castShadowConstraints[i].id == id) {
          castShadowConstraints[i].show = !castShadowConstraints[i].show;
        }
      }
      drawCanvas(true);
    };

    let toggleDisplayAttachedShadowConstraint = function (id) {
      console.log("cadscdas" + id);
      for (let i = 0; i < attachedShadowConstraints.length; ++i) {
        if (attachedShadowConstraints[i].id == id) {
          attachedShadowConstraints[i].show =
            !attachedShadowConstraints[i].show;
        }
      }
      drawCanvas(true);
    };

    let consistentSet = async function (set) {
      let constrains = "";
      let id = 0;
      for (let i = 0; i < set.length; i++) {
        if (set[i].type == "cast") {
          let line1 = set[i].data.line1;
          let line2 = set[i].data.line2;

          id++;
          constrains += `c${id}: ${line1.norm.x} x1 + ${
            line1.norm.y
          } y1 + s${id} >= ${
            line1.norm.x * line1.point.x + line1.norm.y * line1.point.y
          }\n`;

          id++;
          constrains += `c${id}: ${line2.norm.x} x1 + ${
            line2.norm.y
          } y1 + s${id} >= ${
            line2.norm.x * line2.point.x + line2.norm.y * line2.point.y
          }\n`;
        } else if (set[i].type == "attached") {
          let p1 = set[i].data.direction.point;
          let p2 = set[i].data.direction.otherPoint;
          let norm = {
            x: p2.x - p1.x,
            y: p2.y - p1.y,
          };

          id++;
          constrains += `c${id}: ${norm.x} x1 + ${norm.y} y1 + s${id} >= ${
            norm.x * p1.x + norm.y * p1.y
          }\n`;
        }
      }

      let obj = "";

      for (let i = 1; i <= id; i++) {
        obj += `s${i}`;
        if (i < id) {
          obj += " + ";
        }
      }

      let bound = "";

      for (let i = 1; i <= id; i++) {
        bound += `0 <= s${i}\n`;
      }

      let problem = `
              Minimize
                  obj: ${obj}
              Subject To
                  ${constrains}
              Bounds
                  ${bound}
              End`;

      let highsPromise = await highs({
        locateFile: (file) => "/js/highs/" + file,
      });
      let solveResult = highsPromise.solve(problem);

      if (solveResult.Status != "Optimal") {
        return false;
      } else {
        let sum = 0;
        for (let i = 1; i <= id; i++) {
          sum += solveResult.Columns["s" + i].Primal;
        }
        if (Math.abs(sum) < 1e-9) {
          return true;
        } else {
          return false;
        }
      }
    };

    let resetImage = function () {
      clickedPoints = [];
      castShadowConstraints = [];
      tempCastShadowLines = [];
      attachedShadowConstraints = [];
      castShadowConstraintID = 0;
      attachedShadowConstraintID = 0;
      context.emit("updateCastShadowConstraints", castShadowConstraints);
      context.emit("updateAttachedShadowConstraints", castShadowConstraints);
      drawCanvas(true);
    };

    let checkShadowConsistency = async function () {
      for (let i = 0; i < castShadowConstraints.length; i++) {
        castShadowConstraints[i].inInconsistentSet = false;
      }

      for (let i = 0; i < attachedShadowConstraints.length; i++) {
        attachedShadowConstraints[i].inInconsistentSet = false;
      }

      let isConsistent = true;
      let constrains = "";
      let id = 0;
      for (let i = 0; i < castShadowConstraints.length; i++) {
        if (!castShadowConstraints[i].show) {
          continue;
        }
        let line1 = castShadowConstraints[i].line1;
        let line2 = castShadowConstraints[i].line2;

        id++;
        constrains += `c${id}: ${line1.norm.x} x1 + ${
          line1.norm.y
        } y1 + s${id} >= ${
          line1.norm.x * line1.point.x + line1.norm.y * line1.point.y
        }\n`;

        id++;
        constrains += `c${id}: ${line2.norm.x} x1 + ${
          line2.norm.y
        } y1 + s${id} >= ${
          line2.norm.x * line2.point.x + line2.norm.y * line2.point.y
        }\n`;
      }

      for (let i = 0; i < attachedShadowConstraints.length; i++) {
        if (!attachedShadowConstraints[i].show) {
          continue;
        }
        let p1 = attachedShadowConstraints[i].direction.point;
        let p2 = attachedShadowConstraints[i].direction.otherPoint;
        let norm = {
          x: p2.x - p1.x,
          y: p2.y - p1.y,
        };

        id++;
        constrains += `c${id}: ${norm.x} x1 + ${norm.y} y1 + s${id} >= ${
          norm.x * p1.x + norm.y * p1.y
        }\n`;
      }

      let obj = "";

      for (let i = 1; i <= id; i++) {
        obj += `s${i}`;
        if (i < id) {
          obj += " + ";
        }
      }

      let bound = "";

      for (let i = 1; i <= id; i++) {
        bound += `0 <= s${i}\n`;
      }

      let problem = `
              Minimize
                  obj: ${obj}
              Subject To
                  ${constrains}
              Bounds
                  ${bound}
              End`;
      //console.log(problem);

      if (id == 0) {
        isConsistent = true;
      } else {
        let highsPromise = await highs({
          locateFile: (file) => "/js/highs/" + file,
        });
        let solveResult = highsPromise.solve(problem);

        if (solveResult.Status != "Optimal") {
          isConsistent = false;
        } else {
          let sum = 0;
          for (let i = 1; i <= id; i++) {
            sum += solveResult.Columns["s" + i].Primal;
          }
          if (Math.abs(sum) < 1e-9) {
            isConsistent = true;
          } else {
            isConsistent = false;
          }
        }
      }

      /*if (isConsistent) {
        Swal.fire({
          icon: "success",
          title: "Consistency",
          text: "All selected shadows are consistent with one light source!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Inconsistency",
          text: "Some selected shadows are from another light source!",
        });
      }*/

      if (!isConsistent) {
        let arr = [];
        for (let i = 0; i < castShadowConstraints.length; i++) {
          if (castShadowConstraints[i].show) {
            arr.push({
              type: "cast",
              data: castShadowConstraints[i],
              id: i,
            });
          }
        }
        for (let i = 0; i < attachedShadowConstraints.length; i++) {
          if (attachedShadowConstraints[i].show) {
            arr.push({
              type: "attached",
              data: attachedShadowConstraints[i],
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

          while (await consistentSet(inconsistentSet)) {
            id = Math.floor(Math.random() * arr.length);
            inconsistentSet.push(arr[id]);
            arr.splice(id, 1);
          }

          for (let i = 0; i < inconsistentSet.length; i++) {
            if (inconsistentSet[i].type == "cast") {
              castShadowConstraints[
                inconsistentSet[i].id
              ].inInconsistentSet = true;
            } else if (inconsistentSet[i].type == "attached") {
              attachedShadowConstraints[
                inconsistentSet[i].id
              ].inInconsistentSet = true;
            }
          }
        }
      }

      context.emit("updateCastShadowConstraints", castShadowConstraints);
      context.emit(
        "updateAttachedShadowConstraints",
        attachedShadowConstraints
      );
      return isConsistent;
    };

    watch(
      () => props.tool,
      () => {
        console.log("tool change " + props.tool);
        clickedPoints = [];
        tempCastShadowLines = [];
        drawCanvas(true);
        if (props.tool == "addCastShadowConstraint") {
          imageView.value.style.cursor = "crosshair";
          notify({
            title: "Step 1: Select a point in cast shadow",
          });
        } else if (props.tool == "addAttachedShadowConstraint") {
          imageView.value.style.cursor = "crosshair";
          notify({
            title: "Step 1: Select a point in border of attached shadow",
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
      isFinished,
      clickedPoints,
      castShadowConstraints,
      handleClick,
      handleMousemove,
      resetImage,
      checkShadowConsistency,
      toggleDisplayCastShadowConstraint,
      toggleDisplayAttachedShadowConstraint,
      moveToStep5,
      moveToStep10,
      moveToStep15,
      moveToStep18,
    };
  },
};
</script>
