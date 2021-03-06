# Generated by Django 3.1.4 on 2020-12-15 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cuadros', '0009_auto_20201215_1043'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tag', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='cuadro',
            name='tags',
            field=models.ManyToManyField(to='cuadros.Tag', verbose_name='cuadros'),
        ),
    ]
