import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'

class History extends Component {
  componentDidMount() {
    const { receiveEntries } = this.props
    fetchCalendarResults()
    .then((entries) => receiveEntries(entries))
    .then(({ entries }) => {
      if (!entries[timeToString()]) {
        addEntry({
          [timeToString()]: getDailyReminderValue()
        })
      }
    })
  }

  render() {
    const { entries } = this.props
    return (
      <View>
        <Text>{JSON.stringify(entries)}</Text>
      </View>
    )
  }
}

function mapStateToProps (entries) {
  return {
    entries,
  }
}

export default connect(mapStateToProps, { receiveEntries, addEntry })(History)
