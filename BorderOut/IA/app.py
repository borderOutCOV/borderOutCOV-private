from flask import Flask
import tensorflow as tf
import helper
import problem_unittests as tests
from flask import jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#Ejecutar correr Comando flask run --host=0.0.0.0

@app.route('/IA/<string:frase>')
@cross_origin()
def traducir(frase):
    # Number of Epochs
    epochs = 10
    # Batch Size
    batch_size = 512
    # RNN Size
    rnn_size = 128
    # Number of Layers
    num_layers = 2
    # Embedding Size
    encoding_embedding_size = 128
    decoding_embedding_size = 128
    # Learning Rate
    learning_rate = 0.001
    # Dropout Keep Probability
    keep_probability = 0.55
    display_step = True

    _, (source_vocab_to_int, target_vocab_to_int), (source_int_to_vocab, target_int_to_vocab) = helper.load_preprocess()
    load_path = helper.load_params()
    tests.test_sentence_to_seq(sentence_to_seq)
    translate_sentence = frase
    pIngles=translate_sentence
    translate_sentence = sentence_to_seq(translate_sentence, source_vocab_to_int)
    loaded_graph = tf.Graph()
    with tf.Session(graph=loaded_graph) as sess:
        # Load saved model
        loader = tf.train.import_meta_graph(load_path + '.meta')
        loader.restore(sess, load_path)

        input_data = loaded_graph.get_tensor_by_name('input:0')
        logits = loaded_graph.get_tensor_by_name('predictions:0')
        target_sequence_length = loaded_graph.get_tensor_by_name('target_sequence_length:0')
        source_sequence_length = loaded_graph.get_tensor_by_name('source_sequence_length:0')
        keep_prob = loaded_graph.get_tensor_by_name('keep_prob:0')

        translate_logits = sess.run(logits, {input_data: [translate_sentence]*batch_size,
                                            target_sequence_length: [len(translate_sentence)*2]*batch_size,
                                            source_sequence_length: [len(translate_sentence)]*batch_size,
                                            keep_prob: 1.0})[0]
    """
    print('Input')
    print('  Word Ids:      {}'.format([i for i in translate_sentence]))
    print('  English Words: {}'.format([source_int_to_vocab[i] for i in translate_sentence]))

    print('\nPrediction')
    print('  Word Ids:      {}'.format([i for i in translate_logits]))
    print('  Spanish Words: {}'.format(" ".join([target_int_to_vocab[i] for i in translate_logits])))
    """
    variableRetornar = format(" ".join([target_int_to_vocab[i] for i in translate_logits]))
    return variableRetornar

    #return fraseEspanol

def sentence_to_seq(sentence, vocab_to_int):
    """
    Convert a sentence to a sequence of ids
    :param sentence: String
    :param vocab_to_int: Dictionary to go from the words to an id
    :return: List of word ids
    """
    word_ids = []
    for word in sentence.lower().split():
        if word in vocab_to_int:
            word_ids.append(vocab_to_int[word])
        else:
            word_ids.append(vocab_to_int['<UNK>'])
    return word_ids
