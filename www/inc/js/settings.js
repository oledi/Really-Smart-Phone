(function() {

    var settings = {

        refresh:JSON.parse(localStorage.getItem('latitude')),
        distance:JSON.parse(localStorage.getItem('longitude'))
    }

    var controller = {

        refresh:function() {
            var data = document.getElementById("refreshInput").value;
            localStorage.setItem('refreshinput', data);
        },

        distance:function() {
            var data2 = document.getElementById("radiusInput").value;
            localStorage.setItem('radiusinput', data2);
            console.log(settings);
        }

    }

    document.getElementById('refreshData').onclick = controller.refresh;
    document.getElementById('radiusData').onclick = controller.refresh;

})();
