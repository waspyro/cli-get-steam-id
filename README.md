# cli-get-steam-id
Install:
```
git clone https://github.com/waspyro/cli-get-steam-id
cd cli-get-steam-id
npm i
```
Use:
```
node index.js https://steamcommunity.com/profiles/76543211111111111 
getsid https://steamcommunity.com/id/some_custom_profile
getsid some_custom_profile
```
Example output will be: _76543211111111111_\
Or _empty_ if fails

Script makes steam web api request if _GETSID_CLI_API_KEY_ env varialbe is set\
Otherwise it just scrapes user page
