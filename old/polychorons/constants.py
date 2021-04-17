import numpy as np

p = (1.0 + np.sqrt(5.0)) / 2.0

polychorons = ["8", "16", "24", "24'", "120", "600"]

groups = {
    "C1": [
        [1, 2, 3, 4]
    ],
    "C4": [
        [1, 2, 3, 4],
        [2, 3, 4, 1],
        [3, 4, 1, 2],
        [4, 1, 2, 3]
    ],
    "A3": [
        [1, 2, 3, 4],
        [1, 3, 2, 4],
        [3, 1, 2, 4],
        [1, 3, 4, 2],
        [3, 1, 4, 2],
        [3, 4, 1, 2]
    ],
    "A4": [
        [1, 2, 3, 4],
        [1, 3, 4, 2],
        [1, 4, 2, 3],
        [2, 1, 4, 3],
        [2, 3, 1, 4],
        [2, 4, 3, 1],
        [3, 1, 2, 4],
        [3, 2, 4, 1],
        [3, 4, 1, 2],
        [4, 1, 3, 2],
        [4, 2, 1, 3],
        [4, 3, 2, 1]
    ]
}

negatives = {
    0: [
        ["", "", "", ""],
        ["", "", "", "-"],
        ["", "", "-", ""],
        ["", "", "-", "-"],
        ["", "-", "", ""],
        ["", "-", "", "-"],
        ["", "-", "-", ""],
        ["", "-", "-", "-"],
        ["-", "", "", ""],
        ["-", "", "", "-"],
        ["-", "", "-", ""],
        ["-", "", "-", "-"],
        ["-", "-", "", ""],
        ["-", "-", "", "-"],
        ["-", "-", "-", ""],
        ["-", "-", "-", "-"]
    ],
    1: [
        ["", "", "", ""],
        ["", "", "", "-"],
        ["", "", "-", ""],
        ["", "", "-", "-"],
        ["", "-", "", ""],
        ["", "-", "", "-"],
        ["", "-", "-", ""],
        ["", "-", "-", "-"]
    ],
    2: [
        ["", "", "", ""],
        ["", "", "", "-"],
        ["", "", "-", ""],
        ["", "", "-", "-"]
    ],
    3: [
        ["", "", "", ""],
        ["", "", "", "-"]
    ]
}

initial_data = {
    "5": [],
    "5'": [],
    "8": [
        [["1", "1", "1", "1"], "C1", 0]
    ],
    "16": [
        [["0", "0", "0", "1"], "C4", 3]
    ],
    "24": [
        [["0", "0", "1", "1"], "A3", 2]
    ],
    "24'": [
        [["0", "0", "0", "1"], "C4", 3],
        [["1 / 2", "1 / 2", "1 / 2", "1 / 2"],  "C1", 0]
    ],
    "120": [
        [["0", "0", "2", "2"], "A3", 2],
        [["1", "1", "1", "r"], "C4", 0],
        [["p", "p", "p", "1 / p ** 2"], "C4", 0],
        [["1 / p", "1 / p", "1 / p", "p ** 2"], "C4", 0],
        [["0", "1 / p ** 2", "1", "p ** 2"], "A4", 1],
        [["0", "1 / p", "p", "r"], "A4", 1],
        [["1 / p", "1", "p", "2"], "A4", 0],
    ],
    "600": [
        [["1 / 2", "1 / 2", "1 / 2", "1 / 2"], "C1", 0],
        [["0", "0", "0", "1"], "C4", 3],
        [["0", "1 / (2 * p)", "p / 2", "1 / 2"], "A4", 1]
    ]
}

duals = {
    "5": "5'",
    "5'": "5",
    "8": "16",
    "16": "8",
    "24": "24'",
    "24'": "24",
    "120": "600",
    "600": "120"
}

quantities = {
    "5": {
        "v": 5,
        "e": 10,
        "f": 10,
        "c": 5
    },
    "5'": {
        "v": 5,
        "e": 10,
        "f": 10,
        "c": 5
    },
    "8": {
        "v": 16,
        "e": 32,
        "f": 24,
        "c": 8
    },
    "16": {
        "v": 8,
        "e": 24,
        "f": 32,
        "c": 16
    },
    "24": {
        "v": 24,
        "e": 96,
        "f": 96,
        "c": 24
    },
    "24'": {
        "v": 24,
        "e": 96,
        "f": 96,
        "c": 24
    },
    "120": {
        "v": 600,
        "e": 1200,
        "f": 720,
        "c": 120
    },
    "600": {
        "v": 120,
        "e": 720,
        "f": 1200,
        "c": 600
    }
}

dictionaries = [
    "v", "ve", "vf", "vc",
    "ev", "e", "ef", "ec",
    "fv", "fe", "f", "fc",
    "cv", "ce", "cf", "c"
]

values = {
    "0": 0.0,
    "1": 1.0,
    "1 / 2": 0.5,
    "p": p,
    "1 / p": 1.0 / p,
    "1 / p ** 2": 1.0 / np.power(p, 2.0),
    "p ** 2": (p ** 2),
    "r": np.sqrt(5.0),
    "2": 2.0,
    "p / 2": p / 2.0,
    "1 / (2 * p)": 1.0 / (2.0 * p),
    "-1": -1.0,
    "-1 / 2": -0.5,
    "-p": -p,
    "-1 / p": -1.0 / p,
    "-1 / p ** 2": -1.0 / np.power(p, 2.0),
    "-p ** 2": -(p ** 2),
    "-r": -np.sqrt(5.0),
    "-2": -2.0,
    "-p / 2": -p / 2.0,
    "-1 / (2 * p)": -1.0 / (2.0 * p)
}

distances = {
    "5": {
        "R0": np.sqrt(8.0 / 5.0),
        "R1": np.sqrt(3.0 / 5.0),
        "R2": np.sqrt(4.0 / 15.0),
        "R3": np.sqrt(1.0 / 10.0),
        "CV": np.sqrt(3.0 / 2.0)
    },
    "5'": {
        "R0": np.sqrt(1.6),
        "R1": np.sqrt(0.6),
        "R2": np.sqrt(4.0 / 15.0),
        "R3": np.sqrt(0.1),
        "CV": np.sqrt(1.5)
    },
    "8": {
        "R0": 2.0,
        "R1": np.sqrt(3.0),
        "R2": np.sqrt(2.0),
        "R3": 1.0,
        "CV": np.sqrt(3.0)
    },
    "16": {
        "R0": np.sqrt(2.0),
        "R1": 1.0,
        "R2": np.sqrt(2.0 / 3.0),
        "R3": np.sqrt(0.5),
        "CV": np.sqrt(3.0 / 2.0)
    },
    "24": {
        "R0": 2.0,
        "R1": np.sqrt(3.0),
        "R2": np.sqrt(8.0 / 3.0),
        "R3": np.sqrt(2.0),
        "CV": np.sqrt(2.0)
    },
    "24'": {
        "R0": 2.0,
        "R1": np.sqrt(3.0),
        "R2": np.sqrt(8.0 / 3.0),
        "R3": np.sqrt(2.0),
        "CV": np.sqrt(2.0)
    },
    "120": {
        "R0": np.sqrt(8.0) * np.power(p, 2),
        "R1": np.sqrt(3.0) * np.power(p, 3),
        "R2": 2.0 * np.power(5.0, -0.25) * np.power(p, 3.5),
        "R3": np.power(p, 4),
        "CV": np.sqrt(3.0) * p
    },
    "600": {
        "R0": 2.0 * p,
        "R1": np.power(5.0, 0.25) * np.power(p, 1.5),
        "R2": 2.0 * np.power(3.0, -0.5) * (p ** 2),
        "R3": np.power(2.0, -0.5) * (p ** 3),
        "CV": np.sqrt(1.5)
    }
}

scale = {
    "5": 0,
    "5'": 0,
    "8": 2.0,
    "16": 1.0,
    "24": np.sqrt(2.0),
    "24'": 1.0,
    "120": np.sqrt(8.0),
    "600": 1.0
}
