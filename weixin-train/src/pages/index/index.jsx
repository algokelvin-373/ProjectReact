import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";

export default function Index() {
  useLoad(() => {
    setTimeout(() => {
      Taro.reLaunch({
        url: "/pages/Login/index",
      });
    }, 2000);
  });

  return (
    <View className="flex justify-center items-center w-full h-screen bg-[#1A2B88]">
      <Text className="text-white text-8xl font-bold">大家好</Text>
    </View>
  );
}
