function buildCalendar(){
	var $cal_area = $('#cal_area');

	var today = new Date();

	var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
	var lastDate = new Date(today.getFullYear(), today.getMonth()+1, 0);

	var cellCnt = 0;

	var str = '';

	// 현재달부터 4달 출력 
	for (j=0; j<4; j++) {
		var year = doMonth.getFullYear();
		var month = doMonth.getMonth()+1;
		var date;

		if(month < 10) {month = '0'+ month;}

		str += '<div class="month">';
		str += '<p>'+year+'. '+month+'</p>';
		str += '<table><tbody>';
		str += '<tr>';

		// 시작하는 일수 만큼 td 추가
		for(i=0; i<doMonth.getDay(); i++) {
			str += '<td><span></span></td>';
			cellCnt++;
		}

		// 해당 월 첫쨋날부터 마지막 날까지 td 추가
		for(i=doMonth.getDate(); i<=lastDate.getDate(); i++) {
			date = i;
			if (date < 10){ date = '0' + date; }
			str += '<td data-date="'+year+'-'+month+'-'+date+'"><span>'+i+'</span></td>';
			cellCnt++;		
			if(cellCnt % 7 == 0 && i != 31) { str += '</tr><tr>'; }
		}

		str += '</tr>';
		str += '</tbody></table></div>';

		// 셀 카운터 초기화
		cellCnt = 0;

		// 다음달로 초기화
		doMonth.setMonth(doMonth.getMonth()+1);
		lastDate.setMonth(lastDate.getMonth()+2, 0);
	}

 	$cal_area.html(str);
}