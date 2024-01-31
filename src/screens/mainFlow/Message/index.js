import React, { useCallback, useState } from "react";
import { View, StyleSheet, RefreshControl, FlatList } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";

import ScreenWrapper from "../../../Components/ScreenWrapper";
import MyStatusBar from "../../../Components/MyStatusBar";
import ChatCard from "../../../Components/Cards/ChatCard";
import BottomNavigator from "../../../Components/Navigation/BottomNavigator";
import SearchModal from "../../../Components/Modals/SearchModal";
import HeaderBottom from "../../../Components/ScreenWrapper/HeaderBottom";
import { ListEmptyComponent } from "../../../Components/Flatlist/components";
import useMessage from "./Hooks/useMessage";

const Message = () => {
  const { colors } = useTheme();
  const [searchModal, setSearchModal] = useState(false);

  const { loading, allChats, getChats, getLoadMore } = useMessage();

  // console.log("User ===> ", user)

  // let chats = [
  //   {
  //     id: 1,
  //     chatId: "",
  //     sender_id: {
  //       id: 140,
  //       email: "test@july.com",
  //       name: "Test July",
  //       profile_picture: null,
  //       phone: "+1223344667"
  //     },
  //     receiver_id: {
  //       id: 131,
  //       email: "new@dev.com",
  //       name: "Test Dev",
  //       profile_picture:
  //         "https://snaksnak-new-35878.s3.amazonaws.com/image_1522437259_131.jpeg",
  //       phone: "+1223344556"
  //     },
  //     last_message: "",
  //     count: 0
  //   },
  //   {
  //     id: 2,
  //     chatId: "",
  //     sender_id: {
  //       id: 132,
  //       email: "asd@asd.com",
  //       name: "Asd asd",
  //       profile_picture: null,
  //       phone: "+1223344557"
  //     },
  //     receiver_id: {
  //       id: 137,
  //       email: "account@dev.com",
  //       name: "Developer Account",
  //       profile_picture:
  //         "https://snaksnak-new-35878.s3.amazonaws.com/profile_1522437259_137.jpeg",
  //       phone: "+1223344558"
  //     },
  //     last_message: "",
  //     count: 0
  //   }
  // ]

  const renderItem = useCallback(({ item }) => {
    return <ChatCard data={item} />;
  }, []);

  return (
    <>
      <SafeAreaProvider>
        <MyStatusBar
          backgroundColor={colors.primary}
          barStyle="light-content"
        />
        <ScreenWrapper
          isMiniLogo={true}
          logoHeight={100}
          isLogo={false}
          isProfileImage
          searchBar={<HeaderBottom title={"Messages"} />}
        >
          <View style={[styles.inputContainer, { flex: 1 }]}>
            {/* <ChatCard isNew={true} /> */}

            <FlatList
              data={allChats?.results || []}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <ListEmptyComponent
                  // loading={loading}
                  message="You Do not have any message yet!"
                />
              }
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getChats}
                  tintColor={colors.primary}
                />
              }
              onEndReached={getLoadMore}
              onEndReachedThreshold={0.1}
            />
          </View>
        </ScreenWrapper>
      </SafeAreaProvider>
      <BottomNavigator />
      <SearchModal
        visible={searchModal}
        onClose={() => setSearchModal(false)}
      />
    </>
  );
};
export default Message;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 7,
  },
});
