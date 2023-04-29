import React from 'react';
import { Text, View, Switch, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { theme } from './Theme';

const CustomTab = ({ type, title, right, isEnabled, setIsEnabled, onPress }) => {
    const toggleSwitch = () => setIsEnabled(!isEnabled);
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={{
                height: 50,
                overflow: 'visible',
                shadowOffset: { width: 0, height: 2 },
                shadowColor: '#000',
                shadowOpacity: 0.2,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginTop: 10,
            }}>
            <Text style={{ fontSize: 17 }}>{title}</Text>

            {type === 'switch' ? (
                <Switch
                    trackColor={{
                        false: theme.colors.grayFont,
                        true: theme.colors.primarydark,
                    }}
                    thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor={'#D2D2D2'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{ transform: [{ scaleX: 0.75 }, { scaleY: 0.7 }] }}
                />
            ) : type === 'simple' ? null : (
                <View style={{ flexDirection: 'row' }}>
                    {type !== 'arrowOnly' && (
                        <Text style={{ color: '#D2D2D2', fontSize: 16 }}>{right}</Text>
                    )}
                    {(type === 'arrow' || type === 'arrowOnly') && (
                        <Entypo
                            name="chevron-right"
                            color="#D2D2D2"
                            size={22}
                            style={{
                                marginRight: 5,
                            }}
                        />
                    )}
                </View>
            )}
        </TouchableOpacity>
    );
};
export default CustomTab;
