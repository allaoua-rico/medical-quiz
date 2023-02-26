/// <reference types="nativewind/types" />

declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "react-native-dotenv" {
  export const SUPABASE_KEY: string;
}
