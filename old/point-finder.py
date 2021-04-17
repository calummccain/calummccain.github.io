import numpy as np


def w_bit(max):
    x = []
    for i in range(4, max):
        x += [i ** 2 - 16]
    return x


def xy_bit(max):
    x = []
    for i in range(0, max):
        for j in range(0, max):
            x += [6 * i ** 2 + 3 * j ** 2]
    return x


# def xyz(max):
#     for x in range(0, max):
#         for y in range(-max, max):
#             for z in range(-max, max):
#                 a = x + y - z
#                 if a >= 0:
#                     if a * (a + 8) - 3 * (x ** 2 + y ** 2 + z ** 2) == 0:
#                         b = [a + 4, x, y, z]
#                         b.sort(reverse=True)
#                         print(b)

s  = np.sqrt(2.0/3.0)
v = np.asarray([[6.0 * s], [2.0 * s], [s], [s]])
w = np.asarray([[6.0 * s], [2.0 * s], [-s], [s]])
x = np.asarray([[6.0 * s], [2.0 * s], [0], [-2.0 * s]])

a = np.asarray([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0.5, 0.5],
    [0, 0, 1.5, -0.5]
])

b = np.asarray([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, -1, 0],
    [0, 0, 0, 1]
])

c = np.asarray([
    [1.25, -0.25, 0, -1],
    [0.25, 0.75, 0, -1],
    [0, 0, 1, 0],
    [0.5, -0.5, 0, -1]
])

d = (1.0 / 6.0) * np.asarray([
    [6.0, 0, 0, 0],
    [0, -2.0, 12.0, 4.0], 
    [0, 2.0, 3.0, -1.0],
    [0, 2.0, -3.0, 5.0]
])

e = np.asarray([
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
])

matrices = [a, b, a.dot(b), b.dot(a), a.dot(b.dot(a))]
mat_letters = ['a', 'b', 'ab', 'ba', 'aba']

def ring(r):

    rings = [[v, w, x]]
    centers = [v, w, x]
    names = [['', 'b', 'ab']]
    faces = ['', 'b', 'ab']
    i = 0

    while i < r:

        new_ring = []
        new_name = []

        # reflect previous layer in c
        for j in range(len(rings[i])):

            if not any((np.linalg.norm(c.dot(rings[i][j]) - xx) < 0.001) for xx in centers):

                centers.append(c.dot(rings[i][j]))
                new_ring.append(c.dot(rings[i][j]))
                faces.append('c' + names[i][j])
                new_name.append('c' + names[i][j])

        # rotate new_ring
        for j in range(len(new_ring)):

            for k in range(5):

                test_center = matrices[k].dot(new_ring[j])
                # print(test_center)

                if not any((np.linalg.norm(test_center - xx) < 0.001) for xx in centers):

                    centers.append(test_center)
                    new_ring.append(test_center)
                    new_name.append(mat_letters[k] + new_name[j])
                    faces.append(mat_letters[k] + new_name[j])

        rings.append(new_ring)
        names.append(new_name)

        i += 1

    return faces

print(ring(10), len(ring(10)))

for i in range(108):
    print(str([6*i, 6*i+1, 6*i+2, 6*i+3, 6*i+4, 6*i+5]) + ',')
