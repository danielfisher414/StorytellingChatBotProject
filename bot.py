from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
from chatterbot.logic import BestMatch

chatbot = ChatBot(
    'Bot')

trainer = ListTrainer(chatbot)

# Train using the English corpus
trainer.train("chatterbot.corpus.english.greetings")
trainer.train("chatterbot.corpus.english.conversations")

# Train using your data.yml file
with open('data.yml', 'r') as file:
    data = file.read().splitlines()

trainer.train(data)

while True:
    try:
        user_input = input()
        bot_response = chatbot.get_response(user_input)
        print(bot_response)

    except KeyboardInterrupt:
        break