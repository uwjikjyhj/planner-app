import { StyleSheet, Text, View } from 'react-native';
import { useAnimatedStyle } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';

const TaskItem = ({ task }) => {
    return (
        <View style={styles.container}>
            <Text style={task['done'] ? styles.done : styles.todo}>
                {task['title']}
            </Text>
            <Text>
                <Icon name='edit' size={18} />
                <Icon name='delete' size={18}/>
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