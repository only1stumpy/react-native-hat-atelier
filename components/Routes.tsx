import { View, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './pages/Home';
import TablePicker from './pages/TablePicker';
import Requests from './pages/Requests';
import HatModels from './pages/Tables/HatModels';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import Materials from './pages/Tables/Materials';
import Suppliers from './pages/Tables/Suppliers';
import Customers from './pages/Tables/Customers';
import ModelRequest from './pages/Requests/ModelRequest';
import PriceSearch from './pages/Requests/PriceSearch';
import MaterialRequest from './pages/Requests/MaterialRequest';
import SupplierRequest from './pages/Requests/SupplierRequest';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [dialogVisible, setDialogVisible] = useState(false);
    return (
        <View style={{flex: 1, backgroundColor: 'black'}}>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
            title: 'Начальная страница',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerShown: false

        }}
      />
      <Stack.Screen
        name="TablePicker"
        component={TablePicker}
        options={{
            title: 'Выбор таблицы',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="Requests"
        component={Requests}
        options={{
            title: 'Выбор запроса',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'

        }}
        
      />
      <Stack.Screen
        name="HatModels"
            options={{
            title: 'Модели головных уборов',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18
            },
            headerRight: () => (
              <Pressable
                style={{ marginRight: 15 }}
                onPress={() => setDialogVisible(true)} // Установка видимости диалога в true при нажатии на кнопку
              >
                <Ionicons name="add" size={24} color="white" />
              </Pressable>
            )
        }}
      >
        {props => <HatModels {...props} dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} />}
        </Stack.Screen>
        <Stack.Screen
        name="Materials"
            options={{
            title: 'Материалы',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18
            },
            headerRight: () => (
              <Pressable
                style={{ marginRight: 15 }}
                onPress={() => setDialogVisible(true)} // Установка видимости диалога в true при нажатии на кнопку
              >
                <Ionicons name="add" size={24} color="white" />
              </Pressable>
            )
        }}
      >
        {props => <Materials {...props} dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} />}
        </Stack.Screen>
        <Stack.Screen
        name="Suppliers"
            options={{
            title: 'Поставщики материала',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18
            },
            headerRight: () => (
              <Pressable
                style={{ marginRight: 15 }}
                onPress={() => setDialogVisible(true)} // Установка видимости диалога в true при нажатии на кнопку
              >
                <Ionicons name="add" size={24} color="white" />
              </Pressable>
            )
        }}
      >
        {props => <Suppliers {...props} dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} />}
        </Stack.Screen>
        <Stack.Screen
        name="Customers"
            options={{
            title: 'Клиенты',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 18
            },
            headerRight: () => (
              <Pressable
                style={{ marginRight: 15 }}
                onPress={() => setDialogVisible(true)} // Установка видимости диалога в true при нажатии на кнопку
              >
                <Ionicons name="add" size={24} color="white" />
              </Pressable>
            )
        }}
      >
        {props => <Customers {...props} dialogVisible={dialogVisible} setDialogVisible={setDialogVisible} />}
        </Stack.Screen>

        
        <Stack.Screen
        name="ModelRequest"
        component={ModelRequest}
        options={{
            title: 'Информация о модели',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="PriceSearch"
        component={PriceSearch}
        options={{
            title: 'Поиск по диапазону цен',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="MaterialRequest"
        component={MaterialRequest}
        options={{
            title: 'Поиск по материалу',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="SupplierRequest"
        component={SupplierRequest}
        options={{
            title: 'Поиск по поставщику материала',
            headerStyle: {
                backgroundColor: '#121212'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle:{
              fontSize:16
            }
        }}
      />
      
    </Stack.Navigator>
    </View>

    );
}