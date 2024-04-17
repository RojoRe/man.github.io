import { Fragment, useState } from "react";
import {GoogleMap,InfoWindowF,MarkerF,useLoadScript,}
from "@react-google-maps/api";


const markers = [
  {
    id: 1,
    name: "Qobustan",
    position: { lat: 40.0709493, lng: 49.3694411 },
  },
  {
    id: 2,
    name: "Sumqayit",
    position: { lat: 40.5788843, lng: 49.5485073 },
  },
  {
    id: 3,
    name: "Baku",
    position: { lat: 40.3947365, lng: 49.6898045 },
  }
]

function App() {

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY
  })

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return (
    <Fragment>
      <div className="container">
        <h1 className="text-center">Vite + React | Google Map Markers</h1>
        <div style={{width: "100%", height: "90vh"}}>
        {
          isLoaded ? ( <GoogleMap center={{lat: 40.3947365, lng:49.6898045 }}zoom={10}
            onClick={() => setActiveMarker(null)}
         mapContainerStyle={{width:"100%", height:"90vh"}}>
          {
            markers.map(({ id, name, position }) =>(
                <MarkerF 
                  key={id}
                  position={position}
                  onClick={() => handleActiveMarker(id)}
                  icon={{
                    url: "https://as1.ftcdn.net/v2/jpg/02/68/10/70/1000_F_268107074_MnNbG7l6oPqFr2x8ZqAXWpP9poSi42dG.jpg",
                    scaledSize: {width: 25, height: 25}
                }}
              >
                {activeMarker === id ? (<InfoWindowF
                    onCloseClick={() => setActiveMarker(null)}>
                      <div>
                        <p>{name}</p>
                        </div>

                  </InfoWindowF>) : null}
              </MarkerF>
            ))}
         </GoogleMap> ) : null}
        </div>
      </div>
    </Fragment>
  )
}

export default App
