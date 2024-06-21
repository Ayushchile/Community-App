/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import OnboardingSwip from 'react-native-onboarding-swiper';
import { launchImageLibrary } from 'react-native-image-picker';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';

const BASE_URL = 'https://api.countrystatecity.in/v1';

export default function Onboarding() {
    // const [countryData, setCountryData] = useState<any[]>([]);
    // const [stateData, setStateData] = useState([]);
    // const [cityData, setCityData] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const headers = new Headers();
    //             headers.append('X-CSCAPI-KEY', 'Z2QycHJkTGNZTUhSOWpWN01WN2ZUb2dncUpIN1R1SU1wZm1WWEppRw==');
    //             const requestOptions: RequestInit = {
    //                 method: 'GET',
    //                 headers: headers,
    //                 redirect: 'follow',
    //             };

    //             const response = await fetch('https://api.countrystatecity.in/v1/countries', requestOptions);
    //             const data = await response.json();

    //             const countryArray = data.map((item: any) => ({
    //                 value: item.iso2,
    //                 label: item.name,
    //             }));

    //             setCountryData(countryArray);
    //         } catch (error) {
    //             console.log('error', error);
    //         }
    //     };

    //     fetchData();
    // }, []);
    const [countryData, setCountryData] = useState<any[]>([]);
  const [stateData, setStateData] = useState<any[]>([]);
  const [cityData, setCityData] = useState<any[]>([]);
  const [country, setCountry] = useState<string | null>(null);
  const [state, setState] = useState<string | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [stateName, setStateName] = useState<string | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = new Headers();
        headers.append('X-CSCAPI-KEY', 'Z2QycHJkTGNZTUhSOWpWN01WN2ZUb2dncUpIN1R1SU1wZm1WWEppRw==');
        const requestOptions: RequestInit = {
          method: 'GET',
          headers: headers,
          redirect: 'follow',
        };

        const response = await fetch(`${BASE_URL}/countries`, requestOptions);
        const data = await response.json();

        const countryArray = data.map((item: any) => ({
          value: item.iso2,
          label: item.name,
        }));

        setCountryData(countryArray);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  const handleState = async (countryCode: string) => {
    try {
      const headers = new Headers();
      headers.append('X-CSCAPI-KEY', 'Z2QycHJkTGNZTUhSOWpWN01WN2ZUb2dncUpIN1R1SU1wZm1WWEppRw==');
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URL}/countries/${countryCode}/states`, requestOptions);
      const data = await response.json();
      const stateArray = data.map((item: any) => ({
        value: item.iso2,
        label: item.name,
      }));
      setStateData(stateArray);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCity = async (countryCode: string, stateCode: string) => {
    try {
      const headers = new Headers();
      headers.append('X-CSCAPI-KEY', 'Z2QycHJkTGNZTUhSOWpWN01WN2ZUb2dncUpIN1R1SU1wZm1WWEppRw==');
      const requestOptions: RequestInit = {
        method: 'GET',
        headers: headers,
        redirect: 'follow',
      };

      const response = await fetch(`${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`, requestOptions);
      const data = await response.json();

      const cityArray = data.map((item: any) => ({
        value: item.id,
        label: item.name,
      }));
      setCityData(cityArray);
    } catch (error) {
      console.log(error);
    }
  };
    const [selectImage, setSelectImage] = useState('');
    const [gender, setGender] = useState('');
    //const [country, setCountry] = useState('');
    const [selected, setSelected] = React.useState([]);
    const data = [
        { key: '1', value: 'INTEREST(Any 3)', disabled: true },
        { key: '2', value: 'Music' },
        { key: '3', value: 'Dance' },
        { key: '3', value: 'Technology' },
        { key: '3', value: 'Vloging' },
        { key: '3', value: 'Travel' },
        { key: '3', value: 'Plitics' },
        { key: '4', value: 'PROFESSION(Any 2)', disabled: true },
        { key: '5', value: 'Accountant' },
        { key: '6', value: 'Architect' },
        { key: '7', value: 'Artist' },
        { key: '7', value: 'Chef' },
        { key: '7', value: 'Doctor' },
        { key: '7', value: 'Engineer' },
    ];
    const ImagePicker = () => {
        let option = {
            storageOptions: {
                path: 'image',
            },
        };
        launchImageLibrary(option, response => {
            setSelectImage(response.assets[0].uri)
            console.log(response);
        });
    };
    const navigation = useNavigation(); // Initialize useNavigation hook
    const handleDone = () => {
        navigation.navigate('Nav');
    };

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View style={styles.container}>
            <OnboardingSwip
                onDone={handleDone}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Image source={require('../assets/1.png')} style={{ width: 430, height: 200, marginTop: 30 }} />
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}>Your Name:</Text>
                                    <TextInput
                                        style={{ width: '80%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, borderRadius: 20 }}
                                        placeholder="Enter your name"
                                    />
                                    <Text style={{ fontSize: 20 }}>Date of Birth:</Text>
                                    <TextInput
                                        style={{ width: '80%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10 }}
                                        placeholder="dd/mm/yyyy"
                                    />
                                    <Text style={{ fontSize: 20 }}>Gender:</Text>
                                    <Picker
                                        selectedValue={gender}
                                        style={{ width: '80%', height: 40, marginBottom: 10, borderBottomWidth: 1 }} onValueChange={(itemValue, _itemIndex) => setGender(itemValue)}
                                    >
                                        <Picker.Item label="Select Gender" value="" />
                                        <Picker.Item label="Male" value="male" />
                                        <Picker.Item label="Female" value="female" />
                                        <Picker.Item label="Other" value="other" />
                                    </Picker>
                                    <Text style={{ fontSize: 20 }}>Country:</Text>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={countryData}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select country' : '...'}
                                        searchPlaceholder="Search..."
                                        value={country}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setCountry(item.value);
                                            handleState(item.value);
                                            setCountryName(item.label);
                                            setIsFocus(false);
                                        }}
                                    />
                                    <Text style={{ fontSize: 20 }}>State:</Text>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={stateData}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select state' : '...'}
                                        searchPlaceholder="Search..."
                                        value={state}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setState(item.value);
                                            handleCity(country, item.value);
                                            setStateName(item.label);
                                            setIsFocus(false);
                                        }}
                                    />
                                    <Text style={{ fontSize: 20 }}>City:</Text>
                                    <Dropdown
                                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                                        placeholderStyle={styles.placeholderStyle}
                                        selectedTextStyle={styles.selectedTextStyle}
                                        inputSearchStyle={styles.inputSearchStyle}
                                        iconStyle={styles.iconStyle}
                                        data={cityData}
                                        search
                                        maxHeight={300}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? 'Select city' : '...'}
                                        searchPlaceholder="Search..."
                                        value={city}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                        onChange={item => {
                                            setCity(item.value);
                                            setCityName(item.label);
                                            setIsFocus(false);
                                        }}
                                    />
                                </View>
                            </View>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Image source={require('../assets/2.png')} style={{ width: 400, height: 200, marginBottom: 50 }} />
                                <Image style={{
                                    borderWidth: 1,
                                    borderColor: 'pink', marginLeft: 100, width: 200, height: 200, marginTop: 30, borderRadius: 800,
                                }} source={{ uri: selectImage }} />
                                <TouchableOpacity
                                    onPress={() => {
                                        ImagePicker();
                                    }}>
                                    <Text style={{ marginTop: 20, marginBottom: 40, marginLeft: 170, fontSize: 18 }}>Gallery</Text>
                                </TouchableOpacity>
                                <Image source={require('../assets/2b.png')} style={{ width: 300, height: 100 }} />
                            </View>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Image source={require('../assets/3.png')} style={{ width: 400, height: 150, marginTop: 37 }} />
                                <View style={{ flex: 1 }}>
                                    <MultipleSelectList
                                        setSelected={(val: React.SetStateAction<never[]>) => setSelected(val)}
                                        data={data}
                                        label="Categories"
                                        save="value"
                                        fontFamily="regular"
                                        badgeStyles={{ backgroundColor: 'purple' }}
                                        checkBoxStyles={{ backgroundColor: 'pink' }}
                                        disabledCheckBoxStyles={{ backgroundColor: 'purple' }}
                                        disabledItemStyles={{ backgroundColor: '#9F2B68' }}
                                    />
                                </View>
                            </View>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Image source={require('../assets/2c.png')} style={{
                                    width: 300, height: 100, marginTop: 100,
                                    marginRight: 100,
                                }} />
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 20 }}>My Biography Title:</Text>
                                    <TextInput
                                        style={{ width: '80%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, borderRadius: 20 }}
                                        placeholder="Example :- Only Vegan at Home"
                                    />
                                    <Text style={{ fontSize: 20 }}>Fun Fact:</Text>
                                    <TextInput
                                        style={{ width: '80%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, borderRadius: 20 }}
                                        placeholder="Example :- My wood furniture is homemade"
                                    />
                                    <Text style={{ fontSize: 20 }}>Pets:</Text>
                                    <TextInput
                                        style={{ width: '80%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, borderRadius: 20 }}
                                        placeholder="Example :- Cat"
                                    />
                                    <Text style={{ fontSize: 20 }}>I'm obsessed with:</Text>
                                    <TextInput
                                        style={{ width: '80%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, borderRadius: 20 }}
                                        placeholder="Example :- Traveling & tennis"
                                    />
                                    <Text style={{ fontSize: 20 }}>I spend too much time:</Text>
                                    <TextInput
                                        style={{ width: '80%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginBottom: 10, borderRadius: 20 }}
                                        placeholder="Example :- Looking at fan"
                                    />
                                </View>
                            </View>
                        ),
                        title: '',
                        subtitle: '',
                    },
                    {
                        backgroundColor: '#fff',
                        image: (
                            <View>
                                <Image source={require('../assets/4.jpg')} style={{ width: 390, height: 700, marginTop: 40 }} />
                            </View>
                        ),
                        title: '',
                        subtitle: '',
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 8,
        width: '76%',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
function axios(config: { method: string; url: string; headers: { 'X-CSCAPI-KEY': any; }; }) {
    throw new Error('Function not implemented.');
}

