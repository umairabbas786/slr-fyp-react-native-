import React from 'react';
import { TouchableOpacity, Text, Dimensions } from 'react-native';

const CustomButton = ({
    children,
    onPress,
    color = 'white',
    txtColor = 'black',
    width = (Dimensions.get('window').width / 100) * 90,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={{
                width: width,
                height: 50,
                backgroundColor: color,
                borderRadius: 1000,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop:
                    txtColor !== 'black' &&
                        width === (Dimensions.get('window').width / 100) * 90
                        ? 30
                        : 10,
                overflow: 'visible',
                shadowOffset: { width: 0, height: 2 },
                shadowColor: '#000',
                shadowOpacity: 0.2,
            }}>
            <Text
                style={{
                    color: txtColor,
                    fontSize: 14,
                    fontWeight: '500',
                }}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

export { CustomButton };
