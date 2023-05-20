import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faCamera } from '@fortawesome/fontawesome-free-solid';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Header } from "../assets/constants/Header";


export default function EditProfile({ navigation }) {
    fontawesome.library.add(faCamera);

    const [image, setImage] = useState('https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png');
    const [student, setStudent] = useState(true);
    const [teacher, setTeacher] = useState(false);
    const [gender, setGender] = useState('');

    const handleMale = () => {
        setGender('male');
    }
    const handleFemale = () => {
        setGender('female');
    }
    const semsters = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    const degree = ["degree 1", "degree 2"];
    const course = ["course 1", "course 2"];
    const department = ["department 1", "department 2"];

    const addImage = () => { };
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
                    {teacher === false && student === false ? '' : student ? (
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>First Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="First Name"
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Last Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="Last Name"
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                            </View>
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Registration Id</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Registration Id"
                                placeholderTextColor={'grey'}
                            />
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Email"
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
                                    style={gender === 'male' ? styles.buttonDarkProfileSignup : styles.buttonLightSignup}
                                    onPress={handleMale}>
                                    <Text style={gender === 'male' ? styles.buttonTextDark : styles.buttonTextLight}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={gender === 'female' ? styles.buttonDarkProfileSignup : styles.buttonLightSignup}
                                    onPress={handleFemale}>
                                    <Text style={gender === 'female' ? styles.buttonTextDark : styles.buttonTextLight}>Female</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Current Semester</Text>
                            <SelectDropdown
                                buttonStyle={styles.inputField}
                                defaultButtonText="Select Your Semester"
                                buttonTextStyle={styles.buttonTextLight}
                                dropdownIconPosition="right"
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={16} />;
                                }}
                                data={semsters}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    return item
                                }}
                            />

                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Degree</Text>
                            <SelectDropdown
                                buttonStyle={styles.inputField}
                                renderDropdownIcon={isOpened => {
                                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={16} />;
                                }}
                                defaultButtonText="Select Your Degree"
                                buttonTextStyle={styles.buttonTextLight}
                                dropdownIconPosition="right"
                                data={degree}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
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
                    ) : (
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>First Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="First Name"
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Last Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="Last Name"
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                            </View>
                            <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Email"
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
                                        style={gender === 'male' ? styles.buttonDarkProfileSignup : styles.buttonLightSignup}
                                    onPress={handleMale}>
                                    <Text style={gender === 'male' ? styles.buttonTextDark : styles.buttonTextLight}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                        style={gender === 'female' ? styles.buttonDarkProfileSignup : styles.buttonLightSignup}
                                    onPress={handleFemale}>
                                    <Text style={gender === 'female' ? styles.buttonTextDark : styles.buttonTextLight}>Female</Text>
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
                                data={course}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
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
                                data={department}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
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
