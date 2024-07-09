const colorlist = ["lightGray", "lightGreen", "lightYellow", "lightBlue", "lightPink", "lightPurple", "lightOrange"]

export const getRandomColor = (value) => {
    return colorlist[value % colorlist.length]
};
