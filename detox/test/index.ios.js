import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableOpacity,
  PushNotificationIOS,
  Linking
} from 'react-native';
import * as Screens from './src/Screens';

class example extends Component {

  constructor(props) {
    super(props);
    this.state = {
      screen: undefined,
      url: undefined,
      notification: undefined
    };
  }

  renderScreenButton(title, component) {
    return (
      <TouchableOpacity onPress={() => {
        this.setState({screen: component});
      }}>
        <Text style={{color: 'blue', marginBottom: 20}}>{title}</Text>
      </TouchableOpacity>
    );
  }

  renderText(text) {
    return (
      <View style={{flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 25}}>
          {text}
        </Text>
      </View>
    );
  }

  async componentDidMount() {
    const notification = await PushNotificationIOS.getInitialNotification();
    if (notification) {
      this.setState({notification: notification.getAlert().title});
    }

    const url = await Linking.getInitialURL();
    if (url) {
      this.setState({url: url});
    }
  }

  componentWillMount() {
    PushNotificationIOS.addEventListener('notification', (notification) => this._onNotification(notification));
    PushNotificationIOS.addEventListener('localNotification', (notification) => this._onNotification(notification));
    Linking.addEventListener('url', (params) => this._handleOpenURL(params));
  }

  render() {
    if (this.state.notification) {
      return this.renderText(this.state.notification);
    }

    else if (this.state.url) {
      return this.renderText(this.state.url);
    }

    if (!this.state.screen) {
      return (
        <View style={{flex: 1, paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20, marginBottom: 30}}>
            Choose a test
          </Text>
          {this.renderScreenButton('Sanity', Screens.SanityScreen)}
          {this.renderScreenButton('Matchers', Screens.MatchersScreen)}
          {this.renderScreenButton('Actions', Screens.ActionsScreen)}
          {this.renderScreenButton('Assertions', Screens.AssertionsScreen)}
          {this.renderScreenButton('WaitFor', Screens.WaitForScreen)}
          {this.renderScreenButton('Stress', Screens.StressScreen)}
          {this.renderScreenButton('Switch Root', Screens.SwitchRootScreen)}
          {this.renderScreenButton('Timeouts', Screens.TimeoutsScreen)}
          {this.renderScreenButton('Orientation', Screens.Orientation)}
          {this.renderScreenButton('Permissions', Screens.Permissions)}
          {this.renderScreenButton('Network', Screens.NetworkScreen)}
          {this.renderScreenButton('Animations', Screens.AnimationsScreen)}
        </View>
      );
    }
    const Screen = this.state.screen;
    return (
      <Screen />
    );
  }

  _onNotification(notification) {
    this.setState({notification: notification.getAlert()});
  }

  _handleOpenURL(params) {
    this.setState({url: params.url});
  }
}

AppRegistry.registerComponent('example', () => example);
