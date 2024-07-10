from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
from nba_api.stats.endpoints import playercareerstats
from nba_api.stats.static import players

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route("/api/players", methods=['GET'])

def getPlayer():
    player_name = request.args.get('name')
    if player_name:
        nba_players = players.get_players()
        playerId = None
        for player in nba_players:
            if player['full_name'] == player_name:
                playerId = player['id']
                break
        if playerId:
            return jsonify({'playerId': playerId})
        else:
            return jsonify({'error': 'Player not found'})
        
        
    else:
        return jsonify({'error': 'Player name parameter is missing'})
    
    

if __name__ == '__main__':
    app.run(debug=True, port=8080)