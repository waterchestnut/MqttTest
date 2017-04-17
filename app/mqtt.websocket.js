/**
 * Created by xinhuaguocai on 2017/4/12.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
} from 'react-native'


import mqtt from 'react_native_mqtt';
console.log(mqtt)
mqtt({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {}
});


export default class Websocket extends Component {
    constructor(props) {
        super(props);
        this.state = {logs: ['mqtt']}
    }

    componentWillMount() {
        let context = this;
        let {logs} = this.state;

        /* create mqtt client */
        function onConnect() {
            console.log("onConnect");
            logs.push('onConnect');
            context.setState({logs});
            var message = new Paho.MQTT.Message("Hello");
            message.destinationName = "order";
            client.send(message);
            client.subscribe('data',{qos:1})
        }

        function onConnectionLost(responseObject) {
            if (responseObject.errorCode !== 0) {
                console.log("onConnectionLost:" + responseObject.errorMessage);
                logs.push("onConnectionLost:" + responseObject.errorMessage);
                context.setState({logs})
            }
        }

        function onMessageArrived(message) {
            console.log("onMessageArrived:" + message.payloadString);
            logs.push("onMessageArrived:" + message.payloadString);
            context.setState({logs})
        }

        var client = new Paho.MQTT.Client('192.168.100.12', 3112, '456');
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({onSuccess: onConnect});
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.logs.map((msg, index) => {
                        return <Text key={index} style={styles.instructions}>
                            {msg}
                        </Text>
                    })
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});