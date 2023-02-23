import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Notifications from "@kyvg/vue3-notification";

import { registerGlobalComponent } from "./utils/import";

const app = createApp(App);

app.use(Notifications);

registerGlobalComponent(app);
app.use(router).mount("#app");
