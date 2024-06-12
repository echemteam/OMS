const colorlist = ["lightOrange", "lightGray", "lightGreen", "lightYellow", "lightBlue", "lightPink", "lightPurple"]

export const getRandomColor = (value) => {
    return colorlist[value % colorlist.length]
};
