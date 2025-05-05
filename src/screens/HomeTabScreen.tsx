import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSip } from '../store/SipContext';

const dialPad = [
  [{ num: '1', sub: '' }, { num: '2', sub: 'ABC' }, { num: '3', sub: 'DEF' }],
  [{ num: '4', sub: 'GHI' }, { num: '5', sub: 'JKL' }, { num: '6', sub: 'MNO' }],
  [{ num: '7', sub: 'PQRS' }, { num: '8', sub: 'TUV' }, { num: '9', sub: 'WXYZ' }],
  [{ num: '*', sub: '' }, { num: '0', sub: '+' }, { num: '#', sub: '' }],
];

const HomeTabScreen = ({ navigation }: { navigation: any }) => {
  const [input, setInput] = useState('');
  const uaRef = useRef<any>(null);
  const { ua, sipStatus } = useSip();

  useEffect(() => {
    if (ua && !uaRef.current) {
      uaRef.current = ua;
    }
    return () => {
      if (uaRef.current) uaRef.current.stop();
    };
  }, [ua]);

  const handlePress = (num: string) => setInput(input + num);
  const handleDelete = () => setInput(input.slice(0, -1));

  const handleCall = () => {
    if (sipStatus !== 'registered') {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập SIP thành công!');
      return;
    }
    if (!input) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại!');
      return;
    }
    const eventHandlers = {
      progress: () => {},
      failed: (e: any) => {
        Alert.alert('Gọi thất bại', 'Không thể kết nối cuộc gọi.');
      },
      ended: () => {
        Alert.alert('Kết thúc', 'Cuộc gọi đã kết thúc.');
      },
      confirmed: () => {},
    };
    const options = {
      eventHandlers,
      mediaConstraints: { audio: true, video: false },
    };
    // Lấy domain từ uri (dù là string hay object)
    const uri = uaRef.current.configuration.uri;
    const uriStr = typeof uri === 'string' ? uri : uri.toString();
    const domain = uriStr.split('@')[1];
    uaRef.current.call(`sip:${input}@${domain}`, options);
    navigation.navigate('Call', { inputNumber: input });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.input}>{input}</Text>
      <View style={styles.dialPad}>
        {dialPad.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.row}>
            {row.map((item, colIdx) => (
              <TouchableOpacity
                key={colIdx}
                style={styles.key}
                onPress={() => handlePress(item.num)}
                activeOpacity={0.7}
              >
                <Text style={styles.keyText}>{item.num}</Text>
                {item.sub ? <Text style={styles.subText}>{item.sub}</Text> : null}
              </TouchableOpacity>
            ))}
          </View>
        ))}
        {/* Nút gọi nằm giữa dưới số 0 */}
        <View style={styles.row}>
          <TouchableOpacity style={{ flex: 1 }} disabled />
          <TouchableOpacity style={styles.callBtn} onPress={handleCall} activeOpacity={0.7}>
            <Icon name="phone" size={32} color="#fff" />
          </TouchableOpacity>
          {input.length > 0 ? (
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete} activeOpacity={0.7}>
              <Text style={styles.deleteText}>⌫</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ flex: 1 }} disabled />
          )}
        </View>
      </View>
    </View>
  );
};

const keySize = Math.floor(Dimensions.get('window').width / 5);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: '#fff',
    fontSize: 36,
    marginBottom: 24,
    letterSpacing: 2,
    textAlign: 'center',
  },
  dialPad: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  key: {
    width: keySize,
    height: keySize,
    borderRadius: keySize / 2,
    backgroundColor: '#222',
    marginHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
  },
  subText: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  callBtn: {
    width: keySize,
    height: keySize,
    borderRadius: keySize / 2,
    backgroundColor: '#28d146',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  callIcon: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
  },
  deleteBtn: {
    width: keySize,
    height: keySize,
    borderRadius: keySize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  deleteText: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
  },
});

export default HomeTabScreen;