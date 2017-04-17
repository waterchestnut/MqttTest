/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    MapView,
} from 'react-native'
import MqttClient from './app/mqtt'
import MqttWebsocket from './app/mqtt.websocket'

export default class MqttTest extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Hello World!
                </Text>
                <Text style={styles.instructions}>
                    123456
                </Text>
                <MapView
                    style={{
                        height: 200,
                        alignSelf:  'stretch' ,
                      }}
                    onRegionChange={() => {}}
                    onRegionChangeComplete={() => {}}
                    showsUserLocation={true}
                />
                <MqttClient
                    style={{
                        height: 200,
                        flex:1,
                        alignSelf:  'stretch' ,
                      }}
                />
                <MqttWebsocket
                    style={{
                        height: 200,
                        flex:1,
                        alignSelf:  'stretch' ,
                      }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('MqttTest', () => MqttTest);
