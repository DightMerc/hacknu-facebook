# Generated by Django 3.1.7 on 2021-03-19 07:43

from django.db import migrations, models
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentification', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GUID', models.CharField(default='', max_length=128)),
                ('title', models.CharField(default='', max_length=256)),
                ('description', models.TextField()),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.category')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CategoryPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GUID', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('photo', models.ImageField(upload_to='photo/category/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Good',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GUID', models.CharField(default='', max_length=128)),
                ('title', models.CharField(default='', max_length=256)),
                ('barcode', models.CharField(default='', max_length=256)),
                ('price', models.IntegerField(default=0)),
                ('description', models.TextField()),
                ('category', models.ManyToManyField(blank=True, to='core.Category')),
            ],
        ),
        migrations.CreateModel(
            name='GoodPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GUID', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('photo', models.ImageField(upload_to='photo/product/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='GoodStatus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.IntegerField(default=0)),
                ('GUID', models.CharField(default='', max_length=128)),
                ('title', models.CharField(default='', max_length=256)),
            ],
        ),
        migrations.CreateModel(
            name='UserPhoto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GUID', models.CharField(blank=True, default='', max_length=255, null=True)),
                ('photo', models.ImageField(upload_to='photo/user/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GUID', models.CharField(default='', max_length=128)),
                ('ITN', models.CharField(default='', max_length=128)),
                ('photo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.userphoto')),
                ('user', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='authentification.user')),
            ],
        ),
        migrations.CreateModel(
            name='Position',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.IntegerField(default=0)),
                ('good', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.good')),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('GUID', models.CharField(default='', max_length=128)),
                ('positions', models.ManyToManyField(to='core.Position')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='core.user')),
            ],
        ),
        migrations.AddField(
            model_name='good',
            name='photo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.goodphoto'),
        ),
        migrations.AddField(
            model_name='good',
            name='status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.goodstatus'),
        ),
        migrations.AddField(
            model_name='category',
            name='photo',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='core.categoryphoto'),
        ),
    ]
