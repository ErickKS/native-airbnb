import { useMemo, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { ExploreHeader } from "@/components/explore-header";
import { Listings } from "@/components/listings";
import { ListingMap } from "@/components/listings-map";

import listingData from "@/assets/data/airbnb-listings.json";
import listingDataGeo from "@/assets/data/airbnb-listings.geo.json";

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
      {/* <ListingMap listings={listingDataGeo}/> */}
    </View>
  );
}
