import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, FlatList, Pressable,RefreshControl,Alert } from "react-native";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';
import {Customers} from "../../interfaces/Tables";
import styles from "../../Styles";
import Toast from 'react-native-toast-message';
import Customer from "../../classes/Customer";
import Modal from 'react-native-modal';
import Errors from "../../classes/Errors";

// Глобальные переменные, которые используются для редактирования строки
let editName:string;
let editSurname:string;
let editAddress:string;
let editPhone:string;
let itemForEdit:Customers;

// Компонент формы редактирования строки
const EditModelModal = ({ isVisible, onClose,setIsSubmitting }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleConfirm = () => {
    editName = name; 
    editSurname = surname; 
    editAddress = address;
    editPhone = phone;
    setIsSubmitting(true);
    setName('');
    setSurname('');
    setAddress('');
    setPhone('');
    onClose();
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.containerInputs}>
      <Text style={[styles.mainText,{color:"black",textAlign:"center"}]}>Введите новое значение</Text>
      <Text style={[styles.mainText,{color:"black",textAlign:"center"}]}>Чтобы не менять значение оставьте строку пустой</Text>
      <TextInput
          placeholder="Введите новое значение Имени клиента"
          value={name}
          onChangeText={setName}
          style={styles.textInputs}
        />
        <TextInput
          placeholder="Введите новое значение Фамилии клиента"
          value={surname}
          onChangeText={setSurname}
          style={styles.textInputs}
        />
        <TextInput
          placeholder="Введите новое значение Адреса клиента"
          value={address}
          onChangeText={setAddress}
          style={styles.textInputs}
        />
        <TextInput
          placeholder="Введите новое значение Номера Телефона"
          value={phone}
          onChangeText={setPhone}
          style={styles.textInputs}
        />
        <Pressable style={styles.button} 
            onPress={handleConfirm}>
              <Text style={styles.textButton}>Подтвердить</Text>
            </Pressable>
      </View>
    </Modal>
  );
};

const TableDraw = ({ dialogVisible, setDialogVisible }) => {
  // Объявление переменной базы данных
  const db: SQLiteDatabase = useSQLiteContext();
  // Объявление переменной для хранения данных
  const dataBase: Customer = new Customer(db);
  // Использование хуков для хранения/обновления данных для базы данных
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [customers, setCustomers] = useState<Customers[]>([]);
  const [arrayIsEmpty, setArrayIsEmpty] = useState(false);
  //Использование хука для хранения данных о нажатии/зажатии кнопок, обновления страницы, отправки формы
  const [isPressed, setIsPressed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const flatListRef = useRef(null);
  // Использование хука для для создания таблиц в базе данных и загрузки начальных данных при первом рендере компонента.
  useEffect(() => {
    dataBase.create().catch(error => Errors.showError(error));
    refreshData().catch(error => Errors.showError(error));
  }, []);
  // Использование хука для обновления данных при отправке формы в редактировании строки
  useEffect(() => {
    if (isSubmitting) {
        dataBase.update(itemForEdit,editName,editSurname,editAddress,editPhone).catch(error => Errors.showError(error));
      refreshData();
      itemForEdit = null;
      editName = '';
      editSurname = '';
      editAddress = '';
      editPhone = '';
      setIsSubmitting(false);
    }
  },[isSubmitting]);
  // Обновление данных
  const refreshData = async() => {
    setRefreshing(true);
    setTimeout(() => {
        dataBase.get(customers,setCustomers).catch(error => Errors.showError(error))
      setRefreshing(false);
      // Принудительная прокрутка FlatList после обновления данных
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    },200)
    setArrayIsEmpty(await dataBase.isEmpty());
  }
  // Обработчик открытия формы
  const handleOpenEditModal = (item:Customers) => {
    setSelectedRow({ item });
    setEditModalVisible(true);
  };
  // Обработчик закрытия формы
  const handleCloseEditModal = () => {
    setEditModalVisible(false);
    setSelectedRow(null);
  };
  // Обработчик зажатия строки для выбора действия
  const handleButtonPress = (item: Customers) => {
    Alert.alert(
      `Выберите действие со строкой ${item.Name} с id ${item.ID}`,
      '',
      [
        {
          text: 'Изменить',
          onPress: () => {
            handleOpenEditModal(item);
            itemForEdit = item;
          }
        },
        {
          text: 'Удалить',
          onPress: () => {
            dataBase.delete(item.ID, 'Materials', customers, setCustomers).catch(error => Errors.showError(error))
            refreshData();
          }
        },
        {
          text: 'Отмена',
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
    setIsPressed(true);
  };
  const handlePressOut = () => {
    setIsPressed(false);
  };
  // Рендер строчек компонента FlatList
  const render = ({ item }) => {
    return (
      <Pressable 
      style={styles.table}
      onLongPress={()=>handleButtonPress(item)}
      onPressOut={handlePressOut}
      >
        <Text style={{ flex: 1,color:"white" }}>{item.ID}</Text>
        <Text style={{ flex: 2,color:"white" }}>{item.Name ? item.Name : "-"}</Text>
        <Text style={{ flex: 2,color:"white" }}>{item.Surname ? item.Surname : "-"}</Text>
        <Text style={{ flex: 2,color:"white" }}>{item.Address ? item.Address : "-"}</Text>
        <Text style={{ flex: 3,color:"white" }}>{item.Phone ? item.Phone : "-"}</Text>
      </Pressable>
    );
  };
  // Динамический стиль для проверки пустая ли таблица
  const flatListStyle = arrayIsEmpty ? { opacity:0 } : {}; 
  const textStyle = arrayIsEmpty ? {} : { height:0,width:0 }; 
  return (
    <View style= {styles.containerr}>
      <View style={styles.tableContainer}>
        {/* Модальное окно при нажатии добавления модели */}
        <Modal
        isVisible={dialogVisible}
        onBackdropPress={() => setDialogVisible(false)}
        >
          <View style={styles.containerInputs}>
            <Text style={[styles.mainText,{color:"black"}]}>Добавить модель</Text>
            <TextInput
            placeholder="Введите имя клиента"
            value={name}
            onChangeText={setName}
            style={styles.textInputs}
            />
            <TextInput
            placeholder="Введите фамилию клиента"
            value={surname}
            onChangeText={setSurname}
            style={styles.textInputs}
            />
            <TextInput
            placeholder="Введите адрес клиента"
            value={address}
            onChangeText={setAddress}
            style={styles.textInputs}
            />
            <TextInput
            placeholder="Введите номер телефона"
            value={phone}
            onChangeText={setPhone}
            style={styles.textInputs}
            />
            <Pressable style={styles.button} 
            onPress={async()=>{
              await dataBase.add(name,setName,surname,setSurname,address,setAddress,phone,setPhone,customers,setCustomers,setDialogVisible).catch(error => Errors.showError(error));
              refreshData();
              }}>
              <Text style={styles.textButton}>Добавить</Text>
            </Pressable>
          </View>
        </Modal>
        
        {/* Рендер строчек из БД */}
        <FlatList
        ref={flatListRef}
        style={flatListStyle}
        data={customers}
        renderItem={render}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshData}
          colors={['#101010', '#5c5c5c']}
          />
        }    
        ListHeaderComponent={() => (
          <View style={styles.table}>
          <Text style={{ flex: 1,color:"white",textAlign:"left" }}>ID</Text>
          <Text 
          style={{ flex: 2,color:"white",textAlign:"left",padding:1 }}>Имя</Text>
          <Text style={{ flex: 2,color:"white",textAlign:"left",padding:1 }}>Фамилия</Text>
          <Text style={{ flex: 2,color:"white",textAlign:"center",padding:1 }}>Адрес</Text>
          <Text style={{ flex: 3,color:"white",textAlign:"center",padding:1 }}>Телефон</Text>
          </View>
        )}
        />
        <View style={[{
          height:"100%",width:"100%",
        alignItems:'center',
        justifyContent:'center'
        },textStyle]}>
        <Text style={[styles.mainText,{fontSize:18}]}>Таблица пуста, пожалуйста, добавьте строку, нажав на кнопку + в правом верхнем углу.</Text>
        </View>
      </View>
      <EditModelModal
        isVisible={editModalVisible}
        onClose={handleCloseEditModal}
        setIsSubmitting={setIsSubmitting}
      />
    <Toast />
    </View>
  );
};

const Table = ({ dialogVisible, setDialogVisible }) => {
    return (
    <SQLiteProvider databaseName="rn_sqlite.db">
      <TableDraw dialogVisible={dialogVisible} setDialogVisible={setDialogVisible}/>
    </SQLiteProvider>
  );

}



export default Table;