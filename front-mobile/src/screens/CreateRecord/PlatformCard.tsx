import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { GamePlatform } from './types';
import {FontAwesome as Icon} from '@expo/vector-icons';
type Props  = {
    platform:GamePlatform;
    onChange: (platform: GamePlatform) => void;
    icon: string;
    active?:GamePlatform;
}
const PlatFormCard = ({platform, onChange, icon, active}: Props)=>{
    const isActive = platform === active;
    const backgroundColor = isActive ? '#fad7c8': '#FFF';
    const textColor = isActive ? '#ED7947':'#9E9E9E';
    return(
        <RectButton 
            style={[styles.platformCard, {backgroundColor: backgroundColor}]}
            onPress={()=>onChange(platform)}
        >
            <Icon name={icon} size={60} color={textColor}/>
            <Text style={[styles.platformCardText,{color:textColor}]}>
                {platform === 'PLAYSTATION' ? 'PS':platform}
            </Text>
        </RectButton>
    );
}
const styles = StyleSheet.create({
    platformCard: {
        paddingTop: 30,
        paddingBottom: 20,
        width: '30%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
      },
      platformCardText: {
        marginTop: 40,
        color: '#9E9E9E',
        fontSize: 24,
        fontFamily: "Play_700Bold",
        textAlign: 'center'
      },
});
export default PlatFormCard;