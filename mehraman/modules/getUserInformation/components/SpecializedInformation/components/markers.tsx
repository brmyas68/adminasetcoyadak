import { useSpecializedInformationCtx } from 'modules/getUserInformation/context'
import { FC, useEffect, useState } from 'react'
import { Marker, Popup, useMapEvent } from 'react-leaflet'

interface IMapMarker {}

export const MapMarkers: FC<IMapMarker> = () => {
  // const { selectedPosition } = useSelector(selectedMapPosition)
  const { states } = useSpecializedInformationCtx()
  const [positionMap, setPositionMap] = useState<{ lat: number; long: number }>({ lat: 36.551697, long: 53.030919 })
  // 36.551697, 53.030919
  useMapEvent('click', e => {
    setPositionMap({ lat: e.latlng.lat, long: e.latlng.lng })
  })

  return (
    <Marker position={[positionMap.lat, positionMap.long]} ref={states.mapRef as any}>
      <Popup>محل کسب کار شما</Popup>
    </Marker>
  )
}
