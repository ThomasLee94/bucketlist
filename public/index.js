map.on("load", function () {
  /* Image: An image is loaded and added to the map. */
  map.loadImage("https://i.imgur.com/MK4NUzI.png", function(error, image) {
    if (error) throw error;
    map.addImage("custom-marker", image);
    /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
    map.addLayer({
      id: "markers",
      type: "symbol",
    /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
    source: {
      type: "geojson",
      data: {
        type: 'FeatureCollection',
        features: [
      {
      type: 'Feature',
      properties: {},
      geometry: {
        type: "Point",
        coordinates: [-77.2814, 39.8486]
      }
      }
      ]
      }
    },
  layout: {
  "icon-image": "custom-marker",
  }
  });
  });
  });