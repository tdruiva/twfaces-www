##Faces Of Thoughtworks Quiz

As the description says, this is small quiz game to help newcomers get to know everyone in the ThoughtWorks offices.

**Play Here!**  [faces-of-thoughtworks-quiz](http://thiagofelix.github.io/faces-of-thoughtworks-quiz)

###Adding People
All thoughtworkers are inside a big json file, to add someone just edit
[thoughtworkers.json](app/api/thoughtworkers.json) file and deploy again.

###Contributing
As most of internal projects, the way to make this app better and better is by volunteer contribution. Even a single commit if very few things inside is very welcome.

Being a not billable project, it is a good oportunity try different stacks and tools. More important than getting anything done is having fun while coding. So nobody cares how exactly are you working on it, since you did a good job and request it to be incorporate in the main branch, it is ok.


####Tech Stack
*  **Version 1**: The first tech stack was ruby with sinatra and an csv as storage.
*  **Version 2**: The second version is only an client app:
	*  [AngularJS](http://ngmodules.org): The best
	*  [Jasmine](http://pivotal.github.io/jasmine/): The easier integration possible to AngularJS
	*  [Animations.css](http://daneden.me/animate/): Just awesome
*  **Next Version**: You decide =)

It is a invite to try anything different you would like to do.




#####Building, Running & Deploying ( Version 2 )

Make shure you are commanding from the root folder beforhand.

######Pre Requisites
In order to setup the project you have to only install NPM:

*	[(NPM) Node Package Manager](http://npmjs.org/): NPM grabs javascript tools related to you development enviroment

######Build
1.  Clone it: ```git clone https://github.com/thiagofelix/faces-of-thoughtworks-quiz.git```
2.  Download the enviroment dependencies: ```npm install```
3.  Download the app dependencies: ```bower install```
4.  Test it: ```grunt test```


#####Running
Make the app runs is the easiest part just type ```grunt server``` and the app will jump into you face =)


#####Deploying ( Github )
1.	Build the app ```grunt build```
2.  Copy files: There is no script yet to do this. You need to paste the contents of dist folder into the gh-pages
3.	Push: Once you are into the gh-pages and everything is uptodated just push ```git push```
