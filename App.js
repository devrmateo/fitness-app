import React from 'react'
import { View } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import History from './components/History'

export default class App extends React.Component {
  render() {
    const store = createStore(reducer, middleware)

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <View style={{ height: 30 }} />
            <History />
        </View>
      </Provider>
    )
  }
}
