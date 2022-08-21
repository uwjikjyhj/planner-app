import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

const TaskItem = ({ task, deleteData, updateTask }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={task['done'] ? styles.done : styles.todo}>
                {task['title']}
            </Text>
            <Text>
                <Icon name='edit' size={18} onPress={() => navigation.navigate('TaskForm', {task, storeTask: updateTask})} />
                <Icon name='delete' size={18} onPress={() => deleteData(task['id'])}/>
            </Text> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    todo: {
        fontSize: 18,
        paddingBottom: 5,
    },
    done: {
        fontSize: 18,
        paddingBottom: 5,
        color: '#9E9E9E',
        textDecorationLine: 'line-through',
    }
});

export default TaskItem;