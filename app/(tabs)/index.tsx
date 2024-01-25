import { ExploreHeader } from "@/components/explore-header";
import { Listings } from "@/components/listings";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function Explore() {
  const [category, setCategory] = useState("Tiny homes");
  function onDataChanged(category: string) {
    setCategory(category);
  }

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />

      <Listings listings={[]} category={category} />
    </View>
  );
}
