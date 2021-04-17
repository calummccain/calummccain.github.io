import constants
import json
import numpy as np


def initialise_dictionaries():

    # Dictionary containing all polychoron information
    big_daddy = {}

    for x in constants.polychorons:

        # Contains all the information for cell x
        subdict = {}

        for y in constants.dictionaries:

            #  Each subdictionary contains a dictionary for each of the relations
            subdict[y] = {}

            for i in range(constants.quantities[x][y[0]]):

                subdict[y][str(i)] = []

        big_daddy[x] = subdict

    print("Dictionaries made")

    return big_daddy


def populate_vertices(big_daddy):

    for x in constants.polychorons:

        i = 0
        while i < constants.quantities[x]["v"] - 1:

            for data in constants.initial_data[x]:

                for neg in constants.negatives[data[2]]:

                    for sym in constants.groups[data[1]]:

                        big_daddy[x]["v"][str(i)] = [
                            neg[sym[0] - 1] + data[0][sym[0] - 1],
                            neg[sym[1] - 1] + data[0][sym[1] - 1],
                            neg[sym[2] - 1] + data[0][sym[2] - 1],
                            neg[sym[3] - 1] + data[0][sym[3] - 1]
                        ]

                        i += 1

    print("Vertices Populated")


def populate_cells(big_daddy):

    for x in constants.polychorons:

        i = 0
        while i < constants.quantities[x]["c"] - 1:

            for data in constants.initial_data[constants.duals[x]]:

                for neg in constants.negatives[data[2]]:

                    for sym in constants.groups[data[1]]:

                        big_daddy[x]["c"][str(i)] = [
                            neg[sym[0] - 1] + data[0][sym[0] - 1],
                            neg[sym[1] - 1] + data[0][sym[1] - 1],
                            neg[sym[2] - 1] + data[0][sym[2] - 1],
                            neg[sym[3] - 1] + data[0][sym[3] - 1]
                        ]

                        i += 1

    print("Cells Populated")


def distance(p1, p2, d1, d2):

    d = np.linalg.norm(
        (np.asarray([
            constants.values[p1[0]],
            constants.values[p1[1]],
            constants.values[p1[2]],
            constants.values[p1[3]]
        ]) * d1) -
        (np.asarray([
            constants.values[p2[0]],
            constants.values[p2[1]],
            constants.values[p2[2]],
            constants.values[p2[3]]
        ]) * d2)
    )

    return d


def generate_lines_vertices(big_daddy):

    for x in constants.polychorons:

        k = 0

        l = constants.scale[x] / constants.distances[x]["R0"]

        for i in range(constants.quantities[x]["v"]):

            for j in range(i, constants.quantities[x]["v"]):

                if abs(distance(big_daddy[x]["v"][str(i)], big_daddy[x]["v"][str(j)], 1.0, 1.0) - 2 * l) < 0.01:

                    big_daddy[x]["ev"][str(k)] = [str(i), str(j)]

                    k += 1

        print(x, "lines", k)

    print("Lines made")


def generate_cell_vertices(big_daddy):

    for x in constants.polychorons:

        l = constants.scale[x] / constants.distances[x]["R0"]
        dual_scale = constants.distances[x]["R3"] * \
            l / constants.scale[constants.duals[x]]
        d = constants.distances[x]["CV"] * l

        for i in range(constants.quantities[x]["c"]):

            vertices = []

            for j in range(constants.quantities[x]["v"]):

                if abs(distance(big_daddy[x]["v"][str(j)], big_daddy[x]["c"][str(i)], 1.0, dual_scale) - d) < 0.01:

                    vertices.append(str(j))

            big_daddy[x]["cv"][str(i)] = vertices

    print("Cell Vertices found!")


def generateJSON():

    big_daddy = initialise_dictionaries()

    populate_vertices(big_daddy)

    populate_cells(big_daddy)

    generate_lines_vertices(big_daddy)

    generate_cell_vertices(big_daddy)

    # with open("/Users/calummccain/Documents/maths-website/root/js/data/polychorons/json-data/5-data.json", "w") as f:
    #     json.dump(big_daddy["5"], f)

    # with open("/Users/calummccain/Documents/maths-website/root/js/data/polychorons/json-data/5'-data.json", "w") as f:
    #     json.dump(big_daddy["5'"], f)

    with open("/Users/calummccain/Documents/maths-website/root/js/data/polychorons/json-data/8-data.json", "w") as f:
        json.dump(big_daddy["8"], f)

    print("8 done")

    with open("/Users/calummccain/Documents/maths-website/root/js/data/polychorons/json-data/16-data.json", "w") as f:
        json.dump(big_daddy["16"], f)

    print("16 done")

    with open("/Users/calummccain/Documents/maths-website/root/js/data/polychorons/json-data/24-data.json", "w") as f:
        json.dump(big_daddy["24"], f)

    print("24 done")

    with open("/Users/calummccain/Documents/maths-website/root/js/data/polychorons/json-data/24'-data.json", "w") as f:
        json.dump(big_daddy["24'"], f)

    print("24' done")

    with open("/Users/calummccain/Documents/maths-website/root/js/data/polychorons/json-data/120-data.json", "w") as f:
        json.dump(big_daddy["120"], f)

    print("120 done")

    with open("/Users/calummccain/Documents/maths-website/root/js/data/polychorons/json-data/600-data.json", "w") as f:
        json.dump(big_daddy["600"], f)

    print("600 done")


generateJSON()
