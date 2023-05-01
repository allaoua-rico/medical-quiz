import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  FormControl,
  Icon,
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

const Login = () => {
  const { state, authContext } = useAuth();

  return (
    <SafeAreaView className="bg-[#0085FF] flex-grow">
      <Formik
        initialValues={initialValues}
        onSubmit={(data) => {
          authContext?.signIn(data);
        }}
        validationSchema={validationSchema}
      >
        {(props) => {
          const { handleSubmit } = props;
          return (
            <>
              <VStack
                width="80%"
                space={4}
                className="mx-auto my-auto flex items-center space-y-4"
              >
                <EmailInput {...props} />
                <PasswordInput {...props} />
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
                    handleSubmit();
                  }}
                  colorScheme="pink"
                  className="w-4/5"
                  disabled={state?.isLoading}
                >
                  {state?.isLoading ? (
                    <Spinner
                      accessibilityLabel="Login"
                      color="white"
                      size="sm"
                    />
                  ) : (
                    "S'identifier"
                  )}
                </Button>
              </VStack>
            </>
          );
        }}
      </Formik>
    </SafeAreaView>
  );
};

export default Login;

const EmailInput = (props: InputProps) => {
  const { handleChange, handleBlur, values, errors } = props;
  return (
    <FormControl isRequired isInvalid={"email" in errors} w="95%" maxW="300px">
      <FormControl.Label>
        <Text className="text-black font-semibold">Email</Text>
      </FormControl.Label>
      <Input
        className="bg-white"
        variant="filled"
        onBlur={handleBlur("email")}
        placeholder="Email"
        onChangeText={handleChange("email")}
        value={values.email}
        keyboardType="email-address"
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
        <Text className="text-black font-semibold">Mot de passe</Text>
      </FormControl.Label>
      <Input
        className="bg-white h-full"
        variant="filled"
        onBlur={handleBlur("password")}
        placeholder="Mot de passe"
        onChangeText={handleChange("password")}
        value={values.password}
        type={show ? "text" : "password"}
        secureTextEntry={!show}
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
