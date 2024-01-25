import { useEffect } from "react";
import { Text, View } from "react-native";

interface ListingsProps {
  listings: any[];
  category: string;
}

export function Listings({ listings, category }: ListingsProps) {
  useEffect(() => {
    console.log("Reload");
  }, [category]);

  return (
    <View>
      <Text>Listing</Text>
    </View>
  );
}
