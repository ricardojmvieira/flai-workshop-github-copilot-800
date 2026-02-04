from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Count
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer


class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer
    
    def list(self, request, *args, **kwargs):
        # Generate user-based leaderboard from activities
        users = User.objects.all()
        leaderboard_data = []
        
        for user in users:
            user_activities = Activity.objects.filter(user_name=user.name)
            
            total_activities = user_activities.count()
            total_calories = sum(a.calories for a in user_activities)
            total_distance = sum(a.distance or 0 for a in user_activities)
            
            # Calculate points (e.g., 1 point per activity + 1 point per 100 calories)
            points = total_activities + (total_calories // 100)
            
            leaderboard_data.append({
                'id': str(user._id),
                'user_name': user.name,
                'team': user.team,
                'total_activities': total_activities,
                'total_calories': total_calories,
                'total_distance': round(total_distance, 2),
                'points': points
            })
        
        # Sort by points descending
        leaderboard_data.sort(key=lambda x: x['points'], reverse=True)
        
        return Response(leaderboard_data)


class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer
