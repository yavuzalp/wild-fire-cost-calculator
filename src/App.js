import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Draw from '@urbica/react-map-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapGL, { Source, Layer, CustomLayer, Popup } from '@urbica/react-map-gl';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ScatterplotLayer } from '@deck.gl/layers';
import axios from "axios";


const get_data_url = "http://d8bd26560c2d.ngrok.io/api/cost";
//const get_data_url = "https://stark-brushlands-63325.herokuapp.com/api/cost";
function get_data(Long, Lat, Acres ) {
  /*return axios.post({
        method: 'post',
        headers: {    
            'crossDomain': true,
            'Content-Type': 'application/json',
            //'Content-Type': 'text/plain;charset=utf-8',
        },
        url: get_data_url,
        data: {Long, Lat, Acres},
    });*/

   return axios.post(get_data_url, {Long, Lat, Acres});
}

function App() {
  
  const [viewport, setViewport] = useState({
    latitude: 39.565055, 
    longitude: -102.264490,
    zoom: 4
  });
  const [positionX, setPositionX] = useState(1);
  const [positionY, setPositionY] = useState(1);
  const [cost, setCost] = useState(0);
  const [popUp, setPopUp] = useState({
    IncidentName: "",
    Acres:0,
    CreateDate:"",
    GlobalId:""
  });
  
  const handleOnClick = (e) => {
    setPositionX(e.lngLat.lng)
    setPositionY(e.lngLat.lat)

    get_data(e.lngLat.lng, e.lngLat.lat, e.features[0].properties.GISAcres ).then(({ data: { get_cost_success, cost } }) => {
      setCost(cost)
      console.log("gelen data: ", cost)
    })
    .catch(error => {
      console.log("gelen hata", error)
    })
    
    setPopUp({
      IncidentName: e.features[0].properties.IncidentName,
      Acres: parseFloat(e.features[0].properties.GISAcres).toFixed(2),
      CreateDate:e.features[0].properties.CreateDate,
      GlobalId: e.features[0].properties.GlobalId
    })
  }
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
        <h4>Created by
        <a href="https://2020.spaceappschallenge.org/challenges/confront/spot-fire-3/teams/fire-spotting-team/"
        target="_blank"
        >Fire Spotting Team
        </a>
        </h4>
      <header className="App-header">
        {//<img src={logo} className="App-logo" alt="logo" />}
        }
        <>
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
                'line-width': 4
              }}
              onClick={e=> handleOnClick(e)}
            />
            {/*<CustomLayer 
            layer={myDeckLayer} 
            />*/}
            {cost &&
            <Popup longitude={positionX} latitude={positionY} closeButton={false} closeOnClick={false}>
              <h3>Name: {popUp.IncidentName}</h3>
              <h4>Acres Burned: {popUp.Acres}
              <br/>Start Date: {popUp.CreateDate}
              </h4>
              <h2>Estimated Cost: $ {cost}</h2>
            </Popup>
            }
          </MapGL>

          
        </>
      </header>
    </div>
  );
}

export default App;
