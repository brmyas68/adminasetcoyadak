import { Typography } from 'antd'
import React, { FC } from 'react'
import { MapPlacePurchaseBox } from './fixedUserForm/styles'
import { MapContainer, TileLayer } from 'react-leaflet'
import { MapMarkers } from './markers'

import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

interface IProps {
  title?: string
}

const MapPlacePurchase: FC<IProps> = ({ title = 'محل کسب' }) => {
  return (
    <MapPlacePurchaseBox>
      <Typography.Title level={5}>انتخاب {title}</Typography.Title>
      <Typography.Text>لطفا {title} خود را بر روی نقشه مشخص کنید</Typography.Text>
      {/* lat: 36.551697, long: 53.030919 */}
      <MapContainer center={[36.551697, 53.030919]} zoom={13} scrollWheelZoom={true} style={{ width: '100vw', height: '90vh' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapMarkers />
      </MapContainer>
    </MapPlacePurchaseBox>
  )
}

export default MapPlacePurchase
