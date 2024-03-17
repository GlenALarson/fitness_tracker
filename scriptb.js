document.addEventListener('DOMContentLoaded', function() {
    const workoutLog = document.getElementById('workoutLog');

    displayWorkouts();
    
    function getWorkoutsFromStorage() {
        return JSON.parse(localStorage.getItem('workouts')) || [];
    }

    //Näytetään lista aiemmista treeneistä
    function displayWorkouts() {
        workoutLog.innerHTML = '';
        const workouts = getWorkoutsFromStorage().reverse();

        workouts.forEach(function(workout) {
            const workoutItem = document.createElement('div');
            workoutItem.classList.add('workout-item');
            workoutItem.innerHTML = `
                <strong>Workout:</strong> ${workout.workout}<br>
                - ${workout.exercise1Name} : ${workout.exercise1} kg<br>
                - ${workout.exercise2Name} : ${workout.exercise2} kg<br>
                - ${workout.exercise3Name} : ${workout.exercise3} kg<br>
                <span class="date">${workout.date}</span>
                <p> </p>
            `;
            workoutLog.appendChild(workoutItem);
        });
    }
});
