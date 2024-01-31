import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyStatusBar from "../../../Components/MyStatusBar";
import { useTheme } from "react-native-paper";
import PrimaryButton from "../../../Components/Buttons/PrimaryButton";
import ScreenWrapper from "../../../Components/ScreenWrapper";
import SearchInput from "../../../Components/Inputs/SearchInput";
import REFRESH_IMAGE from "./../../../assets/Images/refresh.png";
import FILTER_IMAGE from "./../../../assets/Images/filter_icon_black.png";
import ProfileCard from "../../../Components/Cards/ProfileCard";
import BottomNavigator from "../../../Components/Navigation/BottomNavigator";
import SearchModal from "../../../Components/Modals/SearchModal";
import useAxios from "../../../GlobalHooks/useAxios";
import { GET_RECOMMENDED_SNAKS } from "../../../Constant";
import { useSelector, useDispatch } from "react-redux";
import { ADD_RECOMMENDED_SNAKS } from "../../../Redux/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import useHome from "./Hooks/useHome";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { SEARCH_PATH } from "../../../Navigation/Routes";
import SearchBarWithFilter from "../../../Components/Inputs/SearchBarWithFilter";
import useDebounce from "../../../GlobalHooks/useDebounce";

import useLogicProfile from "../CreateProfile/Hooks/useLogicProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ListEmptyComponent,
  ListFooterComponent,
  ListHeaderComponent,
} from "../../../Components/Flatlist/components";

const Home = ({ route }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {
    user,
    activeUserCount,
    recommendedSnaks,
    allRecommendedSnaks,
    snaks,
    loading,
    loadingMore,
    getRecommendedSnaks,
    getAllRecommendedSnaks,
    getMoreAllRecommendedSnaks,
  } = useHome();

  // const token = useSelector((state) => state.userReducer.accessToken);
  // const blockedList = useSelector((state) => state.userReducer.blockedList);
  // console.log("user ==> ", user);
  // console.log("Token ==> ", token);
  const localFilter = useSelector(
    (state) => state.userReducer.recommendedSnaksFilter
  );
  const [searchModal, setSearchModal] = useState(false);
  const [searchText, setSearchText] = useState("");

  const debounceSearchValue = useDebounce(searchText, 300);

  // console.log("recommendedSnaks ==> ", recommendedSnaks);
  // console.log(" <÷==== allRecommendedSnaks ==> ", allRecommendedSnaks);

  const { updateProfile } = useLogicProfile();
  const setFcmToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem("fcmToken");

      let reqObj = {
        fcmToken,
      };

      updateProfile(reqObj);
    } catch (error) {
      console.log("getting error on setting fcm token ==>", error);
    }
  };
  useEffect(() => {
    if (!user?.fcmToken) {
      setFcmToken();
    }
  }, [user]);

  const renderItem = useCallback(
    ({ item }) => {
      return <ProfileCard data={item} />;
    },
    [allRecommendedSnaks?.results]
  );

  const getMoreData = useCallback(() => {
    getMoreAllRecommendedSnaks();
  });

  useEffect(() => {
    if (debounceSearchValue.trim() !== "") {
      getAllRecommendedSnaks({ search: debounceSearchValue });
    } else {
      getAllRecommendedSnaks();
    }
  }, [debounceSearchValue]);

  useEffect(() => {
    const clearSearchText = () => {
      setSearchText("");
    };

    const unsubscribeFocus = navigation.addListener("focus", clearSearchText);
    const unsubscribeBlur = navigation.addListener("blur", clearSearchText);

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [navigation]);

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
          searchBar={
            <SearchBarWithFilter
              onSearchPress={() => {
                if (debounceSearchValue) {
                  getAllRecommendedSnaks({ search: debounceSearchValue });
                }
              }}
              onFilterPress={() => setSearchModal(true)}
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
            />
          }
        >
          <View style={styles.headerContainer}>
            <View style={styles.availableContainer}>
              <Text
                style={[styles.availableText, { color: colors.lightGreyLite }]}
              >
                Available
              </Text>

              <View style={styles.activeUsers}>
                <View style={styles.dot} />
                <Text
                  style={[styles.activeText, { color: colors.lightGreyLite }]}
                >
                  {`Active users: ${activeUserCount}`}
                  {/* {`Active users: ${
                    allRecommendedSnaks?.results?.filter((v) => v?.is_online)
                      ?.length
                  }`} */}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.refreshBtn}
              onPress={() => {
                getAllRecommendedSnaks();
                getRecommendedSnaks();
              }}
            >
              <Text
                style={[styles.refreshText, { color: colors.lightGreyLite }]}
              >
                Refresh
              </Text>
              <Image source={REFRESH_IMAGE} style={{ width: 20 }} />
            </TouchableOpacity>
          </View>
          <View style={[styles.inputContainer, { flex: 1, paddingTop: 10 }]}>
            <FlatList
              data={allRecommendedSnaks?.results?.filter((snak) => {
                const userMatches = snak?.user?.id !== user?.id;
                const nameMatches =
                  !debounceSearchValue ||
                  snak?.user?.name
                    .toLowerCase()
                    .includes(debounceSearchValue.toLowerCase());
                return { userMatches, nameMatches };
              })}
              keyExtractor={(item) => item?.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              bounces={false}
              ListEmptyComponent={
                <ListEmptyComponent message="No Snak Available" />
              }
              ListHeaderComponent={<ListHeaderComponent loading={loading} />}
              ListFooterComponent={
                <ListFooterComponent loading={loadingMore} />
              }
              // onEndReached={getMoreData}
              // onEndReachedThreshold={0.1}
            />
          </View>
          {recommendedSnaks?.data?.length ? (
            <View style={[styles.inputContainer, { paddingBottom: 25 }]}>
              <View
                style={[
                  styles.active,
                  { borderBottomColor: colors.lightGreyLite },
                ]}
              >
                <Text
                  style={[styles.activeHeader, { color: colors.lightGreyLite }]}
                >
                  Recently Active
                </Text>
              </View>
              {recommendedSnaks?.data
                ?.filter((v) => !v.active)
                ?.map((snaks) => {
                  return <ProfileCard key={snaks.id} data={snaks} />;
                })}
            </View>
          ) : null}
        </ScreenWrapper>
      </SafeAreaProvider>
      <BottomNavigator />
      <SearchModal
        visible={searchModal}
        onClose={() => setSearchModal(false)}
        onSearch={getAllRecommendedSnaks}
      />
    </>
  );
};
export default Home;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 20,
    // marginVertical: 7,
  },
  headerContainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: "pink"
  },
  availableText: {
    fontSize: 20,
    fontFamily: "OpenSans-SemiBold",
    letterSpacing: 0.5,
  },
  refreshBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  refreshText: {
    fontSize: 14,
    fontFamily: "OpenSans-Regular",
    marginRight: 5,
  },
  activeUsers: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: "#03FC1C",
    marginRight: 3,
  },
  activeText: {
    fontSize: 10,
    fontFamily: "OpenSans-Regular",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  active: {
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomWidth: 2,
    paddingLeft: 5,
  },
  searchContainer: {
    flexDirection: "row",
  },
});
