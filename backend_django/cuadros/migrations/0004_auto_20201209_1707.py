# Generated by Django 3.1.4 on 2020-12-09 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cuadros', '0003_auto_20201209_1413'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tamañocuadro',
            name='precio',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=6, null=True),
        ),
    ]
