import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigation from "../components/BottomNav";
import ProductDetail from "../components/DetailProduct"

const Stack = createNativeStackNavigator();
export default MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomNav" component={BottomNavigation} options={{ headerShown: false }} />
      <Stack.Screen name="DetailProduct" component={ProductDetail} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
