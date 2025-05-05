import React, { useEffect, useState } from 'react';
import { useSip } from '../store/SipContext';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const { initUA, sipStatus, sipError } = useSip();
    const [server, setServer] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    useEffect(() => {
      if (sipStatus === 'failed' && sipError) {
        Alert.alert('Đăng nhập SIP thất bại', sipError);
      }
      if (sipStatus === 'registered') {
        navigation.replace('Home');
      }
    }, [sipStatus, sipError]);
    
    const handleLogin = () => {
      initUA(server, username, password);
    };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#6C63FF' }}>
      <LinearGradient
        colors={['#5B7FFF', '#A174FF']}
        style={styles.topContainer}
        >
        <Image
            source={require('../assets/Soly.png')}
            style={styles.logoImage}
            resizeMode="contain"
        />
        </LinearGradient>
      <View style={styles.bottomContainer}>
        <Text style={styles.welcomeText}>Welcome Zsolution</Text>
        <View style={styles.inputContainer}>
  <Text style={styles.inputLabel}>Server</Text>
  <TextInput
    style={styles.input}
    placeholder="Server"
    value={server}
    onChangeText={setServer}
    autoCapitalize="none"
  />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Tài khoản</Text>
        <TextInput
            style={styles.input}
            placeholder="Tài khoản"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
        />
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Mật khẩu</Text>
        <View style={styles.passwordRow}>
            <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            />
            <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeBtn}
            >
            <Text style={{ color: '#888' }}>
                {showPassword ? '🙈' : '👁️'}
            </Text>
            </TouchableOpacity>
        </View>
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.signInBtn}>
        <LinearGradient
            colors={['#4F47C8', '#E6A5FF']}
            style={styles.signInGradient}
        >
            <Text style={styles.signInText}>Đăng nhập</Text>
        </LinearGradient>
        </TouchableOpacity>
        <View style={styles.orRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Đăng nhập bằng</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn}>
            <Image
              source={{
                
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>ZSolution</Text>
          </TouchableOpacity>
         
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    topContainer: {
        height: 220,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        paddingHorizontal: 20,
        justifyContent: 'center',   
        alignItems: 'center',    
      },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backArrow: {
    color: '#fff',
    fontSize: 24,
    marginRight: 8,
  },
  headerText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 8,
  },
  getStartedBtn: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  getStartedText: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  logoText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -32,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subText: {
    color: '#888',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    color: '#888',
    marginBottom: 4,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    padding: 8,
  },
  signInBtn: {
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 8,
    overflow: 'hidden',
  },
  signInGradient: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    color: '#6C63FF',
    textAlign: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#eee',
  },
  orText: {
    marginHorizontal: 8,
    color: '#888',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 4,
    backgroundColor: '#fafafa',
  },
  socialIcon: {
    width: 22,
    height: 22,
    marginRight: 8,
    resizeMode: 'contain',
  },
  socialText: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
});

export default LoginScreen;