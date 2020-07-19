import React from 'react';
import { Text, View, Vibration, TouchableOpacity } from 'react-native';
import Styles from './Styles'

export default class Timer extends React.Component {
    state = {
        workTime: 1500,
        breakTime: 300,
        buttonText: 'Pause',
        time: 0,
        activity: 'break',
        skipText: 'Take a Break'
    }
    
    constructor() {
        super()
    }
  
    startTimer() {
        this.setState({ buttonText: 'Pause' })
        this.interval = setInterval(() => {
            this.setState({ time: this.state.time - 1 })
        }, 1000)
    }
  
    pauseTimer() {
        this.setState({ buttonText: 'Start' })
        clearInterval(this.interval)
    }
  
    stopTimer() {
        this.pauseTimer()
        this.setState({ time: 0 })
    }

    skipToBreak() {
        this.stopTimer()
        this.setState({ skipText: 'Begin Working' })
    }

    skipToWork() {
        this.stopTimer()
        this.setState({ skipText: 'Take a Break' })
    }

    toggleSkip() {
        if (this.state.skipText === 'Take a Break') {
            this.skipToBreak()
        } else if (this.state.skipText === 'Begin Working') {
            this.skipToWork()
        }
    }
  
    toggleButton() {
        if (this.state.buttonText === 'Pause') {
            this.pauseTimer()
        } else if (this.state.buttonText === 'Start') {
            this.startTimer()
        }
    }
  
    componentDidMount() {
        this.startTimer()
    }
  
    componentWillUnmount() {
        this.pauseTimer()
    }
  
    twoDigits(int) {
        return ('0' + int).slice(-2)
    }
  
    shouldComponentUpdate(_nextProps, nextState) {
        if (nextState.time == 0) {
            Vibration.vibrate()
            if (this.state.activity == 'work') {
                this.setState({ time: this.state.breakTime, activity: 'break'})
            } else if (this.state.activity == 'break') {
                this.setState({ time: this.state.workTime, activity: 'work'})
            }
        }
        return true
    }
  
    formatTime() {
        let time = this.state.time
        const minutes = this.twoDigits(Math.floor(this.state.time / 60))
        const seconds = this.twoDigits(this.state.time % 60)
        time = `${minutes}:${seconds}`
        return time
    }
  
    render() {
        return (
            <View style={Styles.container}>
                <Text style={Styles.header}>{this.state.activity + " time!"}</Text>
                <Text style={Styles.timer}>{this.formatTime()}</Text>
                <TouchableOpacity onPress={() => this.toggleButton()}>
                    <Text>{this.state.buttonText}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.toggleSkip()}>
                    <Text>{this.state.skipText}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}