import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

const TaskForm = ({ navigation, route }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.tab}>
                <Text><Icon 
                    name='arrowleft' 
                    size={24}
                    onPress={() => navigation.goBack()}
                /></Text>
                <Text><Icon 
                    name='check'
                    size={24}
                    onPress={() => {
                        if(!title) {
                            Alert.alert('Error', 'Please enter a task title', [{text: 'ok'}])
                        } else {
                            route.params.storeData({
                                'title': title,
                                'description': description
                            });
                            navigation.goBack();
                        }
                    }}
                /></Text>
            </View> 
            <TextInput placeholder='Title' onChangeText={setTitle} />
            <TextInput placeholder='Description' onChangeText={setDescription} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    tab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export default TaskForm;