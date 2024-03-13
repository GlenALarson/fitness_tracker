document.addEventListener('DOMContentLoaded', function() {
    const workoutForm = document.getElementById('workoutForm');
    const workoutSelect = document.getElementById('workoutSelect');
    const exerciseFields = document.getElementById('exerciseFields');
    const workoutLog = document.getElementById('workoutLog');

    setExerciseLabels('Squat', 'Bench Press', 'Barbell Row');

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
       if (selectedWorkout === 'workoutA') {
            exercise1Name = 'Squat';
            exercise2Name = 'Bench Press';
            exercise3Name = 'Barbell Row';
        } else if (selectedWorkout === 'workoutB') {
            exercise1Name = 'Squat';
            exercise2Name = 'Overhead press';
            exercise3Name = 'Deadlift';
        }

        //const selectedWorkout = workoutSelect.value;
        //const workoutName = selectedWorkout === 'workoutA' ? 'Workout A' : 'Workout B';
        //const exerciseNames = selectedWorkout === 'workoutA' ?
        //    ['Squat', 'Bench Press', 'Barbell Row'] :
        //    ['Squat', 'Overhead Press', 'Deadlift'];

        logWorkout(selectedWorkout, exercise1Name, exercise2Name, exercise3Name, exercise1, exercise2, exercise3);

        // Clear form inputs
        exercise1Input.value = '';
        exercise2Input.value = '';
        exercise3Input.value = '';
    });

    workoutSelect.addEventListener('change', function() {
        const selectedWorkout = workoutSelect.value;
        if (selectedWorkout === 'workoutA') {
            setExerciseLabels('Squat', 'Bench Press', 'Barbell Row');
        } else if (selectedWorkout === 'workoutB') {
            setExerciseLabels('Squat', 'Overhead Press', 'Deadlift');
        }
    });

    // Load previous workouts from localStorage
    loadWorkouts();

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

        displayWorkouts();
    }

    function loadWorkouts() {
        const workouts = getWorkoutsFromStorage();
        displayWorkouts();
    }

    function getWorkoutsFromStorage() {
        return JSON.parse(localStorage.getItem('workouts')) || [];
    }

    function displayWorkouts() {
        workoutLog.innerHTML = '';
        const workouts = getWorkoutsFromStorage().reverse();

        workouts.forEach(function(workout) {
            const workoutItem = document.createElement('div');
            workoutItem.classList.add('workout-item');
            workoutItem.innerHTML = `
                <strong>Workout:</strong> ${workout.workout}<br>
                <strong>Exercises:</strong><br>
                - ${workout.exercise1Name} : ${workout.exercise1} kg<br>
                - ${workout.exercise2Name} : ${workout.exercise2} kg<br>
                - ${workout.exercise3Name} : ${workout.exercise3} kg<br>
                <span class="date">${workout.date}</span>
                <p> </p>
            `;
            workoutLog.appendChild(workoutItem);
        });
    }

    function setExerciseLabels(label1, label2, label3) {
        document.querySelector('label[for="exercise1"]').textContent = `${label1} (kg):`;
        document.querySelector('label[for="exercise2"]').textContent = `${label2} (kg):`;
        document.querySelector('label[for="exercise3"]').textContent = `${label3} (kg):`;
    }
});
