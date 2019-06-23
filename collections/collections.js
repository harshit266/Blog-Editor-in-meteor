import { Mongo } from 'meteor/mongo';
export var blog = new Mongo.Collection("hello");
export var signin = new Mongo.Collection("signin")