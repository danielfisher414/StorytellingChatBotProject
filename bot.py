from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.logic import BestMatch
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.conversation import Statement
from flask import Flask, render_template, request,jsonify
from flask_cors import CORS,cross_origin

app = Flask(__name__)

chatbot = ChatBot('hobbit bot',
    logic_adapters=[
        {
            'import_path': 'chatterbot.logic.BestMatch',
            'default_response': 'I am sorry, but I do not understand.',
            'maximum_similarity_threshold': 0.90
        }
    ]
                )

trainer = ListTrainer(chatbot)
trainerCorpus = ChatterBotCorpusTrainer(chatbot)
# chatbot.logic_adapters = [{'import_path': 'chatterbot.logic.BestMatch',        'statement_comparison_function': 'chatterbot.comparisons.levenshtein_distance',        'response_selection_method': 'chatterbot.response_selection.get_first_response',
#                            'default_response': 'I am sorry, but I do not understand.',        'maximum_similarity_threshold': 0.90},    {'import_path': 'chatterbot.logic.Greetings',        'default_response': 'Hello! How can I help you today?'}]



trainerCorpus.train(
    "chatterbot.corpus.english.greetings",
    "chatterbot.corpus.english.conversations"
)

# Train using your data.yml file
with open('data.yml', 'r') as file:
    data = file.read().splitlines()

# # Train using my own data
trainer.train(data)
# conversations = data['conversations']
# trainer.train(conversations)
# for conversation in data['conversations']:
#     trainer.train(conversation)

# print("Hello")

# flash application
# @app.route('/')
# def home():
#     return render_template('index.html')

app = Flask(__name__)
cors = CORS(app)

@app.route('/get')
@cross_origin()
def get_bot_response():
    user_input = request.args.get('msg')
    bot_response = str(chatbot.get_response(user_input))
    return jsonify({'response':bot_response})

if __name__ == '__main__':
    app.run(debug=True)

# end flash application
# while True:
#     try:
#         user_input = input()
#         bot_response = chatbot.get_response(user_input)
#         # if bot_response.text.startswith()
#         if (str(bot_response).startswith("- ")):
#             bot_response = str(bot_response)[2:]
#         print("Hobbiton: ",bot_response)
        
#         feedback=input('was that helpful?')
#         if(feedback.lower() in ['no','n','nope']):
#             statement = Statement(text=bot_response)
#             statement.in_response_to = user_input
#             chatbot.learn_response(statement, statement)
#             print("Thank you for teaching me.")

#     except KeyboardInterrupt:
#         break
