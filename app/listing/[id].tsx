import { useLayoutEffect } from "react";
import { Dimensions, Text, View, Image, TouchableOpacity, Share } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import Animated, { SlideInDown, interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import listingsData from "@/assets/data/airbnb-listings.json";
import { Listing as ListingTypes } from "@/types/listing";
import Colors from "@/constants/Colors";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

export default function Listing() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const listing: ListingTypes = (listingsData as any[]).find((item) => item.id === id);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const shareListing = async () => {
    try {
      await Share.share({
        title: listing.name,
        url: listing.listing_url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View
          style={[{ backgroundColor: "#FFF", height: 100, borderBottomWidth: 1, borderBottomColor: Colors.gray }, headerAnimatedStyle]}
        />
      ),
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="justify-center items-center h-10 w-10 ml-3 bg-white border border-gray rounded-full"
        >
          <Ionicons name="chevron-back" size={24} color={"#000"} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={shareListing}
            className="justify-center items-center h-10 w-10 bg-white border border-gray rounded-full"
          >
            <Ionicons name="share-outline" size={24} color={"#000"} />
          </TouchableOpacity>

          <TouchableOpacity className="justify-center items-center h-10 w-10 ml-3 bg-white border border-gray rounded-full">
            <Ionicons name="heart-outline" size={24} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT], [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 1.5], [0, 1]),
    };
  }, []);

  return (
    <View className="flex-1 bg-white">
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <Animated.Image source={{ uri: listing.xl_picture_url }} style={[{ height: IMG_HEIGHT, width }, imageAnimatedStyle]} />

        <View className="p-6 bg-white">
          <Text style={{ fontFamily: "mon-sb" }} className="text-2xl font-bold">
            {listing.name}
          </Text>

          <Text style={{ fontFamily: "mon-sb" }} className="text-lg mt-3">
            {listing.room_type} in {listing.smart_location}
          </Text>

          <Text style={{ fontFamily: "mon" }} className="text-base text-gray my-1">
            {listing.guests_included} guests · {listing.bedrooms} bedrooms · {listing.beds} bed · {listing.bathrooms} bathrooms
          </Text>

          <View className="flex-row items-center">
            <Ionicons name="star" size={16} />

            <Text style={{ fontFamily: "mon-sb" }} className="text-base pl-1">
              {listing.review_scores_rating / 20} · {listing.number_of_reviews} reviews
            </Text>
          </View>

          <View className="h-px bg-gray my-4" />

          <View className="flex-row items-center">
            <Image source={{ uri: listing.host_picture_url }} className="h-[50px] w-[50px] rounded-full bg-gray" />

            <View className="pl-3">
              <Text className="text-base font-medium">Hosted by {listing.host_name}</Text>
              <Text>Host since {listing.host_since}</Text>
            </View>
          </View>

          <View className="h-px bg-gray my-4" />

          <Text style={{ fontFamily: "mon" }} className="text-base text-gray mt-3 pb-[70px]">
            {listing.description}
          </Text>
        </View>
      </Animated.ScrollView>

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
          <TouchableOpacity className="flex-row justify-center items-center h-full">
            <Text style={{ fontFamily: "mon-sb" }} className="text-lg pr-1">
              ${listing.price}
            </Text>

            <Text>/ night</Text>
          </TouchableOpacity>

          <TouchableOpacity className="justify-center items-center h-[50px] rounded-lg bg-primary px-5">
            <Text style={{ fontFamily: "mon-b" }} className="text-base text-white">
              Reserve
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </View>
  );
}
