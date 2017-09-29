/**
 * pubSea-v1.0.0 Web前端常用函数库   http://www.mwyking.com/  By seayao
 *
 * 参考chenhuiYj的ec-do开源库
 * 原文作者:chenhuiYj
 * 原文出处:https://github.com/chenhuiYj/ec-do
 * 尊重原创，从我做起。
 */


var pubSea = {
    //【一、字符串相关】
    //去除空格:默认去除前后空格
    /*type，默认为2(1~4)
     1:所有空格
     2:前后空格
     3:前空格
     4:后空格
     * */
    trim: function (str, type) {
        type = type || 2;
        switch (type) {
            case 1:
                return str.replace(/\s+/g, "");
            case 2:
                return str.replace(/(^\s*)|(\s*$)/g, "");
            case 3:
                return str.replace(/(^\s*)/g, "");
            case 4:
                return str.replace(/(\s*$)/g, "");
            default:
                return str;
        }
    },

    //字符串大小写:默认首字母大写
    /*type，默认为1(1~5)
     1:首字母大写
     2:首页母小写
     3:大小写转换
     4:全部大写
     5:全部小写
     * */
    //eg:changeCase('sdsdaa',1)
    //res:Sdsdaa
    changeCase: function (str, type) {
        type = type || 1;
        function toggleCase(str) {
            var itemText = "";
            str.split("").forEach(
                function (item) {
                    if (/^([a-z]+)/.test(item)) {
                        itemText += item.toUpperCase();
                    } else if (/^([A-Z]+)/.test(item)) {
                        itemText += item.toLowerCase();
                    } else {
                        itemText += item;
                    }
                });
            return itemText;
        }

        switch (type) {
            case 1:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

                });
            case 2:
                return str.replace(/\b\w+\b/g, function (word) {
                    return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
                });
            case 3:
                return toggleCase(str);
            case 4:
                return str.toUpperCase();
            case 5:
                return str.toLowerCase();
            default:
                return str;
        }
    },

    //字符串循环复制，默认为1次
    /*
     str:字符串
     count:次数，默认为1
     eg:repeatStr('sea',3)
     res:"seaseasea"
     */
    repeatStr: function (str, count) {
        if (Math.round(count) <= 0 || !count)count = 1;
        var txt = '';
        for (var i = 0; i < Math.round(count); i++) {
            txt += str;
        }
        return txt;
    },

    //字符串替换
    /*
     str:原字符串
     charReg:要替换的字符或者正则表达式（不要写g）
     newChar:要替换成什么字符
     eg:replaceAll("sea","a","1")
     res:("se1")
     * */
    replaceAll: function (str, charReg, newChar) {
        nRegExp = new RegExp(charReg, "g");
        return str.replace(nRegExp, newChar);
    },

    //将字符串中的指定字符替换*或者其他指定字符
    /*
     str:原字符串
     regArr:字符格式(数组,长度为1或3位)
     type:替换方式，默认为0(0或1)
     newChar:替换的字符（默认*）
     * */
    replaceStr: function (str, regArr, type, newChar) {
        type = Math.round(type) || 0;
        if (type < 0) {
            type = 0;
        } else if (type > 1) {
            type = 1;
        }
        var regtext = '',
            Reg = null,
            replaceText = newChar || '*';
        //eg:replaceStr("18819322663",[3,5,3],0)
        //res:"188*****663"
        //注意:repeatStr是在上面定义过的（字符串循环复制）
        if (regArr.length === 3 && type === 0) {
            regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})';
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[1]);
            return str.replace(Reg, '$1' + replaceCount + '$2');
        }
        //eg:replaceStr("asdasdasdaa",[3,5,3],1)
        //res:"***asdas***"
        else if (regArr.length === 3 && type === 1) {
            regtext = '(\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '})';
            Reg = new RegExp(regtext);
            var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
            var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
            return str.replace(Reg, replaceCount1 + '$1' + replaceCount2);
        }
        //eg:replaceStr("1asd88465asdwqe3",[5],0)
        //res:"*****8465asdwqe3"
        else if (regArr.length === 1 && type === 0) {
            regtext = '(^\\w{' + regArr[0] + '})';
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount);
        }
        //eg:replaceStr("1asd88465asdwqe3",[5],1,"+")
        //res:"1asd88465as+++++"
        else if (regArr.length === 1 && type === 1) {
            regtext = '(\\w{' + regArr[0] + '}$)';
            Reg = new RegExp(regtext);
            var replaceCount = this.repeatStr(replaceText, regArr[0]);
            return str.replace(Reg, replaceCount);
        } else {
            console.error("parameter is incorrect");
        }
    },

    //字符串校验(可自定义扩展)
    /*
     str:字符串
     type:校验类型(目前支持九种)
     * */
    //eg:checkType('165226226326','phone')
    //res:false
    checkType: function (str, type) {
        switch (type) {
            case 'email':
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
            case 'phone':
                return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
            case 'tel':
                return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
            case 'number':
                return /^[0-9]$/.test(str);
            case 'english':
                return /^[a-zA-Z]+$/.test(str);
            case 'text':
                return /^\w+$/.test(str);
            case 'chinese':
                return /^[\u4E00-\u9FA5]+$/.test(str);
            case 'lower':
                return /^[a-z]+$/.test(str);
            case 'upper':
                return /^[A-Z]+$/.test(str);
            default:
                return true;
        }
    },

    //检测密码强度
    //eg:checkPwd("sea123Y_")
    //res:4
    checkPwd: function (str) {
        var nowLv = 0;
        if (str.length < 6) {
            return nowLv
        }
        if (/[0-9]/.test(str)) {
            nowLv++;
        }
        if (/[a-z]/.test(str)) {
            nowLv++;
        }
        if (/[A-Z]/.test(str)) {
            nowLv++;
        }
        if (/[\.|-|_]/.test(str)) {
            nowLv++;
        }
        return nowLv;
    },

    //随机码
    /*
     count:取值范围,默认36(2~36)
     * */

    //eg1:randomWord(16)
    //res1:"2b72eaec6fbe3"

    //eg2:randomWord(36)
    //res2:"rc38glze4tg"
    randomWord: function (count) {
        count = count || 36;
        return Math.random().toString(count).substring(2);
    },

    //在原字符串基础上查找特定字符串出现次数
    /*
     str:原字符串
     newChar:指定字符或字符串
     eg:var strTest='sadasdsadsafdsfdsggfdgfdg';
     countStr(strTest,'fd');
     res:4
     * */
    countStr: function (str, newChar) {
        return str.split(newChar).length - 1;
    },

    //创建正则字符,一般是为搜索或者高亮操作
    /*
     strArr:字符串数组
     eg:createKeyExp(['我','谁'])
     res:(我|谁)
     * */
    createKeyExp: function (strArr) {
        var str = "";
        for (var i = 0; i < strArr.length; i++) {
            if (i != strArr.length - 1) {
                str = str + strArr[i] + "|";
            } else {
                str = str + strArr[i];
            }
        }
        return "(" + str + ")";
    },

    //关键字加标签（多个关键词用空格隔开）
    /*
     str:字符串
     key:字符串中关键字，可以是多个，用空格隔开
     el:标签
     eg:findKey('上海自来水来自海上','上海 海','p')
     res:<p>上海</p>自来水来自<p>海</p>上
     * */
    findKey: function (str, key, el) {
        var arr = null,
            regStr = null,
            content = null,
            Reg = null,
            _el = el || 'span';
        arr = key.split(/\s+/);
        //alert(regStr); //    如：(前端|过来)
        regStr = this.createKeyExp(arr);
        content = str;
        //alert(Reg);//        /如：(前端|过来)/g
        Reg = new RegExp(regStr, "g");
        content = content;
        //过滤html标签 替换标签，往关键字前后加上标签
        content = content.replace(/<\/?[^>]*>/g, '');
        return content.replace(Reg, "<" + _el + ">$1</" + _el + ">");
    },

    //找出最长单词 (Find the Longest word in a String)
    /*
     str:字符串
     splitType:分隔符
     eg1:longestWord('Find the Longest word in a String')
     res1:7

     eg2:longestWord('Find|the|Longest|word|in|a|String','|')
     res2:7
     * */
    longestWord: function (str, splitType) {
        var _splitType = splitType || /\s+/g,
            _max = 0;
        var strArr = str.split(_splitType);
        strArr.forEach(function (item) {
            if (_max < item.length) {
                _max = item.length;
            }
        });
        return _max;
    },

    //句中单词首字母大写 (Title Case a Sentence)
    //这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
    /*
     str:字符串
     splitType:分隔符
     eg1:titleCaseUp('this is a title')
     res1:"This Is A Title"

     eg2:titleCaseUp('this-is-a-title','-')
     res2:"This Is A Title"
     * */
    titleCaseUp: function (str, splitType) {
        var _splitType = splitType || /\s+/g;
        var strArr = str.split(_splitType),
            result = "", _this = this
        strArr.forEach(function (item) {
            result += _this.changeCase(item, 1) + ' ';
        });
        return this.trim(result, 4)
    },

    //格式化处理字符串
    /*
     str:原字符串
     size:间隔长度,默认3
     splitType:分隔符,默认逗号,
     eg1:formatText('1234asda567asd890')
     res1:"12,34a,sda,567,asd,890"

     eg2:formatText('1234asda567asd890',4)
     res2:"1,234a,sda5,67as,d890"

     eg3:formatText('1234asda567asd890',4,'*')
     res3:"1*234a*sda5*67as*d890"
     * */
    formatText: function (str, size, splitType) {
        var _size = size || 3, _delimiter = splitType || ',';
        var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
        var reg = new RegExp(regText, 'g');
        return str.replace(reg, _delimiter);
    },

    //字符串过滤(html标签，表情，特殊字符)
    /*
     str:原字符串
     type:过滤类型,如下:{special:特殊字符,html:html标签,emjoy:emjoy表情,word:小写英文字母,WORD:大写英文字母,number:阿拉伯数字,chinese:中文}
     restr:将过滤的字符串替换成什么，默认为空字符''
     spstr:保留哪些字符串
     * */
    //var str='asd    654a大蠢sasdasdASDQWEXZC6d5#%^*^&*^%^&*$\\"\'#@!()*/-())_\'":"{}?<div></div><img src=""/>啊实打实大蠢猪自行车这些课程';
    //eg:filterStr(str,'html,WORD,chinese,special','*','%?')
    //res:"asd    654a**sasdasd*********6d5*%******%*************************?*****************"
    filterStr: function (str, type, restr, spstr) {
        var typeArr = type.split(','), _str = str;
        for (var i = 0, len = typeArr.length; i < len; i++) {
            if (typeArr[i] === 'special') {
                var pattern, regText = '$()[]{}?\|^*+./\"\'+';
                if (spstr) {
                    var _spstr = spstr.split(""), _regText = "[^0-9A-Za-z\\s";
                    for (var j = 0, length = _spstr.length; j < length; j++) {
                        if (regText.indexOf(_spstr[j]) === -1) {
                            _regText += _spstr[j];
                        }
                        else {
                            _regText += '\\' + _spstr[j];
                        }
                    }
                    _regText += ']';
                    pattern = new RegExp(_regText, 'g');
                }
                else {
                    pattern = new RegExp("[^0-9A-Za-z\\s]", 'g')
                }
            }
            var _restr = restr || '';
            switch (typeArr[i]) {
                case 'special':
                    _str = _str.replace(pattern, _restr);
                    break;
                case 'html':
                    _str = _str.replace(/<\/?[^>]*>/g, _restr);
                    break;
                case 'emjoy':
                    _str = _str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/g, _restr);
                    break;
                case 'word':
                    _str = _str.replace(/[a-z]/g, _restr);
                    break;
                case 'WORD':
                    _str = _str.replace(/[A-Z]/g, _restr);
                    break;
                case 'number':
                    _str = _str.replace(/[0-9]/g, _restr);
                    break;
                case 'chinese':
                    _str = _str.replace(/[\u4E00-\u9FA5]/g, _restr);
                    break;
            }
        }
        return _str;
    },

    //【二、数组相关】
    //数组去重(普通版)
    /*
     eg:removeRepeatArray([1,'1',2,1]);
     res:[1, "1", 2]
     * */
    removeRepeatArray: function (arr) {
        return arr.filter(function (item, index, self) {
            return self.indexOf(item) === index;
        });
    },

    //数组去重(e6版)
    /*
     eg:removeRepeatArrayEs6([1,'1',2,1]);
     res:[1, "1", 2]
     * */
    removeRepeatArrayEs6: function (arr) {
        return Array.from(new Set(arr));
    },

    //数组置乱(洗牌算法,Fisher–Yates Shuffle)
    /*
     eg:shuffleArr([5,1,3,9,7,6])
     res:[1, 5, 3, 7, 6, 9]
     * */
    shuffleArr: function (arr) {
        return arr.sort(function () {
            return Math.random() - 0.5;
        });
    },

    //求数组(纯数字类型的数组)最大值
    /*
     eg:maxArr([5,1,3,9,7,6])
     res:9
     * */
    maxArr: function (arr) {
        return Math.max.apply(Math, arr);
    },

    //求数组(纯数字类型的数组)最小值
    /*
     eg:minArr([5,1,3,9,7,6])
     res:1
     * */
    minArr: function (arr) {
        return Math.min.apply(Math, arr);
    },

    //数组求和(纯数字类型的数组)
    /*
     eg:sumArr([5,1,3,9,7,6])
     res:31
     * */
    sumArr: function (arr) {
        return arr.reduce(function (pre, cur) {
            return pre + cur;
        })
    },

    //数组求平均值(纯数字类型的数组)
    /*
     eg:averageArr([5,1.2,3,9.9,7,6.6])
     res:5.45
     * */
    averageArr: function (arr) {
        return this.sumArr(arr) / arr.length;
    },

    //从数组中随机获取元素
    /*
     eg:randomArr(["y",1.2,"s",9.9,7,"sea"])
     res:sea
     * */
    randomArr: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },

    //回数组:一个元素出现的次数
    /*
     eg:countArr([1,2,3,4,5,66,77,22,55,22],22)
     res:2
     * */
    countArr: function (obj, ele) {
        var num = 0;
        for (var i = 0, len = obj.length; i < len; i++) {
            if (ele === obj[i]) {
                num++;
            }
        }
        return num;
    },

    //数组分组(jsgroup)返回数组:返回数组元素出现的次数
    /*
     arr:原数组
     rank:输出排序结果前几位的结果,默认全部输出
     rankType:排序方式，默认降序0,(0或1)
     eg1:arrGroupToArr(['Air','Car','Car','Air','Truck','Boat','Truck','Air','Boat'])
     res1:[{el: "Air", count: 3},{el: "Car", count: 2},{el: "Truck", count: 2},{el: "Boat", count: 2}]

     eg2:arrGroupToArr([1,5,5,1,5,2,1,8,2,2,2,5],null,1)
     res2:[{el: "8", count: 1},{el: "1", count: 3},{el: "5", count: 4},{el: "2", count: 4}]

     eg3:arrGroupToArr([1,5,5,1,5,2,1,8,2,2,2,5],2,1)
     res3:[{el: "8", count: 1},{el: "1", count: 3}]
     * */
    arrGroupToArr: function (arr, rank, rankType) {
        var obj = {},
            k, arr1 = [];
        //记录每一元素出现的次数
        for (var i = 0, len = arr.length; i < len; i++) {
            k = arr[i];
            if (obj[k]) {
                obj[k]++;
            } else {
                obj[k] = 1;
            }
        }
        //保存结果{el-'元素'，count-出现次数}
        for (var o in obj) {
            arr1.push({el: o, count: obj[o]});
        }
        //排序（降序）
        arr1.sort(function (n1, n2) {
            return n2.count - n1.count;
        });
        //如果rankType为1，则为升序，反转数组
        if (rankType === 1) {
            arr1 = arr1.reverse();
        }
        var rank1 = rank || arr1.length;
        return arr1.slice(0, rank1);
    },

    //数组分组(jsgroup)返回对象:返回数组元素出现的次数
    /*
     eg:arrGroupToObj(['Air','Car','Car','Air','Truck','Boat','Truck','Air','Boat'])
     res:{Air: 3, Car: 2, Truck: 2, Boat: 2}
     * */
    arrGroupToObj: function (arr) {
        var hist = {};
        arr.map(function (a) {
            if (a in hist) hist[a]++; else hist[a] = 1;
        });
        return hist;
    },

    //获取区间数组:(纯数字类型的数组,得到n1-n2下标的数组)
    /*
     eg1:betweenArr([0,1,2,3,4,5,6,7,8,9],3,7)
     res1:[3, 4, 5, 6, 7]

     eg2:betweenArr([0,1,2,3,4,5,6,7,8,9],3)
     res2:[3, 4, 5, 6, 7, 8, 9]
     * */
    betweenArr: function (arr, n1, n2) {
        var arr1 = [], len = n2 || arr.length - 1;
        for (var i = n1; i <= len; i++) {
            arr1.push(arr[i]);
        }
        return arr1;
    },

    //获取两个数组相同的元素
    /*
     eg:getSameFromArray(['a1','a2','a3'],['b1','b2','a3'])
     res:a3
     * */
    getSameFromArray: function (arr1, arr2) {
        if (arr1 instanceof Array && arr2 instanceof Array) {
            for (var i = 0, iLen = arr1.length; i < iLen; i++) {
                for (var j = 0, jLen = arr2.length; j < jLen; j++) {
                    if (arr1[i] === arr2[j]) {
                        return arr1[i];
                    }
                }
            }
        }
    },

    //删除数组中值为val的元素
    /*
     arr:原数组
     val:要删除的元素
     type:指定删除类型,默认严格模式true,完全匹配(true或false)

     eg1:removeArrayOfVal(['test','test1','test2','test','seayao'],'test')
     res1:["test1", "test2", "seayao"]

     eg2:removeArrayOfVal(['test','test1','test2','test','seayao'],'test',true)
     res2:["seayao"]
     * */
    removeArrayOfVal: function (arr, val, type) {
        return arr.filter(function (item) {
            return type ? item.indexOf(val) === -1 : item !== val;
        })
    },

    //删除数组中下标为n的元素
    /*
     eg:removeArrayOfIndex(['test1','test2','test3','test4','test5'],2)
     res:["test1", "test2", "test3", "test4", "test5"]
     * */
    removeArrayOfIndex: function (arr, index) {
        if (index > arr.length - 1 || index < 0) {
            return arr;
        }
        var arr1 = [];
        for (var i = 0; i < arr.length; i++) {
            if (i == index) {
                continue;
            }
            arr1.push(arr[i]);
        }
        arr.length = 0;
        for (var j = 0; j < arr1.length; j++) {
            arr[j] = arr1[j];
        }
        return arr;
    },

    //获取对象数组某些项
    /*
     arr:对象数组
     keys:键，可以是多个，用逗号隔开
     type:是否只是需要获取某一项的值,默认false(true或false)

     var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
     eg1:getOptionArray(arr,'a,c')
     res1:[{a:1,c:9},{a:2,c:5},{a:5,c:underfind},{a:4,c:5},{a:4,c:7}]

     eg2:getOptionArray(arr,'a',true)
     res2:[1, 2, 5, 4, 4]
     * */
    getOptionArr: function (arr, keys, type) {
        type = type || false;
        var newArr = [];
        if (!keys) {
            return arr;
        }
        //是否只是需要获取某一项的值
        if (type || type === true) {
            for (var k = 0, length = arr.length; k < length; k++) {
                newArr.push(arr[k][keys]);
            }
            return newArr;
        }
        var _keys = keys.split(','), newArrOne = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            newArrOne = {};
            for (var j = 0, len1 = _keys.length; j < len1; j++) {
                newArrOne[_keys[j]] = arr[i][_keys[j]];
            }
            newArr.push(newArrOne);
        }
        return newArr;
    },

    //排除对象数组某些项
    /*
     arr:对象数组
     keys:键，可以是多个，用逗号隔开

     var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
     eg1:filterOptionArr(arr,'a')
     res1:[{b:2,c:9},{b:3,c:5},{b:9},{b:2,c:5},{b:5,c:7}]

     eg2:filterOptionArr(arr,'a,c')
     res2;[{b:2},{b:3},{b:9},{b:2},{b:5}]
     * */
    filterOptionArr: function (arr, keys) {
        var newArr = [];
        var _keys = keys.split(','), newArrOne = {};
        for (var i = 0, len = arr.length; i < len; i++) {
            newArrOne = {};
            for (var key in arr[i]) {
                //如果key不存在排除keys里面,添加数据
                if (_keys.indexOf(key) === -1) {
                    newArrOne[key] = arr[i][key];
                }
            }
            newArr.push(newArrOne);
        }
        return newArr;
    },

    //对象数组的排序
    /*
     arr:对象数组
     sortText:排序条件

     var arr=[{a:1,b:2,c:9},{a:2,b:3,c:5},{a:5,b:9},{a:4,b:2,c:5},{a:4,b:5,c:7}]
     eg:arraySort(arr,'a,b') ps:a是第一排序条件，b是第二排序条件
     res:[{a: 1, b: 2, c: 9},{a: 2, b: 3, c: 5},{a: 4, b: 2, c: 5},{a: 4, b: 5, c: 7},{a: 5, b: 9}]
     * */
    arraySort: function (arr, sortText) {
        if (!sortText) {
            return arr
        }
        var _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
        for (var i = 0, len = _sortText.length; i < len; i++) {
            _arr.sort(function (n1, n2) {
                return n1[_sortText[i]] - n2[_sortText[i]]
            })
        }
        return _arr;
    },

    //数组扁平化
    /*
     arr:复杂数组
     eg:steamroller([1,2,[4,5,[1,23]]])
     res:[1, 2, 4, 5, 1, 23]
     * */
    steamroller: function (arr) {
        var newArr = [], _this = this;
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                // 如果是数组，调用(递归)steamroller 将其扁平化
                // 然后再 push 到 newArr 中
                newArr.push.apply(newArr, _this.steamroller(arr[i]));
            } else {
                // 不是数组直接 push 到 newArr 中
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },

    //数组扁平化另一种写法
    /*
     * i=0 newArr.push(arr[i])  [1]
     * i=1 newArr.push(arr[i])  [1,2]
     * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第一次i=2进入后 i=0, newArr.push(arr[i]);  [4]
     * 第一次i=2进入后 i=1, newArr.push(arr[i]);  [4，5]
     *  * i=2 newArr = newArr.concat(steamroller(arr[i]));  执行到下面
     * 第二次i=2进入后 i=0, newArr.push(arr[i]);  [1]
     * 第二次i=2进入后 i=1, newArr.push(arr[i]);  [1，23]  执行到下面
     * 第二次循环完，回到第一次进入后  newArr = newArr.concat(steamroller(arr[i]));  [4,5].concat([1,23])   [4,5,1,23]
     * 然后回到第一次   [1,2].concat([4,5,1,23])
     *
     arr:复杂数组
     eg:steamroller2([1,2,[4,5,[1,23]]])
     res:[1, 2, 4, 5, 1, 23]
     */
    steamroller2: function (arr) {
        var newArr = [], _this = this;
        for (var i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
                // 如果是数组，调用(递归)steamroller 将其扁平化
                // 然后再 push 到 newArr 中
                newArr = newArr.concat(_this.steamroller2(arr[i]));
            } else {
                // 不是数组直接 push 到 newArr 中
                newArr.push(arr[i]);
            }
        }
        return newArr;
    },

    //【三、对象相关】
    //清除对象中值为空的属性
    /*
     obj:待处理对象
     eg:filterParams({a:"",b:null,c:"010",d:123})
     res:{c: "010", d: 123}
     * */
    filterParams: function (obj) {
        var _newPar = {};
        for (var key in obj) {
            if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
                _newPar[key] = obj[key];
            }
        }
        return _newPar;
    },

    //【四、时间相关】
    //格式化当前日期(参数可自由组合)
    /*
     date:需要格式化的日期，默认当前设备的日期
     pattern:时间格式,默认"yyyy-MM-dd HH:mm:ss"
     eg1:formatDate()
     res1:2017-09-25 16:16:00

     eg2:formatDate('y/M/d a h:m:s')
     res2:2017/9/25 pm 4:16:42

     eg3:formatDate('yyyy-MM-dd 第q季度 HH:mm:ss 星期W')
     res3:2017-09-25 第3季度 16:18:16 星期一
     * */
    formatDate: function (pattern) {
        var returnValue = pattern || "yyyy-MM-dd HH:mm:ss";
        var format = {
            "y+": new Date().getFullYear(),                  //年份
            "M+": new Date().getMonth() + 1,                 //月份
            "d+": new Date().getDate(),                      //日
            "H+": new Date().getHours(),                     //24小时制
            "m+": new Date().getMinutes(),                   //分钟
            "s+": new Date().getSeconds(),                   //秒
            "S": new Date().getMilliseconds(),               //毫秒
            "h+": (new Date().getHours() % 12),              //12小时制
            "q+": Math.floor((new Date().getMonth() + 3) / 3), //季度
            "W": new Array('日', '一', '二', '三', '四', '五', '六')[new Date().getDay()], //星期几/周几
            "A": (new Date().getHours() / 12) <= 1 ? "AM" : "PM",
            "a": (new Date().getHours() / 12) <= 1 ? "am" : "pm"
        };
        /*遍历正则式pattern类型对象构建returnValue对象*/
        for (var key in format) {
            var regExp = new RegExp("(" + key + ")");
            if (regExp.test(returnValue)) {
                var zero = "";
                for (var i = 0; i < RegExp.$1.length; i++) {
                    zero += "0";
                }
                var replacement = RegExp.$1.length == 1 ? format[key] : (zero + format[key]).substring((("" + format[key]).length));
                returnValue = returnValue.replace(RegExp.$1, replacement);
            }
        }
        return returnValue;
    },

    //判断是否为闰年
    isLeapYear: function (year) {
        if (year) {
            return (0 == parseInt(year) % 4 && ((parseInt(year) % 100 != 0) || (parseInt(year) % 400 == 0)));
        } else {
            year = new Date();
            return (0 == year.getYear() % 4 && ((year.getYear() % 100 != 0) || (year.getYear() % 400 == 0)));
        }
    },

    //到某一个时间的倒计时
    /*
     eg:getEndTime('2018-7-22 16:0:0')
     res:剩余时间:300天0小时43分钟40秒
     * */
    getEndTime: function (endTime) {
        var startDate = new Date(); //开始时间，当前时间
        var endDate = new Date(endTime); //结束时间，需传入时间参数
        var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return "剩余时间:" + d + "天" + h + "小时" + m + "分钟" + s + "秒";
    },

    //获取当前时间几天后(前)的日期
    /*
     num:数字，大于0:几天后，小于0:几天前
     eg:timeFuture(20)
     res:2017-10-15
     * */
    timeFuture: function (num) {
        var dd = new Date();
        dd.setDate(dd.getDate() + Math.round(num));
        var y = dd.getFullYear();
        var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);
        var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
        return y + "-" + m + "-" + d;
    },

    //时间差(几分钟前、几天前……)
    /*
     dateStr:时间格式，2017-09-25 16:32:36
     eg:timeAgo('2017-09-25 16:32:36')
     res:16分钟前
     * */
    timeAgo: function (dateStr) {
        //dateStr格式：2017-08-17 10:39:27
        //转换成时间戳
        var dateTimeStamp = Date.parse(dateStr.replace(/-/gi, "/"));
        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        if (diffValue < 0) {
            return;
        }
        var monthC = diffValue / month;
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        var result;
        if (monthC >= 12) {
            result = dateStr;
        }
        else if (monthC >= 1) {
            result = "" + parseInt(monthC) + "个月前";
        }
        else if (dayC >= 1) {
            result = "" + parseInt(dayC) + "天前";
        }
        else if (hourC >= 1) {
            result = "" + parseInt(hourC) + "小时前";
        }
        else if (minC >= 1) {
            result = "" + parseInt(minC) + "分钟前";
        } else if (minC < 1) {
            result = "刚刚";
        }
        return result;
    },

    //获取某年某月的第一天
    /*
     year:年份，默认当前年份
     month:月份，默认当前月份
     eg1:getFirstDayInMonth()
     res1:2017-09-01 00:00:00

     eg2:getFirstDayInMonth(2018,6)
     res2:2018-06-01 00:00:00
     * */
    getFirstDayInMonth: function (year, month) {
        if (!year || !month) {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            return y + '-' + m + '-' + "01" + " " + "00" + ":" + "00" + ":" + "00";

        } else if (month > 0 && month < 12) {
            var mon = parseInt(month) < 10 ? "0" + parseInt(month) : parseInt(month);
            return year + '-' + mon + '-' + "01" + " " + "00" + ":" + "00" + ":" + "00";
        } else {
            return year + '-' + "01" + '-' + "01" + " " + "00" + ":" + "00" + ":" + "00";
        }
    },

    //获取某年某月的最后一天
    /*
     year:年份，默认当前年份
     month:月份，默认当前月份
     eg1:getLastDayInMonth()
     res1:2017-09-30 00:00:00

     eg2:getLastDayInMonth(2020,2)
     res2:2020-02-29 00:00:00
     * */
    getLastDayInMonth: function (year, month) {
        if (!year || !month) {
            var date = new Date();
            var y = date.getFullYear();
            var m = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
            var now = new Date(y, m, 0);
            var lastDay = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
            return y + '-' + m + '-' + lastDay + " " + "00" + ":" + "00" + ":" + "00";//获取当月最后一天日期

        } else if (month > 0 && month < 12) {
            var day = new Date(year, month, 0);
            var mon = parseInt(month) < 10 ? "0" + parseInt(month) : parseInt(month);
            return year + '-' + mon + '-' + day.getDate() + " " + "00" + ":" + "00" + ":" + "00";//获取当月最后一天日期
        } else {
            return year + '-' + "01" + '-' + "01" + " " + "00" + ":" + "00" + ":" + "00";
        }
    },

    //【五、随机相关】
    //随进产生颜色
    randomColor: function () {
        //randomNumber是下面定义的函数
        //写法1
        //return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';

        //写法2
        return '#' + Math.random().toString(16).substring(2).substr(0, 6);

        //写法3
        //var color='#',_index=this.randomNumber(15);
        //for(var i=0;i<6;i++){
        //color+='0123456789abcdef'[_index];
        //}
        //return color;
    },

    //随机返回一个范围(n1~n2)的数字,包括n1和n2
    /*
     n1:范围起始值
     n2:范围结束值
     * */
    randomNumber: function (n1, n2) {
        //eg1:randomNumber(5,10)
        //res1:返回5-10的随机整数，包括5，10
        if (arguments.length === 2) {
            return Math.round(n1 + Math.random() * (n2 - n1));
        }
        //eg2:randomNumber(10)
        //res2:返回0-10的随机整数，包括0，10
        else if (arguments.length === 1) {
            return Math.round(Math.random() * n1)
        }
        //eg3:randomNumber()
        //res3:返回0-255的随机整数，包括0，255
        else {
            return Math.round(Math.random() * 255)
        }
    },

    //【六、url参数相关】
    //设置url参数
    /*
     obj:参数对象
     eg:setUrlPara({'a':1,'b':2})
     res:a=1&b=2
     * */
    setUrlPara: function (obj) {
        var _rs = [];
        for (var p in obj) {
            if (obj[p] != null && obj[p] != '') {
                _rs.push(p + '=' + obj[p]);
            }
        }
        return _rs.join('&');
    },

    //获取url参数
    /*
     url:网页地址
     eg:getUrlPara('www.mwyking.com/userList?user=15246162&type=32333')
     res:{user: "15246162", type: "32333"}
     * */
    getUrlPara: function (url) {
        url = url ? url : window.location.href;
        var _pa = url.substring(url.indexOf('?') + 1),
            _arrS = _pa.split('&'),
            _rs = {};
        for (var i = 0, _len = _arrS.length; i < _len; i++) {
            var pos = _arrS[i].indexOf('=');
            if (pos == -1) {
                continue;
            }
            var name = _arrS[i].substring(0, pos),
                value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
            _rs[name] = value;
        }
        return _rs;
    },

    //【七、金钱相关】
    //金额大写转换
    /*
     n:金额，精确到小数点后三位(厘)
     eg1:rmbToUpper(2165112332)
     res1:人民币:贰拾壹亿陆仟伍佰壹拾壹万贰仟叁佰叁拾贰元整

     eg2:rmbToUpper(212332.265)
     res2:人民币:贰拾壹万贰仟叁佰叁拾贰元贰角陆分伍厘

     eg3:rmbToUpper(-212332.265)
     res3:欠人民币:贰拾壹万贰仟叁佰叁拾贰元贰角陆分伍厘
     * */
    rmbToUpper: function (n) {
        var fraction = ['角', '分', '厘'];
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
        var unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        var head = n < 0 ? '欠人民币:' : '人民币:';
        n = Math.abs(n);
        var s = '';
        for (var k = 0; k < fraction.length; k++) {
            s += (digit[Math.floor(n * 10 * Math.pow(10, k)) % 10] + fraction[k]).replace(/零./, '');
        }
        s = s || '整';
        n = Math.floor(n);
        for (var i = 0; i < unit[0].length && n > 0; i++) {
            var p = '';
            for (var j = 0; j < unit[1].length && n > 0; j++) {
                p = digit[n % 10] + unit[1][j] + p;
                n = Math.floor(n / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
    },

    //金钱格式化
    /*
     money:金额，精确到小数点后两位
     eg:formatMoney(-91654611.26)
     res:-91,654,611.26
     * */
    formatMoney: function (money) {
        var moneyStr = money.toString();
        return moneyStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        //es6写法，有bug，当存在小数位时，不符合
        //return moneyStr.split('').reverse().reduce(function (prev, next, index) {
        //    return (index % 3 ? next : next + ',') + prev;
        //});
    },

    //【八、cookie相关】
    //设置cookie
    /*
     key:键
     value:值
     iDay:数字型，单位天
     eg1:setCookie('account','seayao',0.1)
     res1:account seayao 2017-09-26T11:32:55.000Z

     eg2:setCookie('account','seayao',2)
     res2:account seayao 2017-09-28T09:12:24.000Z
     * */
    setCookie: function (key, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay);
        document.cookie = key + '=' + value + ';expires=' + oDate;
    },

    //获取cookie
    /*
     key:键
     eg:getCookie('account')
     res:seayao
     * */
    getCookie: function (key) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == key) {
                return arr2[1];
            }
        }
        return '';
    },

    //删除cookie
    /*
     key:键
     eg:removeCookie('account')
     res:
     * */
    removeCookie: function (key) {
        this.setCookie(key, 1, -1);
    },

    //【九、适配和DOM操作】
    //rem适配
    getFontSize: function () {
        var doc = document,
            win = window,
            size = 750;
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
                //如果屏幕大于size（size是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=size，防止font-size会超过100px
                if (clientWidth > size) {
                    clientWidth = size
                }
                //设置根元素font-size大小
                docEl.style.fontSize = 100 * (clientWidth / size) + 'px';
            };
        //屏幕大小改变，或者横竖屏切换时，触发函数
        win.addEventListener(resizeEvt, recalc, false);
        //文档加载完成时，触发函数
        doc.addEventListener('DOMContentLoaded', recalc, false);
    },


    //检测对象是否有哪个类名
    /*
     obj:DOM对象
     classStr:类名
     eg:hasClass(document.getElementsByClassName('sea')[0], 'sea')
     res:true
     * */
    hasClass: function (obj, classStr) {
        if (obj.className && this.trim(obj.className, 1) !== "") {
            var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
            return (arr.indexOf(classStr) == -1) ? false : true;
        }
        else {
            return false;
        }

    },

    //添加类名
    /*
     obj:DOM对象
     classStr:类名
     eg:addClass(document.getElementsByClassName('sea')[0], 'yao')
     res:<div class="sea yao">test</div>
     * */
    addClass: function (obj, classStr) {
        if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length >= 1) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (!this.hasClass(obj[i], classStr)) {
                    obj[i].className += " " + classStr;
                }
            }
        }
        else {
            if (!this.hasClass(obj, classStr)) {
                obj.className += " " + classStr;
            }
        }
    },


    //删除类名
    /*
     obj:DOM对象
     classStr:类名
     eg:removeClass(document.getElementsByClassName('sea')[0], 'sea')
     res:<div class="">test</div>
     * */
    removeClass: function (obj, classStr) {
        if ((this.istype(obj, 'array') || this.istype(obj, 'elements')) && obj.length > 1) {
            for (var i = 0, len = obj.length; i < len; i++) {
                if (this.hasClass(obj[i], classStr)) {
                    var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                    obj[i].className = obj[i].className.replace(reg, '');
                }
            }
        }
        else {
            if (this.hasClass(obj, classStr)) {
                var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
                obj.className = obj.className.replace(reg, '');
            }
        }
    },

    //替换类名("被替换的类名","替换的类名")
    /*
     obj:DOM对象
     oldName:原本已有类名
     newName:要替换成的新类名
     eg:replaceClass(document.getElementsByClassName('sea')[0], 'sea','seayao')
     res:<div class=" seayao">test</div>
     * */
    replaceClass: function (obj, oldName, newName) {
        this.removeClass(obj, oldName);
        this.addClass(obj, newName);
    },


    //获取兄弟节点
    /*
     obj:DOM对象
     opt:用来筛选结果，可选参数
     eg1:siblings(document.getElementsByClassName('brother1')[0])
     res1:返回类名为brother1的所有兄弟节点

     eg2:siblings(document.getElementsByClassName('brother1')[0],'#sea')
     res2:返回类名为brother1的所有兄弟节点
     * */
    siblings: function (obj, opt) {
        var a = []; //定义一个数组，用来存o的兄弟元素
        var p = obj.previousSibling;
        while (p) { //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
            if (p.nodeType === 1) {
                a.push(p);
            }
            p = p.previousSibling; //最后把上一个节点赋给p
        }
        a.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了
        var n = obj.nextSibling; //再取o的弟弟
        while (n) { //判断有没有下一个弟弟结点 n是nextSibling的意思
            if (n.nodeType === 1) {
                a.push(n);
            }
            n = n.nextSibling;
        }
        if (opt) {
            var _opt = opt.substr(1);
            var b = [];//定义一个数组，用于储存过滤a的数组
            if (opt[0] === '.') {
                b = a.filter(function (item) {
                    return item.className === _opt
                });
            }
            else if (opt[0] === '#') {
                b = a.filter(function (item) {
                    return item.id === _opt
                });
            }
            else {
                b = a.filter(function (item) {
                    return item.tagName.toLowerCase() === opt
                });
            }
            return b;
        }
        return a;
    },

    //设置样式(类似于jq的css方法)
    /*
     obj:DOM对象
     json:json格式
     eg:css(document.getElementsByClassName('brother1')[0],{'fontsSize':'32px'})
     * */
    css: function (obj, json) {
        for (var attr in json) {
            obj.style[attr] = json[attr];
        }
    },

    //注意:innerHTML是所有浏览器都支持的
    // innerText是IE浏览器和chrome浏览器支持的Firefox浏览器不支持
    // 其实innerHTML是W3C组织规定的属
    // 而innerText属性是IE浏览器自己的属性,不过后来的浏览器部分实现这个属性罢了
    //设置html
    html: function (obj) {
        if (arguments.length === 1) {
            return obj.innerHTML;
        } else if (arguments.length === 2) {
            obj.innerHTML = arguments[1];
        }
    },

    //设置文本内容
    text: function (obj) {
        if (arguments.length === 1) {
            return obj.innerHTML;
        } else if (arguments.length === 2) {
            obj.innerHTML = this.filterStr(arguments[1], 'html');
        }
    },

    //显示隐藏
    show: function (obj) {
        var blockArr = ['div', 'li', 'ul', 'ol', 'dl', 'table', 'article', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'hr', 'header', 'footer', 'details', 'summary', 'section', 'aside', '']
        if (blockArr.indexOf(obj.tagName.toLocaleLowerCase()) === -1) {
            obj.style.display = 'inline';
        }
        else {
            obj.style.display = 'block';
        }
    },
    hide: function (obj) {
        obj.style.display = "none";
    },

    //【十、AJAX相关】
    /* 封装ajax函数
     * @param {string}obj.type http连接的方式，包括POST和GET两种方式
     * @param {string}obj.url 发送请求的url
     * @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
     * @param {object}obj.data 发送的参数，格式为对象类型
     * @param {function}obj.success ajax发送并接收成功调用的回调函数
     * @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
     */
    /*
     eg:ajax({
     type: 'post',
     url: 'xxx',
     data: {
     keyword: ""
     },
     success: function (res) {
     console.log(JSON.parse(res))
     },
     error: function (err) {
     console.log(err)
     }
     });
     * */
    ajax: function (obj) {
        obj = obj || {};
        obj.type = obj.type.toUpperCase() || 'POST';
        obj.url = obj.url || '';
        obj.async = obj.async || true;
        obj.data = obj.data || null;
        obj.success = obj.success || function () {
            };
        obj.error = obj.error || function () {
            };
        var xmlHttp = null;
        if (XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        } else {
            xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        }
        var params = [];
        for (var key in obj.data) {
            params.push(key + '=' + obj.data[key]);
        }
        var postData = params.join('&');
        if (obj.type.toUpperCase() === 'POST') {
            xmlHttp.open(obj.type, obj.url, obj.async);
            xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
            xmlHttp.send(postData);
        } else if (obj.type.toUpperCase() === 'GET') {
            xmlHttp.open(obj.type, obj.url + '?' + postData, obj.async);
            xmlHttp.send(null);
        }
        //xmlHttp.onreadystatechange = function () {
        //    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        //        obj.success(xmlHttp.responseText);
        //    } else {
        //        obj.error(xmlHttp.responseText);
        //    }
        //};
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4) {
                //此处可添加一个complete()方法
                if (xmlHttp.status >= 200 && xmlHttp.status < 300 || xmlHttp.status == 304) {
                    obj.success(JSON.parse(xmlHttp.responseText));
                } else {
                    //建议将xmlHttp对象返回，有时候需要根据状态码来进行错误处理
                    obj.error(xmlHttp);
                }
            } else {
                //进行处理也可以忽略
            }
        };
    },

    //对上述ajax再进行封装,复用
    //doAjax: function (type, url, data, successFunc, errorFunc) {
    //    this.ajax({
    //        type: type,
    //        url: url,
    //        data: JSON.stringify(data),
    //        success: function (res) {
    //            successFunc(JSON.parse(res));
    //        },
    //        error: function (err) {
    //            errorFunc(err);
    //        }
    //    });
    //},

    //【十一、图片相关】
    //图片没加载出来时用一张图片代替
    /*
     原写法
     * */
    //imgLoadError: function (obj, url, cb) {
    //    var oImg = new Image(), _this = this;
    //    oImg.onerror = "";
    //    oImg.src = url;
    //    oImg.onerror = null;
    //    oImg.onload = function () {
    //        obj.src = oImg.src;
    //        if (cb && _this.istype(cb, 'function')) {
    //            cb(obj);
    //        }
    //    }
    //},

    /*
     obj:DOM对象
     url:图片地址
     errorUrl:图片备用(错误)地址
     cb:回调函数
     * */
    imgLoadError: function (obj, url, errorUrl, cb) {
        var oImg = new Image(), _this = this;
        oImg.src = url;
        oImg.onload = function () {
            obj.src = oImg.src;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        };
        oImg.onerror = function () {
            obj.src = errorUrl;
            if (cb && _this.istype(cb, 'function')) {
                cb(obj);
            }
        }
    },

    //图片滚动懒加载
    /*
     className:{string} 要遍历图片的类名
     num:{number}距离多少的时候开始加载,默认0
     比如，一张图片距离文档顶部3000，num参数设置200，那么在页面滚动到2800的时候，图片加载。不传num参数就滚动，num默认是0，页面滚动到3000就加载
     errorUrl:图片备用(错误)地址

     eg:html代码
     <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>
     <p><img data-src="lawyerOtherImg.jpg" class="load-img" width='528' height='304' /></p>...
     data-src储存src的数据，到需要加载的时候把data-src的值赋值给src属性，图片就会加载。

     window.onload = function () {
     pubSea.imgLazyLoad('load-img', 100, 'http://www.mwyking.com:8888/logo/chat.svg');
     window.onscroll = function () {
     pubSea.imgLazyLoad('load-img', 100, 'http://www.mwyking.com:8888/logo/chat.svg');
     }
     };
     * */
    imgLazyLoad: function (className, num, errorUrl) {
        var _className = className || 'ec-load-img', _num = num || 0, _this = this, _errorUrl = errorUrl || null;
        var oImgLoad = document.getElementsByClassName(_className);
        for (var i = 0, len = oImgLoad.length; i < len; i++) {
            if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - _num && !oImgLoad[i].isLoad) {
                //记录图片是否已经加载
                oImgLoad[i].isLoad = true;
                //设置过渡，当图片下来的时候有一个图片透明度变化
                oImgLoad[i].style.cssText = "transition: ''; opacity: 0;";
                if (oImgLoad[i].dataset) {
                    this.imgLoadError(oImgLoad[i], oImgLoad[i].dataset.src, _errorUrl, function (o) {
                        setTimeout(function () {
                            if (o.isLoad) {
                                _this.removeClass(o, _className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                } else {
                    this.imgLoadError(oImgLoad[i], oImgLoad[i].getAttribute("data-src"), _errorUrl, function (o) {
                        setTimeout(function () {
                            if (o.isLoad) {
                                _this.removeClass(o, _className);
                                o.style.cssText = "";
                            }
                        }, 1000)
                    });
                }
                (function (i) {
                    setTimeout(function () {
                        oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
                    }, 16)
                })(i);
            }
        }
    },

    //【十二、数据类型相关】
    //数据类型判断
    /*
     o:数据类型
     type:类型
     eg1:istype([])
     res1:[object Array]

     eg2:istype([], 'array')
     res2:true
     * */
    istype: function (o, type) {
        if (type) {
            var _type = type.toLowerCase();
        }
        switch (_type) {
            case 'string':
                return Object.prototype.toString.call(o) === '[object String]';
            case 'number':
                return Object.prototype.toString.call(o) === '[object Number]';
            case 'boolean':
                return Object.prototype.toString.call(o) === '[object Boolean]';
            case 'undefined':
                return Object.prototype.toString.call(o) === '[object Undefined]';
            case 'null':
                return Object.prototype.toString.call(o) === '[object Null]';
            case 'function':
                return Object.prototype.toString.call(o) === '[object Function]';
            case 'array':
                return Object.prototype.toString.call(o) === '[object Array]';
            case 'object':
                return Object.prototype.toString.call(o) === '[object Object]';
            case 'nan':
                return isNaN(o);
            case 'elements':
                return Object.prototype.toString.call(o).indexOf('HTML') !== -1
            default:
                return Object.prototype.toString.call(o)
        }
    },

    //【十三、浏览器类型相关】
    //浏览器类型获取和判断
    /*
     type:浏览器类型，非必须参数
     eg1:browserRedirect()
     res1:"pc"

     eg2:browserRedirect('weixin')
     res2:false
     * */
    browserRedirect: function (type) {
        if (type) {
            switch (type) {
                case 'android':
                    return navigator.userAgent.toLowerCase().indexOf('android') !== -1;
                case 'iphone':
                    return navigator.userAgent.toLowerCase().indexOf('iphone') !== -1;
                case 'ipad':
                    return navigator.userAgent.toLowerCase().indexOf('ipad') !== -1;
                case 'weixin':
                    return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1;
                default:
                    return navigator.userAgent.toLowerCase();
            }
        } else {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                return 'mobile';
            } else {
                return 'pc';
            }
        }
    },

    //【十四、函数相关】
    //函数节流
    /*
     fn:函数
     delay:延时触发,单位毫秒
     mustDelay:最少执行一次延迟时间,单位毫秒
     eg:
     var count = 0;
     function fn1() {
     count++;
     console.log(count);
     }
     document.onmousemove=delayFn(fn1,100,200)

     ps:100ms内连续触发的调用fn1,后一个调用会把前一个调用的等待处理掉,但每隔200ms至少执行一次fn1
     * */
    delayFn: function (fn, delay, mustDelay) {
        var timer = null;
        var t_start;
        return function () {
            var context = this, args = arguments, t_cur = +new Date();
            //先清理上一次的调用触发（上一次调用触发事件不执行）
            clearTimeout(timer);
            //如果不存触发时间，那么当前的时间就是触发时间
            if (!t_start) {
                t_start = t_cur;
            }
            //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
            if (t_cur - t_start >= mustDelay) {
                fn.apply(context, args);
                t_start = t_cur;
            }
            //否则延迟执行
            else {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            }
        };
    }
};


