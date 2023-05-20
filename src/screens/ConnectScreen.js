import React, {useState} from 'react';
import {View, Text, Dimensions, TouchableOpacity, Image} from 'react-native';
import {Header} from '../assets/constants/Header';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const CustomTopBarELement = ({tag, selected, setSelected}) => {
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

const RenderItemLeft = ({profile, userName, accountName}) => {
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

const UserRenderItem = ({item, index}) => {
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
          'https://img.freepik.com/free-vector/flower-background-desktop-wallpaper-cute-vector_53876-136877.jpg'
        }
        userName={'Umair Abbass'}
        accountName={'@Umair Abbass'}
      />
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          borderColor: '#0B2265',
          borderRadius: 100,
          width: 35,
          height: 35,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <AntDesign name={'adduser'} color={'#0B2265'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const InterestRenderItem = ({item, index}) => {
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
          'https://img.freepik.com/free-vector/flower-background-desktop-wallpaper-cute-vector_53876-136877.jpg'
        }
        userName={'Umair Abbass'}
        accountName={'@Umair Abbass'}
      />
      <TouchableOpacity
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

const ApprovedRenderItem = ({item, index}) => {
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
          'https://img.freepik.com/free-vector/flower-background-desktop-wallpaper-cute-vector_53876-136877.jpg'
        }
        userName={'Umair Abbass'}
        accountName={'@Umair Abbass'}
      />

      <TouchableOpacity
        style={{
          borderColor: '#0B2265',
          borderWidth: 0.5,
          borderRadius: 100,
          width: 80,
          height: 35,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: '#0B2265',
            fontWeight: 'bold',
            fontSize: 14,
          }}>
          Connect
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ConnectScreen = ({navigation}) => {
  const [selected, setSelected] = useState('Lookup');
  return (
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
        renderItem={
          selected === 'Lookup'
            ? UserRenderItem
            : selected === 'Connects'
            ? InterestRenderItem
            : ApprovedRenderItem
        }
        data={
          selected === 'Lookup'
            ? [1, 2, 3]
            : selected === 'Connects'
            ? [1, 2, 4, 5]
            : [1, 2, 4, 5, 6, 7, 1, 2, 4, 5, 6, 7]
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
  );
};

export default ConnectScreen;
