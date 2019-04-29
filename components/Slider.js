import React from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

export default function UdaciSlider ({ max, unit, step, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider
        style={styles.slider}
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={styles.metricNumber}>{value}</Text>
        <Text style={{ color: gray }}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    marginRight: 10,
  },
  metricCounter: {
    flexDirection: 'row',
    width: 85,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginRight: 5,
  },
})
