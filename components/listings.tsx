import { useEffect, useRef, useState } from "react";
import { Image, ListRenderItem, TouchableOpacity, Text, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
import { Link } from "expo-router";
import { BottomSheetFlatList, BottomSheetFlatListMethods } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

import { Listing } from "@/types/listing";

interface ListingsProps {
  items: any[];
  category: string;
  refresh: number;
}

export function Listings({ items, category, refresh }: ListingsProps) {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<BottomSheetFlatListMethods>(null);

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true });
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.8} className="p-4">
        <Animated.View entering={FadeInDown} exiting={FadeOutUp} className="mb-2">
          <Image source={{ uri: item.medium_url }} className="h-[300px] w-full rounded-lg" />

          <TouchableOpacity
            activeOpacity={0.5}
            className="absolute top-4 right-4 justify-center items-center h-10 w-10 bg-white rounded-full"
          >
            <Ionicons name="heart-outline" size={24} color={"#000"} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown} exiting={FadeOutUp} className="flex-row items-center justify-between">
          <Text className="text-base font-semibold">{item.name}</Text>

          <View className="flex-row gap-1">
            <Ionicons name="star" size={16} />
            <Text className="font-semibold">{item.review_scores_rating / 20}</Text>
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInDown} exiting={FadeOutUp} className="mb-1 font-regular">
          {item.room_type}
        </Animated.Text>

        <Animated.View entering={FadeInDown} exiting={FadeOutUp} className="flex-row gap-1">
          <Text className="font-semibold">$ {item.price}</Text>
          <Text className="font-regular">/ night</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View className="flex-1">
      <BottomSheetFlatList
        ref={listRef}
        renderItem={renderRow}
        data={loading ? [] : items}
        ListHeaderComponent={<Text className="text-center text-black font-semibold">{items.length} homes</Text>}
      />
    </View>
  );
}
