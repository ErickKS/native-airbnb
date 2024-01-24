import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Profile() {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      <Button title="Log out" onPress={() => signOut()} />
      {!isSignedIn && (
        <Link href={"/(modals)/login"}>
          <Text>Login</Text>
        </Link>
      )}
    </View>
  );
}
