from djongo import models


class User(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'users'
    
    def __str__(self):
        return self.name


class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'teams'
    
    def __str__(self):
        return self.name


class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    user_id = models.CharField(max_length=100)
    user_name = models.CharField(max_length=200)
    activity_type = models.CharField(max_length=100)
    duration = models.IntegerField()  # in minutes
    calories = models.IntegerField()
    distance = models.FloatField(null=True, blank=True)  # in km
    date = models.DateTimeField()
    team = models.CharField(max_length=100)
    
    class Meta:
        db_table = 'activities'
    
    def __str__(self):
        return f"{self.user_name} - {self.activity_type}"


class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    team = models.CharField(max_length=100)
    total_calories = models.IntegerField()
    total_activities = models.IntegerField()
    total_duration = models.IntegerField()  # in minutes
    average_calories_per_member = models.FloatField()
    rank = models.IntegerField()
    
    class Meta:
        db_table = 'leaderboard'
    
    def __str__(self):
        return f"{self.team} - Rank {self.rank}"


class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    name = models.CharField(max_length=200)
    description = models.TextField()
    activity_type = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    duration = models.IntegerField()  # in minutes
    estimated_calories = models.IntegerField()
    
    class Meta:
        db_table = 'workouts'
    
    def __str__(self):
        return self.name
