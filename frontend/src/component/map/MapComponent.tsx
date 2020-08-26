import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MockMapData } from './MockMapData';
import { Container, Row, Col, ListGroup, ListGroupItem, Collapse  } from 'reactstrap';
import GoogleMapApiKey from './GoogleMapApiKey';

import './Map.scss';

export default function MapComponent() {
  const [map, setMap] = React.useState(null);
  const [center, setCenter] = React.useState({ lat: -36.852019, lng: 174.763853 });
  const [ selectedEvent, setSelectedEvent ] = React.useState({} as any);
  const [mapData, setMapData] = React.useState(MockMapData);
  document.title='Map View';
  // initial userEventListCollapse
  // let tempUserEventListCollapse = new Map<string, boolean>();
  // mapData.map( (user:any) => {
  //   tempUserEventListCollapse.set(user.userID, false);
  // })
  // const [userEventListCollapse, setUserEventListCollapse] = React.useState(tempUserEventListCollapse);
  // const [selectedUser, setSelectedUser] = React.useState();
  
  // React.useEffect( () => {

  // });

  const onSelect = (item:any) => {
    if(selectedEvent === item){
      setSelectedEvent({});
    } else {
      setSelectedEvent(item);
    }
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new (window as any).google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  // const toggleUserEventList = (userID: string) => {
  //   tempUserEventListCollapse = new Map<string, boolean>();
  //   mapData.map( (user:any) => {
  //     tempUserEventListCollapse.set(user.userID, false);
  //   })
  //   tempUserEventListCollapse.set(userID, !userEventListCollapse.get(userID));
  //   setUserEventListCollapse(tempUserEventListCollapse);
  // };

  const containerStyle = {
    width: '100%',
    height: '80vh'
  };

  const getMarkers = () => {
    let markers:any = []
    mapData.forEach((event: any) => {
        markers.push(<Marker
          position={event.location}
          key={event.eventID}
          onClick={() => onSelect(event)}
        ></Marker>);
    })
    return markers;
  }

  const getMarkerInfo = () => {
    return (selectedEvent as any).location && 
      (
        <InfoWindow
        position={(selectedEvent as any).location}
        // clickable={true}
        onCloseClick={() => setSelectedEvent({})}
      >
        <>
          <h4>{(selectedEvent as any).eventTitle}</h4>
          <p>{(selectedEvent as any).userName}</p>
          <p>{(selectedEvent as any).detail}</p>
          <p>{(selectedEvent as any).address}</p>
          <p>{(selectedEvent as any).startTime}</p>
          <p>{(selectedEvent as any).eventLength}</p>
        </>
      </InfoWindow>
      )
  }

  // TODO:  
  const getUserInfo = (userID: string) => {
    console.log(`Get user info: userID = ${userID}`);
  }

  const MapSidePanel = (    
  <div className="MapSidePanel">
    <h1>Events</h1>
    <Container>
      {mapData.map( (event:any) => {
        return (
          <ListGroup>
            <ListGroupItem key={event.userID}>
              {/* <div className="SidePanelUserName" onClick={() => toggleUserEventList(user.userID)}>{user.userName}</div>
              <Collapse isOpen={userEventListCollapse.get(user.userID)}>
                {user.userEvents.map( (event:any) => {
                  return (
                    <ListGroup>
                      <ListGroupItem key={event.eventID}>
                        <div onClick={() => onSelect(event)}>{event.eventTitle}</div>
                      </ListGroupItem>
                    </ListGroup>
                  )
                })}
              </Collapse> */}
              <p className="SidePanelUserName" onClick={() => getUserInfo(event.userID)}>{event.userName}</p>
              <p onClick={() => onSelect(event)}>{event.eventTitle}</p>
            </ListGroupItem>
          </ListGroup>
        )
      })}
      
    </Container>
  </div>);

  return (
    <div>
      <Row>
        <Col xs="12" lg="3">
          {MapSidePanel}
        </Col>
        <Col xs="12" lg="9">
          <LoadScript
            googleMapsApiKey={GoogleMapApiKey}
          >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={10}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {getMarkers()}
              {getMarkerInfo()}
            </GoogleMap>
          </LoadScript>
        </Col>
      </Row>
    </div>
  )
}
