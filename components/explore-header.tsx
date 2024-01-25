import { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
// import * as Haptics from "expo-haptics";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

import Colors from "@/constants/Colors";

const categories = [
  {
    name: "Tiny homes",
    icon: "home",
  },
  {
    name: "Cabins",
    icon: "house-siding",
  },
  {
    name: "Trending",
    icon: "local-fire-department",
  },
  {
    name: "Play",
    icon: "videogame-asset",
  },
  {
    name: "City",
    icon: "apartment",
  },
  {
    name: "Beachfront",
    icon: "beach-access",
  },
  {
    name: "Countryside",
    icon: "nature-people",
  },
];

interface ExploreHeaderProps {
  onCategoryChanged: (category: string) => void;
}

export function ExploreHeader({ onCategoryChanged }: ExploreHeaderProps) {
  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<Array<TouchableOpacity | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const selectCategory = (index: number) => {
    setActiveIndex(index);

    // const selected = itemsRef.current[index];
    // selected?.measure((x) => {
    //   scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    // });
    // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    onCategoryChanged(categories[index].name);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="h-[136px] pt-3 bg-white">
        <View className="flex-row justify-between items-center px-6 pb-4">
          <Link href={"/(modals)/booking"} asChild>
            <TouchableOpacity
              activeOpacity={0.3}
              className="flex-1 flex-row items-center py-2 px-3 bg-white rounded-full shadow-md shadow-black"
            >
              <Ionicons name="search" size={24} />

              <View className="pl-3">
                <Text style={{ fontFamily: "mon-sb" }}>Where to?</Text>
                <Text style={{ fontFamily: "mon" }} className="text-gray">
                  Anywhere · any week
                </Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity activeOpacity={0.3} className="ml-3 p-3 border border-gray rounded-full">
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "center",
            gap: 20,
            paddingHorizontal: 16,
          }}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              activeOpacity={0.3}
              onPress={() => selectCategory(index)}
              className={`flex-1 items-center justify-center pb-2 ${activeIndex === index && "border-b-2 border-black"}`}
            >
              <MaterialIcons name={category.icon as any} size={24} color={`${activeIndex === index ? "#000" : Colors.gray}`} />

              <Text className={`${activeIndex === index ? "text-black" : "text-gray"}`}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
