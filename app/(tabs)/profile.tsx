import Colors from "@/constants/Colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

export default function Profile() {
  const { signOut, isSignedIn } = useAuth();
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  async function onSaveUser() {
    try {
      if (!firstName || !lastName) return;

      await user?.update({
        firstName,
        lastName,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setEdit(false);
    }
  }

  async function onCaptureImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    });

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row justify-between items-center p-6">
        <Text style={{ fontFamily: "mon-sb", fontSize: 24 }}>Profile</Text>
        <Ionicons name="notifications-outline" size={26} />
      </View>

      {user && (
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
          className="items-center gap-y-3 bg-white rounded-2xl mx-4 my-6 px-4 pb-4"
        >
          <TouchableOpacity onPress={onCaptureImage} activeOpacity={0.7}>
            <Image source={{ uri: user?.imageUrl }} className="h-[100px] w-[100px] rounded-full bg-gray" />
          </TouchableOpacity>

          <View className="flex-row gap-x-1">
            {edit ? (
              <View className="flex-1 flex-row items-center justify-center gap-x-2">
                <TextInput
                  placeholder="First Name"
                  value={firstName || ""}
                  onChangeText={setFirstName}
                  className="h-12 w-[100px] p-2 bg-white border border-gray rounded-lg"
                />
                <TextInput
                  placeholder="Last Name"
                  value={lastName || ""}
                  onChangeText={setLastName}
                  className="h-12 w-[100px] p-2 bg-white border border-gray rounded-lg"
                />

                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-1 flex-row items-center justify-center gap-x-2 h-12">
                <Text style={{ fontFamily: "mon-b" }} className="text-xl">
                  {firstName} {lastName}
                </Text>

                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Ionicons name="create-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text>{email}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}

      {isSignedIn ? (
        <View className="w-[100px] mx-auto rounded-md">
          <Button title="Log out" onPress={() => signOut()} color={Colors.dark} />
        </View>
      ) : (
        <View className="flex-1 items-center justify-center">
          <Link href={"/(modals)/login"} asChild>
            <Button title="Log In" color={Colors.dark} />
          </Link>
        </View>
      )}
    </SafeAreaView>
  );
}
