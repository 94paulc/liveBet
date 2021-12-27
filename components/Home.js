import React from "react";
import {
    View,
    StyleSheet,
    Text,
    Button, Animated, Image, StatusBar,
} from 'react-native';

import Moment from 'moment';
import * as Animatable from 'react-native-animatable';


const matches = [
    {
        'startDate': '12/10/2021 18:12',
        'liveBetTime': 80,
        'country': 'England',
        'league': 'Premier League',
        'firstTeam': 'Manchester City bla bla bla bla bla bla bla bla bla bla',
        'secondTeam': 'Liverpool',
        'firstTeamScore': 1,
        'secondTeamScore': 1,
        'pick': 'over2.5',
        'odd': '2.10',
        'status': 0
    },
    {
        'startDate': '12/09/2021 13:55',
        'liveBetTime': 1,
        'country': 'England',
        'league': 'Premier League',
        'firstTeam': 'Tottenham',
        'secondTeam': 'Newcastle',
        'firstTeamScore': 0,
        'secondTeamScore': 0,
        'pick': 'over2.5',
        'odd': '2.10',
        'status': 1
    },
    {
        'startDate': '12/08/2021 20:30',
        'liveBetTime': 87,
        'country': 'Spain',
        'league': 'LaLiga',
        'firstTeam': 'Barcelona',
        'secondTeam': 'Real Madrid',
        'firstTeamScore': 3,
        'secondTeamScore': 3,
        'pick': 'over6.5',
        'odd': '2.35',
        'status': 2
    },
]

var BG_IMG = require ('../assets/background.jpeg');

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const Home = ({navigation}) => {
    const scrollY = React.useRef(new Animated.Value(0)).current;

    return <View style={{ flex: 1, backgroundColor: '#fff'}}>
        <Image
            source= { BG_IMG }
            style={ StyleSheet.absoluteFillObject }
            blurRadius={80}
        />
        <Animated.FlatList
            data={matches}
            onScroll={Animated.event(
                [{ nativeEvent: {contentOffset: {y: scrollY }}}],
                { useNativeDriver: true }
            )}
            keyExtractor={item => item.key}
            contentContainerStyle={{
                padding: SPACING,
                paddingTop: StatusBar.currentHeight || 42
            }}
            renderItem = {({ item, index }) => {
                const inputRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + 2),
                ]

                const opacityInputRange = [
                    -1,
                    0,
                    ITEM_SIZE * index,
                    ITEM_SIZE * (index + .5),
                ]

                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: [1, 1, 1, 0]
                })

                const opacity = scrollY.interpolate({
                    inputRange: opacityInputRange,
                    outputRange: [1, 1, 1, 0]
                })

                return <Animated.View style={{
                    flexDirection: 'row',
                    padding: SPACING,
                    marginBottom: SPACING,
                    backgroundColor: (item.status === 0) ? 'rgba(255,255,255,0.8)' : (item.status === 1 ? 'rgba(14,189,0,0.29)' : 'rgba(255,61,61,0.2)'),
                    borderRadius: 12,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: .3,
                    shadowRadius: 20,
                    opacity,
                    transform: [{ scale }],
                    position: 'relative'
                }}>
                    <View style={styles.matchContainer}>
                        <View style={styles.date}>
                            <Text style={styles.dateText}>{ Moment(item.startDate).format('H:m dddd, d MMMM YYYY') }</Text>
                        </View>
                        <View style={styles.fullContainer}>
                            <View style={styles.time}>
                                <Animatable.Text
                                    animation="pulse"
                                    easing="ease-out"
                                    iterationCount="infinite"
                                    style={{ textAlign: 'center' }}>
                                    {item.liveBetTime}'️
                                </Animatable.Text>
                            </View>
                            <View style={styles.matches}>
                                <Text key={index} style={styles.matchesText} numberOfLines={1}>{item.firstTeam}</Text>
                                <Text key={index} style={styles.matchesText} numberOfLines={1}>{item.secondTeam}</Text>
                            </View>
                            <View style={styles.scores}>
                                <Text key={index} style={styles.scoresText}>{item.firstTeamScore}</Text>
                                <Text key={index} style={styles.scoresText}>{item.secondTeamScore}</Text>
                            </View>
                            <View style={styles.pickOdd}>
                                <Text key={index} style={styles.pickText}>{item.pick}</Text>
                                <Text key={index} style={styles.oddText}>{item.odd}</Text>
                            </View>
                        </View>
                    </View>
                </Animated.View>
            }}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    winBgColor: {
        backgroundColor: 'red',
    },
    matchContainer: {
    },
    date: {
        width: '100%',
    },
    dateText: {
        fontWeight: '700',
        fontSize: 15,
    },
    fullContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    time: {
        borderRadius: 30,
        borderWidth: 1,
        padding: 10,
        width: '13%',
        alignItems: 'center',
    },
    matches: {
        width: '60%',
        paddingLeft: 5,
    },
    matchesText: {
        fontSize: 16,
    },
    scores: {
        width: '5%',
    },
    scoresText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ff5b00',
    },
    pickOdd: {
        width: "22%",
        alignItems: 'flex-end',
    },
    pickText: {
        fontSize: 16,
        color: '#E99812',
        fontWeight: '700',
    },
    oddText: {
        fontSize: 18,
        color: '#3c82ff',
        fontWeight: '700',
    },
})

export default Home;
