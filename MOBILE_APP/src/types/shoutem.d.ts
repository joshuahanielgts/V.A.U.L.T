declare module '@shoutem/ui' {
    import { ReactNode, ComponentType } from 'react';
    import { 
      StyleProp, 
      TextStyle, 
      ViewStyle, 
      TextInputProps, 
      TouchableOpacityProps,
      ImageProps
    } from 'react-native';
  
    export interface TextProps {
      style?: StyleProp<TextStyle>;
      children?: ReactNode;
      [key: string]: any;
    }
  
    export interface ViewProps {
      style?: StyleProp<ViewStyle>;
      children?: ReactNode;
      [key: string]: any;
    }
  
    export const Screen: ComponentType<ViewProps>;
    export const View: ComponentType<ViewProps>;
    export const Text: ComponentType<TextProps>;
    export const TextInput: ComponentType<TextInputProps>;
    export const Button: ComponentType<TouchableOpacityProps>;
    export const Divider: ComponentType<ViewProps>;
    export const Tile: ComponentType<ViewProps>;
    export const Card: ComponentType<ViewProps>;
    export const Caption: ComponentType<TextProps>;
    export const Subtitle: ComponentType<TextProps>;
    export const Title: ComponentType<TextProps>;
  }
  
  declare module '@shoutem/theme' {
    // Add type definitions as needed
    const exports: any;
    export default exports;
  }