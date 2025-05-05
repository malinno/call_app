import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const callActions = [
  { icon: 'mic-off', label: 'mute' },
  { icon: 'dialpad', label: 'keypad' },
  { icon: 'volume-up', label: 'audio' },
  { icon: 'add', label: 'add call' },
  { icon: 'videocam', label: 'FaceTime' },
  { icon: 'person', label: 'contacts' },
];

const CallScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const { inputNumber } = route.params || { inputNumber: 'John Doe' };
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format seconds to mm:ss
  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleHangup = () => {
    // TODO: Nếu bạn lưu session, hãy gọi session.terminate() ở đây
    Alert.alert('Kết thúc', 'Cuộc gọi đã kết thúc.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.caller}>{inputNumber || 'John Doe'}</Text>
      <Text style={styles.timer}>{formatTime(seconds)}</Text>
      <View style={styles.actionsGrid}>
        {callActions.map((action) => (
          <View key={action.label} style={styles.actionItem}>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name={action.icon} size={32} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.hangupBtn} onPress={handleHangup}>
        <Icon name="call-end" size={36} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  caller: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  timer: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 32,
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  actionItem: {
    width: '33%',
    alignItems: 'center',
    marginVertical: 18,
  },
  actionBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  hangupBtn: {
    alignSelf: 'center',
    backgroundColor: '#e53935',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default CallScreen;