//aka {3,4,3}

//[0, 2, 10, 11, 12, 19]
//[1, 4, 6, 9, 13, 17]
//[3, 5, 16, 18, 20, 21]
//[7, 8, 14, 15, 22, 23]

const vertices = [
    'a', 'b', 'c', 'd',
    'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p',
    'q', 'r', 's', 't',
    'u', 'v', 'w', 'x'
];

const vertexDict = {
    'a': [1, 1, 0, 0],
    'b': [1, -1, 0, 0],
    'c': [-1, 1, 0, 0],
    'd': [-1, -1, 0, 0],
    'e': [1, 0, 1, 0],
    'f': [1, 0, -1, 0],
    'g': [-1, 0, 1, 0],
    'h': [-1, 0, -1, 0],
    'i': [1, 0, 0, 1],
    'j': [1, 0, 0, -1],
    'k': [-1, 0, 0, 1],
    'l': [-1, 0, 0, -1],
    'm': [0, 1, 1, 0],
    'n': [0, 1, -1, 0],
    'o': [0, -1, 1, 0],
    'p': [0, -1, -1, 0],
    'q': [0, 1, 0, 1],
    'r': [0, 1, 0, -1],
    's': [0, -1, 0, 1],
    't': [0, -1, 0, -1],
    'u': [0, 0, 1, 1],
    'v': [0, 0, 1, -1],
    'w': [0, 0, -1, 1],
    'x': [0, 0, -1, -1],
};

const lines = [
    'ae', 'af', 'ai', 'aj', 'am', 'an', 'aq', 'ar', 'be',
    'bf', 'bi', 'bj', 'bo', 'bp', 'bs', 'bt', 'cg', 'ch',
    'ck', 'cl', 'cm', 'cn', 'cq', 'cr', 'dg', 'dh', 'dk',
    'dl', 'do', 'dp', 'ds', 'dt', 'ei', 'ej', 'em', 'eo',
    'eu', 'ev', 'fi', 'fj', 'fn', 'fp', 'fw', 'fx', 'gk',
    'gl', 'gm', 'go', 'gu', 'gv', 'hk', 'hl', 'hn', 'hp',
    'hw', 'hx', 'iq', 'is', 'iu', 'iw', 'jr', 'jt', 'jv',
    'jx', 'kq', 'ks', 'ku', 'kw', 'lr', 'lt', 'lv', 'lx',
    'mq', 'mr', 'mu', 'mv', 'nq', 'nr', 'nw', 'nx', 'os',
    'ot', 'ou', 'ov', 'ps', 'pt', 'pw', 'px', 'qu', 'qw',
    'rv', 'rx', 'su', 'sw', 'tv', 'tx'
];

const lineDict = {
    'ae': [2, 1, 1, 0],
    'af': [2, 1, -1, 0],
    'ai': [2, 1, 0, 1],
    'aj': [2, 1, 0, -1],
    'am': [1, 2, 1, 0],
    'an': [1, 2, -1, 0],
    'aq': [1, 2, 0, 1],
    'ar': [1, 2, 0, -1],
    'be': [2, -1, 1, 0],
    'bf': [2, -1, -1, 0],
    'bi': [2, -1, 0, 1],
    'bj': [2, -1, 0, -1],
    'bo': [1, -2, 1, 0],
    'bp': [1, -2, -1, 0],
    'bs': [1, -2, 0, 1],
    'bt': [1, -2, 0, -1],
    'cg': [-2, 1, 1, 0],
    'ch': [-2, 1, -1, 0],
    'ck': [-2, 1, 0, 1],
    'cl': [-2, 1, 0, -1],
    'cm': [-1, 2, 1, 0],
    'cn': [-1, 2, -1, 0],
    'cq': [-1, 2, 0, 1],
    'cr': [-1, 2, 0, -1],
    'dg': [-2, -1, 1, 0],
    'dh': [-2, -1, -1, 0],
    'dk': [-2, -1, 0, 1],
    'dl': [-2, -1, 0, -1],
    'do': [-1, -2, 1, 0],
    'dp': [-1, -2, -1, 0],
    'ds': [-1, -2, 0, 1],
    'dt': [-1, -2, 0, -1],
    'ei': [2, 0, 1, 1],
    'ej': [2, 0, 1, -1],
    'em': [1, 1, 2, 0],
    'eo': [1, -1, 2, 0],
    'eu': [1, 0, 2, 1],
    'ev': [1, 0, 2, -1],
    'fi': [2, 0, -1, 1],
    'fj': [2, 0, -1, -1],
    'fn': [1, 1, -2, 0],
    'fp': [1, -1, -2, 0],
    'fw': [1, 0, -2, 1],
    'fx': [1, 0, -2, -1],
    'gk': [-2, 0, 1, 1],
    'gl': [-2, 0, 1, -1],
    'gm': [-1, 1, 2, 0],
    'go': [-1, -1, 2, 0],
    'gu': [-1, 0, 2, 1],
    'gv': [-1, 0, 2, -1],
    'hk': [-2, 0, -1, 1],
    'hl': [-2, 0, -1, -1],
    'hn': [-1, 1, -2, 0],
    'hp': [-1, -1, -2, 0],
    'hw': [-1, 0, -2, 1],
    'hx': [-1, 0, -2, -1],
    'iq': [1, 1, 0, 2],
    'is': [1, -1, 0, 2],
    'iu': [1, 0, 1, 2],
    'iw': [1, 0, -1, 2],
    'jr': [1, 1, 0, -2],
    'jt': [1, -1, 0, -2],
    'jv': [1, 0, 1, -2],
    'jx': [1, 0, -1, -2],
    'kq': [-1, 1, 0, 2],
    'ks': [-1, -1, 0, 2],
    'ku': [-1, 0, 1, 2],
    'kw': [-1, 0, -1, 2],
    'lr': [-1, 1, 0, -2],
    'lt': [-1, -1, 0, -2],
    'lv': [-1, 0, 1, -2],
    'lx': [-1, 0, -1, -2],
    'mq': [0, 2, 1, 1],
    'mr': [0, 2, 1, -1],
    'mu': [0, 1, 2, 1],
    'mv': [0, 1, 2, -1],
    'nq': [0, 2, -1, 1],
    'nr': [0, 2, -1, -1],
    'nw': [0, 1, -2, 1],
    'nx': [0, 1, -2, -1],
    'os': [0, -2, 1, 1],
    'ot': [0, -2, 1, -1],
    'ou': [0, -1, 2, 1],
    'ov': [0, -1, 2, -1],
    'ps': [0, -2, -1, 1],
    'pt': [0, -2, -1, -1],
    'pw': [0, -1, -2, 1],
    'px': [0, -1, -2, -1],
    'qu': [0, 1, 1, 2],
    'qw': [0, 1, -1, 2],
    'rv': [0, 1, 1, -2],
    'rx': [0, 1, -1, -2],
    'su': [0, -1, 1, 2],
    'sw': [0, -1, -1, 2],
    'tv': [0, -1, 1, -2],
    'tx': [0, -1, -1, -2]
};

const faces = [
    'aei', 'aej', 'aem', 'afi', 'afj', 'afn', 'aiq', 'ajr',
    'amq', 'amr', 'anq', 'anr', 'bei', 'bej', 'beo', 'bfi',
    'bfj', 'bfp', 'bis', 'bjt', 'bos', 'bot', 'bps', 'bpt',
    'cgk', 'cgl', 'cgm', 'chk', 'chl', 'chn', 'ckq', 'clr',
    'cmq', 'cmr', 'cnq', 'cnr', 'dgk', 'dgl', 'dgo', 'dhk',
    'dhl', 'dhp', 'dks', 'dlt', 'dos', 'dot', 'dps', 'dpt',
    'eiu', 'ejv', 'emu', 'emv', 'eou', 'eov', 'fiw', 'fjx',
    'fnw', 'fnx', 'fpw', 'fpx', 'gku', 'glv', 'gmu', 'gmv',
    'gou', 'gov', 'hkw', 'hlx', 'hnw', 'hnx', 'hpw', 'hpx',
    'iqu', 'iqw', 'isu', 'isw', 'jrv', 'jrx', 'jtv', 'jtx',
    'kqu', 'kqw', 'ksu', 'ksw', 'lrv', 'lrx', 'ltv', 'ltx',
    'mqu', 'mrv', 'nqw', 'nrx', 'osu', 'otv', 'psw', 'ptx'
];

const faceCellDict = {
    'aei': ['abefij', 'aeimqu'],
    'aej': ['abefij', 'aejmrv'],
    'aem': ['aeimqu', 'aejmrv'],
    'afi': ['abefij', 'afinqw'],
    'afj': ['abefij', 'afjnrx'],
    'afn': ['afinqw', 'afjnrx'],
    'aiq': ['aeimqu', 'afinqw'],
    'ajr': ['aejmrv', 'afjnrx'],
    'amq': ['acmnqr', 'aeimqu'],
    'amr': ['acmnqr', 'aejmrv'],
    'anq': ['acmnqr', 'afinqw'],
    'anr': ['acmnqr', 'afjnrx'],
    'bei': ['abefij', 'beiosu'],
    'bej': ['abefij', 'bejotv'],
    'beo': ['beiosu', 'bejotv'],
    'bfi': ['abefij', 'bfipsw'],
    'bfj': ['abefij', 'bfjptx'],
    'bfp': ['bfipsw', 'bfjptx'],
    'bis': ['beiosu', 'bfipsw'],
    'bjt': ['bejotv', 'bfjptx'],
    'bos': ['bdopst', 'beiosu'],
    'bot': ['bdopst', 'bejotv'],
    'bps': ['bdopst', 'bfipsw'],
    'bpt': ['bdopst', 'bfjptx'],
    'cgk': ['cdghkl', 'cgkmqu'],
    'cgl': ['cdghkl', 'cglmrv'],
    'cgm': ['cgkmqu', 'cglmrv'],
    'chk': ['cdghkl', 'chknqw'],
    'chl': ['cdghkl', 'chlnrx'],
    'chn': ['chknqw', 'chlnrx'],
    'ckq': ['cgkmqu', 'chknqw'],
    'clr': ['cglmrv', 'chlnrx'],
    'cmq': ['acmnqr', 'cgkmqu'],
    'cmr': ['acmnqr', 'cglmrv'],
    'cnq': ['acmnqr', 'chknqw'],
    'cnr': ['acmnqr', 'chlnrx'],
    'dgk': ['cdghkl', 'dgkosu'],
    'dgl': ['cdghkl', 'dglotv'],
    'dgo': ['dgkosu', 'dglotv'],
    'dhk': ['cdghkl', 'dhkpsw'],
    'dhl': ['cdghkl', 'dhlptx'],
    'dhp': ['dhkpsw', 'dhlptx'],
    'dks': ['dgkosu', 'dhkpsw'],
    'dlt': ['dglotv', 'dhlptx'],
    'dos': ['bdopst', 'dgkosu'],
    'dot': ['bdopst', 'dglotv'],
    'dps': ['bdopst', 'dhkpsw'],
    'dpt': ['bdopst', 'dhlptx'],
    'eiu': ['aeimqu', 'beiosu'],
    'ejv': ['aejmrv', 'bejotv'],
    'emu': ['aeimqu', 'egmouv'],
    'emv': ['aejmrv', 'egmouv'],
    'eou': ['beiosu', 'egmouv'],
    'eov': ['bejotv', 'egmouv'],
    'fiw': ['afinqw', 'bfipsw'],
    'fjx': ['afjnrx', 'bfjptx'],
    'fnw': ['afinqw', 'fhnpwx'],
    'fnx': ['afjnrx', 'fhnpwx'],
    'fpw': ['bfipsw', 'fhnpwx'],
    'fpx': ['bfjptx', 'fhnpwx'],
    'gku': ['cgkmqu', 'dgkosu'],
    'glv': ['cglmrv', 'dglotv'],
    'gmu': ['cgkmqu', 'egmouv'],
    'gmv': ['cglmrv', 'egmouv'],
    'gou': ['dgkosu', 'egmouv'],
    'gov': ['dglotv', 'egmouv'],
    'hkw': ['chknqw', 'dhkpsw'],
    'hlx': ['chlnrx', 'dhlptx'],
    'hnw': ['chknqw', 'fhnpwx'],
    'hnx': ['chlnrx', 'fhnpwx'],
    'hpw': ['dhkpsw', 'fhnpwx'],
    'hpx': ['dhlptx', 'fhnpwx'],
    'iqu': ['aeimqu', 'ikqsuw'],
    'iqw': ['afinqw', 'ikqsuw'],
    'isu': ['beiosu', 'ikqsuw'],
    'isw': ['bfipsw', 'ikqsuw'],
    'jrv': ['aejmrv', 'jlrtvx'],
    'jrx': ['afjnrx', 'jlrtvx'],
    'jtv': ['bejotv', 'jlrtvx'],
    'jtx': ['bfjptx', 'jlrtvx'],
    'kqu': ['cgkmqu', 'ikqsuw'],
    'kqw': ['chknqw', 'ikqsuw'],
    'ksu': ['dgkosu', 'ikqsuw'],
    'ksw': ['dhkpsw', 'ikqsuw'],
    'lrv': ['cglmrv', 'jlrtvx'],
    'lrx': ['chlnrx', 'jlrtvx'],
    'ltv': ['dglotv', 'jlrtvx'],
    'ltx': ['dhlptx', 'jlrtvx'],
    'mqu': ['aeimqu', 'cgkmqu'],
    'mrv': ['aejmrv', 'cglmrv'],
    'nqw': ['afinqw', 'chknqw'],
    'nrx': ['afjnrx', 'chlnrx'],
    'osu': ['beiosu', 'dgkosu'],
    'otv': ['bejotv', 'dglotv'],
    'psw': ['bfipsw', 'dhkpsw'],
    'ptx': ['bfjptx', 'dhlptx']
};

const faceDict = {
    'aei': [3, 1, 1, 1],
    'aej': [3, 1, 1, -1],
    'aem': [2, 2, 2, 0],
    'afi': [3, 1, -1, 1],
    'afj': [3, 1, -1, -1],
    'afn': [2, 2, -2, 0],
    'aiq': [2, 2, 0, 2],
    'ajr': [2, 2, 0, -2],
    'amq': [1, 3, 1, 1],
    'amr': [1, 3, 1, -1],
    'anq': [1, 3, -1, 1],
    'anr': [1, 3, -1, -1],
    'bei': [3, -1, 1, 1],
    'bej': [3, -1, 1, -1],
    'beo': [2, -2, 2, 0],
    'bfi': [3, -1, -1, 1],
    'bfj': [3, -1, -1, -1],
    'bfp': [2, -2, -2, 0],
    'bis': [2, -2, 0, 2],
    'bjt': [2, -2, 0, -2],
    'bos': [1, -3, 1, 1],
    'bot': [1, -3, 1, -1],
    'bps': [1, -3, -1, 1],
    'bpt': [1, -3, -1, -1],
    'cgk': [-3, 1, 1, 1],
    'cgl': [-3, 1, 1, -1],
    'cgm': [-2, 2, 2, 0],
    'chk': [-3, 1, -1, 1],
    'chl': [-3, 1, -1, -1],
    'chn': [-2, 2, -2, 0],
    'ckq': [-2, 2, 0, 2],
    'clr': [-2, 2, 0, -2],
    'cmq': [-1, 3, 1, 1],
    'cmr': [-1, 3, 1, -1],
    'cnq': [-1, 3, -1, 1],
    'cnr': [-1, 3, -1, -1],
    'dgk': [-3, -1, 1, 1],
    'dgl': [-3, -1, 1, -1],
    'dgo': [-2, -2, 2, 0],
    'dhk': [-3, -1, -1, 1],
    'dhl': [-3, -1, -1, -1],
    'dhp': [-2, -2, -2, 0],
    'dks': [-2, -2, 0, 2],
    'dlt': [-2, -2, 0, -2],
    'dos': [-1, -3, 1, 1],
    'dot': [-1, -3, 1, -1],
    'dps': [-1, -3, -1, 1],
    'dpt': [-1, -3, -1, -1],
    'eiu': [2, 0, 2, 2],
    'ejv': [2, 0, 2, -2],
    'emu': [1, 1, 3, 1],
    'emv': [1, 1, 3, -1],
    'eou': [1, -1, 3, 1],
    'eov': [1, -1, 3, -1],
    'fiw': [2, 0, -2, 2],
    'fjx': [2, 0, -2, -2],
    'fnw': [1, 1, -3, 1],
    'fnx': [1, 1, -3, -1],
    'fpw': [1, -1, -3, 1],
    'fpx': [1, -1, -3, -1],
    'gku': [-2, 0, 2, 2],
    'glv': [-2, 0, 2, -2],
    'gmu': [-1, 1, 3, 1],
    'gmv': [-1, 1, 3, -1],
    'gou': [-1, -1, 3, 1],
    'gov': [-1, -1, 3, -1],
    'hkw': [-2, 0, -2, 2],
    'hlx': [-2, 0, -2, -2],
    'hnw': [-1, 1, -3, 1],
    'hnx': [-1, 1, -3, -1],
    'hpw': [-1, -1, -3, 1],
    'hpx': [-1, -1, -3, -1],
    'iqu': [1, 1, 1, 3],
    'iqw': [1, 1, -1, 3],
    'isu': [1, -1, 1, 3],
    'isw': [1, -1, -1, 3],
    'jrv': [1, 1, 1, -3],
    'jrx': [1, 1, -1, -3],
    'jtv': [1, -1, 1, -3],
    'jtx': [1, -1, -1, -3],
    'kqu': [-1, 1, 1, 3],
    'kqw': [-1, 1, -1, 3],
    'ksu': [-1, -1, 1, 3],
    'ksw': [-1, -1, -1, 3],
    'lrv': [-1, 1, 1, -3],
    'lrx': [-1, 1, -1, -3],
    'ltv': [-1, -1, 1, -3],
    'ltx': [-1, -1, -1, -3],
    'mqu': [0, 2, 2, 2],
    'mrv': [0, 2, 2, -2],
    'nqw': [0, 2, -2, 2],
    'nrx': [0, 2, -2, -2],
    'osu': [0, -2, 2, 2],
    'otv': [0, -2, 2, -2],
    'psw': [0, -2, -2, 2],
    'ptx': [0, -2, -2, -2]
};

const cells = [
    'abefij', 'acmnqr', 'aeimqu',
    'aejmrv', 'afinqw', 'afjnrx',
    'bdopst', 'beiosu', 'bejotv',
    'bfipsw', 'bfjptx', 'cdghkl',
    'cgkmqu', 'cglmrv', 'chknqw',
    'chlnrx', 'dgkosu', 'dglotv',
    'dhkpsw', 'dhlptx', 'egmouv',
    'fhnpwx', 'ikqsuw', 'jlrtvx'
];

const cellDict = {
    'abefij': [6, 0, 0, 0],
    'acmnqr': [0, 6, 0, 0],
    'aeimqu': [3, 3, 3, 3],
    'aejmrv': [3, 3, 3, -3],

    'afinqw': [3, 3, -3, 3],
    'afjnrx': [3, 3, -3, -3],
    'bdopst': [0, -6, 0, 0],
    'beiosu': [3, -3, 3, 3],

    'bejotv': [3, -3, 3, -3],
    'bfipsw': [3, -3, -3, 3],
    'bfjptx': [3, -3, -3, -3],
    'cdghkl': [-6, 0, 0, 0],

    'cgkmqu': [-3, 3, 3, 3],
    'cglmrv': [-3, 3, 3, -3],
    'chknqw': [-3, 3, -3, 3],
    'chlnrx': [-3, 3, -3, -3],

    'dgkosu': [-3, -3, 3, 3],
    'dglotv': [-3, -3, 3, -3],
    'dhkpsw': [-3, -3, -3, 3],
    'dhlptx': [-3, -3, -3, -3],

    'egmouv': [0, 0, 6, 0],
    'fhnpwx': [0, 0, -6, 0],
    'ikqsuw': [0, 0, 0, 6],
    'jlrtvx': [0, 0, 0, -6]
};

const cellFaceDict = {
    'abefij': [
        'aei', 'aej',
        'afi', 'afj',
        'bei', 'bej',
        'bfi', 'bfj'
    ],
    'acmnqr': [
        'amq', 'amr',
        'anq', 'anr',
        'cmq', 'cmr',
        'cnq', 'cnr'
    ],
    'aeimqu': [
        'aei', 'aem',
        'aiq', 'amq',
        'eiu', 'emu',
        'iqu', 'mqu'
    ],
    'aejmrv': [
        'aej', 'aem',
        'ajr', 'amr',
        'ejv', 'emv',
        'jrv', 'mrv'
    ],
    'afinqw': [
        'afi', 'afn',
        'aiq', 'anq',
        'fiw', 'fnw',
        'iqw', 'nqw'
    ],
    'afjnrx': [
        'afj', 'afn',
        'ajr', 'anr',
        'fjx', 'fnx',
        'jrx', 'nrx'
    ],
    'bdopst': [
        'bos', 'bot',
        'bps', 'bpt',
        'dos', 'dot',
        'dps', 'dpt'
    ],
    'beiosu': [
        'bei', 'beo',
        'bis', 'bos',
        'eiu', 'eou',
        'isu', 'osu'
    ],
    'bejotv': [
        'bej', 'beo',
        'bjt', 'bot',
        'ejv', 'eov',
        'jtv', 'otv'
    ],
    'bfipsw': [
        'bfi', 'bfp',
        'bis', 'bps',
        'fiw', 'fpw',
        'isw', 'psw'
    ],
    'bfjptx': [
        'bfj', 'bfp',
        'bjt', 'bpt',
        'fjx', 'fpx',
        'jtx', 'ptx'
    ],
    'cdghkl': [
        'cgk', 'cgl',
        'chk', 'chl',
        'dgk', 'dgl',
        'dhk', 'dhl'
    ],
    'cgkmqu': [
        'cgk', 'cgm',
        'ckq', 'cmq',
        'gku', 'gmu',
        'kqu', 'mqu'
    ],
    'cglmrv': [
        'cgl', 'cgm',
        'clr', 'cmr',
        'glv', 'gmv',
        'lrv', 'mrv'
    ],
    'chknqw': [
        'chk', 'chn',
        'ckq', 'cnq',
        'hkw', 'hnw',
        'kqw', 'nqw'
    ],
    'chlnrx': [
        'chl', 'chn',
        'clr', 'cnr',
        'hlx', 'hnx',
        'lrx', 'nrx'
    ],
    'dgkosu': [
        'dgk', 'dgo',
        'dks', 'dos',
        'gku', 'gou',
        'ksu', 'osu'
    ],
    'dglotv': [
        'dgl', 'dgo',
        'dlt', 'dot',
        'glv', 'gov',
        'ltv', 'otv'
    ],
    'dhkpsw': [
        'dhk', 'dhp',
        'dks', 'dps',
        'hkw', 'hpw',
        'ksw', 'psw'
    ],
    'dhlptx': [
        'dhl', 'dhp',
        'dlt', 'dpt',
        'hlx', 'hpx',
        'ltx', 'ptx'
    ],
    'egmouv': [
        'emu', 'emv',
        'eou', 'eov',
        'gmu', 'gmv',
        'gou', 'gov'
    ],
    'fhnpwx': [
        'fnw', 'fnx',
        'fpw', 'fpx',
        'hnw', 'hnx',
        'hpw', 'hpx'
    ],
    'ikqsuw': [
        'iqu', 'iqw',
        'isu', 'isw',
        'kqu', 'kqw',
        'ksu', 'ksw'
    ],
    'jlrtvx': [
        'jrv', 'jrx',
        'jtv', 'jtx',
        'lrv', 'lrx',
        'ltv', 'ltx'
    ]
};

function distance(x, y) {
    var d = (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2 + (x[3] - y[3]) ** 2;
    return d;
}

function scaleQuaternion(x, s) {
    return [x[0] * s, x[1] * s, x[2] * s, x[3] * s];
}

function sumQuaternions(m) {
    var v = [];
    for (var i = 0; i < 4; i++) {
        v[i] = 0;
        for (var j = 0; j < m.length; j++) {
            v[i] += m[j][i];
        }
    }
    return v;
}

function findLines(l) {
    var lines = [];
    var linesDict = {};
    for (var i = 0; i < 24; i++) {
        for (var j = i + 1; j < 24; j++) {
            if (Math.abs(distance(vertexDict[vertices[i]], vertexDict[vertices[j]]) - l) < 0.001) {
                lines.push(vertices[i] + vertices[j]);
                linesDict[vertices[i] + vertices[j]] = sumQuaternions([vertexDict[vertices[i]], vertexDict[vertices[j]]]);
            }
        }
    }
    return [lines, linesDict];
}

function findFaces(l) {
    var faces = [];
    var faceDict = {};
    for (var i = 0; i < 24; i++) {
        for (var j = i + 1; j < 24; j++) {
            for (var k = j + 1; k < 24; k++) {
                var face = sumQuaternions([vertexDict[vertices[i]], vertexDict[vertices[j]], vertexDict[vertices[k]]]);
                if (Math.abs(distance(face, [0, 0, 0, 0]) - l) < 0.001) {
                    faces.push(vertices[i] + vertices[j] + vertices[k]);
                    faceDict[vertices[i] + vertices[j] + vertices[k]] = face;
                }
            }
        }
    }
    return [faces, faceDict];
}

function findCells(l) {
    var cells = [];
    var cellDict = {};
    for (var i = 0; i < 24; i++) {
        for (var j = i + 1; j < 24; j++) {
            for (var k = j + 1; k < 24; k++) {
                for (var m = k + 1; m < 24; m++) {
                    for (var n = m + 1; n < 24; n++) {
                        for (var o = n + 1; o < 24; o++) {
                            var cell = sumQuaternions([vertexDict[vertices[i]], vertexDict[vertices[j]], vertexDict[vertices[k]], vertexDict[vertices[m]], vertexDict[vertices[n]], vertexDict[vertices[o]]]);
                            if (Math.abs(distance(cell, [0, 0, 0, 0]) - l) < 0.001) {
                                cells.push(vertices[i] + vertices[j] + vertices[k] + vertices[m] + vertices[n] + vertices[o]);
                                cellDict[vertices[i] + vertices[j] + vertices[k] + vertices[m] + vertices[n] + vertices[o]] = cell;
                            }
                        }
                    }
                }
            }
        }
    }
    return [cells, cellDict];
}

function cellFaces() {
    var cellFaceDict = {}
    for (var l = 0; l < 24; l++) {
        var cell = cells[l];
        var cf = []
        for (var i = 0; i < 6; i++) {
            for (var j = i + 1; j < 6; j++) {
                for (var k = j + 1; k < 6; k++) {
                    var face = cell[i] + cell[j] + cell[k];
                    if (faces.includes(face)) {
                        cf.push(face);
                    }
                }
            }
        }
        cellFaceDict[cell] = cf;
    }
    return cellFaceDict;
}

//console.log(findLines(2));
//console.log(findFaces(12));
//console.log(findCells(36));
//console.log(cellFaces());

function findFaceCells() {
    var faceCellDict = {};

    for (var i = 0; i < 96; i++) {
        var cell = [];
        for (var j = 0; j < 24; j++) {
            if (cellFaceDict[cells[j]].includes(faces[i])) {
                cell.push(cells[j]);
            }
        }
        faceCellDict[faces[i]] = cell;
    }
    return faceCellDict
}

export { vertices, vertexDict, lines, lineDict, faces, faceDict, faceCellDict, cells, cellDict, cellFaceDict };