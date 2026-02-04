from django.contrib import admin
from .models import User, Team, Activity, Leaderboard, Workout


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'team', 'created_at')
    search_fields = ('name', 'email', 'team')
    list_filter = ('team', 'created_at')


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)


@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    list_display = ('user_name', 'activity_type', 'duration', 'calories', 'team', 'date')
    search_fields = ('user_name', 'activity_type', 'team')
    list_filter = ('activity_type', 'team', 'date')


@admin.register(Leaderboard)
class LeaderboardAdmin(admin.ModelAdmin):
    list_display = ('team', 'rank', 'total_calories', 'total_activities', 'total_duration', 'average_calories_per_member')
    search_fields = ('team',)
    list_filter = ('rank',)
    ordering = ('rank',)


@admin.register(Workout)
class WorkoutAdmin(admin.ModelAdmin):
    list_display = ('name', 'activity_type', 'difficulty', 'duration', 'estimated_calories')
    search_fields = ('name', 'activity_type', 'description')
    list_filter = ('difficulty', 'activity_type')
