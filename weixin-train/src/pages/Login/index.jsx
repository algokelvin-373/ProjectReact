import Taro from "@tarojs/taro";
import { View, Text, Input, Button } from "@tarojs/components";

const LoginPage = () => {
  const handleLogin = () => {
    // Logika login di sini
    console.log("Login clicked");
  };

  const handleSignUp = () => {
    Taro.navigateTo({ url: "/pages/signup/index" });
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <View className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 flex flex-col items-center justify-center">
      {/* Header Logo */}
      <View className="mb-10">
        <Text className="text-3xl font-bold text-blue-700">cignifi</Text>
      </View>

      {/* Title */}
      <Text className="text-xl font-medium text-gray-800 mb-6">
        Login to your Account
      </Text>

      {/* Form */}
      <View className="w-full max-w-md space-y-4">
        {/* Email Input */}
        <View className="bg-white rounded-lg shadow-sm p-3">
          <Input
            type="email"
            placeholder="Email"
            className="w-full text-gray-800 placeholder-gray-400 outline-none"
            placeholderClass="text-gray-400"
          />
        </View>

        {/* Password Input */}
        <View className="bg-white rounded-lg shadow-sm p-3">
          <Input
            type="password"
            placeholder="Password"
            className="w-full text-gray-800 placeholder-gray-400 outline-none"
            placeholderClass="text-gray-400"
          />
        </View>

        {/* Sign In Button */}
        <Button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-700 text-white font-medium rounded-lg shadow hover:bg-blue-800 transition-colors"
        >
          Sign in
        </Button>
      </View>

      {/* Divider */}
      <View className="my-8 flex items-center w-full max-w-md">
        <View className="flex-1 h-px bg-gray-300"></View>
        <Text className="mx-4 text-sm text-gray-500">Or sign in with</Text>
        <View className="flex-1 h-px bg-gray-300"></View>
      </View>

      {/* Social Login Buttons */}
      <View className="flex space-x-4 w-full max-w-md">
        {/* Google */}
        <View
          onClick={() => handleSocialLogin("google")}
          className="flex-1 bg-white rounded-lg shadow-sm p-3 flex justify-center items-center cursor-pointer hover:bg-gray-50 transition"
        >
          <Text className="text-red-500 text-2xl">G</Text>
        </View>

        {/* Facebook */}
        <View
          onClick={() => handleSocialLogin("facebook")}
          className="flex-1 bg-white rounded-lg shadow-sm p-3 flex justify-center items-center cursor-pointer hover:bg-gray-50 transition"
        >
          <Text className="text-blue-600 text-2xl">f</Text>
        </View>

        {/* Twitter */}
        <View
          onClick={() => handleSocialLogin("twitter")}
          className="flex-1 bg-white rounded-lg shadow-sm p-3 flex justify-center items-center cursor-pointer hover:bg-gray-50 transition"
        >
          <Text className="text-blue-400 text-2xl">🐦</Text>
        </View>
      </View>

      {/* Sign Up Link */}
      <View className="mt-10 text-center">
        <Text className="text-gray-600">Don't have an account? </Text>
        <Text
          onClick={handleSignUp}
          className="text-blue-600 font-medium underline cursor-pointer"
        >
          Sign up
        </Text>
      </View>
    </View>
  );
};

export default LoginPage;
