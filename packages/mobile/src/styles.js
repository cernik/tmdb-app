import { StyleSheet } from "react-native";

export const MARGIN = 8;
export const PADDING = 4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: PADDING,
  },
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  box: {
    minWidth: 96,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: PADDING,
  },
  headerButton: {
    marginHorizontal: 18,
  },
  button: {
    flexDirection: "row",
    borderWidth: 1,
    width: 180,
    height: 40,
    margin: MARGIN,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  badgeContainer: {
    borderWidth: 1,
    borderColor: "gainsboro",
    backgroundColor: "gainsboro",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    height: 18,
    width: 18,
    borderRadius: 9,
    position: "absolute",
    right: -4,
    top: -4,
    backgroundColor: "darkgreen",
    borderColor: "white",
  },
  text: {
    fontSize: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
  },
  name: {
    textAlign: "left",
    fontSize: 18,
    marginStart: MARGIN,
  },
  rating: {
    fontSize: 18,
    color: "darkgreen",
    fontWeight: "600",
  },
  yearText: {
    margin: MARGIN,
    fontSize: 16,
  },
  infoRow: {
    alignItems: "center",
    padding: PADDING,
    alignSelf: "flex-end",
    flex: 1,
  },
  card: {
    borderRadius: 4,
    backgroundColor: "white",
    padding: PADDING,
    marginVertical: PADDING,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 12,
  },
  avatar: {
    height: 120,
    width: 120,
    borderRadius: 60,
    margin: MARGIN,
  },
  miniavatar: {
    height: 32,
    width: 32,
    borderRadius: 16,
    margin: MARGIN,
  },
  icon: {
    height: 94,
    width: 94,
    borderRadius: 4,
  },
  emptyComponent: {
    borderWidth: StyleSheet.hairlineWidth,
    marginTop: 20,
    borderRadius: 4,
  },
  bottomHairLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default styles;
