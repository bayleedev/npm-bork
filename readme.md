## NPM Bork

To see issue:

~~~
git clone git@github.com:blainesch/npm-bork.git
cd npm-bork

npm install npm
node install.js
node test.js
~~~

To fix it, remove the second `install` command:

~~~ diff
diff --git a/install.js b/install.js
index 6d91f49..8601b05 100644
--- a/install.js
+++ b/install.js
@@ -20,6 +20,7 @@ function install () {
 }

 install().then(() => { // First install - installs correctly
+  return
   return install() // Second install - installs incorrectly ]:
 }).catch((e) => {
   console.log('ugh', e)
~~~

Then run the same commands:

~~~
npm install npm
node install.js
node test.js
~~~
