import json
import requests
import os
import boto3
from botocore.exceptions import ClientError
from datetime import datetime
from dateutil.relativedelta import relativedelta
import stream_chat
from dateutil import parser

APPSYNC_API_KEY = os.environ['API_DOCEONEW_GRAPHQLAPIKEYOUTPUT']
APPSYNC_API_ENDPOINT_URL = os.environ['API_DOCEONEW_GRAPHQLAPIENDPOINTOUTPUT']

headers = {
    'Content-Type': "application/graphql",
    'x-api-key': APPSYNC_API_KEY,
    'cache-control': "no-cache",
}

query = """
query LIST_USERDEVICES($filter: ModelUserDeviceFilterInput) {
    listUserDevices(filter: $filter) {
        items {
            token
            userId
        }
    }
}
"""

def get_message(user, room, msg):
    link = 'https://doceo-dr-mobile-stg.doceo.link/#/Home/AnswerQuestion/%s' % msg['id']
    if 'birthday' in user:
        delta = relativedelta(datetime.now(), datetime.strptime(user['birthday'], '%Y-%m-%d'))
        patient = "%s代 %s" % int(delta.years / 10) * 10, ('sex' in user if user['sex'] else '男性')
    else:
        patient = "年代不明"

    return f"""<html>
    <head></head>
    <body>
      <p>
        「({patient}) <{room['name']}> [{msg['text']}]」回答するにはこちらをクリック
        <br/> <a href="{link}">{link}</a>
    </body>
    </html>
    """

def get_admin_message(user, room, msg):
    link = 'https://main.d2x0j5uv0cj4k2.amplifyapp.com/rooms/%s' % room['id']

    return f"""
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="x-apple-disable-message-reformatting">
        <title>New Message - Doceo</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@500&display=swap" rel="stylesheet">
        <style>
        html, body {{
            margin: 0 auto !important;
            max-width: 600px !important;
        }}

        body {{
            padding: 24px;
        }}

        html, body, span, a, strong, p, label {{
            color: #B4BABF;
            font-family: 'M PLUS Rounded 1c', sans-serif;
            font-size: 15px;
            font-weight: 500;
        }}

        a {{
            color: #B4BABF;
            transition: .3s ease;
        }}

        a:hover, a:focus {{
            color: #70A4F2;
        }}

        p {{
            margin-top: 0;
            margin-bottom: 18px;
        }}

        .bg-gray {{
            background-color: #F8F8F8;
        }}

        label {{
            display: block;
            margin-bottom: 7px;
        }}

        .question, strong {{
            color: #282828;
            font-weight: 500;
        }}

        .col {{
            margin-bottom: 19px;
        }}

        .user-info {{
            display: flex;
            align-items: center;
        }}

        .user-info img {{
            margin-right: 10px;
        }}

        .reply {{
            display: inline-block;
            padding: 10px 18px;
            background-color: #70A4F2;
            border-radius: 4px;
            color: #fff !important;
            text-decoration: none;
            margin-top: 20px;
            margin-bottom: 47px;
        }}

        .reply:hover, .reply:focus {{
            background-color: #5b87c9;
        }}

        footer {{
            padding: 20px 24px;
        }}

        footer p {{
            margin-bottom: 28px;
        }}

        .footer-bottom {{
            display: flex;
            align-items: bottom;
            flex-wrap: wrap;
        }}

        .footer-bottom img {{
            margin-right: 16px;
            margin-bottom: 5px;
        }}

        .footer-bottom span {{
            margin-right: 32px;
        }}


        .foooter-bottom a {{
            color: #B4BABF !important;
            transition: .3s ease;
        }}

        .foooter-bottom a:hover, .foooter-bottom a:focus {{
            color: #70A4F2 !important;
        }}

        @media(min-width: 420px) {{
            .footer-bottom a {{
                margin-left: auto;
            }}
        }}
        </style>
    </head>
    <body>
        <main>
            <label>Question</label>
            <p><strong>{msg['text']}</strong></p>
            <div class="col">
                <label>User</label>
                <div class="user-info"><img class="avatar" src="https://doctor-thumbnail.s3.ap-northeast-1.amazonaws.com/{user['image'] if 'image' in user else 'assets/images/avatars/default.png'}" alt="Avatar" width="21" height="21" /> <strong>{user['name']}</strong></div>
            </div>
            <div class="col">
                <label>Channel Title</label>
                <strong>{room['name']}</strong>
            </div>
            <a href="{link}" class="reply" target="_blank">回答する</a>
        </main>
        <footer class="bg-gray">
            <p>投稿内容に問題があり、回答が難しい場合や今後このような質問をなくしてほしいなどのフィードバックはこちらからお願いします。運用が何かしらの対策を講じさせていただきます。</p>
            <div class="footer-bottom">
                <img src="https://doctor-thumbnail.s3.ap-northeast-1.amazonaws.com/logo.png" alt="Doceo" width="105" height="19" />
                <span>＠Wivil.inc</span>
                <a href="https://doceo.jp" target="_blank">公式サイト</a>
            </div>
        </footer>
    </body>
    </html>
    """

def get_addreses(roomId, type = 'room'):
    server_client = stream_chat.StreamChat(
        api_key=os.environ['STREAM_KEY'], api_secret=os.environ['STREAM_SECRET'])
    
    roomChannel = server_client.channel(type, roomId)
    users = []
    id = None

    while True:
        res = roomChannel.query_members(filter_conditions={}, sort=[{"field": "id", "direction": 1}], user_id_gt=id)
        roomUsers = filter( lambda member: member['user']['role'] == 'user', res)
        users = users + list(roomUsers)
        id = res[len(res) - 1]['user_id']
        if len(res) < 100:
            break
    
    filters = map( lambda user: {"userId": {"eq": user['user_id']}}, users )

    payload_obj = {"query": query, "variables": {"filter": {"or": list(filters)}}}
    payload = json.dumps(payload_obj)

    response = requests.request("POST", APPSYNC_API_ENDPOINT_URL, data=payload, headers=headers)
    response_json = response.json()
    devices = response_json['data']['listUserDevices']['items']

    addresses = {}
    for device in devices:
        addresses[device['token']] = {
            'ChannelType': 'GCM'
        }
    return addresses

def send_message(to_addresses, char_set, subject, message):
    pinpoint_client = boto3.client('pinpoint-email')

    try:
        response = pinpoint_client.send_email(
            FromEmailAddress='info@wivil.co.jp',
            Destination={'ToAddresses': to_addresses},
            Content={
            'Simple': {
                'Subject': {'Charset': char_set, 'Data': subject},
                'Body': {
                    'Html': {'Charset': char_set, 'Data': message},
                    # 'Text': {'Charset': char_set, 'Data': text_message}
                }
            }
            }
        )
    except ClientError:
        print("The message wasn't sent")
        raise
    else:
        return response['MessageId']

def send_notification(to_addreses, text, body, type, roomId):
    app_id = os.environ['ANALYTICS_DOCEONEW_ID']
    client = boto3.client('pinpoint',region_name=os.environ['ANALYTICS_DOCEONEW_REGION'])
    content = json.dumps({
        "data": {
            "title": text,
            "body": body,
            "type": type,
            "room": roomId
        }
    })

    message_request = {
        'Addresses': to_addreses,
        'MessageConfiguration': {
            'GCMMessage': {
                'Action': 'OPEN_APP',
                'RawContent': content
            }
        }
    }
    client.send_messages(
        ApplicationId=app_id,
        MessageRequest=message_request
    )

def iso_to_cron(iso_string):
    # Parse the ISO 8601 string into a datetime object
    dt = parser.parse(iso_string)

    # Extract necessary components for the cron expression
    minute = dt.minute
    hour = dt.hour
    day = dt.day
    month = dt.month
    year = dt.year

    # Construct the cron expression
    cron_expression = f"cron({minute} {hour} {day} {month} ? {year})"
    return cron_expression

def handler(event, context):
    print('received event:')
    print(event)

    server_client = stream_chat.StreamChat(
        api_key=os.environ['STREAM_KEY'], api_secret=os.environ['STREAM_SECRET'])

    if 'type' in event and event['type'] == 'livechat.start':
        addresses = get_addreses(event['channel'], event['channel_type'])
        try:
            send_notification(addresses, 'LIVEチャットの開始', f"{event['channel_name']}」が開始しました", "channel.started", event['room'])
            return True
        except ClientError as e:
            print(e.response['Error']['Message'])
            return False
    
    if type(event['Records'][0]['body']) is str:
        msg_info = json.loads(event['Records'][0]['body'])
    else:
        msg_info = event['Records'][0]['body']

    # user_info = cognito.admin_get_user(
    #     UserPoolId = os.environ['AUTH_DOCEONEW9D5671B29D5671B2_USERPOOLID'],
    #     Username = user_id
    # )

    if msg_info['type'] == 'message.new' and msg_info['channel_type'] == 'channel-2' and msg_info['user']['role'] == 'user' :
        channel = server_client.query_channels(
            {
                'type': 'channel-2',
                'id': msg_info['channel_id']
            },
            {},
            limit=1
        )['channels'][0]
        room = server_client.query_channels(
            {
                'type': 'room',
                'id': channel['channel']['room']
            },
            {},
            limit=1
        )['channels'][0]
        doctors = filter( lambda member: member['user']['role'] == 'doctor', room['members'] )
        doctor_ids = map( lambda doctor: doctor['user_id'], doctors )
        # print(list(doctor_ids))
        # print(list(doctors))
        cognito = boto3.client('cognito-idp')
        doctor_emails = []
        for id in doctor_ids:
            result = cognito.list_users(
                UserPoolId=os.environ['AUTH_DOCEONEW9D5671B29D5671B2_USERPOOLID'],
                AttributesToGet=['email'],
                Filter="sub = '%s'" % id
            )
            if len(result['Users']) > 0 and len(result['Users'][0]['Attributes']) > 0:
                doctor_emails.append(result['Users'][0]['Attributes'][0]['Value'])

        # results = cognito.list_users(
        #     UserPoolId=os.environ['AUTH_DOCEONEW9D5671B29D5671B2_USERPOOLID'],
        #     AttributesToGet=['email'],
        #     Filter="sub = 'e0e07a6a-ee1a-44ca-9e75-8ec25a9a8ff1'"
        # )
        # doctor_emails = list( map( lambda doctor: doctor['Attributes'][0]['Value'], results['Users'] ) )
        # doctor_emails = ['talentservice129@gmail.com']
        subject = "新しい質問が投稿されました。Doceoにログインしてご確認ください。"
        message = get_message(msg_info['user'], room['channel'], msg_info['message'])
        send_message(doctor_emails, 'UTF-8', subject, message)

    if msg_info['type'] == 'message.new' and msg_info['channel_type'] == 'messaging' and msg_info['user']['role'] == 'user' :
        channel = server_client.query_channels(
            {
                'type': 'messaging',
                'id': msg_info['channel_id']
            },
            {},
            limit=1
        )['channels'][0]
        room = server_client.query_channels(
            {
                'type': 'room',
                'id': channel['channel']['room']
            },
            {},
            limit=1
        )['channels'][0]
        admins = filter( lambda member: member['user']['role'] == 'admin', room['members'] )
        admin_ids = map( lambda doctor: doctor['user_id'], admins )
        cognito = boto3.client('cognito-idp')
        admin_emails = []
        for id in admin_ids:
            result = cognito.list_users(
                UserPoolId=os.environ['AUTH_DOCEONEW9D5671B29D5671B2_USERPOOLID'],
                AttributesToGet=['email'],
                Filter="sub = '%s'" % id
            )
            if len(result['Users']) > 0 and len(result['Users'][0]['Attributes']) > 0:
                admin_emails.append(result['Users'][0]['Attributes'][0]['Value'])

        subject = "%sからメッセージが届きました" % msg_info['user']['name']
        message = get_admin_message(msg_info['user'], room['channel'], msg_info['message'])
        send_message(admin_emails, 'UTF-8', subject, message)
    
    if msg_info['type'] == 'channel.created' and (msg_info['channel_type'] == 'channel-1' or msg_info['channel_type'] == 'channel-2' or msg_info['channel_type'] == 'channel-3' or msg_info['channel_type'] == 'channel-4'):
        if msg_info['channel']['startTime'] is not None:
            events_client = boto3.client('events',region_name=os.environ['ANALYTICS_DOCEONEW_REGION'])
            lambda_client = boto3.client('lambda',region_name=os.environ['ANALYTICS_DOCEONEW_REGION'])

            lambda_function_name = 'sendEmailNotification-dev'
            rule_name = 'OneTimeScheduleRule'
            rule_description = f"A one-time rule to trigger Lambda for {msg_info['channel']['name']}"
            schedule_expression = iso_to_cron(msg_info['channel']['startTime'])
            response = events_client.put_rule(
                Name=rule_name,
                ScheduleExpression=schedule_expression,
                State='ENABLED',
                Description=rule_description
            )

            # Get the ARN of the created rule
            rule_arn = response['RuleArn']
            lambda_client.add_permission(
                FunctionName=lambda_function_name,
                StatementId='EventBridgeInvokeLambdaPermission',
                Action='lambda:InvokeFunction',
                Principal='events.amazonaws.com',
                SourceArn=rule_arn
            )

            # Create the event input payload
            event_payload = {
                "type": "livechat.start",
                "channel": msg_info['channel_id'],
                "channel_name": msg_info['channel']['name'],
                "channel_type": msg_info['channel_type'],
                'room': msg_info['channel']['room']
            }

            events_client.put_targets(
                Rule=rule_name,
                Targets=[
                    {
                        'Id': '1',
                        'Arn': 'arn:aws:lambda:ap-northeast-1:480663785201:function:sendEmailNotification-dev',
                        'Input': json.dumps(event_payload)
                    }
                ]
            )
            return True

        room = server_client.query_channels(
            {
                'type': 'room',
                'id': msg_info['channel']['room']
            },
            {},
            limit=1
        )['channels'][0]
        addresses = get_addreses(msg_info['channel']['room'])
        try:
            send_notification(addresses, 'グループチャットの追加', f"{room['channel']['name']} ROOMに「{msg_info['channel']['name'][0:13]}{'…' if len(msg_info['channel']['name']) > 13 else ''}」が追加されました", "channel.created", msg_info['channel']['room'])
        except ClientError as e:
            print(e.response['Error']['Message'])
            return False
            
    if msg_info['type'] == 'channel_published' and msg_info['channel_type'] == 'room':
        roomId = msg_info['channel_id']
        room = server_client.query_channels(
            {
                'type': 'room',
                'id': roomId
            },
            {},
            limit=1
        )['channels'][0]
        addresses = get_addreses(roomId)
        try:
            send_notification(addresses,  f"{room['channel']['name']} ROOMの公開", "あなたが参加申請をしたROOMが公開されました", "channel_published", roomId)
        except ClientError as e:
            print(e.response['Error']['Message'])
            return False

    if msg_info['type'] == 'member.added' and msg_info['user']['role'] == 'doctor' and msg_info['channel_type'] == 'room':
        roomId = msg_info['channel_id']
        room = server_client.query_channels(
            {
                'type': 'room',
                'id': roomId
            },
            {},
            limit=1
        )['channels'][0]
        # print(f"{room['channel']['name']} ROOMに{msg_info['user']['lastName']}医師が新しく参加しました".encode('utf-8'))
        # return
        addresses = get_addreses(roomId)
        doctorName = msg_info['user']['lastName']
        try:
            send_notification(addresses, "新しい医師の参加", f"{room['channel']['name']} ROOMに{doctorName}医師が新しく参加しました", "doctor.added", roomId)
        except ClientError as e:
            print(e.response['Error']['Message'])
            return False


    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
    }