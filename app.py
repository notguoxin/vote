from flask import Flask, send_file
import json
import time

app = Flask(__name__)


@app.route('/vote/view-only')
def serve_vote_view_page():
    try:
        path = "view-vote.html"
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace(
            '</body>', '<script src="/lib/js/required.js"></script></body>')
        return content
    except FileNotFoundError:
        return "ERROR 404"

@app.route('/vote/main')
def serve_vote_main_page():
    try:
        path = "main.html"
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace(
            '</body>', '<script src="/lib/js/required.js"></script></body>')
        return content
    except FileNotFoundError:
        return "ERROR 404"

@app.route('/vote/update-log')
def serve_vote_update_page():
    try:
        path = "update-log.html"
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace(
            '</body>', '<script src="/lib/js/required.js"></script></body>')
        return content
    except FileNotFoundError:
        return "ERROR 404"


@app.route('/vote')
def serve_vote_page():
    try:
        path = "vote.html"
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace(
            '</body>', '<script src="/lib/js/required.js"></script></body>')
        # res.set_cookie('cookieless', 'I am cookie')
        return content
    except FileNotFoundError:
        return "ERROR 404"


@app.route('/endpoint/vote/get/vote_data')
def get_vote_data():
    # load the current vote data from file
    with open('./lib/data/votes.json', 'r', encoding='utf-8') as f:
        votes = json.load(f)
        f.seek(0)
    return json.dumps(votes)


@app.route('/q/<path:path>')
def serve_ql(path):
    try:
        return "<script>window.location.href = '//" + path + "'</script>"
    except FileNotFoundError:
        return "ERROR 404"


@app.route('/endpoint/vote/<user_vote>/<uid>', methods=['POST'])
def vote(user_vote, uid):

    try:
        with open('lib/data/votes.json', 'r', encoding='utf-8') as f:
            votes = json.load(f)
    except FileNotFoundError:
        votes = {}

    # update the vote count for the selected option

    if user_vote in votes:
        votes[user_vote] += 1
    else:
        votes[user_vote] = 1

        # write the updated votes to the file
    with open('lib/data/votes.json', 'w') as f:
        json.dump(votes, f)

        # log the vote in the console
    print(f'User [{uid}] voted for ' + user_vote)
    with open('lib/data/user_vote.txt', 'a') as f:
        f.write(
            f'[log] [guoxin.service.vote] - [uid={uid}] voted for [name={user_vote}]\n')
    return json.dumps(votes)


@app.route('/<path:path>')
def serve_file(path):
    try:
        return send_file(path)
    except FileNotFoundError:
        return "ERROR 404"


if __name__ == '__main__':
    time.sleep(.5)
    app.run(host='0.0.0.0', port=80, debug=True)
