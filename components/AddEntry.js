import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotification,
  setLocalNotification
} from '../utils/helpers'
import UdaciSlider from './Slider'
import UdaciSteppers from './Steppers'
import DateHeader from './DateHeader'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { addEntry,  } from '../actions'
import { white, purple } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios'
        ? styles.iosSubmitBtn
        : styles.androidSubmitBtn
      }
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }

  increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric)

    this.setState((state) => {
      const count = state[metric] + step

      return {
        ...state,
        [metric]: count > max ? max : count,
      }
    })
  }

  decrement = (metric) => {
    this.setState((state) => {
      const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      }
    })
  }

  slide = (metric, value) => {
    this.setState({
      [metric]: value,
    })
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    const { addEntry } = this.props
    addEntry({
      [key]: entry
    })

    submitEntry(key, entry)

    this.setState({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    })

    this.toHome()

    clearLocalNotification()
    .then(setLocalNotification)

  }

  reset = () => {
    const key = timeToString()

    const { addEntry } = this.props
    addEntry({
      [key]: getDailyReminderValue()
    })

    this.toHome()

    removeEntry(key)
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      key: 'AddEntry'
    }))
  }

  render() {
    const metaInfo = getMetricMetaInfo()
    const { alreadyLogged } = this.props

    if (alreadyLogged) {
      return (
        <View style={styles.center}>
          <Ionicons
            name={Platform.OS === 'ios'
              ? 'ios-happy'
              : 'md-happy'
            }
            size={100}
          />
          <Text>You already logged your information for today.</Text>
          <View style={{marginTop: 10}}>
            <TextButton onPress={this.reset}>
              Reset
            </TextButton>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toLocaleDateString()}/>
        {Object.keys(metaInfo).map((key) => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View
              key={key}
              style={styles.row}
            >
              {getIcon()}
              {type === 'slider'
                ? <UdaciSlider
                    style={{flex: 1}}
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <UdaciSteppers
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />
              }
            </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  androidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  }
})

function mapStateToProps (state) {
  const key = timeToString()

  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps, { addEntry })(AddEntry)
