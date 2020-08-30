# NodeJS Simple Server

A simple written in pure nodejs without any library.

### Installation
- Clone the repositiory using 
```bash
git clone https://github.com/Ahmard/nodejs-simple-server.git
```
- Open command line and navigate to the project directory 
- Run below command to install required libraries
```bash 
npm update
```
### Configuring
Install database tables, run below command
```bash
node install-tables.js
```

### Running
To run the program, run the below command
```bash
node server.js
```
The program listen to port **1333**

#### Saving Data
Send post request to **http://localhost:1333/data/save** with **name & data** fields and their values.

#### List Data
Send GET request to **http://localhost:1333/data/list**

#### Update Data
Send POST request to **http://localhost:1333/data/update** with **name & data** fields and their values.

#### Delete Data
Send GET request to **http://localhost:1333/data/delete?id=dataid**, where **dataId** is column id of the data you want to delete.

That's all for now, enjoy :)