import { ImageBackground, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  FormControl,
  Icon,
  Image,
  Input,
  Pressable,
  Spinner,
  VStack,
  WarningOutlineIcon,
} from "native-base";
import { Formik } from "formik";
import { FormikProps } from "formik/dist/types";
import { MaterialIcons } from "@expo/vector-icons";
import * as yup from "yup";
import { useAuth } from "../auth/AuthProvider";
import { Text } from "../components/Themed";

const Login = () => {
  const { state, authContext } = useAuth();
  return (
    <ImageBackground
      source={require("../assets/images/login.png")}
      className="flex-1"
      alt="loginImg"
    >
      <View className="bg-[#327BE9] opacity-50 absolute top-0 bottom-0 left-0 right-0"></View>
      <SafeAreaView className="flex-1 justify-center space-y-[70px]">
        <View className="items-center space-y-4">
          <Text className="text-white text-4xl">Bienvenue à</Text>
          <Text className="text-[#0C4E8C] text-5xl font-extrabold">MEDICS</Text>
        </View>
        <View>
          <Formik
            initialValues={initialValues}
            onSubmit={(data) => {
              authContext?.signIn(data);
            }}
            validationSchema={validationSchema}
          >
            {(props) => (
              <VStack
                width="80%"
                space={8}
                className="mx-auto my-auto items-center"
              >
                <View className="bg-white w-full py-9 items-center rounded-[20px]">
                  <View className="bg-primary p-4 rounded-full absolute -top-7">
                    <Image
                      alt="personlogo"
                      source={require("../assets/images/person.png")}
                    />
                  </View>
                  <View className="opacity-80 items-center w-full">
                    <EmailInput {...props} />
                    <PasswordInput {...props} />
                  </View>
                </View>
                {state?.error == "CREDENTIALS" && (
                  <View className="flex items-center">
                    <WarningOutlineIcon
                      size="xs"
                      style={{ fontSize: 20, color: "#FF9999" }}
                    />
                    <Text className="text-red-300 font-semibold text-sm">
                      Les informations fournies sont incorrectes
                    </Text>
                  </View>
                )}
                <Button
                  onPress={(e) => {
                    props.handleSubmit();
                  }}
                  colorScheme="#0C4E8C"
                  className="w-4/5 bg-primary"
                  disabled={state?.isLoading}
                >
                  {state?.isLoading ? (
                    <View className="py-4 font-bold text-white text-lg">
                      <Spinner
                        accessibilityLabel="Login"
                        color="white"
                        size="sm"
                      />
                    </View>
                  ) : (
                    <Text className="py-4 font-bold text-white text-lg">
                      CONNEXION
                    </Text>
                  )}
                </Button>
              </VStack>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Login;

const EmailInput = (props: InputProps) => {
  const { handleChange, handleBlur, values, errors } = props;
  return (
    <FormControl isRequired isInvalid={"email" in errors} w="95%" maxW="300px">
      <FormControl.Label>
        <Text className="text-[#616161] font-semibold text-base pb-2 pt-4">
          E-mail ou numéro de téléphone
        </Text>
      </FormControl.Label>
      <Input
        padding={3}
        size="lg"
        className="bg-white"
        variant="filled"
        onBlur={handleBlur("email")}
        placeholder="exemple@gmail.com"
        onChangeText={handleChange("email")}
        value={values.email}
        keyboardType="email-address"
        borderColor="#0C4E8C"
        borderRadius={12}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errors.email}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

const PasswordInput = (props: InputProps) => {
  const { handleChange, handleBlur, values, errors } = props;
  const [show, setShow] = React.useState(false);
  return (
    <FormControl
      isRequired
      isInvalid={"password" in errors}
      w="95%"
      maxW="300px"
    >
      <FormControl.Label>
        <Text className="text-[#616161] font-semibold text-base pb-2 pt-4">
          Mot de passe
        </Text>
      </FormControl.Label>
      <Input
        padding={3}
        size="lg"
        className="bg-white h-full"
        variant="filled"
        onBlur={handleBlur("password")}
        placeholder="entrez votre mot de passe"
        onChangeText={handleChange("password")}
        value={values.password}
        type={show ? "text" : "password"}
        secureTextEntry={!show}
        borderColor="#0C4E8C"
        borderRadius={12}
        InputRightElement={
          <Pressable
            className=" bg-white h-full max-h-full justify-center"
            onPress={() => setShow(!show)}
          >
            <Icon
              as={
                <MaterialIcons name={show ? "visibility" : "visibility-off"} />
              }
              size={5}
              mr="2"
              color="muted.400"
            />
          </Pressable>
        }
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errors.password}
      </FormControl.ErrorMessage>
    </FormControl>
  );
};

const initialValues: FormValues = {
  email: "allaoua.boudriou@gmail.com",
  password: "password",
};
export type FormValues = {
  email: string;
  password: string;
};

type InputProps = FormikProps<FormValues>;

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Entrer un email valide")
    .required("Un Email is requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),
});
