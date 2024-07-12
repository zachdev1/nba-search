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

        player_id = None
        for player in nba_players:
            if player['full_name'] == player_name:
                player_id = player['id']
                break
            
        if player_id is None:
            return jsonify({'error': 'Player not found'})
        
        # Get career stats
        career_stats = playercareerstats.PlayerCareerStats(player_id=player_id)
        df = career_stats.get_data_frames()[0]

        # Select specific columns and calculate per-game averages
        df1 = df[['SEASON_ID', 'TEAM_ABBREVIATION', 'GP', 'PTS', 'REB', 'AST', 'BLK', 'STL']]
        averages = pd.DataFrame()
        averages['SEASON_ID'] = df1['SEASON_ID']
        averages['TEAM_ABBREVIATION'] = df1['TEAM_ABBREVIATION']
        averages['PPG'] = (df1['PTS'] / df1['GP']).apply(lambda x: f"{x:.2f}")
        averages['RPG'] = (df1['REB'] / df1['GP']).apply(lambda x: f"{x:.2f}")
        averages['APG'] = (df1['AST'] / df1['GP']).apply(lambda x: f"{x:.2f}")
        averages['BPG'] = (df1['BLK'] / df1['GP']).apply(lambda x: f"{x:.2f}")
        averages['SPG'] = (df1['STL'] / df1['GP']).apply(lambda x: f"{x:.2f}")

        # Convert DataFrame to JSON
        averages_json = averages.to_dict(orient='records')
        return jsonify(averages_json)
    else:
        return jsonify({'error': 'Player name parameter is missing'})
    
if __name__ == '__main__':
    app.run(debug=True, port=8080)