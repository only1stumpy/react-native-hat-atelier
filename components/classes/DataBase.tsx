import { type SQLiteDatabase } from 'expo-sqlite';
import Toast from 'react-native-toast-message';
export default abstract class DataBase{
    public db: SQLiteDatabase;
    constructor() {
        this.db = null; // Избегаем ошибки обращения к неинициализированной переменной
    }
    abstract create():Promise<void>;
    isByOrder(res) : boolean{
        if(res[0].ID<1){
          return false
        }
        for(let i=0;i<res.length-1;i++){
          if(res[i].ID+1 !== res[i+1].ID){
            return false;
          }
        }
        return true;
      }
      async orderDB(res, tableName: string) {
        if (this.isByOrder(res)) {
          return;
        } else {
          try {
            const currentOrder = res.map(item => item.ID);
            const newOrder = Array.from({ length: currentOrder.length }, (_, i) => i + 1);
            const tempOffset = currentOrder.length + 1; // Сдвиг для временных ID, чтобы избежать конфликтов
      
            // Шаг 1: Присваиваем временные значения, которые точно не пересекаются с текущими значениями ID
            for (let i = 0; i < res.length; i++) {
              await this.db.runAsync(`UPDATE ${tableName} SET ID = ? WHERE ID = ?`, [res[i].ID + tempOffset, res[i].ID]);
            }
      
            // Шаг 2: Присваиваем новые значения ID, начиная с 1
            for (let i = 0; i < res.length; i++) {
              await this.db.runAsync(`UPDATE ${tableName} SET ID = ? WHERE ID = ?`, [newOrder[i], res[i].ID + tempOffset]);
            }
      
          } catch (error) {
            console.error('Error ordering database:', error);
          }
        }
      }
      
      
      
      async delete (id:number,tableName:string) {
        try {
          await this.db.runAsync(`DELETE FROM ${tableName} WHERE ID = ?`, [id]);
          console.log('Model deleted');
          Toast.show({
            type: 'info',
            text1: `Элемент с id: ${id} удален`,
            text2: 'Потяните вверх, чтоб обновить',
            position: 'bottom'
          });
      
        } catch (error) {
          console.error('Error deleting model:', error);
        }
      };
}