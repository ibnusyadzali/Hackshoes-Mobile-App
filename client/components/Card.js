import { View } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MyCard = ({ el }) => {
  const Navigation = useNavigation()

  return (
    <View key={el.id} style={{ width: 380 }}>
      <Card style={{ marginBottom: 30 }}>
        <Card.Cover style={{ height: 350, padding: 20, backgroundColor: "#ced4da" }} source={{ uri: el.mainImg }} />
        <Card.Actions style={{ }}>
          <Button buttonColor="#ced4da" style={{ marginTop: 30 }} onPress={ () => Navigation.navigate("DetailProduct",{getProductDetailId: el.id})}>
          <Text style={{fontSize: 20, fontWeight: "700", color: "black"}}>{el.name}</Text>
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};
export default MyCard;
