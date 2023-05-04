import nltk
import json
import random
from flask import Flask, render_template, request,jsonify
from flask_cors import CORS,cross_origin
import os
nltk.download('punkt')
print("test")
# Load the intents file
with open('intents.json') as file:
    intents1 = json.load(file)
# trainingData\Locations\mirkwoodData.json
with open('./trainingData/Locations/mirkwoodData.json') as file:
    intents2 = json.load(file)
    
with open('./trainingData/Locations/bagEndData.json') as file:
    intents3 = json.load(file)
# Tokenize and stem the words in the patterns
# used to reduce words to their base form
intents = intents1['intents']+ intents2['intents']+ intents3['intents']


# print(intents1['intents'])
# print()
# print(intents)

stemmer = nltk.stem.PorterStemmer()

words = []

for intent in intents:
    for pattern in intent['patterns']:
        tokens = nltk.word_tokenize(pattern)
        words.extend(tokens)

# list of stemmed words is then sorted and filtered to remove any duplicate words
words = [stemmer.stem(w.lower()) for w in words if w != '?']
words = sorted(list(set(words)))

# Create training data
training_data = []
for intent in intents:
    for pattern in intent['patterns']:
        # tokenizes and stems each pattern
        tokens = nltk.word_tokenize(pattern)
        stemmed_tokens = [stemmer.stem(w.lower()) for w in tokens if w != '?']

        # Create a dictionary featureset for the pattern
        featureset = {w: (w in stemmed_tokens) for w in words}

        # Append the featureset and output label to the training data
        training_data.append((featureset, intent['tag']))

# Train a Naive Bayes classifier on the training data
classifier = nltk.NaiveBayesClassifier.train(training_data)


def generate_response(input_text, threshold=0.5):
    
    # Tokenize and stem the input text
    tokens = nltk.word_tokenize(input_text)
    stemmed_tokens = [stemmer.stem(w.lower()) for w in tokens if w != '?']

    # Create a featureset for the input text
    input_featureset = {w: (w in stemmed_tokens) for w in words}

    # Use the classifier to predict the output label and confidence scores
    prob_dist = classifier.prob_classify(input_featureset)
    output_label = prob_dist.max()
    confidence_score = prob_dist.prob(output_label)


    # Check if the input is in the dataset based on the confidence score
    print(confidence_score)
    if confidence_score < threshold:
        return "I'm sorry, I don't understand. Can you please rephrase your question?"
    
    # Select a random response for the output label
    for intent in intents:
        if intent['tag'] == output_label:
            response = random.choice(intent['responses'])
            break

    return response


# def chat():
#     print("Start talking with the bot (type 'quit' to exit)")

#     while True:
#         # Get user input
#         user_input = input("You: ")

#         if user_input.lower() == 'quit':
#             break

#         # Generate a response and print it
#         response = generate_response(user_input)
#         print("Bot:", response)


# chat()

app = Flask(__name__)
cors = CORS(app)

@app.route('/get')
@cross_origin()
def get_bot_response():
    user_input = request.args.get('msg')
    bot_response = str(generate_response(user_input))
    # print(bot_response)
    # if (str(bot_response).startswith("- ")):
    #   bot_response = str(bot_response)[2:]
    return jsonify({'response':bot_response})

if __name__ == '__main__':
    app.run(debug=True)
