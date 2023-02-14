import { StyleSheet, View, ActivityIndicator, ScrollView, Image } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { gql, useQuery } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const getDetailProduct = gql`
  query GetProductDetail($getProductDetailId: ID) {
    getProductDetail(id: $getProductDetailId) {
      id
      name
      slug
      description
      price
      stockStatus
      mainImg
      categoryId
      UserId
      Images {
        id
        imgUrl
      }
      Category {
        id
        name
      }
      User {
        username
        email
      }
    }
  }
`;
const ProductDetail = ({ route }) => {
  const Navigation = useNavigation();
  const { data, loading } = useQuery(getDetailProduct, {
    variables: { getProductDetailId: route.params.getProductDetailId },
  });
  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e9ecef" }}>
      <View style={styles.headerContainer}>
        <View>
          <Image
            style={{ height: 90, width: 130 }}
            source={{
              uri: "https://res.cloudinary.com/dnh89xvo5/image/upload/v1673958687/p3_challenge_1/Hackshoes-removebg-preview_v15sdm.png",
            }}
          />
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.productTitle}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.getProductDetail.name}</Text>
        </View>
        <Card>
          <Card.Cover style={{ height: 250, padding: 5, backgroundColor: "#ced4da", margin: 3 }} source={{ uri: data.getProductDetail.mainImg }} />
          <ScrollView horizontal showHorizontalScrollIndicator="false" style={{}}>
            {data.getProductDetail.Images.map((el) => {
              return (
                <View key={el.id}>
                  <Card.Cover style={{ height: 200, width: 250, padding: 5, backgroundColor: "#ced4da", marginEnd: 5 }} source={{ uri: el.imgUrl }} />
                </View>
              );
            })}
          </ScrollView>

          <View style={{ alignItems: "flex-start", padding: 20 }}>
            <Text style={{ fontSize: 16, marginBottom: 3 }}>Category: {data.getProductDetail.Category.name} Shoes</Text>
            <Text style={{ fontSize: 12, marginBottom: 3 }}>Description: {data.getProductDetail.description}</Text>
            <Text style={{ width: 250, height: 25, fontSize: 20, fontWeight: "bold" }}>Rp {data.getProductDetail.price.toLocaleString()}</Text>
            <Text style={{ fontSize: 12, marginBottom: 3 }}>Posted by: {data.getProductDetail.User.username}</Text>
          </View>
          <Card.Actions style={{ alignItems: "flex-end", paddingBottom: 10 }}>
            <Button buttonColor="#ced4da" style={{ borderColor: "white" }} onPress={() => Navigation.navigate("BottomNav")}>
              <Text style={{ fontSize: 16, fontWeight: "600", color: "black" }}>Back to Home</Text>
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e9ecef",
    marginVertical: 10,
    borderBottomEndRadius: 120,
    borderColor: "white",
    borderBottomWidth: 5,
    borderRightWidth: 5,
  },
  productTitle: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 90,
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bodyContainer: {
    flex: 10,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
export default ProductDetail;
