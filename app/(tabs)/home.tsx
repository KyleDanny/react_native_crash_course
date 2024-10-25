import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import images from "@/constants/images";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import useAppwrite from "@/lib/useAppwrite";
import { getAllPosts, getLatestPosts } from "@/lib/appwrite";
import VideoCard from "@/components/VideoCard";
import { useGlobalContext } from "@/context/GlobalContext";

export interface Post {
  $id: string;
  title: string;
  thumbnail: string;
  video: string;
  users: {
    username: string;
    avatar: string;
  };
  prompt: string;
}

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser, setIsLogged } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item: Post) => item?.$id}
        renderItem={({ item }: { item: Post }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.users?.username}
            avatar={item.users?.avatar}
            prompt={item.prompt}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username || "Unknown"}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.DNTLogo}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
