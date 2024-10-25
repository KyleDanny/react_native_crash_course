import { useState } from "react";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { icons } from "../constants";

const VideoCard = ({
  title,
  creator,
  avatar,
  thumbnail,
  video,
  prompt,
}: any) => {
  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          style={{
            width: 208,
            height: 260,
            borderRadius: 33,
            marginVertical: 20,
            overflow: "hidden",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.4,
            shadowRadius: 10,
          }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          // isLooping
          onPlaybackStatusUpdate={(status: AVPlaybackStatus) => {
            if (status.isLoaded && status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <View className="flex justify-center items-center flex-row flex-1">
        <View className="flex justify-center flex-1 ml-3 gap-y-1">
          <Text className="text-sm text-left text-white pt-4" numberOfLines={1}>
            {prompt}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default VideoCard;
