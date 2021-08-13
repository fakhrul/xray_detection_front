# Deployment 

## Environment
= OS: Linux Ubuntu 18
- Node JS version 14, ref [https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04
)

## Nginx and Vue setip

Ref: (http://delia13.me/2020/03/16/vue-ubuntu/)[http://delia13.me/2020/03/16/vue-ubuntu/]

## If you are facing a problem and need to cleanup the npm, use below command.

````
sudo rm -rf /usr/local/bin/npm 
sudo rm -rf /usr/local/share/man/man1/node* 
sudo rm -rf /usr/local/lib/dtrace/node.d
rm -rf ~/.npm
rm -rf ~/.node-gyp
sudo rm -rf /opt/local/bin/node
sudo rm -rf /opt/local/include/node
sudo rm -rf /opt/local/lib/node_modules
sudo rm -rf /usr/local/lib/node*
sudo rm -rf /usr/local/include/node*
sudo rm -rf /usr/local/bin/node*
````
Ref: https://stackoverflow.com/questions/32426601/how-can-i-completely-uninstall-nodejs-npm-and-node-in-ubuntu


