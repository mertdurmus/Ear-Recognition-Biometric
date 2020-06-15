# -*- coding: utf-8 -*-
"""
Created on Sat Jun 13 10:37:21 2020

@author: elifaskvav
"""

import sys
import cv2
import imutils
import numpy as np 
import math  

name = '01.jpg'
angles=[]
list2=[]
new_list2 = []

def calculateDistance(x1,y1,x2,y2):  
     dist = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)  
     return dist 



def getAngle(a, b, c):
    ang = math.degrees(math.atan2(c[1]-b[1], c[0]-b[0]) - math.atan2(a[1]-b[1], a[0]-b[0]))
    return ang + 360 if ang < 0 else ang



def readImage(name):
    img = cv2.imread(name,0)
    img2 = cv2.imread(name)
    img3 = cv2.imread(name)
    ret,thresh = cv2.threshold(img,125,100,0)
    contours,hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    #cv2.drawContours(img2, contours, -1, (0, 255, 0), 3)
    #cv2.imshow('Contours', img2) 
    #cv2.waitKey(0) 
    #cv2.destroyAllWindows() 
    print("Number of Contours found = " + str(len(contours))) 
    selectContour(contours)
    


def selectContour(contours):
    contur=[]
    x=len(contours)
    for k in range(0,x):
        area=cv2.contourArea(contours[k])
        if area > 4000:
            contur.append(contours[k])
    print("Number of Contours found = " + str(len(contur))) 
    diskontur=contur[0]
    ickontur=contur[1]
    ickontur2=contur[2]
    mesafeler=[]
    mycontour = diskontur
    x=len(mycontour)
    for k in range(0,x):
        for i in range(0,x):
            x1=mycontour[k][0]
            y1=x1[1]
            x1=x1[0]
            x2=mycontour[i][0]
            y2=x2[1]
            x2=x2[0]
            distance=calculateDistance(x1,y1,x2,y2)
            mesafeler.append([distance,x1,y1,x2,y2])
    x,a,b,c,d=max(mesafeler)
    px = (a, b)
    py = (c, d)
    print(px,py)
    x_m_point = int((a + c)/2)
    y_m_point = int((b + d)/2)
    p1= px
    p2 =py
    #p_middle=(x_m_point,y_m_point)
    #p_line1=(0,y_m_point)
    #p_line2=(x_m_point+150,y_m_point)    
    theta = np.arctan2(p1[1]-p2[1], p1[0]-p2[0])
    endpt_x = int(p1[0] - 1000*np.cos(theta))
    endpt_y = int(p1[1] - 1000*np.sin(theta))
    x=len(mycontour)
    list=[]
    for k in range(0,x):
        for i in range(0,x):
            x1=mycontour[k][0]
            y1=x1[1]
            x1=x1[0]
            if y1==y_m_point:
                list.append([x1,y1])
            elif y1==(y_m_point-60):
                list.append([x1,y1])
            elif y1==(y_m_point+60):
                list.append([x1,y1])
            elif y1==(y_m_point-120):
                list.append([x1,y1])
            elif y1==(y_m_point+120):
                list.append([x1,y1])
    list2=np.array(list)
    new_list = np.unique(list2, axis=0)
    print('Unique Values : ',new_list)
    k1=(new_list[0][0],new_list[0][1])
    k2=(new_list[1][0],new_list[1][1])
    k3=(new_list[2][0],new_list[2][1])
    k4=(new_list[3][0],new_list[3][1])
    angles.append(getAngle((endpt_x, endpt_y),(x_m_point, y_m_point), (k1[0], k1[1])))
    angles.append(getAngle((endpt_x, endpt_y),(x_m_point, y_m_point), (k2[0], k2[1])))
    angles.append(getAngle((endpt_x, endpt_y),(x_m_point, y_m_point), (k3[0], k3[1])))
    angles.append(getAngle((endpt_x, endpt_y),(x_m_point, y_m_point), (k4[0], k4[1])))
    for i in range(0,len(angles)-1):
        if int(angles[i])>180:
            angles[i]=369- angles[i]
        else:
             angles[i]= angles[i]
         #angles is my first feature vector
    getSecondVector(ickontur, x_m_point, y_m_point)
 
    
 
    

def getSecondVector(ickontur, x_m_point, y_m_point):
    mycntr=ickontur
    x=len(mycntr)
    for k in range(0,x):
        for i in range(0,x):
            x1=mycntr[k][0]
            y1=x1[1]
            x1=x1[0]
            if y1==y_m_point:
                list2.append([x1,y1])
            elif y1==(y_m_point-60):
                list2.append([x1,y1])
            elif y1==(y_m_point+60):
                list2.append([x1,y1])
            elif y1==(y_m_point-120):
                list2.append([x1,y1])
            elif y1==(y_m_point+120):
                list2.append([x1,y1])
    #global list2
    #list2=np.array(list2)
    new_list2 = np.unique(list2, axis=0)
     
    print('Unique Values : ',new_list2)
    ##new_list2 is my second feature vector
        





def secretKey(angles,list2, nonce):
    x=(angles[0]*angles[2])/(angles[1]*angles[3])
    print(x)
    x = x * nonce
    list2=np.array(list2)
    new_list2 = np.unique(list2, axis=0)
    y = new_list2[0][1] * new_list2[1][0]
    y = y / x
    y = y * nonce * nonce
    return y


def init(nonce, imageName):
    print(imageName)
    readImage(imageName)
    t = secretKey(angles, list2, nonce)
    return t

#init(4, '01.jpg')

"""
readImage(name)
print(angles)
list2=np.array(list2)
new_list2 = np.unique(list2, axis=0)
print(new_list2)
t = secretKey(angles, new_list2, 3)
print('t', t)
"""




































































