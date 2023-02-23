import { defineAsyncComponent } from "vue";

export function registerGlobalComponent(app) {
  app.component(
    "default-layout",
    defineAsyncComponent(() => import("../layouts/DefaultLayout"))
  );

  app.component(
    "analysis-layout",
    defineAsyncComponent(() => import("../layouts/AnalysisLayout"))
  );

  app.component(
    "tutorial-layout",
    defineAsyncComponent(() => import("../layouts/TutorialLayout"))
  );
}
