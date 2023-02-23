<template>
  <h4><b>Overview</b></h4>

  <p class="text">
    GPS (Global Positioning System) information, which can be captured by many
    mobile devices including smartphones and tablets, can help identify where
    the photo was taken.
  </p>

  <h4><b>Evaluating GPS Data</b></h4>

  <p class="text">
    While it is unlikely to accurately identify a precise location where a photo
    was captured, it can identify a country, city, or general area. This,
    together with landmarks and satellite photo services like Google Maps, Bing
    Maps, and MapQuest, can help narrow down a location and direction.
  </p>

  <p class="text">
    According to FotoForensics, three main things to remember about GPS data:
  </p>
  <ul>
    <li>In general, pictures rarely contain GPS location information.</li>
    <li>
      When GPS data exists, it identifies a position near the camera's location,
      but not necessarily the exact location. The GPS data may be off by a mile.
    </li>
    <li>
      When a photo shows a room inside a building and the GPS position is
      adjacent to the outside of a building, the actual location is likely
      through the nearest window, inside the building (in this case, "adjacent"
      means "if you were standing there, then you could probably touch the
      building").
    </li>
  </ul>
</template>

<script>
export default {
  emits: ["setTitle"],
  setup(props, context) {
    context.emit("setTitle", {
      title: "What is GPS Metadata?",
    });
  },
};
</script>
