import MyCard from "../components/Card";
import { SafeAreaView, ScrollView, StyleSheet, View, ActivityIndicator, Image } from "react-native";
import { Text } from "react-native-paper";
import { gql, useQuery } from "@apollo/client";
const getNewArrivals = gql`
  query GetNewArrivals {
    getNewArrivals {
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
    }
  }
`;

const Home = () => {
  const { data, loading } = useQuery(getNewArrivals);

  if (loading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#e9ecef" }}>
      <View style={styles.containerNewArrival}>
        <Image
          style={{ height: 90, width: 130 , marginBottom: 10 }}
          source={{
            uri: "https://res.cloudinary.com/dnh89xvo5/image/upload/v1673958687/p3_challenge_1/Hackshoes-removebg-preview_v15sdm.png",
          }}
        />
        <Text style={{ fontSize: 25, fontWeight: "900", paddingEnd:40 }}>NEW ARRIVALS</Text>
      </View>
      <View style={styles.image}>
        <ScrollView>
          {data?.getNewArrivals.map((el) => {
            return (
              <View key={el.id}>
                <MyCard el={el} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  containerNewArrival: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#e9ecef",
    marginVertical: 10,
    borderBottomEndRadius: 120,
    borderColor: "white",
    borderBottomWidth: 5,
    borderRightWidth: 5,
  },
  image: {
    flex: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
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

export default Home;
