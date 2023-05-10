import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const Header = ({ tag, back, sub, navigation }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={back}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {back ? (
                    <Entypo name="chevron-left" color="white" size={24} style={{}} />
                ) : (
                    sub && (
                        <Icon
                            name="suitcase-rolling"
                            type="font-awesome-5"
                            color={'white'}
                            size={22}
                            style={{ marginRight: 5 }}
                        />
                    )
                )}
                <Text
                    style={[
                        styles.headerTag,
                        {
                            fontWeight: sub ? 'normal' : 'bold',
                        },
                    ]}>
                    {tag}
                </Text>
            </TouchableOpacity>
            {back ? null : sub ? (
                <Entypo name="chevron-right" color="white" size={24} style={{}} />
            ) : (
                <TouchableOpacity activeOpacity={0.7} style={styles.headerButton}>
                    <View style={styles.searchColor} />
                    <AntDesign
                        name={'search1'}
                        color={'white'}
                        size={18}
                        onPress={() => {
                            navigation.navigate('SearchFilters');
                        }}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
        height: 50,
        backgroundColor: '#0B2265',
        borderRadius: 20,
        marginTop: 5,
        marginHorizontal: 10
    },
    headerTag: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
    },
    headerButton: {
        width: 35,
        height: 35,
        borderRadius: 100,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchColor: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        opacity: 0.5,
    },
});

export { Header };
