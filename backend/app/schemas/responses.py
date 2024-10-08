from pydantic import BaseModel
from typing import List, Dict, Union

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    
class Contacts(BaseModel):
    contacts: list

class ChatMessages(BaseModel):
    user_messages: list
    pradavan_messages: list
    

class Template(BaseModel):
    pass


class TemplateList(BaseModel):
    templates: Template
    