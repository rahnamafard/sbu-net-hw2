import React from 'react';
import { compose, withStateHandlers } from "recompose";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
class MyMap1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    //function_onClick(obj){ console.log(obj);}

    render(){
        return (
            withScriptjs(withGoogleMap(props =>
                <GoogleMap
                  defaultZoom={8}
                  defaultCenter={{ lat: -20.397, lng: 150.644 }}
                  //onClick = {_onClick}
                >
                  <Marker
                    position={{ lat: -34.397, lng: 150.644 }}
                  />
                </GoogleMap>
              ))
        );
    }
}

  
    const MyMap = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -20.397, lng: 150.644 }}
      onClick = {props.onClick}
    >
        {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />} */}

      <Marker
        position={{  lat:  props.lat ,
         lng: props.lng }}
      />
    </GoogleMap>
  ));
  export class MapContainer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        console.log(typeof this.state.lat)
    }

      render(){
        return (  <MyMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDjs0u02-62FMwrtxMxci5pc6PIubSyW28&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            onClick = {this.props.onClick}
            lat = {this.props.lat}
            lng = {this.props.lng}
          />);
      }
  }
