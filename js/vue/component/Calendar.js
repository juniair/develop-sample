// 숫자인지만 체크
function f_Number(str) {
    for (i=0; i< str.length; i++) {
            ch = str.charAt(i);
            if (ch < "0" || ch > "9") {
                    return false;
            }
    }
    return true;
}
function Resut(lunaDate) {
     // 음력 데이터 (평달 - 작은달 :1,  큰달:2 )
     // (윤달이 있는 달 - 평달이 작고 윤달도 작으면 :3 , 평달이 작고 윤달이 크면 : 4)
     // (윤달이 있는 달 - 평달이 크고 윤달이 작으면 :5,  평달과 윤달이 모두 크면 : 6)
var kk = [[1, 2, 4, 1, 1, 2, 1, 2, 1, 2, 2, 1],   /* 1841 */
      [2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1],
      [2, 2, 2, 1, 2, 1, 4, 1, 2, 1, 2, 1],
      [2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 5, 2, 1, 2, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 3, 2, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 5, 2],   /* 1851 */
      [2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2],
      [1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 5, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
      [2, 1, 6, 1, 1, 2, 1, 1, 2, 1, 2, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],   /* 1861 */
      [2, 1, 2, 1, 2, 2, 1, 2, 2, 3, 1, 2],
      [1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 1, 2, 4, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
      [1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 2, 2, 1, 2, 1, 2, 1, 1, 5, 2, 1],
      [2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2],   /* 1871 */
      [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
      [1, 1, 2, 1, 2, 4, 2, 1, 2, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
      [2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1, 2],
      [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 2, 4, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
      [1, 2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1],   /* 1881 */
      [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
      [2, 1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],   /* 1891 */
      [1, 1, 2, 1, 1, 5, 2, 2, 1, 2, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2, 1],
      [2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
      [2, 1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],   /* 1901 */
      [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
      [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
      [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2],   /* 1911 */
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
      [2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 5, 2, 2, 1, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],   /* 1921 */
      [2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
      [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
      [2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
      [1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
      [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],   /* 1931 */
      [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
      [1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
      [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 4, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
      [2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
      [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1],   /* 1941 */
      [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
      [1, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
      [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],   /* 1951 */
      [1, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
      [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
      [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
      [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],   /* 1961 */
      [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
      [2, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
      [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 1, 5, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
      [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2],   /* 1971 */
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2, 1],
      [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 1, 5, 2, 1, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
      [2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],   /* 1981 */
      [2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2, 2],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
      [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
      [2, 1, 2, 2, 1, 5, 2, 2, 1, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
      [1, 2, 1, 1, 5, 1, 2, 1, 2, 2, 2, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],   /* 1991 */
      [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
      [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
      [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
      [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
      [2, 2, 2, 3, 2, 1, 1, 2, 1, 2, 1, 2],   /* 2001 */
      [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
      [1, 5, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2],
      [1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
      [1, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
      [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
      [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],   /* 2011 */
      [2, 1, 6, 2, 1, 2, 1, 1, 2, 1, 2, 1],
      [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
      [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 2],
      [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
      [2, 1, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
      [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
      [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
      [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],   /* 2021 */
      [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
      [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
      [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
      [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
      [1, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
      [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
      [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
      [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1],   /* 2031 */
      [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 5, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
      [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
      [2, 2, 1, 2, 1, 4, 1, 1, 2, 1, 2, 2],
      [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
      [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
      [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
      [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
      [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],   /* 2041 */
      [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
      [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2]];

       var input_day = lunaDate;
       var gan = new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
             var jee = new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
             var ddi = new Array("쥐","소","범","토끼","용","뱀","말","양","원숭이","닭","개","돼지");
             var week = new Array("일","월","화","수","목","금","토");

             var md = new Array(31,0,31,30,31,30,31,31,30,31,30,31);

             var inputDaySplit = input_day.split('-');

             var year = inputDaySplit[0];
             var month = inputDaySplit[1];
             var day = inputDaySplit[2];

             // var year =input_day.substring(0,4);
             // var month =input_day.substring(4,6);
             // var day =input_day.substring(6,8);

                // 음력에서 양력으로 변환
                var lyear, lmonth, lday, leapyes;
                var syear, smonth, sday;
                var mm, y1, y2, m1;
                var i, j, k1, k2, leap, w;
                var td, y;
                lyear = get_year(year);        // 년도 check
                lmonth = get_month(month);     // 월 check

                y1 = lyear - 1841;
                m1 = lmonth - 1;
                leapyes = 0;
                if (kk[y1][m1] > 2)  {
                       /*if (document.frmTest.yoon[0].checked) {
                                leapyes = 1;
                                switch (kk[y1][m1]) {
                                            case 3:
                                            case 5:
                                                    mm = 29;
                                                    break;
                                            case 4:
                                            case 6:
                                                    mm = 30;
                                                    break;
                                 }
                       }
                       else {*/
                                switch (kk[y1][m1]) {
                                        case 1:
                                        case 3:
                                        case 4:
                                                mm = 29;
                                                break;
                                        case 2:
                                        case 5:
                                        case 6:
                                                mm = 30;
                                                break;
                                 }
                // }
                }

               lday = get_day(day, mm);

               td = 0;
               for (i=0; i<y1; i++) {
                        for (j=0; j<12; j++) {
                                    switch (kk[i][j]) {
                                            case 1:
                                                    td = td + 29;
                                                    break;
                                            case 2:
                                                    td = td + 30;
                                                    break;
                                            case 3:
                                                    td = td + 58;    // 29+29
                                                    break;
                                            case 4:
                                                    td = td + 59;    // 29+30
                                                    break;
                                            case 5:
                                                    td = td + 59;    // 30+29
                                                    break;
                                            case 6:
                                                    td = td + 60;    // 30+30
                                                    break;
                                    }
                        }
             }
             for (j=0; j<m1; j++) {
                    switch (kk[y1][j]) {
                            case 1:
                                    td = td + 29;
                                    break;
                            case 2:
                                    td = td + 30;
                                    break;
                            case 3:
                                    td = td + 58;    // 29+29
                                    break;
                            case 4:
                                    td = td + 59;    // 29+30
                                    break;
                            case 5:
                                    td = td + 59;    // 30+29
                                    break;
                            case 6:
                                    td = td + 60;    // 30+30
                                    break;
                    }
              }
              if (leapyes == 1) {
                    switch(kk[y1][m1]) {
                            case 3:
                            case 4:
                                    td = td + 29;
                                    break;
                            case 5:
                            case 6:
                                    td = td + 30;
                                    break;
                     }
              }
              td =  td + parseFloat(lday) + 22;
              // td : 1841 년 1 월 1 일 부터 원하는 날짜까지의 전체 날수의 합
              y1 = 1840;
              do {
                    y1 = y1 +1;
                    if  ((y1 % 400 == 0) || ((y1 % 100 != 0) && (y1 % 4 == 0))) {
                            y2 = 366;
                    }
                    else {
                            y2 = 365;
                    }
                    if (td <= y2) {
                            break;
                    }
                    else {
                            td = td- y2;
                    }
             } while(1);
                syear = y1;
                md[1] = parseInt(y2) -337;
                m1 = 0;
                do {
                    m1= m1 + 1;
                    if (td <= md[m1-1]) {
                        break;
                    }
                    else {
                        td = td - md[m1-1];
                    }
               } while(1);
               smonth = parseInt(m1);
               sday = parseInt(td);
               y = parseInt(syear -1);
               td = y * 365 + y/4 - y/100 +  y/400;
               for ( i=0; i<smonth-1; i++) {
                    td = td + md[i];
               }
              // td = make_data(td) + sday;
               w = td % 7;
              // i = (td + 4) % 10;
              // j = (td + 2) % 12;
               k1 = (parseInt(lyear) + 6) % 10;
               k2 =(parseInt(lyear) + 8) % 12;
      /*         document.write("<br><br><center>");
               document.write("음력 ",gan[k1],jee[k2],"년 ",ddi[k2],"띠해 ",lyear," 년 ",lmonth," 월 ",lday," 일 ","(",gan[i],jee[j],")","<br>");
               document.write("양력 ",syear," 년 ",smonth," 월 ",sday," 일 ",week[w],"요일");
               document.write("<br><br><a href='#' onclick='history.go(-1);'>돌아 가기</a>");*/
               if(smonth < 10){
                   smonth = "0"+smonth;
               }
               if(sday < 10){
                   sday = "0"+sday;
               }
               //console.log(lunaDate+" => 양력 휴일 변환: "+smonth+"월"+sday+"일");
               return smonth+"-"+sday;
}
function get_year(src) {
     if ((src < 1841) || (src > 2043 )) {
        alert('연도 범위는 1841 ~ 2043 까지입니다.');
        document.frmTest.input_day.focus();
     }
     else
        return src;
}
function get_month(src) {
     if ((src < 1) || (src > 12 )) {
         alert('월 범위는 1 ~ 12 까지입니다.');
         document.frmTest.input_day.focus();
     }
     else
         return src;
}
function get_day(src,day) {
     if ((src < 1) || (src > day )) {
         alert('일 범위가 틀립니다.');
         document.frmTest.input_day.focus();
     }
     else
         return src;
}
function febdays(src) {
     if ((src%4 !=0) || ((src%100 == 0) && (src%400 !=0))) {
                 return 28;          // 윤년이 아님
     }
}


if(!Date.prototype.format) {
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
}



if(!String.prototype.string) {
    String.prototype.string = function (len) { var s = '', i = 0; while (i++ < len) { s += this; } return s; };
}

if(!String.prototype.zf) {
    String.prototype.zf = function (len) { return "0".string(len - this.length) + this; };
}

if(!Number.prototype.zf) {
    Number.prototype.zf = function (len) { return this.toString().zf(len); };
}

if(!Number.prototype.priceFormat) {
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
}


Date.isLeapYear = function (year) { 
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)); 
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

if(!Date.prototype.isLeapYear) {
    Date.prototype.isLeapYear = function () { 
        return Date.isLeapYear(this.getFullYear()); 
    };
}

if(!Date.prototype.getDaysInMonth) {
    Date.prototype.getDaysInMonth = function () { 
        return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
    };
}

if(!Date.prototype.addMonths) {
    Date.prototype.addMonths = function (value) {
        var n = this.getDate();
        this.setDate(1);
        this.setMonth(this.getMonth() + value);
        this.setDate(Math.min(n, this.getDaysInMonth()));
        return this;
    };
}

if(!Date.prototype.addDays) {
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }
}









Vue.component("calendar-component",{
    template:`
        <div class="calendar-component" v-show="isShow">
            <tabs :tabsClass="['calendar_tabs']" :ulClass="['calendar_tabs_list']" @tab-changed="tabChanged">
                <tab name="날짜" :category="'date'" :selected="tabType == 'date'" :headerClass="['date', (category=='stay' ? 'stay' : '')]">
                    <div class="calendar_area">
                        <div class="month" v-for="calendarItem in calendarItems" :key="calendarItem.id">
                            <p class="txt_month">{{ calendarItem.month | dateFormatFilter("yyyy.MM") }}</p>
                            <table>
                                <tbody>
                                    <tr v-for="monthItem in calendarItem.monthItems" :key="monthItem.id">
                                        <td v-for="dateItem in monthItem" :key="dateItem.id" @click="selectedRange(dateItem)" :class="dateItem | dateClassFilter">
                                            <span>{{ dateItem.date | dateFormatFilter("d") }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </tab>
                <tab v-if="category == 'rentcar'" name="시간" :category="'time'" :selected="tabType == 'time'" :headerClass="['time']">
                    <div class="warp_items">
                        <dl class="time-component start">
                            <dt>
                                <strong class="txt">대여</strong>
                                <em class="txt date">{{ selectedDateItems[0].date | dateFormatFilter("yyyy.MM.dd(KS)") }}</em>
                            </dt>
                            <dd>
                                <select v-model="selectedTimeItems.start">
                                    <option v-for="selectableTime in selectableTimes" :value="selectableTime">{{ selectableTime }}</option>
                                </select>
                            </dd>
                        </dl>
                        <dl class="time-component end">
                            <dt>
                                <strong class="txt">반납</strong>
                                <em class="txt date">{{ selectedDateItems[selectedDateItems.length-1].date | dateFormatFilter("yyyy.MM.dd(KS)") }}</em>
                            </dt>
                            <dd>
                                <select v-model="selectedTimeItems.end">
                                    <option v-for="selectableTime in selectableTimes" :value="selectableTime">{{ selectableTime }}</option>
                                </select>
                            </dd>
                        </dl>
                    </div>
                    <div class="notice">
                        <p class="txt">08:00 ~ 20:00 외의 대여 및 반납은 각 렌터카 업체로 문의 부탁 드립니다.</p>
                    </div>
                </tab>
            </tabs>
            <div class="btn_footer">
                <button class="btn_calendar_time" @click="confirmOrTiemtabChange">{{ tabType | tabTypeTextFilter(category) }}</button>
                <button class="btn_calendar_time_close" @click="calendarClose">닫기</button>
            </div>
        </div>
    `,
    model: {
        prop:'isShow',
        event:'calendar-close'
    },
    props: {
        isShow: {
            type: Boolean,
            required: false,
            default:false
        },
        startDate: {
            type:String,
            required: false,
            default: new Date().format("yyyy-MM-dd")
        },
        startTime: {
            type:String,
            required: false,
            default: "08:00"
        },
        endDate: {
            type:String,
            required: false,
            default: new Date().addDays(1).format("yyyy-MM-dd")
        },
        endTime: {
            type:String,
            required: false,
            default: "08:00"
        },
        category: {
            type:String,
            required: true,
            default: "stay"
        }
    },
    created() {
        this.selectedTimeItems.start = this.startTime;
        this.selectedTimeItems.end = this.endTime;
        this.initCalendar();
    },
    beforeUpdate() {
        
    },
    mounted() {
        
    },
    data() {
        return {
            tabType: 'date',
            calendarItems: [],
            selectedDateItems: [],
            selectedTimeItems: {
                start: null,
                end: null
            }
        }
    },
    methods: {
        initCalendar() {
            let startDate = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
            let lastDate = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
            let enableCount = 0;
            this.calendarItems = [];
            for (let index = 0; index < 4; index++) {
                let monthItems = [];
                let weekItems = [];
                for(let i = 0; i < startDate.getDay(); i++) {
                    
                    weekItems.push({
                        date: null,
                        isDisable: null,
                        isHoliday: null,
                        isSelected: null
                    });
                }
                for(let i = startDate.getDate(); i <= lastDate.getDate(); i++) {
                    let date = startDate.addDays(i-1);
                    let diffTime = date - this.today;
                    let isToday = this.today.format("yyyy-MM-dd") === date.format("yyyy-MM-dd");
                    let isDisable = ((diffTime < 0 || 90 <= enableCount) && !isToday);
                    let isSelected = (this.startDate === date.format("yyyy-MM-dd")) || (this.endDate === date.format("yyyy-MM-dd"));
                    
                    let isRange = ((0 < date - new Date(this.startDate)) && (date - new Date(this.endDate) < 0) && !isSelected)

                    let data = {
                        date: date,
                        dateString: date.format("yyyy-MM-dd"),
                        lunaDate: Resut(date.format("yyyy-MM-dd")),
                        isDisable: isDisable,
                        isHoliday: this.isHoliday(date),
                        isSelected: isSelected,
                        isRange: isRange,
                        isToday: isToday
                    }
                    if(data.isSelected || data.isRange) {

                        this.selectedDateItems.push(data);
                    }
                    weekItems.push(data);
                    if(weekItems.length == 7 || i == lastDate.getDate()) {
                        monthItems.push(weekItems);
                        weekItems = [];
                    }
                    if(isToday || (diffTime > 0 && enableCount <= 90)) {
                        enableCount++;
                    }
                }
                this.calendarItems.push({
                    month:new Date(startDate),
                    monthItems:monthItems
                });
                startDate.setMonth(startDate.getMonth()+1);
                lastDate.setMonth(startDate.getMonth()+2, 0);
            }
        },
        confirmOrTiemtabChange() {
            if(this.category != 'rentcar' || (this.tabType == 'time' && this.category == 'rentcar')) {
                if(this.selectedDateItems.length < 2) {
                    alert("여행 일자를 선택해 주세요.")
                    return;
                }
                let data = {
                    startDate: this.selectedDateItems[0].date,
                    startTime: this.selectedTimeItems.start,
                    endDate: this.selectedDateItems[this.selectedDateItems.length - 1].date,
                    endTime: this.selectedTimeItems.end
                }
                this.$emit("confirm-calendar-data", data);
                this.$emit("calendar-close", false);
            } else {
                if(this.selectedDateItems.length < 2) {
                    alert("여행 일자를 선택해 주세요.")
                    return;
                }
                this.tabType = 'time'
            }
        },
        calendarClose() {
            this.$emit("calendar-close", false);
        },
        tabChanged(category) {
            this.tabType = category;
        },
        selectedRange(dateItem) {
            if(dateItem.isDisable) {
                return;
            }

            if(2 <= this.selectedDateItems.length ) {
                for (const selectedItem of this.selectedDateItems) {
                    selectedItem.isSelected = false;
                    selectedItem.isRange = false;
                }
                this.selectedDateItems = [];
            }
            let items = Enumerable.from(this.calendarItems)
                                .selectMany((calendarItem) => {
                                    let items = Enumerable.from(calendarItem.monthItems)
                                                        .selectMany((monthItem) => {

                                                                    return Enumerable.from(monthItem).select(weekItems => weekItems).toArray();
                                                        }).toArray();
                                    
                                    return items;
                                })
                                .where(item => item.date != null && !item.isDisable);
            
            if(this.selectedDateItems.length == 0) {
                let item = items.first(item => item.date - dateItem.date == 0);
                item.isSelected = true;
                this.selectedDateItems.push(item);
            } 
            else {
                let startItem = this.selectedDateItems[0];
                items.where(item =>  {
                        return (0 < item.date - startItem.date &&  item.date - dateItem.date <= 0) || 
                            (0 <= item.date - dateItem.date &&  item.date - startItem.date < 0)
                    })
                    .select(item => {
                        
                        if((0 < item.date - startItem.date &&  item.date - dateItem.date < 0) ||
                        (0 < item.date - dateItem.date &&  item.date - startItem.date < 0)) {
                            item.isSelected = false;
                            item.isRange = true;
                        }
                        else {
                            item.isSelected = true;
                            item.isRange = false;
                        }

                        return item;
                    })
                    .forEach(item => this.selectedDateItems.push(item));

                this.selectedDateItems = Enumerable.from(this.selectedDateItems)
                                                .orderBy(item => item.date)
                                                .toArray();
            }
        },
        getWeekOfDate(date, nextMonth){
            let nextDate = this.getNextMonth(date, nextMonth)
            let weekOfNumber = nextDate.getDaysInMonth() / 7;
            return Math.ceil(weekOfNumber);
        },
        getNextMonth(date, nextMonth) {
            if(0 < nextMonth) {
                return new Date(date).addMonths(nextMonth);
            } else {
                return date;
            }
        },
        isHoliday(date) {
            let result = false;

            for (let index = 0; index < this.lunarHolidays.length; index++) {
                const lunarHoliday = this.lunarHolidays[index];
                let dateLunarString = Resut(`${date.getFullYear()}-${lunarHoliday}`);
                if(lunarHoliday == dateLunarString) {
                    return true;
                }
            }

            for (let index = 0; index < this.solarHolidays.length; index++) {
                const solarHoliday = `${date.getFullYear()}-${this.solarHolidays[index]}`;
                let dateSolarString = date.format("yyyy-MM-dd");
                if(solarHoliday == dateSolarString) {
                    return true;
                }
            }

            return result;
        }
    },
    watch: {
        isShow(newValue) {
            if(newValue) {
                this.tabType = 'date';
                this.selectedTimeItems.start = this.startTime;
                this.selectedTimeItems.end = this.endTime;
                this.initCalendar();
            }
        }
    },
    computed: {
        today() {
            return new Date();
        },
        solarHolidays() {
            return ['01-01','03-01','05-05','06-06','08-15','10-03','10-09','12-25'];
        },
        lunarHolidays() {
            return ['01-01','01-02','04-08','08-14','08-15','08-16'];
        },
        selectableTimes() {
            return [
                        "08:00","08:30",
                        "09:00","09:30",
                        "10:00","10:30",
                        "11:00","11:30",
                        "12:00","12:30",
                        "13:00","13:30",
                        "14:00","14:30",
                        "15:00","15:30",
                        "16:00","16:30",
                        "17:00","17:30",
                        "18:00","18:30",
                        "19:00","19:30",
                        "20:00"
                   ]
        }
    },
    filters: {
        dateFormatFilter(date, formatString) {
            if(date == null) {
                return ""
            } else {
                return date.format(formatString);
            }
            
        },
        dateClassFilter(item) {
            return {
                'disable': item.isDisable,
                'today': item.isToday,
                'ftl': item.isRange,
                'on': item.isSelected,
                'holiday': item.isHoliday
            }
        },
        tabTypeTextFilter(tabType, category) {
            let txt = "시간선택"
            if(category != 'rentcar' || (tabType == 'time' && category == 'rentcar')) {
                txt = "적용";
            }
            return txt;
            
        }
    }
})