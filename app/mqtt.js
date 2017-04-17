/**
 * Created by xinhuaguocai on 2017/4/12.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native'
var mqtt = require('react-native-mqtt');


export default class Mqtt extends Component {
    constructor(props) {
        super(props);
        this.state = {logs: ['mqtt']}
    }

    componentWillMount() {
        let context = this;
        let {logs} = this.state;

        /* create mqtt client */
        mqtt.createClient({
            uri: 'mqtt://192.168.100.12:5112',
            clientId: '123'
        }).then(function (client) {
            console.log('created');
            client.on('closed', function () {
                console.log('mqtt.event.closed');
                logs.push('mqtt.event.closed');
                context.setState({logs})

            });

            client.on('error', function (msg) {
                console.log('mqtt.event.error', msg);
                logs.push('mqtt.event.error:' + msg);
                context.setState({logs})

            });

            client.on('message', function (msg) {
                msg = msg.data;
                console.log('mqtt.event.message', msg);
                logs.push('mqtt.event.message:' + msg);
                context.setState({logs})
            });

            client.on('connect', function () {
                console.log('connected');
                logs.push('connected');
                context.setState({logs});
                client.subscribe('order', 0);
                client.publish('data', "test", 0, false);
            });

            client.connect();
        }).catch(function (err) {
            console.log(err);
            logs.push('err:' + err);
            context.setState({logs})
        });
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