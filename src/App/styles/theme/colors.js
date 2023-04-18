import { get } from 'lodash';

export const SHADE = Object.freeze({
  APP_BACKGROUND: 0,
  SUBTLE_BACKGROUND: 1,
  UI_ELEMENT_BACKGROUND: 2,
  HOVERED_UI_ELEMENT_BACKGROUND: 3,
  ACTIVE_SELECTED_UI_ELEMENT_BACKGROUND: 4,
  SUBTLE_BORDER_AND_SEPARATOR: 5,
  UI_ELEMENT_BORDER_AND_FOCUS: 6,
  HOVERED_UI_ELEMENT_BORDER: 7,
  SOLID_BACKGROUND: 8,
  HOVERED_SOLID_BACKGROUND: 9,
  LOW_CONTRAST_TEXT: 10,
  HIGH_CONTRAST_TEXT: 11,
});

export class Colors {
  constructor(theme, colors) {
    this.theme = theme;
    this.isDarkScheme = this.theme.colorScheme === 'dark';
    this.colors = colors;
    this.primaryColors = this.colors.primary;
  }

  themeColor(color, shade) {
    if (typeof color === 'number' && shade == null)
      return this.primaryColors[color];

    if (typeof color === 'string') {
      if (color.includes('.')) return get(this.colors, color);
      if (typeof shade === 'number') return this.colors[color][shade];
    }

    throw new Error(
      `Invalid usage, expected (color: string, shade: int), got: (${color},${shade})`
    );
  }

  getAppBackground(color) {
    return color
      ? this.themeColor(color, SHADE.APP_BACKGROUND)
      : this.themeColor(SHADE.APP_BACKGROUND);
  }

  getSubtleBackground(color) {
    return color
      ? this.themeColor(color, SHADE.SUBTLE_BACKGROUND)
      : this.themeColor(SHADE.SUBTLE_BACKGROUND);
  }

  getUiElementBackground(color) {
    return color
      ? this.themeColor(color, SHADE.UI_ELEMENT_BACKGROUND)
      : this.themeColor(SHADE.UI_ELEMENT_BACKGROUND);
  }

  getHoveredUiElementBackground(color) {
    return color
      ? this.themeColor(color, SHADE.HOVERED_UI_ELEMENT_BACKGROUND)
      : this.themeColor(SHADE.HOVERED_UI_ELEMENT_BACKGROUND);
  }

  getActiveSelectedUiElementBackground(color) {
    return color
      ? this.themeColor(color, SHADE.ACTIVE_SELECTED_UI_ELEMENT_BACKGROUND)
      : this.themeColor(SHADE.ACTIVE_SELECTED_UI_ELEMENT_BACKGROUND);
  }

  getSubtleBorderAndSeparator(color) {
    return color
      ? this.themeColor(color, SHADE.SUBTLE_BORDER_AND_SEPARATOR)
      : this.themeColor(SHADE.SUBTLE_BORDER_AND_SEPARATOR);
  }

  getUiElementBorderAndFocus(color) {
    return color
      ? this.themeColor(color, SHADE.UI_ELEMENT_BORDER_AND_FOCUS)
      : this.themeColor(SHADE.UI_ELEMENT_BORDER_AND_FOCUS);
  }

  getHoveredUiElementBorder(color) {
    return color
      ? this.themeColor(color, SHADE.HOVERED_UI_ELEMENT_BORDER)
      : this.themeColor(SHADE.HOVERED_UI_ELEMENT_BORDER);
  }

  getSolidBackground(color) {
    return color
      ? this.themeColor(color, SHADE.SOLID_BACKGROUND)
      : this.themeColor(SHADE.SOLID_BACKGROUND);
  }

  getHoveredSolidBackground(color) {
    return color
      ? this.themeColor(color, SHADE.HOVERED_SOLID_BACKGROUND)
      : this.themeColor(SHADE.HOVERED_SOLID_BACKGROUND);
  }

  getLowContrastText(color) {
    return color
      ? this.themeColor(color, SHADE.LOW_CONTRAST_TEXT)
      : this.colors.gray[SHADE.LOW_CONTRAST_TEXT];
  }

  getHighContrastText(color) {
    return color
      ? this.themeColor(color, SHADE.HIGH_CONTRAST_TEXT)
      : this.colors.gray[SHADE.HIGH_CONTRAST_TEXT];
  }
}
