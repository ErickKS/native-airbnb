import { ListingGeo } from "@/types/listing-geo";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-map-clustering";

interface ListingMapProps {
  listings: any;
}

const INITIAL_REGION = {
  latitude: 37.33,
  longitude: -122,
  latitudeDelta: 9,
  longitudeDelta: 9,
};

export function ListingMap({ listings }: ListingMapProps) {
  const router = useRouter();

  function onMarkerSelected(item: ListingGeo) {
    router.push(`/listing/${item.properties.id}`);
  }

  const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;
    return (
      <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
      >
        <View className="items-center justify-center p-2 bg-white rounded-xl shadow-md shadow-gray">
          <Text
            style={{
              color: "#000",
              textAlign: "center",
              fontFamily: "mon-sb",
            }}
          >
            {points}
          </Text>
        </View>
      </Marker>
    );
  };

  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
        animationEnabled={false}
        style={{ height: "100%", width: "100%" }}
        clusterColor="#FFF"
        clusterTextColor="#000"
        clusterFontFamily="mon-sb"
        renderCluster={renderCluster}
      >
        {listings.features.map((item: ListingGeo) => (
          <Marker
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
          >
            <View className="items-center justify-center p-2 bg-white rounded-xl shadow-md shadow-gray">
              <Text style={{ fontFamily: "mon-sb" }}>$ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}
