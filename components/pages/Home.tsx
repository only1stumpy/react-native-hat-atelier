import { View, Text, Pressable } from 'react-native';
import style from '../Styles';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const navigation = useNavigation();
    
    return (
        <View style={style.container}>
            <Text style={style.mainText}>Выберите из предложенного:</Text>
            <Pressable style={style.button} onPress={() => navigation.navigate('TablePicker')}>
                <Text style={style.textButton}>Таблицы</Text>
            </Pressable>
            <Pressable style={style.button} onPress={() => navigation.navigate('Requests')}>
                <Text style={style.textButton}>Запросы</Text>
            </Pressable>
        </View>
    );
}
