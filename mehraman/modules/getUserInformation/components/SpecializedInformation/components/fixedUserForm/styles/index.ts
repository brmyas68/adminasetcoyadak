import styled from 'styled-components'

export const MapPlacePurchaseBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px 0px;
  gap: 15px;
  width: 100%;
  min-height: 424px;

  .leaflet-container {
    max-width: 100% !important;
    height: 269px !important;
    border: 2px solid #bfbfbf;
    filter: drop-shadow(0px 15px 60px rgba(0, 0, 0, 0.05));
    border-radius: 12px;
  }
`
