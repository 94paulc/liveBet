import React from "react";
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

const Domations = () => {
    return (
        <View style={styles.container}>
            <Text>
                Donations
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Domations;