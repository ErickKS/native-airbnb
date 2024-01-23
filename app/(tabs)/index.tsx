import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Explore() {
  return (
    <View>
      <Text>Explore</Text>

      <Link href={"/(modals)/login"}>Login</Link>
      <Link href={"/(modals)/booking"}>Booking</Link>
      <Link href={"/listing/12"}>Listing</Link>
    </View>
  );
}
