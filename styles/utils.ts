type ThemeField = Record<string, string>;

interface Theme {
  theme: {
    [key: string]: ThemeField;
  };
}

export const getColor =
  (colorName: string) =>
  ({ theme }: Theme): string =>
    theme.color[colorName];

export const getFont =
  (fontName: string) =>
  ({ theme }: Theme): string =>
    theme.fontFamily[fontName];

export const getFontWeight =
  (fontWeight: string) =>
  ({ theme }: Theme): string =>
    theme.fontWeight[fontWeight];

export const getShadow =
  (shadowName: string) =>
  ({ theme }: Theme): string =>
    theme.shadows[shadowName];

export const getAnimation =
  (animationName: string) =>
  ({ theme }: Theme): string =>
    theme.animations[animationName];
