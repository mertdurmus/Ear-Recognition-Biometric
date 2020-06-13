# -*- coding: utf-8 -*-
from flask import Flask, jsonify
from flask import make_response
from flask import request
import requests as rs
import urllib
from bs4 import BeautifulSoup
from urllib.request import urlopen
import json
import MySQLdb
import jwt
import datetime
from functools import wraps
import hashlib, binascii, os

from earApi import init



def token_required(token):   
    invalid_msg = {
        'message': 'Invalid token. Registeration and / or authentication required',
        'authenticated': False
    }
    expired_msg = {
        'message': 'Expired token. Reauthentication required.',
        'authenticated': False
       }

    try:
        
        data = decode_auth_token(token)
        if str(data)=="Signature expired. Please log in again.":
            return jsonify(expired_msg)
        elif str(data)=="Invalid token. Please log in again.":
            return jsonify(invalid_msg)
        else:    
            return True

    except:
        print('')
        return  jsonify('false')






def encode_auth_token(username):
    try:
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=0, seconds=300),
            'iat': datetime.datetime.utcnow(),
            'sub': username
        }
        return jwt.encode(
            payload,
            app.config.get('SECRET_KEY'),
            algorithm='HS256'
        )
    except Exception as e:
        return e
  
  



  
def decode_auth_token(auth_token):
    try:
        payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
        return payload['sub']
    except jwt.ExpiredSignatureError:
        return 'Signature expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'





    
def hash_password(password):
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), 
                                salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')






def verify_password(stored_password, provided_password):
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', 
                                  provided_password.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password






app = Flask(__name__)
app.config['SECRET_KEY'] = 'xxx'
app.config["IMAGE_UPLOADS"] = 'C:/Users/mert5/Desktop/calismalar/ear recognition 21.05.2020'




@app.route("/userSave",methods=['POST'])
def registerUser():
    try:
        tx_data = request.json
        required_fields = ["name", "surname","phone", "tc","username", "passwd"]
    
                
        db = MySQLdb.connect(host="localhost",  
                             user="root",       
                             passwd="toor",     
                             db="earrecognition")

        cur = db.cursor()
        #name=tx_data.get("name")
        #surname=tx_data.get("surname")
        #email=tx_data.get("email")
        #phone=tx_data.get("phone")
        #tc=tx_data.get("tc")
        #password=tx_data.get("password")
        sql = "INSERT INTO user (name, surname,email, phone, tc, password) VALUES(%s,%s,%s,%s,%s,%s)"
        val=(format(str(tx_data['name'])),format(str(tx_data['surname'])),format(str(tx_data['email'])),format(str(tx_data['phone'])),format(str(tx_data['tc'])),format(str(hash_password(tx_data['password']))) )
        cur.execute(sql,val)
        db.commit()
        print(cur.rowcount, "record inserted.")
    
        return json.dumps("successfully registered user")
    except (MySQLdb.Error, MySQLdb.Warning) as e:
        try:      
            print(e)
            error=str(e)
            response = jsonify(error)
            response.status_code = 200
            return response
        except IndexError:
            error=str(e)
            response = jsonify(error)
            return response
    except TypeError as e:
        print(e)
        error=str(e)
        response = jsonify(error)
        return response
    except ValueError as e:
        print(e)
        error=str(e)
        response = jsonify(error)
        return response
    finally:
        cur.close()
        db.close()






x=""
@app.route("/login",methods=['POST'])
def login():
    
    tx_data = request.json
    email=tx_data['email']
    password=tx_data['password']
            
    db = MySQLdb.connect(host="localhost",
                         user="root",     
                         passwd="toor",    
                         db="earrecognition")   

    cur = db.cursor()
    query_string="SELECT password FROM user WHERE email= %s"
    cur.execute(query_string, (email,))
    rows = cur.fetchall()
    for row in rows:
        print(row[0])
        global x
        x=row[0]
    deger=verify_password(x, tx_data['password'])
    if deger==True:
        """
        token = jwt.encode({
            'user': username,
            'password': password,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])
        """
        token=encode_auth_token(email)
    else:
        token = 'Invalid username or password'

    #return jsonify({'token': token})
    return jsonify({'token': token.decode('UTF-8')})


x=''
@app.route("/getUser",methods=['POST'])
def sendUserInfo():
    tx_data = request.json
    email=tx_data['email']    
    db = MySQLdb.connect(host="localhost",
                         user="root",     
                         passwd="toor",    
                         db="earrecognition")   

    cur = db.cursor()
    query_string="SELECT name, surname, phone, tc, email FROM user WHERE email= %s"
    cur.execute(query_string, (email,))
    rows = cur.fetchall()
    for row in rows:
        print(row[0])
        print(row)
        x=row
    return json.dumps({'name':x[0], 'surname':x[1], 'phone':x[2],'tc':x[3],'email':x[4]})

    


@app.route("/uploadImage", methods=["GET", "POST"])
def upload_image():

    if request.method == "POST":
        if request.files:
            image = request.files["file"]
            print(image)
            image.save(os.path.join(app.config["IMAGE_UPLOADS"], image.filename))
            return json.dumps("successful")
    print()
    return json.dumps("no")



@app.route("/getSecretKey",methods=['POST'])
def getSecretKey():
    tx_data = request.json
    nonce=tx_data['nonce']   
    secretKey = init(float(nonce))
    return json.dumps({'secretKey':secretKey})



"""
{
"name":"123",
"surname":"123",
"email":"123",
  "phone":"123",
    "tc":"123",
      "password":"123"
}

"""


































