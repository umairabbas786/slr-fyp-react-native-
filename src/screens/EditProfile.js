import React, { useEffect, useState } from "react";
import { Text, View, Image, TextInput, TouchableOpacity, Alert, ScrollView, ToastAndroid } from 'react-native';
import styles from '../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faCamera } from '@fortawesome/fontawesome-free-solid';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Header } from "../assets/constants/Header";
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import AnimatedLoader from 'react-native-animated-loader';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUser } from "../redux/actions/userProfile";


export default function EditProfile({ navigation }) {

    const dispatch = useDispatch();

    const userData = useSelector((state) => state.userDetails.user);

    fontawesome.library.add(faCamera);

    const [image, setImage] = useState('https://cdn-icons-png.flaticon.com/512/3135/3135715.png');
    const [checkImage, setCheckImage] = useState(false);

    useEffect(() => {
        if (userData.profile_picture !== null) {
            setImage(userData.profile_picture);
        }
    }, []);

    const [phone, setPhone] = useState(userData.phone);
    const [loader, setLoader] = useState(false);

    const showErrorToast = (error) => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
    };

    const addImage = () => {
        ImagePicker.openPicker({
            width: 125,
            height: 125,
            cropping: true,
            cropperCircleOverlay: true,
            mediaType: 'photo'
        }).then(image => {
            setImage(image.path)
            setCheckImage(true)
        });
    };

    const updateProfilePicture = async () => {

        const token = await AsyncStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("auth-token", token);
        myHeaders.append("Content-Type", "multipart/form-data");
        myHeaders.append("Accept", "application/json");

        var formdata = new FormData();
        formdata.append("profilePicture", {
            name: image,
            type: "image/png",
            uri: image
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        if (checkImage) {
            setLoader(true);
            fetch("https://slr.umairabbas.me/updateuserprofilepicture", requestOptions)
                .then(response => response.json())
                .then(async (response) => {
                    if (response.success === true) {
                        showErrorToast(response.message);
                        dispatch(setUser(response.response));
                        setLoader(false);
                        setCheckImage(false);
                        setImage(response.response.profile_picture);
                    } else {
                        showErrorToast(response.error);
                        setLoader(false);
                        setCheckImage(false);
                    }
                })
                .catch(error => console.log('error', error));
        }
        else {
            showErrorToast('Please Choose Profile Picture');
        }
    }

    const handleSubmit = async () => {

        const token = await AsyncStorage.getItem('token');

        var myHeaders = new Headers();
        myHeaders.append("auth-token", token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "phone": phone,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        if (phone === '') {
            showErrorToast('Phone Number is Required');
        }
        else if (phone.length < 10) {
            showErrorToast('Invalid Phone Number');
        }
        else {
            setLoader(true);
            fetch("https://slr.umairabbas.me/updateuserprofile", requestOptions)
                .then(response => response.json())
                .then((response) => {
                    if (response.success === false) {
                        setLoader(false);
                        showErrorToast(response.error);
                        setPhone(userData.phone);
                    } else {
                        setLoader(false);
                        setPhone(userData.phone);
                        dispatch(setUser(response.response));
                        navigation.navigate('Profile');
                    }
                })
                .catch((error) => {console.log('error', error); setLoader(false)});
        }
    }

    return (
        <>
            <AnimatedLoader
                visible={loader}
                overlayColor="rgba(255,255,255,0.75)"
                animationStyle={styles.lottie}
                source={require("../assets/loader/loader.json")}
                speed={1}>
            </AnimatedLoader>
            <View style={styles.ProfileMainContainer}>
                <Header back={() => navigation.goBack()} tag="Edit Profile" />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ flex: 0.40, marginVertical: 25 }}>
                    </View>
                    <View style={{ flex: 1, marginHorizontal: 20 }}>
                        <View style={styles.containerSignup}>
                            {
                                image && <Image source={{ uri: image }} style={{ width: 125, height: 125 }} />
                            }
                            <View style={styles.uploadBtnContainerSignup}>
                                <TouchableOpacity onPress={addImage} style={styles.uploadBtnSignup} >
                                    <Text style={{ color: 'black' }}>{image ? 'Edit' : 'Upload'}</Text>
                                    <FontAwesomeIcon icon="camera" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10, justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.buttonChangeProfilePicture} onPress={updateProfilePicture}>
                                <Text style={{ color: 'white' }}>Update Profile Picture</Text>
                            </TouchableOpacity>
                        </View>
                        {userData.user_type === 'STUDENT' ? (
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
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Current Semester"
                                    value={userData.current_semester}
                                    editable={false}
                                    placeholderTextColor={'grey'}
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
                                    onPress={handleSubmit}>
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
                                <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Teaching Course</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Teaching Courses"
                                    value={userData.teaching_course}
                                    editable={false}
                                    placeholderTextColor={'grey'}
                                />
                                <Text style={{ color: 'black', marginBottom: 5, marginLeft: 5 }}>Teaching Department</Text>
                                <TextInput
                                    style={styles.inputField}
                                    placeholder="Enter your Teacheing Department"
                                    value={userData.teaching_department}
                                    editable={false}
                                    placeholderTextColor={'grey'}
                                />
                                <TouchableOpacity
                                    style={styles.buttonProfileDark}
                                    onPress={handleSubmit}>
                                    <Text style={styles.buttonTextDark}>Save Changes</Text>
                                </TouchableOpacity>
                                <View style={{ height: 80 }}></View>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </View>
        </>
    );
}
