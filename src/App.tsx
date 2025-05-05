import React from 'react';
import { SipProvider } from './store/SipContext';
import AppNavigator from './navigation/AppNavigator';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, mediaDevices } from 'react-native-webrtc';

(global as any).RTCPeerConnection = RTCPeerConnection;
(global as any).RTCSessionDescription = RTCSessionDescription;
(global as any).RTCIceCandidate = RTCIceCandidate;
(global as any).mediaDevices = mediaDevices;

const App = () => {
  return (
    <SipProvider>
      <AppNavigator />
    </SipProvider>
  );
};

export default App;