
  'use strict'
  
  const express = require('express');// Importar Express y crear router
  const mongoose = require('mongoose');
  const User = require('../proyecto-node/models/User');
  const redis = require("redis");  // Importar Redis
  const exRedCache = require('express-redis-cache');

	// Configurar el cliente de Redis
	const RedisClient = exRedCache({
		host: 'redis-19344.c270.us-east-1-3.ec2.redns.redis-cloud.com', 
		port: 19344,
		auth_pass: 'by2yV0hydByYKHV1etQAcPjyPF8mxYhP',
		/* expire: 600000  */ //milisegundos //tiempo que permanece guardada la info
		expire: 30 * 24 * 60 * 60 * 1000 // 30 días en milisegundos
	})

	RedisClient.on("connected", ()=>console.log("conectado a redis server"))
	RedisClient.on("error", err=>console.log("error en el cliente redis", err))
	
	async function UserCacheget(req, res, next) {
		try {
		let entries = await new Promise((resolve, reject) => {
			RedisClient.get('users', (error, entries) => {
			if (error) {
				console.error(error);
				reject(error);
			} else {
				resolve(entries);
			}
			});
		});
	
		if (entries.length === 0) {
			var users = await User.find();
			await new Promise((resolve, reject) => {
			RedisClient.add('users', JSON.stringify(users), 6000, (error, added) => {
				if (error) {
				console.error(error);
				reject(error);
				} else {
				resolve(added);
				}
			});
			});
			console.log("Información guardada en caché correctamente");
			req.users = users;
		} else {
			console.log(entries.length, "Información obtenida de la caché correctamente");
			req.users = JSON.parse(entries[0].body);
		}
		next();
		} catch (err) {
		console.error(err);
		res.status(500).send({ status: 500, message: "Error al obtener los usuarios de la caché." });
		}
	}
	
module.exports = {RedisClient, UserCacheget}
