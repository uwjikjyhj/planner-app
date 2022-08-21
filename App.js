import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Task from './components/Task';
import TaskForm from './components/TaskForm';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="TaskForm" component={TaskForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}