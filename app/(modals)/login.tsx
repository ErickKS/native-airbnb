import { Text, TouchableOpacity, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { Ionicons } from "@expo/vector-icons";

enum Strategy {
  Apple = "oauth_apple",
  Facebook = "oauth_facebook",
  Google = "oauth_google",
}

export default function Login() {
  useWarmUpBrowser();
  const router = useRouter();

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: "oauth_facebook" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });

  async function onSelectAuth(strategy: Strategy) {
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
      [Strategy.Google]: googleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push("/(tabs)/");
      }
    } catch (err) {
      console.error("OAuth error: ", err);
    }
  }

  return (
    <View className="flex-1 p-6 bg-white ">
      <TextInput autoCapitalize="none" placeholder="Email" className="h-11 p-[10px] mb-6 bg-white border border-gray rounded-lg" />

      <TouchableOpacity className="justify-center items-center h-12 bg-primary rounded-lg">
        <Text style={{ fontFamily: "mon-b" }} className="text-white font-base">
          Continue
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center items-center w-full my-8">
        <View className="h-px w-1/3 bg-gray" />
        <Text style={{ fontFamily: "mon-b" }} className="px-4 text-xs text-gray uppercase">
          or
        </Text>
        <View className="h-px w-1/3 bg-gray" />
      </View>

      <View className="gap-5">
        <TouchableOpacity className="justify-center items-center h-12  border border-gray rounded-lg">
          <Ionicons name="call-outline" size={24} style={{ position: "absolute", left: 16 }} />
          <Text style={{ fontFamily: "mon-sb" }} className="text-gray font-base">
            Continue with Phone
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.Apple)}
          className="justify-center items-center h-12  border border-gray rounded-lg"
        >
          <Ionicons name="md-logo-apple" size={24} style={{ position: "absolute", left: 16 }} />
          <Text style={{ fontFamily: "mon-sb" }} className="text-gray font-base">
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.Google)}
          className="justify-center items-center h-12  border border-gray rounded-lg"
        >
          <Ionicons name="md-logo-google" size={24} style={{ position: "absolute", left: 16 }} />
          <Text style={{ fontFamily: "mon-sb" }} className="text-gray font-base">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.Facebook)}
          className="justify-center items-center h-12  border border-gray rounded-lg"
        >
          <Ionicons name="md-logo-facebook" size={24} style={{ position: "absolute", left: 16 }} />
          <Text style={{ fontFamily: "mon-sb" }} className="text-gray font-base">
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
