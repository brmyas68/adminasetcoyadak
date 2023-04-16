import { MapContainer, Marker, Popup, TileLayer, useMap, Polygon, Circle, useMapEvent } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { MapMarkers } from './components/markers'
import { Ref, useEffect, useState } from 'react'

export default function MehramanApp() {
  const [long, setLong] = useState<number>()
  const [lat, setLat] = useState<number>()
  const [userPosition, setUserPosition] = useState<{ lat: number; long: number }>({ lat: 0, long: 0 })
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setLong(position.coords.longitude)
        setLat(position.coords.latitude)
      },
      e => console.log(e),
    )
    navigator.geolocation.watchPosition(
      function (position) {
        setUserPosition({ lat: position.coords.latitude, long: position.coords.longitude })
      },
      e => console.log(e),
    )
  })

  return (
    <div>
      <MapContainer
        center={[lat || 36.551697, long || 53.030919]}
        zoom={16}
        scrollWheelZoom={true}
        style={{ width: '100vw', height: '90vh' }}
        fadeAnimation={true}
        maxBoundsViscosity={0}
        minZoom={7}
        maxZoom={18}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={[userPosition.lat, userPosition.long]}
          bubblingMouseEvents={true}
          dashArray={[userPosition.lat, userPosition.long]}
        />
        {/* <Marker position={[lat, long]} autoPan  >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        {/* <Polygon positions={[[lat, long]]} /> */}
        <MapMarkers />
      </MapContainer>
    </div>
  )
}
