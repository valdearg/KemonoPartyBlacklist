import os
import base64
from typing import Union
import pyodbc
from pydantic import BaseModel
import mysql.connector
from mysql.connector import Error

from fastapi import FastAPI

app = FastAPI()

class UserInfo(BaseModel):
    user_name: str
    admin_key: str

class TagsInfo(BaseModel):
    user: str
    service: str
    text: str
    user_key: str

@app.post("/create_user")
async def receive_user_info(user_info: UserInfo):
    # You can access the received data through the `user_info` variable
    received_data = user_info.dict()

    if received_data['user_name']:
        print(f"Username: {received_data['user_name']}")
        username_encoded = base64.b64encode(received_data['user_name'].encode()).decode('utf-8')
        print(username_encoded)

    if received_data['admin_key'] != os.environ["ADMIN_KEY"]:
        return {
            "message": "Admin key is incorrect",
            "data": received_data["user_name"],
        }        

    try:
        # Establish the connection
        connection = mysql.connector.connect(
            host=os.environ["SERVER"],
            database=os.environ["DATABASE"],
            user=os.environ["UID"],
            password=os.environ["PWD"]
        )
        
        if connection.is_connected():
            db_info = connection.get_server_info()
            print(f"Connected to MySQL Server version {db_info}")
            cursor = connection.cursor()
            cursor.execute(f"SELECT * FROM users WHERE `username` = '{received_data['user_name']}';")
            record = cursor.fetchone()
            
            if record:
                return {
                    "message": "User already exists",
                    "data": received_data["user_name"],
                }
            
            cursor.execute(
                f"INSERT INTO `users` (`username`, `username_encrypted`, `last_request`) VALUES ('{received_data['user_name']}', '{username_encoded}', NOW());"
            )
            connection.commit()
            return {
                "message": "User created",
                "data": received_data["username"],
            }

    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed") 

@app.get("/get_tags/{service}/{user}")
async def receive_get_tags(service, user):
    # You can access the received data through the `user_info` variable
    print(f"Service: {service}")
    print(f"User: {user}")

    try:
        # Establish the connection
        connection = mysql.connector.connect(
            host=os.environ["SERVER"],
            database=os.environ["DATABASE"],
            user=os.environ["UID"],
            password=os.environ["PWD"]
        )
        
        if connection.is_connected():
            db_info = connection.get_server_info()
            print(f"Connected to MySQL Server version {db_info}")
            cursor = connection.cursor(buffered=True)
            cursor.execute(f"SELECT tag_text FROM tags WHERE `tag_service` = '{service}' AND `tag_user` = '{user}';")
            record = cursor.fetchall()
            
            if record:
                return {
                    "message": "OK",
                    "data": record,
                }

    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed") 

@app.post("/create_tags")
async def receive_create_tags(tags_info: TagsInfo):
    # You can access the received data through the `user_info` variable
    received_data = tags_info.dict()

    try:
        # Establish the connection
        connection = mysql.connector.connect(
            host=os.environ["SERVER"],
            database=os.environ["DATABASE"],
            user=os.environ["UID"],
            password=os.environ["PWD"]
        )
        
        if connection.is_connected():
            cursor = connection.cursor(buffered=True)
            cursor.execute(f"SELECT * FROM users WHERE `username_encrypted` = '{received_data["user_key"]}';")
            record = cursor.fetchall()
            
            if record:
                print(f"Identified users: {received_data["user_key"]}")
            else:
                return {
                    "message": f"User key {received_data["user_key"]} not valid",
                    "data": "error",
                }
            
            if received_data["text"]:
                for tag in received_data["text"].split(","):
                    print(f"Tag: {tag}")
                    
                    cursor.execute(f"SELECT * FROM tags WHERE `tag_service` = '{received_data['service']}' AND `tag_user` = '{received_data['user']}' AND `tag_text` = '{tag}';")
                    record = cursor.fetchone()
                    
                    if record:
                        print(f"Tag already exists: {tag}")
                        continue
                    
                    tag_insert_query = f"INSERT INTO `tags` (`tag_user`, `tag_service`, `tag_text`, `tag_addedby`, `tag_addedon`) VALUES ('{received_data['user']}', '{received_data['service']}', '{tag}', '{received_data["user_key"]}', NOW());"
                    
                    print(f"Ran query: {tag_insert_query}")
                    
                    cursor.execute(tag_insert_query)

                    connection.commit()

                return {
                    "message": "Tags created",
                    "data": received_data["text"],
                }

    except Error as e:
        print(f"Error while connecting to MySQL: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed") 