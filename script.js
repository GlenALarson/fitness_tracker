document.addEventListener('DOMContentLoaded', function() {
    const workoutForm = document.getElementById('workoutForm');
    const workoutSelect = document.getElementById('workoutSelect');
    const exerciseFields = document.getElementById('exerciseFields');
    const workoutLog = document.getElementById('workoutLog');

    setExerciseLabels('Squat', 'Bench Press', 'Barbell Row'); // Initialisoidaan kentät treeni A:n mukaisiksi
    getLatestWorkoutValues(); // Haetaan lokitiedot menneistä treeneistä

    // Kun käyttäjä syöttää treeninsä tiedot ja painaa submit, tallennetaan treenin tiedot ja nollataan kentät
    workoutForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const exercise1Input = document.getElementById('exercise1');
        const exercise2Input = document.getElementById('exercise2');
        const exercise3Input = document.getElementById('exercise3');

        const exercise1 = parseInt(exercise1Input.value);
        const exercise2 = parseInt(exercise2Input.value);
        const exercise3 = parseInt(exercise3Input.value);

        if (isNaN(exercise1) || isNaN(exercise2) || isNaN(exercise3) || exercise1 <= 0 || exercise2 <= 0 || exercise3 <= 0) {
            alert('Please enter valid weights for all exercises.');
            return;
        }

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

        logWorkout(selectedWorkout, exercise1Name, exercise2Name, exercise3Name, exercise1, exercise2, exercise3);
        getLatestWorkoutValues();
        // Clear form inputs
        exercise1Input.value = '';
        exercise2Input.value = '';
        exercise3Input.value = '';
    });

    // Kun käyttäjä vaihtaa dropdown-valikon valintaa, treeniliikkeiden nimet vaihtuu
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
        if (workouts.length > 0) {
            const latestWorkout = workouts[workouts.length - 2]; // Haetaan viimeisin vastaava treeni
            const workoutName = latestWorkout.workout;
            const exercise1Name = latestWorkout.exercise1Name;
            const exercise2Name = latestWorkout.exercise2Name;
            const exercise3Name = latestWorkout.exercise3Name;
            const exercise1 = latestWorkout.exercise1;
            const exercise2 = latestWorkout.exercise2;
            const exercise3 = latestWorkout.exercise3;
            
            document.querySelector('li[class="nextWorkout1"]').textContent = exercise1Name + ' ' + (exercise1 + 2.5) + ' kg';
            document.querySelector('li[class="nextWorkout2"]').textContent = exercise2Name + ' ' + (exercise2 + 2.5) + ' kg';
            document.querySelector('li[class="nextWorkout3"]').textContent = exercise3Name + ' ' + (exercise3 + 2.5) + ' kg';
        } else {
            console.log('No workouts available.');
        }
    }

    // Funktio laittaa parametrien mukaiset treeniliikkeiden nimet lomakkeen kentille
    function setExerciseLabels(label1, label2, label3) {
        document.querySelector('label[for="exercise1"]').textContent = `${label1} (kg):`;
        document.querySelector('label[for="exercise2"]').textContent = `${label2} (kg):`;
        document.querySelector('label[for="exercise3"]').textContent = `${label3} (kg):`;
    }
});
