import { StyleSheet, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { HomeStackScreenProps } from "../types";
import { View } from "../components/Themed";
import supabase from "../utils/supabase";
import Pdf from "react-native-pdf";
import * as FileSystem from "expo-file-system";
import useAlert from "../components/shared/Alert/useAlert";
import { Spinner } from "native-base";
import MainSvg from "../images/undraw_note_list_re_r4u9.svg";
import AdobeSvg from "../images/Adobe.svg";
import TopMainSvg from "../images/coursMainTopSvg.svg";
import { SafeAreaView } from "react-native-safe-area-context";
// import { encode } from "react-native-base64";

export default function CoursDownload(
  props: HomeStackScreenProps<"CoursDownload">
) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string>("");
  const { title, file_server_name } = props.route.params.course;
  const fileUri = FileSystem.documentDirectory + file_server_name;
  const { setAlert } = useAlert();

  useEffect(() => {
    async function getCoursePdf() {
      setLoading(true);
      try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
          console.log("exists")
          const file = await FileSystem.readAsStringAsync(fileUri);
          setFile(file);
        } else {
          console.log("Download")
          const { data, error } = await supabase.storage
            .from("courses")
            .download(file_server_name);
          if (error) throw { ...error, msg: "Error downloading the file" };
          if (data) {
            // Save it from blob as string
            const fr = new FileReader();
            fr.onload = async (e) => {
              if (typeof fr?.result == "string") {
                const fileAsString = fr.result.replace("octet-stream", "pdf");
                setFile(fileAsString);
                await FileSystem.writeAsStringAsync(fileUri, fileAsString, {});
              }
            };
            fr.readAsDataURL(data);
            console.log("File saved successfully!");
          }
        }
        setFile(file);
      } catch (error: any) {
        // console.log(error?.msg, error);
        setAlert("Erreur", "error");
      } finally {
        setLoading(false);
      }
    }
    getCoursePdf();
  }, [title]);

  useEffect(() => {
    // console.log("file", file.slice(0, 50));
  }, [file]);

  return (
    <View className="items-center relative pt-12" style={styles.container}>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <Spinner
            accessibilityLabel="Loading results"
            color="black"
            size="lg"
            className="my-auto"
          />
        </View>
      ) : (
        <Pdf
          trustAllCerts={false}
          source={{ uri: file }}
          style={styles.pdf}
          // onLoadComplete={(numberOfPages, filePath) => {
          //   console.log(`Number of pages: ${numberOfPages}`);
          // }}
          // onPageChanged={(page, numberOfPages) => {
          //   console.log(`Current page: ${page}`);
          // }}
          // onError={(error) => {
          //   console.log("error", error);
          // }}
          // onPressLink={(uri) => {
          //   console.log(`Link pressed: ${uri}`);
          // }}
        />
      )}

      {/* <TopMainSvg
        preserveAspectRatio="xMinYMin slice"
        style={{ position: "absolute", top: -20 }}
        width="100%"
      />
      <MainSvg />
      <Text className="text-[#1275D2] font-bold text-3xl text-center mt-9 px-5">
        {course.title}
      </Text>
      <Text className="text-xl text-center mt-9">
        Télécharger le cours à partir du lien
      </Text>
      <View className="mt-6">
        <AdobeSvg />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
