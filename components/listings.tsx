import { Listing } from "@/types/listing";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, ListRenderItem, TouchableOpacity, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";
interface ListingsProps {
  items: any[];
  category: string;
}

export function Listings({ items, category }: ListingsProps) {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow: ListRenderItem<Listing> = ({ item }) => (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity activeOpacity={0.7} className="p-4">
        <Animated.View entering={FadeInDown} exiting={FadeOutUp} className="mb-2">
          <Image source={{ uri: item.medium_url }} className="h-[300px] w-full rounded-lg" />

          <TouchableOpacity className="absolute top-4 right-4 justify-center items-center h-10 w-10 bg-white rounded-full">
            <Ionicons name="heart-outline" size={24} color={"#000"} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInDown} exiting={FadeOutUp} className="flex-row items-center justify-between">
          <Text style={{ fontSize: 16, fontFamily: "mon-sb" }}>{item.name}</Text>

          <View className="flex-row gap-1">
            <Ionicons name="star" size={16} />
            <Text style={{ fontFamily: "mon-sb" }}>{item.review_scores_rating / 20}</Text>
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInDown} exiting={FadeOutUp} style={{ fontFamily: "mon" }} className="mb-1">
          {item.room_type}
        </Animated.Text>

        <Animated.View entering={FadeInDown} exiting={FadeOutUp} className="flex-row gap-1">
          <Text style={{ fontFamily: "mon-sb" }}>$ {item.price}</Text>
          <Text style={{ fontFamily: "mon" }}>/ night</Text>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="mt-28">
        <FlatList ref={listRef} renderItem={renderRow} data={loading ? [] : items} />
      </View>
    </SafeAreaView>
  );
}
