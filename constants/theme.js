import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#5390ff", // Blue
    secondary: "#cacfd9",   // Gray
    bgcolor:'#ff4d4d',
    catBack:'#bfbfbf',
    main:'#eb4034',
    baCol:'#f5f1e6',
    msgBg:'#fafad2',
    // colors
    black: "#1E1F20",
    dark:'#000',
    white: "#FFFFFF",
    lightGray: "#66757F",
    gray: "#8b9097",
    slackgray:'#CCD6DD',
    homBtn:'#f7f7f7'
};
export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,

    // font sizes
    largeTitle: 22,
    h1: 18,
    h2: 16,
    h3: 14,
    h4: 12,
    body1: 18,
    body2: 16,
    body3: 14,
    body4: 12,

    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontSize: SIZES.largeTitle, lineHeight: 22 },
    h1: {  fontSize: SIZES.h1, lineHeight: 26 },
    h2: {  fontSize: SIZES.h2, lineHeight: 26 },
    h3: {fontSize: SIZES.h3, lineHeight: 18 },
    h4: { fontSize: SIZES.h4, lineHeight: 16 },
    body1: { fontSize: SIZES.body1, lineHeight: 26 },
    body2: { fontSize: SIZES.body2, lineHeight: 20 },
    body3: {fontSize: SIZES.body3, lineHeight: 16 },
    body4: {  fontSize: SIZES.body4, lineHeight: 16 },
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;