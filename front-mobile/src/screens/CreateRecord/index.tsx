import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../../components/Header';
import PlatFormCard from './PlatformCard';
import { Game, GamePlatform } from './types';
import RNPickerSelect from 'react-native-picker-select';
import {FontAwesome as Icon} from '@expo/vector-icons';
import Axios from 'axios';
import { RectButton } from 'react-native-gesture-handler';
const placeholder ={
  label: 'Select the game',
  value: null
}
const BASE_URL = "http://192.168.15.22:8085";
const mapSelectValue = (games: Game[])=>{
  return games.map(game=>({
    ...game,
    label: game.title,
    value: game.id
  }))
}
const CreateRecord = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [platform, setPlatform] = useState<GamePlatform>();
  const [game, setGame] =useState('');
  const [games, setGames] = useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = useState<Game[]>([]);
  const handleChangePlatform = (selectedPlatform: GamePlatform) => {
    setPlatform(selectedPlatform);
    const gamesByPlatform = games.filter(
      game=> game.platform === selectedPlatform
    )
    setFilteredGames(gamesByPlatform);
  }
  const handleSubmit = ()=>{
    const payload = {name, age, gameId:game, platform};
    Axios.post(`${BASE_URL}/records/`,payload)
    .then(()=>{
      Alert.alert('Data saved with success thank you!');
      setName('');
      setAge('');
      setGame('');
      setPlatform(undefined);
    }).catch(()=>Alert.alert('Error: Please Try again '));
  }
  useEffect(()=>{
    Axios.get(`${BASE_URL}/games/`)
    .then(response=>{
      const selectValue = mapSelectValue(response.data);
      setGames(selectValue);
    }).catch(()=>Alert.alert('Error: Try Again Later'));
  },[]);
  return (
    <>
      <Header />
      <View style={styles.container}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#9E9E9E"
          onChangeText={text=> setName(text)}
          value={name}
        />
        <TextInput
          keyboardType="numeric"
          style={styles.inputText}
          placeholder="Age"
          placeholderTextColor="#9E9E9E"
          maxLength={3}
          onChangeText={text=>setAge(text)}
          value={age}
        />
        <View style={styles.platformContainer}>
          <PlatFormCard
            platform="PC"
            icon="laptop"
            onChange={handleChangePlatform}
            active={platform}
          />
          <PlatFormCard
            platform="XBOX"
            icon="xbox"
            onChange={handleChangePlatform}
            active={platform}
          />
          <PlatFormCard
            platform="PLAYSTATION"
            icon="playstation"
            onChange={handleChangePlatform}
            active={platform}
          />
        </View>
        <RNPickerSelect
        onValueChange={value=>setGame(value)}
          placeholder={placeholder}
          items={filteredGames}
          style={pickerSelectStyles}
          value={game}
          Icon={()=>{
            return <Icon name="chevron-down" color="#9E9E9E" size={25}/>
          }}
        />
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              Salvar
            </Text>
          </RectButton>
        </View>
      </View>
    </>
  )
}
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    paddingRight: 30,
    fontFamily: "Play_700Bold",
    height: 50
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: "Play_700Bold",
  },
  iconContainer: {
    top: 10,
    right: 12,
  }
});
const styles = StyleSheet.create({
  container: {
    marginTop: '15%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: 50
  },
  inputText: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    color: '#ED7947',
    fontFamily: "Play_700Bold",
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 21
  },
  platformContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: '15%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#00D4FF',
    flexDirection: 'row',
    borderRadius: 10,
    height: 60,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontFamily: "Play_700Bold",
    fontWeight: 'bold',
    fontSize: 18,
    color: '#0B1F34',
  }
});
export default CreateRecord;