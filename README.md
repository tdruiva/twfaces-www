##Faces Of Thoughtworks Quiz

As the description says, this is small quiz game to help newcomers get to know everyone in the ThoughtWorks offices.

#####Running on twfaces-dokku

**configure**
I would recommend setup the environment using [twfaces-dokku](https://github.com/thiagofelix/twfaces-dokku) which is a lightweight PaaS pre configured to run twfaces stack.

**deploy**
After configuring twfaces-dokku deploy it using git hook ( the same as heroku ).
1.  Point to twfaces-dokku: ```git remote add www dokku@local.twfaces.com:www```
2.	Push it: ```git push www master```
3.  Run: ```open http://local.twfaces.com```


######Running manually
1.  Build: ```npm install```
2.  Test it: ```grunt test```
3.	Run: ```npm start```