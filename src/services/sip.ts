import {PjSipService} from 'react-native-pjsip';

type CreateSipUAParams = {
  server: string;
  username: string;
  password: string;
  onRegistered?: () => void;
  onRegistrationFailed?: (err: string) => void;
};

export async function createSipUA({
  server,
  username,
  password,
  onRegistered,
  onRegistrationFailed,
}: CreateSipUAParams) {
  try {
    // Khởi tạo PjSip service
    const pjsip = new PjSipService();

    // Cấu hình PjSip
    const config = {
      ua: {
        max_calls: 4,
        user_agent: 'React Native PjSip',
        stun_srv: ['stun:stun.l.google.com:19302'],
      },
      account: {
        id: username,
        registrar: server,
        username: username,
        password: password,
        transport_id: 'tcp0',
      },
      transport: {
        type: 'tcp',
        port: 0,
        public_addr: server,
      },
    };

    // Khởi tạo PjSip
    await pjsip.start(config);

    // Đăng ký các event handlers
    pjsip.on('registration_changed', data => {
      if (data.status === 'OK') {
        if (onRegistered) onRegistered();
      } else {
        if (onRegistrationFailed) onRegistrationFailed(data.status);
      }
    });

    pjsip.on('call_received', call => {
      // Xử lý khi có cuộc gọi đến
      console.log('Incoming call from:', call.remote_uri);
    });

    pjsip.on('call_changed', call => {
      // Xử lý khi trạng thái cuộc gọi thay đổi
      console.log('Call state changed:', call.state);
    });

    return pjsip;
  } catch (error) {
    console.error('Failed to initialize PjSip:', error);
    throw error;
  }
}

// Hàm để thực hiện cuộc gọi
export async function makeCall(pjsip: PjSipService, destination: string) {
  try {
    const call = await pjsip.makeCall(destination);
    return call;
  } catch (error) {
    console.error('Failed to make call:', error);
    throw error;
  }
}

// Hàm để kết thúc cuộc gọi
export async function endCall(pjsip: PjSipService, callId: string) {
  try {
    await pjsip.endCall(callId);
  } catch (error) {
    console.error('Failed to end call:', error);
    throw error;
  }
}
