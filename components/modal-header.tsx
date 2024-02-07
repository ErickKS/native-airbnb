import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export function ModalHeader() {
  const [active, setActive] = useState(0);

  return (
    <View className="flex-row items-center p-4 w-full">
      <TouchableOpacity
        onPress={() => router.back()}
        className="justify-center items-center h-10 w-10 bg-white border border-gray rounded-full"
        activeOpacity={0.7}
      >
        <Ionicons name="close-outline" size={28} />
      </TouchableOpacity>

      <View className="flex-1 flex-row gap-x-2 justify-center">
        <TouchableOpacity onPress={() => setActive(0)}>
          <Text className={`text-lg font-semibold ${active === 0 ? "text-black underline" : "text-gray"}`}>Stays</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActive(1)}>
          <Text className={`text-lg font-semibold ${active === 1 ? "text-black underline" : "text-gray"}`}>Experiences</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
