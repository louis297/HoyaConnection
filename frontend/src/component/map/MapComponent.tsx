import React, { Component } from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { MockMapData } from './MockMapData';
import { Container, Row, Col, ListGroup, ListGroupItem, Collapse  } from 'reactstrap';

import './Map.scss';

export default function MapComponent() {
  const [map, setMap] = React.useState(null);
  const [center, setCenter] = React.useState({ lat: -36.852019, lng: 174.763853 });
  const [ selected, setSelected ] = React.useState({});
  const [mapData, setMapData] = React.useState(MockMapData);
  document.title='Map View';
  // initial userEventListCollapse
  let tempUserEventListCollapse = new Map<string, boolean>();
  mapData.map( (user:any) => {
    tempUserEventListCollapse.set(user.userID, false);
  })
  const [userEventListCollapse, setUserEventListCollapse] = React.useState(tempUserEventListCollapse);
  const [selectedUser, setSelectedUser] = React.useState();
  
  // React.useEffect( () => {

  // });

  const onSelect = (item:any) => {
    setSelected(item);
  }

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new (window as any).google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])
 
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const toggleUserEventList = (userID: string) => {
    tempUserEventListCollapse = new Map<string, boolean>();
    mapData.map( (user:any) => {
      tempUserEventListCollapse.set(user.userID, false);
    })
    tempUserEventListCollapse.set(userID, !userEventListCollapse.get(userID));
    setUserEventListCollapse(tempUserEventListCollapse);
  };

  const containerStyle = {
    width: '100%',
    height: '80vh'
  };

  const getMarkers = () => {
    let markers:any = []
    mapData.forEach((user: any) => {
      user.userEvents.forEach((event: any, index: number) => {
        markers.push(<Marker
          position={event.location}
          key={event.eventID}
          onClick={() => onSelect(event)}
        ></Marker>);
      })
    })
    return markers;
  }

  const getMarkerInfo = () => {
    return (selected as any).location && 
      (
        <InfoWindow
        position={(selected as any).location}
        // clickable={true}
        onCloseClick={() => setSelected({})}
      >
        <>
        <h4>{(selected as any).eventTitle}</h4>
        <p>{(selected as any).detail}</p>
        <p>{(selected as any).address}</p>
        <p>{(selected as any).startTime}</p>
        <p>{(selected as any).eventLength}</p>
        </>
      </InfoWindow>
      )
  }

  const MapSidePanel = (    
  <div>
    <h1>Events</h1>
    <Container>
      {mapData.map( (user:any) => {
        return (
          <ListGroup>
            <ListGroupItem key={user.userID}>
              <div className="SidePanelUserName" onClick={() => toggleUserEventList(user.userID)}>{user.userName}</div>
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
              </Collapse>
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
            googleMapsApiKey="AIzaSyDmYBn8Y5_YdQw0ZKcYxQH7RAByEhaTomw"
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



// interface IProps {
// }

// interface IState {
//   map:any;
// }

// class Map1 extends Component<IProps, IState> {

//   componentDidMount(){
//     this.generateMap(MockMapData);
//   }

//   render() {
//     const initLocation = {
//       lat: -36.852019, 
//       lng: 174.763853
//     };
//     // const onLoad = React.useCallback(function callback(map) {
//     //   const bounds = new (window as any).google.maps.LatLngBounds();
//     //   map.fitBounds(bounds);
//     //   this.state = {};
//     // }, [])
   
//     // const onUnmount = React.useCallback(function callback(map) {
//     //   setMap(null)
//     // }, [])

//     return (
//       <div>
//         <h1>Map here</h1>
//         <LoadScript
//           googleMapsApiKey="AIzaSyDmYBn8Y5_YdQw0ZKcYxQH7RAByEhaTomw"
//         >
//           <GoogleMap
//             // mapContainerStyle={containerStyle}
//             center={initLocation}
//             zoom={10}
//             // onLoad={onLoad}
//             // onUnmount={onUnmount}
//           >
//             { /* Child components, such as markers, info windows, etc. */ }
//             <></>
//           </GoogleMap>
//         </LoadScript>
//       </div>
//     )
//   }
  

//   generateMap(MockMapData: any) {

//     // this.tt = tt;
//     // const map = tt.map({
//     //   key: 'DGoWXXfdz3OPX3c5RGikiQRV5OkBGdFH',
//     //   style: 'tomtom://vector/1/basic-main',
//     //   container: 'map',
//     //   center: {lat: -36.852019, lng: 174.763853},
//     //   zoom: 11,
//     // });
//     // map.addControl(new tt.FullscreenControl());
//     // this.map = map;
//     // this.generatePanel(MockMapData);
//     // this.generateMarker(MockMapData);
//   }

//   generatePanel(MockMapData: any){

//   }

//   generateMarker(MockMapData: any){

//   }
// }
