import React from 'react';
import { View } from 'react-native';
import Timer from './Timer.js'
import Styles from './Styles'

export default function App() {
  return (
    <View style={Styles.container}>
      <Timer />
    </View>
  )
}