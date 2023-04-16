import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
 .ant-btn-primary[type='button']{
      background: #1890ff !important;
 }

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.ant-select-dropdown {
   text-align: right;
  }
.react-confirm-alert-overlay{
  background: #00000055;
}
.leaflet-control-attribution.leaflet-control :first-child {
  opacity: 0 !important;
  width: 0;
  visibility: hidden;
  display: none;
}
.leaflet-control-attribution.leaflet-control::before{
content: 'mehraman';
}

`
