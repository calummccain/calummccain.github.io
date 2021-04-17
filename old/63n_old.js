// Order n hexagonal

import { p } from "./js/data/constants.js";

const vertices = [
    [4, 0, 0, 0], [5, 1, 0, 2], [7, 3, 1, 3], [8, 4, 2, 2],
    [7, 3, 2, 0], [5, 1, 1, -1], [4, 0, -0, 0], [5, 1, -0, 2],
    [7, 3, -1, 3], [8, 4, -2, 2], [7, 3, -2, 0], [5, 1, -1, -1],
    [4, 0, 0, -0], [5, 1, 1, -1], [7, 3, 1, -3], [8, 4, 0, -4],
    [7, 3, -1, -3], [5, 1, -1, -1], [5, 1, 0, 2], [7, 3, 1, 3],
    [11, 7, 1, 5], [13, 9, 0, 6], [11, 7, -1, 5], [7, 3, -1, 3],
    [5, 1, 1, -1], [7, 3, 2, 0], [11, 7, 3, -1], [13, 9, 3, -3],
    [11, 7, 2, -4], [7, 3, 1, -3], [5, 1, -1, -1], [7, 3, -2, 0],
    [11, 7, -3, -1], [13, 9, -3, -3], [11, 7, -2, -4], [7, 3, -1, -3],
    [7, 3, 1, 3], [8, 4, 2, 2], [13, 9, 3, 3], [17, 13, 3, 5],
    [16, 12, 2, 6], [11, 7, 1, 5], [7, 3, -1, 3], [8, 4, -2, 2],
    [13, 9, -3, 3], [17, 13, -3, 5], [16, 12, -2, 6], [11, 7, -1, 5],
    [7, 3, 2, 0], [8, 4, 2, 2], [13, 9, 3, 3], [17, 13, 4, 2],
    [16, 12, 4, 0], [11, 7, 3, -1], [7, 3, 1, -3], [8, 4, 0, -4],
    [13, 9, 0, -6], [17, 13, 1, -7], [16, 12, 2, -6], [11, 7, 2, -4],
    [7, 3, -2, 0], [8, 4, -2, 2], [13, 9, -3, 3], [17, 13, -4, 2],
    [16, 12, -4, 0], [11, 7, -3, -1], [7, 3, -1, -3], [8, 4, 0, -4],
    [13, 9, 0, -6], [17, 13, -1, -7], [16, 12, -2, -6], [11, 7, -2, -4],
    [11, 7, 1, 5], [13, 9, 0, 6], [20, 16, 0, 8], [25, 21, 1, 9],
    [23, 19, 2, 8], [16, 12, 2, 6], [11, 7, -1, 5], [13, 9, 0, 6],
    [20, 16, 0, 8], [25, 21, -1, 9], [23, 19, -2, 8], [16, 12, -2, 6],
    [11, 7, 3, -1], [13, 9, 3, -3], [20, 16, 4, -4], [25, 21, 5, -3],
    [23, 19, 5, -1], [16, 12, 4, 0], [11, 7, 2, -4], [13, 9, 3, -3],
    [20, 16, 4, -4], [25, 21, 4, -6], [23, 19, 3, -7], [16, 12, 2, -6],
    [11, 7, -3, -1], [13, 9, -3, -3], [20, 16, -4, -4], [25, 21, -5, -3],
    [23, 19, -5, -1], [16, 12, -4, 0], [11, 7, -2, -4],
    [13, 9, -3, -3], [20, 16, -4, -4], [25, 21, -4, -6],
    [23, 19, -3, -7], [16, 12, -2, -6], [13, 9, 3, 3],
    [17, 13, 3, 5], [25, 21, 4, 6], [29, 25, 5, 5],
    [25, 21, 5, 3], [17, 13, 4, 2], [16, 12, 2, 6],
    [17, 13, 3, 5], [25, 21, 4, 6], [32, 28, 4, 8],
    [31, 27, 3, 9], [23, 19, 2, 8], [13, 9, -3, 3],
    [17, 13, -3, 5], [25, 21, -4, 6], [29, 25, -5, 5],
    [25, 21, -5, 3], [17, 13, -4, 2], [16, 12, -2, 6],
    [17, 13, -3, 5], [25, 21, -4, 6], [32, 28, -4, 8],
    [31, 27, -3, 9], [23, 19, -2, 8], [13, 9, 0, -6],
    [17, 13, 1, -7], [25, 21, 1, -9], [29, 25, 0, -10],
    [25, 21, -1, -9], [17, 13, -1, -7], [16, 12, 4, 0],
    [17, 13, 4, 2], [25, 21, 5, 3], [32, 28, 6, 2],
    [31, 27, 6, 0], [23, 19, 5, -1], [16, 12, 2, -6],
    [17, 13, 1, -7], [25, 21, 1, -9], [32, 28, 2, -10],
    [31, 27, 3, -9], [23, 19, 3, -7], [16, 12, -4, 0],
    [17, 13, -4, 2], [25, 21, -5, 3], [32, 28, -6, 2],
    [31, 27, -6, 0], [23, 19, -5, -1], [16, 12, -2, -6],
    [17, 13, -1, -7], [25, 21, -1, -9], [32, 28, -2, -10],
    [31, 27, -3, -9], [23, 19, -3, -7], [20, 16, 0, 8],
    [25, 21, 1, 9], [35, 31, 1, 11], [40, 36, 0, 12],
    [35, 31, -1, 11], [25, 21, -1, 9], [23, 19, 2, 8],
    [25, 21, 1, 9], [35, 31, 1, 11], [43, 39, 2, 12],
    [41, 37, 3, 11], [31, 27, 3, 9], [23, 19, -2, 8],
    [25, 21, -1, 9], [35, 31, -1, 11], [43, 39, -2, 12],
    [41, 37, -3, 11], [31, 27, -3, 9], [20, 16, 4, -4],
    [25, 21, 5, -3], [35, 31, 6, -4], [40, 36, 6, -6],
    [35, 31, 5, -7], [25, 21, 4, -6], [20, 16, -4, -4],
    [25, 21, -5, -3], [35, 31, -6, -4], [40, 36, -6, -6],
    [35, 31, -5, -7], [25, 21, -4, -6], [23, 19, 5, -1],
    [25, 21, 5, -3], [35, 31, 6, -4], [43, 39, 7, -3],
    [41, 37, 7, -1], [31, 27, 6, 0], [23, 19, 3, -7],
    [25, 21, 4, -6], [35, 31, 5, -7], [43, 39, 5, -9], [41, 37, 4, -10],
    [31, 27, 3, -9], [23, 19, -5, -1], [25, 21, -5, -3],
    [35, 31, -6, -4], [43, 39, -7, -3], [41, 37, -7, -1],
    [31, 27, -6, 0], [23, 19, -3, -7], [25, 21, -4, -6],
    [35, 31, -5, -7], [43, 39, -5, -9], [41, 37, -4, -10],
    [31, 27, -3, -9], [25, 21, 4, 6], [29, 25, 5, 5],
    [40, 36, 6, 6], [47, 43, 6, 8], [43, 39, 5, 9],
    [32, 28, 4, 8], [25, 21, -4, 6], [29, 25, -5, 5],
    [40, 36, -6, 6], [47, 43, -6, 8], [43, 39, -5, 9],
    [32, 28, -4, 8], [25, 21, 5, 3], [29, 25, 5, 5],
    [40, 36, 6, 6], [47, 43, 7, 5], [43, 39, 7, 3],
    [32, 28, 6, 2], [31, 27, 3, 9], [32, 28, 4, 8],
    [43, 39, 5, 9], [53, 49, 5, 11], [52, 48, 4, 12],
    [41, 37, 3, 11], [25, 21, -5, 3], [29, 25, -5, 5],
    [40, 36, -6, 6], [47, 43, -7, 5], [43, 39, -7, 3],
    [32, 28, -6, 2], [31, 27, -3, 9], [32, 28, -4, 8],
    [43, 39, -5, 9], [53, 49, -5, 11], [52, 48, -4, 12],
    [41, 37, -3, 11], [25, 21, 1, -9], [29, 25, 0, -10],
    [40, 36, 0, -12], [47, 43, 1, -13], [43, 39, 2, -12],
    [32, 28, 2, -10], [25, 21, -1, -9], [29, 25, 0, -10],
    [40, 36, 0, -12], [47, 43, -1, -13], [43, 39, -2, -12],
    [32, 28, -2, -10], [31, 27, 6, 0], [32, 28, 6, 2],
    [43, 39, 7, 3], [53, 49, 8, 2], [52, 48, 8, 0],
    [41, 37, 7, -1], [31, 27, 3, -9], [32, 28, 2, -10],
    [43, 39, 2, -12], [53, 49, 3, -13], [52, 48, 4, -12],
    [41, 37, 4, -10], [31, 27, -6, 0], [32, 28, -6, 2],
    [43, 39, -7, 3], [53, 49, -8, 2], [52, 48, -8, 0],
    [41, 37, -7, -1], [31, 27, -3, -9], [32, 28, -2, -10],
    [43, 39, -2, -12], [53, 49, -3, -13], [52, 48, -4, -12],
    [41, 37, -4, -10], [35, 31, 1, 11], [40, 36, 0, 12],
    [53, 49, 0, 14], [61, 57, 1, 15], [56, 52, 2, 14],
    [43, 39, 2, 12], [35, 31, -1, 11], [40, 36, 0, 12],
    [53, 49, 0, 14], [61, 57, -1, 15], [56, 52, -2, 14],
    [43, 39, -2, 12], [41, 37, 3, 11], [43, 39, 2, 12], [56, 52, 2, 14],
    [67, 63, 3, 15], [65, 61, 4, 14], [52, 48, 4, 12],
    [41, 37, -3, 11], [43, 39, -2, 12], [56, 52, -2, 14],
    [67, 63, -3, 15], [65, 61, -4, 14], [52, 48, -4, 12],
    [35, 31, 6, -4], [40, 36, 6, -6], [53, 49, 7, -7],
    [61, 57, 8, -6], [56, 52, 8, -4], [43, 39, 7, -3],
    [35, 31, 5, -7], [40, 36, 6, -6], [53, 49, 7, -7],
    [61, 57, 7, -9], [56, 52, 6, -10], [43, 39, 5, -9],
    [35, 31, -6, -4], [40, 36, -6, -6], [53, 49, -7, -7],
    [61, 57, -8, -6], [56, 52, -8, -4], [43, 39, -7, -3],
    [35, 31, -5, -7], [40, 36, -6, -6], [53, 49, -7, -7],
    [61, 57, -7, -9], [56, 52, -6, -10], [43, 39, -5, -9],
    [41, 37, 7, -1], [43, 39, 7, -3], [56, 52, 8, -4],
    [67, 63, 9, -3], [65, 61, 9, -1], [52, 48, 8, 0],
    [41, 37, 4, -10], [43, 39, 5, -9], [56, 52, 6, -10],
    [67, 63, 6, -12], [65, 61, 5, -13], [52, 48, 4, -12],
    [41, 37, -7, -1], [43, 39, -7, -3], [56, 52, -8, -4],
    [67, 63, -9, -3], [65, 61, -9, -1], [52, 48, -8, 0],
    [41, 37, -4, -10], [43, 39, -5, -9], [56, 52, -6, -10],
    [67, 63, -6, -12], [65, 61, -5, -13], [52, 48, -4, -12],
    [40, 36, 6, 6], [47, 43, 6, 8], [61, 57, 7, 9],
    [68, 64, 8, 8], [61, 57, 8, 6], [47, 43, 7, 5],
    [43, 39, 5, 9], [47, 43, 6, 8], [61, 57, 7, 9],
    [71, 67, 7, 11], [67, 63, 6, 12], [53, 49, 5, 11],
    [40, 36, -6, 6], [47, 43, -6, 8], [61, 57, -7, 9],
    [68, 64, -8, 8], [61, 57, -8, 6], [47, 43, -7, 5],
    [43, 39, -5, 9], [47, 43, -6, 8], [61, 57, -7, 9],
    [71, 67, -7, 11], [67, 63, -6, 12], [53, 49, -5, 11],
    [43, 39, 7, 3], [47, 43, 7, 5], [61, 57, 8, 6],
    [71, 67, 9, 5], [67, 63, 9, 3], [53, 49, 8, 2],
    [52, 48, 4, 12], [53, 49, 5, 11], [67, 63, 6, 12],
    [80, 76, 6, 14], [79, 75, 5, 15], [65, 61, 4, 14],
    [43, 39, -7, 3], [47, 43, -7, 5], [61, 57, -8, 6],
    [71, 67, -9, 5], [67, 63, -9, 3], [53, 49, -8, 2], [52, 48, -4, 12],
    [53, 49, -5, 11], [67, 63, -6, 12], [80, 76, -6, 14],
    [79, 75, -5, 15], [65, 61, -4, 14], [40, 36, 0, -12],
    [47, 43, 1, -13], [61, 57, 1, -15], [68, 64, 0, -16],
    [61, 57, -1, -15], [47, 43, -1, -13], [43, 39, 2, -12],
    [47, 43, 1, -13], [61, 57, 1, -15], [71, 67, 2, -16],
    [67, 63, 3, -15], [53, 49, 3, -13], [43, 39, -2, -12],
    [47, 43, -1, -13], [61, 57, -1, -15], [71, 67, -2, -16],
    [67, 63, -3, -15], [53, 49, -3, -13], [52, 48, 8, 0],
    [53, 49, 8, 2], [67, 63, 9, 3], [80, 76, 10, 2],
    [79, 75, 10, 0], [65, 61, 9, -1], [52, 48, 4, -12],
    [53, 49, 3, -13], [67, 63, 3, -15], [80, 76, 4, -16],
    [79, 75, 5, -15], [65, 61, 5, -13], [52, 48, -8, 0],
    [53, 49, -8, 2], [67, 63, -9, 3], [80, 76, -10, 2],
    [79, 75, -10, 0], [65, 61, -9, -1], [52, 48, -4, -12],
    [53, 49, -3, -13], [67, 63, -3, -15], [80, 76, -4, -16],
    [79, 75, -5, -15], [65, 61, -5, -13], [53, 49, 0, 14],
    [61, 57, 1, 15], [77, 73, 1, 17], [85, 81, 0, 18],
    [77, 73, -1, 17], [61, 57, -1, 15], [56, 52, 2, 14],
    [61, 57, 1, 15], [77, 73, 1, 17], [88, 84, 2, 18],
    [83, 79, 3, 17], [67, 63, 3, 15], [56, 52, -2, 14],
    [61, 57, -1, 15], [77, 73, -1, 17], [88, 84, -2, 18],
    [83, 79, -3, 17], [67, 63, -3, 15], [65, 61, 4, 14],
    [67, 63, 3, 15], [83, 79, 3, 17], [97, 93, 4, 18],
    [95, 91, 5, 17], [79, 75, 5, 15], [65, 61, -4, 14],
    [67, 63, -3, 15], [83, 79, -3, 17], [97, 93, -4, 18],
    [95, 91, -5, 17], [79, 75, -5, 15], [53, 49, 7, -7],
    [61, 57, 8, -6], [77, 73, 9, -7], [85, 81, 9, -9],
    [77, 73, 8, -10], [61, 57, 7, -9], [53, 49, -7, -7],
    [61, 57, -8, -6], [77, 73, -9, -7], [85, 81, -9, -9],
    [77, 73, -8, -10], [61, 57, -7, -9], [56, 52, 8, -4],
    [61, 57, 8, -6], [77, 73, 9, -7], [88, 84, 10, -6],
    [83, 79, 10, -4], [67, 63, 9, -3], [56, 52, 6, -10],
    [61, 57, 7, -9], [77, 73, 8, -10], [88, 84, 8, -12], [83, 79, 7, -13],
    [67, 63, 6, -12], [56, 52, -8, -4], [61, 57, -8, -6],
    [77, 73, -9, -7], [88, 84, -10, -6], [83, 79, -10, -4],
    [67, 63, -9, -3], [56, 52, -6, -10], [61, 57, -7, -9],
    [77, 73, -8, -10], [88, 84, -8, -12], [83, 79, -7, -13],
    [67, 63, -6, -12], [65, 61, 9, -1], [67, 63, 9, -3],
    [83, 79, 10, -4], [97, 93, 11, -3], [95, 91, 11, -1],
    [79, 75, 10, 0], [65, 61, 5, -13], [67, 63, 6, -12],
    [83, 79, 7, -13], [97, 93, 7, -15], [95, 91, 6, -16],
    [79, 75, 5, -15], [65, 61, -9, -1], [67, 63, -9, -3],
    [83, 79, -10, -4], [97, 93, -11, -3], [95, 91, -11, -1],
    [79, 75, -10, 0], [65, 61, -5, -13], [67, 63, -6, -12],
    [83, 79, -7, -13], [97, 93, -7, -15], [95, 91, -6, -16],
    [79, 75, -5, -15], [61, 57, 7, 9], [68, 64, 8, 8],
    [85, 81, 9, 9], [95, 91, 9, 11], [88, 84, 8, 12],
    [71, 67, 7, 11], [61, 57, -7, 9], [68, 64, -8, 8],
    [85, 81, -9, 9], [95, 91, -9, 11], [88, 84, -8, 12],
    [71, 67, -7, 11], [61, 57, 8, 6], [68, 64, 8, 8],
    [85, 81, 9, 9], [95, 91, 10, 8], [88, 84, 10, 6],
    [71, 67, 9, 5], [67, 63, 6, 12], [71, 67, 7, 11],
    [88, 84, 8, 12], [101, 97, 8, 14], [97, 93, 7, 15],
    [80, 76, 6, 14], [61, 57, -8, 6], [68, 64, -8, 8],
    [85, 81, -9, 9], [95, 91, -10, 8], [88, 84, -10, 6],
    [71, 67, -9, 5], [67, 63, -6, 12], [71, 67, -7, 11],
    [88, 84, -8, 12], [101, 97, -8, 14], [97, 93, -7, 15],
    [80, 76, -6, 14], [67, 63, 9, 3], [71, 67, 9, 5],
    [88, 84, 10, 6], [101, 97, 11, 5], [97, 93, 11, 3],
    [80, 76, 10, 2], [79, 75, 5, 15], [80, 76, 6, 14],
    [97, 93, 7, 15], [113, 109, 7, 17], [112, 108, 6, 18],
    [95, 91, 5, 17], [67, 63, -9, 3], [71, 67, -9, 5],
    [88, 84, -10, 6], [101, 97, -11, 5], [97, 93, -11, 3],
    [80, 76, -10, 2], [79, 75, -5, 15], [80, 76, -6, 14],
    [97, 93, -7, 15], [113, 109, -7, 17], [112, 108, -6, 18],
    [95, 91, -5, 17], [61, 57, 1, -15], [68, 64, 0, -16], [85, 81, 0, -18],
    [95, 91, 1, -19], [88, 84, 2, -18], [71, 67, 2, -16],
    [61, 57, -1, -15], [68, 64, 0, -16], [85, 81, 0, -18],
    [95, 91, -1, -19], [88, 84, -2, -18], [71, 67, -2, -16],
    [67, 63, 3, -15], [71, 67, 2, -16], [88, 84, 2, -18],
    [101, 97, 3, -19], [97, 93, 4, -18], [80, 76, 4, -16],
    [67, 63, -3, -15], [71, 67, -2, -16], [88, 84, -2, -18],
    [101, 97, -3, -19], [97, 93, -4, -18], [80, 76, -4, -16],
    [79, 75, 10, 0], [80, 76, 10, 2], [97, 93, 11, 3],
    [113, 109, 12, 2], [112, 108, 12, 0], [95, 91, 11, -1],
    [79, 75, 5, -15], [80, 76, 4, -16], [97, 93, 4, -18],
    [113, 109, 5, -19], [112, 108, 6, -18], [95, 91, 6, -16],
    [79, 75, -10, 0], [80, 76, -10, 2], [97, 93, -11, 3],
    [113, 109, -12, 2], [112, 108, -12, 0], [95, 91, -11, -1],
    [79, 75, -5, -15], [80, 76, -4, -16], [97, 93, -4, -18],
    [113, 109, -5, -19], [112, 108, -6, -18], [95, 91, -6, -16]

];

const faces = [
    [0, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23],
    [24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41],
    [42, 43, 44, 45, 46, 47],
    [48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59],
    [60, 61, 62, 63, 64, 65],
    [66, 67, 68, 69, 70, 71],
    [72, 73, 74, 75, 76, 77],
    [78, 79, 80, 81, 82, 83],
    [84, 85, 86, 87, 88, 89],
    [90, 91, 92, 93, 94, 95],
    [96, 97, 98, 99, 100, 101],
    [102, 103, 104, 105, 106, 107],
    [108, 109, 110, 111, 112, 113],
    [114, 115, 116, 117, 118, 119],
    [120, 121, 122, 123, 124, 125],
    [126, 127, 128, 129, 130, 131],
    [132, 133, 134, 135, 136, 137],
    [138, 139, 140, 141, 142, 143],
    [144, 145, 146, 147, 148, 149],
    [150, 151, 152, 153, 154, 155],
    [156, 157, 158, 159, 160, 161],
    [162, 163, 164, 165, 166, 167],
    [168, 169, 170, 171, 172, 173],
    [174, 175, 176, 177, 178, 179],
    [180, 181, 182, 183, 184, 185],
    [186, 187, 188, 189, 190, 191],
    [192, 193, 194, 195, 196, 197],
    [198, 199, 200, 201, 202, 203],
    [204, 205, 206, 207, 208, 209],
    [210, 211, 212, 213, 214, 215],
    [216, 217, 218, 219, 220, 221],
    [222, 223, 224, 225, 226, 227],
    [228, 229, 230, 231, 232, 233],
    [234, 235, 236, 237, 238, 239],
    [240, 241, 242, 243, 244, 245],
    [246, 247, 248, 249, 250, 251],
    [252, 253, 254, 255, 256, 257],
    [258, 259, 260, 261, 262, 263],
    [264, 265, 266, 267, 268, 269],
    [270, 271, 272, 273, 274, 275],
    [276, 277, 278, 279, 280, 281],
    [282, 283, 284, 285, 286, 287],
    [288, 289, 290, 291, 292, 293],
    [294, 295, 296, 297, 298, 299],
    [300, 301, 302, 303, 304, 305],
    [306, 307, 308, 309, 310, 311],
    [312, 313, 314, 315, 316, 317],
    [318, 319, 320, 321, 322, 323],
    [324, 325, 326, 327, 328, 329],
    [330, 331, 332, 333, 334, 335],
    [336, 337, 338, 339, 340, 341],
    [342, 343, 344, 345, 346, 347],
    [348, 349, 350, 351, 352, 353],
    [354, 355, 356, 357, 358, 359],
    [360, 361, 362, 363, 364, 365],
    [366, 367, 368, 369, 370, 371],
    [372, 373, 374, 375, 376, 377],
    [378, 379, 380, 381, 382, 383],
    [384, 385, 386, 387, 388, 389],
    [390, 391, 392, 393, 394, 395],
    [396, 397, 398, 399, 400, 401],
    [402, 403, 404, 405, 406, 407],
    [408, 409, 410, 411, 412, 413],
    [414, 415, 416, 417, 418, 419],
    [420, 421, 422, 423, 424, 425],
    [426, 427, 428, 429, 430, 431],
    [432, 433, 434, 435, 436, 437],
    [438, 439, 440, 441, 442, 443],
    [444, 445, 446, 447, 448, 449],
    [450, 451, 452, 453, 454, 455],
    [456, 457, 458, 459, 460, 461],
    [462, 463, 464, 465, 466, 467],
    [468, 469, 470, 471, 472, 473],
    [474, 475, 476, 477, 478, 479],
    [480, 481, 482, 483, 484, 485],
    [486, 487, 488, 489, 490, 491],
    [492, 493, 494, 495, 496, 497],
    [498, 499, 500, 501, 502, 503],
    [504, 505, 506, 507, 508, 509],
    [510, 511, 512, 513, 514, 515],
    [516, 517, 518, 519, 520, 521],
    [522, 523, 524, 525, 526, 527],
    [528, 529, 530, 531, 532, 533],
    [534, 535, 536, 537, 538, 539],
    [540, 541, 542, 543, 544, 545],
    [546, 547, 548, 549, 550, 551],
    [552, 553, 554, 555, 556, 557],
    [558, 559, 560, 561, 562, 563],
    [564, 565, 566, 567, 568, 569],
    [570, 571, 572, 573, 574, 575],
    [576, 577, 578, 579, 580, 581],
    [582, 583, 584, 585, 586, 587],
    [588, 589, 590, 591, 592, 593],
    [594, 595, 596, 597, 598, 599],
    [600, 601, 602, 603, 604, 605],
    [606, 607, 608, 609, 610, 611],
    [612, 613, 614, 615, 616, 617],
    [618, 619, 620, 621, 622, 623],
    [624, 625, 626, 627, 628, 629],
    [630, 631, 632, 633, 634, 635],
    [636, 637, 638, 639, 640, 641],
    [642, 643, 644, 645, 646, 647]
];

//*******************************************
// CHANGE THESE
//*******************************************

//cfv
// const a = [
//     [1, 0, 0, 0],
//     [0, 0, 1, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1]
// ];

function a(v) {
    return [v[0], v[2], v[1], v[3]];
}

//cev
// const b = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, 1],
//     [0, 0, 1, 0]
// ];

function b(v) {
    return [v[0], v[1], v[3], v[2]];
}

//cfe
// const c = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 0, -1],
//     [0, 0, -1, 0]
// ];

function c(v) {
    return [v[0], v[1], -v[3], -v[2]];
}

//fev
// const d = [
//     [5, -1, -1, 1],
//     [3, 1, -3, 3],
//     [3, -3, 1, 3],
//     [-3, 3, 3, 1]
// ];

function d(v) {
    return [
        (5 * v[0] - 3 * v[1] - 3 * v[2] + 3 * v[3]) / 4,
        (v[0] + v[1] - 3 * v[2] + 3 * v[3]) / 4,
        (v[0] - 3 * v[1] + v[2] + 3 * v[3]) / 4,
        (-v[0] + 3 * v[1] + 3 * v[2] + v[3]) / 4
    ];
}

// const e = [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];


function e(v) {
    return [v[0], v[1], v[2], v[3]];
}

// const f = [
//     [Math.sqrt(3), 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
// ];

function f(n, v) {

    var newVector = [];

    switch (n) {

        case 3:

            newVector = [v[0] / 4, v[1] / 4, Math.sqrt(3 / 8) * v[2], Math.sqrt(1 / 8) * v[3]];
            break;

        case 4:

            newVector = [v[0] - 3, v[1], Math.sqrt(3 / 2) * v[2], Math.sqrt(1 / 2) * v[3]];
            break;

        case 5:

            newVector = [(p ** 4) * v[0] / 2 + 1 - 2 * (p ** 4), (p ** 4) * v[1] / 2, Math.sqrt(3) * (p ** 2) * v[2] / 2, (p ** 2) * v[3] / 2];
            break;

        default:

            var newVector = [0, 0, 0, 0];

    }

    return newVector;

}

function matrixDict(order, letter, vector) {
    var newVector;
    switch (letter) {
        case 'a':
            newVector = a(vector);
            break;
        case 'b':
            newVector = b(vector);
            break;
        case 'c':
            newVector = c(vector);
            break;
        case 'd':
            newVector = d(vector);
            break;
        case 'e':
            newVector = e(vector);
            break;
        case 'f':
            newVector = f(order, vector);
            break;
    }
    return newVector;
};


const faceReflections = [
    '', 'a', 'ba', 'dba', 'bdba', 'abdba', 'dbdba', 'dabdba', 'bdbdba', 'abdbdba', 'badbdba', 'abadbdba', 'dbadbdba', 'dabadbdba',
    'bdbadbdba', 'abdbadbdba', 'badbadbdba', 'abadbadbdba', 'dbdbadbdba', 'dabdbadbdba', 'dbadbadbdba', 'dabadbadbdba', 'badbdbadbdba',
    'bdbadbadbdba', 'abdbadbadbdba', 'badbadbadbdba', 'abadbadbadbdba', 'dbadbdbadbdba', 'dbadbadbadbdba', 'dabadbadbadbdba', 'bdbadbdbadbdba',
    'abdbadbdbadbdba', 'bdbadbadbadbdba', 'abdbadbadbadbdba', 'badbadbadbadbdba', 'abadbadbadbadbdba', 'dbdbadbdbadbdba', 'dabdbadbdbadbdba',
    'dbdbadbadbadbdba', 'dabdbadbadbadbdba', 'dbadbadbadbadbdba', 'dabadbadbadbadbdba', 'badbdbadbdbadbdba', 'abadbdbadbdbadbdba', 'bdbadbadbadbadbdba',
    'abdbadbadbadbadbdba', 'badbadbadbadbadbdba', 'abadbadbadbadbadbdba', 'dbadbdbadbdbadbdba', 'dabadbdbadbdbadbdba', 'dbadbadbadbadbadbdba',
    'dabadbadbadbadbadbdba', 'bdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdba', 'badbadbdbadbdbadbdba', 'abadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbdba',
    'abdbadbadbadbadbadbdba', 'badbadbadbadbadbadbdba', 'abadbadbadbadbadbadbdba', 'dbdbadbdbadbdbadbdba', 'dabdbadbdbadbdbadbdba', 'dbadbadbdbadbdbadbdba',
    'dabadbadbdbadbdbadbdba', 'dbdbadbadbadbadbadbdba', 'dabdbadbadbadbadbadbdba', 'dbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbdba', 'badbdbadbdbadbdbadbdba',
    'badbadbadbdbadbdbadbdba', 'abadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbdba', 'badbadbadbadbadbadbadbdba',
    'abadbadbadbadbadbadbadbdba', 'dbadbdbadbdbadbdbadbdba', 'dbadbadbadbdbadbdbadbdba', 'dabadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbdba',
    'dabadbadbadbadbadbadbadbdba', 'bdbadbdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdbadbdba', 'bdbadbadbadbdbadbdbadbdba', 'abdbadbadbadbdbadbdbadbdba',
    'badbadbadbadbdbadbdbadbdba', 'abadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbdba', 'badbadbadbadbadbadbadbadbdba',
    'abadbadbadbadbadbadbadbadbdba', 'dbdbadbdbadbdbadbdbadbdba', 'dabdbadbdbadbdbadbdbadbdba', 'dbdbadbadbadbdbadbdbadbdba', 'dabdbadbadbadbdbadbdbadbdba',
    'dbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbdbadbdbadbdba', 'dbdbadbadbadbadbadbadbadbdba', 'dabdbadbadbadbadbadbadbadbdba',
    'dbadbadbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbadbadbdba', 'badbdbadbdbadbdbadbdbadbdba', 'abadbdbadbdbadbdbadbdbadbdba',
    'badbadbadbadbadbdbadbdbadbdba', 'abadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbdba', 'dbadbdbadbdbadbdbadbdbadbdba', 'dabadbdbadbdbadbdbadbdbadbdba',
    'dbadbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbadbadbadbdba',
    'bdbadbdbadbdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdbadbdbadbdba', 'badbadbdbadbdbadbdbadbdbadbdba', 'abadbadbdbadbdbadbdbadbdbadbdba',
    'bdbadbadbadbadbadbdbadbdbadbdba', 'abdbadbadbadbadbadbdbadbdbadbdba', 'badbadbadbadbadbadbdbadbdbadbdba', 'abadbadbadbadbadbadbdbadbdbadbdba',
    'bdbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbdba', 'badbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbdba',
    'dbdbadbdbadbdbadbdbadbdbadbdba', 'dabdbadbdbadbdbadbdbadbdbadbdba', 'dbadbadbdbadbdbadbdbadbdbadbdba', 'dabadbadbdbadbdbadbdbadbdbadbdba',
    'dbdbadbadbadbadbadbdbadbdbadbdba', 'dabdbadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbadbadbdbadbdbadbdba',
    'dbdbadbadbadbadbadbadbadbadbadbdba', 'dabdbadbadbadbadbadbadbadbadbadbdba', 'dbadbadbadbadbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbadbadbadbadbdba',
    'badbdbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbdbadbdbadbdbadbdbadbdba', 'abadbadbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbadbadbadbadbdbadbdbadbdba',
    'abadbadbadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbadbdba', 'dbadbdbadbdbadbdbadbdbadbdbadbdba',
    'dbadbadbadbdbadbdbadbdbadbdbadbdba', 'dabadbadbadbdbadbdbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbdbadbdbadbdba',
    'dabadbadbadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbadbadbadbadbdba', 'dabadbadbadbadbadbadbadbadbadbadbadbdba',
    'bdbadbdbadbdbadbdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdbadbdbadbdbadbdba', 'bdbadbadbadbdbadbdbadbdbadbdbadbdba',
    'abdbadbadbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbadbdbadbdbadbdbadbdbadbdba', 'abadbadbadbadbdbadbdbadbdbadbdbadbdba',
    'bdbadbadbadbadbadbadbadbdbadbdbadbdba', 'abdbadbadbadbadbadbadbadbdbadbdbadbdba', 'badbadbadbadbadbadbadbadbdbadbdbadbdba',
    'abadbadbadbadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbadbadbdba', 'dbdbadbdbadbdbadbdbadbdbadbdbadbdba',
    'dabdbadbdbadbdbadbdbadbdbadbdbadbdba', 'dbdbadbadbadbdbadbdbadbdbadbdbadbdba', 'dabdbadbadbadbdbadbdbadbdbadbdbadbdba',
    'dbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'dabadbadbadbadbdbadbdbadbdbadbdbadbdba', 'dbdbadbadbadbadbadbadbadbdbadbdbadbdba',
    'dabdbadbadbadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbadbadbadbadbdbadbdbadbdba',
    'dbdbadbadbadbadbadbadbadbadbadbadbadbdba', 'dabdbadbadbadbadbadbadbadbadbadbadbadbdba', 'dbadbadbadbadbadbadbadbadbadbadbadbadbdba',
    'dabadbadbadbadbadbadbadbadbadbadbadbadbdba', 'badbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'abadbdbadbdbadbdbadbdbadbdbadbdbadbdba',
    'badbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'abadbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbadbadbadbadbadbadbdbadbdbadbdba',
    'abadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'dbadbdbadbdbadbdbadbdbadbdbadbdbadbdba',
    'dabadbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'dbadbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'dabadbadbadbadbadbdbadbdbadbdbadbdbadbdba',
    'dbadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'dabadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'dbadbadbadbadbadbadbadbadbadbadbadbadbadbdba',
    'dabadbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'bdbadbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'abdbadbdbadbdbadbdbadbdbadbdbadbdbadbdba',
    'badbadbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'abadbadbdbadbdbadbdbadbdbadbdbadbdbadbdba', 'bdbadbadbadbadbadbdbadbdbadbdbadbdbadbdba',
    'abdbadbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'badbadbadbadbadbadbdbadbdbadbdbadbdbadbdba', 'abadbadbadbadbadbadbdbadbdbadbdbadbdbadbdba',
    'bdbadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'abdbadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'badbadbadbadbadbadbadbadbadbadbdbadbdbadbdba',
    'abadbadbadbadbadbadbadbadbadbadbdbadbdbadbdba', 'bdbadbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'abdbadbadbadbadbadbadbadbadbadbadbadbadbadbdba',
    'badbadbadbadbadbadbadbadbadbadbadbadbadbadbdba', 'abadbadbadbadbadbadbadbadbadbadbadbadbadbadbdba'];



const center = [1, 1, 0, 0];

export { vertices, faces, a, b, c, d, e, f, matrixDict, faceReflections, center };
