window.onload = function() {

// Read value from storage, or empty array
var names = JSON.parse(localStorage.getItem('locname') || "[]");
var i = 0;

n = (names.length);
for (i = 0; i <= (n-1); i++) {
	var list = names[i];
	var myList = document.getElementById("list");
	myList.innerHTML += "<li class='list-group-item' id='listItem'>"+ list + "<span class='glyphicon glyphicon-globe listglyph'></span></li>";
	}
 }

function removeData(){
	if (confirm('Are you sure you want delete all your locations?')) {
    	window.localStorage.clear();
		alert('Your locations are deleted!');
		location.reload();
	} else {
    	location.reload();
	}
}

document.querySelector('#removeData').onclick = removeData;


