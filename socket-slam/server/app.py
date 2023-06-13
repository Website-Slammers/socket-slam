from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
socketio = SocketIO(app)

@app.route('/')
def index():
    return 'Flask app is up and running'

@socketio.on('connect')
def handle_connect():
    emit('server_message', 'You are connected to the server.')

@socketio.on('client_message')
def handle_client_message(message):
    emit('server_message', f'Client says: {message}')

if __name__ == '__main__':
    socketio.run(app, debug=True)
