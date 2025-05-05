import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeTabScreen from '../screens/HomeTabScreen';
import HistoryTabScreen from '../screens/HistoryTabScreen';
import AccountTabScreen from '../screens/AccountTabScreen';

const Tab = createBottomTabNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Trang chủ" component={HomeTabScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Lịch sử" component={HistoryTabScreen} options={{ headerShown: false }}/>
    <Tab.Screen name="Tài khoản" component={AccountTabScreen} options={{ headerShown: false }}/>
  </Tab.Navigator>
);

export default HomeTabs;