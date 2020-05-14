# -*- coding: utf-8 -*-
"""
Created on Sat Feb 15 11:38:28 2020

@author: acer
"""

file = open("ultra_small_vocab_en.txt","r")
file1 = open("30000ESP.txt","r")
english_phrases = file.readlines()
spanish_phrases = file1.readlines()
i=0


for single_phrase in english_phrases:
    print(single_phrase)
    print(spanish_phrases[i])
    i += 1
file.close()
file1.close() 
