import { useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Listings } from "./listings";
import { Ionicons } from "@expo/vector-icons";

import { Listing } from "@/types/listing";

import Colors from "@/constants/Colors";

interface ListingsBottomSheetProps {
  listings: Listing[];
  category: string;
}

export function ListingsBottomSheet({ listings, category }: ListingsBottomSheetProps) {
  const [refresh, setRefresh] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "100%"], []);

  function showMap() {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{ backgroundColor: Colors.gray }}
      style={{
        backgroundColor: "#000",
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
      }}
    >
      <View className="flex-1">
        <Listings items={listings} category={category} refresh={refresh} />

        <View className="absolute bottom-4 items-center w-full">
          <TouchableOpacity onPress={showMap} activeOpacity={0.7} className="flex-row items-center gap-x-2 p-3 bg-white rounded-full">
            <Text style={{ fontFamily: "mon-sb" }}>Map</Text>

            <Ionicons name="map" size={20} color={"#000"} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}
