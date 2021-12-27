import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  View,
  Dimensions,
  FlatList,
  Animated,
  Image,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaView,
  SafeAreaViewBase,
  Text,
  StatusBar
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import faker from 'faker';

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize(['women', 'men'])}/${faker.datatype.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  }
})

const BG_IMG = 'https://images.pexels.com/photos/1231265/pexels-photo-1231265.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

export default() => {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  return <View style={{ flex: 1, backgroundColor: '#fff'}}>
    <Image
      source={{ uri: BG_IMG }}
      style={ StyleSheet.absoluteFillObject }
      blurRadius={80}
    />
    <Animated.FlatList
        data={DATA}
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

          return <Animated.View style={{ flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12,
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
            <View>
              <Image
                  source={{uri: item.image}}
                  style={{
                    width: 50, height: 50, borderRadius: AVATAR_SIZE,
                    marginRight: SPACING / 2
                  }}
              />
            </View>
            <View style={{ marginTop: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: '700' }}>Team 1</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', marginTop: 5 }}>Team 2</Text>
            </View>
            <View style={{ marginTop: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', marginTop: 11, marginLeft: 35 }}>69'</Text>
            </View>
            <View style={{ marginTop: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', marginLeft: 18 }}>0</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', marginTop: 5, marginLeft: 18 }}>0</Text>
            </View>
            <View style={{ marginTop: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', marginTop: 11, marginLeft: 18, color: 'orange'}}>over2.5</Text>
            </View>
            <View style={{ marginTop: 3 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: 'blue', marginTop: 11, position : 'absolute', right: 0 }}>2,10</Text>
            </View>
          </Animated.View>
        }}
    />
  </View>
}