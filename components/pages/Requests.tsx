import {View, Text, Pressable} from'react-native';
import style from '../Styles';
import {useNavigation} from '@react-navigation/native';
export default function TablePicker() {
  const navigation = useNavigation();
    return (
    <View style={style.container}>
      <Text style={style.mainText}>Доступные запросы: </Text>
      <Pressable style={style.button} onPress={() => {navigation.navigate('ModelRequest')}}>
            <Text style={style.textButton}>Информация о конкретной модели</Text>
        </Pressable>
        <Pressable style={style.button} onPress={() => {navigation.navigate('PriceSearch')}}>
            <Text style={style.textButton}>Поиск по диапазону цен</Text>
        </Pressable>
        <Pressable style={style.button} onPress={() => {navigation.navigate('MaterialRequest') }}>
            <Text style={style.textButton}>Поиск по конкретному материалу</Text>
        </Pressable>
        <Pressable style={style.button} onPress={() => {navigation.navigate('SupplierRequest')}}>
            <Text style={style.textButton}>Поиск по конкретному поставщику материала</Text>
        </Pressable>
    </View>
  );

}
