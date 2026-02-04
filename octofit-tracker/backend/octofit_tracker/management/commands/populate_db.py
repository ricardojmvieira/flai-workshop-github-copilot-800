from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database population...'))

        # Clear existing data
        self.stdout.write('Clearing existing data...')
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Existing data cleared.'))

        # Create Teams
        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Assemble! The mightiest heroes on Earth united to defend against threats.'
        )
        team_dc = Team.objects.create(
            name='Team DC',
            description='Justice League - protecting truth, justice, and the way.'
        )
        self.stdout.write(self.style.SUCCESS('Teams created.'))

        # Create Marvel Users
        self.stdout.write('Creating Marvel superheroes...')
        marvel_heroes = [
            {'name': 'Iron Man', 'email': 'tony.stark@marvel.com'},
            {'name': 'Captain America', 'email': 'steve.rogers@marvel.com'},
            {'name': 'Thor', 'email': 'thor.odinson@marvel.com'},
            {'name': 'Black Widow', 'email': 'natasha.romanoff@marvel.com'},
            {'name': 'Hulk', 'email': 'bruce.banner@marvel.com'},
            {'name': 'Spider-Man', 'email': 'peter.parker@marvel.com'},
            {'name': 'Black Panther', 'email': 'tchalla@marvel.com'},
            {'name': 'Doctor Strange', 'email': 'stephen.strange@marvel.com'},
        ]

        marvel_users = []
        for hero in marvel_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team Marvel'
            )
            marvel_users.append(user)

        # Create DC Users
        self.stdout.write('Creating DC superheroes...')
        dc_heroes = [
            {'name': 'Batman', 'email': 'bruce.wayne@dc.com'},
            {'name': 'Superman', 'email': 'clark.kent@dc.com'},
            {'name': 'Wonder Woman', 'email': 'diana.prince@dc.com'},
            {'name': 'Flash', 'email': 'barry.allen@dc.com'},
            {'name': 'Aquaman', 'email': 'arthur.curry@dc.com'},
            {'name': 'Green Lantern', 'email': 'hal.jordan@dc.com'},
            {'name': 'Cyborg', 'email': 'victor.stone@dc.com'},
            {'name': 'Shazam', 'email': 'billy.batson@dc.com'},
        ]

        dc_users = []
        for hero in dc_heroes:
            user = User.objects.create(
                name=hero['name'],
                email=hero['email'],
                team='Team DC'
            )
            dc_users.append(user)

        self.stdout.write(self.style.SUCCESS(f'Created {len(marvel_users) + len(dc_users)} users.'))

        # Create Activities
        self.stdout.write('Creating activities...')
        activity_types = ['Running', 'Swimming', 'Cycling', 'Weightlifting', 'Boxing', 'Yoga', 'HIIT']
        all_users = marvel_users + dc_users
        
        activities_created = 0
        for user in all_users:
            # Create 5-10 activities per user
            num_activities = random.randint(5, 10)
            for i in range(num_activities):
                activity_type = random.choice(activity_types)
                duration = random.randint(20, 120)  # 20-120 minutes
                calories = duration * random.randint(5, 12)  # Calories burned
                distance = round(random.uniform(2, 20), 2) if activity_type in ['Running', 'Cycling', 'Swimming'] else None
                
                Activity.objects.create(
                    user_id=str(user._id),
                    user_name=user.name,
                    activity_type=activity_type,
                    duration=duration,
                    calories=calories,
                    distance=distance,
                    date=datetime.now() - timedelta(days=random.randint(0, 30)),
                    team=user.team
                )
                activities_created += 1

        self.stdout.write(self.style.SUCCESS(f'Created {activities_created} activities.'))

        # Calculate and create Leaderboard entries
        self.stdout.write('Calculating leaderboard...')
        
        # Team Marvel stats
        marvel_activities = Activity.objects.filter(team='Team Marvel')
        marvel_total_calories = sum(a.calories for a in marvel_activities)
        marvel_total_duration = sum(a.duration for a in marvel_activities)
        marvel_count = marvel_activities.count()
        marvel_avg_calories = marvel_total_calories / len(marvel_users) if marvel_users else 0

        # Team DC stats
        dc_activities = Activity.objects.filter(team='Team DC')
        dc_total_calories = sum(a.calories for a in dc_activities)
        dc_total_duration = sum(a.duration for a in dc_activities)
        dc_count = dc_activities.count()
        dc_avg_calories = dc_total_calories / len(dc_users) if dc_users else 0

        # Determine ranks
        teams_stats = [
            ('Team Marvel', marvel_total_calories, marvel_count, marvel_total_duration, marvel_avg_calories),
            ('Team DC', dc_total_calories, dc_count, dc_total_duration, dc_avg_calories)
        ]
        teams_stats.sort(key=lambda x: x[1], reverse=True)  # Sort by total calories

        for idx, (team_name, total_calories, total_activities, total_duration, avg_calories) in enumerate(teams_stats, 1):
            Leaderboard.objects.create(
                team=team_name,
                total_calories=total_calories,
                total_activities=total_activities,
                total_duration=total_duration,
                average_calories_per_member=avg_calories,
                rank=idx
            )

        self.stdout.write(self.style.SUCCESS('Leaderboard created.'))

        # Create Workouts
        self.stdout.write('Creating workout suggestions...')
        workouts = [
            {
                'name': 'Hero Training Circuit',
                'description': 'High-intensity circuit training for superhero conditioning',
                'activity_type': 'HIIT',
                'difficulty': 'Hard',
                'duration': 45,
                'estimated_calories': 500
            },
            {
                'name': 'Speedster Sprint Session',
                'description': 'Interval running to build explosive speed',
                'activity_type': 'Running',
                'difficulty': 'Medium',
                'duration': 30,
                'estimated_calories': 350
            },
            {
                'name': 'Atlantean Swim',
                'description': 'Endurance swimming workout',
                'activity_type': 'Swimming',
                'difficulty': 'Medium',
                'duration': 60,
                'estimated_calories': 600
            },
            {
                'name': 'Super Soldier Strength',
                'description': 'Full-body weightlifting routine',
                'activity_type': 'Weightlifting',
                'difficulty': 'Hard',
                'duration': 60,
                'estimated_calories': 450
            },
            {
                'name': 'Warrior Yoga Flow',
                'description': 'Flexibility and balance training',
                'activity_type': 'Yoga',
                'difficulty': 'Easy',
                'duration': 45,
                'estimated_calories': 200
            },
            {
                'name': 'Combat Boxing',
                'description': 'Boxing drills for combat readiness',
                'activity_type': 'Boxing',
                'difficulty': 'Medium',
                'duration': 45,
                'estimated_calories': 500
            },
            {
                'name': 'Endurance Cycling',
                'description': 'Long-distance cycling for stamina',
                'activity_type': 'Cycling',
                'difficulty': 'Easy',
                'duration': 90,
                'estimated_calories': 700
            },
            {
                'name': 'Power HIIT Blast',
                'description': 'Maximum intensity interval training',
                'activity_type': 'HIIT',
                'difficulty': 'Hard',
                'duration': 30,
                'estimated_calories': 400
            },
        ]

        for workout_data in workouts:
            Workout.objects.create(**workout_data)

        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts.'))
        self.stdout.write(self.style.SUCCESS('Database population completed successfully!'))
