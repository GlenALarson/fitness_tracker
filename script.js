document.addEventListener('DOMContentLoaded', function() {
    const workoutForm = document.getElementById('workoutForm');
    const workoutSelect = document.getElementById('workoutSelect');

    setExerciseLabels('Squat', 'Bench Press', 'Barbell Row'); // Initialisoidaan kentät treeni A:n mukaisiksi
    getLatestWorkoutValues(); // Haetaan lokitiedot menneistä treeneistä ja määritetään näiden perusteella seuraava treeni

    // Kun käyttäjä syöttää treeninsä tiedot ja painaa submit, tallennetaan treenin tiedot ja nollataan kentät
    workoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const exercise1Input = document.getElementById('exercise1');
        const exercise2Input = document.getElementById('exercise2');
        const exercise3Input = document.getElementById('exercise3');

        // Tallennetaan käyttäjän syöttämät painot muuttujiin
        const exercise1 = parseFloat(exercise1Input.value);
        const exercise2 = parseFloat(exercise2Input.value);
        const exercise3 = parseFloat(exercise3Input.value);

        // Tarkistetaan että syötetyt arvot on numeroita
        if (isNaN(exercise1) || isNaN(exercise2) || isNaN(exercise3) || exercise1 <= 0 || exercise2 <= 0 || exercise3 <= 0) {
            alert('Please enter valid weights for all exercises.');
            return;
        }

        // Tallennetaan treeniliikkeiden nimet muuttujiin treenityypin perusteella
        let exercise1Name = '';
        let exercise2Name = '';
        let exercise3Name = '';
        let selectedWorkout = workoutSelect.value;
       if (selectedWorkout === 'workout A') {
            exercise1Name = 'Squat';
            exercise2Name = 'Bench Press';
            exercise3Name = 'Barbell Row';
        } else if (selectedWorkout === 'workout B') {
            exercise1Name = 'Squat';
            exercise2Name = 'Overhead press';
            exercise3Name = 'Deadlift';
        }

        // Tallennetaan treeni lokiin
        logWorkout(selectedWorkout, exercise1Name, exercise2Name, exercise3Name, exercise1, exercise2, exercise3);
        // Päivitetään seuraavan treenin tiedot
        getLatestWorkoutValues();
        
        // Tyhjennetään kentät
        exercise1Input.value = '';
        exercise2Input.value = '';
        exercise3Input.value = '';
    });

    // Kun käyttäjä vaihtaa dropdown-valikon valintaa, treeniliikkeiden nimet vaihtuvat
    workoutSelect.addEventListener('change', function() {
        const selectedWorkout = workoutSelect.value;
        if (selectedWorkout === 'workout A') {
            setExerciseLabels('Squat', 'Bench Press', 'Barbell Row');
        } else if (selectedWorkout === 'workout B') {
            setExerciseLabels('Squat', 'Overhead Press', 'Deadlift');
        }
    });

    // Funktio tallentaa treenin tiedot localStorageen
    function logWorkout(workout, exercise1Name, exercise2Name, exercise3Name, exercise1, exercise2, exercise3) {
        const workoutData = {
            workout,
            exercise1Name,
            exercise2Name,
            exercise3Name,
            exercise1,
            exercise2,
            exercise3,
            date: new Date().toLocaleDateString()
        };

        const workouts = getWorkoutsFromStorage();
        workouts.push(workoutData);
        localStorage.setItem('workouts', JSON.stringify(workouts));

    }

    function getWorkoutsFromStorage() {
        return JSON.parse(localStorage.getItem('workouts')) || [];
    }

    // Funktio laskee aiempien treenien perusteella millainen käyttäjän seuraava treeni pitäisi olla ja laittaa sen näkyviin
    function getLatestWorkoutValues() {
        const workouts = getWorkoutsFromStorage();
        if (workouts.length > 1) {
            const latestWorkout = workouts[workouts.length - 2]; // Haetaan viimeisin vastaava treeni
            const workoutName = latestWorkout.workout;
            const exercise1Name = latestWorkout.exercise1Name;
            const exercise2Name = latestWorkout.exercise2Name;
            const exercise3Name = latestWorkout.exercise3Name;
            const exercise1 = latestWorkout.exercise1;
            const exercise2 = latestWorkout.exercise2;
            const exercise3 = latestWorkout.exercise3;
            
            // Yleensä treeneihin lisätään 2.5kg joka kerta mutta Workout B:ssä deadliftiin lisätään aina 5kg, siksi if-else -lauseke
            if (workoutName === 'workout A') {
                document.querySelector('li[class="nextWorkoutType"]').textContent = 'Workout A';
                document.querySelector('li[class="nextWorkout1"]').textContent = exercise1Name + ' ' + (exercise1 + 5) + ' kg';
                document.querySelector('li[class="nextWorkout2"]').textContent = exercise2Name + ' ' + (exercise2 + 2.5) + ' kg';
                document.querySelector('li[class="nextWorkout3"]').textContent = exercise3Name + ' ' + (exercise3 + 2.5) + ' kg';
            } else {
                document.querySelector('li[class="nextWorkoutType"]').textContent = 'Workout B';
                document.querySelector('li[class="nextWorkout1"]').textContent = exercise1Name + ' ' + (exercise1 + 5) + ' kg';
                document.querySelector('li[class="nextWorkout2"]').textContent = exercise2Name + ' ' + (exercise2 + 2.5) + ' kg';
                document.querySelector('li[class="nextWorkout3"]').textContent = exercise3Name + ' ' + (exercise3 + 5) + ' kg';
            }
        
        // Ensimmäisen kahden treenin kohdalla localStoragessa ei vielä ole dataa jonka pohjalta määrittää seuraavia treenejä, sitä varten nämä else-lausekkeet    
        } else if (workouts.length === 0) {
            document.querySelector('li[class="nextWorkoutType"]').textContent = 'Workout A';
            document.querySelector('li[class="nextWorkout1"]').textContent = 'Squat 20 kg';
            document.querySelector('li[class="nextWorkout2"]').textContent = 'Bench Press 20 kg';
            document.querySelector('li[class="nextWorkout3"]').textContent = 'Barbell Row 20 kg';
        } else if (workouts.length === 1) {
            document.querySelector('li[class="nextWorkoutType"]').textContent = 'Workout B';
            document.querySelector('li[class="nextWorkout1"]').textContent = 'Squat 22.5 kg';
            document.querySelector('li[class="nextWorkout2"]').textContent = 'Overhead Press 20 kg';
            document.querySelector('li[class="nextWorkout3"]').textContent = 'Deadlift 20 kg';
        }
    }

    // Funktio asettaa parametrien mukaiset treeniliikkeiden nimet lomakkeen kentille
    function setExerciseLabels(label1, label2, label3) {
        document.querySelector('label[for="exercise1"]').textContent = `${label1} (kg):`;
        document.querySelector('label[for="exercise2"]').textContent = `${label2} (kg):`;
        document.querySelector('label[for="exercise3"]').textContent = `${label3} (kg):`;
    }
});
