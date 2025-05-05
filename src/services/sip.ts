import JsSIP from 'jssip';

type CreateSipUAParams = {
  server: string;
  username: string;
  password: string;
  onRegistered?: () => void;
  onRegistrationFailed?: (err: string) => void;
};

export function createSipUA({
  server,
  username,
  password,
  onRegistered,
  onRegistrationFailed,
}: CreateSipUAParams) {
  const socket = new JsSIP.WebSocketInterface(`wss://c6.zsolution.vn:8089/ws`);
  const configuration = {
    sockets: [socket],
    uri: `sip:442002@c6.zsolution.vn`,
    // uri: `sip:${username}@${server}`,
    password: 'f99@2022',
  };

  const ua = new JsSIP.UA(configuration);

  ua.on('connected', () => {
    // Kết nối WebSocket thành công
    console.log('SIP connected');
  });

  ua.on('registered', () => {
    if (onRegistered) onRegistered();
  });

  ua.on('registrationFailed', (e) => {
    console.log('SIP registration failed', e);
    if (onRegistrationFailed) onRegistrationFailed(e.cause || 'Đăng ký SIP thất bại');
  });

  ua.on('newRTCSession', (data: any) => {
    // Xử lý khi có cuộc gọi đến hoặc đi
    const session = data.session;
    // ...
  });

  ua.start();

  return ua;
}