import React, { useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
} from 'react-native';

import styles from '../assets/style/styles';
import CustomTab from '../assets/constants/CustomTab';
import { Header } from '../assets/constants/Header';

const { width, height } = Dimensions.get('window');

const SecurityPrivacy = ({ navigation }) => {
    const [isEnabled, setIsEnabled] = useState('date');

    const Heading = ({ children, right }) => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: '5%',
                    marginTop: 10,
                }}>
                <Text
                    style={{
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: 16,
                    }}>
                    {children}
                </Text>
                {right && right()}
            </View>
        );
    };
    return (
        <View style={styles.ProfileMainContainer}>
            <Header back={() => navigation.goBack()} tag="Security & Privacy" />
            <ScrollView style={{ marginHorizontal: 10 }}>
                <Heading>Setup your safety / privacy.</Heading>
                <Text style={styles.texted}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua.
                </Text>
                <CustomTab
                    type="switch"
                    title={'Show Email'}
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                />
                <Text style={styles.texted}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua.
                </Text>
                <CustomTab
                    type="switch"
                    title={'Show Phone Number'}
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                />
                <Text style={styles.texted}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua.
                </Text>
                <CustomTab
                    type="switch"
                    title={'Show Degree'}
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                />
                <Text style={styles.texted}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
                    nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                    sed diam voluptua.
                </Text>
                <CustomTab
                    type="switch"
                    title={'Show Current Semester'}
                    isEnabled={isEnabled}
                    setIsEnabled={setIsEnabled}
                />

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

export default SecurityPrivacy;
