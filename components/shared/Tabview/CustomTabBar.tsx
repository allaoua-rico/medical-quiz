import React from "react";
import { TabBar } from "react-native-tab-view";

const CustomTabBar = (props: any) => {
  return (
    <TabBar
      {...props}
      scrollEnabled
      style={{
        backgroundColor: "transparent",
        elevation: 0,
        padding: 0,
      }}
      labelStyle={{
        color: "black",
        fontFamily: "Poppins-Regular",
        fontSize: 18,
        textTransform: "none",
      }}
      indicatorStyle={{ backgroundColor: "black" }}
      contentContainerStyle={{ marginHorizontal: 25 }}
      indicatorContainerStyle={{ marginHorizontal: 25, paddingHorizontal: 50 }}
    />
  );
};

export default CustomTabBar;
