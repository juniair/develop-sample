if(!Array.prototype.count) {
    Array.prototype.count = function(callback) {
        if(!callback) {
            return this.length;
        } else {
            return this.filter(callback).length;
        }
    }
}


// 배열의 데이터 중 조건이 하나라도 만족한지 체크
if(!Array.prototype.any) {
    Array.prototype.any = function(callback) {
        let item = this;


        return item.some(callback);
    }
}

// 배열의 데이터 중 조건이 모두 만족한지 체크
if(!Array.prototype.all) {
    Array.prototype.all = function(callback) {
        let item = this;

        return item.every(callback);
    }
}

// 배열 앞에서 count 만큼 생략하고 출력
if(!Array.prototype.skip) {
    Array.prototype.skip = function(count) {
        return this.slice(count, this.length);
    }
}

// 배열 앞에서 count 만큼 출력
if(!Array.prototype.take) {
    Array.prototype.take = function(count) {
        return this.slice(0, count);
    }
}

if(!Array.prototype.firstOrDefault) {
    Array.prototype.firstOrDefault = function(callback, defaultValue) {

        let items = this;

        if(!callback && !defaultValue) {
            return items.length <= 0 ? null : items[0];
        } else if(!callback && defaultValue) {
            return defaultValue;
        } else if(callback && !defaultValue) {
            let filterItems = items.filter(callback)
            let item = filterItems[0];
            return item;
        } else {
            let filterItems = items.filter(callback)
            let item = filterItems[0];
            if(!item) {
                return defaultValue;
            } else {
                return item;
            }
        }
    }
}

if(!Array.prototype.lastOrDefault) {
    Array.prototype.lastOrDefault = function(callback, defaultValue) {

        let items = this;

        if(!callback && !defaultValue) {
            return items.length <= 0 ? null : items[items.length - 1];
        } else if(!callback && defaultValue) {
            return defaultValue;
        } else if(callback && !defaultValue) {
            let filterItems = items.filter(callback)
            let item = null;
            if(0 < filterItems.length) {
                item =  filterItems[filterItems.length - 1]
            }
            return item;
        } else {
            let filterItems = items.filter(callback)

            let item = null;
            if(0 < filterItems.length) {
                item =  filterItems[filterItems.length - 1]
            }

            if(!item) {
                return defaultValue;
            } else {
                return item;
            }
        }
    }
}


if(!Array.prototype.where) {
    Array.prototype.where = function(callback) {
        if(!callback) {
            return this;
        } else {
            return this.filter(callback);
        }
    }
}

if(!Array.prototype.select) {
    Array.prototype.select = function(callback) {
        if(!callback) {
            return this;
        } else {
            return this.map(callback);
        }
    }
}



Date.prototype.format = function (f) {

    if (!this.valueOf()) return " ";



    var weekKorName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

    var weekKorShortName = ["일", "월", "화", "수", "목", "금", "토"];

    var weekEngName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var weekEngShortName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    var d = this;



    return f.replace(/(yyyy|yy|MM|dd|d|KS|KL|ES|EL|HH|hh|mm|ss|a\/p)/gi, function ($1) {

        switch ($1) {

            case "yyyy": return d.getFullYear(); // 년 (4자리)

            case "yy": return (d.getFullYear() % 1000).zf(2); // 년 (2자리)

            case "MM": return (d.getMonth() + 1).zf(2); // 월 (2자리)

            case "dd": return d.getDate().zf(2); // 일 (2자리)

            case "d" : return d.getDate().zf(1)

            case "KS": return weekKorShortName[d.getDay()]; // 요일 (짧은 한글)

            case "KL": return weekKorName[d.getDay()]; // 요일 (긴 한글)

            case "ES": return weekEngShortName[d.getDay()]; // 요일 (짧은 영어)

            case "EL": return weekEngName[d.getDay()]; // 요일 (긴 영어)

            case "HH": return d.getHours().zf(2); // 시간 (24시간 기준, 2자리)

            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2); // 시간 (12시간 기준, 2자리)

            case "mm": return d.getMinutes().zf(2); // 분 (2자리)

            case "ss": return d.getSeconds().zf(2); // 초 (2자리)

            case "a/p": return d.getHours() < 12 ? "오전" : "오후"; // 오전/오후 구분

            default: return $1;

        }

    });

};



String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };

String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };

Number.prototype.zf = function (len) { return this.toString().zf(len); };


Number.prototype.priceFormat = function() {
    let stringNumber = this + "";
    let length = stringNumber.length;
    let point = length % 3;

    let str = stringNumber.substring(0, point);
    while (point < length) {
        if(str != "") str += ",";
        str += stringNumber.substring(point, point + 3);
        point += 3;
    }

    return str
}