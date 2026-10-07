# Greek Mythology Bot
Chat with a Greek God and learn about their life and their secrets.
## Instructions
If you have never used git before :
### Installation
1. Download Git. https://git-scm.com/install/windows
### Cloning the repo
#### Option 1 - Using HTTPS:
1. Click on your profile picture->Settings->Developer Settings->Personal Access Tokens->Tokens(Classic)->Genereate New Token (Classic)
2. Keep the token safe once you leave the page it will disappear
3. Click the green <> Code button in the top right corner of this page. 
4. Under clone, click "HTTPS"
5. Open terminal or command prompt and navigate to a folder of your choice or open terminal/cmd from a directory within file explorer.
6. Type the following `git clone copiedlink` press enter.
7. Enter you git username.
8. Enter your git password.
9. Open this folder, this will be the working directory.

#### Option 2 - Using SSH
After this setup you will not have to enter your user/password each time.
1. Follow these instructions here page: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
2. Click the green <> Code button in the top right corner of this page. 
3. Under Clone click "SSH"
4. Open terminal or command prompt and navigate to a folder of your choice or open terminal/cmd from a directory within file explorer.
5. Type the following `git clone copiedlink` press enter.
6. Open this folder, this will be the working directory.


### Creating a branch
To avoid pushing buggy code to the main branch, you should work on a seperate branch instead.

#### Check you have the latest code
1. Switch to the main branch `git checkout main`
2. Pull the latest code `git pull origin main`
#### Create a new branch
1. Type the following: `git checkout -b feature/feature-name`
(The `-b` flag tells git to switch us to this branch after creation)

You now have a branch to work on.

#### Commiting your changes.
1. (optional) type `git status` This will show you all the files you have changed, make sure this is correct and nothing has sneaked in.
2. Add you changes `git add .`
3. Commit your changes `git commit -m "SHORT message"`

#### Push your changes to the repo
1. Type `git push origin feature/feature-name` (`feature-name` is the EXACT same name you used to create the branch).

#### Merging with main
After the testing of the branch is complete.
1. Head to the github repository on the website.
2. There will be some message in a yellow box. Click on "Compare & Pull Request"
3. Write a note describing what you have changed or fixed.
4. Click "Create Pull Request"

Before merging PLEASE test that there is no bugs on your branch.

*This readme was written in Markdown, please continue to use this format for this file.

