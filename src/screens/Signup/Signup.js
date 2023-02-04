import React, { useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import styles from '../../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faCamera, faChevronDown, faChevronUp } from '@fortawesome/fontawesome-free-solid';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function Signup({ navigation }) {
    fontawesome.library.add(faCamera);

    const [image, setImage] = useState(null);
    const [student, setStudent] = useState(false);
    const [teacher, setTeacher] = useState(false);
    const [gender, setGender] = useState('');

    const handleStudent = () => {
        setStudent(true);
        setTeacher(false);
    };
    const handleTeacher = () => {
        setStudent(false);
        setTeacher(true)
    }
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
                    <Text style={{ marginBottom: 20, textAlign: 'center', color: 'white' }}>Upload Profile Picture</Text>
                    <Text style={{ color: 'white', marginBottom: 0, marginLeft: 5 }}>Select Account Type: </Text>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom: 15, justifyContent: 'space-evenly' }}>
                        <TouchableOpacity
                            style={student === false ? styles.buttonLightSignup : styles.buttonDarkSignup}
                            onPress={handleStudent}>
                            <Text style={student === false ? styles.buttonTextLight : styles.buttonTextDark}>Student</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={teacher === false ? styles.buttonLightSignup : styles.buttonDarkSignup}
                            onPress={handleTeacher}>
                            <Text style={teacher === false ? styles.buttonTextLight : styles.buttonTextDark}>Teacher</Text>
                        </TouchableOpacity>
                    </View>
                    {teacher === false && student === false ? '' : student ? (
                        <View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>First Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="Enter your First Name"
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Last Name</Text>
                                    <TextInput
                                        style={styles.customInputField}
                                        placeholder="Enter your Last Name"
                                        placeholderTextColor={'grey'}
                                    />
                                </View>
                            </View>
                            <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Registration Id</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Registration Id"
                                placeholderTextColor={'grey'}
                            />
                            <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Email"
                                placeholderTextColor={'grey'}
                            />
                            <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Phone Number (optional)</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="Enter your Phone Number"
                                placeholderTextColor={'grey'}
                                keyboardType={'phone-pad'}
                            />
                            <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Current Semester</Text>
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
                            <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Degree</Text>
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
                            <Text style={{ color: 'white', marginBottom: -5, marginLeft: 5 }}>Gender</Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, justifyContent: 'space-evenly' }}>
                                <TouchableOpacity
                                    style={gender === 'male' ? styles.buttonDarkSignup : styles.buttonLightSignup}
                                    onPress={handleMale}>
                                    <Text style={gender === 'male' ? styles.buttonTextDark : styles.buttonTextLight}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={gender === 'female' ? styles.buttonDarkSignup : styles.buttonLightSignup}
                                    onPress={handleFemale}>
                                    <Text style={gender === 'female' ? styles.buttonTextDark : styles.buttonTextLight}>Female</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Password</Text>
                            <TextInput
                                style={styles.inputField}
                                secureTextEntry={true}
                                placeholder="Enter your Password"
                                placeholderTextColor={'grey'}
                            />
                            <TouchableOpacity
                                style={styles.buttonDark}
                                onPress={() => Alert.alert('Sign up')}>
                                <Text style={styles.buttonTextDark}>Sign up</Text>
                            </TouchableOpacity>
                            <View style={{ marginBottom: 20 }}>
                                <TouchableOpacity
                                    style={styles.buttonLight}
                                    onPress={() => navigation.navigate('Welcome')}>
                                    <Text style={styles.buttonTextLight}>Back to Login</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                            <View>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>First Name</Text>
                                        <TextInput
                                            style={styles.customInputField}
                                            placeholder="Enter your First Name"
                                            placeholderTextColor={'grey'}
                                        />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Last Name</Text>
                                        <TextInput
                                            style={styles.customInputField}
                                            placeholder="Enter your Last Name"
                                            placeholderTextColor={'grey'}
                                        />
                                    </View>
                                </View>
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Email"
                                    placeholderTextColor={'grey'}
                                />
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Phone Number (optional)</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Phone Number"
                                    placeholderTextColor={'grey'}
                                    keyboardType={'phone-pad'}
                                />
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Teaching Course</Text>
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
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Teaching Department</Text>
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
                                <Text style={{ color: 'white', marginBottom: -5, marginLeft: 5 }}>Gender</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, justifyContent: 'space-evenly' }}>
                                    <TouchableOpacity
                                        style={gender === 'male' ? styles.buttonDarkSignup : styles.buttonLightSignup}
                                        onPress={handleMale}>
                                        <Text style={gender === 'male' ? styles.buttonTextDark : styles.buttonTextLight}>Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={gender === 'female' ? styles.buttonDarkSignup : styles.buttonLightSignup}
                                        onPress={handleFemale}>
                                        <Text style={gender === 'female' ? styles.buttonTextDark : styles.buttonTextLight}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Password</Text>
                                <TextInput
                                    style={styles.inputField}
                                    secureTextEntry={true}
                                    placeholder="Enter your Password"
                                    placeholderTextColor={'grey'}
                                />
                                <TouchableOpacity
                                    style={styles.buttonDark}
                                    onPress={() => Alert.alert('Sign up')}>
                                    <Text style={styles.buttonTextDark}>Sign up</Text>
                                </TouchableOpacity>
                                <View style={{marginBottom: 20}}>
                                    <TouchableOpacity
                                        style={styles.buttonLight}
                                        onPress={() => navigation.navigate('Welcome')}>
                                        <Text style={styles.buttonTextLight}>Back to Login</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
