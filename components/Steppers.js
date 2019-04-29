import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { white, gray, purple } from '../utils/colors'

export default function UdaciSteppers ({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View style={styles.row}>
      {Platform.OS === 'ios'
        ? <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={onDecrement}
              style={[styles.iosBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
            >
              <Entypo
                name='minus'
                size={30}
                color={purple}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onIncrement}
              style={[styles.iosBtn, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
            >
              <Entypo
                name='plus'
                size={30}
                color={purple}
              />
            </TouchableOpacity>
          </View>
        : <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={onDecrement}
              style={[styles.androidBtn, { borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}
            >
              <FontAwesome
                name='minus'
                size={30}
                color={white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onIncrement}
              style={[styles.androidBtn, { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}
            >
              <FontAwesome
                name='plus'
                size={30}
                color={white}
              />
            </TouchableOpacity>
          </View>
      }
      <View style={styles.metricCounter}>
        <Text style={[styles.metricNumber, { marginRight: 5 }]}>{value}</Text>
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
  iosBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 45,
    backgroundColor: white,
    borderColor: purple,
    borderWidth: 1,
    borderRadius: 3,
  },
  androidBtn: {
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: purple,
    borderRadius: 2,
  },
  metricCounter: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15,
    height: 45,
  },
  metricNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  }
})
