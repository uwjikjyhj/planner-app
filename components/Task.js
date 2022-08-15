import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const baseAddress = 
const token = 

const Task = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await fetch(baseAddress + 'api/tasks', {
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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.sectionTitle}>Tasks</Text>            
            {isLoading ? (
                <Text>Loading</Text>
            ) : (
                <View style={styles.sectionWrapper}>
                    <Text>data</Text>
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
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});