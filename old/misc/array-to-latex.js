function arrayToLatex(str) {
    var str1 = str.replace(/p/g, '\\phi');
    var str2 = str1.replace(/const/g, '');
    var str3 = str2.replace(/ /g, '');
    var str4 = str3.replace(/\]\,\[/g, '\\\\\n');
    var str5 = str4.replace(/,/g, ' & ');
    var str6 = str5.replace('[[', '\\begin{pmatrix}\n');
    var str7 = str6.replace(']]', '\n\\end{pmatrix}');
    var str8 = str7.replace(';', '');
    var str9 = str8.replace(/\*\*/g, '^');
    var str10 = str9.replace(/\(/g, '\\frac\{');
    var str11 = str10.replace(/\)\/2/g, '\}\{2\}');
    var str12 = str11.replace(/\)/g, '}');
    var str13 = str12.replace(/\*/g, '');
    var str14 = str13.replace(/Math\./g, '\\');

    console.log('\\\[\n' + str14 + '\n\\\]');
}


var arr = [

"const d = [\
    [5 / 4, -1 / 4, -1 / 4, 1 / 4],\
    [3 / 4, 1 / 4, -3 / 4, 3 / 4],\
    [3 / 4, -3 / 4, 1 / 4, 3 / 4],\
    [-3 / 4, 3 / 4, 3 / 4, 1 / 4]\
];"
]
arr.forEach(elem => arrayToLatex(elem));
