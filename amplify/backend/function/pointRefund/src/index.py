import json
import os
import boto3
import stream_chat
from datetime import datetime, timedelta
from urllib.parse import urlparse

from gql import Client, gql
from gql.transport.aiohttp import AIOHTTPTransport
from gql.transport.appsync_auth import AppSyncApiKeyAuthentication


def handler(event, context):
    print(event)
    week_ago = datetime.now() - timedelta(days=7)
    server_client = stream_chat.StreamChat(
        api_key=os.environ['STREAM_KEY'], api_secret=os.environ['STREAM_SECRET'])
    next = None
    users = {}

    # GraphQL
    url = os.environ['API_DOCEONEW_GRAPHQLAPIENDPOINTOUTPUT']
    api_key = os.environ['API_DOCEONEW_GRAPHQLAPIKEYOUTPUT']
    query = gql(
                """
        mutation CreatePointHistory(
            $input: CreatePointHistoryInput!
            $condition: ModelPointHistoryConditionInput
        ) {
            createPointHistory(input: $input, condition: $condition) {
                id
                type
                point
                userId
                text
                doctorId
                messageId
                createdAt
                updatedAt
            }
        }"""
    )
    host = str(urlparse(url).netloc)

    auth = AppSyncApiKeyAuthentication(host=host, api_key=api_key)
    transport = AIOHTTPTransport(url=url, auth=auth)
    session = Client(
        transport=transport, fetch_schema_from_transport=False,
    )

    while True:
        try:
            res = server_client.search(
                { 'type': 'channel-2' },
                { '$and': [
                    { 'parent_id': ''},
                    { 'reply_count': 0 },
                    { 'created_at': { '$lt': week_ago.strftime('%Y-%m-%dT%H:%M:%S.%fZ') } },
                    { 'refunded': {'$ne': 'yes'} }
                ]},
                limit=100,
                next=next
            )

            for message in res['results']:
                if message['message']['user']['role'] != 'user' or message['message']['reply_count'] > 0:
                    continue

                msg_id = message['message']['id']
                user_id = message['message']['user']['id']
                try:
                    server_client.update_message_partial(msg_id, {'set': {'refunded': 'yes'}}, user_id)
                    point = 0 if user_id not in users else users[user_id]
                    users[user_id] = point + 500

                    variable_values = {
                        'input': {
                            'type': 'refund',
                            'point': 500,
                            'userId': user_id,
                            'text': 'ポイントが返還されました',
                            'messageId': msg_id
                        }
                    }

                    session.execute(query, variable_values=variable_values)
                except Exception as err:
                    print(err)
                    continue

            if 'next' not in res:
                break

            next = res['next']
        except Exception as err:
            print(err)
            break

    updates = []
    for user in users:
        updates.append({
            'id': user,
            'set': {'point': users[user]}
        })

    try:
        server_client.update_users_partial(updates)
    except Exception as err:
        print(err)

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
    }
