import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable} from "react-native";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import styles from "../../Styles";
import Request from "../../classes/Request";
import Modal from 'react-native-modal';
import {HatModels} from "../../interfaces/Tables";
import Toast from 'react-native-toast-message';
import Errors from "../../classes/Errors";



const ModelRequest = () => {
    // Объявление переменной базы данных
    const db: SQLiteDatabase = useSQLiteContext();
    // Объявление переменной для хранения данных
    const dataBase: Request = new Request(db);
     //Использование хука для хранения данных о нажатии/зажатии кнопок, обновления страницы, отправки формы
    const [firstPrice, setFirstPrice] = useState(null);
    const [secondPrice, setSecondPrice] = useState(null);
  const [models, setModels] = useState<HatModels[]>([]);
  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    setDialogVisible(true);
  },[]);
    // Рендер строчек компонента FlatList
  const render = ({ item }) => {
    return (
      <Pressable 
      style={styles.table}
      >
        <Text style={{ flex: 1,color:"white" }}>{item.ID}</Text>
        <Text style={{ flex: 3,color:"white" }}>{item.Name ? item.Name : "-"}</Text>
        <Text style={{ flex: 4,color:"white" }}>{item.Style ? item.Style : "-"}</Text>
        <Text style={{ flex: 2,color:"white" }}>{item.MaterialID ? item.MaterialID : "-"}</Text>
        <Text style={{ flex: 2,color:"white" }}>{item.RetailPrice ? item.RetailPrice : "-"}</Text>
      </Pressable>
    );
  };

    return (
            <View style= {styles.containerr}>
      <View style={styles.tableContainer}>
        {/* Модальное окно при загрузки страницы */}
        <Modal
        isVisible={dialogVisible}
        >
          <View style={styles.containerInputs}>
            <Text style={[styles.mainText,{color:"black"}]}>Поиск моделей по диапозону цен</Text>
            <TextInput
            placeholder="Введите начальный диапазон цен"
            value={firstPrice}
            onChangeText={setFirstPrice}
            style={styles.textInputs}
            />
            <TextInput
            placeholder="Введите конечный диапазон цен"
            value={secondPrice}
            onChangeText={setSecondPrice}
            style={styles.textInputs}
            />
            <Pressable style={styles.button} 
            onPress={async()=>{
              await dataBase.searchPriceBetween(firstPrice,secondPrice,setModels).catch(error => Errors.showError(error))
              setDialogVisible(false);
              }}>
              <Text style={styles.textButton}>Принять</Text>
            </Pressable>
          </View>
        </Modal>
        
        {/* Рендер строчек из БД */}
        <FlatList
        data={models}
        renderItem={render}  
        ListHeaderComponent={() => (
          <View style={styles.table}>
          <Text style={{ flex: 1,color:"white",textAlign:"left" }}>ID</Text>
          <Text 
          style={{ flex: 3,color:"white",textAlign:"left",padding:1 }}>Модель</Text>
          <Text style={{ flex: 4,color:"white",textAlign:"left" }}>Фасон</Text>
          <Text style={{ flex: 2,color:"white",textAlign:"center",padding:1 }}
          adjustsFontSizeToFit
          numberOfLines={1}>Материал</Text>
          <Text style={{ flex: 2,color:"white",textAlign:"right" }}
          adjustsFontSizeToFit
          numberOfLines={2}>Цена (р.)</Text>
          </View>
        )}
        />
      </View>
      <Toast />
    </View>
    )
}

const TableRequest = () => {
  return (
    <SQLiteProvider databaseName="rn_sqlite.db">
      <ModelRequest/>
        </SQLiteProvider>
  );
}
export default TableRequest;