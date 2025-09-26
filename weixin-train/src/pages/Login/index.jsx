import { View, Text, Input, Button } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";

export default function Login() {
  useLoad(() => {
    console.log("Login page loaded.");
  });

  const handleLogin = () => {
    console.log("Login clicked");
  };

  return (
    <View className="flex flex-col items-center justify-center min-h-screen bg-white px-5 py-10">
      {/* Logo cignifi */}
      <View className="flex items-center gap-1 mb-8">
        <Text className="text-3xl font-bold text-cignifi-blue">cigni</Text>
        <View className="w-1.5 h-1.5 rounded-full bg-cignifi-green -mt-2"></View>
        <View className="w-1.5 h-1.5 rounded-full bg-cignifi-blue/60 -mt-2"></View>
        <View className="w-1.5 h-1.5 rounded-full bg-cignifi-blue/60 -mt-2"></View>
        <Text className="text-3xl font-bold text-cignifi-blue">fi</Text>
      </View>

      {/* Title */}
      <Text className="text-xl text-gray-800 text-center mb-6">
        Login to your Account
      </Text>

      {/* Email Input */}
      <View className="w-full max-w-[320px] mb-4">
        <Input
          className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg bg-gray-50"
          type="email"
          placeholder="Email"
          placeholderClass="text-gray-500 text-base"
        />
      </View>

      {/* Password Input */}
      <View className="w-full max-w-[320px] mb-6">
        <Input
          className="w-full h-12 px-4 text-base border border-gray-300 rounded-lg bg-gray-50"
          type="password"
          placeholder="Password"
          placeholderClass="text-gray-500 text-base"
        />
      </View>

      {/* Sign In Button */}
      <Button
        className="w-full max-w-[320px] h-12 bg-cignifi-blue text-white text-base rounded-lg shadow flex items-center justify-center mb-6"
        onClick={handleLogin}
      >
        Sign in
      </Button>

      {/* Divider */}
      <Text className="text-sm text-gray-500 mb-6">- Or sign in with -</Text>

      {/* Social Buttons */}
      <View className="flex gap-4 mb-8">
        <View className="w-15 h-15 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow">
          <Text className="text-xl text-red-600">G</Text>
        </View>
        <View className="w-15 h-15 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow">
          <Text className="text-xl text-blue-600">f</Text>
        </View>
        <View className="w-15 h-15 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow">
          <Text className="text-xl">🐦</Text>
        </View>
      </View>

      {/* Sign Up Link */}
      <View className="flex flex-row items-center">
        <Text className="text-sm text-gray-600">Don't have an account? </Text>
        <Text className="text-sm text-cignifi-blue font-bold underline">
          Sign up
        </Text>
      </View>
    </View>
  );
}
