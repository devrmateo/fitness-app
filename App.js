import React, { Component } from 'react'
import { View, Platform, StatusBar, YellowBox } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import History from './components/History'
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { white, purple } from './utils/colors'
import { Constants } from 'expo'
import EntryDetail from './components/EntryDetail'

function UdaciStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar
        translucent backgroundColor={backgroundColor} {...props}
      />
    </View>
  )
}

const TabRouteConfigs = {
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}

const TabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === "ios"
      ? purple
      : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === "ios"
        ? white
        : purple,
      shadowColor: "rgba(0, 0, 0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    },
  }
}

const Tabs =
Platform.OS === "ios"
? createBottomTabNavigator(TabRouteConfigs, TabNavigatorConfig)
: createMaterialTopTabNavigator(TabRouteConfigs, TabNavigatorConfig);

const TabsContainer = createAppContainer(Tabs)

const MainNavigator = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null,
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

const MainNavigatorContainer = createAppContainer(MainNavigator)

export default class App extends Component {

  componentDidMount() {
    YellowBox.ignoreWarnings(['Warning: Failed prop type: The prop `bounces` is marked as required in `PagerAndroid`, but its value is `undefined`.'])
  }

  render() {
    const store = createStore(reducer, middleware)

    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
        <UdaciStatusBar
          backgroundColor={purple}
          barStyle='light-content'
        />
          <MainNavigatorContainer />
        </View>
      </Provider>
    )
  }
}
