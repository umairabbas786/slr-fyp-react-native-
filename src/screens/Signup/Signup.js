import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faCamera } from '@fortawesome/fontawesome-free-solid';


export default function Signup() {
    fontawesome.library.add(faCamera);

    const [image, setImage] = useState(null);
    const addImage = () => {};
    return (
        <View style={styles.mainContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 0.40, marginHorizontal: 20, marginVertical: 25 }}>
                    <Text style={{ color: 'white', marginBottom: 20, marginLeft: 5, textAlign: 'left', fontSize: 26 }}>Sign Up {"\n"}
                        <Text style={{ fontSize: 16, }}>
                            Become Our Member
                        </Text>
                    </Text>
                </View>
                <View style={{ flex: 1, marginHorizontal: 20 }}>
                    <View style={styles.containerSignup}>
                        {
                            image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                        }
                        <View style={styles.uploadBtnContainerSignup}>
                            <TouchableOpacity onPress={addImage} style={styles.uploadBtnSignup} >
                                <Text style={{ color: 'black' }}>{image ? 'Edit' : 'Upload'}</Text>
                                <FontAwesomeIcon icon="camera" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ marginBottom: 20, textAlign: 'center', color: 'white'}}>Upload Profile Picture</Text>
                    <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Select Account Type: </Text>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly'}}>
                        <TouchableOpacity
                            style={styles.buttonDarkSignup}
                            onPress={() => Alert.alert('Teacher')}>
                            <Text style={styles.buttonTextDark}>Teacher</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonDarkSignup}
                            onPress={() => Alert.alert('Student')}>
                            <Text style={styles.buttonTextDark}>Student</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
