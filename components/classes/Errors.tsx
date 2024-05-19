import Toast from "react-native-toast-message";


export default class Errors {
    static showError(error: any) {
        console.error(error);
        Toast.show({
            type: 'error',
            text1: error.message,
            visibilityTime: 5000,
            position: 'bottom',
            topOffset: 30,
            bottomOffset: 30,
        });
    }
}