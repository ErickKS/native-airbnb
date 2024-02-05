import { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeOut, SlideInDown } from "react-native-reanimated";
import DatePicker from "react-native-modern-datepicker";
import { Ionicons } from "@expo/vector-icons";

import { ModalHeader } from "@/components/modal-header";

import { places } from "@/assets/data/places";
import Colors from "@/constants/Colors";

const guestsGroups = [
  {
    name: "Adults",
    text: "Ages 13 or above",
    count: 0,
  },
  {
    name: "Children",
    text: "Ages 2-12",
    count: 0,
  },
  {
    name: "Infants",
    text: "Under 2",
    count: 0,
  },
  {
    name: "Pets",
    text: "Pets allowed",
    count: 0,
  },
];

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function Booking() {
  const router = useRouter();
  const [openCard, setOpenCard] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState(0);
  const [groups, setGroups] = useState(guestsGroups);

  const today = new Date().toISOString().substring(0, 10);

  function onClearAll() {
    setSelectedPlace(0);
    setOpenCard(0);
    setGroups(guestsGroups);
  }

  function handleAddGuest(index: number) {
    const newGroups = [...groups];
    newGroups[index].count = newGroups[index].count > 0 ? newGroups[index].count - 1 : 0;

    setGroups(newGroups);
  }

  function handleRemoveGuest(index: number) {
    const newGroups = [...groups];
    newGroups[index].count++;
    setGroups(newGroups);
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ModalHeader />

      <View className="flex-1 mt-6">
        {/* WHERE */}
        <View
          style={{
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 6,
            shadowOffset: {
              width: 1,
              height: 2,
            },
          }}
          className="mb-4 mx-4 bg-white rounded-2xl"
        >
          {openCard !== 0 && (
            <AnimatedTouchableOpacity onPress={() => setOpenCard(0)} className="flex-row justify-between p-5">
              <Text style={{ fontFamily: "mon-sb" }} className="text-sm text-gray">
                Where
              </Text>

              <Text style={{ fontFamily: "mon-sb" }} className="text-sm text-gray">
                I'm flexible
              </Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard === 0 && (
            <>
              <Text style={{ fontFamily: "mon-b" }} className="text-xl p-5">
                Where to?
              </Text>

              <Animated.View entering={FadeIn} exiting={FadeOut} className={"pb-5 px-5"}>
                <View className="flex-row items-center h-[50px] bg-white border border-gray rounded-lg px-4">
                  <Ionicons name="ios-search" size={20} color="#000" />

                  <TextInput placeholder="Search destinations" placeholderTextColor={Colors.gray} className="h-[50px] w-full pl-3" />
                </View>
              </Animated.View>

              <Animated.View entering={FadeIn} className={"pb-5"}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                  {places.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => setSelectedPlace(index)} activeOpacity={0.7} className="pl-5">
                      <Image
                        source={item.img}
                        style={[
                          { width: 120, height: 120, borderRadius: 10 },
                          selectedPlace === index && { borderColor: Colors.gray, borderWidth: 2 },
                        ]}
                      />

                      <Text style={[{ paddingTop: 8 }, selectedPlace === index ? { fontFamily: "mon-sb" } : { fontFamily: "mon" }]}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            </>
          )}
        </View>

        {/* WHEN */}
        <View
          style={{
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 6,
            shadowOffset: {
              width: 1,
              height: 2,
            },
          }}
          className="mb-4 mx-4 bg-white rounded-2xl"
        >
          {openCard !== 1 && (
            <AnimatedTouchableOpacity onPress={() => setOpenCard(1)} className="flex-row justify-between p-5">
              <Text style={{ fontFamily: "mon-sb" }} className="text-sm text-gray">
                When
              </Text>

              <Text style={{ fontFamily: "mon-sb" }} className="text-sm text-gray">
                Any week
              </Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard == 1 && (
            <>
              <Text style={{ fontFamily: "mon-b" }} className="text-xl p-5 pb-0">
                When's your trip?
              </Text>

              <Animated.View entering={FadeIn} className={"pb-3"}>
                <DatePicker
                  mode={"calendar"}
                  current={today}
                  selected={today}
                  options={{
                    defaultFont: "mon",
                    headerFont: "mon-sb",
                    mainColor: Colors.primary,
                    borderColor: "transparent",
                  }}
                />
              </Animated.View>
            </>
          )}
        </View>

        {/* GUEST */}
        <View
          style={{
            elevation: 2,
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 6,
            shadowOffset: {
              width: 1,
              height: 2,
            },
          }}
          className="mb-4 mx-4 px-5 pt-5 pb-4 bg-white rounded-2xl"
        >
          {openCard !== 3 && (
            <AnimatedTouchableOpacity onPress={() => setOpenCard(3)} className="flex-row justify-between">
              <Text style={{ fontFamily: "mon-sb" }} className="text-sm text-gray">
                Who
              </Text>

              <Text style={{ fontFamily: "mon-sb" }} className="text-sm text-gray">
                Add guests
              </Text>
            </AnimatedTouchableOpacity>
          )}

          {openCard == 3 && (
            <>
              <Text style={{ fontFamily: "mon-b" }} className="text-xl">
                Who's coming?
              </Text>

              <Animated.View entering={FadeIn}>
                {groups.map((item, index) => (
                  <View
                    key={index}
                    className={`flex-row justify-between items-center py-4 ${index + 1 < guestsGroups.length && "border-b border-gray"}`}
                  >
                    <View>
                      <Text style={{ fontFamily: "mon-sb" }} className="text-sm">
                        {item.name}
                      </Text>
                      <Text style={{ fontFamily: "mon" }} className="text-sm text-gray">
                        {item.text}
                      </Text>
                    </View>

                    <View className="flex-row justify-center items-center gap-x-2">
                      <TouchableOpacity onPress={() => handleAddGuest(index)}>
                        <Ionicons name="remove-circle-outline" size={26} color={groups[index].count > 0 ? Colors.gray : "#cdcdcd"} />
                      </TouchableOpacity>

                      <Text
                        style={{
                          fontFamily: "mon",
                          fontSize: 16,
                          minWidth: 18,
                          textAlign: "center",
                        }}
                      >
                        {item.count}
                      </Text>

                      <TouchableOpacity onPress={() => handleRemoveGuest(index)}>
                        <Ionicons name="add-circle-outline" size={26} color={Colors.gray} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </Animated.View>
            </>
          )}
        </View>

        {/* FOOTER */}
        <Animated.ScrollView
          entering={SlideInDown.delay(200)}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 70,
            backgroundColor: "#fff",
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderTopWidth: 1,
            borderTopColor: Colors.gray,
          }}
        >
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={onClearAll} className="flex-row justify-center items-center h-full">
              <Text style={{ fontFamily: "mon-sb" }} className="text-lg underline">
                Clear all
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              className="flex-row justify-center items-center h-[50px] pl-4 pr-5 rounded-lg bg-primary"
            >
              <Ionicons name="search-outline" size={24} color={"#fff"} />

              <Text style={{ fontFamily: "mon-b" }} className="pl-2 text-base text-white">
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}
