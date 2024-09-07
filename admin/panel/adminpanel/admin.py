from django.contrib import admin
from .models import User, Book, BookShelf, Comment, Role, Club, Member, Creation

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'phone_number', 'stage')
    search_fields = ('username', 'email')
    
    class Meta:
        model = User

class BookAdmin(admin.ModelAdmin):
    list_display = ('book_name', 'author', 'rating', 'book_language')
    search_fields = ('book_name', 'author')
    list_filter = ('book_language', 'rating')
    
    class Meta:
        model = Book

class BookShelfAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'user_rating', 'user_read_status')
    search_fields = ('user__username', 'book__book_name')
    list_filter = ('user_read_status',)\
        
    class Meta:
        model = BookShelf

class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'book', 'content', 'created_at')
    search_fields = ('user__username', 'book__book_name', 'content')
    list_filter = ('created_at', 'updated_at')
    
    class Meta:
        model = Comment

class RoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    search_fields = ('name',)
    
    class Meta:
        model = Role

class ClubAdmin(admin.ModelAdmin):
    list_display = ('club_id',)
    search_fields = ('club_id',)
    
    class Meta:
        model = Club

class MemberAdmin(admin.ModelAdmin):
    list_display = ('club', 'user', 'role')
    search_fields = ('club__club_id', 'user__username')
    list_filter = ('role',)
    
    class Meta:
        model = Member

class CreationAdmin(admin.ModelAdmin):
    list_display = ('user', 'caption', 'image_id', 'created_at')
    search_fields = ('user__username', 'caption')
    list_filter = ('created_at',)
    
    class Meta:
        model = Creation
        
admin.site.register(User, UserAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(BookShelf, BookShelfAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(Role, RoleAdmin)
admin.site.register(Club, ClubAdmin)
admin.site.register(Member, MemberAdmin)
admin.site.register(Creation, CreationAdmin)
