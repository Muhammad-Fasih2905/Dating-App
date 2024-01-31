import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "react-native-paper";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import FILTER_IMAGE from "../../assets/Images/filter_icon_black.png";

const SearchBarWithFilter = ({
  onSearchPress,
  onFilterPress,
  onChangeText,
  value,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={onSearchPress}>
            <EvilIcons
              name={"search"}
              style={styles.searchIcon}
              color={colors.primaryText}
              size={28}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
            <Image style={styles.filterImage} source={FILTER_IMAGE} />
          </TouchableOpacity>
        </View>

        <View style={styles.textInputContainer}>
          <TextInput
            placeholder="Search a snak"
            placeholderTextColor={colors.primaryText}
            style={{ color: colors.primaryText }}
            onChangeText={onChangeText}
            value={value}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  searchBarContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    width: "90%",
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
  },
  iconsContainer: {
    width: "20%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  textInputContainer: {
    width: "80%",
    height: "100%",
    justifyContent: "center",
  },
  filterImage: {
    width: 22,
    height: 22,
  },
  filterButton: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    paddingLeft: 10,
  },
});

export default SearchBarWithFilter;
