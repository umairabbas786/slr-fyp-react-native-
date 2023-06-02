import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faCamera } from '@fortawesome/fontawesome-free-solid';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Header } from "../assets/constants/Header";
import { useSelector } from "react-redux";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


export default function EditProfile({ navigation }) {

    const userData = useSelector((state) => state.userDetails.user);

    fontawesome.library.add(faCamera);

    const [image, setImage] = useState('https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png');

    const [phone, setPhone] = useState(userData.phone);
    const [semester, setSemester] = useState(userData.current_semester);
    const [course, setCourse] = useState(userData.teaching_course);
    const [department, setDepartment] = useState(userData.teaching_department);

    const semsters = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    const courses = ["course 1", "course 2"];
    const departments = ["department 1", "department 2"];

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.log(err);
                console.log('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const addImage = async () => {

        let options = {
            mediaType: 'photo',
            maxWidth: 200,
            maxHeight: 200,
            allowsEditing: true,
            aspect: [4, 3],
        }

        let isStoragePermitted = await requestExternalWritePermission();

        let _image = launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                console.log('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                console.log('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                console.log(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
        });

    };
    return (
        <View style={styles.ProfileMainContainer}>
            <Header back={() => navigation.goBack()} tag="Edit Profile" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 0.40, marginVertical: 25 }}>
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
                    {userData.user_type === 'TEACHER' ? '' : userData.user_type ? (
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>First Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="First Name"
                                        value={userData.first_name}
                                        editable={false}
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Last Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="Last Name"
                                        value={userData.last_name}
                                        editable={false}
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                            </View>
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Registration Id</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Registration Id"
                                value={userData.registration_number}
                                editable={false}
                                placeholderTextColor={'grey'}
                            />
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Email"
                                value={userData.email}
                                editable={false}
                                placeholderTextColor={'grey'}
                            />
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Phone Number</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Phone Number"
                                onChangeText={(text) => setPhone(text)}
                                value={phone}
                                placeholderTextColor={'grey'}
                                keyboardType={'phone-pad'}
                            />
                            <Text style={{ color: 'black', marginBottom: -5, marginLeft: 5 }}>Gender</Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, justifyContent: 'space-evenly' }}>
                                <TouchableOpacity
                                    style={userData.gender === 'MALE' ? styles.buttonDarkProfileSignup : styles.buttonLightSignup}
                                >
                                    <Text style={userData.gender === 'MALE' ? styles.buttonTextDark : styles.buttonTextLight}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={userData.gender === 'FEMALE' ? styles.buttonDarkProfileSignup : styles.buttonLightSignup}
                                >
                                    <Text style={userData.gender === 'FEMALE' ? styles.buttonTextDark : styles.buttonTextLight}>Female</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Current Semester</Text>
                            <SelectDropdown
                                buttonStyle={styles.inputField}
                                defaultButtonText="Select Your Semester"
                                buttonTextStyle={styles.buttonTextLight}
                                dropdownIconPosition="right"
                                dropdownStyle={styles.dropdownStyle}
                                defaultValue={semester}
                                selectedRowStyle={styles.selectedField}
                                selectedRowTextStyle={styles.selectedFieldText}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={16} />;
                                }}
                                data={semsters}
                                onSelect={(selectedItem, index) => {
                                    setSemester(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />

                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Degree</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Degree"
                                value={userData.degree}
                                editable={false}
                                placeholderTextColor={'grey'}
                            />
                            <TouchableOpacity
                                style={styles.buttonProfileDark}
                                onPress={() => navigation.goBack()}>
                                <Text style={styles.buttonTextDark}>Save Changes</Text>
                            </TouchableOpacity>
                            <View style={{ height: 80 }}></View>
                        </View>
                    ) : (
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>First Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="First Name"
                                        value={userData.first_name}
                                        editable={false}
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Last Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="Last Name"
                                        value={userData.last_name}
                                        editable={false}
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                            </View>
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Email"
                                value={userData.email}
                                editable={false}
                                placeholderTextColor={'grey'}
                            />
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Phone Number (optional)</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Phone Number"
                                placeholderTextColor={'grey'}
                                keyboardType={'phone-pad'}
                            />
                            <Text style={{ color: 'black', marginBottom: -5, marginLeft: 5 }}>Gender</Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, justifyContent: 'space-evenly' }}>
                                <TouchableOpacity
                                    style={userData.gender === 'MALE' ? styles.buttonDarkProfileSignup : styles.buttonLightSignup}
                                >
                                    <Text style={userData.gender === 'MALE' ? styles.buttonTextDark : styles.buttonTextLight}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={userData.gender === 'FEMALE' ? styles.buttonDarkProfileSignup : styles.buttonLightSignup}
                                >
                                    <Text style={userData.gender === 'FEMALE' ? styles.buttonTextDark : styles.buttonTextLight}>Female</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Teaching Course</Text>
                            <SelectDropdown
                                buttonStyle={styles.inputField}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={16} />;
                                }}
                                defaultButtonText="Select Your Teaching Course"
                                buttonTextStyle={styles.buttonTextLight}
                                dropdownIconPosition="right"
                                data={courses}
                                defaultValue={course}
                                dropdownStyle={styles.dropdownStyle}
                                selectedRowStyle={styles.selectedField}
                                selectedRowTextStyle={styles.selectedFieldText}
                                onSelect={(selectedItem, index) => {
                                    setCourse(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Teaching Department</Text>
                            <SelectDropdown
                                buttonStyle={styles.inputField}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={16} />;
                                }}
                                defaultButtonText="Select Your Teaching Department"
                                buttonTextStyle={styles.buttonTextLight}
                                dropdownIconPosition="right"
                                data={departments}
                                defaultValue={department}
                                dropdownStyle={styles.dropdownStyle}
                                selectedRowStyle={styles.selectedField}
                                selectedRowTextStyle={styles.selectedFieldText}
                                onSelect={(selectedItem, index) => {
                                    setDepartment(selectedItem);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />
                            <TouchableOpacity
                                style={styles.buttonProfileDark}
                                onPress={() => navigation.goBack()}>
                                <Text style={styles.buttonTextDark}>Save Changes</Text>
                            </TouchableOpacity>
                            <View style={{ height: 80 }}></View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
