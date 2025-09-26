// src/pages/index/index.tsx
import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";

export default function Index() {
  useLoad(() => {
    setTimeout(() => {
      Taro.reLaunch({
        url: "/pages/login/index",
      });
    }, 2000);
  });

  return (
    <View className="flex justify-center items-center h-screen bg-blue-100">
      <Text className="text-blue-500 text-4xl">大家好</Text>
    </View>
  );
}
