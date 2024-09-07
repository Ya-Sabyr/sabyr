from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

# Модели Пользователей
class User(models.Model):
    username = models.CharField(max_length=50, unique=True, verbose_name='Имя пользователя')
    email = models.EmailField(max_length=100, unique=True, verbose_name='Электронная почта')
    phone_number = models.CharField(max_length=50, unique=True, null=True, blank=True, verbose_name='Телефонный номер')
    password_hash = models.CharField(max_length=255, verbose_name='Пароль')
    stage = models.CharField(max_length=50, verbose_name='Этап')

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'Пользователь'
        verbose_name_plural = 'Пользователи'

# Модели Книг
class Book(models.Model):
    book_name = models.CharField(max_length=255, verbose_name='Название книги')
    author = models.CharField(max_length=255, null=True, blank=True, verbose_name='Автор')
    book_description_ru = models.TextField(null=True, blank=True, verbose_name='Описание книги (рус)')
    book_description_kz = models.TextField(null=True, blank=True, verbose_name='Описание книги (каз)')
    comment = models.TextField(null=True, blank=True, verbose_name='Комментарий')  # Renamed comment field
    rating = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)], verbose_name='Рейтинг')
    book_status = models.CharField(max_length=50, null=True, blank=True, verbose_name='Статус книги')
    book_language = models.CharField(max_length=100, null=True, blank=True, verbose_name='Язык книги')
    tags = models.JSONField(default=list, blank=True, verbose_name='Теги')

    def __str__(self):
        return self.book_name

    class Meta:
        verbose_name = 'Книга'
        verbose_name_plural = 'Книги'

# Модели Книжных полок
class BookShelf(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, verbose_name='Книга')
    user_rating = models.FloatField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(5)], verbose_name='Оценка пользователя')
    user_comment = models.TextField(null=True, blank=True, verbose_name='Комментарий пользователя')
    user_read_status = models.CharField(max_length=50, verbose_name='Статус чтения')

    def __str__(self):
        return f'{self.user.username} - {self.book.book_name}'

    class Meta:
        verbose_name = 'Книжная полка'
        verbose_name_plural = 'Книжные полки'

# Модели Комментариев
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='comments', verbose_name='Книга')
    content = models.TextField(verbose_name='Содержание')
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies', verbose_name='Родительский комментарий')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    def __str__(self):
        return f'Комментарий от {self.user.username} к {self.book.book_name}'

    class Meta:
        verbose_name = 'Комментарий'
        verbose_name_plural = 'Комментарии'

# Модели Ролей
class Role(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Название роли')
    description = models.TextField(verbose_name='Описание')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Роль'
        verbose_name_plural = 'Роли'

# Модели Клубов
class Club(models.Model):
    club_id = models.CharField(max_length=255, primary_key=True, verbose_name='ID клуба')
    user_id = models.JSONField(verbose_name='Пользователи')  # Assuming it's a list of user IDs

    def __str__(self):
        return self.club_id

    class Meta:
        verbose_name = 'Клуб'
        verbose_name_plural = 'Клубы'

# Модели Членов клуба
class Member(models.Model):
    club = models.ForeignKey(Club, on_delete=models.CASCADE, verbose_name='Клуб')
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    role = models.ForeignKey(Role, null=True, blank=True, on_delete=models.CASCADE, verbose_name='Роль')

    def __str__(self):
        return f'{self.user.username} - {self.club.club_id}'

    class Meta:
        verbose_name = 'Член клуба'
        verbose_name_plural = 'Члены клуба'

# Модели Созданий
class Creation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Пользователь')
    caption = models.CharField(max_length=255, verbose_name='Подпись')
    image_id = models.CharField(max_length=255, verbose_name='ID изображения')
    tags = models.JSONField(default=list, blank=True, verbose_name='Теги')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')

    def __str__(self):
        return f'Создание от {self.user.username}'

    class Meta:
        verbose_name = 'Создание'
        verbose_name_plural = 'Создания'
