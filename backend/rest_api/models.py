from django.db import models

# Create your models here.


class ToDo(models.Model):
    name = models.CharField(max_length=255)
    timestamp = models.CharField(max_length=32)
    CHOICE = {
    ('', 'FALSE'),
    ('line-through', 'TRUE')
    }

    done = models.CharField(default='', choices=CHOICE, max_length=15, blank=True, null=True)

    def __str__(self):
        return self.name
