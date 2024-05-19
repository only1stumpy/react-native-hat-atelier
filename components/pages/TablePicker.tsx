import {View, Text, Pressable} from'react-native';
import style from '../Styles';
import {useNavigation} from '@react-navigation/native';
export default function TablePicker() {
    const navigation = useNavigation();
    return (
    <View style={style.container}>
      <Text style={style.mainText}>Доступные таблицы:</Text>
        <Pressable style={style.button} onPress={() => {navigation.navigate('HatModels')}}>
            <Text style={style.textButton}>Модели головных уборов</Text>
        </Pressable>
        <Pressable style={style.button} onPress={() => {navigation.navigate('Materials')}}>
            <Text style={style.textButton}>Материалы</Text>
        </Pressable>
        <Pressable style={style.button} onPress={() => {navigation.navigate('Suppliers') }}>
            <Text style={style.textButton}>Поставщики материалов</Text>
        </Pressable>
        <Pressable style={style.button} onPress={() => {navigation.navigate('Customers')}}>
            <Text style={style.textButton}>Клиенты</Text>
        </Pressable>
    </View>
  );

}
