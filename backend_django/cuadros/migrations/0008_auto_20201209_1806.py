# Generated by Django 3.1.4 on 2020-12-09 21:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cuadros', '0007_tamañocuadro_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tamañocuadro',
            name='active',
        ),
        migrations.AddField(
            model_name='tamaño',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
