import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedLoader from 'react-native-animated-loader';
import styles from '../assets/style/styles';

const { width, height } = Dimensions.get('window');

const ConnectScreen = ({ navigation }) => {

  const [lookups, setLookups] = useState([]);
  const [pending, setPending] = useState([]);
  const [connect, setConnect] = useState([]);
  const [loader, setLoader] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const userData = useSelector((state) => state.userDetails.user);

  const CustomTopBarELement = ({ tag, selected, setSelected }) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          setSelected(tag);
        }}
        style={{
          height: '80%',
          width: ((width * 0.9) / 100) * 31,
          borderRadius: 10,
          backgroundColor: selected === tag ? '#0B2265' : 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: selected === tag ? 'white' : 'black',
            fontSize: 16,
            fontWeight: '700',
          }}>
          {tag}
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderItemLeft = ({ profile, userName, accountName }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: 45,
            height: 45,
            resizeMode: 'cover',
            borderRadius: 100,
            marginRight: 10,
          }}
          source={{
            uri: profile,
          }}
        />
        <View>
          <Text
            style={{
              color: 'black',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            {userName}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 12,
            }}>
            {accountName}
          </Text>
        </View>
      </View>
    );
  };

  const UserRenderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <RenderItemLeft
          profile={
            item.profile_picture === null ? "https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography-thumbnail.png" : item.profile_picture
          }
          userName={item.first_name + ' ' + item.last_name}
          accountName={item.user_type === 'STUDENT' ? item.registration_number : item.email}
        />
        <TouchableOpacity
          onPress={() => { sendConnectRequest(item.id) }}
          style={{
            borderWidth: 0.5,
            borderColor: item.requested ? 'green' : '#0B2265',
            borderRadius: 100,
            width: 35,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AntDesign name={item.requested ? 'check' : 'adduser'} color={item.requested ? 'green' : '#0B2265'} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const InterestRenderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <RenderItemLeft
          profile={
            item.profile_picture === null ? "https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography-thumbnail.png" : item.profile_picture
          }
          userName={item.first_name + ' ' + item.last_name}
          accountName={item.user_type === 'STUDENT' ? item.registration_number : item.email}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat')
          }}
          style={{
            borderWidth: 0.5,
            borderColor: '#0B2265',
            borderRadius: 100,
            width: 80,
            height: 35,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <AntDesign name={'message1'} color={'#0B2265'} size={15} />
          <Text
            style={{
              color: '#0B2265',
              fontWeight: 'bold',
              fontSize: 12,
              marginLeft: 10,
            }}>
            Chat
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ApprovedRenderItem = ({ item, index }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
        }}>
        <RenderItemLeft
          profile={
            item.profile_picture === null ? "https://e7.pngegg.com/pngimages/527/663/png-clipart-logo-person-user-person-icon-rectangle-photography-thumbnail.png" : item.profile_picture
          }
          userName={item.first_name + ' ' + item.last_name}
          accountName={item.user_type === 'STUDENT' ? item.registration_number : item.email}
        />
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end'
        }}>
          <TouchableOpacity
            onPress={() => {
              acceptConnect(item.id)
            }}
            style={{
              borderColor: 'green',
              borderWidth: 0.5,
              borderRadius: 100,
              width: 35,
              height: 35,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name={'check'} color={'green'} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              destroyConnect(item.id)
            }}
            style={{
              borderColor: 'red',
              borderWidth: 0.5,
              borderRadius: 100,
              width: 35,
              height: 35,
              marginLeft: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name={'close'} color={'red'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const getScreenData = async () => {
    const token = await AsyncStorage.getItem('token');

    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    var raw = "";

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://slr.umairabbas.me/getconnects", requestOptions)
      .then(response => response.json())
      .then((response) => {
        setLookups(response.looking);
        setPending(response.pending);
        setConnect(response.connects);
        setLoader(false)
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getScreenData()
  }, []);

  const showErrorToast = (error) => {
    ToastAndroid.show(error, ToastAndroid.SHORT);
  };

  const sendConnectRequest = async (id) => {
    const token = await AsyncStorage.getItem('token');
    setLoader(true)

    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "other_id": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://slr.umairabbas.me/addconnect", requestOptions)
      .then(response => response.json())
      .then((response) => {
        if (response.success) {
          getScreenData();
          setLoader(true)
        } else {
          showErrorToast(response.error);
          setLoader(false)
        }
      })
      .catch(error => console.log('error', error));
  }

  const acceptConnect = async (id) => {
    const token = await AsyncStorage.getItem('token');
    setLoader(true)

    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "other_id": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://slr.umairabbas.me/acceptconnect", requestOptions)
      .then(response => response.json())
      .then((response) => {
        if (response.success) {
          getScreenData();
          showErrorToast("Connection Created");
          setLoader(true)
        } else {
          showErrorToast(response.error);
          setLoader(false)
        }
      })
      .catch(error => console.log('error', error));
  }

  const destroyConnect = async (id) => {
    const token = await AsyncStorage.getItem('token');
    setLoader(true)

    var myHeaders = new Headers();
    myHeaders.append("auth-token", token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "other_id": id
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://slr.umairabbas.me/deleteconnect", requestOptions)
      .then(response => response.json())
      .then((response) => {
        if (response.success) {
          getScreenData();
          showErrorToast("Connection Rejected.");
          setLoader(true)
        } else {
          showErrorToast(response.error);
          setLoader(false)
        }
      })
      .catch(error => console.log('error', error));
  }

  const NoDataFound = () => {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Image
          source={require('../assets/images/notfound.gif')}
          style={{ alignSelf: 'center', marginTop: 150 }}
        />
      </View>
    )
  }

  const [selected, setSelected] = useState('Lookup');

  return (
    <>
      <AnimatedLoader
        visible={loader}
        overlayColor="rgba(255,255,255,0.75)"
        animationStyle={styles.lottie}
        source={require("../assets/loader/loader.json")}
        speed={1}>
      </AnimatedLoader>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: '5%',
            height: 50,
            backgroundColor: '#0B2265',
            borderRadius: 20,
            marginTop: 5,
            marginBottom: 20,
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 22,
            }}>
            Connects
          </Text>
        </View>
        <View
          style={{
            width: '90%',
            height: 40,
            borderRadius: 10,
            backgroundColor: 'white',
            alignSelf: 'center',
            marginTop: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            elevation: 5,
          }}>
          <CustomTopBarELement
            tag={'Lookup'}
            selected={selected}
            setSelected={setSelected}
          />
          <CustomTopBarELement
            tag={'Connects'}
            selected={selected}
            setSelected={setSelected}
          />
          <CustomTopBarELement
            tag={'Pending'}
            selected={selected}
            setSelected={setSelected}
          />
        </View>
        <FlatList
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getScreenData} />}
          ListEmptyComponent={NoDataFound}
          renderItem={
            selected === 'Lookup'
              ? UserRenderItem
              : selected === 'Connects'
                ? InterestRenderItem
                : ApprovedRenderItem
          }
          data={
            selected === 'Lookup'
              ? lookups
              : selected === 'Connects'
                ? connect
                : pending
          }
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 10,
              }}
            />
          )}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          style={{
            marginTop: 10,
            marginHorizontal: 10,
          }}
        />
      </View>
    </>
  );
};

export default ConnectScreen;
