# -*- coding: utf-8 -*-
"""
Created on Sat Feb 15 12:38:22 2020

@author: acer
"""


def text_to_ids(source_text, target_text, source_vocab_to_int, target_vocab_to_int):
    """
    Convert source and target text to proper word ids
    :param source_text: String that contains all the source text.
    :param target_text: String that contains all the target text.
    :param source_vocab_to_int: Dictionary to go from the source words to an id
    :param target_vocab_to_int: Dictionary to go from the target words to an id
    :return: A tuple of lists (source_id_text, target_id_text)
    """
    # Just go through the text and transform it.
    source_id_text = []
    for idx, line in enumerate(source_text.split('\n')):
        source_id_text.append([])
        for word in line.split():
            source_id_text[idx].append(source_vocab_to_int[word])
        
    target_id_text = []
    for idx, line in enumerate(target_text.split('\n')):
        target_id_text.append([])
        for word in line.split():
            target_id_text[idx].append(target_vocab_to_int[word])
        target_id_text[idx].append(target_vocab_to_int['<EOS>'])

    return (source_id_text, target_id_text)



"""
DON'T MODIFY ANYTHING IN THIS CELL
"""
import helper
import problem_unittests as tests

source_path = 'data/ingles'
target_path = 'data/espanol'
source_text = helper.load_data(source_path)
target_text = helper.load_data(target_path)

view_sentence_range = (10, 20)

"""
DON'T MODIFY ANYTHING IN THIS CELL
"""
import numpy as np

print('Dataset Stats')
print('Roughly the number of unique words: {}'.format(len({word: None for word in source_text.split()})))

sentences = source_text.split('\n')
word_counts = [len(sentence.split()) for sentence in sentences]
print('Number of sentences: {}'.format(len(sentences)))
print('Average number of words in a sentence: {}'.format(np.average(word_counts)))

print()
print('English sentences {} to {}:'.format(*view_sentence_range))
print('\n'.join(source_text.split('\n')[view_sentence_range[0]:view_sentence_range[1]]))
print()
print('Spanish sentences {} to {}:'.format(*view_sentence_range))
print('\n'.join(target_text.split('\n')[view_sentence_range[0]:view_sentence_range[1]]))


tests.test_text_to_ids(text_to_ids)

helper.preprocess_and_save_data(source_path, target_path, text_to_ids)
