import { HomeStackScreenProps } from "../types";
import { Image } from "react-native";
import UndrawExterne from "../images/Group 11.svg";
import HomeButton from "./HomeButton";
import { View } from "react-native";
import HomeWrapperImg from "./layout/HomeWrapperImg";

export default function HomeRoot({
  navigation,
}: HomeStackScreenProps<"HomeRoot">) {
  return (
    <HomeWrapperImg>
      <View className="flex flex-row px-2">
        {/* Left col */}
        <View className="w-1/2 pr-1 bg-transparent">
          {[
            {
              title: "Résidanat",
              description: "Plus de 1000 QCMs",
              Icon: <Image source={require("../images/doctor_svgrepo.png")} />,
              color: "#00D1FF",
              link: "Residanat",
            },
            {
              title: "Cours",
              description: "Lire pour mieux comprendre",
              Icon: <Image source={require("../images/book-1_svgrepo.png")} />,
              color: "#6100FF",
              link: "Cours",
            },
          ].map(({ title, description, Icon, color, link }) => (
            <HomeButton
              navigation={navigation}
              key={title}
              title={title}
              description={description}
              Icon={Icon}
              bgColor={color}
              link={link}
            />
          ))}
        </View>
        {/* Right col */}
        <View className="w-1/2 pl-1 flex justify-center">
          {[
            {
              title: "Externe",
              description: "Accés à l'année ",
              Icon: <UndrawExterne />,
              color: "#0E57C3",
              link: "Externe",
            },
          ].map(({ title, description, Icon, color, link }) => (
            <HomeButton
              navigation={navigation}
              key={title}
              title={title}
              description={description}
              Icon={Icon}
              bgColor={color}
              link={link}
            />
          ))}
        </View>
      </View>
    </HomeWrapperImg>
  );
}
