import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

import TaskItem from './TaskItem';

const baseAddress = 'http://192.168.1.10:8000/api/';
const token = '1|ZOdJ2WpnRiFBXc6RgcbhNH8S9g0nsmOHSWu3GBPM';

const Task = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetch(baseAddress + 'tasks', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.log(error))
            .finally(setLoading(false));
        };

        fetchData();
    }, [])

    const storeTask = async (data) => {
        await fetch(baseAddress + 'tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => setData(prevData => {
            return [...prevData, data]
        }))
        .catch(error => console.log(error))
        .finally(setLoading(false));
    }

    const deleteData = async (id) => {
        await fetch(baseAddress + 'tasks/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
        .then(response => response.json())
        .then(data => setData(prevData => {
            return prevData.filter(data => data.id != id)
        }))
        .catch(error => console.log(error))
        .finally(setLoading(false));
    }

    const updateTask = async (id, data) => {
        await fetch(baseAddress + 'tasks/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => setData(prevTasks => {
            return prevTasks.map(task => task.id == id ? data : task)
        }))
        .catch(error => console.log(error))
        .finally(setLoading(false));
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Tasks</Text>
            {isLoading ? (
                <Text>Loading</Text>
            ) : (
                <View>
                    { data.map(task => <TaskItem task={task} deleteData={deleteData} updateTask={updateTask}></TaskItem>) }
                    <Text 
                        style={styles.add}
                        onPress={() => navigation.navigate('TaskForm', {storeTask: storeData})}
                    >
                        <Icon name='plus' size={14} />
                        Add new task
                    </Text>
                </View>
            )}
        </SafeAreaView>
    );
}

export default Task;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingVertical: 10
    },
    add: {
        fontSize: 14,
        paddingTop: 10,
    }
});