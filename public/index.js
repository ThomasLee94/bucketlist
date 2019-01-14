map.on('load', function() {
  map.loadImage('/Users/StudentLoaner3/Desktop/repos/bucketlist/images/Pin, Locate, Marker, Location, Navigation (1).png', function(error, image) {
      if (error) throw error;
      map.addImage('pin', image);
      map.addLayer({
          "id": "points",
          "type": "symbol",
          "source": {
              "type": "geojson",
              "data": {
                  "type": "FeatureCollection",
                  "features": [{
                      "type": "Feature",
                      "geometry": {
                          "type": "Point",
                          "coordinates": [-122.4194, 37.7749]
                      }
                  }]
              }
          },
          "layout": {
              "icon-image": "pin",
              "icon-size": 0.25
          }
      });
  });
});