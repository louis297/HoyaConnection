/*
const singleData = {
  'eventTitle': 'xx',
  'eventType': 'xx',
  'country': 'xx',
  'state': 'xx',
  'city': 'xx',
  'address': 'xx',
  'location': [1, 2],
  'detail': 'xxxxxxxxxxxxxxx',
  'startTime': '<datetime>',
  'eventLength': '2h',
}
*/

// TODO: this user structure is only a temporary one for demo map

// const user = {
//   'userName': 'xx',
//   'userID': 'xx-xx-xx-xx',
//   'userActivity': [ /* <singleData>, <singleData> ....*/ ]
// }


export const MockMapData = [
  {
    'userName': 'aaa',
    'userID': 'aa-xx-xx-xx',
    'userEvents': [ 
      {
        'eventID': 1,
        'eventHost': 'aa-xx-xx-xx',
        'eventTitle': 'axxx',
        'eventType': 'a1typexx',
        'country': 'a1xx',
        'state': 'a1statexx',
        'city': 'a1cityxx',
        'address': 'a1address',
        'location': { lng:174.710064, lat:-36.905530},
        'detail': 'a1xxxxxxxxxxxxxxx',
        'startTime': Date.now().toString(),
        'eventLength': '2h',
      },
      {
        'eventID': 2,
        'eventHost': 'aa-xx-xx-xx',
        'eventTitle': 'a2xx',
        'eventType': 'a2typexx',
        'country': 'a2xx',
        'state': 'a2xx',
        'city': 'a2xx',
        'address': 'a2addressaxx',
        'location': { lng:174.668275, lat:-36.906614},
        'detail': 'a2xxxxxxxxxxxxxxx',
        'startTime': Date.now().toString(),
        'eventLength': '4h',
      }
     ]
  },
  {
    'userName': 'bbb',
    'userID': 'bb-xx-xx-xx',
    'userEvents': [
      {
        'eventID': 3,
        'eventHost': 'bb-xx-xx-xx',
        'eventTitle': 'baxxx',
        'eventType': 'ba1typexx',
        'country': 'ba1xx',
        'state': 'ba1statexx',
        'city': 'ba1cityxx',
        'address': 'b1address',
        'location': { lng:174.752116, lat:-36.853842},
        'detail': 'b1xxxxxxxxxxxxxxx',
        'startTime': Date.now().toString(),
        'eventLength': '2h',
      },
      {
        'eventID': 4,
        'eventHost': 'bb-xx-xx-xx',
        'eventTitle': 'b2xx',
        'eventType': 'b2typexx',
        'country': 'b2xx',
        'state': 'b2xx',
        'city': 'b2xx',
        'address': 'b2addressaxx',
        'location': { lng:174.732116, lat:-36.823842},
        'detail': 'b2xxxxxxxxxxxxxxx',
        'startTime': Date.now().toString(),
        'eventLength': '4h',
      }
    ]
  },
  {
    'userName': 'ccc',
    'userID': 'cc-xx-xx-xx',
    'userEvents': [
      {
        'eventID': 5,
        'eventHost': 'cc-xx-xx-xx',
        'eventTitle': 'cxxx',
        'eventType': 'c1typexx',
        'country': 'c1xx',
        'state': 'c1statexx',
        'city': 'c1cityxx',
        'address': 'c1address',
        'location': { lng:174.812116, lat:-36.813842},
        'detail': 'c1xxxxxxxxxxxxxxx',
        'startTime': Date.now().toString(),
        'eventLength': '2h',
      },
      {
        'eventID': 6,
        'eventHost': 'cc-xx-xx-xx',
        'eventTitle': 'c2xx',
        'eventType': 'c2typexx',
        'country': 'c2xx',
        'state': 'c2xx',
        'city': 'c2xx',
        'address': 'c2addressaxx',
        'location': { lng:174.782116, lat:-36.883842},
        'detail': 'c2xxxxxxxxxxxxxxx',
        'startTime': Date.now().toString(),
        'eventLength': '4h',
      }
    ]
  }
]