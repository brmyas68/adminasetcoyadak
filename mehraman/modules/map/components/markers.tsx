import { FC, useEffect, useState } from 'react'
import { Marker, Popup, useMap, useMapEvent } from 'react-leaflet'
import L, { LatLng, LatLngBounds, LatLngExpression, LatLngTuple } from 'leaflet'
import { iranGeo } from 'constants/iranGeo'

export const MapMarkers: FC = () => {
  const [long, setLong] = useState<number>(53.030919)
  const [lat, setLat] = useState<number>(36.551697)
  const map = useMap()
  useMapEvent('click', e => {
    setLat(e.latlng.lat)
    setLong(e.latlng.lng)

    map.setView([e.latlng.lat, e.latlng.lng])
    console.log([e.latlng.lat, e.latlng.lng])
  })

  useEffect(() => {
    // L.geoJSON(iranGeo as any, {}).addTo(map)
    var fit1: LatLngTuple = [40.11316639765884, 43.154296875]
    var fit2: LatLngTuple = [23.327016709211858, 64.07226562500001]
    map.setMaxBounds([fit1, fit2])
    // map.fitBounds([fit1, fit2])
  }, [map])

  return (
    <>
      <Marker position={[lat, long]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </>
  )
}
