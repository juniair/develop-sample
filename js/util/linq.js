(function(B,p){var r=function(a){return a},C=function(){return!0},k=function(){},x=typeof p,A={"":r},e={createLambda:function(a){if(null==a)return r;if("string"===typeof a){var b=A[a];if(null!=b)return b;if(-1===a.indexOf("=>")){for(var c=RegExp("[$]+","g"),b=0,f;null!=(f=c.exec(a));)f=f[0].length,f>b&&(b=f);c=[];for(f=1;f<=b;f++){for(var d="",e=0;e<f;e++)d+="$";c.push(d)}b=Array.prototype.join.call(c,",");b=new Function(b,"return "+a)}else b=a.match(/^[(\s]*([^()]*?)[)\s]*=>(.*)/),b=new Function(b[1],
    b[2].match(/\breturn\b/)?b[2]:"return "+b[2]);return A[a]=b}return a},isIEnumerable:function(a){if(typeof Enumerator!==x)try{return new Enumerator(a),!0}catch(b){}return!1},defineProperty:null!=Object.defineProperties?function(a,b,c){Object.defineProperty(a,b,{enumerable:!1,configurable:!0,writable:!0,value:c})}:function(a,b,c){a[b]=c},compare:function(a,b){return a===b?0:a>b?1:-1},dispose:function(a){null!=a&&a.dispose()},hasNativeIteratorSupport:function(){return"undefined"!==typeof Symbol&&"undefined"!==
    typeof Symbol.iterator}},g=function(a,b,c){var f=new D,d=0;this.current=f.current;this.moveNext=function(){try{switch(d){case 0:d=1,a();case 1:if(b.apply(f))return!0;this.dispose();return!1;case 2:return!1}}catch(c){throw this.dispose(),c;}};this.dispose=function(){if(1==d)try{c()}finally{d=2}}},D=function(){var a=null;this.current=function(){return a};this.yieldReturn=function(b){a=b;return!0};this.yieldBreak=function(){return!1}},d=function(a){this.getEnumerator=a};d.Utils={};d.Utils.createLambda=
    function(a){return e.createLambda(a)};d.Utils.createEnumerable=function(a){return new d(a)};d.Utils.createEnumerator=function(a,b,c){return new g(a,b,c)};d.Utils.extendTo=function(a){var b=a.prototype;a===Array?(a=m.prototype,e.defineProperty(b,"getSource",function(){return this})):(a=d.prototype,e.defineProperty(b,"getEnumerator",function(){return d.from(this).getEnumerator()}));for(var c in a){var f=a[c];if(b[c]!=f){if(null!=b[c]&&(c+="ByLinq",b[c]==f))continue;f instanceof Function&&e.defineProperty(b,
    c,f)}}};d.choice=function(){var a=arguments;return new d(function(){return new g(function(){a=a[0]instanceof Array?a[0]:null!=a[0].getEnumerator?a[0].toArray():a},function(){return this.yieldReturn(a[Math.floor(Math.random()*a.length)])},k)})};d.cycle=function(){var a=arguments;return new d(function(){var b=0;return new g(function(){a=a[0]instanceof Array?a[0]:null!=a[0].getEnumerator?a[0].toArray():a},function(){b>=a.length&&(b=0);return this.yieldReturn(a[b++])},k)})};d.empty=function(){return new d(function(){return new g(k,
    function(){return!1},k)})};d.from=function(a){if(null==a)return d.empty();if(a instanceof d)return a;if("number"==typeof a||"boolean"==typeof a)return d.repeat(a,1);if("string"==typeof a)return new d(function(){var b=0;return new g(k,function(){return b<a.length?this.yieldReturn(a.charAt(b++)):!1},k)});if("function"!=typeof a){if("number"==typeof a.length)return new m(a);if("undefined"!==typeof Symbol&&"undefined"!==typeof a[Symbol.iterator])return new d(function(){return new g(k,function(){var b=
    a.next();return b.done?!1:this.yieldReturn(b.value)},k)});if(!(a instanceof Object)&&e.isIEnumerable(a))return new d(function(){var b=!0,c;return new g(function(){c=new Enumerator(a)},function(){b?b=!1:c.moveNext();return c.atEnd()?!1:this.yieldReturn(c.item())},k)});if("object"===typeof Windows&&"function"===typeof a.first)return new d(function(){var b=!0,c;return new g(function(){c=a.first()},function(){b?b=!1:c.moveNext();return c.hasCurrent?this.yieldReturn(c.current):this.yieldBreak()},k)})}return new d(function(){var b=
    [],c=0;return new g(function(){for(var c in a){var d=a[c];d instanceof Function||!Object.prototype.hasOwnProperty.call(a,c)||b.push({key:c,value:d})}},function(){return c<b.length?this.yieldReturn(b[c++]):!1},k)})};d.make=function(a){return d.repeat(a,1)};d.matches=function(a,b,c){null==c&&(c="");b instanceof RegExp&&(c+=b.ignoreCase?"i":"",c+=b.multiline?"m":"",b=b.source);-1===c.indexOf("g")&&(c+="g");return new d(function(){var f;return new g(function(){f=RegExp(b,c)},function(){var b=f.exec(a);
    return b?this.yieldReturn(b):!1},k)})};d.range=function(a,b,c){null==c&&(c=1);return new d(function(){var f,d=0;return new g(function(){f=a-c},function(){return d++<b?this.yieldReturn(f+=c):this.yieldBreak()},k)})};d.rangeDown=function(a,b,c){null==c&&(c=1);return new d(function(){var f,d=0;return new g(function(){f=a+c},function(){return d++<b?this.yieldReturn(f-=c):this.yieldBreak()},k)})};d.rangeTo=function(a,b,c){null==c&&(c=1);return a<b?new d(function(){var f;return new g(function(){f=a-c},
    function(){var a=f+=c;return a<=b?this.yieldReturn(a):this.yieldBreak()},k)}):new d(function(){var f;return new g(function(){f=a+c},function(){var a=f-=c;return a>=b?this.yieldReturn(a):this.yieldBreak()},k)})};d.repeat=function(a,b){return null!=b?d.repeat(a).take(b):new d(function(){return new g(k,function(){return this.yieldReturn(a)},k)})};d.repeatWithFinalize=function(a,b){a=e.createLambda(a);b=e.createLambda(b);return new d(function(){var c;return new g(function(){c=a()},function(){return this.yieldReturn(c)},
    function(){null!=c&&(b(c),c=null)})})};d.generate=function(a,b){if(null!=b)return d.generate(a).take(b);a=e.createLambda(a);return new d(function(){return new g(k,function(){return this.yieldReturn(a())},k)})};d.toInfinity=function(a,b){null==a&&(a=0);null==b&&(b=1);return new d(function(){var c;return new g(function(){c=a-b},function(){return this.yieldReturn(c+=b)},k)})};d.toNegativeInfinity=function(a,b){null==a&&(a=0);null==b&&(b=1);return new d(function(){var c;return new g(function(){c=a+b},
    function(){return this.yieldReturn(c-=b)},k)})};d.unfold=function(a,b){b=e.createLambda(b);return new d(function(){var c=!0,f;return new g(k,function(){if(c)return c=!1,f=a,this.yieldReturn(f);f=b(f);return this.yieldReturn(f)},k)})};d.defer=function(a){return new d(function(){var b;return new g(function(){b=d.from(a()).getEnumerator()},function(){return b.moveNext()?this.yieldReturn(b.current()):this.yieldBreak()},function(){e.dispose(b)})})};d.prototype.traverseBreadthFirst=function(a,b){var c=
    this;a=e.createLambda(a);b=e.createLambda(b);return new d(function(){var f,h=0,l=[];return new g(function(){f=c.getEnumerator()},function(){for(;;){if(f.moveNext())return l.push(f.current()),this.yieldReturn(b(f.current(),h));var c=d.from(l).selectMany(function(b){return a(b)});if(c.any())h++,l=[],e.dispose(f),f=c.getEnumerator();else return!1}},function(){e.dispose(f)})})};d.prototype.traverseDepthFirst=function(a,b){var c=this;a=e.createLambda(a);b=e.createLambda(b);return new d(function(){var f=
    [],h;return new g(function(){h=c.getEnumerator()},function(){for(;;){if(h.moveNext()){var c=b(h.current(),f.length);f.push(h);h=d.from(a(h.current())).getEnumerator();return this.yieldReturn(c)}if(0>=f.length)return!1;e.dispose(h);h=f.pop()}},function(){try{e.dispose(h)}finally{d.from(f).forEach(function(a){a.dispose()})}})})};d.prototype.flatten=function(){var a=this;return new d(function(){var b,c=null;return new g(function(){b=a.getEnumerator()},function(){for(;;){if(null!=c){if(c.moveNext())return this.yieldReturn(c.current());
    c=null}if(b.moveNext())if(b.current()instanceof Array){e.dispose(c);c=d.from(b.current()).selectMany(r).flatten().getEnumerator();continue}else return this.yieldReturn(b.current());return!1}},function(){try{e.dispose(b)}finally{e.dispose(c)}})})};d.prototype.pairwise=function(a){var b=this;a=e.createLambda(a);return new d(function(){var c;return new g(function(){c=b.getEnumerator();c.moveNext()},function(){var b=c.current();return c.moveNext()?this.yieldReturn(a(b,c.current())):!1},function(){e.dispose(c)})})};
    d.prototype.scan=function(a,b){var c;null==b?(b=e.createLambda(a),c=!1):(b=e.createLambda(b),c=!0);var f=this;return new d(function(){var d,l,n=!0;return new g(function(){d=f.getEnumerator()},function(){if(n){n=!1;if(c)return this.yieldReturn(l=a);if(d.moveNext())return this.yieldReturn(l=d.current())}return d.moveNext()?this.yieldReturn(l=b(l,d.current())):!1},function(){e.dispose(d)})})};d.prototype.select=function(a){a=e.createLambda(a);if(1>=a.length)return new t(this,null,a);var b=this;return new d(function(){var c,
    d=0;return new g(function(){c=b.getEnumerator()},function(){return c.moveNext()?this.yieldReturn(a(c.current(),d++)):!1},function(){e.dispose(c)})})};d.prototype.selectMany=function(a,b){var c=this;a=e.createLambda(a);null==b&&(b=function(a,b){return b});b=e.createLambda(b);return new d(function(){var f,h=p,l=0;return new g(function(){f=c.getEnumerator()},function(){if(h===p&&!f.moveNext())return!1;do{if(null==h){var c=a(f.current(),l++);h=d.from(c).getEnumerator()}if(h.moveNext())return this.yieldReturn(b(f.current(),
    h.current()));e.dispose(h);h=null}while(f.moveNext());return!1},function(){try{e.dispose(f)}finally{e.dispose(h)}})})};d.prototype.where=function(a){a=e.createLambda(a);if(1>=a.length)return new u(this,a);var b=this;return new d(function(){var c,d=0;return new g(function(){c=b.getEnumerator()},function(){for(;c.moveNext();)if(a(c.current(),d++))return this.yieldReturn(c.current());return!1},function(){e.dispose(c)})})};d.prototype.choose=function(a){a=e.createLambda(a);var b=this;return new d(function(){var c,
    d=0;return new g(function(){c=b.getEnumerator()},function(){for(;c.moveNext();){var b=a(c.current(),d++);if(null!=b)return this.yieldReturn(b)}return this.yieldBreak()},function(){e.dispose(c)})})};d.prototype.ofType=function(a){var b;switch(a){case Number:b="number";break;case String:b="string";break;case Boolean:b="boolean";break;case Function:b="function";break;default:b=null}return null===b?this.where(function(b){return b instanceof a}):this.where(function(a){return typeof a===b})};d.prototype.zip=
    function(){var a=arguments,b=e.createLambda(arguments[arguments.length-1]),c=this;if(2==arguments.length){var f=arguments[0];return new d(function(){var a,l,n=0;return new g(function(){a=c.getEnumerator();l=d.from(f).getEnumerator()},function(){return a.moveNext()&&l.moveNext()?this.yieldReturn(b(a.current(),l.current(),n++)):!1},function(){try{e.dispose(a)}finally{e.dispose(l)}})})}return new d(function(){var f,l=0;return new g(function(){var b=d.make(c).concat(d.from(a).takeExceptLast().select(d.from)).select(function(a){return a.getEnumerator()}).toArray();
    f=d.from(b)},function(){if(f.all(function(a){return a.moveNext()})){var a=f.select(function(a){return a.current()}).toArray();a.push(l++);return this.yieldReturn(b.apply(null,a))}return this.yieldBreak()},function(){d.from(f).forEach(e.dispose)})})};d.prototype.merge=function(){var a=arguments,b=this;return new d(function(){var c,f=-1;return new g(function(){c=d.make(b).concat(d.from(a).select(d.from)).select(function(a){return a.getEnumerator()}).toArray()},function(){for(;0<c.length;){f=f>=c.length-
    1?0:f+1;var a=c[f];if(a.moveNext())return this.yieldReturn(a.current());a.dispose();c.splice(f--,1)}return this.yieldBreak()},function(){d.from(c).forEach(e.dispose)})})};d.prototype.join=function(a,b,c,f,h){b=e.createLambda(b);c=e.createLambda(c);f=e.createLambda(f);h=e.createLambda(h);var l=this;return new d(function(){var n,q,k=null,m=0;return new g(function(){n=l.getEnumerator();q=d.from(a).toLookup(c,r,h)},function(){for(;;){if(null!=k){var a=k[m++];if(a!==p)return this.yieldReturn(f(n.current(),
    a));m=0}if(n.moveNext())a=b(n.current()),k=q.get(a).toArray();else return!1}},function(){e.dispose(n)})})};d.prototype.groupJoin=function(a,b,c,f,h){b=e.createLambda(b);c=e.createLambda(c);f=e.createLambda(f);h=e.createLambda(h);var l=this;return new d(function(){var n=l.getEnumerator(),q=null;return new g(function(){n=l.getEnumerator();q=d.from(a).toLookup(c,r,h)},function(){if(n.moveNext()){var a=q.get(b(n.current()));return this.yieldReturn(f(n.current(),a))}return!1},function(){e.dispose(n)})})};
    d.prototype.all=function(a){a=e.createLambda(a);var b=!0;this.forEach(function(c){if(!a(c))return b=!1});return b};d.prototype.any=function(a){a=e.createLambda(a);var b=this.getEnumerator();try{if(0==arguments.length)return b.moveNext();for(;b.moveNext();)if(a(b.current()))return!0;return!1}finally{e.dispose(b)}};d.prototype.isEmpty=function(){return!this.any()};d.prototype.concat=function(){var a=this;if(1==arguments.length){var b=arguments[0];return new d(function(){var c,h;return new g(function(){c=
    a.getEnumerator()},function(){if(null==h){if(c.moveNext())return this.yieldReturn(c.current());h=d.from(b).getEnumerator()}return h.moveNext()?this.yieldReturn(h.current()):!1},function(){try{e.dispose(c)}finally{e.dispose(h)}})})}var c=arguments;return new d(function(){var b;return new g(function(){b=d.make(a).concat(d.from(c).select(d.from)).select(function(a){return a.getEnumerator()}).toArray()},function(){for(;0<b.length;){var a=b[0];if(a.moveNext())return this.yieldReturn(a.current());a.dispose();
    b.splice(0,1)}return this.yieldBreak()},function(){d.from(b).forEach(e.dispose)})})};d.prototype.insert=function(a,b){var c=this;return new d(function(){var f,h,l=0,n=!1;return new g(function(){f=c.getEnumerator();h=d.from(b).getEnumerator()},function(){return l==a&&h.moveNext()?(n=!0,this.yieldReturn(h.current())):f.moveNext()?(l++,this.yieldReturn(f.current())):!n&&h.moveNext()?this.yieldReturn(h.current()):!1},function(){try{e.dispose(f)}finally{e.dispose(h)}})})};d.prototype.alternate=function(a){var b=
    this;return new d(function(){var c,f,h,l;return new g(function(){h=a instanceof Array||null!=a.getEnumerator?d.from(d.from(a).toArray()):d.make(a);f=b.getEnumerator();f.moveNext()&&(c=f.current())},function(){for(;;){if(null!=l){if(l.moveNext())return this.yieldReturn(l.current());l=null}if(null==c&&f.moveNext())c=f.current(),l=h.getEnumerator();else{if(null!=c){var a=c;c=null;return this.yieldReturn(a)}return this.yieldBreak()}}},function(){try{e.dispose(f)}finally{e.dispose(l)}})})};d.prototype.contains=
    function(a,b){b=e.createLambda(b);var c=this.getEnumerator();try{for(;c.moveNext();)if(b(c.current())===a)return!0;return!1}finally{e.dispose(c)}};d.prototype.defaultIfEmpty=function(a){var b=this;a===p&&(a=null);return new d(function(){var c,d=!0;return new g(function(){c=b.getEnumerator()},function(){return c.moveNext()?(d=!1,this.yieldReturn(c.current())):d?(d=!1,this.yieldReturn(a)):!1},function(){e.dispose(c)})})};d.prototype.distinct=function(a){return this.except(d.empty(),a)};d.prototype.distinctUntilChanged=
    function(a){a=e.createLambda(a);var b=this;return new d(function(){var c,d,h;return new g(function(){c=b.getEnumerator()},function(){for(;c.moveNext();){var b=a(c.current());if(h)return h=!1,d=b,this.yieldReturn(c.current());if(d!==b)return d=b,this.yieldReturn(c.current())}return this.yieldBreak()},function(){e.dispose(c)})})};d.prototype.except=function(a,b){b=e.createLambda(b);var c=this;return new d(function(){var f,h;return new g(function(){f=c.getEnumerator();h=new v(b);d.from(a).forEach(function(a){h.add(a)})},
    function(){for(;f.moveNext();){var a=f.current();if(!h.contains(a))return h.add(a),this.yieldReturn(a)}return!1},function(){e.dispose(f)})})};d.prototype.intersect=function(a,b){b=e.createLambda(b);var c=this;return new d(function(){var f,h,l;return new g(function(){f=c.getEnumerator();h=new v(b);d.from(a).forEach(function(a){h.add(a)});l=new v(b)},function(){for(;f.moveNext();){var a=f.current();if(!l.contains(a)&&h.contains(a))return l.add(a),this.yieldReturn(a)}return!1},function(){e.dispose(f)})})};
    d.prototype.sequenceEqual=function(a,b){b=e.createLambda(b);var c=this.getEnumerator();try{var f=d.from(a).getEnumerator();try{for(;c.moveNext();)if(!f.moveNext()||b(c.current())!==b(f.current()))return!1;return f.moveNext()?!1:!0}finally{e.dispose(f)}}finally{e.dispose(c)}};d.prototype.union=function(a,b){b=e.createLambda(b);var c=this;return new d(function(){var f,h,l;return new g(function(){f=c.getEnumerator();l=new v(b)},function(){var b;if(h===p){for(;f.moveNext();)if(b=f.current(),!l.contains(b))return l.add(b),
    this.yieldReturn(b);h=d.from(a).getEnumerator()}for(;h.moveNext();)if(b=h.current(),!l.contains(b))return l.add(b),this.yieldReturn(b);return!1},function(){try{e.dispose(f)}finally{e.dispose(h)}})})};d.prototype.orderBy=function(a,b){return new s(this,a,b,!1)};d.prototype.orderByDescending=function(a,b){return new s(this,a,b,!0)};d.prototype.reverse=function(){var a=this;return new d(function(){var b,c;return new g(function(){b=a.toArray();c=b.length},function(){return 0<c?this.yieldReturn(b[--c]):
    !1},k)})};d.prototype.shuffle=function(){var a=this;return new d(function(){var b;return new g(function(){b=a.toArray()},function(){if(0<b.length){var a=Math.floor(Math.random()*b.length);return this.yieldReturn(b.splice(a,1)[0])}return!1},k)})};d.prototype.weightedSample=function(a){a=e.createLambda(a);var b=this;return new d(function(){var c,d=0;return new g(function(){c=b.choose(function(b){var c=a(b);if(0>=c)return null;d+=c;return{value:b,bound:d}}).toArray()},function(){if(0<c.length){for(var a=
    Math.floor(Math.random()*d)+1,b=-1,e=c.length;1<e-b;){var g=Math.floor((b+e)/2);c[g].bound>=a?e=g:b=g}return this.yieldReturn(c[e].value)}return this.yieldBreak()},k)})};d.prototype.groupBy=function(a,b,c,f){var h=this;a=e.createLambda(a);b=e.createLambda(b);null!=c&&(c=e.createLambda(c));f=e.createLambda(f);return new d(function(){var d;return new g(function(){d=h.toLookup(a,b,f).toEnumerable().getEnumerator()},function(){for(;d.moveNext();)return null==c?this.yieldReturn(d.current()):this.yieldReturn(c(d.current().key(),
    d.current()));return!1},function(){e.dispose(d)})})};d.prototype.partitionBy=function(a,b,c,f){var h=this;a=e.createLambda(a);b=e.createLambda(b);f=e.createLambda(f);var l;null==c?(l=!1,c=function(a,b){return new y(a,b)}):(l=!0,c=e.createLambda(c));return new d(function(){var n,q,k,m=[];return new g(function(){n=h.getEnumerator();n.moveNext()&&(q=a(n.current()),k=f(q),m.push(b(n.current())))},function(){for(var h;!0==(h=n.moveNext());)if(k===f(a(n.current())))m.push(b(n.current()));else break;if(0<
    m.length){var e=l?c(q,d.from(m)):c(q,m);h?(q=a(n.current()),k=f(q),m=[b(n.current())]):m=[];return this.yieldReturn(e)}return!1},function(){e.dispose(n)})})};d.prototype.buffer=function(a){var b=this;return new d(function(){var c;return new g(function(){c=b.getEnumerator()},function(){for(var b=[],d=0;c.moveNext();)if(b.push(c.current()),++d>=a)return this.yieldReturn(b);return 0<b.length?this.yieldReturn(b):!1},function(){e.dispose(c)})})};d.prototype.aggregate=function(a,b,c){c=e.createLambda(c);
    return c(this.scan(a,b,c).last())};d.prototype.average=function(a){a=e.createLambda(a);var b=0,c=0;this.forEach(function(d){b+=a(d);++c});return b/c};d.prototype.count=function(a){a=null==a?C:e.createLambda(a);var b=0;this.forEach(function(c,d){a(c,d)&&++b});return b};d.prototype.max=function(a){null==a&&(a=r);return this.select(a).aggregate(function(a,c){return a>c?a:c})};d.prototype.min=function(a){null==a&&(a=r);return this.select(a).aggregate(function(a,c){return a<c?a:c})};d.prototype.maxBy=
    function(a){a=e.createLambda(a);return this.aggregate(function(b,c){return a(b)>a(c)?b:c})};d.prototype.minBy=function(a){a=e.createLambda(a);return this.aggregate(function(b,c){return a(b)<a(c)?b:c})};d.prototype.sum=function(a){null==a&&(a=r);return this.select(a).aggregate(0,function(a,c){return a+c})};d.prototype.elementAt=function(a){var b,c=!1;this.forEach(function(d,h){if(h==a)return b=d,c=!0,!1});if(!c)throw Error("index is less than 0 or greater than or equal to the number of elements in source.");
    return b};d.prototype.elementAtOrDefault=function(a,b){b===p&&(b=null);var c,d=!1;this.forEach(function(b,e){if(e==a)return c=b,d=!0,!1});return d?c:b};d.prototype.first=function(a){if(null!=a)return this.where(a).first();var b,c=!1;this.forEach(function(a){b=a;c=!0;return!1});if(!c)throw Error("first:No element satisfies the condition.");return b};d.prototype.firstOrDefault=function(a,b){if(a!==p){if("function"===typeof a||"function"===typeof e.createLambda(a))return this.where(a).firstOrDefault(p,
    b);b=a}var c,d=!1;this.forEach(function(a){c=a;d=!0;return!1});return d?c:b};d.prototype.last=function(a){if(null!=a)return this.where(a).last();var b,c=!1;this.forEach(function(a){c=!0;b=a});if(!c)throw Error("last:No element satisfies the condition.");return b};d.prototype.lastOrDefault=function(a,b){if(a!==p){if("function"===typeof a||"function"===typeof e.createLambda(a))return this.where(a).lastOrDefault(p,b);b=a}var c,d=!1;this.forEach(function(a){d=!0;c=a});return d?c:b};d.prototype.single=
    function(a){if(null!=a)return this.where(a).single();var b,c=!1;this.forEach(function(a){if(c)throw Error("single:sequence contains more than one element.");c=!0;b=a});if(!c)throw Error("single:No element satisfies the condition.");return b};d.prototype.singleOrDefault=function(a,b){b===p&&(b=null);if(null!=a)return this.where(a).singleOrDefault(null,b);var c,d=!1;this.forEach(function(a){if(d)throw Error("single:sequence contains more than one element.");d=!0;c=a});return d?c:b};d.prototype.skip=
    function(a){var b=this;return new d(function(){var c,d=0;return new g(function(){for(c=b.getEnumerator();d++<a&&c.moveNext(););},function(){return c.moveNext()?this.yieldReturn(c.current()):!1},function(){e.dispose(c)})})};d.prototype.skipWhile=function(a){a=e.createLambda(a);var b=this;return new d(function(){var c,d=0,h=!1;return new g(function(){c=b.getEnumerator()},function(){for(;!h;)if(c.moveNext()){if(!a(c.current(),d++))return h=!0,this.yieldReturn(c.current())}else return!1;return c.moveNext()?
    this.yieldReturn(c.current()):!1},function(){e.dispose(c)})})};d.prototype.take=function(a){var b=this;return new d(function(){var c,d=0;return new g(function(){c=b.getEnumerator()},function(){return d++<a&&c.moveNext()?this.yieldReturn(c.current()):!1},function(){e.dispose(c)})})};d.prototype.takeWhile=function(a){a=e.createLambda(a);var b=this;return new d(function(){var c,d=0;return new g(function(){c=b.getEnumerator()},function(){return c.moveNext()&&a(c.current(),d++)?this.yieldReturn(c.current()):
    !1},function(){e.dispose(c)})})};d.prototype.takeExceptLast=function(a){null==a&&(a=1);var b=this;return new d(function(){if(0>=a)return b.getEnumerator();var c,d=[];return new g(function(){c=b.getEnumerator()},function(){for(;c.moveNext();){if(d.length==a)return d.push(c.current()),this.yieldReturn(d.shift());d.push(c.current())}return!1},function(){e.dispose(c)})})};d.prototype.takeFromLast=function(a){if(0>=a||null==a)return d.empty();var b=this;return new d(function(){var c,f,h=[];return new g(function(){c=
    b.getEnumerator()},function(){for(;c.moveNext();)h.length==a&&h.shift(),h.push(c.current());null==f&&(f=d.from(h).getEnumerator());return f.moveNext()?this.yieldReturn(f.current()):!1},function(){e.dispose(f)})})};d.prototype.indexOf=function(a){var b=null;"function"===typeof a?this.forEach(function(c,d){if(a(c,d))return b=d,!1}):this.forEach(function(c,d){if(c===a)return b=d,!1});return null!==b?b:-1};d.prototype.lastIndexOf=function(a){var b=-1;"function"===typeof a?this.forEach(function(c,d){a(c,
    d)&&(b=d)}):this.forEach(function(c,d){c===a&&(b=d)});return b};d.prototype.cast=function(){return this};d.prototype.asEnumerable=function(){return d.from(this)};d.prototype.toArray=function(){var a=[];this.forEach(function(b){a.push(b)});return a};d.prototype.toLookup=function(a,b,c){a=e.createLambda(a);b=e.createLambda(b);c=e.createLambda(c);var d=new v(c);this.forEach(function(c){var e=a(c);c=b(c);var g=d.get(e);g!==p?g.push(c):d.add(e,[c])});return new E(d)};d.prototype.toObject=function(a,b){a=
    e.createLambda(a);b=e.createLambda(b);var c={};this.forEach(function(d){c[a(d)]=b(d)});return c};d.prototype.toDictionary=function(a,b,c){a=e.createLambda(a);b=e.createLambda(b);c=e.createLambda(c);var d=new v(c);this.forEach(function(c){d.add(a(c),b(c))});return d};d.prototype.toJSONString=function(a,b){if(typeof JSON===x||null==JSON.stringify)throw Error("toJSONString can't find JSON.stringify. This works native JSON support Browser or include json2.js");return JSON.stringify(this.toArray(),a,b)};
    d.prototype.toJoinedString=function(a,b){null==a&&(a="");null==b&&(b=r);return this.select(b).toArray().join(a)};d.prototype.doAction=function(a){var b=this;a=e.createLambda(a);return new d(function(){var c,d=0;return new g(function(){c=b.getEnumerator()},function(){return c.moveNext()?(a(c.current(),d++),this.yieldReturn(c.current())):!1},function(){e.dispose(c)})})};d.prototype.forEach=function(a){a=e.createLambda(a);var b=0,c=this.getEnumerator();try{for(;c.moveNext()&&!1!==a(c.current(),b++););
    }finally{e.dispose(c)}};d.prototype.write=function(a,b){null==a&&(a="");b=e.createLambda(b);var c=!0;this.forEach(function(d){c?c=!1:document.write(a);document.write(b(d))})};d.prototype.writeLine=function(a){a=e.createLambda(a);this.forEach(function(b){document.writeln(a(b)+"<br />")})};d.prototype.force=function(){var a=this.getEnumerator();try{for(;a.moveNext(););}finally{e.dispose(a)}};d.prototype.letBind=function(a){a=e.createLambda(a);var b=this;return new d(function(){var c;return new g(function(){c=
    d.from(a(b)).getEnumerator()},function(){return c.moveNext()?this.yieldReturn(c.current()):!1},function(){e.dispose(c)})})};d.prototype.share=function(){var a=this,b,c=!1;return new z(function(){return new g(function(){null==b&&(b=a.getEnumerator())},function(){if(c)throw Error("enumerator is disposed");return b.moveNext()?this.yieldReturn(b.current()):!1},k)},function(){c=!0;e.dispose(b)})};d.prototype.memoize=function(){var a=this,b,c,d=!1;return new z(function(){var e=-1;return new g(function(){null==
    c&&(c=a.getEnumerator(),b=[])},function(){if(d)throw Error("enumerator is disposed");e++;return b.length<=e?c.moveNext()?this.yieldReturn(b[e]=c.current()):!1:this.yieldReturn(b[e])},k)},function(){d=!0;e.dispose(c);b=null})};e.hasNativeIteratorSupport()&&(d.prototype[Symbol.iterator]=function(){return{enumerator:this.getEnumerator(),next:function(){return this.enumerator.moveNext()?{done:!1,value:this.enumerator.current()}:{done:!0}}}});d.prototype.catchError=function(a){a=e.createLambda(a);var b=
    this;return new d(function(){var c;return new g(function(){c=b.getEnumerator()},function(){try{return c.moveNext()?this.yieldReturn(c.current()):!1}catch(b){return a(b),!1}},function(){e.dispose(c)})})};d.prototype.finallyAction=function(a){a=e.createLambda(a);var b=this;return new d(function(){var c;return new g(function(){c=b.getEnumerator()},function(){return c.moveNext()?this.yieldReturn(c.current()):!1},function(){try{e.dispose(c)}finally{a()}})})};d.prototype.log=function(a){a=e.createLambda(a);
    return this.doAction(function(b){typeof console!==x&&console.log(a(b))})};d.prototype.trace=function(a,b){null==a&&(a="Trace");b=e.createLambda(b);return this.doAction(function(c){typeof console!==x&&console.log(a,b(c))})};var s=function(a,b,c,d,h){this.source=a;this.keySelector=e.createLambda(b);this.descending=d;this.parent=h;c&&(this.comparer=e.createLambda(c))};s.prototype=new d;s.prototype.createOrderedEnumerable=function(a,b,c){return new s(this.source,a,b,c,this)};s.prototype.thenBy=function(a,
    b){return this.createOrderedEnumerable(a,b,!1)};s.prototype.thenByDescending=function(a,b){return this.createOrderedEnumerable(a,b,!0)};s.prototype.getEnumerator=function(){var a=this,b,c,d=0;return new g(function(){b=[];c=[];a.source.forEach(function(a,d){b.push(a);c.push(d)});var d=w.create(a,null);d.GenerateKeys(b);c.sort(function(a,b){return d.compare(a,b)})},function(){return d<c.length?this.yieldReturn(b[c[d++]]):!1},k)};var w=function(a,b,c,d){this.keySelector=a;this.descending=c;this.child=
    d;this.comparer=b;this.keys=null};w.create=function(a,b){var c=new w(a.keySelector,a.comparer,a.descending,b);return null!=a.parent?w.create(a.parent,c):c};w.prototype.GenerateKeys=function(a){for(var b=a.length,c=this.keySelector,d=Array(b),e=0;e<b;e++)d[e]=c(a[e]);this.keys=d;null!=this.child&&this.child.GenerateKeys(a)};w.prototype.compare=function(a,b){var c=this.comparer?this.comparer(this.keys[a],this.keys[b]):e.compare(this.keys[a],this.keys[b]);return 0==c?null!=this.child?this.child.compare(a,
    b):e.compare(a,b):this.descending?-c:c};var z=function(a,b){this.dispose=b;this.getEnumerator=a};z.prototype=new d;var m=function(a){this.getSource=function(){return a}};m.prototype=new d;m.prototype.any=function(a){return null==a?0<this.getSource().length:d.prototype.any.apply(this,arguments)};m.prototype.count=function(a){return null==a?this.getSource().length:d.prototype.count.apply(this,arguments)};m.prototype.elementAt=function(a){var b=this.getSource();return 0<=a&&a<b.length?b[a]:d.prototype.elementAt.apply(this,
    arguments)};m.prototype.elementAtOrDefault=function(a,b){b===p&&(b=null);var c=this.getSource();return 0<=a&&a<c.length?c[a]:b};m.prototype.first=function(a){var b=this.getSource();return null==a&&0<b.length?b[0]:d.prototype.first.apply(this,arguments)};m.prototype.firstOrDefault=function(a,b){if(a!==p)return d.prototype.firstOrDefault.apply(this,arguments);b=a;var c=this.getSource();return 0<c.length?c[0]:b};m.prototype.last=function(a){var b=this.getSource();return null==a&&0<b.length?b[b.length-
    1]:d.prototype.last.apply(this,arguments)};m.prototype.lastOrDefault=function(a,b){if(a!==p)return d.prototype.lastOrDefault.apply(this,arguments);b=a;var c=this.getSource();return 0<c.length?c[c.length-1]:b};m.prototype.skip=function(a){var b=this.getSource();return new d(function(){var c;return new g(function(){c=0>a?0:a},function(){return c<b.length?this.yieldReturn(b[c++]):!1},k)})};m.prototype.takeExceptLast=function(a){null==a&&(a=1);return this.take(this.getSource().length-a)};m.prototype.takeFromLast=
    function(a){return this.skip(this.getSource().length-a)};m.prototype.reverse=function(){var a=this.getSource();return new d(function(){var b;return new g(function(){b=a.length},function(){return 0<b?this.yieldReturn(a[--b]):!1},k)})};m.prototype.sequenceEqual=function(a,b){return(a instanceof m||a instanceof Array)&&null==b&&d.from(a).count()!=this.count()?!1:d.prototype.sequenceEqual.apply(this,arguments)};m.prototype.toJoinedString=function(a,b){var c=this.getSource();if(null!=b||!(c instanceof
    Array))return d.prototype.toJoinedString.apply(this,arguments);null==a&&(a="");return c.join(a)};m.prototype.getEnumerator=function(){var a=this.getSource(),b=-1;return{current:function(){return a[b]},moveNext:function(){return++b<a.length},dispose:k}};var u=function(a,b){this.prevSource=a;this.prevPredicate=b};u.prototype=new d;u.prototype.where=function(a){a=e.createLambda(a);if(1>=a.length){var b=this.prevPredicate;return new u(this.prevSource,function(c){return b(c)&&a(c)})}return d.prototype.where.call(this,
    a)};u.prototype.select=function(a){a=e.createLambda(a);return 1>=a.length?new t(this.prevSource,this.prevPredicate,a):d.prototype.select.call(this,a)};u.prototype.getEnumerator=function(){var a=this.prevPredicate,b=this.prevSource,c;return new g(function(){c=b.getEnumerator()},function(){for(;c.moveNext();)if(a(c.current()))return this.yieldReturn(c.current());return!1},function(){e.dispose(c)})};var t=function(a,b,c){this.prevSource=a;this.prevPredicate=b;this.prevSelector=c};t.prototype=new d;t.prototype.where=
    function(a){a=e.createLambda(a);return 1>=a.length?new u(this,a):d.prototype.where.call(this,a)};t.prototype.select=function(a){a=e.createLambda(a);if(1>=a.length){var b=this.prevSelector;return new t(this.prevSource,this.prevPredicate,function(c){return a(b(c))})}return d.prototype.select.call(this,a)};t.prototype.getEnumerator=function(){var a=this.prevPredicate,b=this.prevSelector,c=this.prevSource,d;return new g(function(){d=c.getEnumerator()},function(){for(;d.moveNext();)if(null==a||a(d.current()))return this.yieldReturn(b(d.current()));
    return!1},function(){e.dispose(d)})};var v=function(){var a=function(a){return null===a?"null":a===p?"undefined":"function"===typeof a.toString?a.toString():Object.prototype.toString.call(a)},b=function(a,b){this.key=a;this.value=b;this.next=this.prev=null},c=function(){this.last=this.first=null};c.prototype={addLast:function(a){null!=this.last?(this.last.next=a,a.prev=this.last,this.last=a):this.first=this.last=a},replace:function(a,b){null!=a.prev?(a.prev.next=b,b.prev=a.prev):this.first=b;null!=
    a.next?(a.next.prev=b,b.next=a.next):this.last=b},remove:function(a){null!=a.prev?a.prev.next=a.next:this.first=a.next;null!=a.next?a.next.prev=a.prev:this.last=a.prev}};var e=function(a){this.countField=0;this.entryList=new c;this.buckets={};this.compareSelector=null==a?r:a};e.prototype={add:function(c,d){var e=this.compareSelector(c),f=a(e),g=new b(c,d);if(Object.prototype.hasOwnProperty.call(this.buckets,f)){for(var f=this.buckets[f],k=0;k<f.length;k++)if(this.compareSelector(f[k].key)===e){this.entryList.replace(f[k],
    g);f[k]=g;return}f.push(g)}else this.buckets[f]=[g];this.countField++;this.entryList.addLast(g)},get:function(b){b=this.compareSelector(b);var c=a(b);if(!Object.prototype.hasOwnProperty.call(this.buckets,c))return p;for(var c=this.buckets[c],d=0;d<c.length;d++){var e=c[d];if(this.compareSelector(e.key)===b)return e.value}return p},set:function(c,d){var e=this.compareSelector(c),f=a(e);if(Object.prototype.hasOwnProperty.call(this.buckets,f))for(var f=this.buckets[f],g=0;g<f.length;g++)if(this.compareSelector(f[g].key)===
    e)return e=new b(c,d),this.entryList.replace(f[g],e),f[g]=e,!0;return!1},contains:function(b){b=this.compareSelector(b);var c=a(b);if(!Object.prototype.hasOwnProperty.call(this.buckets,c))return!1;for(var c=this.buckets[c],d=0;d<c.length;d++)if(this.compareSelector(c[d].key)===b)return!0;return!1},clear:function(){this.countField=0;this.buckets={};this.entryList=new c},remove:function(b){b=this.compareSelector(b);var c=a(b);if(Object.prototype.hasOwnProperty.call(this.buckets,c))for(var d=this.buckets[c],
    e=0;e<d.length;e++)if(this.compareSelector(d[e].key)===b){this.entryList.remove(d[e]);d.splice(e,1);0==d.length&&delete this.buckets[c];this.countField--;break}},count:function(){return this.countField},toEnumerable:function(){var a=this;return new d(function(){var b;return new g(function(){b=a.entryList.first},function(){if(null!=b){var a={key:b.key,value:b.value};b=b.next;return this.yieldReturn(a)}return!1},k)})}};return e}(),E=function(a){this.count=function(){return a.count()};this.get=function(b){return d.from(a.get(b))};
    this.contains=function(b){return a.contains(b)};this.toEnumerable=function(){return a.toEnumerable().select(function(a){return new y(a.key,a.value)})}},y=function(a,b){this.key=function(){return a};m.call(this,b)};y.prototype=new m;"function"===typeof define&&define.amd?define("linqjs",[],function(){return d}):typeof module!==x&&module.exports?module.exports=d:B.Enumerable=d})(this);