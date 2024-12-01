document.addEventListener('DOMContentLoaded', () => {

    const dateBox = document.getElementById('datetime-picker');
    if (!dateBox) {
        return;
    }
    // Create date label
    const dateLabel = document.createElement('label');
    dateLabel.for = 'date';
    dateLabel.textContent = 'Datum:';
    dateBox.appendChild(dateLabel);


    // Create date input
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.id = 'date';
    dateInput.name = 'date';
    dateInput.required = true;
    dateBox.appendChild(dateInput);
    dateInput.addEventListener('change', ()=>{


        // Remove existing time options
        let timeSelectLabel = document.getElementById('time-label');
        if(timeSelectLabel){
            timeSelectLabel.remove();
        }
        let timeSelect = document.getElementById('time');
        if(timeSelect){
            timeSelect.remove();
        }

        timeSelectLabel = document.createElement('label');
        timeSelectLabel.for = 'time';
        timeSelectLabel.id = 'time-label';
        timeSelectLabel.textContent = 'Uhrzeit:';
        dateBox.appendChild(timeSelectLabel);

        timeSelect = document.createElement('select');
        timeSelect.id = 'time';
        timeSelect.name = 'time';
        timeSelect.required = true;
        dateBox.appendChild(timeSelect);

        generateTimeOptions("./testtimes.json");

    })

    // If it's after 5pm, set the next possible date to day after tomorrow, otherwise tomorrow
    const now = new Date();
    const nextDate = new Date(now);
    nextDate.setDate(nextDate.getDate() + (now.getHours() >= 17 ? 2 : 1));
    dateInput.min = nextDate.toISOString().split('T')[0];

    // Set max date to 90 days from now
    const maxDate = new Date(now);
    maxDate.setDate(maxDate.getDate() + 90);
    dateInput.max = maxDate.toISOString().split('T')[0];



    // Function to generate 15-minute interval options
    async function generateTimeOptions(url) {
        
        const timeSelect = document.getElementById('time');

        //const times_request = await fetch(url)

        // if(!times_request.ok){
        //     console.log("Error fetching times")
        //     return
        // }

        //const times = await times_request.json()

        const times = {
            "monday": {
                "start_time": 10,
                "end_time": 18
            },
            "tuesday": {
                "start_time": 10,
                "end_time": 18
            },
            "wednesday": {
                "start_time": 0,
                "end_time": 0
            },
            "thursday": {
                "start_time": 10,
                "end_time": 18
            },
            "friday": {
                "start_time": 10,
                "end_time": 18
            },
            "saturday": {
                "start_time": 10,
                "end_time": 18
            },
            "sunday": {
                "start_time": 10,
                "end_time": 18
            }
        };


        const selectedDate = new Date(dateInput.value);


        const intervals = 15; // 15-minute intervals
        const start_hours = times[selectedDate.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase()]["start_time"];
        const end_hours = times[selectedDate.toLocaleDateString('en-US', {weekday: 'long'}).toLowerCase()]["end_time"];

        if(start_hours === 0 && end_hours === 0){
            return
        }
        const options = [];

        for (let hour = start_hours; hour < end_hours; hour++) {
            for (let minute = 0; minute < 60; minute += intervals) {
                const hourStr = hour.toString().padStart(2, '0');
                const minuteStr = minute.toString().padStart(2, '0');
                const time = `${hourStr}:${minuteStr}`;
                options.push(time);
            }
        }
        options.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    }

    // Populate time dropdown
   
   

});
