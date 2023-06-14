import React, { useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, ToastAndroid } from 'react-native';
import styles from '../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faCamera } from '@fortawesome/fontawesome-free-solid';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from 'react-native-animated-loader';
const validator = require('validator');


export default function SignupScreen({ navigation }) {
    fontawesome.library.add(faCamera);

    const [image, setImage] = useState(null);
    const [loader, setLoader] = useState(false);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [registration, setRegistration] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [semester, setSemester] = useState('');
    const [degree, setDegree] = useState('');
    const [course, setCourse] = useState('');
    const [department, setDepartment] = useState('');
    const [password, setPassword] = useState('');

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
        setGender('MALE');
    }
    const handleFemale = () => {
        setGender('FEMALE');
    }
    const semsters = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
    const degrees = ["BS Computer Science", "BS Software Engineering", "Bachelors Of Business Administration", "BS Accounting & Finance", "BS International Relations", "BS Psychology", "BS English Language & Literature", "BS Economics", "Doctor Of Pharmacy", "BS Biochemistry", "BS Microbiology", "BS Biotechnology", "BS Food Science and Technology", "B.Sc. Electrical Engineering", "B.Sc. Mechanical Engineering", "B.Sc. Civil Engineering", "BS Physics", "Bs Statistics", "BS Chemistry", "BS Botany", "BS Mathematics", "BS Zoology", "BS Media and Communication Studies", "Bachelor of Law LLB(Hons.)", "BS Data Science", "BS Business Analytics", "BS Real Estate Management", "BS Medical Laboratory Technology", "BS Artificial Intelligence", "BS Political Science", "BS Film, TV & Digital Media", "BS Audit And Taxation", "BBAPost ADP", "BS Human Nutrition and Dietetics", "BS Robotics & Intelligent Systems", "ADPAccounting and Finance", "ADPBusiness Administration", "ADPComputer Science", "ADSDouble Math and Physics", "ADSZoology, Botany and Chemistry","MS Computer Science"];
    const courses = ["course 1", "course 2"];
    const departments = ["Faculty of Pharmaceutical Sciences", "Faculty Of Languages & Literature", "Faculty of Information Technology And Computer Science", "Faculty of Engineering", "Faculty of Media And Mass Communication", "Faculty of Humanities And Social Sciences", "Faculty of Science & Technology", "Faculty of Management Sciences", "Faculty of Law"];

    const showErrorToast = (error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    };


    const handleSubmit = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        if (student === true) {
            var raw = JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "registration_number": registration,
                "email": email,
                "phone": phone === '' ? null : phone,
                "gender": gender,
                "current_semester": semester,
                "degree": degree,
                "user_type": "STUDENT",
                "password": password
            });
        }
        if (teacher === true) {
            var raw = JSON.stringify({
                "first_name": firstName,
                "last_name": lastName,
                "email": email,
                "phone": phone === '' ? null : phone,
                "gender": gender,
                "teaching_course": course,
                "teaching_department": department,
                "user_type": "TEACHER",
                "password": password
            });
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if (firstName === '') {
            showErrorToast('First Name is Required');
        }
        else if (lastName === '') {
            showErrorToast('Last Name is Required');
        }
        else if (registration === '' && student === true && teacher === false) {
            showErrorToast('Registration Id is Required');
        }
        else if (registration.length <= 10 && student === true) {
            showErrorToast('Invalid Registration Id');
        }
        else if (phone != '' && phone.length < 10) {
            showErrorToast('Invalid Phone Number');
        }
        else if (email === '') {
            showErrorToast('Email is Required');
        }
        else if (!validator.isEmail(email)) {
            showErrorToast('Invalid Email');
        }
        else if (email.match(/@(.*)$/)[1] != 'ucp.edu.pk') {
            showErrorToast('Invalid Email');
        }
        else if (semester === '' && student === true) {
            showErrorToast('Semester is Required');
        }
        else if (degree === '' && student === true) {
            showErrorToast('Degree is Required');
        }
        else if (course === '' && teacher === true) {
            showErrorToast('Course is Required');
        }
        else if (department === '' && teacher === true) {
            showErrorToast('Department is Required');
        }
        else if (gender === '') {
            showErrorToast('Gender is Required');
        }
        else if (password === '') {
            showErrorToast('Password is Required');
        }
        else if (password !== '' && password.length < 6) {
            showErrorToast('Password Length should be greater than 5');
        }
        else {
            setLoader(true);
            fetch("https://slr.umairabbas.me/createuser", requestOptions)
                .then(response => response.json())
                .then(async (response) => {
                    if (response.success === false) {
                        setLoader(false);
                        showErrorToast(response.error);
                    } else {
                        setLoader(false);
                        setFirstName('');
                        setLastName('');
                        setGender('');
                        setEmail('');
                        setPhone('');
                        setRegistration('');
                        setCourse('');
                        setDegree('');
                        setDepartment('');
                        setSemester('');
                        setPassword('');
                        await AsyncStorage.setItem('token', response.authtoken);
                        navigation.navigate('Otp', { name: 'signup' });
                    }
                })
                .catch(error => console.log('error', error));
        }
    }

    const addImage = () => { };
    return (
        <>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={styles.lottie}
                source={require("../assets/loader/loader.json")}
                speed={1}>
            </AnimatedLoader>
            <View style={styles.mainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 0.40, marginHorizontal: 20, marginVertical: 25 }}>
                        <Text style={{ color: 'white', marginBottom: 20, marginLeft: 5, textAlign: 'left', fontSize: 26 }}>
                            <FontAwesome name={'chevron-left'} color={'#fff'} size={22} onPress={() => navigation.goBack()} /> {""}
                            Sign Up {"\n"}
                            <Text style={{ fontSize: 16, }}>
                                Become Our Member
                            </Text>
                        </Text>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <Text style={{ color: 'white', marginBottom: 0, marginLeft: 5 }}>Continue as </Text>
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
                                            placeholder="First Name"
                                            onChangeText={(text) => setFirstName(text)}
                                            value={firstName}
                                            placeholderTextColor={'grey'}
                                        />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Last Name</Text>
                                        <TextInput
                                            style={styles.customInputField}
                                            placeholder="Last Name"
                                            onChangeText={(text) => setLastName(text)}
                                            value={lastName}
                                            placeholderTextColor={'grey'}
                                        />
                                    </View>
                                </View>
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Registration Id</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Registration Id"
                                    onChangeText={(text) => setRegistration(text)}
                                    value={registration}
                                    placeholderTextColor={'grey'}
                                />
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Email"
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    placeholderTextColor={'grey'}
                                />
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Phone Number (optional)</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Phone Number"
                                    onChangeText={(text) => setPhone(text)}
                                    value={phone}
                                    placeholderTextColor={'grey'}
                                    keyboardType={'phone-pad'}
                                />
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Current Semester</Text>
                                <SelectDropdown
                                    buttonStyle={styles.inputField}
                                    defaultButtonText="Select Your Semester"
                                    buttonTextStyle={styles.buttonTextLight}
                                    dropdownIconPosition="right"
                                    defaultValue={semester}
                                    search={true}
                                    searchPlaceHolder="Search Your Semester"
                                    dropdownStyle={styles.dropdownStyle}
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
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Degree</Text>
                                <SelectDropdown
                                    buttonStyle={styles.inputField}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={16} />;
                                    }}
                                    defaultButtonText="Select Your Degree"
                                    buttonTextStyle={styles.buttonTextLight}
                                    dropdownIconPosition="right"
                                    defaultValue={degree}
                                    search={true}
                                    searchPlaceHolder="Search Your Degree"
                                    dropdownStyle={styles.dropdownStyle}
                                    selectedRowStyle={styles.selectedField}
                                    selectedRowTextStyle={styles.selectedFieldText}
                                    data={degrees}
                                    onSelect={(selectedItem, index) => {
                                        setDegree(selectedItem)
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
                                        style={gender === 'MALE' ? styles.buttonDarkSignup : styles.buttonLightSignup}
                                        onPress={handleMale}>
                                        <Text style={gender === 'MALE' ? styles.buttonTextDark : styles.buttonTextLight}>Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={gender === 'FEMALE' ? styles.buttonDarkSignup : styles.buttonLightSignup}
                                        onPress={handleFemale}>
                                        <Text style={gender === 'FEMALE' ? styles.buttonTextDark : styles.buttonTextLight}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Password</Text>
                                <TextInput
                                    style={styles.inputField}
                                    secureTextEntry={true}
                                    placeholder="Enter your Password"
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    placeholderTextColor={'grey'}
                                />
                                <TouchableOpacity
                                    style={styles.buttonDark}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.buttonTextDark}>Sign up</Text>
                                </TouchableOpacity>
                                <View style={{ marginBottom: 20 }}>
                                    <TouchableOpacity
                                        style={styles.buttonLight}
                                        onPress={() => navigation.navigate('Login')}>
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
                                            placeholder="First Name"
                                            onChangeText={(text) => setFirstName(text)}
                                            value={firstName}
                                            placeholderTextColor={'grey'}
                                        />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Last Name</Text>
                                        <TextInput
                                            style={styles.customInputField}
                                            placeholder="Last Name"
                                            onChangeText={(text) => setLastName(text)}
                                            value={lastName}
                                            placeholderTextColor={'grey'}
                                        />
                                    </View>
                                </View>
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Email</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Email"
                                    onChangeText={(text) => setEmail(text)}
                                    value={email}
                                    placeholderTextColor={'grey'}
                                />
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Phone Number (optional)</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Phone Number"
                                    onChangeText={(text) => setPhone(text)}
                                    value={phone}
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
                                    defaultValue={course}
                                    dropdownStyle={styles.dropdownStyle}
                                    selectedRowStyle={styles.selectedField}
                                    selectedRowTextStyle={styles.selectedFieldText}
                                    data={courses}
                                    onSelect={(selectedItem, index) => {
                                        setCourse(selectedItem)
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
                                    defaultValue={department}
                                    search={true}
                                    searchPlaceHolder="Search Your Department"
                                    dropdownStyle={styles.dropdownStyle}
                                    selectedRowStyle={styles.selectedField}
                                    selectedRowTextStyle={styles.selectedFieldText}
                                    data={departments}
                                    onSelect={(selectedItem, index) => {
                                        setDepartment(selectedItem)
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
                                        style={gender === 'MALE' ? styles.buttonDarkSignup : styles.buttonLightSignup}
                                        onPress={handleMale}>
                                        <Text style={gender === 'MALE' ? styles.buttonTextDark : styles.buttonTextLight}>Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={gender === 'FEMALE' ? styles.buttonDarkSignup : styles.buttonLightSignup}
                                        onPress={handleFemale}>
                                        <Text style={gender === 'FEMALE' ? styles.buttonTextDark : styles.buttonTextLight}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: 'white', marginBottom: 5, marginLeft: 5 }}>Password</Text>
                                <TextInput
                                    style={styles.inputField}
                                    secureTextEntry={true}
                                    placeholder="Enter your Password"
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    placeholderTextColor={'grey'}
                                />
                                <TouchableOpacity
                                    style={styles.buttonDark}
                                    onPress={handleSubmit}
                                // onPress={() => navigation.navigate('Otp', { name: 'signup' })}
                                >
                                    <Text style={styles.buttonTextDark}>Sign up</Text>
                                </TouchableOpacity>
                                <View style={{ marginBottom: 20 }}>
                                    <TouchableOpacity
                                        style={styles.buttonLight}
                                        onPress={() => navigation.navigate('Login')}>
                                        <Text style={styles.buttonTextLight}>Back to Login</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
