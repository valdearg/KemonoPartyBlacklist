# Description
This is a fork of MeusArtis' original Kemono blacklist userscript (provided here for prosperity).

The original script would blacklist an artist, this now adds in blacklisting text in a post title and blacklisting tags where supported.

Settings are stored in the browser storage for the site, they are browser dependent. You can view these within the Developer Tools > Storage > Local Storage. 

The original "artists" blacklist is stored in "blacklist", this adds in "blacklist_tags" and "blacklist_text".

![image](https://github.com/user-attachments/assets/f7eb6c3d-f6e8-481c-b543-4086cd449525)

This extension also brings in backup/restore for these. Gets stored in a JSON file.

## Installation

This is a userscript and should be supported by anhy of the major browser extensions.

If you get something like GreaseMonkey/TamperMonkey/ViolentMonkey/etc.

You should then be able to install the userscript with the extension installers, in some cases you can go to the raw URL in a tag and it'll give the option to install.

https://github.com/valdearg/KemonoPartyBlacklist/raw/main/blacklistkemono.user.js

## Future intentions

There's a basic project to add in support for a community supported artist tagging feature. The basic idea would be that you'd be able to tag an artist, e.g. "AI".

As a user you could then blacklist certain tags for them to not show.

This project includes a docker project consisting of a database and an API server using FastAPI. 

Currently the general idea will be:

The userscript extension will allow you to enter an API URL, could be local or community hosted.
Admin can create users who are then able to submit tags. (liable for abuse, people are terrible)
Users can pull tags unauthenticated. Probably should be behind some DDOS protection.

## Running
Requires docker and docker compose. 

`git pull https://github.com/valdearg/KemonoPartyBlacklist`

`cd KemonoPartyBlacklist`

`docker compose up -d`

Should be available on port 8080 (customised in the docker-compose.yml file)

## API Examples:

# create user
`curl -k -X POST -H "Content-Type: application/json" -d '{"user_name": "dfgfdg","admin_key": "TVsSEQRqxoM4C8kv"}' http://127.0.0.1:8080/create_user`

# get tags
`curl -k -X GET http://127.0.0.1:8080/get_tags/patreon/7814194`

# add tags
`curl -k -X POST -H "Content-Type: application/json" -d '{"user": "7814194","service": "patreon","text": "tag1","user_key": "ZGZnZmRn"}' http://127.0.0.1:8080/create_tags`

(Yes, I'm aware there's a bunch of "secure" things in these examples. I don't care)

## Screenshots

Basic blacklist popup

![629-427-max](https://github.com/user-attachments/assets/a357e4ac-cf85-47ac-9bc6-cce75f21ba82)

Backup and restore options

![image](https://github.com/user-attachments/assets/13a10cc4-d438-4e27-b216-dd6a3eec3557)
