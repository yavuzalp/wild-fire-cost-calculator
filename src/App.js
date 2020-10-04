import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Draw from '@urbica/react-map-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Source, Layer, CustomLayer } from '@urbica/react-map-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';

function App() {
  {/*}
  var myConfObj = {
    iframeMouseOver : false
  }
  window.addEventListener('blur',function(){
    if(myConfObj.iframeMouseOver){
      console.log('Wow! Iframe Click!');
    }
  });
  
  document.getElementById('map').addEventListener('mouseover',function(){
     myConfObj.iframeMouseOver = true;
  });
  document.getElementById('map').addEventListener('mouseout',function(){
      myConfObj.iframeMouseOver = false;
  }); */}
  
  const [viewport, setViewport] = useState({
    latitude: 39.565055, 
    longitude: -102.264490,
    zoom: 4
  });
  const [position, setPosition] = useState('top-left');
  const myDeckLayer = new MapboxLayer({
    id: 'my-scatterplot',
    type: ScatterplotLayer,
    data: [{ position: [-74.5, 40], size: 1000 }],
    getPosition: (d) => d.position,
    getRadius: (d) => d.size,
    getColor: [255, 0, 0],
    onClick:(e) => console.log(e)
  });
  
  return (
    <div className="App">
      <header className="App-headline">
        <h1>
            Welcome to Wild Fire Economical Cost Simulator
        </h1>
      </header>
      <header className="App-header">
        {//<img src={logo} className="App-logo" alt="logo" />}
        }
        <>
          <select onChange={(e) => setPosition(e.target.value)}>
            <option value='top-left'>top-left</option>
            <option value='top-right'>top-right</option>
          </select>
          <MapGL
            style={{ width: '100%', height: '800px' }}
            mapStyle='mapbox://styles/mapbox/dark-v9'
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            zoom={viewport.zoom}
            onViewportChange={setViewport}
            accessToken='pk.eyJ1IjoieWF2dXphbHAiLCJhIjoiY2tmdGcxNmplMDk3aDJxcTZmc3EzaWZwaSJ9.YPqh1B61pKugamU81EK7gA'
          >
            <Source id='route' type='geojson' data='https://opendata.arcgis.com/datasets/5da472c6d27b4b67970acc7b5044c862_0.geojson' />
            <Layer
              id='route'
              type='line'
              source='route'
              layout={{
                'line-join': 'round',
                'line-cap': 'round'
              }}
              paint={{
                'line-color': '#8b0000',
                'line-width': 8
              }}
              onClick={(e) => console.log(e)}

            />
            <CustomLayer 
            layer={myDeckLayer} 
            />
          </MapGL>
          {/*
          <div className="embed-container">
            <iframe
            name="map"
            width='1600px'
            height="800px"
            frameborder="0"
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            title="Wild Fires"
            src="//learngis2.maps.arcgis.com/apps/Embed/index.html?webmap=2a1b042440eb457f8e4f420d28fd2ad0&extent=-114.6052,32.858,-82.8547,46.7674&zoom=true&previewImage=false&scale=true&search=true&searchextent=true&basemap_gallery=true&disable_scroll=true&theme=light"
            //onClick={e=>{console.log("Burada ne oluyor", e)}}
            onSubmit={(e)=>{console.log("Burada ne oluyor", e)}}
            >
            </iframe>
          </div>
          <p></p>
            {console.log("birseyler aliyormuyuz ", document)}
            {setInterval(console.log("document: ", document.getElementsByClassName('contentPane')), 5)}
            {/*setInterval(() => console.log("document: ", document.getElementsByClassName('mainSection'.toString())), 1000)*/}
            {/*dijit.byId*/}
          
        </>
      </header>
    </div>
  );
}

export default App;
