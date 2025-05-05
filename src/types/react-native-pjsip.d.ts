declare module 'react-native-pjsip' {
  export class PjSipService {
    constructor();
    start(config: any): Promise<void>;
    on(event: string, callback: (data: any) => void): void;
    makeCall(destination: string): Promise<any>;
    endCall(callId: string): Promise<void>;
  }
}
