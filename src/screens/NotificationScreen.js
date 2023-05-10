import React from 'react'
import { Text, View } from 'react-native'
import styles from '../assets/style/styles';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { Header } from '../assets/constants/Header';
import { theme } from '../assets/constants/Theme';

const Heading = ({ children }) => {
    return <Text style={styles.customHeading}>{children}</Text>;
};

const data = [
    { status: true },
    { status: true },
    { status: true },
    { status: true },
    { status: false },
    { status: false },
    { status: false },
    { status: false },
];

function NotificationScreen({ navigation }) {

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.conversationContainer}>
                <View
                    style={{
                        backgroundColor: item.status ? theme.colors.primarydark : '#E4E4E4',
                        height: 45,
                        width: 45,
                        borderRadius: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        overflow: 'visible',
                        shadowOffset: { width: 0, height: 2 },
                        shadowColor: '#000',
                        shadowOpacity: 0.2,
                    }}>
                    <Icon
                        name="bell-alt"
                        type="fontisto"
                        color={!item.status ? theme.colors.primarydark : 'white'}
                        size={18}
                    />
                </View>
                <Text style={{ width: '85%', color: 'black' }}>
                    Lorem ipsum dolor sit amet, consetetur scing elitr, sed diam nonumy
                    eirmod {'\n'}
                    <Text style={{ color: 'grey' }}>20 mins ago</Text>
                </Text>
            </TouchableOpacity>
        );
    };

  return (
      <View style={styles.profileMainContainer}>
          <Header back={() => navigation.goBack()} tag="Notifications" />
          <View style={{ height: 10 }} />
          <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => (
                  <View style={styles.conversationSeparator} />
              )}
          />
      </View>
  )
}

export default NotificationScreen
