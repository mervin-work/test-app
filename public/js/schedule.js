$(function() {
    fullcalendar();
    // getSchedules();
})

const Days = [
    { DAY_NAME: 'Monday', 	 EQUIVALENT: 1  },
    { DAY_NAME: 'Tuesday',   EQUIVALENT: 2  },
    { DAY_NAME: 'Wednesday', EQUIVALENT: 3  },
    { DAY_NAME: 'Thursday',  EQUIVALENT: 4  },
    { DAY_NAME: 'Friday',    EQUIVALENT: 5  },
    { DAY_NAME: 'Saturday',  EQUIVALENT: 6  },
    { DAY_NAME: 'Sunday',    EQUIVALENT: 7  }
];

const dateObj = [
    {
        daysOfWeek: [1], //MONDAY
        date: '2023-20-09',
        title: '08:00 AM - 5:00 PM',
    },
    {
        daysOfWeek: [2], //TUESDAY
        date: '2023-25-09',
        title: '10:00 AM - 3:00 PM',
    },
    {
        daysOfWeek: [3], //WEDNESDAY
        date: '2023-26-09',
        title :'09:00 AM - 2:00 PM',
    },
    {
        daysOfWeek: [4], //THURSDAY
        date: '2023-27-09',
        title : '08:00 AM - 5:00 PM',
    },
];

function getSchedules() {

    $.ajax({
        url: 'http://localhost:1337/api/availabilities',
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        mimeType: "application/json",
        headers: {
            "Authorization":  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk1MTE1NjM2LCJleHAiOjE2OTc3MDc2MzZ9.4turG1qDIn6-O-DRVpvU4QzHbSCDEYTdkgRbpWYWjjg"
        }
    }).done(function(response) {
      console.log(response);
    });
}


function fullcalendar() {
    var calendarEl = document.getElementById('calendar');

    let currentDate = new Date().toJSON().slice(0, 10);

    var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    initialDate: currentDate,
    navLinks: true, // can click day/week names to navigate views
    businessHours: true, // display business hours
    editable: true,
    selectable: true,
    validRange: function(currentDate) {
        let startDate = new Date(currentDate.valueOf());
        startDate.setDate(startDate.getDate() - 1);
        return { start: startDate }
    },
    events:dateObj,
    dateClick: function dateClickCallBack(dateInfo) {
        console.log(dateInfo);
        let date    =  moment(dateInfo.dateStr).format('YYYY-D-MM');
        let dayName = moment(dateInfo.dateStr).format('dddd');
        let daysOfWeek = getEquivalentDays(dayName);

        console.log(getEquivalentDays(dayName));
        const foundObject = dateObj.find(item => item.daysOfWeek[0] === daysOfWeek);
        if(foundObject) {
            $('#dateSchedTxt').text(moment(foundObject.date, 'YYYY-D-MM').format('MMMM D, YYYY'));
            $('#timeSchedSchedTxt').text(foundObject.title);
        } else {
            $('#dateSchedTxt').text('No Available Schedule');
            $('#timeSchedSchedTxt').text('');
        }

    },
    });

    calendar.render();
}

/**
 * Convert Dayname into equivalent value (int)
 * 
 * @param dayName 
 * return dayEquivalent - int
 */
const getEquivalentDays=(dayName)=> {
    let dayEquivalent;
    $.each(Days,function(index, day) {
        if(day.DAY_NAME == dayName) {
            return dayEquivalent = day.EQUIVALENT;
        }
    });
    return dayEquivalent;
}
