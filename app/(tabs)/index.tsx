import { ExploreHeader } from "@/components/explore-header";
import { Listings } from "@/components/listings";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";

import listingData from "@/assets/data/airbnb-listings.json";

export default function Explore() {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingData as any, []);

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

      <Listings items={items} category={category} />
    </View>
  );
}
