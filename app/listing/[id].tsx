import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function Listing() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View>
      <Text>Listing</Text>
    </View>
  );
}
