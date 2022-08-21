import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

const TaskForm = ({ navigation, route }) => {
    const task = route.params.task;

    const [title, setTitle] = useState(task ? task['title'] : '');
    const [description, setDescription] = useState(task ? task['description'] :'');

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
                            const data = {
                                'title': title,
                                'description': description
                            };
                            task && route.params.storeTask(task.id, data) || route.params.storeTask(data);
                            navigation.goBack();
                        }
                    }}
                /></Text>
            </View> 
            <TextInput placeholder='Title' value={title} onChangeText={setTitle} />
            <TextInput placeholder='Description' value={description} onChangeText={setDescription} />
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