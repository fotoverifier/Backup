import { createRouter, createWebHistory } from "vue-router";
import UploadView from "../views/UploadView.vue";
import ImageInformationView from "../views/ImageInformationView.vue";
import MoreToolsView from "../views/MoreToolsView.vue";
import ShadowConsistencyView from "../views/ShadowConsistencyView.vue";
import ReflectionConsistencyView from "../views/ReflectionConsistencyView.vue";
import TutorialView from "../views/TutorialView.vue";
import TutorialHomeView from "../views/TutorialHomeView.vue";
import InteractiveTutorialView from "../views/InteractiveTutorialView.vue";
import CopyMoveTutorialView from "../views/CopyMoveTutorialView.vue";
import IframeView from "../views/IframeView.vue";
import DemoCopyMoveUploadView from "../views/Demo/CopyMove/UploadView.vue";
import DemoDefaultView from "../views/Demo/DefaultView.vue";
import DemoCopyMoveImageInformationView from "../views/Demo/CopyMove/ImageInformationView.vue";
import JpegGhostTutorialView from "../views/JpegGhostTutorialView.vue";
import DemoJpegGhostUploadView from "../views/Demo/JpegGhost/UploadView.vue";
import DemoJpegGhostImageInformationView from "../views/Demo/JpegGhost/ImageInformationView.vue";
import CFATutorialView from "../views/CFATutorialView.vue";
import DemoCFAUploadView from "../views/Demo/CFA/UploadView.vue";
import DemoCFAImageInformationView from "../views/Demo/CFA/ImageInformationView.vue";
import ShadowConsistencyTutorialView from "../views/ShadowConsistencyTutorialView.vue";
import DemoShadowConsistencyUploadView from "../views/Demo/ShadowConsistency/UploadView.vue";
import DemoShadowConsistencyImageInformationView from "../views/Demo/ShadowConsistency/ImageInformationView.vue";
import ReflectionConsistencyTutorialView from "../views/ReflectionConsistencyTutorialView.vue";
import DemoReflectionConsistencyUploadView from "../views/Demo/ReflectionConsistency/UploadView.vue";
import DemoReflectionConsistencyImageInformationView from "../views/Demo/ReflectionConsistency/ImageInformationView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "upload" },
  },
  {
    path: "/demo-reflection-consistency/upload",
    name: "demo-reflection-consistency-upload",
    component: DemoReflectionConsistencyUploadView,
  },
  {
    path: "/demo-shadow-consistency/upload",
    name: "demo-shadow-consistency-upload",
    component: DemoShadowConsistencyUploadView,
  },
  {
    path: "/demo-cfa/upload",
    name: "demo-cfa-upload",
    component: DemoCFAUploadView,
  },
  {
    path: "/demo-jpeg-ghost/upload",
    name: "demo-jpeg-ghost-upload",
    component: DemoJpegGhostUploadView,
  },
  {
    path: "/demo-copy-move/upload",
    name: "demo-copy-move-upload",
    component: DemoCopyMoveUploadView,
  },
  {
    path: "/demo-cfa/image-information",
    name: "demo-cfa-image-information",
    component: DemoCFAImageInformationView,
  },
  {
    path: "/demo-reflection-consistency/image-information",
    name: "demo-reflection-consistency-image-information",
    component: DemoReflectionConsistencyImageInformationView,
  },
  {
    path: "/demo-shadow-consistency/image-information",
    name: "demo-shadow-consistency-image-information",
    component: DemoShadowConsistencyImageInformationView,
  },
  {
    path: "/demo-jpeg-ghost/image-information",
    name: "demo-jpeg-ghost-image-information",
    component: DemoJpegGhostImageInformationView,
  },
  {
    path: "/demo-copy-move/image-information",
    name: "demo-copy-move-image-information",
    component: DemoCopyMoveImageInformationView,
  },
  {
    path: "/demo-default",
    name: "demo-default",
    component: DemoDefaultView,
  },
  {
    path: "/image-information",
    name: "image-information",
    redirect: { name: "exif-metadata" },
    meta: {
      layout: "analysis-layout",
    },
    children: [
      {
        path: "exif-metadata",
        name: "exif-metadata",
        meta: {
          layout: "analysis-layout",
        },
        component: ImageInformationView,
      },
      {
        path: "geo-tags",
        name: "geo-tags",
        meta: {
          layout: "analysis-layout",
        },
        component: ImageInformationView,
      },
      {
        path: "thumbnail-analysis",
        name: "thumbnail-analysis",
        meta: {
          layout: "analysis-layout",
        },
        component: ImageInformationView,
      },
      {
        path: "jpeg-analysis",
        name: "jpeg-analysis",
        meta: {
          layout: "analysis-layout",
        },
        component: ImageInformationView,
      },
      {
        path: "string-extraction",
        name: "string-extraction",
        meta: {
          layout: "analysis-layout",
        },
        component: ImageInformationView,
      },
    ],
    component: ImageInformationView,
  },
  {
    path: "/more-tools",
    name: "more-tools",
    meta: {
      layout: "analysis-layout",
    },
    component: MoreToolsView,
  },
  {
    path: "/shadow-consistency",
    name: "shadow-consistency",
    meta: {
      layout: "analysis-layout",
    },
    component: ShadowConsistencyView,
  },
  {
    path: "/reflection-consistency",
    name: "reflection-consistency",
    meta: {
      layout: "analysis-layout",
    },
    component: ReflectionConsistencyView,
  },
  {
    path: "/upload",
    name: "upload",
    component: UploadView,
  },
  {
    path: "/iframe",
    name: "iframe",
    component: IframeView,
  },
  {
    path: "/tutorial-home",
    name: "tutorial-home",
    component: TutorialHomeView,
  },
  {
    path: "/interactive-tutorial",
    name: "interactive-tutorial",
    component: InteractiveTutorialView,
  },
  {
    path: "/copy-move-tutorial",
    name: "copy-move-tutorial",
    component: CopyMoveTutorialView,
  },
  {
    path: "/jpeg-ghost-tutorial",
    name: "jpeg-ghost-tutorial",
    component: JpegGhostTutorialView,
  },
  {
    path: "/cfa-tutorial",
    name: "cfa-tutorial",
    component: CFATutorialView,
  },
  {
    path: "/shadow-consistency-tutorial",
    name: "shadow-consistency-tutorial",
    component: ShadowConsistencyTutorialView,
  },
  {
    path: "/reflection-consistency-tutorial",
    name: "reflection-consistency-tutorial",
    component: ReflectionConsistencyTutorialView,
  },
  {
    path: "/tutorial",
    name: "tutorial",
    redirect: { name: "ela-brightness-contrast" },
    meta: {
      layout: "tutorial-layout",
    },
    component: TutorialView,
    children: [
      {
        path: "ela",
        meta: {
          layout: "tutorial-layout",
        },
        children: [
          {
            path: "brightness-contrast",
            name: "ela-brightness-contrast",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "edge",
            name: "ela-edge",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "jpeg-compression",
            name: "ela-jpeg-compression",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "how-to-use",
            name: "ela-how-to-use",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "challenge",
            meta: {
              layout: "tutorial-layout",
            },
            children: [
              {
                path: "normal",
                name: "ela-challenge-normal",
                meta: {
                  layout: "tutorial-layout",
                },
                component: TutorialView,
              },
              {
                path: "multiple-compression",
                name: "ela-challenge-multiple-compression",
                meta: {
                  layout: "tutorial-layout",
                },
                component: TutorialView,
              },
            ],
            component: TutorialView,
          },
        ],
        component: TutorialView,
      },
      {
        path: "jpeg-ghost",
        meta: {
          layout: "tutorial-layout",
        },
        children: [
          {
            path: "how-to-use",
            name: "jpeg-ghost-how-to-use",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "challenge",
            meta: {
              layout: "tutorial-layout",
            },
            children: [
              {
                path: "ela-to-jpeg-ghost",
                name: "jpeg-ghost-challenge-ela-to-jpeg-ghost",
                meta: {
                  layout: "tutorial-layout",
                },
                component: TutorialView,
              },
            ],
            component: TutorialView,
          },
        ],
        component: TutorialView,
      },
      {
        path: "shadow-consistency",
        meta: {
          layout: "tutorial-layout",
        },
        children: [
          {
            path: "shadow",
            name: "shadow-consistency-shadow",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "check-shadow-consistency",
            name: "shadow-consistency-check-shadow-consistency",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "challenge",
            meta: {
              layout: "tutorial-layout",
            },
            children: [
              {
                path: "normal",
                name: "shadow-consistency-challenge-normal",
                meta: {
                  layout: "tutorial-layout",
                },
                component: TutorialView,
              },
            ],
            component: TutorialView,
          },
        ],
        component: TutorialView,
      },
      {
        path: "image-information",
        meta: {
          layout: "tutorial-layout",
        },
        children: [
          {
            path: "metadata",
            name: "image-information-metadata",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "gps",
            name: "image-information-gps",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "exif-metadata-geo-tags",
            name: "image-information-exif-metadata-geo-tags",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "thumbnail-analysis",
            name: "image-information-thumbnail-analysis",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "challenge",
            meta: {
              layout: "tutorial-layout",
            },
            children: [
              {
                path: "metadata-1",
                name: "image-information-challenge-metadata-1",
                meta: {
                  layout: "tutorial-layout",
                },
                component: TutorialView,
              },
              {
                path: "metadata-2",
                name: "image-information-challenge-metadata-2",
                meta: {
                  layout: "tutorial-layout",
                },
                component: TutorialView,
              },
            ],
            component: TutorialView,
          },
        ],
        component: TutorialView,
      },
      {
        path: "histogram",
        meta: {
          layout: "tutorial-layout",
        },
        children: [
          {
            path: "histogram",
            name: "histogram-histogram",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "double-jpeg",
            name: "histogram-double-jpeg",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "how-to-use",
            name: "histogram-how-to-use",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "challenge",
            meta: {
              layout: "tutorial-layout",
            },
            children: [
              {
                path: "hist-1",
                name: "histogram-challenge-hist-1",
                meta: {
                  layout: "tutorial-layout",
                },
                component: TutorialView,
              },
              {
                path: "hist-2",
                name: "histogram-challenge-hist-2",
                meta: {
                  layout: "tutorial-layout",
                },
                component: TutorialView,
              },
            ],
            component: TutorialView,
          },
        ],
        component: TutorialView,
      },
      {
        path: "noise-median-inconsistencies",
        meta: {
          layout: "tutorial-layout",
        },
        children: [
          {
            path: "noise",
            name: "noise-median-inconsistencies-noise",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "median-filter",
            name: "noise-median-inconsistencies-median-filter",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
          {
            path: "how-to-use",
            name: "noise-median-inconsistencies-how-to-use",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
        ],
        component: TutorialView,
      },
      {
        path: "reverse-image-search",
        meta: {
          layout: "tutorial-layout",
        },
        children: [
          {
            path: "how-to-use",
            name: "reverse-image-search-how-to-use",
            meta: {
              layout: "tutorial-layout",
            },
            component: TutorialView,
          },
        ],
        component: TutorialView,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    meta: {
      layout: "auth-layout",
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
