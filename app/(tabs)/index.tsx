import { useMemo, useState } from "react";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { ExploreHeader } from "@/components/explore-header";
import { ListingsMap } from "@/components/listings-map";
import { ListingsBottomSheet } from "@/components/listings-bottom-sheet";

import listingData from "@/assets/data/airbnb-listings.json";
import listingDataGeo from "@/assets/data/airbnb-listings.geo.json";

export default function Explore() {
  const [category, setCategory] = useState("Tiny homes");
  const items = useMemo(() => listingData as any, []);
  const geoItems = useMemo(() => listingDataGeo as any, []);

  function onDataChanged(category: string) {
    setCategory(category);
  }

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />

      <ListingsMap listings={geoItems} />
      <ListingsBottomSheet listings={items} category={category} />
    </SafeAreaView>
  );
}
