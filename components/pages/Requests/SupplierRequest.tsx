import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable } from "react-native";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import styles from "../../Styles";
import Request from "../../classes/Request";
import Modal from 'react-native-modal';
import {Suppliers} from "../../interfaces/Tables";
import Toast from 'react-native-toast-message';
import Errors from "../../classes/Errors";



const MaterialRequest = () => {
    // Объявление переменной базы данных
    const db: SQLiteDatabase = useSQLiteContext();
    // Объявление переменной для хранения данных
    const dataBase: Request = new Request(db);
     //Использование хука для хранения данных о нажатии/зажатии кнопок, обновления страницы, отправки формы
    const [name, setName] = useState(null);
  const [suppliers, setSuppliers] = useState<Suppliers[]>([]);
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
        <Text style={{ flex: 2,color:"white" }}>{item.CompanyName ? item.CompanyName : "-"}</Text>
        <Text style={{ flex: 3,color:"white" }}>{item.ContactName ? item.ContactName : "-"}</Text>
        <Text style={{ flex: 3,color:"white" }}>{item.Phone ? item.Phone : "-"}</Text>
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
            <Text style={[styles.mainText,{color:"black"}]}>Поиск информации о конкретном поставщике материале</Text>
            <TextInput
            placeholder="Введите название компании с большой буквы"
            value={name}
            onChangeText={setName}
            style={[styles.textInputs,{fontSize:12}]}
            />
            <Pressable style={styles.button} 
            onPress={async()=>{
              await dataBase.searchSupplier(name,setSuppliers).catch(error => Errors.showError(error))
              setDialogVisible(false);
              }}>
              <Text style={styles.textButton}>Принять</Text>
            </Pressable>
          </View>
        </Modal>
        
        {/* Рендер строчек из БД */}
        <FlatList
        data={suppliers}
        renderItem={render}  
        ListHeaderComponent={() => (
          <View style={styles.table}>
          <Text style={{ flex: 1,color:"white",textAlign:"left" }}>ID</Text>
          <Text 
          style={{ flex: 2,color:"white",textAlign:"left",padding:1 }}>Компания</Text>
          <Text style={{ flex: 3,color:"white",textAlign:"center",padding:1 }}>Контактное лицо</Text>
          <Text style={{ flex: 3,color:"white",textAlign:"center",padding:1 }}>Телефон</Text>
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
      <MaterialRequest/>
        </SQLiteProvider>
  );
}
export default TableRequest;