<template>
  <table class="table color-picker">
    <tbody>
      <tr v-for="i in colors.length / 6" :key="i">
        <td
          v-for="(item, index) in colors.slice(6 * (i - 1), 6 * i)"
          :key="index"
        >
          <div
            class="content"
            v-bind:class="[{ active: item.isActive }, item.type]"
            v-bind:style="{ background: item.code }"
            @click="chooseColor(6 * (i - 1) + index)"
          >
            &nbsp;
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { reactive } from "vue";

export default {
  emits: ["changeColor"],
  setup(props, context) {
    let colors = reactive([
      {
        code: "#ffffff",
        type: "bright",
        isActive: true,
      },
      {
        code: "#c3c3c3",
        type: "bright",
        isActive: false,
      },
      {
        code: "#585858",
        type: "dark",
        isActive: false,
      },
      {
        code: "#000000",
        type: "dark",
        isActive: false,
      },
      {
        code: "#88001b",
        type: "dark",
        isActive: false,
      },
      {
        code: "#ec1c24",
        type: "bright",
        isActive: false,
      },
      {
        code: "#ff7f27",
        type: "bright",
        isActive: false,
      },
      {
        code: "#ffca18",
        type: "bright",
        isActive: false,
      },
      {
        code: "#fdeca6",
        type: "bright",
        isActive: false,
      },
      {
        code: "#fff200",
        type: "bright",
        isActive: false,
      },
      {
        code: "#c4ff0e",
        type: "bright",
        isActive: false,
      },
      {
        code: "#0ed145",
        type: "bright",
        isActive: false,
      },
      {
        code: "#8cfffb",
        type: "bright",
        isActive: false,
      },
      {
        code: "#00a8f3",
        type: "bright",
        isActive: false,
      },
      {
        code: "#3f48cc",
        type: "bright",
        isActive: false,
      },
      {
        code: "#b83dba",
        type: "bright",
        isActive: false,
      },
      {
        code: "#ffaec8",
        type: "bright",
        isActive: false,
      },
      {
        code: "#b97a56",
        type: "bright",
        isActive: false,
      },
    ]);

    let chooseColor = function (index) {
      colors.forEach((color) => (color.isActive = false));
      colors[index].isActive = true;
      context.emit("changeColor", colors[index].code);
    };

    let resetColor = function () {
      chooseColor(0);
    };

    return { colors, chooseColor, resetColor };
  },
};
</script>

<style>
.color-picker td {
  width: 10%;
  position: relative;
}

.color-picker td:after {
  content: "";
  display: block;
  margin-top: 100%;
}
.color-picker td .content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.color-picker td .bright:hover {
  border: 2px solid black;
}

.color-picker td.dark:hover {
  border: 2px solid #bdc3c7;
}

.color-picker td .active.bright {
  border: 2px solid black;
}

.color-picker td .active.dark {
  border: 2px solid #bdc3c7 !important;
}
</style>
