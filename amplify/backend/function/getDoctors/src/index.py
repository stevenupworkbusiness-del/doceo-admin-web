import json
import stream_chat
import os

def handler(event, context):
	print('received event:')
	print(event)

	server_client = stream_chat.StreamChat(
		api_key=os.environ['STREAM_KEY'], api_secret=os.environ['STREAM_SECRET'])
	res = server_client.query_users({'role': 'doctor'})
	print(res)
	return res['users']
